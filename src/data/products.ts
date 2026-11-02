import { Product } from '../types';

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

export const CATEGORIES: { id: 'todas' | 'camisas' | 'polos' | 'calcas' | 'bermudas' | 'bones'; label: string }[] = [
  { id: 'todas', label: 'Todos os Produtos' },
  { id: 'camisas', label: 'Camisas' },
  { id: 'polos', label: 'Polos' },
  { id: 'calcas', label: 'Calças' },
  { id: 'bermudas', label: 'Bermudas' },
  { id: 'bones', label: 'Bonés' },
];

export const PRODUCTS: Product[] = [
  // --- CAMISAS ---
  {
    id: 'cam-01',
    name: 'Camisa DLZ Premium Heavy Cotton',
    brand: 'DLZ',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 89.90,
    originalPrice: 109.90,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    badge: 'Mais Vendida',
    sizes: ['P', 'M', 'G', 'GG'],
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
    name: 'Camisa Mioche Casual Graphic Tee',
    brand: 'Mioche',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 94.90,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    badge: 'Lançamento',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#111827' },
      { name: 'Chumbo', hex: '#374151' },
    ],
    description: 'Design contemporâneo Mioche com estampa minimalista de alta durabilidade que não racha nem desbota.',
  },
  {
    id: 'cam-03',
    name: 'Camisa Básica Lisa Gola Canelada CVT',
    brand: 'CVT Collection',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 79.90,
    originalPrice: 89.90,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
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
    name: 'Camisa DLZ Algodão Nobre Comfort',
    brand: 'DLZ',
    category: 'camisas',
    categoryLabel: 'Camisas',
    price: 119.90,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    badge: 'Destaque DLZ',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Azul Marinho', hex: '#1E3A8A' },
      { name: 'Branco', hex: '#FFFFFF' },
    ],
    description: 'Tecido premium com toque sedoso e caimento de alto padrão. Linha oficial DLZ disponível na CVT STORE.',
  },

  // --- POLOS ---
  {
    id: 'polo-01',
    name: 'Camisa Polo Mioche Piquet Classic Fit',
    brand: 'Mioche',
    category: 'polos',
    categoryLabel: 'Polos',
    price: 119.90,
    originalPrice: 139.90,
    image: 'https://images.unsplash.com/photo-1625910513413-562b7e51c8a7?auto=format&fit=crop&w=800&q=80',
    badge: 'Destaque Mioche',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#111827' },
      { name: 'Branco', hex: '#FFFFFF' },
      { name: 'Bordô', hex: '#5B1E31' },
    ],
    description: 'Polo confeccionada em piquet encorpado de algodão e elastano. Gola e punhos com acabamento fino que mantém a estrutura.',
    isPopular: true,
  },
  {
    id: 'polo-02',
    name: 'Camisa Polo DLZ Slim Friso Duplo',
    brand: 'DLZ',
    category: 'polos',
    categoryLabel: 'Polos',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Azul Petróleo', hex: '#0F4C5C' },
      { name: 'Preto', hex: '#111827' },
    ],
    description: 'Detalhes de friso contrastante na gola e mangas, botões personalizados DLZ e caimento slim moderno.',
  },
  {
    id: 'polo-03',
    name: 'Camisa Polo Tech Zíper Metálico CVT',
    brand: 'CVT Collection',
    category: 'polos',
    categoryLabel: 'Polos',
    price: 139.90,
    originalPrice: 159.90,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    badge: 'Tendência',
    sizes: ['M', 'G', 'GG'],
    colors: [
      { name: 'Cinza Mescla', hex: '#4B5563' },
      { name: 'Preto', hex: '#111827' },
    ],
    description: 'Substituição moderna dos botões tradicionais por zíper metálico minimalista. Caimento impecável.',
    isPopular: true,
  },

  // --- CALÇAS ---
  {
    id: 'calc-01',
    name: 'Calça Jeans DLZ Slim Fit Flex Elastano',
    brand: 'DLZ',
    category: 'calcas',
    categoryLabel: 'Calças',
    price: 169.90,
    originalPrice: 189.90,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    badge: 'Campeã DLZ',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Jeans Azul Escuro', hex: '#1D2A44' },
      { name: 'Jeans Médio Lavado', hex: '#3B5998' },
    ],
    description: 'A clássica e mais procurada calça jeans da DLZ com elastano de alta recuperação, garantindo total flexibilidade e conforto.',
    isPopular: true,
  },
  {
    id: 'calc-02',
    name: 'Calça Sarja Chino Casual Mioche',
    brand: 'Mioche',
    category: 'calcas',
    categoryLabel: 'Calças',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Bege Cáqui', hex: '#C2B280' },
      { name: 'Preto', hex: '#111827' },
      { name: 'Verde Oliva', hex: '#556B2F' },
    ],
    description: 'Sarja peletizada super confortável da Mioche. Bolsos faca frontais e bolsos embutidos traseiros com acabamento nobre.',
  },
  {
    id: 'calc-03',
    name: 'Calça Jeans Black Estonada CVT',
    brand: 'CVT Collection',
    category: 'calcas',
    categoryLabel: 'Calças',
    price: 179.90,
    originalPrice: 199.90,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    badge: 'Visual Urbano',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Black Estonado', hex: '#262626' },
    ],
    description: 'Lavagem especial estonada com puídos discretos nos joelhos. Barra ajustada e estilo moderno marcante.',
    isPopular: true,
  },

  // --- BERMUDAS ---
  {
    id: 'berm-01',
    name: 'Bermuda Sarja Casual DLZ Stretch',
    brand: 'DLZ',
    category: 'bermudas',
    categoryLabel: 'Bermudas',
    price: 119.90,
    originalPrice: 139.90,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    badge: 'Mais Pedida',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Cáqui', hex: '#B89B72' },
      { name: 'Preto', hex: '#111827' },
      { name: 'Azul Marinho', hex: '#1C2E4A' },
    ],
    description: 'Corte acima do joelho, sarja com elastano para liberdade total de movimento. Ideal para churrascos e saídas descontraídas.',
    isPopular: true,
  },
  {
    id: 'berm-02',
    name: 'Bermuda Jeans Destroyed Mioche',
    brand: 'Mioche',
    category: 'bermudas',
    categoryLabel: 'Bermudas',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800&q=80',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Jeans Claro', hex: '#6BA4B8' },
      { name: 'Jeans Médio', hex: '#3B5998' },
    ],
    description: 'Jeans resistente com lavagem moderna clara e acabamento premium Mioche. Combinação perfeita com camisas e polos.',
  },
  {
    id: 'berm-03',
    name: 'Bermuda Moletom Casual Confort CVT',
    brand: 'CVT Collection',
    category: 'bermudas',
    categoryLabel: 'Bermudas',
    price: 99.90,
    originalPrice: 119.90,
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=800&q=80',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Cinza Mescla', hex: '#6B7280' },
      { name: 'Preto', hex: '#111827' },
    ],
    description: 'Moletom macio não felpado, cós elástico anatômico com cordão de ajuste e bolsos fundos com zíper.',
    isPopular: true,
  },

  // --- BONÉS ---
  {
    id: 'bone-01',
    name: 'Boné Snapback Aba Curva CVT Bordado',
    brand: 'CVT Collection',
    category: 'bones',
    categoryLabel: 'Bonés',
    price: 69.90,
    originalPrice: 84.90,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusivo CVT',
    sizes: ['Tamanho Único Regulável'],
    colors: [
      { name: 'Preto All Black', hex: '#111827' },
      { name: 'Branco / Preto', hex: '#E5E7EB' },
    ],
    description: 'Aba curva estruturada, bordado frontal em alta definição, fecho regulável e acabamento interno de primeira linha.',
    isPopular: true,
  },
  {
    id: 'bone-02',
    name: 'Boné Trucker com Telinha Ventilada DLZ',
    brand: 'DLZ',
    category: 'bones',
    categoryLabel: 'Bonés',
    price: 64.90,
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
    sizes: ['Tamanho Único Regulável'],
    colors: [
      { name: 'Preto / Branco', hex: '#1F2937' },
      { name: 'Azul Marinho', hex: '#1E3A8A' },
    ],
    description: 'Modelo trucker com telinha traseira para ventilação máxima. Assinado com a autenticidade DLZ.',
    isPopular: true,
  },
  {
    id: 'bone-03',
    name: 'Boné Dad Hat Vintage Desestruturado Mioche',
    brand: 'Mioche',
    category: 'bones',
    categoryLabel: 'Bonés',
    price: 59.90,
    originalPrice: 69.90,
    image: 'https://images.unsplash.com/photo-1521338600-b80c3260840b?auto=format&fit=crop&w=800&q=80',
    badge: 'Clássico',
    sizes: ['Tamanho Único Regulável'],
    colors: [
      { name: 'Verde Musgo', hex: '#2E3E26' },
      { name: 'Bege Caqui', hex: '#A39171' },
      { name: 'Preto', hex: '#111827' },
    ],
    description: 'Estilo desestruturado em sarja 100% algodão lavada. Fivela metálica de ajuste com passador embutido.',
  },
];

export function buildWhatsAppLink(productName: string, size?: string, price?: number): string {
  let message = `Olá! Vi o site da CVT STORE e tenho interesse em: *${productName}*`;
  if (size) {
    message += ` (Tamanho: ${size})`;
  }
  if (price) {
    message += ` - R$ ${price.toFixed(2).replace('.', ',')}`;
  }
  message += `. Poderia me confirmar se está disponível para entrega ou retirada?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(subject?: string): string {
  const text = subject || 'Olá! Vim pelo site da CVT STORE e gostaria de conhecer as novidades e fazer um pedido!';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildCartWhatsAppLink(items: { name: string; size: string; quantity: number; price: number }[]): string {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  let text = `Olá! Montei meu pedido no site da CVT STORE e gostaria de fechar:\n\n`;
  items.forEach((item, index) => {
    text += `${index + 1}. *${item.name}* (Tam: ${item.size}) x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
  });
  text += `\n*Valor Total: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
  text += `Poderia me informar as opções de pagamento (Pix/Cartão) e entrega em Igarassu/região?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
