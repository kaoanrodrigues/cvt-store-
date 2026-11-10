import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  AdminTab,
  DailySalesData,
  MonthlySalesData,
  AiRecommendation,
  ExportFormat,
  ExportDataset,
  AdminUser,
  AuthState,
} from '../types';
import { INITIAL_PRODUCTS, getEffectivePrice } from './products';
import { api, getStoredToken, getStoredUser, clearStoredSession } from '../services/api';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  togglePromo: (id: string, isPromo: boolean, promoPrice?: number) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateStock: (id: string, newStock: number, size?: string) => Promise<void>;
  resetToDefaultCatalog: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  totalCartItems: number;
  totalCartValue: number;

  // Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Auth & Admin
  auth: AuthState;
  login: (username: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;

  // Navigation
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Analytics & AI
  dailySales: DailySalesData[];
  monthlySales: MonthlySalesData[];
  aiRecommendations: AiRecommendation[];
  isGeneratingAi: boolean;
  generateAiInsights: () => Promise<void>;

  // Export
  exportData: (format: ExportFormat, dataset: ExportDataset) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'cvt_store_products_v3';
const CART_STORAGE_KEY = 'cvt_store_cart_v3';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Auth State ---
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = getStoredToken();
    const user = getStoredUser();
    return {
      isAuthenticated: !!token,
      user,
      token,
    };
  });

  // --- Products State ---
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored products', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Carrega produtos do banco de dados relacional via API ao iniciar
  useEffect(() => {
    let mounted = true;
    api.getProducts()
      .then((dbProducts) => {
        if (mounted && dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(dbProducts));
        }
      })
      .catch((err) => {
        console.warn('Usando catálogo local / cache (API offline ou inicializando):', err.message);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  }, [products]);

  // --- Cart State ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // --- Navigation & Routing ---
  const [currentView, setCurrentView] = useState<'store' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.startsWith('#admin') ? 'admin' : 'store';
    }
    return 'store';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#admin')) {
        setCurrentView('admin');
      } else if (window.location.hash === '' || window.location.hash === '#store') {
        setCurrentView('store');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetCurrentView = (view: 'store' | 'admin') => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      if (view === 'admin') {
        window.location.hash = 'admin';
      } else {
        if (window.location.hash.startsWith('#admin')) {
          window.location.hash = '';
        }
      }
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Auth operations
  const login = async (username: string, password: string, remember: boolean = true) => {
    const data = await api.login(username, password, remember);
    setAuth({
      isAuthenticated: true,
      user: data.user,
      token: data.token,
    });
    setAdminTab('dashboard');
  };

  const logout = async () => {
    await api.logout();
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    setAdminTab('login');
  };

  // Product CRUD
  const addProduct = async (newProductData: Omit<Product, 'id'>): Promise<Product> => {
    const tempId = `prod-${Date.now()}`;
    const localProduct: Product = {
      ...newProductData,
      id: tempId,
      sku: newProductData.sku || `CVT-${newProductData.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      salesCount: newProductData.salesCount || 0,
      createdAt: new Date().toISOString(),
      images: (newProductData.images && newProductData.images.length > 0)
        ? newProductData.images
        : [newProductData.image],
    };

    // Atualização otimista
    setProducts((prev) => [localProduct, ...prev]);

    try {
      const created = await api.createProduct(localProduct);
      if (created) {
        setProducts((prev) => prev.map((p) => (p.id === tempId ? created : p)));
        return created;
      }
    } catch (e) {
      console.warn('Gravado localmente (sincronizará com DB):', e);
    }
    return localProduct;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    // Atualização otimista
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextImages = updatedFields.images && updatedFields.images.length > 0
            ? updatedFields.images
            : updatedFields.image ? [updatedFields.image] : item.images;
          return {
            ...item,
            ...updatedFields,
            images: nextImages,
            image: nextImages[0] || item.image,
          };
        }
        return item;
      })
    );

    try {
      await api.updateProduct(id, updatedFields);
    } catch (e) {
      console.warn('Atualizado localmente:', e);
    }
  };

  const togglePromo = async (id: string, isPromo: boolean, promoPrice?: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isPromo,
            promoPrice: promoPrice !== undefined ? promoPrice : item.promoPrice,
          };
        }
        return item;
      })
    );

    try {
      await api.togglePromo(id, isPromo, promoPrice);
    } catch (e) {
      console.warn('Promoção alternada localmente:', e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    try {
      await api.deleteProduct(id);
    } catch (e) {
      console.warn('Excluído localmente:', e);
    }
  };

  const updateStock = async (id: string, newStock: number, size?: string) => {
    const safeStock = Math.max(0, newStock);
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStockBySize = { ...(item.stockBySize || {}) };
          if (size) {
            nextStockBySize[size] = safeStock;
            const sum = Object.values(nextStockBySize).reduce((a, b) => a + b, 0);
            return { ...item, stock: sum, stockBySize: nextStockBySize };
          }
          return { ...item, stock: safeStock };
        }
        return item;
      })
    );

    try {
      await api.updateVariantStock(id, size, safeStock);
    } catch (e) {
      console.warn('Estoque ajustado localmente:', e);
    }
  };

  const resetToDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  };

  // Cart operations
  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + getEffectivePrice(item.product) * item.quantity, 0);

  // Analytics mock data
  const dailySales: DailySalesData[] = [
    { day: 'Seg', revenue: 1420.00, orders: 12 },
    { day: 'Ter', revenue: 1890.50, orders: 16 },
    { day: 'Qua', revenue: 2150.00, orders: 19 },
    { day: 'Qui', revenue: 2680.00, orders: 24 },
    { day: 'Sex', revenue: 4120.00, orders: 36 },
    { day: 'Sáb', revenue: 5340.00, orders: 48 },
    { day: 'Dom', revenue: 2980.00, orders: 26 },
  ];

  const monthlySales: MonthlySalesData[] = [
    { month: 'Jun', revenue: 58400.00, orders: 512 },
    { month: 'Jul', revenue: 64200.00, orders: 560 },
    { month: 'Ago', revenue: 69800.00, orders: 610 },
    { month: 'Set', revenue: 74500.00, orders: 652 },
    { month: 'Out', revenue: 82100.00, orders: 718 },
    { month: 'Nov (Atual)', revenue: 89400.00, orders: 785 },
  ];

  // AI Recommendations Engine
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AiRecommendation[]>([
    {
      id: 'rec-1',
      type: 'restock',
      title: 'Urgência de Reposição por Alto Giro',
      productName: 'Camisa DLZ Premium Heavy Cotton',
      sku: 'CVT-CAM-001',
      impact: '+R$ 3.840 de faturamento projetado',
      reason: 'O produto tem giro 42% acima da média da categoria e o estoque atual está em nível crítico (3 unidades). Previsão de esgotamento em menos de 48 horas.',
      suggestedAction: 'Emitir pedido de reposição de lote de 35 a 50 unidades com o fornecedor DLZ imediatamente para não perder as vendas do final de semana.',
      urgency: 'alta',
      potentialRevenueGain: 3840,
    },
    {
      id: 'rec-2',
      type: 'restock',
      title: 'Risco de Ruptura de Estoque no Top Seller',
      productName: 'Camisa Básica Lisa Gola Canelada CVT',
      sku: 'CVT-CAM-003',
      impact: 'Ruptura iminente (2 un. restantes)',
      reason: 'É o produto #1 em conversão orgânica e possui apenas 2 unidades disponíveis no galpão de Igarassu.',
      suggestedAction: 'Cortar novo lote de produção própria na grade completa (P ao XG) com foco nos tamanhos M e G.',
      urgency: 'alta',
      potentialRevenueGain: 5200,
    },
    {
      id: 'rec-3',
      type: 'clearance',
      title: 'Queima de Estoque Estratégica (Liberação de Caixa)',
      productName: 'Boné Trucker com Telinha Ventilada DLZ',
      sku: 'CVT-BON-002',
      impact: 'Liberar R$ 1.622,50 em capital de giro',
      reason: '25 unidades em estoque com giro 58% inferior ao boné strapback. Capital de giro imobilizado há mais de 45 dias.',
      suggestedAction: 'Criar combo promocional "Compre uma camisa Polo e leve o Boné com 25% OFF" para acelerar desova antes da virada da coleção.',
      urgency: 'media',
      potentialRevenueGain: 1622,
    },
    {
      id: 'rec-4',
      type: 'trend',
      title: 'Oportunidade Sazonal - Linho & Bermudas',
      productName: 'Bermuda Linho Blend Summer Mioche',
      sku: 'CVT-BER-002',
      impact: '+24% de crescimento na procura climática',
      reason: 'Com a elevação das temperaturas e proximidade do verão no litoral, a busca por linho e bermudas claras cresceu aceleradamente nas últimas duas semanas.',
      suggestedAction: 'Destacar no banner principal da vitrine e posicionar no início da categoria Bermudas.',
      urgency: 'media',
      potentialRevenueGain: 2800,
    },
  ]);

  const generateAiInsights = async () => {
    setIsGeneratingAi(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lowStockItems = products.filter((p) => p.stock < 5);
    const slowMovingItems = products.filter((p) => p.stock > 15 && p.salesCount < 30);
    const topPerformers = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 3);

    const newRecommendations: AiRecommendation[] = [];

    if (lowStockItems.length > 0) {
      const item = lowStockItems[0];
      newRecommendations.push({
        id: `ai-gen-${Date.now()}-1`,
        type: 'restock',
        title: `Alerta Crítico: Reposição Prioritária para ${item.brand || 'Item'}`,
        productName: item.name,
        sku: item.sku,
        impact: `Estoque atual: apenas ${item.stock} unidades`,
        reason: `Detectado estoque abaixo do limite operacional de segurança (5 un.). A velocidade de saída atual projeta estoque zero em breve.`,
        suggestedAction: `Solicitar lote emergencial de 30 unidades junto ao representante para preservar taxa de conversão.`,
        urgency: 'alta',
        potentialRevenueGain: Math.round(item.price * 30),
      });
    }

    if (slowMovingItems.length > 0) {
      const slow = slowMovingItems[0];
      newRecommendations.push({
        id: `ai-gen-${Date.now()}-2`,
        type: 'clearance',
        title: `Liquidação de Estoque Parado`,
        productName: slow.name,
        sku: slow.sku,
        impact: `Liberar R$ ${(slow.stock * slow.price * 0.8).toFixed(2)} em caixa`,
        reason: `${slow.stock} unidades sem tração significativa nas últimas semanas. Custo de oportunidade elevado.`,
        suggestedAction: `Oferecer cupom relâmpago de 15% a 20% no WhatsApp para reativar base de clientes recorrentes.`,
        urgency: 'media',
        potentialRevenueGain: Math.round(slow.stock * (slow.costPrice || slow.price * 0.5)),
      });
    }

    if (topPerformers.length > 0) {
      const top = topPerformers[0];
      newRecommendations.push({
        id: `ai-gen-${Date.now()}-3`,
        type: 'trend',
        title: `Maximizar Escala do Campeão de Vendas`,
        productName: top.name,
        sku: top.sku,
        impact: `Líder em conversão (${top.salesCount} vendas acumuladas)`,
        reason: `Maior aceitação pelo público jovem e casual em Igarassu. Margem de lucro saudável.`,
        suggestedAction: `Negociar desconto por volume na próxima compra de 100 unidades com a confecção parceira.`,
        urgency: 'baixa',
        potentialRevenueGain: 4500,
      });
    }

    setAiRecommendations(newRecommendations.length > 0 ? newRecommendations : aiRecommendations);
    setIsGeneratingAi(false);
  };

  // Export Data Engine
  const exportData = (format: ExportFormat, dataset: ExportDataset) => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `cvt-store-${dataset}-${timestamp}`;

    if (format === 'json') {
      const dataToExport = {
        exportedAt: new Date().toISOString(),
        store: 'CVT STORE',
        products,
        dailySales,
        monthlySales,
        aiRecommendations,
      };
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json;charset=utf-8',
      });
      triggerDownload(blob, `${filename}.json`);
      return;
    }

    if (format === 'csv' || format === 'excel') {
      let csvContent = '\uFEFF';

      if (dataset === 'inventory' || dataset === 'consolidated') {
        csvContent += 'SKU;Produto;Marca;Categoria;Preco_Venda;Preco_Custo;Estoque;Status_Estoque;Vendas_Acumuladas\n';
        products.forEach((p) => {
          const status = p.stock < 5 ? 'CRITICO' : p.stock < 10 ? 'ATENCAO' : 'NORMAL';
          csvContent += `"${p.sku}";"${p.name}";"${p.brand || 'CVT'}";"${p.categoryLabel}";"${p.price.toFixed(2)}";"${(p.costPrice || 0).toFixed(2)}";${p.stock};"${status}";${p.salesCount}\n`;
        });
      }

      if (dataset === 'sales') {
        csvContent += 'Periodo;Faturamento_R$;Pedidos_Finalizados;Ticket_Medio_R$\n';
        monthlySales.forEach((m) => {
          const ticketMedio = (m.revenue / m.orders).toFixed(2);
          csvContent += `"${m.month}";"${m.revenue.toFixed(2)}";${m.orders};"${ticketMedio}"\n`;
        });
      }

      if (dataset === 'ai-insights') {
        csvContent += 'Prioridade;Tipo;Titulo;Produto;SKU;Impacto_Estimado;Recomendacao_Estrategica\n';
        aiRecommendations.forEach((r) => {
          csvContent += `"${r.urgency.toUpperCase()}";"${r.type}";"${r.title}";"${r.productName}";"${r.sku}";"${r.impact}";"${r.suggestedAction.replace(/"/g, '""')}"\n`;
        });
      }

      const mimeType = format === 'excel' ? 'application/vnd.ms-excel;charset=utf-8' : 'text/csv;charset=utf-8';
      const ext = format === 'excel' ? 'xls' : 'csv';
      const blob = new Blob([csvContent], { type: mimeType });
      triggerDownload(blob, `${filename}.${ext}`);
      return;
    }

    if (format === 'pdf') {
      generatePdfReport(dataset, products, aiRecommendations, monthlySales);
    }
  };

  const triggerDownload = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePdfReport = (
    dataset: ExportDataset,
    prods: Product[],
    recs: AiRecommendation[],
    monthly: MonthlySalesData[]
  ) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permita pop-ups para gerar a visualização de PDF.');
      return;
    }

    const lowStockCount = prods.filter((p) => p.stock < 5).length;
    const totalEstoque = prods.reduce((s, p) => s + p.stock, 0);
    const totalValorEstoque = prods.reduce((s, p) => s + p.stock * p.price, 0);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CVT STORE - Relatório Gerencial</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; color: #111; }
          .header { border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
          .title { font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; }
          .subtitle { font-size: 13px; color: #555; }
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
          .kpi-card { background: #f4f4f5; padding: 15px; border-radius: 6px; border: 1px solid #e4e4e7; }
          .kpi-label { font-size: 11px; text-transform: uppercase; color: #71717a; font-weight: bold; }
          .kpi-value { font-size: 20px; font-weight: 800; margin-top: 5px; color: #000; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th { background: #18181b; color: #fff; text-align: left; padding: 8px 10px; font-size: 11px; text-transform: uppercase; }
          td { padding: 8px 10px; border-bottom: 1px solid #e4e4e7; }
          tr:nth-child(even) { background: #fafafa; }
          .badge-critical { background: #fef2f2; color: #dc2626; padding: 2px 6px; font-weight: bold; border-radius: 4px; border: 1px solid #fecaca; }
          .badge-ok { background: #f0fdf4; color: #16a34a; padding: 2px 6px; font-weight: bold; border-radius: 4px; }
          .ai-box { background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 25px; border-radius: 4px; }
          @media print {
            body { margin: 20px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">CVT STORE • Relatório Executivo</div>
            <div class="subtitle">Revendedor Autorizado DLZ & Mioche • Igarassu - PE • Data: ${new Date().toLocaleDateString('pt-BR')}</div>
          </div>
          <button onclick="window.print()" style="padding: 8px 16px; background: #000; color: #fff; border: none; cursor: pointer; border-radius: 4px; font-weight: bold;">
            Imprimir / Salvar em PDF
          </button>
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Total de Peças</div>
            <div class="kpi-value">${totalEstoque} un.</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Valor em Estoque</div>
            <div class="kpi-value">R$ ${totalValorEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Alertas Críticos (< 5 un)</div>
            <div class="kpi-value" style="color: ${lowStockCount > 0 ? '#dc2626' : '#16a34a'};">${lowStockCount} itens</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Faturamento Mensal</div>
            <div class="kpi-value">R$ ${monthly[monthly.length - 1].revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        <h3>Controle de Inventário e Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Produto</th>
              <th>Marca</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Vendas</th>
            </tr>
          </thead>
          <tbody>
            ${prods
              .map(
                (p) => `
              <tr>
                <td><strong>${p.sku}</strong></td>
                <td>${p.name}</td>
                <td>${p.brand || 'CVT'}</td>
                <td>R$ ${p.price.toFixed(2)}</td>
                <td><strong>${p.stock}</strong></td>
                <td>${p.stock < 5 ? '<span class="badge-critical">CRÍTICO (< 5)</span>' : '<span class="badge-ok">REGULAR</span>'}</td>
                <td>${p.salesCount} un.</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="ai-box">
          <h4 style="margin: 0 0 10px 0; color: #92400e;">💡 Parecer da Inteligência Artificial para Compras & Estoque</h4>
          ${recs
            .map(
              (r) => `
            <div style="margin-bottom: 10px;">
              <strong>• [${r.urgency.toUpperCase()}] ${r.title} (${r.productName}):</strong> ${r.suggestedAction}
            </div>
          `
            )
            .join('')}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        togglePromo,
        deleteProduct,
        updateStock,
        resetToDefaultCatalog,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCartItems,
        totalCartValue,
        quickViewProduct,
        setQuickViewProduct,
        auth,
        login,
        logout,
        currentView,
        setCurrentView: handleSetCurrentView,
        adminTab,
        setAdminTab,
        dailySales,
        monthlySales,
        aiRecommendations,
        isGeneratingAi,
        generateAiInsights,
        exportData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
