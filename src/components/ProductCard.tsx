import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { DeviceVisual } from './DeviceVisual';
import { STORE_LOCATION } from '../data/inventory';
import {
  MessageSquare,
  Eye,
  Plus,
  Check,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  X,
  Info
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isInCart
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    if (showTooltip) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showTooltip]);

  // Format price in NGN with commas
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

  // Direct WhatsApp inquiry message
  const whatsappUrl = `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
    `Hello Icon Tech, I am interested in purchasing:
Product: ${product.name}
Condition: ${product.condition}
Price: ${formattedPrice}
Reference ID: ${product.id}

Please confirm availability at your store Opposite Adeyemi, Ondo State.`
  )}`;

  const isBrandNew = product.condition === 'Brand New';

  return (
    <div className="group flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-visible hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/50 relative">
      {/* Visual Slot - 65% height focus */}
      <div
        onClick={() => onSelect(product)}
        className="relative bg-slate-950 cursor-pointer rounded-t-xl overflow-hidden border-b border-slate-800/80"
      >
        <DeviceVisual
          type={product.visualType}
          customImageUrl={product.customImageUrl}
          className="w-full h-52 sm:h-56"
        />

        {/* Condition Indicator with Interactive Tooltip Trigger */}
        <div
          ref={tooltipRef}
          className="absolute top-3 left-3 z-30 flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip((prev) => !prev);
              }}
              aria-label={`Learn about ${product.condition} status`}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-lg backdrop-blur-md transition-all cursor-pointer border shadow-md ${
                isBrandNew
                  ? 'bg-blue-950/90 text-blue-300 border-blue-700/70 hover:bg-blue-900 hover:text-white'
                  : 'bg-emerald-950/90 text-emerald-300 border-emerald-700/70 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              {isBrandNew ? (
                <Sparkles className="w-3 h-3 text-blue-400" />
              ) : (
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              )}
              <span>{product.condition}</span>
              <HelpCircle className="w-3 h-3 opacity-70 ml-0.5" />
            </button>

            {/* Hoverable & Interactive Status Tooltip */}
            {showTooltip && (
              <div
                className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-slate-950/95 border border-slate-700/90 rounded-xl p-4 shadow-2xl backdrop-blur-md z-50 text-left animate-in fade-in zoom-in-95 duration-150 space-y-3 pointer-events-auto"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {/* Tooltip Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Condition Standards
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(false);
                    }}
                    className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Current Active Status Highlight */}
                <div
                  className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                    isBrandNew
                      ? 'bg-blue-950/60 border-blue-800/80 text-blue-200'
                      : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    {isBrandNew ? (
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span>This Item is: {product.condition}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    {isBrandNew
                      ? '100% factory-sealed directly from the manufacturer with 0 prior usage hours or battery cycles.'
                      : 'Rigorous 40-point bench inspection passed. Reconditioned to Grade A cosmetic and hardware perfection.'}
                  </p>
                </div>

                {/* Comparative Difference Breakdown */}
                <div className="space-y-2 text-[11px]">
                  <div className="font-semibold text-slate-300 uppercase tracking-wide text-[10px]">
                    Understanding The Difference:
                  </div>

                  {/* Brand New definition */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-blue-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>Brand New</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed pl-2.5 text-[11px]">
                      Never opened or registered. Comes in original sealed factory retail box with manufacturer accessories and official warranty.
                    </p>
                  </div>

                  {/* Certified Refurbished definition */}
                  <div className="space-y-1 pt-1 border-t border-slate-900">
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Certified Refurbished</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed pl-2.5 text-[11px]">
                      Hand-inspected by certified technicians Opposite Adeyemi. Clean motherboard, 100% verified battery health, pristine Grade A body, backed by full store warranty with <strong>30%–50% savings</strong>.
                    </p>
                  </div>
                </div>

                {/* Trust Footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Inspect & test before paying Opposite Adeyemi</span>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Badge (e.g. Uploaded Stock / Verified Photo) */}
          {product.badge && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 backdrop-blur-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View trigger on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 cursor-pointer z-10"
          aria-label="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Body Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Brand & Category line */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 uppercase tracking-wider font-medium">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onSelect(product)}
          className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Key Specs Summary */}
        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {product.keySpecsSummary}
        </p>

        {/* Warranty hint */}
        <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span className="truncate">{product.warranty}</span>
        </div>

        {/* Pricing Baseline with Tabular Figures */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white font-mono tabular-nums">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">In Stock</span>
        </div>

        {/* Actions Grid */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {/* Purchase / Inquire via WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm active:scale-98"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="truncate">Inquire / Buy WhatsApp</span>
          </a>

          {/* Quick Add to Inquiry Cart */}
          <button
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
            className={`flex items-center justify-center rounded-lg border text-xs transition-colors cursor-pointer ${
              isInCart
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
