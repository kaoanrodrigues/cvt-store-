import React from 'react';
import { ShieldCheck, Award, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { AUTHORIZED_BRANDS, buildGeneralWhatsAppLink } from '../data/products';

interface BrandsSectionProps {
  onSelectBrand?: (brandName: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand }) => {
  return (
    <section id="marcas" className="py-16 sm:py-20 bg-black text-white border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black text-xs font-black uppercase tracking-widest font-athletic mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>ORIGINALIDADE & PROCEDÊNCIA GARANTIDA</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-athletic">
            Marcas Oficiais na <span className="text-yellow-400">CVT STORE</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 font-sans">
            Trabalhamos exclusivamente com marcas consagradas da moda masculina nacional. Peças 100% originais com garantia de procedência para Igarassu e toda a região.
          </p>
        </div>

        {/* Brands Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUTHORIZED_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="group relative bg-zinc-900 border border-zinc-800 hover:border-yellow-400 p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-yellow-400 text-black font-athletic">
                    {brand.badge}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-yellow-400" />
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white group-hover:text-yellow-400 transition-colors font-athletic uppercase">
                    {brand.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed font-sans">
                    {brand.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-bold uppercase font-athletic tracking-wider">
                  Loja Física & WhatsApp
                </span>
                <a
                  href={buildGeneralWhatsAppLink(`Olá! Gostaria de ver o estoque da marca ${brand.name} na CVT STORE!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-yellow-400 group-hover:text-yellow-300 group-hover:translate-x-1 transition-all font-athletic"
                >
                  <span>Ver coleção</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Highlight Box */}
        <div className="mt-10 p-6 bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 text-black flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-white font-athletic uppercase tracking-wider">
                Dúvidas sobre tabela de medidas ou caimento DLZ e Mioche?
              </p>
              <p className="text-xs text-zinc-400 font-sans">
                Fale com nossos consultores no WhatsApp. Enviamos fotos e vídeos reais dos looks.
              </p>
            </div>
          </div>

          <a
            href={buildGeneralWhatsAppLink('Olá! Gostaria de tirar dúvidas sobre as medidas das roupas da DLZ e Mioche!')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs px-5 py-3 uppercase tracking-wider transition-all font-athletic shrink-0 active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Consultar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
