import { Product, CategoryId } from '../types.ts';

export const WHATSAPP_NUMBER = '5581994651854';
export const WHATSAPP_DISPLAY = '(81) 99465-1854';
export const INSTAGRAM_HANDLE = '@store_cvt';
export const INSTAGRAM_URL = 'https://instagram.com/store_cvt';
export const CVT_LOGO_IMAGE = '/assets/aistudio/cvt_logo_trimmed.png';
export const STORE_ADDRESS = 'Rua Luciana Paiva de Souza, Nº 392, Igarassu - PE';
export const STORE_GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Rua+Luciana+Paiva+de+Souza,+392,+Igarassu+-+PE';

export const AUTHORIZED_BRANDS = [
  {
    id: 'dlz',
    name: 'DLZ',
    tagline: 'Jeans premium e alfaiataria casual contemporânea',
    badge: 'Revendedor Autorizado',
  },
  {
    id: 'mioche',
    name: 'MIOCHE',
    tagline: 'Elegância masculina moderna e polos de alto padrão',
    badge: 'Revendedor Autorizado',
  },
  {
    id: 'cvt',
    name: 'CVT COLLECTION',
    tagline: 'Linha própria exclusiva com cortes urbanos e caimento perfeito',
    badge: 'Marca Própria',
  },
];

export const CATEGORIES: { id: CategoryId; label: string; isPromo?: boolean }[] = [
  { id: 'todas', label: 'Todos os Produtos' },
  { id: 'promocoes', label: '🔥 Promoções', isPromo: true },
  { id: 'camisas', label: 'Camisas' },
  { id: 'polos', label: 'Polos' },
  { id: 'calcas', label: 'Calças' },
  { id: 'bermudas', label: 'Bermudas' },
  { id: 'bones', label: 'Bonés' },
];

export function getEffectivePrice(product: Product): number {
  if (product.isPromo && typeof product.promoPrice === 'number' && product.promoPrice > 0) {
    return product.promoPrice;
  }
  return product.price;
}

