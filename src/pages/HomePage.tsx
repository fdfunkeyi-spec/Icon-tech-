import React from 'react';
import { PageTab, Product } from '../types';
import { INVENTORY_PRODUCTS, STORE_LOCATION } from '../data/inventory';
import { DeviceVisual } from '../components/DeviceVisual';
import { ProductCard } from '../components/ProductCard';
import {
  Wrench,
  ShoppingBag,
  Cpu,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  Smartphone,
  Laptop,
  Check
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenEstimator: () => void;
  onOpenTracker: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartProductIds: Set<string>;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEstimator,
  onOpenTracker,
  onSelectProduct,
  onAddToCart,
  cartProductIds
}) => {
  // Grab top 4 featured products across categories with real photography
  const featuredProducts = [
    INVENTORY_PRODUCTS.find((p) => p.id === 'lap-mac-spacegray'),
    INVENTORY_PRODUCTS.find((p) => p.id === 'ph-s24ultra'),
    INVENTORY_PRODUCTS.find((p) => p.id === 'acc-poweradd-65w'),
    INVENTORY_PRODUCTS.find((p) => p.id === 'ph-redmi-note5g')
  ].filter(Boolean) as Product[];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-8 border-b border-slate-800/80 overflow-hidden">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Opposite Adeyemi, Ondo State, Nigeria</span>
                <span className="text-slate-600">·</span>
                <span className="text-blue-400 font-medium">Walk-ins & Express Repairs</span>
              </div>

              {/* Primary Headline with text-wrap: balance */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                Precision Repairs. <br className="hidden sm:inline" />
                Premium Devices. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">
                  Unmatched Reliability.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                The definitive service center for advanced mobile phone and laptop restoration, paired with top-tier consumer technology retail. Certified micro-soldering, OEM parts, and transparent turnaround.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenEstimator}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 active:scale-98 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  Request Repair Estimation
                </button>

                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Explore Device Inventory
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No-Fix, No-Fee Diagnostic Policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>90-Day Standard Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified OEM Grade Components</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden p-2">
                <DeviceVisual type="hero-lab" className="w-full h-72 sm:h-80 rounded-xl" />

                {/* Live Workbench Floating Overlay */}
                <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Active Workshop Station</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Micro-soldering & thermal testing lab</div>
                  </div>
                  <button
                    onClick={onOpenTracker}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    Track a Repair
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              6,800+
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Devices Restored
            </div>
            <p className="text-[11px] text-slate-400">Smartphones, MacBooks & Windows PCs</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              99.4%
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Customer Satisfaction
            </div>
            <p className="text-[11px] text-slate-400">Verified reviews across Ondo City & campus</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              45 Mins
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Express Screen Turnaround
            </div>
            <p className="text-[11px] text-slate-400">Same-day turnaround for common screen & battery faults</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              90 Days
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Standard Warranty
            </div>
            <p className="text-[11px] text-slate-400">Complete warranty coverage on parts and labor</p>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Engineered For Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Technology Users Choose Icon Tech
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We operate at the intersection of microscopic hardware engineering and trustworthy consumer electronics retail in Ondo State.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Proposition 1 */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Component-Level Expertise</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Advanced diagnostic and motherboard repair capabilities executed by certified hardware engineers. We do not just swap modules; we locate microscopic shorts and perform board-level IC replacements.
            </p>
            <div className="pt-2 text-xs text-blue-400 font-medium flex items-center gap-1.5">
              <span>Tristar, Charging IC & MOSFET restoration</span>
            </div>
          </div>

          {/* Proposition 2 */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Genuine Parts Guarantee</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              OEM-grade screens, high-density zero-cycle batteries, and internal components backed by standard warranty coverage. Every unit passes rigorous bench stress checks before customer handover.
            </p>
            <div className="pt-2 text-xs text-blue-400 font-medium flex items-center gap-1.5">
              <span>Original Retina, AMOLED & NVMe inventory</span>
            </div>
          </div>

          {/* Proposition 3 */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Transparent Turnaround</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upfront pricing structures and reliable completion schedules with zero hidden overhead. Get an instant quote before any work begins, and track your ticket live from initial drop-off to pickup.
            </p>
            <div className="pt-2 text-xs text-blue-400 font-medium flex items-center gap-1.5">
              <span>Same-day express return for daily commuters</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED DEPARTMENT PREVIEW (Side-by-side split banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department 1: Technical Repair Center */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group">
            {/* Real Photographic Background with Editorial Overlay */}
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
              alt="Icon Tech Repair Laboratory"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-950/90 border border-blue-800/60 text-blue-300 text-xs font-semibold backdrop-blur-xs">
                <Wrench className="w-3.5 h-3.5" />
                Department 01
              </div>
              <h3 className="text-2xl font-bold text-white">Technical Repair Center</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                Specialized laboratory for high-precision smartphone screen swaps, liquid damage restoration, laptop thermal overhauls, and deep data recovery.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>Microscope-assisted SMD soldering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>Thermal imaging short circuit detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>Fast 45-min battery & screen service</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('services')}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                View All Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenEstimator}
                className="px-5 py-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-700"
              >
                Estimate Repair
              </button>
            </div>
          </div>

          {/* Department 2: Retail Tech Hub */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group">
            {/* Real Photographic Background with Editorial Overlay */}
            <img
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80"
              alt="Icon Tech Gadgets Retail Hub"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/90 border border-sky-800/60 text-sky-300 text-xs font-semibold backdrop-blur-xs">
                <ShoppingBag className="w-3.5 h-3.5" />
                Department 02
              </div>
              <h3 className="text-2xl font-bold text-white">Retail Tech Hub</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                Direct retailer of brand-new and certified refurbished laptops, smartphones, high-capacity power banks, and genuine fast-charging accessories.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>Apple, HP, Dell, Lenovo, Samsung & Tecno</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>100% genuine guaranteed with store warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>Direct WhatsApp inquiry & campus pickup</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-600/30"
              >
                Shop Inventory
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-700"
              >
                Store Location Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED INVENTORY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              Hand-Picked Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Devices In Stock
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <span>View Full Catalog ({INVENTORY_PRODUCTS.length} devices)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isInCart={cartProductIds.has(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 6. PHYSICAL STORE BANNER (Opposite Adeyemi) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wide">
              <MapPin className="w-4 h-4" />
              Visit Our Walk-in Center
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Located Opposite Adeyemi, Ondo State
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Conveniently positioned on the Ondo-Ore axis right across Adeyemi Federal University of Education. Visit for live bench diagnostics, gadget inspection, or immediate consultations with our senior hardware engineers.
            </p>
            <div className="text-xs text-slate-400 pt-1">
              Open Monday to Saturday from 8:00 AM · Hotline: <strong className="text-slate-200">{STORE_LOCATION.phonePrimary}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
            >
              Get Driving Directions
            </button>
            <a
              href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                'Hello Icon Tech, I am planning to visit your store opposite Adeyemi, Ondo State.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-colors text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
