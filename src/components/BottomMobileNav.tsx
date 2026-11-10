import React from 'react';
import { Home, Shirt, Flame, ShoppingBag, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '../data/products';

interface BottomMobileNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (catId: any) => void;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
}) => {
  const scrollTo = (id: string, catId?: any) => {
    if (catId) {
      onSelectCategory(catId);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Navegação Mobile Inferior"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-zinc-800 px-3 py-2 pb-safe"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Início */}
        <button
          onClick={() => scrollTo('inicio')}
          className="flex flex-col items-center justify-center min-w-[54px] py-1 text-zinc-400 hover:text-yellow-400 active:text-yellow-400 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider font-athletic mt-1">
            Início
          </span>
        </button>

        {/* Produtos */}
        <button
          onClick={() => scrollTo('produtos', 'todas')}
          className="flex flex-col items-center justify-center min-w-[54px] py-1 text-zinc-400 hover:text-yellow-400 active:text-yellow-400 transition-colors"
        >
          <Shirt className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider font-athletic mt-1">
            Catálogo
          </span>
        </button>

        {/* WhatsApp Central Action Pill */}
        <a
          href={buildGeneralWhatsAppLink('Olá! Vim pelo site mobile da CVT STORE e quero fazer meu pedido!')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-5 bg-yellow-400 text-black w-12 h-12 rounded-full shadow-lg shadow-yellow-400/30 border-2 border-black active:scale-95 transition-transform"
          aria-label="Pedir no WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-black" />
        </a>

        {/* Promoções */}
        <button
          data-testid="bottom-nav-promos"
          onClick={() => scrollTo('produtos', 'promocoes')}
          className="flex flex-col items-center justify-center min-w-[54px] py-1 text-yellow-400 hover:text-yellow-300 active:text-yellow-300 transition-colors"
        >
          <div className="relative">
            <Flame className="w-5 h-5 fill-yellow-400 animate-pulse" />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[8px] font-black px-1 rounded-full uppercase">
              %
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider font-athletic mt-1 text-yellow-400">
            Ofertas
          </span>
        </button>

        {/* Sacola */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center min-w-[54px] py-1 text-zinc-400 hover:text-yellow-400 active:text-yellow-400 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 bg-yellow-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center font-athletic">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider font-athletic mt-1">
            Sacola
          </span>
        </button>
      </div>
    </nav>
  );
};