export const INITIAL_PRODUCTS: Product[] = [
  // --- CAMISAS ---
  {
    id: 'cam-01',
    sku: 'CVT-CAM-001',
    name: 'Camisa DLZ Premium Heavy Cotton',
    brand: 'DLZ',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 89.90,
    originalPrice: 109.90,
    promoPrice: 69.90,
    isPromo: true,
    costPrice: 42.00,
    stock: 3, // Estoque Crítico (< 5)
    salesCount: 142, // Top Seller
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Mais Vendida',
    sizes: ['P', 'M', 'G', 'GG'],
    stockBySize: { P: 1, M: 1, G: 1, GG: 0 },
    variants: [
      { size: 'P', stockQuantity: 1 },
      { size: 'M', stockQuantity: 1 },
      { size: 'G', stockQuantity: 1 },
      { size: 'GG', stockQuantity: 0 },
    ],
    colors: [
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Preto', hex: '#111827' },
      { name: 'Off-White', hex: '#F3F4F6' },
    ],
    description: 'Camisa em 100% algodão penteado fio 30.1 com toque macio e caimento alinhado no corpo. Parceria autorizada DLZ.',
    isPopular: true,
  },
  {
    id: 'cam-02',
    sku: 'CVT-CAM-002',
    name: 'Camisa Mioche Casual Graphic Tee',
    brand: 'Mioche',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 94.90,
    costPrice: 45.00,
    stock: 18,
    salesCount: 88,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Lançamento',
    sizes: ['P', 'M', 'G', 'GG'],
    stockBySize: { P: 4, M: 6, G: 5, GG: 3 },
    variants: [
      { size: 'P', stockQuantity: 4 },
      { size: 'M', stockQuantity: 6 },
      { size: 'G', stockQuantity: 5 },
      { size: 'GG', stockQuantity: 3 },
    ],
    colors: [
      { name: 'Preto', hex: '#111827' },
      { name: 'Chumbo', hex: '#374151' },
    ],
    description: 'Design contemporâneo Mioche com estampa minimalista de alta durabilidade que não racha nem desbota.',
  },
  {
    id: 'cam-03',
    sku: 'CVT-CAM-003',
    name: 'Camisa Básica Lisa Gola Canelada CVT',
    brand: 'CVT Collection',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 79.90,
    originalPrice: 89.90,
    costPrice: 35.00,
    stock: 2, // Estoque Crítico (< 5)
    salesCount: 165, // Top Seller #1
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Destaque',
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    stockBySize: { P: 1, M: 1, G: 0, GG: 0, XG: 0 },
    variants: [
      { size: 'P', stockQuantity: 1 },
      { size: 'M', stockQuantity: 1 },
      { size: 'G', stockQuantity: 0 },
      { size: 'GG', stockQuantity: 0 },
      { size: 'XG', stockQuantity: 0 },
    ],
    colors: [
      { name: 'Verde Militar', hex: '#3E4E3C' },
      { name: 'Preto', hex: '#111827' },
      { name: 'Areia', hex: '#D2B48C' },
    ],
    description: 'Gola canelada reforçada e costura ombro a ombro. Peça coringa para o dia a dia e finais de semana.',
    isPopular: true,
  },
  {
    id: 'cam-04',
    sku: 'CVT-CAM-004',
    name: 'Camisa DLZ Algodão Nobre Comfort',
    brand: 'DLZ',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 99.90,
    costPrice: 48.00,
    stock: 14,
    salesCount: 62,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['M', 'G', 'GG'],
    stockBySize: { M: 5, G: 5, GG: 4 },
    variants: [
      { size: 'M', stockQuantity: 5 },
      { size: 'G', stockQuantity: 5 },
      { size: 'GG', stockQuantity: 4 },
    ],
    colors: [
      { name: 'Azul Petróleo', hex: '#1F3A52' },
      { name: 'Branco Neve', hex: '#FFFFFF' },
    ],
    description: 'Linha nobre com acabamento peletizado de toque aveludado e respirabilidade superior.',
  },

  // --- POLOS ---
  {
    id: 'polo-01',
    sku: 'CVT-POL-001',
    name: 'Camisa Polo Piquet Premium Mioche',
    brand: 'Mioche',
    category: 'polos',
    categoryLabel: 'Polos',
    price: 119.90,
    originalPrice: 139.90,
    promoPrice: 99.90,
    isPromo: true,
    costPrice: 58.00,
    stock: 4, // Estoque Crítico (< 5)
    salesCount: 120, // Top Seller #3
    image: 'https://images.unsplash.com/photo-1625910513413-582151d0aa0d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1625910513413-582151d0aa0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Mais Vendida',
    sizes: ['P', 'M', 'G', 'GG'],
    stockBySize: { P: 1, M: 2, G: 1, GG: 0 },
    variants: [
      { size: 'P', stockQuantity: 1 },
      { size: 'M', stockQuantity: 2 },
      { size: 'G', stockQuantity: 1 },
      { size: 'GG', stockQuantity: 0 },
    ],
    colors: [
      { name: 'Azul Marinho', hex: '#172554' },
      { name: 'Bordô', hex: '#581C87' },
      { name: 'Preto', hex: '#111827' },
    ],
    description: 'Piquet encorpado de padrão nobre, peitilho estruturado e bordado sutil de alta definição.',
    isPopular: true,
  },
  {
    id: 'polo-02',
    sku: 'CVT-POL-002',
    name: 'Polo DLZ Minimalist Touch',
    brand: 'DLZ',
    category: 'polos',
    categoryLabel: 'Polos',
    price: 124.90,
    costPrice: 60.00,
    stock: 22,
    salesCount: 75,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625910513413-582151d0aa0d?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['M', 'G', 'GG', 'XG'],
    stockBySize: { M: 6, G: 8, GG: 5, XG: 3 },
    variants: [
      { size: 'M', stockQuantity: 6 },
      { size: 'G', stockQuantity: 8 },
      { size: 'GG', stockQuantity: 5 },
      { size: 'XG', stockQuantity: 3 },
    ],
    colors: [
      { name: 'Cinza Mescla', hex: '#6B7280' },
      { name: 'Branco', hex: '#FFFFFF' },
    ],
    description: 'Modelagem slim moderna, toque suave em algodão com elastano e gola reforçada.',
  },

  // --- CALÇAS ---
  {
    id: 'calc-01',
    sku: 'CVT-CAL-001',
    name: 'Calça Jeans Skinny Flex DLZ',
    brand: 'DLZ',
    category: 'calcas',
    categoryLabel: 'Calças',
    price: 169.90,
    originalPrice: 199.90,
    costPrice: 85.00,
    stock: 8,
    salesCount: 94,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Jeans Premium',
    sizes: ['38', '40', '42', '44', '46'],
    stockBySize: { '38': 2, '40': 2, '42': 2, '44': 1, '46': 1 },
    variants: [
      { size: '38', stockQuantity: 2 },
      { size: '40', stockQuantity: 2 },
      { size: '42', stockQuantity: 2 },
      { size: '44', stockQuantity: 1 },
      { size: '46', stockQuantity: 1 },
    ],
    colors: [
      { name: 'Jeans Médio com Used', hex: '#2563EB' },
      { name: 'Jeans Escuro Raw', hex: '#1E3A8A' },
    ],
    description: 'Jeans com 3% de elastano para liberdade total de movimentos sem perder a estrutura e o corte moderno.',
    isPopular: true,
  },
  {
    id: 'calc-02',
    sku: 'CVT-CAL-002',
    name: 'Calça Sarja Alfaiataria Casual Mioche',
    brand: 'Mioche',
    category: 'calcas',
    categoryLabel: 'Calças',
    price: 159.90,
    costPrice: 78.00,
    stock: 12,
    salesCount: 54,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['38', '40', '42', '44'],
    stockBySize: { '38': 3, '40': 4, '42': 3, '44': 2 },
    variants: [
      { size: '38', stockQuantity: 3 },
      { size: '40', stockQuantity: 4 },
      { size: '42', stockQuantity: 3 },
      { size: '44', stockQuantity: 2 },
    ],
    colors: [
      { name: 'Bege Areia', hex: '#D2B48C' },
      { name: 'Preto', hex: '#111827' },
      { name: 'Verde Militar', hex: '#3E4E3C' },
    ],
    description: 'Sarja acetinada de alto padrão, perfeita para trabalho, eventos e combinações sofisticadas.',
  },

  // --- BERMUDAS ---
  {
    id: 'berm-01',
    sku: 'CVT-BER-001',
    name: 'Bermuda Jeans Destroyed DLZ Premium',
    brand: 'DLZ',
    category: 'bermudas',
    categoryLabel: 'Bermudas',
    price: 129.90,
    originalPrice: 149.90,
    costPrice: 62.00,
    stock: 3, // Estoque Crítico (< 5)
    salesCount: 110,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Alta Procura',
    sizes: ['38', '40', '42', '44'],
    stockBySize: { '38': 1, '40': 1, '42': 1, '44': 0 },
    variants: [
      { size: '38', stockQuantity: 1 },
      { size: '40', stockQuantity: 1 },
      { size: '42', stockQuantity: 1 },
      { size: '44', stockQuantity: 0 },
    ],
    colors: [
      { name: 'Lavagem Clara Vintage', hex: '#60A5FA' },
      { name: 'Lavagem Média', hex: '#3B82F6' },
    ],
    description: 'Efeitos artesanais de puídos leves, cós anatômico confortável e barra dobrada no estilo.',
    isPopular: true,
  },
  {
    id: 'berm-02',
    sku: 'CVT-BER-002',
    name: 'Bermuda Linho Blend Summer Mioche',
    brand: 'Mioche',
    category: 'bermudas',
    categoryLabel: 'Bermudas',
    price: 139.90,
    costPrice: 68.00,
    stock: 16,
    salesCount: 46,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Verão',
    sizes: ['P', 'M', 'G', 'GG'],
    stockBySize: { P: 4, M: 5, G: 4, GG: 3 },
    variants: [
      { size: 'P', stockQuantity: 4 },
      { size: 'M', stockQuantity: 5 },
      { size: 'G', stockQuantity: 4 },
      { size: 'GG', stockQuantity: 3 },
    ],
    colors: [
      { name: 'Off-White Natural', hex: '#F5F5F0' },
      { name: 'Azul Céu', hex: '#93C5FD' },
    ],
    description: 'Tecido nobre blend de algodão com linho natural. Frescor inigualável para o calor do litoral pernambucano.',
  },

  // --- BONÉS ---
  {
    id: 'bone-01',
    sku: 'CVT-BON-001',
    name: 'Boné Strapback Bordado Exclusivo CVT',
    brand: 'CVT Collection',
    category: 'bones',
    categoryLabel: 'Bonés',
    price: 69.90,
    originalPrice: 84.90,
    costPrice: 28.00,
    stock: 1, // Estoque Crítico (< 5)
    salesCount: 135,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'Exclusivo CVT',
    sizes: ['Único Regulável'],
    stockBySize: { 'Único Regulável': 1 },
    variants: [
      { size: 'Único Regulável', stockQuantity: 1 },
    ],
    colors: [
      { name: 'Preto All Black', hex: '#111827' },
      { name: 'Branco / Preto', hex: '#E5E7EB' },
    ],
    description: 'Aba curva estruturada, bordado frontal em alta definição, fecho regulável metálico e acabamento interno de primeira linha.',
    isPopular: true,
  },
  {
    id: 'bone-02',
    sku: 'CVT-BON-002',
    name: 'Boné Trucker com Telinha Ventilada DLZ',
    brand: 'DLZ',
    category: 'bones',
    categoryLabel: 'Bonés',
    price: 64.90,
    originalPrice: 79.90,
    promoPrice: 49.90,
    isPromo: true,
    costPrice: 26.00,
    stock: 25,
    salesCount: 18,
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Único Regulável'],
    stockBySize: { 'Único Regulável': 25 },
    variants: [
      { size: 'Único Regulável', stockQuantity: 25 },
    ],
    colors: [
      { name: 'Preto / Branco', hex: '#1F2937' },
      { name: 'Azul Marinho', hex: '#1E3A8A' },
    ],
    description: 'Modelo trucker com telinha traseira para ventilação máxima. Assinado com a autenticidade DLZ.',
    isPopular: false,
  },
];

