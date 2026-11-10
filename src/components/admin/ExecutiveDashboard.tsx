import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Package,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useStore } from '../../data/storeContext';

export const ExecutiveDashboard: React.FC = () => {
  const {
    products,
    dailySales,
    monthlySales,
    updateStock,
    setAdminTab,
  } = useStore();

  const [chartView, setChartView] = useState<'daily' | 'monthly'>('daily');

  // KPI Calculations
  const criticalItems = products.filter((p) => p.stock < 5);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalStockValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);
  const currentMonthRevenue = monthlySales[monthlySales.length - 1]?.revenue || 0;
  const currentMonthOrders = monthlySales[monthlySales.length - 1]?.orders || 1;
  const averageTicket = currentMonthRevenue / currentMonthOrders;

  // Top Sellers sorted by sales count
  const topSellers = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 5);

  const maxSales = Math.max(...topSellers.map((s) => s.salesCount), 1);

  // Chart data
  const chartData = chartView === 'daily'
    ? dailySales.map((d) => ({ label: d.day, val: d.revenue, orders: d.orders }))
    : monthlySales.map((m) => ({ label: m.month, val: m.revenue, orders: m.orders }));

  const maxVal = Math.max(...chartData.map((d) => d.val), 1);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-athletic">
            Dashboard Executivo & Inteligência
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Métricas em tempo real de faturamento, giro de inventário e alertas operacionais.
          </p>
        </div>

        <button
          onClick={() => setAdminTab('ai-insights')}
          className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-yellow-400/40 text-yellow-300 hover:text-yellow-200 text-xs font-bold rounded-lg transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Ver Insights da IA para Investimentos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Faturamento Mensal */}
        <div className="p-5 bg-zinc-900/90 border border-zinc-800 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider font-athletic">
            <span>Faturamento Mensal</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-athletic tracking-tight">
              R$ {currentMonthRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.9% em relação ao mês anterior</span>
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="p-5 bg-zinc-900/90 border border-zinc-800 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider font-athletic">
            <span>Ticket Médio</span>
            <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-athletic tracking-tight">
              R$ {averageTicket.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-400">
            <span>Baseado em {currentMonthOrders} pedidos fechados</span>
          </div>
        </div>

        {/* Estoque Total */}
        <div className="p-5 bg-zinc-900/90 border border-zinc-800 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase tracking-wider font-athletic">
            <span>Total em Estoque</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-white font-athletic tracking-tight">
              {totalStock} <span className="text-sm font-medium text-zinc-400">peças</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-400">
            <span>Valor de custo/venda: R$ {totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Alertas Críticos de Estoque */}
        <div 
          data-testid="critical-stock-kpi"
          className={`p-5 rounded-xl border relative overflow-hidden transition-all ${
            criticalItems.length > 0
              ? 'bg-rose-950/30 border-rose-500/40'
              : 'bg-zinc-900/90 border-zinc-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider font-athletic">
            <span className={criticalItems.length > 0 ? 'text-rose-400' : 'text-zinc-400'}>
              Estoque Crítico (&lt; 5)
            </span>
            <div className={`p-2 rounded-lg ${criticalItems.length > 0 ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-zinc-800 text-zinc-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span 
              data-testid="critical-items-count"
              className={`text-2xl sm:text-3xl font-black font-athletic tracking-tight ${criticalItems.length > 0 ? 'text-rose-400' : 'text-white'}`}
            >
              {criticalItems.length} <span className="text-sm font-medium text-zinc-400">produtos</span>
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-zinc-400">Risco imediato de ruptura</span>
            <button
              onClick={() => setAdminTab('inventory')}
              className="text-yellow-400 hover:underline font-bold"
            >
              Ver estoque &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue Chart + Top Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Revenue Chart */}
        <div className="lg:col-span-2 p-6 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">
                Curva de Faturamento
              </h3>
              <p className="text-xs text-zinc-400">Acompanhamento de vendas brutas</p>
            </div>

            <div className="flex items-center bg-zinc-950 p-1 border border-zinc-800 rounded-lg text-xs font-bold font-athletic">
              <button
                type="button"
                onClick={() => setChartView('daily')}
                className={`px-3 py-1 rounded transition-colors ${
                  chartView === 'daily'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Últimos 7 Dias
              </button>
              <button
                type="button"
                onClick={() => setChartView('monthly')}
                className={`px-3 py-1 rounded transition-colors ${
                  chartView === 'monthly'
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Mensal (6 Meses)
              </button>
            </div>
          </div>

          {/* SVG Bar Chart with Hover Feedback */}
          <div className="h-64 pt-6 flex items-end justify-between gap-3 sm:gap-6 border-b border-zinc-800 pb-2">
            {chartData.map((d) => {
              const heightPct = Math.round((d.val / maxVal) * 100);
              return (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-black border border-zinc-700 text-white text-[11px] px-2.5 py-1 rounded whitespace-nowrap shadow-xl pointer-events-none z-10 font-mono">
                    R$ {d.val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({d.orders} pedidos)
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[48px] bg-zinc-800/80 group-hover:bg-yellow-400/90 transition-all rounded-t flex flex-col justify-end" style={{ height: `${Math.max(12, heightPct * 1.8)}px` }}>
                    <div className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${heightPct}%` }} />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] font-bold text-zinc-400 group-hover:text-yellow-400 transition-colors uppercase font-athletic">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <span>*Valores consolidados de fechamentos via checkout e vendas diretas</span>
            <span className="text-yellow-400/80 font-bold">Média diária: R$ 2.954,00</span>
          </div>
        </div>

        {/* Top Sellers Widget */}
        <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white font-sans">
                Produtos Mais Vendidos
              </h3>
              <span className="text-[11px] text-yellow-400 font-bold uppercase font-athletic">Top 5</span>
            </div>
            <p className="text-xs text-zinc-400 mb-4">Volume total de saídas e giro</p>

            <div className="space-y-3.5">
              {topSellers.map((item, idx) => {
                const widthPct = Math.round((item.salesCount / maxSales) * 100);
                return (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="w-4 text-zinc-500 font-mono text-[11px]">{idx + 1}.</span>
                        <span className="font-bold text-white truncate" title={item.name}>{item.name}</span>
                      </div>
                      <span className="font-bold text-yellow-400 font-athletic shrink-0">
                        {item.salesCount} un.
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setAdminTab('products')}
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Gerenciar Catálogo Completo</span>
          </button>
        </div>
      </div>

      {/* Critical Stock Alert Box (se houver itens < 5) */}
      {criticalItems.length > 0 && (
        <div 
          data-testid="critical-stock-alert-box"
          className="p-5 bg-rose-950/20 border border-rose-500/40 rounded-xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-athletic tracking-wider">
                  Atenção Operacional: {criticalItems.length} {criticalItems.length === 1 ? 'Produto com Estoque Crítico' : 'Produtos com Estoque Crítico'} (&lt; 5 unidades)
                </h4>
                <p className="text-xs text-zinc-400 font-sans">
                  Reponha o inventário imediatamente para evitar cancelamentos e perda de vendas no WhatsApp.
                </p>
              </div>
            </div>

            <button
              onClick={() => setAdminTab('inventory')}
              className="hidden sm:flex items-center gap-1 text-xs text-yellow-400 hover:underline font-bold"
            >
              <span>Ajustar no Inventário</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {criticalItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded bg-black shrink-0 border border-zinc-800"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate" title={item.name}>{item.name}</p>
                    <p className="text-[11px] text-zinc-400 font-mono">{item.sku}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-black text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded font-athletic">
                    {item.stock} un.
                  </span>
                  <button
                    onClick={() => updateStock(item.id, item.stock + 10)}
                    title="Repor +10 unidades rapidamente"
                    className="p-1.5 bg-yellow-400 hover:bg-yellow-300 text-black rounded transition-all active:scale-95 text-xs font-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

