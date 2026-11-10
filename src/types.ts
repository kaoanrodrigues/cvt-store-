export type CategoryId = 'todas' | 'promocoes' | 'camisas' | 'polos' | 'calcas' | 'bermudas' | 'bones';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  badge: string;
}

export interface ProductImage {
  id?: number | string;
  productId?: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder?: number;
}

export interface ProductVariant {
  id?: number | string;
  productId?: string;
  size: string;
  stockQuantity: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand?: string;
  category: 'camisas' | 'polos' | 'calcas' | 'bermudas' | 'bones';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  promoPrice?: number; // Preço promocional com desconto
  isPromo?: boolean; // Define se o item está ativo na aba de promoções
  costPrice?: number;
  image: string; // URL da imagem de capa (is_primary = true)
  images: string[]; // Lista completa de URLs para carrossel nos cards e detalhes
  productImages?: ProductImage[]; // Relacionamento da tabela product_images
  variants?: ProductVariant[]; // Relacionamento da tabela product_variants
  badge?: string;
  sizes: string[]; // Array de tamanhos disponíveis
  stock: number; // Quantidade total em estoque (soma das variantes)
  stockBySize?: Record<string, number>; // Mapeamento tamanho -> estoque
  salesCount: number; // Volume de vendas para cálculo de giro e top sellers
  colors?: { name: string; hex: string }[];
  description: string;
  isPopular?: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface SaleItem {
  id?: number | string;
  saleId?: string;
  productId: string;
  productName?: string;
  size: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  orderCode: string;
  customerName?: string;
  totalValue: number;
  status: 'concluido' | 'pendente' | 'cancelado';
  paymentMethod?: string;
  createdAt: string;
  items?: SaleItem[];
}

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
  productBought: string;
  date: string;
  verified: boolean;
}

export interface StoryHighlight {
  id: string;
  title: string;
  thumbnail: string;
  handle: string;
  caption: string;
}

export type AdminTab = 'dashboard' | 'products' | 'inventory' | 'ai-insights' | 'login';

export interface DailySalesData {
  day: string;
  revenue: number;
  orders: number;
}

export interface MonthlySalesData {
  month: string;
  revenue: number;
  orders: number;
}

export interface AiRecommendation {
  id: string;
  type: 'restock' | 'clearance' | 'pricing' | 'trend';
  title: string;
  productName: string;
  sku: string;
  impact: string;
  reason: string;
  suggestedAction: string;
  urgency: 'alta' | 'media' | 'baixa';
  potentialRevenueGain?: number;
}

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';
export type ExportDataset = 'consolidated' | 'sales' | 'inventory' | 'ai-insights';
