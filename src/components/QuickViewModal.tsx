import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, ShieldCheck, ChevronLeft, ChevronRight, Check, Flame } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink, getEffectivePrice } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

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

  const handleAddToCart = () => {
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

  const detailedWhatsAppLink = buildWhatsAppLink(
    `${product.brand ? `[${product.brand}] ` : ''}${product.name}${isPromoActive ? ' (PROMOÇÃO)' : ''}`,
    selectedSize,
    effectivePrice
  );

  return (
    <div 
      data-testid="quickview-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        data-testid="quickview-modal-content"
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 shadow-2xl text-white max-h-[92vh] flex flex-col md:flex-row overflow-y-auto rounded-xl my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-black/80 hover:bg-black text-zinc-300 hover:text-white transition-colors border border-zinc-800 rounded-full shadow-lg"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Column with Carousel */}
        <div className="w-full md:w-1/2 flex flex-col bg-zinc-900 shrink-0">
          <div className="relative aspect-[4/3] sm:aspect-square md:h-[460px] bg-black overflow-hidden flex items-center justify-center">
            <img
              src={currentImage}
              alt={`${product.name} - Imagem ${activeImageIdx + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Badges */}
            {isPromoActive ? (
              <span 
                data-testid="modal-promo-badge"
                className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[11px] px-2.5 py-1 uppercase tracking-wider font-athletic rounded flex items-center gap-1 shadow-lg z-20"
              >
                <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>{discountPercent ? `PROMOÇÃO: -${discountPercent}% OFF` : 'OFERTA ESPECIAL'}</span>
              </span>
            ) : product.badge ? (
              <span className="absolute top-3 left-3 bg-yellow-400 text-black font-black text-[11px] px-2.5 py-1 uppercase tracking-wider font-athletic rounded">
                {product.badge}
              </span>
            ) : null}

            {product.brand && (
              <span className="absolute bottom-3 left-3 bg-black/90 text-yellow-400 border border-yellow-400/40 font-black text-[10px] px-2 py-0.5 uppercase tracking-widest font-athletic rounded">
                {product.brand}
              </span>
            )}

            {/* Photo Counter Badge */}
            {images.length > 1 && (
              <span className="absolute top-3 right-12 bg-black/80 text-zinc-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-zinc-700">
                {activeImageIdx + 1}/{images.length}
              </span>
            )}

            {/* Carousel Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/75 hover:bg-black text-white hover:text-yellow-400 rounded-full transition-colors border border-zinc-700/80 shadow-lg active:scale-90"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/75 hover:bg-black text-white hover:text-yellow-400 rounded-full transition-colors border border-zinc-700/80 shadow-lg active:scale-90"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 p-2.5 bg-zinc-950 border-t border-zinc-800 overflow-x-auto scrollbar-none">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-12 h-14 rounded overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIdx === i ? 'border-yellow-400 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column (Scrollable & Responsive) */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-5 bg-zinc-950 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-black text-yellow-400 tracking-wider font-athletic">
                <span>{product.categoryLabel}</span>
                {product.brand && <span>• {product.brand}</span>}
                <span>• CVT STORE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1 leading-tight font-athletic uppercase">
                {product.name}
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">SKU: {product.sku}</p>
            </div>

            {/* Price & Installments */}
            <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-white font-athletic tracking-tight text-yellow-400">
                  R$ {effectivePrice.toFixed(2).replace('.', ',')}
                </span>
                {originalDisplayPrice && (
                  <span 
                    data-testid="modal-strikethrough-price"
                    className="text-xs sm:text-sm text-zinc-500 line-through"
                  >
                    R$ {originalDisplayPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                {isPromoActive && (
                  <span className="text-xs bg-red-600/30 text-red-400 border border-red-500/50 px-2 py-0.5 rounded font-black uppercase font-athletic">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Em até {installments}x de R$ {installmentValue} sem juros ou desconto à vista no Pix.
                {isPromoActive && (
                  <span className="text-emerald-400 font-bold ml-1.5">
                    (Economia de R$ {(product.price - effectivePrice).toFixed(2).replace('.', ',')})
                  </span>
                )}
              </p>
            </div>

            {/* Description */}
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase font-athletic tracking-wider block mb-1">
                Descrição & Caimento:
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-bold uppercase font-athletic">
                <span>Escolha o Tamanho:</span>
                <span className="text-yellow-400 font-black">Selecionado: {selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const stockForSize = product.stockBySize?.[size];
                  const isOutOfStock = stockForSize !== undefined && stockForSize <= 0;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] min-h-[44px] text-xs font-black px-3 py-2 flex items-center justify-center transition-all cursor-pointer font-athletic uppercase rounded ${
                        isOutOfStock
                          ? 'bg-zinc-900/50 text-zinc-600 border border-zinc-800 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-yellow-400 text-black shadow-md font-bold scale-105'
                          : 'bg-black text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-sans pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Produto original com garantia de troca na loja física de Igarassu - PE</span>
            </div>
          </div>

          {/* Action CTAs: Pedir no WhatsApp & Adicionar à Sacola */}
          <div className="pt-4 border-t border-zinc-800 space-y-2.5">
            <a
              href={detailedWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-lg transition-all font-athletic shadow-lg active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-black shrink-0" />
              <span>Pedir no WhatsApp Agora</span>
            </a>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full min-h-[44px] flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 border rounded-lg transition-all cursor-pointer font-athletic uppercase tracking-wider ${
                addedAnimation
                  ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400'
                  : 'bg-black hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-yellow-400" />
                  <span>Adicionado à Sacola!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-zinc-400" />
                  <span>Adicionar à Sacola de Compras</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
