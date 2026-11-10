import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Layers,
  Flame,
} from 'lucide-react';
import { useStore } from '../../data/storeContext';

export const InventoryManagement: React.FC = () => {
  const { products, updateStock, togglePromo } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStockStatus, setFilterStockStatus] = useState<'all' | 'critical' | 'normal' | 'promo'>('all');

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterStockStatus === 'critical') return matchesSearch && p.stock < 5;
    if (filterStockStatus === 'normal') return matchesSearch && p.stock >= 5;
    if (filterStockStatus === 'promo') return matchesSearch && Boolean(p.isPromo);
    return matchesSearch;
  });

  const criticalCount = products.filter((p) => p.stock < 5).length;
  const promoCount = products.filter((p) => p.isPromo).length;
  const totalStockItems = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-athletic">
            Gestão de Estoque & Inventário (Tabela Relacional)
          </h2>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Controle de variantes (`product_variants`) com alertas de estoque baixo (&lt; 5 unidades).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-athletic uppercase">
            <span className="text-zinc-400">Total em Saldo: </span>
            <span className="font-bold text-white">{totalStockItems} peças</span>
          </div>

          <div
            className={`px-3.5 py-1.5 rounded-lg text-xs font-athletic uppercase flex items-center gap-1.5 ${
              criticalCount > 0
                ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400 animate-pulse'
                : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="font-bold">{criticalCount} Críticos (&lt; 5)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por SKU, nome da peça ou marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 font-sans"
          />
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 p-1 border border-zinc-800 rounded-lg text-xs font-athletic uppercase">
          <button
            type="button"
            onClick={() => setFilterStockStatus('all')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filterStockStatus === 'all'
                ? 'bg-yellow-400 text-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todos ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStockStatus('critical')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              filterStockStatus === 'critical'
                ? 'bg-rose-500 text-white font-bold'
                : 'text-zinc-400 hover:text-rose-400'
            }`}
          >
            <span>Críticos &lt; 5</span>
            <span className="bg-rose-950/60 px-1 rounded text-[10px]">{criticalCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterStockStatus('normal')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filterStockStatus === 'normal'
                ? 'bg-emerald-500 text-black font-bold'
                : 'text-zinc-400 hover:text-emerald-400'
            }`}
          >
            Em Dia ({products.length - criticalCount})
          </button>
          <button
            type="button"
            data-testid="admin-inv-filter-promo"
            onClick={() => setFilterStockStatus('promo')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              filterStockStatus === 'promo'
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold'
                : 'text-zinc-400 hover:text-yellow-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span>Promoções ({promoCount})</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider border-b border-zinc-800 font-athletic">
              <tr>
                <th className="py-3 px-4">SKU / Peça</th>
                <th className="py-3 px-4">Estoque por Tamanho (`product_variants`)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Oferta / Promoção</th>
                <th className="py-3 px-4 text-center">Total</th>
                <th className="py-3 px-4 text-center">Reposição Rápida (+1 / +5 / +10)</th>
                <th className="py-3 px-4 text-right">Valor em Estoque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              {filtered.map((item) => {
                const isCritical = item.stock < 5;
                const isWarning = item.stock >= 5 && item.stock < 10;
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isCritical ? 'bg-rose-950/10 hover:bg-rose-950/20' : 'hover:bg-zinc-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-13 object-cover rounded bg-black border border-zinc-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] text-yellow-400 font-bold">{item.sku}</p>
                        <p className="font-bold text-white text-xs truncate max-w-[180px]" title={item.name}>
                          {item.name}
                        </p>
                        <p className="text-[10px] text-zinc-400">{item.brand || 'CVT'} • {item.categoryLabel}</p>
                      </div>
                    </td>

                    {/* Stock by size badges with individual +/- controls */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                        {item.sizes.map((sz) => {
                          const sizeQty = item.stockBySize?.[sz] !== undefined ? item.stockBySize[sz] : 0;
                          const isLow = sizeQty < 3;
                          return (
                            <div
                              key={sz}
                              className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[11px] font-athletic ${
                                isLow
                                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                                  : 'bg-zinc-950 text-zinc-200 border-zinc-800'
                              }`}
                            >
                              <span className="font-bold text-yellow-400">{sz}:</span>
                              <span>{sizeQty}</span>
                              <button
                                type="button"
                                onClick={() => updateStock(item.id, sizeQty + 1, sz)}
                                className="w-4 h-4 bg-zinc-800 hover:bg-yellow-400 hover:text-black rounded flex items-center justify-center transition-colors text-[9px]"
                                title={`Adicionar 1 ao tamanho ${sz}`}
                              >
                                +
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isCritical ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-[11px] font-black uppercase font-athletic animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Crítico (&lt; 5)</span>
                        </span>
                      ) : isWarning ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[11px] font-black uppercase font-athletic">
                          <span>Atenção (&lt; 10)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[11px] font-black uppercase font-athletic">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Normal</span>
                        </span>
                      )}
                    </td>

                    {/* Promoção 1-Clique */}
                    <td className="py-3.5 px-4 font-sans">
                      {item.isPromo && item.promoPrice ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-600/20 text-yellow-400 border border-yellow-400/40 rounded text-[10px] font-black uppercase font-athletic">
                            <Flame className="w-3 h-3 fill-current" />
                            <span>R$ {item.promoPrice.toFixed(2).replace('.', ',')}</span>
                          </span>
                          <button
                            type="button"
                            data-testid={`inv-toggle-promo-${item.id}`}
                            onClick={() => togglePromo(item.id, false)}
                            className="text-[10px] text-zinc-400 hover:text-red-400 underline font-athletic uppercase block transition-colors"
                          >
                            Encerrar Queima
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            type="button"
                            data-testid={`inv-toggle-promo-${item.id}`}
                            onClick={() => {
                              const promoDiscount = Math.round(item.price * 0.8 * 100) / 100;
                              togglePromo(item.id, true, promoDiscount);
                            }}
                            className="px-2 py-1 bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-300 rounded text-[10px] font-black uppercase font-athletic transition-all flex items-center gap-1"
                            title="Ativar queima de estoque com 20% OFF"
                          >
                            <Flame className="w-3 h-3 text-yellow-400" />
                            <span>+ Queima</span>
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Total Stock */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-sm font-black font-athletic ${isCritical ? 'text-rose-400' : 'text-white'}`}>
                        {item.stock} un.
                      </span>
                    </td>

                    {/* Quick Add Buttons */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateStock(item.id, item.stock + 1)}
                          className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded text-[11px] font-bold font-athletic transition-colors"
                        >
                          +1
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStock(item.id, item.stock + 5)}
                          className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded text-[11px] font-bold font-athletic transition-colors"
                        >
                          +5
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStock(item.id, item.stock + 10)}
                          className="px-2 py-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded text-[11px] font-athletic transition-colors shadow-sm"
                        >
                          +10
                        </button>
                      </div>
                    </td>

                    {/* Total Value */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-athletic font-bold text-white text-xs">
                        R$ {(item.stock * item.price).toFixed(2).replace('.', ',')}
                      </span>
                      <span className="block text-[10px] text-zinc-500 font-sans">
                        R$ {item.price.toFixed(2).replace('.', ',')} un.
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
