<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
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
<<<<<<< HEAD
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
=======
import { Product, CategoryId, CartItem } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todas');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cart stored in local storage for customer convenience
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cvt_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cvt_store_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7

  const handleScrollToProducts = () => {
    const el = document.getElementById('produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

<<<<<<< HEAD
  // If Admin View is active, render the complete Executive Admin Panel
  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black pb-16 md:pb-0 overflow-x-hidden">
      {/* Header with Admin button & Mobile Drawer */}
=======
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black pb-16 md:pb-0 overflow-x-hidden">
      {/* Header with Mobile Hamburger Drawer */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
      <Header
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
<<<<<<< HEAD
        onOpenAdmin={() => setCurrentView('admin')}
=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
      />

      {/* Main Content */}
      <main className="flex-grow">
<<<<<<< HEAD
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
=======
        {/* Hero Section Adaptada para Telas Verticais e Horizontais */}
        <Hero onExploreClick={handleScrollToProducts} />

        {/* Marcas Oficiais Autorizadas (DLZ & Mioche) */}
        <BrandsSection />

        {/* Vitrine de Produtos com Grid Dinâmico (1 mobile, 2/3 tablet, 4 desktop) */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Prova Social (Feed Lookbook Touch-Friendly) */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
        <SocialProof />

        {/* Loja Física em Igarassu - PE */}
        <PhysicalStore />
      </main>

      {/* Rodapé Oficial */}
      <Footer />

<<<<<<< HEAD
      {/* Floating WhatsApp CTA */}
=======
      {/* Floating WhatsApp CTA (Desktop & Tablet) */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
      <div className="hidden md:block">
        <FloatingWhatsApp />
      </div>

<<<<<<< HEAD
      {/* Bottom Mobile Navigation */}
=======
      {/* Bottom Mobile Navigation (100% Mobile-First Thumb Navigation) */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
      <BottomMobileNav
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

<<<<<<< HEAD
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Cart Drawer with formatted WhatsApp checkout */}
=======
      {/* Modals & Slide-overs */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
<<<<<<< HEAD
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
=======
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
      />
    </div>
  );
}
<<<<<<< HEAD

export default function App() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}
=======
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
