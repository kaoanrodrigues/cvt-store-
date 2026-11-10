import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { INITIAL_PRODUCTS } from '../src/data/products.ts';

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.resolve(DB_DIR, 'cvt_store.db');
export const db = new DatabaseSync(DB_PATH);

// Função para gerar hash SHA-256 de senhas
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

// Inicializa as tabelas relacionais
export function initDatabase() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      brand TEXT DEFAULT 'CVT Collection',
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      cost_price REAL,
      badge TEXT,
      description TEXT,
      is_promo INTEGER DEFAULT 0,
      promo_price REAL,
      is_popular INTEGER DEFAULT 0,
      sales_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      is_primary INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      size TEXT NOT NULL,
      stock_quantity INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE (product_id, size)
    );

    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      order_code TEXT UNIQUE NOT NULL,
      customer_name TEXT DEFAULT 'Cliente WhatsApp',
      total_value REAL NOT NULL,
      payment_method TEXT DEFAULT 'Pix / Cartão',
      status TEXT DEFAULT 'concluido',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sales_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sale_id TEXT NOT NULL,
      product_id TEXT,
      product_name TEXT NOT NULL,
      size TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      unit_price REAL NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      name TEXT DEFAULT 'Administrador CVT',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Migration de colunas para bancos SQLite já existentes
  try {
    const tableInfo = db.prepare('PRAGMA table_info(products)').all() as { name: string }[];
    const columnNames = tableInfo.map((col) => col.name);
    if (!columnNames.includes('is_promo')) {
      db.exec('ALTER TABLE products ADD COLUMN is_promo INTEGER DEFAULT 0;');
    }
    if (!columnNames.includes('promo_price')) {
      db.exec('ALTER TABLE products ADD COLUMN promo_price REAL;');
    }
  } catch (migErr) {
    console.warn('Aviso ao aplicar migration de promoções:', migErr);
  }

  seedDefaultAdmin();
  seedInitialProducts();
  seedInitialSales();
  ensureSamplePromos();
}

// Seed admin padrão
function seedDefaultAdmin() {
  const existing = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');
  if (!existing) {
    const insertAdmin = db.prepare(`
      INSERT INTO admin_users (id, username, password_hash, role, name)
      VALUES (?, ?, ?, ?, ?)
    `);
    const defaultPasswordHash = hashPassword('cvtadmin2026');
    insertAdmin.run('usr-admin-1', 'admin', defaultPasswordHash, 'admin', 'Administrador CVT Store');
    console.log('✔ Usuário admin cadastrado com sucesso: admin / cvtadmin2026');
  }
}

// Seed produtos com imagens e variantes relacionais
function seedInitialProducts() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  if (countRow.count > 0) return;

  const insertProduct = db.prepare(`
    INSERT INTO products (id, sku, name, brand, category, category_label, price, original_price, cost_price, badge, description, is_promo, promo_price, is_popular, sales_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertImage = db.prepare(`
    INSERT INTO product_images (product_id, image_url, is_primary, display_order)
    VALUES (?, ?, ?, ?)
  `);

  const insertVariant = db.prepare(`
    INSERT INTO product_variants (product_id, size, stock_quantity)
    VALUES (?, ?, ?)
  `);

  for (const p of INITIAL_PRODUCTS) {
    insertProduct.run(
      p.id,
      p.sku,
      p.name,
      p.brand || 'CVT Collection',
      p.category,
      p.categoryLabel,
      p.price,
      p.originalPrice || null,
      p.costPrice || null,
      p.badge || null,
      p.description || '',
      p.isPromo ? 1 : 0,
      p.promoPrice || null,
      p.isPopular ? 1 : 0,
      p.salesCount || 0
    );

    // Múltiplas imagens
    const images = p.images && p.images.length > 0 ? p.images : [p.image];
    images.forEach((imgUrl, idx) => {
      insertImage.run(p.id, imgUrl, idx === 0 ? 1 : 0, idx);
    });

    // Variantes de tamanho e estoque
    if (p.variants && p.variants.length > 0) {
      for (const v of p.variants) {
        insertVariant.run(p.id, v.size, v.stockQuantity);
      }
    } else {
      const stockPerSize = Math.max(1, Math.floor(p.stock / p.sizes.length));
      for (const sz of p.sizes) {
        insertVariant.run(p.id, sz, stockPerSize);
      }
    }
  }

  console.log(`✔ ${INITIAL_PRODUCTS.length} produtos iniciais semeados no banco de dados SQLite.`);
}

// Seed vendas para relatórios e IA
function seedInitialSales() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM sales').get() as { count: number };
  if (countRow.count > 0) return;

  const insertSale = db.prepare(`
    INSERT INTO sales (id, order_code, customer_name, total_value, payment_method, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertSaleItem = db.prepare(`
    INSERT INTO sales_items (sale_id, product_id, product_name, size, quantity, unit_price, subtotal)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const sampleSales = [
    { id: 'sale-01', code: '#CVT-261101-1021', name: 'Marcos Vinicius', total: 179.80, date: '2026-11-01 14:32:00' },
    { id: 'sale-02', code: '#CVT-261102-4092', name: 'Rodrigo Lima', total: 244.80, date: '2026-11-02 18:15:00' },
    { id: 'sale-03', code: '#CVT-261103-9182', name: 'Lucas Gabriel', total: 319.70, date: '2026-11-03 20:45:00' },
    { id: 'sale-04', code: '#CVT-261104-5821', name: 'Matheus Albuquerque', total: 89.90, date: '2026-11-04 11:20:00' },
    { id: 'sale-05', code: '#CVT-261105-3140', name: 'Carlos Eduardo', total: 299.80, date: '2026-11-05 09:50:00' },
  ];

  for (const s of sampleSales) {
    insertSale.run(s.id, s.code, s.name, s.total, 'Pix', 'concluido', s.date);
    insertSaleItem.run(s.id, 'cam-01', 'Camisa DLZ Premium Heavy Cotton', 'M', 1, 89.90, 89.90);
  }
}

// Garante que haja itens de demonstração em promoção se nenhum estiver ativo
function ensureSamplePromos() {
  try {
    const promoCountRow = db.prepare('SELECT COUNT(*) as count FROM products WHERE is_promo = 1').get() as { count: number };
    if (!promoCountRow || promoCountRow.count === 0) {
      // Define cam-01 e polo-01 ou primeiros produtos com desconto
      const updatePromo = db.prepare('UPDATE products SET is_promo = 1, promo_price = ? WHERE id = ?');
      updatePromo.run(69.90, 'cam-01');
      updatePromo.run(109.90, 'polo-01');
      updatePromo.run(49.90, 'bone-02');
      console.log('✔ Itens promocionais padrão configurados no banco de dados.');
    }
  } catch (err) {
    console.warn('Erro ao configurar produtos promocionais de exemplo:', err);
  }
}

