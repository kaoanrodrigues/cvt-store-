import React, { useState } from 'react';
<<<<<<< HEAD
import { MessageCircle, ShoppingBag, Check, Eye, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink, getEffectivePrice } from '../data/products';
=======
import { MessageCircle, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../data/products';
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
<<<<<<< HEAD
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

=======
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);

>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

<<<<<<< HEAD
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
=======
  const installments = Math.min(3, Math.floor(product.price / 25));
  const installmentValue = (product.price / installments).toFixed(2).replace('.', ',');

  const whatsAppLink = buildWhatsAppLink(
    `${product.brand ? `[${product.brand}] ` : ''}${product.name}`,
    selectedSize,
    product.price
  );

  return (
    <div className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 w-full overflow-hidden">
      
      {/* Product Image Container with clean aspect ratio and touch zoom */}
      <div 
        className="relative aspect-[3/4] bg-zinc-950 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

<<<<<<< HEAD
        {/* Brand Label */}
        {product.brand && (
          <div className="absolute top-2 left-2 bg-black/90 text-yellow-400 border border-yellow-400/40 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 uppercase tracking-wider font-athletic rounded">
=======
        {/* Brand Label (DLZ / Mioche / CVT) */}
        {product.brand && (
          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/90 text-yellow-400 border border-yellow-400/40 text-[10px] font-black px-2 py-0.5 uppercase tracking-widest font-athletic">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            {product.brand}
          </div>
        )}

<<<<<<< HEAD
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
=======
        {/* Badge (Mais Vendida, Lançamento) */}
        {product.badge && (
          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest font-athletic">
            {product.badge}
          </div>
        )}

        {/* Quick View Button overlay (accessible for both touch and hover) */}
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
<<<<<<< HEAD
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
=======
          className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 p-2 bg-black/85 hover:bg-black text-white hover:text-yellow-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-zinc-800"
          title="Ver detalhes"
          aria-label="Ver detalhes da peça"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3 bg-zinc-900">
        
        {/* Category & Title */}
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-bold font-athletic block">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            {product.categoryLabel}
          </span>
          <h3 
            onClick={() => onQuickView(product)}
<<<<<<< HEAD
            className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1 cursor-pointer font-sans mt-0.5"
=======
            className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1 cursor-pointer font-sans mt-0.5"
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            title={product.name}
          >
            {product.name}
          </h3>
<<<<<<< HEAD
          <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1 font-sans hidden sm:block">
=======
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            {product.description}
          </p>
        </div>

<<<<<<< HEAD
        {/* Size Selection Selector */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1 font-bold uppercase font-athletic">
            <span>Tam:</span>
            <span className="text-yellow-400">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1">
=======
        {/* Size Selection Selector with touch-friendly targets */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-bold uppercase font-athletic">
            <span>Tamanho:</span>
            <span className="text-yellow-400">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
<<<<<<< HEAD
                  data-testid={`size-btn-${size}`}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[28px] h-6 sm:min-w-[32px] sm:h-7 text-[10px] sm:text-xs font-black px-1.5 flex items-center justify-center transition-all cursor-pointer font-athletic uppercase rounded ${
=======
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[36px] min-h-[36px] sm:min-w-[32px] sm:min-h-[32px] text-xs font-black px-2 py-1 flex items-center justify-center transition-all cursor-pointer font-athletic uppercase ${
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
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
<<<<<<< HEAD
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
=======
        <div className="pt-2 border-t border-zinc-800 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-white font-athletic tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              {installments > 1 ? `ou ${installments}x de R$ ${installmentValue} sem juros` : 'à vista no Pix'}
            </p>
          </div>
        </div>

        {/* Action: "Pedir no WhatsApp" in Vibrant Yellow with touch size */}
        <div className="space-y-2 pt-1">
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
<<<<<<< HEAD
            className="w-full min-h-[38px] sm:min-h-[42px] flex items-center justify-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-[11px] sm:text-xs py-2 px-2 uppercase tracking-wider transition-all duration-200 active:scale-98 font-athletic shadow rounded"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black shrink-0" />
=======
            className="w-full min-h-[44px] sm:min-h-[46px] flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-xs sm:text-sm py-2.5 px-3 uppercase tracking-wider transition-all duration-200 active:scale-98 font-athletic shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-black shrink-0" />
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
            <span>Pedir no WhatsApp</span>
          </a>

          <button
            type="button"
<<<<<<< HEAD
            data-testid="add-to-cart-btn"
            onClick={handleAddToCart}
            className={`w-full min-h-[34px] sm:min-h-[36px] flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold py-1.5 px-2 border transition-all cursor-pointer font-athletic uppercase tracking-wider rounded ${
=======
            onClick={handleAddToCart}
            className={`w-full min-h-[38px] flex items-center justify-center gap-2 text-xs font-bold py-2 px-3 border transition-all cursor-pointer font-athletic uppercase tracking-wider ${
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              addedAnimation
                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400'
                : 'bg-black hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-yellow-400" />
<<<<<<< HEAD
                <span>Na Sacola!</span>
=======
                <span>Adicionado à Sacola!</span>
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
<<<<<<< HEAD
                <span>Adicionar</span>
=======
                <span>Adicionar à Sacola</span>
>>>>>>> 383a3ab05a45484724d157c5c8660ecbfa96dfe7
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
