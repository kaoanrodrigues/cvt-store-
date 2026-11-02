import React from 'react';
import { MapPin, Navigation, Clock, Truck, MessageCircle } from 'lucide-react';
import { STORE_ADDRESS, STORE_GOOGLE_MAPS_URL, WHATSAPP_DISPLAY, buildGeneralWhatsAppLink } from '../data/products';

export const PhysicalStore: React.FC = () => {
  return (
    <section id="loja-fisica" className="py-16 sm:py-20 bg-black text-white border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 text-xs font-black uppercase tracking-widest font-athletic">
                <MapPin className="w-3.5 h-3.5" />
                <span>LOJA FÍSICA EM IGARASSU - PE</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-athletic">
                  Visite a <span className="text-yellow-400">CVT STORE</span>
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                  Espaço completo com todas as novidades das marcas <strong className="text-white">DLZ</strong>, <strong className="text-white">Mioche</strong> e da linha autoral <strong className="text-white">CVT Collection</strong>. Venha provar no corpo e receba consultoria de estilo exclusiva.
                </p>
              </div>

              {/* Address Highlight Card */}
              <div className="p-5 bg-black border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-zinc-900 text-yellow-400 shrink-0 border border-zinc-800">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 uppercase font-black font-athletic tracking-wider">Endereço Oficial</span>
                    <p className="text-base sm:text-lg font-black text-white mt-0.5 font-athletic uppercase">
                      {STORE_ADDRESS}
                    </p>
                    <p className="text-xs text-zinc-400 font-sans">Igarassu - PE • Fácil localização</p>
                  </div>
                </div>

                <a
                  href={STORE_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs sm:text-sm px-4 py-2.5 uppercase tracking-wider transition-colors shrink-0 font-athletic border border-zinc-700"
                >
                  <Navigation className="w-4 h-4 text-yellow-400" />
                  <span>Traçar Rota no Maps</span>
                </a>
              </div>

              {/* Hours & Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 bg-black/60 border border-zinc-800">
                  <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-black text-white font-athletic uppercase tracking-wider">Horário de Funcionamento</p>
                    <p className="text-zinc-400 mt-0.5 font-sans">Segunda a Sábado: 09h às 19h</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-black/60 border border-zinc-800">
                  <Truck className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-black text-white font-athletic uppercase tracking-wider">Delivery em Igarassu</p>
                    <p className="text-zinc-400 mt-0.5 font-sans">Entregas rápidas em toda a região</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={buildGeneralWhatsAppLink('Olá! Gostaria de saber como chegar na loja CVT STORE!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-6 py-3.5 uppercase tracking-wider font-athletic transition-all active:scale-98 shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-black shrink-0" />
                  <span>Chamar no WhatsApp ({WHATSAPP_DISPLAY})</span>
                </a>

                <a
                  href={STORE_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-zinc-200 font-black px-5 py-3.5 uppercase tracking-wider font-athletic border border-zinc-800 transition-colors"
                >
                  <span>Abrir no Google Maps</span>
                </a>
              </div>

            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative border border-zinc-800 bg-black aspect-[4/3] sm:aspect-square shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                  alt="Espaço da CVT STORE em Igarassu"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/90 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-black text-white font-athletic uppercase tracking-wider">
                    <span className="w-2 h-2 bg-yellow-400 rotate-45" />
                    CVT STORE • Igarassu - PE
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                    Rua Luciana Paiva de Souza, Nº 392.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
