import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

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
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Brand Label (DLZ / Mioche / CVT) */}
        {product.brand && (
          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/90 text-yellow-400 border border-yellow-400/40 text-[10px] font-black px-2 py-0.5 uppercase tracking-widest font-athletic">
            {product.brand}
          </div>
        )}

        {/* Badge (Mais Vendida, Lançamento) */}
        {product.badge && (
          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest font-athletic">
            {product.badge}
          </div>
        )}

        {/* Quick View Button overlay (accessible for both touch and hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
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
            {product.categoryLabel}
          </span>
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1 cursor-pointer font-sans mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-sans">
            {product.description}
          </p>
        </div>

        {/* Size Selection Selector with touch-friendly targets */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-bold uppercase font-athletic">
            <span>Tamanho:</span>
            <span className="text-yellow-400">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[36px] min-h-[36px] sm:min-w-[32px] sm:min-h-[32px] text-xs font-black px-2 py-1 flex items-center justify-center transition-all cursor-pointer font-athletic uppercase ${
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
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] sm:min-h-[46px] flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-xs sm:text-sm py-2.5 px-3 uppercase tracking-wider transition-all duration-200 active:scale-98 font-athletic shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-black shrink-0" />
            <span>Pedir no WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full min-h-[38px] flex items-center justify-center gap-2 text-xs font-bold py-2 px-3 border transition-all cursor-pointer font-athletic uppercase tracking-wider ${
              addedAnimation
                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400'
                : 'bg-black hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-yellow-400" />
                <span>Adicionado à Sacola!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
                <span>Adicionar à Sacola</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
