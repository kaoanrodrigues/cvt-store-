import { Product, Sale, AdminUser } from '../types';

const TOKEN_KEY = 'cvt_store_admin_token';
const USER_KEY = 'cvt_store_admin_user';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function setStoredSession(token: string, user: AdminUser, remember: boolean = true) {
  if (typeof window === 'undefined') return;
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function request(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errMsg = `Erro ${res.status}`;
    try {
      const errData = await res.json();
      if (errData && errData.error) errMsg = errData.error;
    } catch {
      // ignore
    }
    throw new Error(errMsg);
  }

  return res.json();
}

export const api = {
  // Auth
  async login(username: string, password: string, remember: boolean = true) {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (data.token && data.user) {
      setStoredSession(data.token, data.user, remember);
    }
    return data;
  },

  async verifyAuth() {
    return request('/api/auth/verify');
  },

  async logout() {
    try {
      await request('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    clearStoredSession();
  },

  // Products
  async getProducts(): Promise<Product[]> {
    const data = await request('/api/products');
    return data.products || [];
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const data = await request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    return data.product;
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const data = await request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
    return data.product;
  },

  async deleteProduct(id: string): Promise<void> {
    await request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },

  async updateVariantStock(productId: string, size?: string, newStockQuantity?: number, delta?: number): Promise<Product> {
    const data = await request(`/api/products/${productId}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ size, newStockQuantity, delta }),
    });
    return data.product;
  },

  async togglePromo(productId: string, isPromo: boolean, promoPrice?: number): Promise<Product> {
    const data = await request(`/api/products/${productId}/promo`, {
      method: 'PATCH',
      body: JSON.stringify({ isPromo, promoPrice }),
    });
    return data.product;
  },

  // Sales
  async getSales(): Promise<Sale[]> {
    const data = await request('/api/sales');
    return data.sales || [];
  },

  async recordSale(orderData: { orderCode: string; totalValue: number; items: any[]; customerName?: string }): Promise<string> {
    const data = await request('/api/sales', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return data.saleId;
  },

  // Dashboard
  async getDashboardStats() {
    return request('/api/dashboard/stats');
  },
};

