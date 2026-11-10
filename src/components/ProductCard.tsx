import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Check, Eye, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink, getEffectivePrice } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentImage = images[activeImageIdx] || product.image;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const isPromoActive = Boolean(product.isPromo && typeof product.promoPrice === 'number' && product.promoPrice > 0);
  const effectivePrice = getEffectivePrice(product);
  const originalDisplayPrice = isPromoActive ? product.price : product.originalPrice;
  const discountPercent = isPromoActive
    ? Math.round(((product.price - (product.promoPrice as number)) / product.price) * 100)
    : (product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null);

  const installments = Math.min(3, Math.max(1, Math.floor(effectivePrice / 25)));
  const installmentValue = (effectivePrice / installments).toFixed(2).replace('.', ',');

  const whatsAppLink = buildWhatsAppLink(
    `${product.brand ? `[${product.brand}] ` : ''}${product.name}${isPromoActive ? ' (PROMOÇÃO)' : ''}`,
    selectedSize,
    effectivePrice
  );

  return (
    <div 
      data-testid="product-card"
      data-product-id={product.id}
      className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md"
    >
      {/* Product Image Container with Carousel Arrows */}
      <div 
        className="relative aspect-[3/4] bg-zinc-950 overflow-hidden cursor-pointer select-none"
        onClick={() => onQuickView(product)}
      >
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Brand Label */}
        {product.brand && (
          <div className="absolute top-2 left-2 bg-black/90 text-yellow-400 border border-yellow-400/40 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 uppercase tracking-wider font-athletic rounded">
            {product.brand}
          </div>
        )}

        {/* Badges */}
        {isPromoActive ? (
          <div 
            data-testid="card-promo-badge"
            className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 uppercase tracking-wider font-athletic rounded flex items-center gap-1 shadow-md z-10"
          >
            <Flame className="w-3 h-3 fill-current animate-pulse" />
            <span>{discountPercent ? `-${discountPercent}%` : 'OFERTA'}</span>
          </div>
        ) : product.badge ? (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 uppercase tracking-wider font-athletic rounded">
            {product.badge}
          </div>
        ) : null}

        {/* Discrete Lateral Navigation Arrows for Multiple Photos */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              data-testid="card-prev-photo"
              onClick={handlePrevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-black/75 hover:bg-black text-white hover:text-yellow-400 rounded-full transition-all border border-zinc-700/60 shadow-md active:scale-90 z-10"
              title="Foto anterior"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              type="button"
              data-testid="card-next-photo"
              onClick={handleNextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-black/75 hover:bg-black text-white hover:text-yellow-400 rounded-full transition-all border border-zinc-700/60 shadow-md active:scale-90 z-10"
              title="Próxima foto"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/60 px-1.5 py-0.5 rounded-full border border-zinc-800">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block rounded-full transition-all ${
                    idx === activeImageIdx
                      ? 'w-3 h-1 bg-yellow-400'
                      : 'w-1 h-1 bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick View Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-2 right-2 p-1.5 bg-black/85 hover:bg-black text-white hover:text-yellow-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-zinc-800 rounded z-10"
          title="Ver detalhes"
          aria-label="Ver detalhes da peça"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Content & Details (Optimized for 2-column mobile and desktop) */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2 bg-zinc-900">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 font-bold font-athletic block truncate">
            {product.categoryLabel}
          </span>
          <h3 
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1 cursor-pointer font-sans mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1 font-sans hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Size Selection Selector */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1 font-bold uppercase font-athletic">
            <span>Tam:</span>
            <span className="text-yellow-400">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  data-testid={`size-btn-${size}`}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[28px] h-6 sm:min-w-[32px] sm:h-7 text-[10px] sm:text-xs font-black px-1.5 flex items-center justify-center transition-all cursor-pointer font-athletic uppercase rounded ${
                    isSelected
                      ? 'bg-yellow-400 text-black shadow-sm font-bold'
                      : 'bg-black text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Section */}
        <div className="pt-1.5 border-t border-zinc-800 flex flex-col justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-lg md:text-xl font-black text-white font-athletic tracking-tight text-yellow-400">
              R$ {effectivePrice.toFixed(2).replace('.', ',')}
            </span>
            {originalDisplayPrice && (
              <span 
                data-testid="strikethrough-price"
                className="text-[10px] sm:text-xs text-zinc-500 line-through"
              >
                R$ {originalDisplayPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-medium">
            <span className="truncate">
              {installments > 1 ? `ou ${installments}x de R$ ${installmentValue}` : 'à vista no Pix'}
            </span>
            {isPromoActive && (
              <span className="text-[9px] font-black uppercase text-red-400 font-athletic ml-1 shrink-0">
                🔥 Promoção
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-1.5 pt-1">
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[38px] sm:min-h-[42px] flex items-center justify-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-[11px] sm:text-xs py-2 px-2 uppercase tracking-wider transition-all duration-200 active:scale-98 font-athletic shadow rounded"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black shrink-0" />
            <span>Pedir no WhatsApp</span>
          </a>

          <button
            type="button"
            data-testid="add-to-cart-btn"
            onClick={handleAddToCart}
            className={`w-full min-h-[34px] sm:min-h-[36px] flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold py-1.5 px-2 border transition-all cursor-pointer font-athletic uppercase tracking-wider rounded ${
              addedAnimation
                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400'
                : 'bg-black hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-yellow-400" />
                <span>Na Sacola!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
