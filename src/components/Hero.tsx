import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, MapPin, Truck, ChevronRight, Sparkles, Award } from 'lucide-react';
import { buildGeneralWhatsAppLink, WHATSAPP_DISPLAY, CVT_LOGO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="inicio" className="relative bg-black text-white overflow-hidden border-b border-zinc-900">
      
      {/* Subtle Yellow Atmospheric Ambient Glow (Fundo limpo e escuro para destacar produtos) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] bg-yellow-400/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy, Brands & Yellow CTA */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-400 text-black px-3 py-1 font-black text-xs uppercase tracking-widest font-athletic">
              <Award className="w-3.5 h-3.5" />
              <span>REVENDEDOR AUTORIZADO • DLZ & MIOCHE</span>
            </div>

            {/* Slogan Oficial */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.98] font-athletic">
                A loja mais <br className="hidden sm:inline" />
                <span className="text-yellow-400">completa</span> da cidade <br />
                e região.
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed pt-1 sm:pt-2 max-w-xl font-sans">
                Referência em moda masculina em Igarassu e região metropolitana. Revendedor autorizado das consagradas marcas <strong className="text-white font-bold">DLZ</strong> e <strong className="text-white font-bold">Mioche</strong>, além da linha própria <strong className="text-yellow-400 font-bold">CVT Collection</strong>: Camisas, Polos, Calças, Bermudas e Bonés de alto padrão.
              </p>
            </div>

            {/* Quick Authorized Brands Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-athletic">
                Marcas Oficiais:
              </span>
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-white text-xs font-black uppercase font-athletic">
                DLZ Oficial
              </span>
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-white text-xs font-black uppercase font-athletic">
                Mioche
              </span>
              <span className="px-2.5 py-1 bg-zinc-900 border border-yellow-400/40 text-yellow-400 text-xs font-black uppercase font-athletic">
                CVT Collection
              </span>
            </div>

            {/* Call to Actions - Yellow Chamativo */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-3">
              <a
                href={buildGeneralWhatsAppLink('Olá! Vim pelo site da CVT STORE e quero comprar no WhatsApp agora!')}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-h-[50px] inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base sm:text-lg px-8 py-4 uppercase tracking-wider rounded-none font-athletic transition-all active:scale-98 shadow-xl shadow-yellow-400/25 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-black shrink-0" />
                <span>Comprar no WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>

              <button
                onClick={onExploreClick}
                className="min-h-[50px] inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-white text-white hover:text-black font-black text-sm sm:text-base px-6 py-4 uppercase tracking-wider border-2 border-zinc-800 hover:border-white rounded-none font-athletic transition-all cursor-pointer"
              >
                <span>Ver Vitrine de Produtos</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Micro Info */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1 font-sans">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0" />
              <span>
                Atendimento Imediato via WhatsApp: <strong className="text-white">{WHATSAPP_DISPLAY}</strong>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Stage com a Logo Oficial e Johnny Bravo (Sem o cara de fundo) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Moldura do Palco da Logo Oficial CVT STORE */}
              <div className="relative bg-zinc-950 border-2 border-zinc-800 hover:border-yellow-400/60 p-6 sm:p-8 shadow-2xl transition-all duration-300">
                
                {/* Yellow Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-400" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-yellow-400" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-yellow-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-yellow-400" />

                {/* Header do Card com Status */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                    <span className="text-[11px] font-black uppercase text-yellow-400 tracking-widest font-athletic">
                      IDENTIDADE OFICIAL
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase font-athletic">
                    Igarassu • PE
                  </span>
                </div>

                {/* Exibição em Destaque da Logo Oficial com Johnny Bravo (Sem distorção ou corte) */}
                <div className="relative w-full aspect-[16/10] bg-black p-4 flex items-center justify-center border border-zinc-800/80 group">
                  <img
                    src={CVT_LOGO_IMAGE}
                    alt="Logo Oficial CVT STORE com Johnny Bravo em smoking"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle corner light */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
                </div>

                {/* Footer do Card */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-black text-white uppercase font-athletic tracking-wider">
                      CVT STORE
                    </p>
                    <p className="text-[11px] text-zinc-400 font-sans">
                      A loja mais completa da cidade e região
                    </p>
                  </div>

                  <a
                    href={buildGeneralWhatsAppLink('Olá! Gostei da identidade da CVT STORE e quero fazer um pedido!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black px-3.5 py-2 uppercase font-athletic tracking-wider transition-colors shrink-0"
                  >
                    Pedir no WhatsApp
                  </a>
                </div>

              </div>

              {/* Selo Flutuante */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 bg-black border border-yellow-400 text-white px-3.5 py-1.5 shadow-xl flex items-center gap-2 text-xs font-black uppercase font-athletic">
                <span className="w-2 h-2 bg-yellow-400 rotate-45" />
                <span>+500 Clientes em Igarassu</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Trust Highlights Bar */}
      <div className="bg-zinc-900 border-t border-zinc-800 text-zinc-300 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 bg-black/60 lg:bg-transparent border border-zinc-800 lg:border-none">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black border border-zinc-800 flex items-center justify-center shrink-0 text-yellow-400">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-white font-athletic tracking-wider truncate">Marcas Oficiais</p>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">DLZ & Mioche 100% Original</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2 bg-black/60 lg:bg-transparent border border-zinc-800 lg:border-none">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black border border-zinc-800 flex items-center justify-center shrink-0 text-yellow-400">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-white font-athletic tracking-wider truncate">Entrega Rápida</p>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">Igarassu e toda Região</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2 bg-black/60 lg:bg-transparent border border-zinc-800 lg:border-none">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black border border-zinc-800 flex items-center justify-center shrink-0 text-yellow-400">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-white font-athletic tracking-wider truncate">Loja Física</p>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">Rua Luciana Paiva, 392</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2 bg-black/60 lg:bg-transparent border border-zinc-800 lg:border-none">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black border border-zinc-800 flex items-center justify-center shrink-0 text-yellow-400 font-athletic font-black text-xs sm:text-sm">
              12X
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-white font-athletic tracking-wider truncate">Pagamento</p>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">Pix ou Cartão até 12x</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
