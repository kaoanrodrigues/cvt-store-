export type CategoryId = 'todas' | 'camisas' | 'polos' | 'calcas' | 'bermudas' | 'bones';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  badge: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: 'camisas' | 'polos' | 'calcas' | 'bermudas' | 'bones';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  sizes: string[];
  colors?: { name: string; hex: string }[];
  description: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
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
