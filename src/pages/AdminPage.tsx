import React, { useState, useEffect } from 'react';
import { Product, StoreConfig, RepairBookingRequest, OrderEnquiry, ProductCategory, ProductCondition } from '../types';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoreConfig,
  saveStoreConfig,
  getStoredRepairRequests,
  saveStoredRepairRequests,
  getStoredOrderEnquiries,
  saveStoredOrderEnquiries,
  INVENTORY_PRODUCTS
} from '../data/inventory';
import { DeviceVisual } from '../components/DeviceVisual';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Package,
  Wrench,
  ShoppingBag,
  Store,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  RefreshCw,
  Camera,
  AlertTriangle,
  Eye,
  Key,
  Calendar,
  Save,
  CheckCircle2
} from 'lucide-react';

interface AdminPageProps {
  onCatalogUpdated: (products: Product[]) => void;
  onConfigUpdated: (config: StoreConfig) => void;
  onNavigateHome: () => void;
}

const DEFAULT_ADMIN_PASS = 'icontech2024';

export const AdminPage: React.FC<AdminPageProps> = ({
  onCatalogUpdated,
  onConfigUpdated,
  onNavigateHome
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('icon_tech_admin_session') === 'true';
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentPasscode, setCurrentPasscode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('icon_tech_admin_pass') || DEFAULT_ADMIN_PASS;
    }
    return DEFAULT_ADMIN_PASS;
  });

  const [activeTab, setActiveTab] = useState<'products' | 'repairs' | 'orders' | 'store' | 'guide'>('products');
  const [products, setProducts] = useState<Product[]>(getStoredProducts);
  const [storeConfig, setStoreConfigState] = useState<StoreConfig>(getStoreConfig);
  const [repairRequests, setRepairRequests] = useState<RepairBookingRequest[]>(getStoredRepairRequests);
  const [orderEnquiries, setOrderEnquiries] = useState<OrderEnquiry[]>(getStoredOrderEnquiries);

  // Product Editing / Creation State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Passcode update state
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  // Authentication submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === currentPasscode) {
      setIsAuthenticated(true);
      setAuthError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('icon_tech_admin_session', 'true');
      }
    } else {
      setAuthError('Incorrect admin passcode. Default is "icontech2024".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('icon_tech_admin_session');
    }
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.length < 6) {
      alert('Passcode must be at least 6 characters.');
      return;
    }
    localStorage.setItem('icon_tech_admin_pass', newPasscode);
    setCurrentPasscode(newPasscode);
    setNewPasscode('');
    setPasscodeSuccess(true);
    setTimeout(() => setPasscodeSuccess(false), 3000);
  };

  // Toggle in-stock status
  const handleToggleStock = (productId: string) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
    onCatalogUpdated(updated);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to remove this product from the ICON TECH catalog?')) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      saveStoredProducts(updated);
      onCatalogUpdated(updated);
    }
  };

  // Reset to original factory stock
  const handleResetCatalog = () => {
    if (confirm('Reset catalog back to initial default ICON TECH demonstration inventory? Custom added products will be replaced.')) {
      setProducts(INVENTORY_PRODUCTS);
      saveStoredProducts(INVENTORY_PRODUCTS);
      onCatalogUpdated(INVENTORY_PRODUCTS);
      setSaveSuccessMsg('Catalog restored to default baseline.');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  // Save edited or new product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.price) {
      alert('Please provide at least a Product Name and Price.');
      return;
    }

    let updatedList: Product[];
    const exists = products.some((p) => p.id === editingProduct.id);

    if (exists) {
      updatedList = products.map((p) =>
        p.id === editingProduct.id ? editingProduct : p
      );
    } else {
      updatedList = [editingProduct, ...products];
    }

    setProducts(updatedList);
    saveStoredProducts(updatedList);
    onCatalogUpdated(updatedList);
    setEditingProduct(null);
    setIsAddProductOpen(false);
    setSaveSuccessMsg('Product saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Save Store Configuration
  const handleSaveStoreConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreConfig(storeConfig);
    onConfigUpdated(storeConfig);
    setSaveSuccessMsg('Store information and contact details saved!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Update repair request status
  const handleUpdateRepairStatus = (requestId: string, newStatus: RepairBookingRequest['status']) => {
    const updated = repairRequests.map((req) =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRepairRequests(updated);
    saveStoredRepairRequests(updated);
  };

  // Delete repair request
  const handleDeleteRepairRequest = (requestId: string) => {
    if (confirm('Delete this repair enquiry record?')) {
      const updated = repairRequests.filter((r) => r.id !== requestId);
      setRepairRequests(updated);
      saveStoredRepairRequests(updated);
    }
  };

  // Delete order enquiry
  const handleDeleteOrderEnquiry = (orderId: string) => {
    if (confirm('Delete this order enquiry record?')) {
      const updated = orderEnquiries.filter((o) => o.id !== orderId);
      setOrderEnquiries(updated);
      saveStoredOrderEnquiries(updated);
    }
  };

  // Open Add Product modal
  const openNewProductModal = () => {
    const newId = `product-${Date.now()}`;
    setEditingProduct({
      id: newId,
      name: '',
      brand: '',
      category: 'smartphones',
      condition: 'Brand New',
      price: 25000,
      originalPrice: 30000,
      specs: {
        features: ['Genuine manufacturer unit', 'Tested by Icon Tech Opposite Adeyemi']
      },
      keySpecsSummary: '',
      description: 'Available for immediate inspection and pickup at ICON TECH Opposite Adeyemi, Ondo State.',
      inStock: true,
      warranty: '1 Year Warranty',
      badge: 'New Arrival',
      visualType: 'phone-samsung-ultra'
    });
    setIsAddProductOpen(true);
  };

  // Image file handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert('File size exceeds 2.5MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setEditingProduct({
        ...editingProduct,
        customImageUrl: result,
        visualType: 'custom-upload'
      });
    };
    reader.readAsDataURL(file);
  };

  // If NOT logged in, show Password Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-white">ICON TECH Owner Portal</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Secure administration for managing inventory, prices, repair bookings, and store contact Opposite Adeyemi.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Owner Passcode
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode..."
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 cursor-pointer active:scale-98"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Initial Setup Credential:</span>
            </div>
            <p>
              Default Passcode: <code className="text-blue-300 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">icontech2024</code>
            </p>
            <p className="text-slate-500 text-[10px]">
              You can change this passcode at any time inside the admin settings tab.
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-950 border border-blue-800 text-blue-300 text-[11px] font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Administration Panel · Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">ICON TECH Control Center</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage live pricing, product stock, repair tickets, and store hours Opposite Adeyemi, Ondo State.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            View Public Shop
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-xs font-semibold text-red-300 hover:text-white transition-colors cursor-pointer"
          >
            Lock Dashboard
          </button>
        </div>
      </div>

      {/* Global Success Notification */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
          <button onClick={() => setSaveSuccessMsg('')} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-t-lg transition-colors cursor-pointer shrink-0 border-b-2 ${
            activeTab === 'products'
              ? 'border-blue-500 text-blue-400 bg-slate-900/80'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products & Stock ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-t-lg transition-colors cursor-pointer shrink-0 border-b-2 ${
            activeTab === 'repairs'
              ? 'border-blue-500 text-blue-400 bg-slate-900/80'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Repair Enquiries ({repairRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-t-lg transition-colors cursor-pointer shrink-0 border-b-2 ${
            activeTab === 'orders'
              ? 'border-blue-500 text-blue-400 bg-slate-900/80'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Inquiries ({orderEnquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('store')}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-t-lg transition-colors cursor-pointer shrink-0 border-b-2 ${
            activeTab === 'store'
              ? 'border-blue-500 text-blue-400 bg-slate-900/80'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Store Hours & Location</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-t-lg transition-colors cursor-pointer shrink-0 border-b-2 ${
            activeTab === 'guide'
              ? 'border-blue-500 text-blue-400 bg-slate-900/80'
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Owner & Free Hosting Guide</span>
        </button>
      </div>

      {/* 3. TAB 1: PRODUCTS & INVENTORY MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Live Product Catalog</h2>
              <p className="text-xs text-slate-400">
                Update prices in Nigerian Naira (₦), mark available/out of stock, or add authentic photos.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={openNewProductModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
              <button
                onClick={handleResetCatalog}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Restore default product inventory"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Product Items Table / Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Item & Photo</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Condition</th>
                    <th className="py-3 px-4">Price (₦)</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {products.map((prod) => {
                    const formatted = new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                      maximumFractionDigits: 0
                    }).format(prod.price);

                    return (
                      <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                              <DeviceVisual
                                type={prod.visualType}
                                customImageUrl={prod.customImageUrl}
                                className="w-full h-full"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white line-clamp-1">{prod.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono truncate">{prod.brand} · ID: {prod.id}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 uppercase font-semibold text-[11px] text-slate-300">
                          {prod.category}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            prod.condition === 'Brand New'
                              ? 'bg-blue-950 text-blue-300 border-blue-800'
                              : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          }`}>
                            {prod.condition}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-white tabular-nums text-sm">
                          {formatted}
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleStock(prod.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
                              prod.inStock
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/80 hover:bg-emerald-900'
                                : 'bg-red-950/80 text-red-400 border-red-700/80 hover:bg-red-900'
                            }`}
                          >
                            {prod.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setIsAddProductOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Edit Details & Price"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: REPAIR ENQUIRIES REVIEW */}
      {activeTab === 'repairs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Submitted Repair Bookings</h2>
              <p className="text-xs text-slate-400">
                Customer repair requests submitted through the online booking form. Contact the customer directly to confirm inspection.
              </p>
            </div>
          </div>

          {repairRequests.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <Wrench className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">No repair bookings yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Customer submissions from the homepage or services "Book a Repair" form will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repairRequests.map((req) => (
                <div key={req.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-xs font-mono font-bold text-blue-400">{req.ticketId}</div>
                      <h3 className="text-sm font-bold text-white">{req.customerName}</h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{req.customerPhone}</span>
                      </div>
                    </div>

                    <select
                      value={req.status}
                      onChange={(e) => handleUpdateRepairStatus(req.id, e.target.value as any)}
                      className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Device:</span>
                      <span className="font-medium text-white">{req.brandModel} ({req.deviceType})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Preferred Visit Date:</span>
                      <span className="text-slate-200">{req.preferredDate || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Submitted On:</span>
                      <span className="text-slate-400">{req.createdAt}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-semibold mb-1">Reported Issue:</span>
                    <p className="text-slate-200 leading-relaxed">{req.problemDescription}</p>
                  </div>

                  {req.faultImageUrl && (
                    <div className="text-xs">
                      <span className="text-slate-400 block mb-1">Attached Fault Photo:</span>
                      <img
                        src={req.faultImageUrl}
                        alt="Faulty device"
                        className="w-full h-32 object-cover rounded-lg border border-slate-800"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <a
                      href={`https://wa.me/${req.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${req.customerName}, this is ICON TECH repair desk Opposite Adeyemi regarding your repair ticket ${req.ticketId} for ${req.brandModel}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] uppercase tracking-wider"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Customer</span>
                    </a>

                    <button
                      onClick={() => handleDeleteRepairRequest(req.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB 3: ORDER ENQUIRIES REVIEW */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <h2 className="text-base font-bold text-white">Customer Cart Enquiries</h2>
            <p className="text-xs text-slate-400">
              Orders generated by customers through the shopping cart. Follow up with customers via WhatsApp.
            </p>
          </div>

          {orderEnquiries.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">No order enquiries recorded yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When shoppers add electronics to their cart and click "Send Order via WhatsApp", an order record is logged here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orderEnquiries.map((order) => {
                const formattedTotal = new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                  maximumFractionDigits: 0
                }).format(order.totalAmount);

                return (
                  <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="font-mono font-bold text-blue-400 text-xs">{order.orderReference}</span>
                        <div className="text-xs text-slate-400 mt-0.5">Submitted: {order.createdAt}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-mono font-bold text-base">{formattedTotal}</span>
                        <button
                          onClick={() => handleDeleteOrderEnquiry(order.id)}
                          className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <span className="font-semibold text-slate-300">Ordered Items:</span>
                      <ul className="divide-y divide-slate-800/60 bg-slate-950 p-3 rounded-lg border border-slate-800">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="py-1.5 flex justify-between">
                            <span className="text-white font-medium">{item.productName} × {item.quantity}</span>
                            <span className="text-slate-300 font-mono">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. TAB 4: STORE HOURS & LOCATION CONFIGURATION */}
      {activeTab === 'store' && (
        <form onSubmit={handleSaveStoreConfig} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">Physical Store & Contact Information</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Editable business information displayed across the homepage, contact page, and footer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Business Name</label>
              <input
                type="text"
                value={storeConfig.name}
                onChange={(e) => setStoreConfigState({ ...storeConfig, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
              <input
                type="text"
                value={storeConfig.tagline}
                onChange={(e) => setStoreConfigState({ ...storeConfig, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Physical Address</label>
              <input
                type="text"
                value={storeConfig.fullAddress}
                onChange={(e) => setStoreConfigState({ ...storeConfig, fullAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Google Maps Directions Link</label>
              <input
                type="text"
                value={storeConfig.directionsUrl}
                onChange={(e) => setStoreConfigState({ ...storeConfig, directionsUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Phone Primary</label>
              <input
                type="text"
                value={storeConfig.phonePrimary}
                onChange={(e) => setStoreConfigState({ ...storeConfig, phonePrimary: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number (with country code, no +)</label>
              <input
                type="text"
                value={storeConfig.whatsappNumber}
                onChange={(e) => setStoreConfigState({ ...storeConfig, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Support Email</label>
              <input
                type="email"
                value={storeConfig.email}
                onChange={(e) => setStoreConfigState({ ...storeConfig, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Weekday Hours (Mon - Fri)</label>
              <input
                type="text"
                value={storeConfig.hours.weekdays}
                onChange={(e) =>
                  setStoreConfigState({
                    ...storeConfig,
                    hours: { ...storeConfig.hours, weekdays: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Saturday Hours</label>
              <input
                type="text"
                value={storeConfig.hours.saturdays}
                onChange={(e) =>
                  setStoreConfigState({
                    ...storeConfig,
                    hours: { ...storeConfig.hours, saturdays: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sunday Schedule</label>
              <input
                type="text"
                value={storeConfig.hours.sundays}
                onChange={(e) =>
                  setStoreConfigState({
                    ...storeConfig,
                    hours: { ...storeConfig.hours, sundays: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/30 cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Info</span>
            </button>
          </div>

          {/* Passcode Update Section */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-400" />
                <span>Change Admin Passcode</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update the secret passcode used to access this owner area.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md">
              <input
                type="password"
                placeholder="Enter new 6+ char passcode"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleUpdatePasscode}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Update Passcode
              </button>
            </div>

            {passcodeSuccess && (
              <span className="text-xs text-emerald-400 font-medium">✓ Passcode updated successfully!</span>
            )}
          </div>
        </form>
      )}

      {/* 7. TAB 5: STEP-BY-STEP OWNER & FREE HOSTING GUIDE */}
      {activeTab === 'guide' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-8 text-xs leading-relaxed">
          <div className="space-y-2 border-b border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 font-semibold text-[11px]">
              <BookOpen className="w-3.5 h-3.5" />
              Complete Operations & Free Publishing Manual
            </div>
            <h2 className="text-xl font-bold text-white">How to Run, Edit, and Host ICON TECH for Free</h2>
            <p className="text-slate-300">
              ICON TECH is engineered to run 100% free with zero monthly server fees, zero paid database requirements, and zero expensive payment gateway subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide Card 1 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">1</span>
                Free WhatsApp Commerce
              </div>
              <p className="text-slate-300">
                Instead of paying transaction fees to payment providers or banks, customers select electronics, add them to their cart, and tap <strong>Send Order via WhatsApp</strong>.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>Direct communication with genuine buyers in Ondo State.</li>
                <li>Customer sends exact model, price, and reference ticket.</li>
                <li>Confirm device pickup or walk-in inspection Opposite Adeyemi before accepting funds.</li>
              </ul>
            </div>

            {/* Guide Card 2 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">2</span>
                Free Hosting Options
              </div>
              <p className="text-slate-300">
                You can host this entire site for <strong>₦0 / month</strong> forever on reputable free platforms:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li><strong>Vercel / Netlify</strong>: Connect your GitHub repository for instant automated free SSL and global CDN.</li>
                <li><strong>GitHub Pages</strong>: Run <code className="text-blue-300">npm run build</code> and host directly on GitHub.</li>
                <li>Connect a custom domain (e.g. <code className="text-blue-300">icontech.ng</code>) whenever ready without paying host fees.</li>
              </ul>
            </div>

            {/* Guide Card 3 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">3</span>
                Managing Inventory & Prices
              </div>
              <p className="text-slate-300">
                Use the <strong>Products & Stock</strong> tab in this Admin Dashboard anytime to:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>Change prices in ₦ to match current foreign exchange / wholesale rates.</li>
                <li>Toggle items to "Out of Stock" immediately when sold in the shop.</li>
                <li>Snap a real photo with your phone and upload it directly.</li>
              </ul>
            </div>

            {/* Guide Card 4 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">4</span>
                Progressive Web App (PWA)
              </div>
              <p className="text-slate-300">
                Customers can install ICON TECH right onto their Android or iPhone home screens like a native mobile app.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>Provides fast offline browsing even with bad mobile signal.</li>
                <li>Shows an in-app "Install App" button automatically on Android/desktop.</li>
                <li>Provides step-by-step guidance for iPhone Safari users.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: ADD / EDIT PRODUCT */}
      {isAddProductOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h2 className="text-base font-bold text-white">
                {products.some((p) => p.id === editingProduct.id) ? 'Edit Product Details' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setIsAddProductOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="e.g. Samsung Galaxy S24 Ultra 256GB"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    placeholder="e.g. Samsung, Apple, HP, Oraimo"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="audio">Audio & Headsets</option>
                    <option value="chargers">Chargers & Cables</option>
                    <option value="powerbanks">Power Banks</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Condition</label>
                  <select
                    value={editingProduct.condition}
                    onChange={(e) => setEditingProduct({ ...editingProduct, condition: e.target.value as ProductCondition })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Certified Refurbished">Certified Refurbished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price in Nigerian Naira (₦)</label>
                  <input
                    type="number"
                    required
                    min={500}
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Original / Slash Price (₦, optional)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: e.target.value ? Number(e.target.value) : undefined
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Warranty Term</label>
                  <input
                    type="text"
                    value={editingProduct.warranty}
                    onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                    placeholder="e.g. 6 Months Warranty"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Key Specs Summary</label>
                  <input
                    type="text"
                    value={editingProduct.keySpecsSummary}
                    onChange={(e) => setEditingProduct({ ...editingProduct, keySpecsSummary: e.target.value })}
                    placeholder="e.g. Snapdragon 8 Gen 3 · 256GB · 200MP · Titanium"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                {/* Photo Upload / URL */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <label className="block text-slate-200 font-semibold">Product Photograph</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                      <DeviceVisual
                        type={editingProduct.visualType}
                        customImageUrl={editingProduct.customImageUrl}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="text-[11px] text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                      />
                      <div className="text-[10px] text-slate-500">Or provide an authentic image web URL:</div>
                      <input
                        type="url"
                        placeholder="https://example.com/gadget-photo.jpg"
                        value={editingProduct.customImageUrl || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            customImageUrl: e.target.value,
                            visualType: 'custom-upload'
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[11px] text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="stockCheck"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <label htmlFor="stockCheck" className="text-slate-300 font-medium cursor-pointer">
                    Mark as Available in Stock (Opposite Adeyemi)
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold uppercase tracking-wider text-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
