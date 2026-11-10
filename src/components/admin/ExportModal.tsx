import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, FileCode, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../data/storeContext';
import { ExportFormat, ExportDataset } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { exportData } = useStore();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [selectedDataset, setSelectedDataset] = useState<ExportDataset>('consolidated');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    exportData(selectedFormat, selectedDataset);
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-sans">Central de Exportação de Dados</h3>
              <p className="text-xs text-zinc-400">Exporte relatórios consolidados para gestão e contabilidade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          {/* Dataset selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-athletic">
              1. Selecione o Relatório:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'consolidated', label: 'Relatório Consolidado', desc: 'Produtos, Estoque e Vendas' },
                { id: 'inventory', label: 'Estoque & Alertas', desc: 'SKUs, Níveis Críticos (<5)' },
                { id: 'sales', label: 'Faturamento & Vendas', desc: 'Histórico e Ticket Médio' },
                { id: 'ai-insights', label: 'Diagnóstico IA', desc: 'Sugestões de Investimento' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDataset(item.id as ExportDataset)}
                  className={`p-3 text-left border rounded-lg transition-all ${
                    selectedDataset === item.id
                      ? 'border-yellow-400 bg-yellow-400/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <p className="font-bold">{item.label}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Format selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-athletic">
              2. Formato do Arquivo:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'csv', label: 'CSV', icon: FileSpreadsheet, sub: 'Compatível' },
                { id: 'excel', label: 'Excel', icon: FileSpreadsheet, sub: '.XLS' },
                { id: 'pdf', label: 'PDF', icon: FileText, sub: 'Imprimível' },
                { id: 'json', label: 'JSON', icon: FileCode, sub: 'Backup' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedFormat === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedFormat(item.id as ExportFormat)}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all ${
                      isSelected
                        ? 'border-yellow-400 bg-yellow-400 text-black font-bold shadow-md'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs uppercase">{item.label}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-zinc-500'}`}>{item.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            data-testid="export-confirm-btn"
            onClick={handleExport}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider transition-all shadow-md active:scale-95 font-athletic"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Exportado com Sucesso!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-black" />
                <span>Baixar Relatório Agora</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

