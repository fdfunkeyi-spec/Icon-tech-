import React, { useState } from 'react';
import { PageTab } from '../types';
import { Wrench, ShoppingBag, Menu, X, Cpu, Camera } from 'lucide-react';

interface NavbarProps {
  currentTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onOpenEstimator: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenUpload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenEstimator,
  cartCount,
  onOpenCart,
  onOpenUpload
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'services', label: 'Services' },
    { tab: 'shop', label: 'Shop' },
    { tab: 'about', label: 'About' },
    { tab: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tab: PageTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark (Single text element with integrated hardware glyph) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group whitespace-nowrap shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                ICON TECH
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Sales & Device Repairs
              </span>
            </div>
          </button>

          {/* Zone 2: 5 Concise Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-blue-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Utility */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Shopping & Inquiry Cart Bag */}
            <button
              onClick={onOpenCart}
              aria-label="View Cart and Inquiries"
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Upload Stock Action */}
            {onOpenUpload && (
              <button
                onClick={onOpenUpload}
                aria-label="Upload Stock Photo"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-700/80 rounded-lg hover:text-white hover:border-slate-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-blue-400" />
                <span>Upload Stock</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={onOpenEstimator}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/25 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              Book a Repair
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentTab === item.tab
                  ? 'bg-blue-600/15 text-blue-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            {onOpenUpload && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenUpload();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 text-blue-300 border border-slate-700 font-semibold text-xs uppercase tracking-wider hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Upload Stock Photo & Device</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-500 transition-colors cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              Book a Repair / Get Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