export const PRODUCTS = INITIAL_PRODUCTS;

/**
 * Gera um ID de pedido único no formato #CVT-XXXXX
 */
export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CVT-${dateStr}-${randomNum}`;
}

/**
 * Constrói o link oficial do WhatsApp com formatação rica do pedido
 */
export function buildCartWhatsAppLink(
  items: { name: string; size: string; quantity: number; price: number }[],
  orderId?: string
): string {
  const currentOrderId = orderId || generateOrderId();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} às ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  let text = `🛍️ *NOVO PEDIDO - CVT STORE*\n`;
  text += `📋 *Pedido:* #${currentOrderId}\n`;
  text += `📅 *Data:* ${formattedDate}\n\n`;
  text += `*Itens Selecionados:*\n`;

  items.forEach((item, index) => {
    const subtotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
    const unitPrice = item.price.toFixed(2).replace('.', ',');
    text += `${index + 1}. *${item.name}*\n`;
    text += `   • Tamanho: *${item.size}* | Qtd: *${item.quantity}* | Unit.: R$ ${unitPrice}\n`;
    text += `   • Subtotal: R$ ${subtotal}\n`;
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 *VALOR TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
  text += `💳 *Pagamento:* Pix com desconto ou Cartão em até 12x\n`;
  text += `📍 *Entrega:* Retirada na loja física (Igarassu) ou entrega via motoboy/correios\n\n`;
  text += `Olá! Montei meu pedido pelo site e gostaria de confirmar a disponibilidade e finalizar o pagamento!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppLink(productName: string, size?: string, price?: number): string {
  let message = `Olá! Vi o produto no catálogo da CVT STORE:\n\n*${productName}*`;
  if (size) {
    message += `\n• Tamanho: *${size}*`;
  }
  if (price) {
    message += `\n• Preço: *R$ ${price.toFixed(2).replace('.', ',')}*`;
  }
  message += `\n\nPoderia me confirmar a disponibilidade para entrega em Igarassu/região?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(subject?: string): string {
  const text = subject || 'Olá! Vim pelo site da CVT STORE e gostaria de atendimento!';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
