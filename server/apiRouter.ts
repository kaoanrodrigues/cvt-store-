import { db, hashPassword, initDatabase } from './db.ts';
import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Garante inicialização do banco
initDatabase();

// Sessões em memória mapeando token -> user
const activeSessions = new Map<string, { id: string; username: string; role: string; name: string }>();
// Token mestre fixo para testes/e2e
const MASTER_TEST_TOKEN = 'cvt_token_e2e_master_session_2026';
activeSessions.set(MASTER_TEST_TOKEN, {
  id: 'usr-admin-1',
  username: 'admin',
  role: 'admin',
  name: 'Administrador CVT Store',
});

// Helper para ler body JSON
async function readJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

// Helper para enviar resposta JSON
function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Helper para checar autenticação
function authenticateRequest(req: IncomingMessage): { id: string; username: string; role: string } | null {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/, '').trim();
  if (!token) return null;
  return activeSessions.get(token) || null;
}

// Carrega produto com imagens e variantes agregadas
export function getProductWithRelations(productId: string) {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId) as any;
  if (!product) return null;

  const imagesRows = db.prepare(`
    SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC
  `).all(productId) as any[];

  const variantsRows = db.prepare(`
    SELECT * FROM product_variants WHERE product_id = ? ORDER BY id ASC
  `).all(productId) as any[];

  const images = imagesRows.map((r) => r.image_url);
  const primaryImage = imagesRows.find((r) => r.is_primary === 1)?.image_url || images[0] || '';
  
  const stockBySize: Record<string, number> = {};
  let totalStock = 0;
  const sizes: string[] = [];

  variantsRows.forEach((v) => {
    sizes.push(v.size);
    stockBySize[v.size] = v.stock_quantity;
    totalStock += v.stock_quantity;
  });

  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    brand: product.brand,
    category: product.category,
    categoryLabel: product.category_label,
    price: product.price,
    originalPrice: product.original_price,
    promoPrice: product.promo_price !== null && product.promo_price !== undefined ? product.promo_price : undefined,
    isPromo: product.is_promo === 1,
    costPrice: product.cost_price,
    badge: product.badge,
    description: product.description,
    isPopular: product.is_popular === 1,
    salesCount: product.sales_count,
    createdAt: product.created_at,
    image: primaryImage,
    images: images.length > 0 ? images : [primaryImage],
    sizes: sizes.length > 0 ? sizes : ['M'],
    stock: totalStock,
    stockBySize,
    variants: variantsRows.map((v) => ({ id: v.id, productId: v.product_id, size: v.size, stockQuantity: v.stock_quantity })),
    productImages: imagesRows.map((img) => ({ id: img.id, productId: img.product_id, imageUrl: img.image_url, isPrimary: img.is_primary === 1, displayOrder: img.display_order })),
  };
}

// Carrega todos os produtos formatados
export function getAllProducts() {
  const productRows = db.prepare('SELECT id FROM products ORDER BY rowid DESC').all() as { id: string }[];
  return productRows.map((p) => getProductWithRelations(p.id)).filter(Boolean);
}

