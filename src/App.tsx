import React, { useState, useEffect } from 'react';
import { PageTab, Product, CartItem } from './types';
import { INVENTORY_PRODUCTS } from './data/inventory';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { RepairEstimatorModal } from './components/RepairEstimatorModal';
import { RepairTrackerModal } from './components/RepairTrackerModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { UploadProductModal } from './components/UploadProductModal';

export default function App() {
  // Check initial URL parameters for tab and search
  const [currentTab, setCurrentTab] = useState<PageTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as PageTab;
      if (tabParam && ['home', 'services', 'shop', 'about', 'contact'].includes(tabParam)) {
        return tabParam;
      }
      if (params.get('search') || params.get('q')) {
        return 'shop';
      }
      if (window.location.hash) {
        const hash = window.location.hash.toLowerCase();
        if (hash.includes('shop') || hash.includes('icon-tech-website')) {
          return 'shop';
        }
      }
    }
    return 'home';
  });

  const [initialSearchQuery, setInitialSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search') || params.get('q');
      if (q) return q;
      if (window.location.hash) {
        const h = window.location.hash.replace(/^#/, '');
        if (h.startsWith('search=')) return decodeURIComponent(h.slice(7));
        if (h.startsWith('q=')) return decodeURIComponent(h.slice(2));
        if (h === 'icon-tech-website') return 'icon-tech-website';
      }
    }
    return '';
  });

  // Manage all products (combining baseline inventory with user-uploaded products)
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('icon_tech_custom_products');
        if (saved) {
          const parsed = JSON.parse(saved) as Product[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            return [...parsed, ...INVENTORY_PRODUCTS];
          }
        }
      } catch (err) {
        console.warn('Could not read saved custom products', err);
      }
    }
    return INVENTORY_PRODUCTS;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Listen to popstate (back/forward or URL changes)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as PageTab;
      if (tabParam && ['home', 'services', 'shop', 'about', 'contact'].includes(tabParam)) {
        setCurrentTab(tabParam);
      }
      const q = params.get('search') || params.get('q');
      if (q) {
        setInitialSearchQuery(q);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle new product photo upload and publication
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      try {
        const customOnly = updated.filter(
          (p) => p.id.startsWith('custom-') || p.id.startsWith('stock-')
        );
        localStorage.setItem('icon_tech_custom_products', JSON.stringify(customOnly));
      } catch (e) {
        // ignore storage quota errors
      }
      return updated;
    });
    handleNavigate('shop');
  };

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartProductIds = new Set(cartItems.map((item) => item.product.id));
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (tab: PageTab) => {
    setCurrentTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      if (tab !== 'shop') {
        url.searchParams.delete('search');
        url.searchParams.delete('q');
      }
      window.history.pushState({}, '', url.toString());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* 2. Main Page View Rendering */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEstimator={() => setIsEstimatorOpen(true)}
            onOpenTracker={() => setIsTrackerOpen(true)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            cartProductIds={cartProductIds}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            onOpenEstimator={() => setIsEstimatorOpen(true)}
            onOpenTracker={() => setIsTrackerOpen(true)}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            cartProductIds={cartProductIds}
            initialSearchQuery={initialSearchQuery}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEstimator={() => setIsEstimatorOpen(true)}
          />
        )}

        {currentTab === 'contact' && <ContactPage />}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* 4. Persistent Floating WhatsApp Conversion Action */}
      <FloatingWhatsApp />

      {/* 5. Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={selectedProduct ? cartProductIds.has(selectedProduct.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <RepairEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

      <RepairTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* 6. Stock Image Uploader & Photography Standards Modal */}
      <UploadProductModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
