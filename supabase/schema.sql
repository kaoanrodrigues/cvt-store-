-- ==============================================================================
-- SCHEMA RELACIONAL DE BANCO DE DADOS - CVT STORE
-- Compatível com Supabase / PostgreSQL / Prisma / Relational SQL
-- ==============================================================================

-- 1. TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    sku VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) DEFAULT 'CVT Collection',
    category VARCHAR(64) NOT NULL,
    category_label VARCHAR(64) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    promo_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    badge VARCHAR(64),
    description TEXT,
    is_promo BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    sales_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABELA DE MÚLTIPLAS IMAGENS POR PRODUTO
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE VARIANTES DE TAMANHO E ESTOQUE
CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(32) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_product_size UNIQUE (product_id, size)
);

-- 4. TABELA DE VENDAS (REGISTRO DE TRANSAÇÕES)
CREATE TABLE IF NOT EXISTS sales (
    id VARCHAR(64) PRIMARY KEY,
    order_code VARCHAR(64) UNIQUE NOT NULL,
    customer_name VARCHAR(255) DEFAULT 'Cliente WhatsApp',
    total_value DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(64) DEFAULT 'Pix / Cartão',
    status VARCHAR(32) DEFAULT 'concluido',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABELA DE ITENS DA VENDA
CREATE TABLE IF NOT EXISTS sales_items (
    id SERIAL PRIMARY KEY,
    sale_id VARCHAR(64) NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
    product_id VARCHAR(64) REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(32) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- 6. TABELA DE USUÁRIOS ADMINISTRATIVOS
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) DEFAULT 'admin',
    name VARCHAR(255) DEFAULT 'Administrador CVT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);
CREATE INDEX IF NOT EXISTS idx_sales_items_sale_id ON sales_items(sale_id);

