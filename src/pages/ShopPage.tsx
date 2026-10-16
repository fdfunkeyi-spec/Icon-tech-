import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';
import { INVENTORY_PRODUCTS, STORE_LOCATION } from '../data/inventory';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  X,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Laptop,
  Smartphone,
  Headphones,
  Sparkles,
  Link as LinkIcon,
  Check,
  ExternalLink,
  Cpu,
  Globe,
  Share2,
  Camera,
  Upload,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartProductIds: Set<string>;
  initialSearchQuery?: string;
  products?: Product[];
  onOpenUploadModal?: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onAddToCart,
  cartProductIds,
  initialSearchQuery = '',
  products = INVENTORY_PRODUCTS,
  onOpenUploadModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedCondition, setSelectedCondition] = useState<'all' | ProductCondition>('all');
  const [filterUploadedOnly, setFilterUploadedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync initialSearchQuery or read from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlQuery = params.get('search') || params.get('q');
      if (urlQuery && urlQuery !== searchQuery) {
        setSearchQuery(urlQuery);
      } else if (initialSearchQuery && initialSearchQuery !== searchQuery) {
        setSearchQuery(initialSearchQuery);
      }
    }
  }, [initialSearchQuery]);

  // Update browser URL query in real-time without reloading
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', 'shop');
      if (query.trim()) {
        url.searchParams.set('search', query.trim());
      } else {
        url.searchParams.delete('search');
        url.searchParams.delete('q');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Preset search keywords for quick filtering
  const quickKeywords = [
    { label: 'icon-tech-website', query: 'icon-tech-website', isSpecial: true },
    { label: 'Laptops', query: 'laptops' },
    { label: 'Smartphones', query: 'phones' },
    { label: 'iPhone', query: 'iphone' },
    { label: 'MacBook', query: 'macbook' },
    { label: 'ThinkPad', query: 'thinkpad' },
    { label: 'Samsung', query: 'samsung' },
    { label: 'Power Bank', query: 'powerbank' },
    { label: 'Charger', query: 'charger' },
    { label: 'Audio', query: 'audio' }
  ];

  // Check if query is searching for icon tech website
  const isIconTechWebsiteQuery = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (
      q.includes('icon-tech-website') ||
      q.includes('icon tech website') ||
      q.includes('icontech') ||
      q.includes('icon-tech') ||
      q === 'website' ||
      q === 'icon'
    );
  }, [searchQuery]);

  // Filter and sort products in real-time
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Condition
    if (selectedCondition !== 'all') {
      result = result.filter((p) => p.condition === selectedCondition);
    }

    // Filter by Uploaded/Real Photo Only
    if (filterUploadedOnly) {
      result = result.filter(
        (p) =>
          Boolean(p.customImageUrl) ||
          p.badge === 'Verified Photo' ||
          p.badge === 'Uploaded Stock' ||
          p.visualType === 'custom-upload' ||
          p.id.startsWith('custom-') ||
          p.id.startsWith('stock-')
      );
    }

    // Real-time Search by Model Name, Category Keywords, Brand, Specs, or icon-tech-website
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      // If user is searching for "icon-tech-website" or "icon-tech", show all official icon tech products
      if (
        q === 'icon-tech-website' ||
        q === 'icon-tech' ||
        q === 'icontech' ||
        q === 'icon tech' ||
        q === 'icon tech website'
      ) {
        return result;
      }

      result = result.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const brandMatch = p.brand.toLowerCase().includes(q);
        const categoryMatch = p.category.toLowerCase().includes(q);
        const conditionMatch = p.condition.toLowerCase().includes(q);
        const specsSummaryMatch = p.keySpecsSummary.toLowerCase().includes(q);
        const descriptionMatch = p.description.toLowerCase().includes(q);
        const warrantyMatch = p.warranty.toLowerCase().includes(q);

        // Keyword synonyms matching
        const synonymMatch =
          (q === 'phone' || q === 'phones' || q === 'smartphone' || q === 'mobile') &&
          p.category === 'phones';
        const laptopSynonymMatch =
          (q === 'laptop' || q === 'laptops' || q === 'notebook' || q === 'pc' || q === 'computer') &&
          p.category === 'laptops';
        const accessorySynonymMatch =
          (q === 'accessory' || q === 'accessories' || q === 'charger' || q === 'power bank' || q === 'earbuds' || q === 'headphones') &&
          p.category === 'accessories';

        // Deep specs match
        const deepSpecsMatch =
          (p.specs.processor && p.specs.processor.toLowerCase().includes(q)) ||
          (p.specs.ram && p.specs.ram.toLowerCase().includes(q)) ||
          (p.specs.storage && p.specs.storage.toLowerCase().includes(q)) ||
          (p.specs.screen && p.specs.screen.toLowerCase().includes(q)) ||
          (p.specs.battery && p.specs.battery.toLowerCase().includes(q)) ||
          (p.specs.camera && p.specs.camera.toLowerCase().includes(q)) ||
          (p.specs.features && p.specs.features.some((f) => f.toLowerCase().includes(q)));

        return (
          nameMatch ||
          brandMatch ||
          categoryMatch ||
          conditionMatch ||
          specsSummaryMatch ||
          descriptionMatch ||
          warrantyMatch ||
          synonymMatch ||
          laptopSynonymMatch ||
          accessorySynonymMatch ||
          deepSpecsMatch
        );
      });
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, selectedCondition, filterUploadedOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCondition('all');
    setFilterUploadedOnly(false);
    handleSearchChange('');
    setSortBy('featured');
  };

  // Helper to copy the direct search link for icon-tech-website
  const getSearchUrl = (query: string = 'icon-tech-website') => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      return `${origin}${pathname}?tab=shop&search=${encodeURIComponent(query)}`;
    }
    return `/?tab=shop&search=${encodeURIComponent(query)}`;
  };

  const copySearchLink = (query: string = 'icon-tech-website') => {
    const url = getSearchUrl(query);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. SHOP HEADER & SEARCH BAR */}
      <section className="relative pt-10 sm:pt-14 pb-8 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
                <ShoppingBag className="w-3.5 h-3.5" />
                Verified Hardware Retail Hub · Opposite Adeyemi, Ondo State
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Gadget Store & Inventory Search
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Real-time search across authentic laptops, flagship smartphones, high-capacity power banks, and certified accessories in stock at our Ondo store.
              </p>
            </div>

            {/* Quick action buttons: Upload Real Stock & Photography Guidelines */}
            {onOpenUploadModal && (
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={onOpenUploadModal}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-98"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Stock Photo</span>
                </button>
                <button
                  onClick={onOpenUploadModal}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Photo Standards Guide</span>
                </button>
              </div>
            )}
          </div>

          {/* REAL-TIME SEARCH BAR */}
          <div className="space-y-3">
            <div className="relative max-w-2xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search inventory by model name, brand, or category keywords (e.g. iPhone, EliteBook, ThinkPad, icon-tech-website)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                autoComplete="off"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-24 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-lg shadow-black/30"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    aria-label="Clear search"
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <span className="text-[11px] font-mono text-slate-500 border-l border-slate-800 pl-2 hidden sm:inline">
                  {filteredProducts.length} items
                </span>
              </div>
            </div>

            {/* Quick Keyword Pills for fast filtering */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
              <span className="text-slate-400 font-medium text-[11px] shrink-0">Quick Filter:</span>
              {quickKeywords.map((kw) => {
                const isActive = searchQuery.toLowerCase().trim() === kw.query;
                return (
                  <button
                    key={kw.query}
                    onClick={() => handleSearchChange(isActive ? '' : kw.query)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : kw.isSpecial
                        ? 'bg-blue-950/80 border border-blue-500/60 text-blue-300 hover:bg-blue-900/60 hover:text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {kw.isSpecial && <Globe className="w-3 h-3 text-blue-400" />}
                    <span>{kw.label}</span>
                  </button>
                );
              })}
            </div>

            {/* DIRECT LINK SHARE BAR FOR icon-tech-website */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs max-w-2xl">
              <div className="flex items-center gap-2 min-w-0">
                <LinkIcon className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-400 shrink-0">Direct Search Link:</span>
                <code className="text-blue-300 font-mono text-[11px] truncate bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  ?tab=shop&search=icon-tech-website
                </code>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => handleSearchChange('icon-tech-website')}
                  className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/40 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Apply Search
                </button>
                <button
                  onClick={() => copySearchLink('icon-tech-website')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIAL SHOWCASE: ICON TECH OFFICIAL WEBSITE SEARCH RESULT BANNER */}
      {isIconTechWebsiteQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-800/80 shadow-xl shadow-blue-950/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      ICON TECH Official Website Inventory
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                      Live Store Catalog
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Official electronics retail and component repair portal Opposite Adeyemi, Ondo State, Nigeria.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Opposite Adeyemi Federal University axis</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Domain / Platform:</span>
                <span className="font-mono text-white font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  icontech.com / icon-tech-website
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Store Hotline / WhatsApp:</span>
                <a
                  href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Icon Tech, I am browsing your official website inventory (icon-tech-website).'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline font-semibold"
                >
                  {STORE_LOCATION.phonePrimary}
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-medium">Catalog Status:</span>
                <span className="text-white font-medium">
                  {products.length} certified devices listed with live pricing
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. FILTER CONTROLS & PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category & Condition Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setSelectedCategory('laptops')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'laptops'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Laptops & Notebooks
            </button>
            <button
              onClick={() => setSelectedCategory('phones')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'phones'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Smartphones & Tablets
            </button>
            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'accessories'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Accessories & Audio
            </button>
          </div>

          {/* Condition, Uploaded Photos & Sort Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Filter by Uploaded/Real Photo Only */}
            <button
              onClick={() => setFilterUploadedOnly((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                filterUploadedOnly
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700/80'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real Photo Stock</span>
            </button>

            {/* Condition Filter */}
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <span className="hidden sm:inline">Condition:</span>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Conditions</option>
                <option value="Brand New">Brand New</option>
                <option value="Certified Refurbished">Certified Refurbished</option>
              </select>
            </div>

            {/* Price Sorting */}
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter / Active Filter chips */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">{filteredProducts.length}</strong>{' '}
            {filteredProducts.length === 1 ? 'device' : 'devices'}
            {searchQuery && (
              <span>
                {' '}
                matching "<strong className="text-blue-400">{searchQuery}</strong>"
              </span>
            )}
            {filterUploadedOnly && <span className="text-emerald-400 font-medium"> · Real Photo Stock</span>}
          </div>
          {(selectedCategory !== 'all' || selectedCondition !== 'all' || filterUploadedOnly || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isInCart={cartProductIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No devices matched your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              We frequently receive new shipments of HP, Dell, Apple, and Samsung hardware. Try broadening your filter or message our sales desk directly.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <a
                href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Icon Tech, I am looking for a device not currently listed in your online catalog: "${searchQuery}". Do you have it in stock?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 4. PHOTOGRAPHY STANDARDS BANNER (PROVING TRANSPARENCY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>Icon Tech Genuine Photography Commitment</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Every Device In Our Inventory Is Verified With Genuine Photography
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We do not use misleading stock renders. We photograph the actual front & back screens, illuminated power station battery indicators, unboxed accessories, and repair bench testing right here Opposite Adeyemi, Ondo State.
            </p>
          </div>

          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Stock Photo</span>
            </button>
          )}
        </div>
      </section>

      {/* 5. STORE PURCHASE & WARRANTY COMMITMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Certified Quality Benchmarks</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every refurbished device undergoes a 40-point hardware audit covering battery cycle health, display uniformity, ports, and keyboard responsiveness.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Direct Store Pickup & Inspection</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect before you pay at our store Opposite Adeyemi, Ondo State. Test all functions with our technician before final purchase.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Software & Setup Included</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All laptops purchased from Icon Tech include genuine OS deployment, Microsoft Office setup, and free initial software configuration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
