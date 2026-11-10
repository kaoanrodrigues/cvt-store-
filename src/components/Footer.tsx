import React from 'react';
import { MessageCircle, Instagram, MapPin, ArrowUp } from 'lucide-react';
import { STORE_ADDRESS, STORE_GOOGLE_MAPS_URL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/products';
import { CvtLogo } from './CvtLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contato" className="bg-black text-white border-t border-zinc-900 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <CvtLogo size="lg" />

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-sans pt-1">
              <strong className="text-white">A loja mais completa da cidade e região.</strong> Revendedor oficial das consagradas marcas <strong className="text-yellow-400">DLZ</strong> e <strong className="text-yellow-400">Mioche</strong>, além de peças exclusivas da linha CVT Collection em Igarassu - PE.
            </p>

            {/* Direct Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-yellow-400 transition-colors"
                title="Instagram @store_cvt"
                aria-label="Instagram @store_cvt"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors"
                title="WhatsApp 5581994651854"
                aria-label="WhatsApp 5581994651854"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Categories Navigation (Col 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-yellow-400 font-black font-athletic">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-zinc-400 font-athletic">
              <li>
                <a href="#camisas" className="hover:text-yellow-400 transition-colors">Camisas</a>
              </li>
              <li>
                <a href="#polos" className="hover:text-yellow-400 transition-colors">Polos</a>
              </li>
              <li>
                <a href="#calcas" className="hover:text-yellow-400 transition-colors">Calças & Bermudas</a>
              </li>
              <li>
                <a href="#bones" className="hover:text-yellow-400 transition-colors">Acessórios & Bonés</a>
              </li>
              <li>
                <a href="#marcas" className="hover:text-yellow-400 transition-colors text-zinc-300">Marcas (DLZ & Mioche)</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-yellow-400 transition-colors">Clientes & Looks</a>
              </li>
            </ul>
          </div>

          {/* Physical Address & Direct Contact (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-yellow-400 font-black font-athletic">
              Localização & Contato
            </h4>

            {/* Address */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5 text-zinc-300 text-sm">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white font-sans">Endereço da Loja Física:</p>
                  <p className="text-zinc-400 text-xs mt-0.5 font-sans">{STORE_ADDRESS}</p>
                </div>
              </div>
              <div className="pl-6">
                <a
                  href={STORE_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-yellow-400 hover:underline font-black font-athletic uppercase tracking-wider inline-block mt-1"
                >
                  Abrir no Google Maps &rarr;
                </a>
              </div>
            </div>

            {/* Direct WhatsApp link */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2.5 text-zinc-300 text-sm">
                <MessageCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <p className="font-bold text-white font-sans">WhatsApp para Atendimento:</p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 font-black text-sm font-athletic tracking-wide"
                  >
                    {WHATSAPP_DISPLAY} ({WHATSAPP_NUMBER})
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram link */}
            <div className="flex items-center gap-2.5 text-zinc-300 text-sm">
              <Instagram className="w-4 h-4 text-yellow-400 shrink-0" />
              <div>
                <p className="font-bold text-white font-sans">Instagram Oficial:</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-yellow-400 text-xs font-semibold font-sans"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Payment Methods & Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-3 font-athletic uppercase tracking-wider">
            <span className="font-black text-zinc-300">Pagamento:</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-white font-bold">Pix</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-white font-bold">Cartão até 12x</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-white font-bold">Dinheiro</span>
          </div>

          <div className="flex items-center gap-4">
<<<<<<< HEAD
            <a
              href="#admin"
              className="text-zinc-500 hover:text-yellow-400 transition-colors uppercase font-athletic text-[11px]"
            >
              Área Administrativa
            </a>
            <span className="text-zinc-700">•</span>
=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            <p className="text-center md:text-right font-sans">
              &copy; {new Date().getFullYear()} CVT STORE. Todos os direitos reservados.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-yellow-400 border border-zinc-800 transition-colors"
              title="Voltar ao Topo"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
