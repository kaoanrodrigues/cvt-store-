import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppLink } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || '');

  const installments = Math.min(3, Math.floor(product.price / 25));
  const installmentValue = (product.price / installments).toFixed(2).replace('.', ',');

  const detailedWhatsAppLink = buildWhatsAppLink(
    `${product.brand ? `[${product.brand}] ` : ''}${product.name}${selectedColor ? ` (Cor: ${selectedColor})` : ''}`,
    selectedSize,
    product.price
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 shadow-2xl text-white max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/80 hover:bg-black text-zinc-300 hover:text-white transition-colors border border-zinc-800"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 relative bg-zinc-900 min-h-[300px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-yellow-400 text-black font-black text-xs px-3 py-1 uppercase tracking-wider font-athletic">
              {product.badge}
            </span>
          )}
          {product.brand && (
            <span className="absolute bottom-4 left-4 bg-black text-yellow-400 border border-yellow-400/40 font-black text-[11px] px-2.5 py-1 uppercase tracking-widest font-athletic">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product Details Column */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6 bg-zinc-950">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-black text-yellow-400 tracking-wider font-athletic">
                <span>{product.categoryLabel}</span>
                {product.brand && <span>• {product.brand}</span>}
                <span>• CVT STORE</span>
              </div>
              <h2 className="text-3xl font-black text-white mt-1 leading-tight font-athletic uppercase">
                {product.name}
              </h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white font-athletic tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              Em até {installments}x de R$ {installmentValue} sem juros ou desconto à vista no Pix.
            </p>

            <p className="text-sm text-zinc-300 leading-relaxed border-t border-zinc-800 pt-3 font-sans">
              {product.description}
            </p>

            {/* Color selection if available */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-athletic uppercase">
                  <span>Cor disponível:</span>
                  <span className="font-bold text-white">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 text-xs border font-bold transition-all uppercase font-athletic ${
                        selectedColor === c.name
                          ? 'border-yellow-400 bg-zinc-900 text-yellow-400'
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-athletic uppercase font-bold">
                <span>Selecione o tamanho:</span>
                <span className="text-yellow-400">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 text-xs font-black border transition-all uppercase font-athletic ${
                      selectedSize === size
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-black text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800 font-sans">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Pronta entrega Igarassu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Originalidade DLZ & Mioche</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4">
            <a
              href={detailedWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3.5 px-4 uppercase tracking-wider transition-all active:scale-98 font-athletic"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>Pedir no WhatsApp Agora</span>
            </a>

            <button
              onClick={() => {
                onAddToCart(product, selectedSize);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-zinc-200 font-black py-2.5 px-4 uppercase tracking-wider border border-zinc-800 transition-colors font-athletic"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar à Sacola de Compras</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
