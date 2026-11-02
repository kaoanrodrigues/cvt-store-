import React, { useState, useEffect } from 'react';
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

  const handleScrollToProducts = () => {
    const el = document.getElementById('produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black pb-16 md:pb-0 overflow-x-hidden">
      {/* Header with Mobile Hamburger Drawer */}
      <Header
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* Main Content */}
      <main className="flex-grow">
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
        <SocialProof />

        {/* Loja Física em Igarassu - PE */}
        <PhysicalStore />
      </main>

      {/* Rodapé Oficial */}
      <Footer />

      {/* Floating WhatsApp CTA (Desktop & Tablet) */}
      <div className="hidden md:block">
        <FloatingWhatsApp />
      </div>

      {/* Bottom Mobile Navigation (100% Mobile-First Thumb Navigation) */}
      <BottomMobileNav
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* Modals & Slide-overs */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
