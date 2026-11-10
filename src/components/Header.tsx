import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { MessageCircle, Menu, X, ShoppingBag, Instagram, LayoutDashboard, ChevronRight, Flame } from 'lucide-react';
import { WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL, buildGeneralWhatsAppLink } from '../data/products';
import { CvtLogo } from './CvtLogo';
import { useStore } from '../data/storeContext';
=======
import { MessageCircle, Menu, X, ShoppingBag, MapPin, Instagram, Search, ChevronRight } from 'lucide-react';
import { WHATSAPP_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL, buildGeneralWhatsAppLink } from '../data/products';
import { CvtLogo } from './CvtLogo';
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (categoryId: any) => void;
<<<<<<< HEAD
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onSelectCategory, onOpenAdmin }) => {
  const { setCurrentView } = useStore();
=======
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onSelectCategory }) => {
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string, categoryId?: any) => {
    setMobileMenuOpen(false);
    if (categoryId) {
      onSelectCategory(categoryId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

<<<<<<< HEAD
  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    if (onOpenAdmin) {
      onOpenAdmin();
    } else {
      setCurrentView('admin');
    }
  };

=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
  return (
    <>
      <header className="sticky top-0 z-40 bg-black text-white border-b-2 border-zinc-900 shadow-2xl">
        {/* Top Ticker with Solid Yellow Contrast */}
        <div className="bg-yellow-400 text-black text-xs font-black py-1.5 px-3 sm:px-4 uppercase tracking-wider font-athletic border-b border-yellow-500/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:text-sm">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rotate-45 shrink-0" />
              <span className="font-black">A loja mais completa da cidade e região</span>
              <span className="hidden sm:inline font-bold text-zinc-900">• Revendedor Autorizado DLZ & Mioche • Igarassu - PE</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-xs font-bold font-sans">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 text-black hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-3 h-3" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
              <span className="hidden md:inline text-black/30">/</span>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-black hover:underline transition-all text-[11px] sm:text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>{WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
<<<<<<< HEAD
            {/* Official Logo */}
=======
            {/* Official Logo with Mascot Character */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            <a href="#" className="focus:outline-none">
              <CvtLogo />
            </a>

            {/* Desktop Minimalist Menu: Início, Produtos, Contato (plus Marcas) */}
<<<<<<< HEAD
            <nav className="hidden md:flex items-center gap-7 text-xs font-black uppercase tracking-wider text-zinc-300 font-athletic">
=======
            <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-zinc-300 font-athletic">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              <button
                onClick={() => handleNavClick('inicio')}
                className="hover:text-yellow-400 transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-yellow-400"
              >
                Início
              </button>
              <button
                onClick={() => handleNavClick('produtos', 'todas')}
                className="hover:text-yellow-400 transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-yellow-400"
              >
                Produtos
              </button>
              <button
<<<<<<< HEAD
                type="button"
                data-testid="nav-promos-desktop"
                onClick={() => handleNavClick('produtos', 'promocoes')}
                className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-600/30 via-amber-500/20 to-yellow-400/20 border border-yellow-400/60 hover:border-yellow-300 text-yellow-400 hover:text-white rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <Flame className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse" />
                <span>Promoções</span>
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase font-sans">
                  Sale
                </span>
              </button>
              <button
                onClick={() => handleNavClick('marcas')}
                className="hover:text-yellow-400 transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-yellow-400 text-yellow-400"
              >
                Marcas
=======
                onClick={() => handleNavClick('marcas')}
                className="hover:text-yellow-400 transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-yellow-400 text-yellow-400"
              >
                Marcas (DLZ & Mioche)
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              </button>
              <button
                onClick={() => handleNavClick('depoimentos')}
                className="hover:text-yellow-400 transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-yellow-400"
              >
                Clientes
              </button>
              <button
                onClick={() => handleNavClick('loja-fisica')}
                className="hover:text-yellow-400 transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-yellow-400"
              >
                Contato
              </button>
            </nav>

<<<<<<< HEAD
            {/* Right Action Icons: Admin Button, WhatsApp, Bag, Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Painel Administrativo CTA Button */}
              <button
                type="button"
                data-testid="nav-admin-btn"
                onClick={handleAdminClick}
                className="min-h-[44px] hidden sm:flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 hover:border-yellow-400/50 rounded-lg text-xs font-bold uppercase tracking-wider font-athletic transition-all"
                title="Acessar Painel Administrativo"
              >
                <LayoutDashboard className="w-4 h-4 text-yellow-400" />
                <span>Painel Admin</span>
              </button>

=======
            {/* Right Action Icons: WhatsApp Icon Button, Bag, and Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              {/* Direct WhatsApp Call Icon Button */}
              <a
                href={buildGeneralWhatsAppLink('Olá! Vim pelo site da CVT STORE e quero atendimento no WhatsApp!')}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg transition-all shadow-md active:scale-95 p-2.5 font-athletic text-xs font-black uppercase tracking-wider gap-1.5"
                title="Chamar no WhatsApp"
                aria-label="Chamar no WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-black shrink-0" />
<<<<<<< HEAD
                <span className="hidden lg:inline">WhatsApp</span>
=======
                <span className="hidden sm:inline">WhatsApp</span>
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              </a>

              {/* Shopping Bag */}
              <button
                onClick={onOpenCart}
<<<<<<< HEAD
                data-testid="open-cart-btn"
=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all cursor-pointer border border-zinc-800 p-2.5"
                title="Sacola de Compras"
                aria-label="Ver Sacola"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
<<<<<<< HEAD
                  <span 
                    data-testid="cart-badge-count"
                    className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg font-athletic"
                  >
=======
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg font-athletic">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-200 hover:text-yellow-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer p-2.5"
                aria-label="Abrir Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-sm bg-zinc-950 text-white h-full border-l border-zinc-800 flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300 overflow-y-auto">
            
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black">
              <CvtLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

<<<<<<< HEAD
            {/* Admin Quick Link in Mobile Drawer */}
            <div className="p-4 bg-zinc-900 border-b border-zinc-800">
              <button
                type="button"
                data-testid="mobile-admin-btn"
                onClick={handleAdminClick}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border border-yellow-400/30 font-black py-2.5 px-3 uppercase tracking-wider text-xs rounded-lg font-athletic transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Acessar Painel Administrativo</span>
              </button>
            </div>

=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            {/* WhatsApp Quick CTA in Drawer */}
            <div className="p-4 bg-yellow-400/10 border-b border-yellow-400/20">
              <a
                href={buildGeneralWhatsAppLink('Olá! Vim pelo menu do site mobile da CVT STORE e quero comprar no WhatsApp!')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 px-4 uppercase tracking-wider text-sm rounded-none transition-all font-athletic shadow-md active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>Comprar no WhatsApp Agora</span>
              </a>
              <p className="text-[11px] text-zinc-400 text-center mt-2 font-medium">
                Atendimento Rápido: <strong className="text-white">{WHATSAPP_DISPLAY}</strong>
              </p>
            </div>

<<<<<<< HEAD
            {/* Menu Links */}
=======
            {/* Menu Links: Início, Produtos, Contato */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            <div className="p-4 space-y-1">
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-black font-athletic px-3 mb-2">
                Navegação
              </p>

              <button
                onClick={() => handleNavClick('inicio')}
                className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-black uppercase tracking-wider text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400 font-athletic text-left transition-colors"
              >
                <span>Início</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>

              <button
                onClick={() => handleNavClick('produtos', 'todas')}
                className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-black uppercase tracking-wider text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400 font-athletic text-left transition-colors"
              >
                <span>Produtos & Vitrine</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>

              <button
<<<<<<< HEAD
                type="button"
                data-testid="nav-promos-mobile"
                onClick={() => handleNavClick('produtos', 'promocoes')}
                className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-black uppercase tracking-wider text-yellow-400 bg-gradient-to-r from-red-950/40 to-yellow-950/40 border border-yellow-400/40 font-athletic text-left transition-all"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                  <span>Promoções & Ofertas</span>
                </div>
                <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black uppercase font-athletic">
                  Sale
                </span>
              </button>

              <button
=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
                onClick={() => handleNavClick('marcas')}
                className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-black uppercase tracking-wider text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 font-athletic text-left transition-colors"
              >
                <span>Marcas (DLZ & Mioche)</span>
                <ChevronRight className="w-4 h-4 text-yellow-400" />
              </button>

              <button
                onClick={() => handleNavClick('depoimentos')}
                className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-black uppercase tracking-wider text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400 font-athletic text-left transition-colors"
              >
                <span>Clientes Satisfeitos</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>

              <button
                onClick={() => handleNavClick('loja-fisica')}
                className="w-full min-h-[48px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-black uppercase tracking-wider text-zinc-200 hover:bg-zinc-900 hover:text-yellow-400 font-athletic text-left transition-colors"
              >
                <span>Contato & Loja Física</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>
            </div>
<<<<<<< HEAD
=======

            {/* Categorias Rápidas */}
            <div className="p-4 border-t border-zinc-800">
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-black font-athletic px-3 mb-3">
                Categorias
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'camisas', label: 'Camisas' },
                  { id: 'polos', label: 'Polos' },
                  { id: 'calcas', label: 'Calças' },
                  { id: 'bermudas', label: 'Bermudas' },
                  { id: 'bones', label: 'Bonés & Acessórios' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick('produtos', cat.id)}
                    className="min-h-[44px] bg-zinc-900 hover:bg-zinc-800 active:bg-yellow-400 active:text-black text-zinc-200 text-xs font-black py-2.5 px-3 uppercase tracking-wider hover:text-yellow-400 transition-colors font-athletic text-left"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 border-t border-zinc-800 bg-black space-y-2">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Rua Luciana Paiva de Souza, 392 - Igarassu</span>
              </div>
            </div>

>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
          </div>
        </div>
      )}
    </>
  );
};
