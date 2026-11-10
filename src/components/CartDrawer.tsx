import React, { useMemo } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { buildCartWhatsAppLink, generateOrderId, WHATSAPP_DISPLAY, getEffectivePrice } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + getEffectivePrice(item.product) * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate or memoize order id for this session
  const orderId = useMemo(() => generateOrderId(), [cart.length]);

  const checkoutLink = buildCartWhatsAppLink(
    cart.map((item) => ({
      name: `${item.product.brand ? `[${item.product.brand}] ` : ''}${item.product.name}${item.product.isPromo ? ' (PROMO)' : ''}`,
      size: item.selectedSize,
      quantity: item.quantity,
      price: getEffectivePrice(item.product),
    })),
    orderId
  );

  return (
    <div 
      data-testid="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        data-testid="cart-drawer"
        className="w-full max-w-md bg-black text-white h-full border-l border-zinc-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="font-black text-lg text-white uppercase font-athletic tracking-wider">
                Sua Sacola ({totalItems})
              </h3>
              <p className="text-[10px] text-zinc-400 font-mono">ID: #{orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-800 rounded-lg"
            aria-label="Fechar Sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 rounded-2xl">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-black text-white uppercase font-athletic">Sua sacola está vazia</p>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Adicione peças do catálogo para fechar seu pedido exclusivo via WhatsApp.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black px-5 py-2.5 uppercase tracking-wider transition-colors font-athletic rounded-lg shadow-md"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                data-testid="cart-item"
                className="p-3.5 bg-zinc-900/90 border border-zinc-800 flex items-center gap-3.5 rounded-lg"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover shrink-0 bg-black border border-zinc-800 rounded"
                />

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-1.5">
                    {item.product.brand && (
                      <span className="text-[10px] text-yellow-400 font-black uppercase font-athletic tracking-wider">
                        {item.product.brand}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white truncate font-sans" title={item.product.name}>
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span className="px-1.5 py-0.5 bg-black text-zinc-300 font-black text-[10px] font-athletic uppercase rounded">
                      Tam: {item.selectedSize}
                    </span>
                    <span className="font-athletic font-bold text-sm text-yellow-400">
                      R$ {getEffectivePrice(item.product).toFixed(2).replace('.', ',')}
                    </span>
                    {item.product.isPromo && item.product.promoPrice && (
                      <span className="text-[10px] text-zinc-500 line-through">
                        R$ {item.product.price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1 bg-black border border-zinc-800 p-0.5 rounded">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white rounded"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-white font-athletic">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white rounded"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors rounded hover:bg-zinc-800"
                      title="Remover item"
                      aria-label="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout via WhatsApp */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-400 text-xs font-sans">
                <span>Subtotal ({totalItems} itens):</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-base font-black text-white uppercase font-athletic tracking-wider">
                  Total do Pedido:
                </span>
                <span 
                  data-testid="cart-total-price"
                  className="text-3xl font-black text-yellow-400 font-athletic tracking-tight"
                >
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Atendimento humano e direto pelo WhatsApp oficial</span>
              </div>
            </div>

            <a
              href={checkoutLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-checkout-btn"
              className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-sm uppercase tracking-wider transition-all active:scale-98 font-athletic shadow-lg rounded-xl"
            >
              <MessageCircle className="w-5 h-5 fill-black shrink-0" />
              <span>Finalizar Pedido no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
              <span>Pagamento no Pix ou Cartão em até 12x</span>
              <button
                onClick={onClearCart}
                className="hover:text-rose-400 transition-colors uppercase font-athletic font-bold"
              >
                Limpar Sacola
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
