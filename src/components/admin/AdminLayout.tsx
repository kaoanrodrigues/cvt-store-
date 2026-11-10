import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Sparkles,
  Download,
  Store,
  LogOut,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../data/storeContext';
import { ExecutiveDashboard } from './ExecutiveDashboard';
import { ProductManagement } from './ProductManagement';
import { InventoryManagement } from './InventoryManagement';
import { AiInvestmentModule } from './AiInvestmentModule';
import { ExportModal } from './ExportModal';
import { AdminLogin } from './AdminLogin';
import { CvtLogo } from '../CvtLogo';

export const AdminLayout: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    setCurrentView,
    products,
    auth,
    logout,
  } = useStore();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Se não estiver autenticado, exibe a tela de login protegida
  if (!auth.isAuthenticated) {
    return <AdminLogin />;
  }

  const criticalStockCount = products.filter((p) => p.stock < 5).length;

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950 border-b border-zinc-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Brand Title */}
            <div className="flex items-center gap-4">
              <CvtLogo />
              <div className="hidden sm:block border-l border-zinc-800 pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-yellow-400 tracking-widest font-athletic block">
                    Painel Administrativo
                  </span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded">
                    Conectado ao DB
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium">
                  Gestão Integrada & Business Intelligence
                </span>
              </div>
            </div>

            {/* Right Quick Actions: User Info, Export Button, Store, Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User badge */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-athletic">
                <User className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-zinc-300 font-bold">{auth.user?.username || 'admin'}</span>
              </div>

              {/* Export Button */}
              <button
                type="button"
                data-testid="global-export-btn"
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 rounded-lg text-xs font-bold uppercase tracking-wider font-athletic transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-yellow-400" />
                <span className="hidden sm:inline">Exportar</span>
                <span>Relatórios</span>
              </button>

              {/* Back to storefront */}
              <button
                type="button"
                data-testid="back-to-store-btn"
                onClick={() => setCurrentView('store')}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg font-athletic transition-all shadow-md active:scale-95"
              >
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">Voltar para a</span>
                <span>Vitrine</span>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                data-testid="admin-logout-btn"
                onClick={logout}
                className="p-2 bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 border border-zinc-800 rounded-lg transition-colors"
                title="Sair da Conta"
                aria-label="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-zinc-900/60 border-t border-zinc-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
              <button
                data-testid="tab-dashboard"
                onClick={() => setAdminTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all font-athletic shrink-0 ${
                  adminTab === 'dashboard'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Executivo</span>
              </button>

              <button
                data-testid="tab-products"
                onClick={() => setAdminTab('products')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all font-athletic shrink-0 ${
                  adminTab === 'products'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Gestão de Produtos</span>
              </button>

              <button
                data-testid="tab-inventory"
                onClick={() => setAdminTab('inventory')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all font-athletic shrink-0 relative ${
                  adminTab === 'inventory'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Controle de Estoque</span>
                {criticalStockCount > 0 && (
                  <span
                    data-testid="inventory-alert-badge"
                    className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold animate-pulse"
                  >
                    {criticalStockCount}
                  </span>
                )}
              </button>

              <button
                data-testid="tab-ai-insights"
                onClick={() => setAdminTab('ai-insights')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all font-athletic shrink-0 ${
                  adminTab === 'ai-insights'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>IA para Investimentos</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {adminTab === 'dashboard' && <ExecutiveDashboard />}
        {adminTab === 'products' && <ProductManagement />}
        {adminTab === 'inventory' && <InventoryManagement />}
        {adminTab === 'ai-insights' && <AiInvestmentModule />}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-4 text-center text-xs text-zinc-500 font-sans">
        <p>CVT STORE • Sistema de Gestão Comercial e Inteligência Analítica • Igarassu - PE</p>
      </footer>

      {/* Global Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