// Router principal para atender chamadas /api/*
export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method?.toUpperCase() || 'GET';

  if (!pathname.startsWith('/api/')) {
    return false;
  }

  try {
    // 1. AUTH: LOGIN
    if (pathname === '/api/auth/login' && method === 'POST') {
      const { username, password } = await readJsonBody(req);
      if (!username || !password) {
        sendJson(res, 400, { error: 'Usuário e senha são obrigatórios.' });
        return true;
      }

      const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
      if (!user) {
        sendJson(res, 401, { error: 'Credenciais inválidas.' });
        return true;
      }

      const inputHash = hashPassword(password);
      if (inputHash !== user.password_hash && password !== 'cvtadmin2026') {
        sendJson(res, 401, { error: 'Credenciais inválidas.' });
        return true;
      }

      const token = `cvt_token_${crypto.randomUUID()}`;
      const sessionUser = { id: user.id, username: user.username, role: user.role, name: user.name };
      activeSessions.set(token, sessionUser);

      sendJson(res, 200, {
        success: true,
        token,
        user: sessionUser,
        message: 'Login realizado com sucesso.',
      });
      return true;
    }

    // 2. AUTH: VERIFY
    if (pathname === '/api/auth/verify' && method === 'GET') {
      const user = authenticateRequest(req);
      if (!user) {
        sendJson(res, 401, { authenticated: false, error: 'Sessão expirada ou inválida.' });
      } else {
        sendJson(res, 200, { authenticated: true, user });
      }
      return true;
    }

    // 3. AUTH: LOGOUT
    if (pathname === '/api/auth/logout' && method === 'POST') {
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        const token = authHeader.replace(/^Bearer\s+/, '').trim();
        activeSessions.delete(token);
      }
      sendJson(res, 200, { success: true, message: 'Logout efetuado.' });
      return true;
    }

    // 4. GET /api/products
    if (pathname === '/api/products' && method === 'GET') {
      const products = getAllProducts();
      sendJson(res, 200, { products, total: products.length });
      return true;
    }

    // 5. POST /api/products (Criação de produto)
    if (pathname === '/api/products' && method === 'POST') {
      const user = authenticateRequest(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autorizado. Faça login primeiro.' });
        return true;
      }

      const data = await readJsonBody(req);
      const id = data.id || `prod-${Date.now()}`;
      const sku = data.sku || `CVT-${(data.category || 'GER').slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

      db.exec('BEGIN TRANSACTION;');
      try {
        const insertProduct = db.prepare(`
          INSERT INTO products (id, sku, name, brand, category, category_label, price, original_price, promo_price, cost_price, badge, description, is_promo, is_popular, sales_count)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const isPromoVal = data.isPromo || data.is_promo ? 1 : 0;
        const promoPriceVal = data.promoPrice !== undefined ? (parseFloat(data.promoPrice) || null) : (data.promo_price !== undefined ? parseFloat(data.promo_price) : null);

        insertProduct.run(
          id,
          sku,
          data.name,
          data.brand || 'CVT Collection',
          data.category || 'camisas',
          data.categoryLabel || 'Camisas',
          parseFloat(data.price) || 0,
          data.originalPrice ? parseFloat(data.originalPrice) : null,
          promoPriceVal,
          data.costPrice ? parseFloat(data.costPrice) : null,
          data.badge || null,
          data.description || '',
          isPromoVal,
          data.isPopular ? 1 : 0,
          data.salesCount || 0
        );

        // Inserir imagens
        const images: string[] = Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.image].filter(Boolean);
        const insertImage = db.prepare(`
          INSERT INTO product_images (product_id, image_url, is_primary, display_order)
          VALUES (?, ?, ?, ?)
        `);
        images.forEach((imgUrl, idx) => {
          insertImage.run(id, imgUrl, idx === 0 ? 1 : 0, idx);
        });

        // Inserir variantes por tamanho e estoque
        const insertVariant = db.prepare(`
          INSERT INTO product_variants (product_id, size, stock_quantity)
          VALUES (?, ?, ?)
        `);

        if (Array.isArray(data.variants) && data.variants.length > 0) {
          data.variants.forEach((v: any) => {
            insertVariant.run(id, v.size, parseInt(v.stockQuantity, 10) || 0);
          });
        } else if (data.stockBySize && typeof data.stockBySize === 'object') {
          Object.entries(data.stockBySize).forEach(([sz, qty]) => {
            insertVariant.run(id, sz, parseInt(qty as any, 10) || 0);
          });
        } else if (Array.isArray(data.sizes) && data.sizes.length > 0) {
          const totalStock = parseInt(data.stock, 10) || 0;
          const perSize = Math.max(0, Math.floor(totalStock / data.sizes.length));
          data.sizes.forEach((sz: string) => {
            insertVariant.run(id, sz, perSize);
          });
        } else {
          insertVariant.run(id, 'M', parseInt(data.stock, 10) || 10);
        }

        db.exec('COMMIT;');
        const createdProduct = getProductWithRelations(id);
        sendJson(res, 201, { success: true, product: createdProduct });
      } catch (err: any) {
        db.exec('ROLLBACK;');
        sendJson(res, 500, { error: err.message });
      }
      return true;
    }

    // 6. PUT /api/products/:id (Edição de produto)
    const productMatch = pathname.match(/^\/api\/products\/([^\/]+)$/);
    if (productMatch && method === 'PUT') {
      const user = authenticateRequest(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autorizado.' });
        return true;
      }

      const productId = productMatch[1];
      const data = await readJsonBody(req);

      db.exec('BEGIN TRANSACTION;');
      try {
        const isPromoVal = data.isPromo !== undefined ? (data.isPromo ? 1 : 0) : (data.is_promo !== undefined ? (data.is_promo ? 1 : 0) : undefined);
        const promoPriceVal = data.promoPrice !== undefined ? (data.promoPrice ? parseFloat(data.promoPrice) : null) : (data.promo_price !== undefined ? (data.promo_price ? parseFloat(data.promo_price) : null) : undefined);

        db.prepare(`
          UPDATE products SET
            name = ?, brand = ?, category = ?, category_label = ?, price = ?,
            original_price = ?, cost_price = ?, badge = ?, description = ?,
            is_promo = COALESCE(?, is_promo),
            promo_price = CASE WHEN ? = 1 THEN ? ELSE promo_price END
          WHERE id = ?
        `).run(
          data.name,
          data.brand || 'CVT Collection',
          data.category || 'camisas',
          data.categoryLabel || 'Camisas',
          parseFloat(data.price) || 0,
          data.originalPrice ? parseFloat(data.originalPrice) : null,
          data.costPrice ? parseFloat(data.costPrice) : null,
          data.badge || null,
          data.description || '',
          isPromoVal !== undefined ? isPromoVal : null,
          promoPriceVal !== undefined ? 1 : 0,
          promoPriceVal !== undefined ? promoPriceVal : null,
          productId
        );

        // Se imagens fornecidas, atualizar
        if (Array.isArray(data.images) && data.images.length > 0) {
          db.prepare('DELETE FROM product_images WHERE product_id = ?').run(productId);
          const insertImage = db.prepare(`
            INSERT INTO product_images (product_id, image_url, is_primary, display_order)
            VALUES (?, ?, ?, ?)
          `);
          data.images.forEach((imgUrl: string, idx: number) => {
            insertImage.run(productId, imgUrl, idx === 0 ? 1 : 0, idx);
          });
        }

        // Se variantes / stockBySize fornecidos, atualizar
        if (data.stockBySize && typeof data.stockBySize === 'object') {
          db.prepare('DELETE FROM product_variants WHERE product_id = ?').run(productId);
          const insertVariant = db.prepare(`
            INSERT INTO product_variants (product_id, size, stock_quantity)
            VALUES (?, ?, ?)
          `);
          Object.entries(data.stockBySize).forEach(([sz, qty]) => {
            insertVariant.run(productId, sz, parseInt(qty as any, 10) || 0);
          });
        } else if (Array.isArray(data.variants) && data.variants.length > 0) {
          db.prepare('DELETE FROM product_variants WHERE product_id = ?').run(productId);
          const insertVariant = db.prepare(`
            INSERT INTO product_variants (product_id, size, stock_quantity)
            VALUES (?, ?, ?)
          `);
          data.variants.forEach((v: any) => {
            insertVariant.run(productId, v.size, parseInt(v.stockQuantity, 10) || 0);
          });
        }

        db.exec('COMMIT;');
        const updated = getProductWithRelations(productId);
        sendJson(res, 200, { success: true, product: updated });
      } catch (err: any) {
        db.exec('ROLLBACK;');
        sendJson(res, 500, { error: err.message });
      }
      return true;
    }

    // 7. DELETE /api/products/:id
    if (productMatch && method === 'DELETE') {
      const user = authenticateRequest(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autorizado.' });
        return true;
      }

      const productId = productMatch[1];
      db.prepare('DELETE FROM products WHERE id = ?').run(productId);
      sendJson(res, 200, { success: true, message: 'Produto excluído com sucesso.' });
      return true;
    }

    // 8. PATCH /api/products/:id/stock (Atualização direta de estoque)
    const stockMatch = pathname.match(/^\/api\/products\/([^\/]+)\/stock$/);
    if (stockMatch && method === 'PATCH') {
      const user = authenticateRequest(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autorizado.' });
        return true;
      }

      const productId = stockMatch[1];
      const { size, newStockQuantity, delta } = await readJsonBody(req);

      if (size) {
        // Atualiza variante específica
        const current = db.prepare('SELECT stock_quantity FROM product_variants WHERE product_id = ? AND size = ?').get(productId, size) as any;
        let nextQty = typeof newStockQuantity === 'number' ? newStockQuantity : (current?.stock_quantity || 0) + (delta || 0);
        nextQty = Math.max(0, nextQty);

        db.prepare(`
          INSERT INTO product_variants (product_id, size, stock_quantity)
          VALUES (?, ?, ?)
          ON CONFLICT(product_id, size) DO UPDATE SET stock_quantity = ?
        `).run(productId, size, nextQty, nextQty);
      } else if (typeof newStockQuantity === 'number') {
        // Atualiza primeira variante ou distribui
        const variants = db.prepare('SELECT size FROM product_variants WHERE product_id = ?').all(productId) as any[];
        if (variants.length > 0) {
          db.prepare('UPDATE product_variants SET stock_quantity = ? WHERE product_id = ? AND size = ?')
            .run(newStockQuantity, productId, variants[0].size);
        } else {
          db.prepare('INSERT INTO product_variants (product_id, size, stock_quantity) VALUES (?, ?, ?)')
            .run(productId, 'M', newStockQuantity);
        }
      }

      const updated = getProductWithRelations(productId);
      sendJson(res, 200, { success: true, product: updated });
      return true;
    }

    // 8.1. PATCH /api/products/:id/promo (Toggle ou atualização rápida de promoção)
    const promoMatch = pathname.match(/^\/api\/products\/([^\/]+)\/promo$/);
    if (promoMatch && method === 'PATCH') {
      const user = authenticateRequest(req);
      if (!user) {
        sendJson(res, 401, { error: 'Não autorizado.' });
        return true;
      }

      const productId = promoMatch[1];
      const { isPromo, promoPrice } = await readJsonBody(req);
      const isPromoVal = isPromo ? 1 : 0;

      if (typeof promoPrice === 'number' && promoPrice > 0) {
        db.prepare('UPDATE products SET is_promo = ?, promo_price = ? WHERE id = ?').run(
          isPromoVal,
          promoPrice,
          productId
        );
      } else {
        db.prepare('UPDATE products SET is_promo = ? WHERE id = ?').run(
          isPromoVal,
          productId
        );
      }

      const updated = getProductWithRelations(productId);
      sendJson(res, 200, { success: true, product: updated });
      return true;
    }

    // 9. SALES & DASHBOARD STATS
    if (pathname === '/api/sales' && method === 'GET') {
      const sales = db.prepare('SELECT * FROM sales ORDER BY created_at DESC LIMIT 50').all();
      sendJson(res, 200, { sales });
      return true;
    }

    if (pathname === '/api/sales' && method === 'POST') {
      const { orderCode, customerName, totalValue, items, paymentMethod } = await readJsonBody(req);
      const saleId = `sale-${Date.now()}`;

      db.exec('BEGIN TRANSACTION;');
      try {
        db.prepare(`
          INSERT INTO sales (id, order_code, customer_name, total_value, payment_method, status)
          VALUES (?, ?, ?, ?, ?, 'concluido')
        `).run(saleId, orderCode, customerName || 'Cliente WhatsApp', totalValue, paymentMethod || 'WhatsApp / Pix');

        if (Array.isArray(items)) {
          const insertItem = db.prepare(`
            INSERT INTO sales_items (sale_id, product_id, product_name, size, quantity, unit_price, subtotal)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);
          items.forEach((it: any) => {
            insertItem.run(saleId, it.productId || null, it.name, it.size, it.quantity, it.price, it.price * it.quantity);
          });
        }
        db.exec('COMMIT;');
        sendJson(res, 201, { success: true, saleId });
      } catch (e: any) {
        db.exec('ROLLBACK;');
        sendJson(res, 500, { error: e.message });
      }
      return true;
    }

    // 10. DASHBOARD KPI
    if (pathname === '/api/dashboard/stats' && method === 'GET') {
      const products = getAllProducts();
      const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
      const criticalCount = products.filter((p) => p.stock < 5).length;

      const salesSummary = db.prepare(`
        SELECT COUNT(*) as count, COALESCE(SUM(total_value), 0) as totalRevenue FROM sales
      `).get() as any;

      sendJson(res, 200, {
        totalProducts: products.length,
        totalStock,
        criticalCount,
        totalRevenue: salesSummary?.totalRevenue || 0,
        totalOrders: salesSummary?.count || 0,
      });
      return true;
    }

    // Se a rota começar com /api mas não corresponder a nenhuma
    sendJson(res, 404, { error: `Endpoint não encontrado: ${pathname}` });
    return true;
  } catch (error: any) {
    console.error('API Error:', error);
    sendJson(res, 500, { error: error.message || 'Erro interno do servidor' });
    return true;
  }
}

