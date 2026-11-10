import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandsSection } from './components/BrandsSection';
import { ProductGrid } from './components/ProductGrid';
import { SocialProof } from './components/SocialProof';
import { PhysicalStore } from './components/PhysicalStore';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BottomMobileNav } from './components/BottomMobileNav';
import { AdminLayout } from './components/admin/AdminLayout';
import { CategoryId } from './types';
import { StoreProvider, useStore } from './data/storeContext';

function Storefront() {
  const {
    currentView,
    setCurrentView,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    quickViewProduct,
    setQuickViewProduct,
    totalCartItems,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todas');

  const handleScrollToProducts = () => {
    const el = document.getElementById('produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If Admin View is active, render the complete Executive Admin Panel
  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black pb-16 md:pb-0 overflow-x-hidden">
      {/* Header with Admin button & Mobile Drawer */}
      <Header
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onExploreClick={handleScrollToProducts} />

        {/* Vitrine de Produtos Reativa em 2 colunas compactas no mobile */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={addToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Prova Social & Lookbook */}
        <SocialProof />

        {/* Loja Física em Igarassu - PE */}
        <PhysicalStore />
      </main>

      {/* Rodapé Oficial */}
      <Footer />

      {/* Floating WhatsApp CTA */}
      <div className="hidden md:block">
        <FloatingWhatsApp />
      </div>

      {/* Bottom Mobile Navigation */}
      <BottomMobileNav
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Cart Drawer with formatted WhatsApp checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}
