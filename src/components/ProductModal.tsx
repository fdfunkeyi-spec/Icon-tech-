import React from 'react';
import { Product } from '../types';
import { DeviceVisual } from './DeviceVisual';
import { STORE_LOCATION } from '../data/inventory';
import { X, MessageSquare, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isInCart
}) => {
  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
      }).format(product.originalPrice)
    : null;

  const whatsappMessage = `Hello Icon Tech, I am interested in purchasing:
Product: ${product.name}
Condition: ${product.condition}
Price: ${formattedPrice}
Product ID: ${product.id}

I would like to arrange pickup or inspection at your store Opposite Adeyemi, Ondo State.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Device Visual Showcase */}
          <div className="bg-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800">
            <DeviceVisual
              type={product.visualType}
              customImageUrl={product.customImageUrl}
              className="w-full h-64 md:h-72"
            />
            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className={`px-2.5 py-1 rounded font-semibold text-xs border ${
                  product.condition === 'Brand New'
                    ? 'bg-blue-950 text-blue-300 border-blue-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  Status: {product.condition}
                </span>
                <span className="text-emerald-400 font-medium">Verified In Stock</span>
              </div>

              {/* Status Explanation Box */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Condition Standard: {product.condition}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {product.condition === 'Brand New'
                    ? 'Factory-sealed original unit directly from manufacturer. Zero prior battery cycles or usage hours. Official manufacturer warranty included.'
                    : 'Certified Refurbished Grade A: 40-point bench inspection executed by certified engineers Opposite Adeyemi. Clean motherboard, 100% verified battery health, and full store warranty with 30%–50% cost savings.'}
                </p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  Physical inspection and function testing permitted before payment.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Brand */}
              <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
                {product.brand} · {product.category}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-white leading-snug">{product.name}</h2>

              {/* Pricing */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white font-mono tabular-nums">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Detailed Specs List */}
              <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4 text-xs">
                {product.specs.processor && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400 font-medium">Processor</span>
                    <span className="col-span-2 text-slate-200">{product.specs.processor}</span>
                  </div>
                )}
                {product.specs.ram && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400 font-medium">Memory (RAM)</span>
                    <span className="col-span-2 text-slate-200">{product.specs.ram}</span>
                  </div>
                )}
                {product.specs.storage && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400 font-medium">Storage</span>
                    <span className="col-span-2 text-slate-200">{product.specs.storage}</span>
                  </div>
                )}
                {product.specs.screen && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400 font-medium">Display</span>
                    <span className="col-span-2 text-slate-200">{product.specs.screen}</span>
                  </div>
                )}
                {product.specs.battery && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400 font-medium">Battery</span>
                    <span className="col-span-2 text-slate-200">{product.specs.battery}</span>
                  </div>
                )}
                {product.specs.camera && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-400 font-medium">Camera Optics</span>
                    <span className="col-span-2 text-slate-200">{product.specs.camera}</span>
                  </div>
                )}
              </div>

              {/* Hardware Highlights / Features */}
              {product.specs.features && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <h4 className="text-xs font-semibold text-slate-300 mb-2">Key Hardware Features:</h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-400">
                    {product.specs.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warranty reassurance */}
              <div className="mt-4 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Warranty: <strong className="text-white">{product.warranty}</strong></span>
              </div>
            </div>

            {/* Bottom Purchase CTAs */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                Purchase via WhatsApp
              </a>

              <button
                onClick={() => onAddToCart(product)}
                className={`px-4 py-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border cursor-pointer ${
                  isInCart
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {isInCart ? 'Added to Bag' : 'Add to Bag'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
