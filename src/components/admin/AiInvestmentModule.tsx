import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Flame,
  ArrowRight,
  ShieldAlert,
  Coins,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../../data/storeContext';

export const AiInvestmentModule: React.FC = () => {
  const {
    products,
    aiRecommendations,
    isGeneratingAi,
    generateAiInsights,
    updateStock,
  } = useStore();

  const highUrgencyCount = aiRecommendations.filter((r) => r.urgency === 'alta').length;

  return (
    <div className="space-y-6">
      {/* Top Banner with AI Glow */}
      <div className="relative p-6 bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-900 border border-yellow-500/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-black uppercase font-athletic tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inteligência de Negócios & Alocação de Capital</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-athletic">
              Previsões Preditivas & Recomendações de Compra
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Nosso modelo analítico cruza a velocidade média de vendas (giro semanal), o histórico de dias de pico (sexta/sábado em Igarassu) e o custo de oportunidade de capital parado para sugerir onde investir ou queimar estoque.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              disabled={isGeneratingAi}
              onClick={generateAiInsights}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 font-athletic"
            >
              <RefreshCw className={`w-4 h-4 ${isGeneratingAi ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAi ? 'Processando Dados com IA...' : 'Gerar Nova Análise com IA'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center gap-3.5">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase font-athletic font-bold">Urgência Alta (Ruptura)</p>
            <p className="text-xl font-black text-white font-athletic">{highUrgencyCount} Ações Críticas</p>
          </div>
        </div>

        <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center gap-3.5">
          <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-lg">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase font-athletic font-bold">Capital a Liberar (Liquidação)</p>
            <p className="text-xl font-black text-yellow-400 font-athletic">R$ 1.622,50</p>
          </div>
        </div>

        <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center gap-3.5">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase font-athletic font-bold">Ganho Estimado em Reposição</p>
            <p className="text-xl font-black text-emerald-400 font-athletic">+R$ 9.040,00</p>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>Recomendações Estratégicas Acionáveis</span>
          </h3>
          <span className="text-xs text-zinc-400 font-athletic uppercase">
            Atualizado em tempo real com base no catálogo atual
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendations.map((rec) => {
            const isHigh = rec.urgency === 'alta';
            const isClearance = rec.type === 'clearance';
            const relatedProduct = products.find((p) => p.sku === rec.sku);

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                  isHigh
                    ? 'bg-gradient-to-br from-zinc-900 via-rose-950/20 to-zinc-900 border-rose-500/40 shadow-lg'
                    : isClearance
                    ? 'bg-gradient-to-br from-zinc-900 via-amber-950/20 to-zinc-900 border-yellow-500/30'
                    : 'bg-zinc-900/90 border-zinc-800'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span
                      className={`text-[10px] font-black uppercase font-athletic px-2 py-0.5 rounded tracking-wider ${
                        isHigh
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : isClearance
                          ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {rec.type === 'restock'
                        ? 'Reposição Necessária'
                        : rec.type === 'clearance'
                        ? 'Queima / Liberação de Caixa'
                        : 'Oportunidade de Mercado'}
                    </span>

                    <span className="text-xs font-mono text-zinc-400 font-bold">{rec.sku}</span>
                  </div>

                  <h4 className="text-base font-bold text-white font-sans">{rec.title}</h4>
                  <p className="text-xs text-yellow-400 font-bold font-athletic uppercase mt-0.5">
                    {rec.productName}
                  </p>

                  <div className="my-3 p-3 bg-black/60 border border-zinc-800 rounded-lg text-xs space-y-1.5">
                    <p className="text-zinc-300 font-sans leading-relaxed">
                      <strong className="text-white">Diagnóstico:</strong> {rec.reason}
                    </p>
                    <div className="pt-1.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Impacto Estimado:</span>
                      <span className="font-bold text-emerald-400 font-athletic">{rec.impact}</span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-300 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800">
                    <span className="text-yellow-400 font-bold uppercase font-athletic block mb-1">
                      Ação Recomendada pela IA:
                    </span>
                    <p className="font-sans leading-relaxed">{rec.suggestedAction}</p>
                  </div>
                </div>

                {/* Quick Execution Button */}
                {relatedProduct && rec.type === 'restock' && (
                  <button
                    type="button"
                    onClick={() => updateStock(relatedProduct.id, relatedProduct.stock + 20)}
                    className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-all font-athletic flex items-center justify-center gap-1.5 active:scale-98 shadow-md"
                  >
                    <span>Simular Reposição Imediata (+20 un.)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

