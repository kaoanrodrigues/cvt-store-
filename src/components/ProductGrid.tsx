import React, { useState } from 'react';
import { Search, MessageCircle, Flame, Tag } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { CATEGORIES, buildGeneralWhatsAppLink } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../data/storeContext';

interface ProductGridProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
}) => {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('todas');

  // Filter products by category, brand and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todas'
        ? true
        : selectedCategory === 'promocoes'
        ? Boolean(product.isPromo)
        : product.category === selectedCategory;
    const matchesBrand =
      selectedBrandFilter === 'todas' ||
      (selectedBrandFilter === 'dlz' && product.brand?.toLowerCase() === 'dlz') ||
      (selectedBrandFilter === 'mioche' && product.brand?.toLowerCase() === 'mioche') ||
      (selectedBrandFilter === 'cvt' && product.brand?.toLowerCase().includes('cvt'));

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesBrand && matchesSearch;
  });

  const categoryGroups: { id: CategoryId; title: string; subtitle: string }[] = [
    { id: 'camisas', title: 'Camisas', subtitle: 'T-shirts de algodão penteado, toque premium e modelagem atlética' },
    { id: 'polos', title: 'Polos', subtitle: 'Polos piquet refinadas e esportivas com corte estruturado' },
    { id: 'calcas', title: 'Calças', subtitle: 'Jeans com elastano de alta flexibilidade e sarjas contemporâneas' },
    { id: 'bermudas', title: 'Bermudas', subtitle: 'Bermudas casuais, jeans e moletom com caimento na medida certa' },
    { id: 'bones', title: 'Bonés & Acessórios', subtitle: 'Modelos snapback, trucker e dad hat com bordados exclusivos' },
  ];

  return (
    <section id="produtos" className="py-12 sm:py-16 md:py-20 bg-zinc-950 text-white border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-yellow-400 tracking-widest font-athletic mb-1.5">
              <span className="w-2 h-2 bg-yellow-400 rotate-45" />
              <span>CATÁLOGO OFICIAL • CVT STORE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-athletic">
              Vitrine de Produtos
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-1 max-w-xl font-sans">
              Modelagem refinada e acabamento de alto padrão. Cada peça possui botão direto para pedir no WhatsApp com o tamanho selecionado.
            </p>
          </div>

          {/* Search bar with min 44px tap area */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por peça, marca..."
              className="w-full min-h-[44px] bg-zinc-900 border border-zinc-800 rounded-none pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-white uppercase font-athletic p-1"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto touch-pan-x pb-3 mb-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const isPromoPill = cat.id === 'promocoes';

            let pillClasses = 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white';
            if (isSelected) {
              pillClasses = isPromoPill
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-black shadow-lg border border-yellow-300 font-black'
                : 'bg-yellow-400 text-black shadow-md';
            } else if (isPromoPill) {
              pillClasses = 'bg-red-950/40 text-yellow-400 border border-red-500/50 hover:border-yellow-400 hover:bg-red-900/40';
            }

            return (
              <button
                key={cat.id}
                data-testid={`cat-pill-${cat.id}`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('vitrine-topo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`min-h-[44px] px-4 sm:px-5 py-2 font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer font-athletic whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 rounded-none ${pillClasses}`}
              >
                {isPromoPill && <Flame className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Brand Filter Sub-bar */}
        <div className="flex items-center gap-2 overflow-x-auto touch-pan-x pb-4 mb-6 sm:mb-8 text-xs font-athletic uppercase tracking-wider scrollbar-none">
          <span className="text-zinc-500 font-black shrink-0 mr-1 text-[11px] sm:text-xs">
            Marca:
          </span>
          {[
            { id: 'todas', label: 'Todas as Marcas' },
            { id: 'dlz', label: 'DLZ Oficial' },
            { id: 'mioche', label: 'Mioche' },
            { id: 'cvt', label: 'CVT Collection' },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBrandFilter(b.id)}
              className={`min-h-[36px] px-3 py-1 font-black transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center ${
                selectedBrandFilter === b.id
                  ? 'bg-zinc-800 text-yellow-400 border border-yellow-400'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div id="vitrine-topo" />

        {/* Dynamic Grid: 1 col on mobile, 2 on tablet, 3 on md, 4 on desktop */}
        {selectedCategory !== 'todas' || selectedBrandFilter !== 'todas' || searchQuery ? (
          <div>
            {/* Banner Especial de Promoções & Queima de Estoque */}
            {selectedCategory === 'promocoes' && (
              <div 
                data-testid="promo-banner"
                className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-red-950/70 via-amber-950/50 to-zinc-900 border border-yellow-400/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-yellow-400/20 rounded-lg border border-yellow-400/40 shrink-0">
                    <Flame className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded font-athletic">
                        Queima de Estoque
                      </span>
                      <span className="text-xs text-yellow-400 font-black uppercase tracking-wider font-athletic">
                        Descontos Especiais Ativos
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white font-athletic uppercase mt-1">
                      Aba de Promoções & Ofertas Exclusivas
                    </h3>
                    <p className="text-xs text-zinc-300 font-sans mt-0.5 max-w-xl">
                      Preços reduzidos aplicados diretamente no carrinho e no pedido formatado do WhatsApp. Aproveite antes que acabe o estoque!
                    </p>
                  </div>
                </div>
                <div className="shrink-0 self-start sm:self-auto">
                  <span className="inline-block px-3.5 py-1.5 bg-yellow-400 text-black text-xs font-black uppercase tracking-wider rounded-lg font-athletic shadow-md">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'Peça em Oferta' : 'Peças em Oferta'}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
              <span className="text-xs sm:text-sm font-semibold text-zinc-300 font-sans">
                Mostrando <strong className="text-white">{filteredProducts.length}</strong> produtos
                {selectedCategory !== 'todas' && (
                  <span className="text-yellow-400 ml-1">em {CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span>
                )}
                {selectedBrandFilter !== 'todas' && (
                  <span className="text-yellow-400 ml-1">({selectedBrandFilter.toUpperCase()})</span>
                )}
                {searchQuery && <span className="text-zinc-400 ml-1">para "{searchQuery}"</span>}
              </span>

              {(selectedCategory !== 'todas' || selectedBrandFilter !== 'todas') && (
                <button
                  onClick={() => {
                    onSelectCategory('todas');
                    setSelectedBrandFilter('todas');
                  }}
                  className="text-xs text-yellow-400 hover:underline font-black font-athletic uppercase tracking-wider"
                >
                  Ver tudo
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 px-4 bg-zinc-900 border border-zinc-800">
                <p className="text-base sm:text-lg font-bold text-white mb-2 font-sans">Nenhum produto encontrado</p>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-sans">Consulte todo o estoque da loja direto com nossos consultores.</p>
                <a
                  href={buildGeneralWhatsAppLink('Olá! Gostaria de consultar o estoque da CVT STORE!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-yellow-400 text-black font-black px-6 py-2.5 uppercase tracking-wider font-athletic"
                >
                  <MessageCircle className="w-5 h-5 fill-black" />
                  <span>Consultar no WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Structured layout by each required category */
          <div className="space-y-12 sm:space-y-16">
            {categoryGroups.map((group) => {
              const groupProducts = products.filter((p) => p.category === group.id);
              if (groupProducts.length === 0) return null;

              return (
                <div key={group.id} id={group.id} className="scroll-mt-24 sm:scroll-mt-28">
                  {/* Category Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 pb-2.5 sm:pb-3 border-b border-zinc-800 gap-1.5 sm:gap-2">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-white flex items-center gap-2 font-athletic tracking-tight">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 -skew-x-12 shrink-0" />
                        {group.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-sans">
                        {group.subtitle}
                      </p>
                    </div>

                    <a
                      href={buildGeneralWhatsAppLink(`Olá! Gostaria de ver mais peças da categoria ${group.title} da CVT STORE!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-yellow-400 hover:text-yellow-300 font-black uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto font-athletic pt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Ver mais no WhatsApp</span>
                    </a>
                  </div>

                  {/* Responsive Grid: 2 cols on mobile, 2 on tablet, 3 on md, 4 on desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                    {groupProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onQuickView={onQuickView}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* High Conversion Banner at bottom of grid */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-zinc-900 border border-zinc-800 text-center flex flex-col items-center">
          <p className="text-xs uppercase tracking-widest text-yellow-400 font-black mb-1.5 font-athletic">
            Procurando uma peça específica ou tamanho sob medida?
          </p>
          <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white max-w-lg mb-4 font-athletic uppercase tracking-tight">
            Recebemos lançamentos das marcas DLZ e Mioche toda semana!
          </h4>
          <a
            href={buildGeneralWhatsAppLink('Olá! Gostaria de tirar dúvidas sobre as peças da CVT STORE!')}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-7 py-3 uppercase tracking-wider transition-all font-athletic shadow-md active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-black shrink-0" />
            <span>Falar com Atendente no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
