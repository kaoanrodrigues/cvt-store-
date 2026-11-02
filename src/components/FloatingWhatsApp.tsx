import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildGeneralWhatsAppLink, WHATSAPP_DISPLAY } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Friendly Chat Bubble with Athletic Styling */}
      {showTooltip && (
        <div className="pointer-events-auto bg-black border border-zinc-800 text-white p-3.5 shadow-2xl max-w-[250px] animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white p-0.5"
            aria-label="Fechar balão"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-[11px] font-black text-yellow-400 mb-1 uppercase font-athletic tracking-wider">
            <span className="w-2 h-2 bg-yellow-400 rotate-45" />
            <span>Atendimento Online • Igarassu</span>
          </div>
          <p className="text-xs text-zinc-300 leading-snug font-sans">
            Dúvidas sobre tamanhos ou modelos <strong className="text-white">DLZ</strong> e <strong className="text-white">Mioche</strong>?
          </p>
        </div>
      )}

      {/* Main Floating Button in Athletic Vibrant Yellow */}
      <a
        href={buildGeneralWhatsAppLink('Olá! Vim pelo site da CVT STORE e gostaria de tirar uma dúvida ou fazer um pedido!')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="pointer-events-auto relative group flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black p-3.5 sm:px-5 sm:py-3.5 uppercase tracking-wider shadow-2xl shadow-yellow-400/30 transition-all duration-300 active:scale-95 hover:scale-105 font-athletic"
      >
        <MessageCircle className="w-6 h-6 fill-black text-black" />
        <span className="hidden sm:inline text-xs font-black">
          Pedir no WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full bg-yellow-200 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 bg-yellow-300 rotate-45" />
        </span>
      </a>
    </div>
  );
};
