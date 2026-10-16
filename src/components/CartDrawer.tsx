import React from 'react';
import { CartItem } from '../types';
import { STORE_LOCATION } from '../data/inventory';
import { DeviceVisual } from './DeviceVisual';
import { X, Trash2, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(totalAmount);

  const generateWhatsAppCheckoutMessage = () => {
    let msg = `Hello Icon Tech, I would like to place an order/inquiry for the following items:\n\n`;
    items.forEach((item, idx) => {
      const lineTotal = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
      }).format(item.product.price * item.quantity);
      msg += `${idx + 1}. ${item.product.name} (${item.product.condition})\n`;
      msg += `   Qty: ${item.quantity} x ₦${item.product.price.toLocaleString()} = ${lineTotal}\n\n`;
    });
    msg += `Total Amount: ${formattedTotal}\n`;
    msg += `Store: Opposite Adeyemi, Ondo State\n`;
    msg += `Please confirm availability and pickup/delivery options.`;
    return msg;
  };

  const whatsappCheckoutUrl = `https://wa.me/${
    STORE_LOCATION.whatsappNumber
  }?text=${encodeURIComponent(generateWhatsAppCheckoutMessage())}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Device Inquiry Bag</h3>
                <span className="text-xs text-slate-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-semibold text-slate-200">Your bag is empty</h4>
                <p className="text-xs max-w-xs leading-relaxed">
                  Browse our inventory of brand-new and certified laptops, smartphones, and accessories to request a direct quote.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-slate-950 border border-slate-800/80 rounded-xl"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0 flex items-center justify-center">
                    <DeviceVisual type={item.product.visualType} className="w-full h-full p-1" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.product.condition}
                      </div>
                      <div className="text-xs font-bold text-blue-400 font-mono tabular-nums mt-1">
                        ₦{item.product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-800 rounded bg-slate-900 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400 font-medium">Estimated Total:</span>
                <span className="text-xl font-bold text-white font-mono tabular-nums">
                  {formattedTotal}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Pickup available at Opposite Adeyemi, Ondo State</span>
              </div>

              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/25 active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                Order via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClearCart}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
