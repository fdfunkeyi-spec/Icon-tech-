import React, { useState, useRef } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';
import { STORE_LOCATION } from '../data/inventory';
import { DeviceVisual } from './DeviceVisual';
import {
  X,
  Upload,
  Image as ImageIcon,
  Camera,
  CheckCircle2,
  MessageSquare,
  Plus,
  Sparkles,
  Info,
  Laptop,
  Smartphone,
  BatteryCharging,
  ShieldCheck,
  Eye,
  ArrowRight,
  Check,
  HelpCircle
} from 'lucide-react';

interface UploadProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

// Recommended image types and photography standards for Icon Tech
export interface ImageTypeGuideline {
  id: string;
  category: 'phone' | 'laptop' | 'accessory' | 'repair' | 'packaging';
  title: string;
  subtitle: string;
  description: string;
  keyRequirements: string[];
  recommendedAngle: string;
  lightingTip: string;
  exampleVisualType: Product['visualType'];
  sampleProductName: string;
  sampleBrand: string;
  samplePrice: number;
  sampleSpecs: string;
}

export const RECOMMENDED_IMAGE_TYPES: ImageTypeGuideline[] = [
  {
    id: 'guide-phone-dual',
    category: 'phone',
    title: 'Dual-Angle Flagship & Budget Phone',
    subtitle: 'Front Screen + Back Camera View',
    description:
      'Photograph the back panel showing color gradient/texture and camera lens housing, side-by-side with the front display turned on to prove zero cracks or dead pixels.',
    keyRequirements: [
      'Screen powered on displaying crisp wallpaper',
      'Rear camera module clean and free of fingerprints',
      'Color accuracy under neutral lighting (e.g. Peacock Blue, Titanium, Gold)',
      'Both front display glass and rear curvature visible'
    ],
    recommendedAngle: 'Slight 15° angled perspective on neutral dark or white backdrop',
    lightingTip: 'Soft diffused natural light or twin 45° desk lamps with no harsh glare on glass.',
    exampleVisualType: 'phone-redmi-5g',
    sampleProductName: 'Xiaomi Redmi Note 5G (Peacock Blue Edition)',
    sampleBrand: 'Xiaomi',
    samplePrice: 245000,
    sampleSpecs: 'Dimensity 700 5G · 128GB Storage · 48MP Triple AI Camera · 90Hz DotDisplay'
  },
  {
    id: 'guide-laptop-45',
    category: 'laptop',
    title: '45° Open Clamshell Laptop Deck',
    subtitle: 'Display Screen + Keyboard & Palmrest',
    description:
      'Open the laptop to approximately 110 degrees and photograph from a 45-degree angle to showcase the keyboard keycaps, trackpad condition, screen bezels, and slim unibody edges.',
    keyRequirements: [
      'Keyboard keys clearly visible showing clean lettering',
      'Display turned on to demonstrate backlight uniformity',
      'Hinges and edge chassis seams inspected and flush',
      'Trackpad and palmrest clean with no hand oils'
    ],
    recommendedAngle: '45-degree diagonal perspective from keyboard level looking toward display',
    lightingTip: 'Elevate laptop slightly on an anti-static stand to capture thin aluminum side profile.',
    exampleVisualType: 'laptop-mac-hand',
    sampleProductName: 'Apple MacBook Air M2 Space Gray (Pristine Grade A)',
    sampleBrand: 'Apple',
    samplePrice: 1150000,
    sampleSpecs: 'Apple M2 8-Core · 8GB Unified · 256GB SSD · Liquid Retina · Space Gray'
  },
  {
    id: 'guide-power-display',
    category: 'accessory',
    title: 'Power Station & Heavy Duty Battery',
    subtitle: 'Active Digital Readout & Port Layout',
    description:
      'Capture heavy-duty power banks and power stations with the digital LED percentage screen illuminated (e.g. 100%), highlighting the carry handle, USB-C PD wattage, and emergency flashlight.',
    keyRequirements: [
      'Digital LED display turned on showing battery level',
      'Fast charge USB-C PD and USB-A ports clearly in focus',
      'Integrated handles or lanyard cables displayed in use',
      'Wattage rating printed label (e.g. 65W / 22.5W) visible'
    ],
    recommendedAngle: 'Front-three-quarter isometric angle showing top ports and front display',
    lightingTip: 'Avoid direct flash onto the glossy LED mirror readout to prevent reflection wash out.',
    exampleVisualType: 'acc-poweradd-65w',
    sampleProductName: 'POWERADD PRO 50000mAh 65W High-Capacity Power Station',
    sampleBrand: 'POWERADD',
    samplePrice: 58000,
    sampleSpecs: '50,000mAh (185Wh) · 65W USB-C PD · Handle · Camping LED Light'
  },
  {
    id: 'guide-watch-sim',
    category: 'accessory',
    title: 'Cellular Smartwatch & Micro Hardware',
    subtitle: 'SIM Tray, Dial Crown & Textured Strap',
    description:
      'Close-up macro photography displaying the independent nano-SIM card slot tray, ribbed ocean/sport loop strap, and vibrant AMOLED watchface.',
    keyRequirements: [
      'Micro SIM card slot tray clearly highlighted',
      'Ribbed ocean strap texture and metal buckle in focus',
      'Active watch dial interface showing time or battery',
      'Side speaker grilles and rotating digital crown visible'
    ],
    recommendedAngle: 'Top-down 30-degree incline focused on watch case and side tray',
    lightingTip: 'Use a macro phone lens or 2x optical zoom from 30cm away to avoid lens distortion.',
    exampleVisualType: 'watch-5g-sim',
    sampleProductName: 'Ultra 5G Smart Watch with Cellular Nano-SIM Tray',
    sampleBrand: 'Icon Tech Special',
    samplePrice: 42000,
    sampleSpecs: 'Cellular Nano-SIM Slot · Orange Ocean Band · WhatsApp / Play Store · 4G/5G Calling'
  },
  {
    id: 'guide-retail-box',
    category: 'packaging',
    title: 'Authentic Retail Box & Packaging',
    subtitle: 'Original Box, Seal & Included Accessories',
    description:
      'Photograph brand-new accessories inside or alongside their authentic green/black manufacturer packaging (e.g. Oraimo PlusLine cables, Samsung boxes) proving genuine factory origin.',
    keyRequirements: [
      'Official brand logo, holographic anti-counterfeit sticker visible',
      'Specification badges (e.g. 3A Ultra Fast Charging, 1.5M)',
      'Clean box corners with no crushing or moisture tears',
      'Included cables or adapters neatly coiled'
    ],
    recommendedAngle: 'Front flat lay or 45-degree angle with cable emerging from box',
    lightingTip: 'Ensure barcodes and serial numbers are legible for instant customer verification.',
    exampleVisualType: 'acc-oraimo-boxed',
    sampleProductName: 'Genuine Oraimo PlusLine 3A Ultra Fast Type-C Cables',
    sampleBrand: 'Oraimo',
    samplePrice: 6500,
    sampleSpecs: '3A Ultra Fast Charging · 1.5 Metre Type-C to Type-C · In Official Green Box'
  },
  {
    id: 'guide-repair-bench',
    category: 'repair',
    title: 'Hardware Repair Intake & Bench Test',
    subtitle: 'Before Defect vs After Restoration',
    description:
      'Bench photograph of customer hardware upon intake opposite Adeyemi (shattered OLED, green corroded USB port, shorted power rail) alongside the restored component-level fix.',
    keyRequirements: [
      'Sharp macro focus on damaged component (crack or corrosion)',
      'Anti-static blue workbench mat background',
      'After photo showing TrueTone/Display working and stable amperage draw',
      'Laboratory timestamp or repair ticket tag included in frame'
    ],
    recommendedAngle: 'Direct overhead flat lay under laboratory inspection lamp',
    lightingTip: 'Use high-CRI workstation lamp without yellow tint to accurately display PCB copper traces.',
    exampleVisualType: 'custom-upload',
    sampleProductName: 'Samsung Galaxy S22 Ultra (Corroded USB-C Replaced)',
    sampleBrand: 'Samsung Repair',
    samplePrice: 18500,
    sampleSpecs: 'Sub-board micro-soldering · 45W Fast Charging Restored · Zero Moisture Errors'
  }
];

export const UploadProductModal: React.FC<UploadProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'guide' | 'presets'>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const [selectedVisualType, setSelectedVisualType] = useState<Product['visualType']>('custom-upload');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<'laptops' | 'phones' | 'accessories'>('phones');
  const [condition, setCondition] = useState<ProductCondition>('Brand New');
  const [price, setPrice] = useState('');
  const [specs, setSpecs] = useState('');
  const [description, setDescription] = useState('');
  const [warranty, setWarranty] = useState('1 Year Official Warranty');
  const [successNotice, setSuccessNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedVisualType('custom-upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedVisualType('custom-upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPresetGuideline = (guide: ImageTypeGuideline) => {
    setName(guide.sampleProductName);
    setBrand(guide.sampleBrand);
    setCategory(
      guide.category === 'phone'
        ? 'phones'
        : guide.category === 'laptop'
        ? 'laptops'
        : 'accessories'
    );
    setPrice(guide.samplePrice.toString());
    setSpecs(guide.sampleSpecs);
    setDescription(guide.description);
    setSelectedVisualType(guide.exampleVisualType);
    setImagePreview(null);
    setImageName(`Standard: ${guide.title}`);
    setActiveTab('upload');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numericPrice = parseFloat(price.replace(/[^0-9]/g, '')) || 0;

    const newProduct: Product = {
      id: `stock-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim() || 'Icon Tech Verified',
      category,
      condition,
      price: numericPrice,
      keySpecsSummary: specs.trim() || 'Verified genuine hardware stock',
      specs: {
        processor: specs.trim(),
        features: [specs.trim(), 'Inspected at Icon Tech Opposite Adeyemi, Ondo State']
      },
      description:
        description.trim() ||
        `${name} in stock at Icon Tech Opposite Adeyemi, Ondo State. Real device inspected by certified hardware technicians.`,
      inStock: true,
      warranty: warranty.trim() || 'Store Warranty Included',
      badge: imagePreview ? 'Verified Photo' : 'Uploaded Stock',
      customImageUrl: imagePreview || undefined,
      visualType: selectedVisualType || 'custom-upload'
    };

    onAddProduct(newProduct);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      onClose();
    }, 1500);
  };

  const getWhatsAppBroadcastUrl = () => {
    const numericPrice = parseFloat(price.replace(/[^0-9]/g, '')) || 0;
    const text = `Hello Icon Tech Customers,
New Stock Arrival at our store Opposite Adeyemi, Ondo State!
• Device: ${name}
• Brand: ${brand}
• Category: ${category}
• Condition: ${condition}
• Price: ₦${numericPrice.toLocaleString()}
• Key Specs: ${specs}
• Warranty: ${warranty}

Come inspect and test before purchase at our shop Opposite Adeyemi!`;
    return `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Stock Photography & Image Upload Portal
                </h2>
                <span className="hidden sm:inline text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60">
                  Icon Tech Standards
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload real photos of devices you sell or inspect recommended photography standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close upload modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs: Upload vs Image Types Guide vs Presets */}
        <div className="flex items-center gap-2 px-5 sm:px-6 pt-3 pb-2 border-b border-slate-800 bg-slate-950/40 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Device Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Image Types Guide (6 Standards)</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'presets'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Device Presets</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {successNotice ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Product Successfully Added!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                "{name}" has been published to your store catalog with your photo. It is now searchable across the inventory.
              </p>
            </div>
          ) : activeTab === 'upload' ? (
            /* TAB 1: FORM & IMAGE UPLOADER */
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* IMAGE UPLOAD ZONE */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-400" />
                    <span>Product Photo (Drag & Drop or Take Photo) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('guide')}
                    className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>View image guidelines</span>
                  </button>
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition-all min-h-[170px] flex flex-col items-center justify-center ${
                    imagePreview
                      ? 'border-blue-500/80 bg-blue-950/20'
                      : 'border-slate-700 bg-slate-950 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={cameraInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="space-y-3 w-full">
                      <div className="relative max-w-xs mx-auto">
                        <img
                          src={imagePreview}
                          alt="Uploaded Device Preview"
                          className="max-h-48 mx-auto rounded-xl object-contain shadow-2xl border border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePreview(null);
                            setImageName('');
                          }}
                          className="absolute -top-2 -right-2 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-500 shadow cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-blue-300 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-[11px] truncate max-w-xs">
                          {imageName || 'Device photo loaded'}
                        </span>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-slate-400 hover:text-white underline cursor-pointer ml-1"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mx-auto">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-200 font-medium">
                          Upload high-resolution photo of the phone, laptop, or gadget
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Supports phone camera snapshots (JPG, PNG, WEBP)
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Browse Files</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-700"
                        >
                          <Camera className="w-3.5 h-3.5 text-blue-400" />
                          <span>Use Camera</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Photography Standards checklist */}
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded border border-slate-800">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Clean neutral backdrop</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded border border-slate-800">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Front & back visible</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded border border-slate-800">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>LED screen illuminated</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded border border-slate-800">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>No harsh glare / blur</span>
                  </div>
                </div>
              </div>

              {/* PRODUCT DETAILS FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Product / Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Xiaomi Redmi Note 11 5G, Apple MacBook Air M2..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apple, Samsung, Xiaomi, HP, Dell, Oraimo, POWERADD..."
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="phones">Smartphones & Tablets</option>
                    <option value="laptops">Laptops & Notebooks</option>
                    <option value="accessories">Accessories & Audio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Condition *</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Certified Refurbished">Certified Refurbished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₦ Naira) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 245000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Technical Specifications *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 128GB Storage · 6GB RAM · 48MP AI Camera · 5000mAh Battery"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Warranty & Store Guarantee
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 Year Official Warranty / 6 Months Store Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish to Store Catalog</span>
                </button>

                {name && price && (
                  <a
                    href={getWhatsAppBroadcastUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center shadow-lg shadow-emerald-950/40"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Broadcast on WhatsApp</span>
                  </a>
                )}
              </div>
            </form>
          ) : activeTab === 'guide' ? (
            /* TAB 2: DETAILED IMAGE TYPES GUIDE */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60 space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>The 6 Professional Image Types Required for Icon Tech</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To ensure high customer conversion, zero return disputes, and maximum trust at our store Opposite Adeyemi, every device uploaded must conform to one of these 6 recognized hardware photography standards:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECOMMENDED_IMAGE_TYPES.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-blue-400 uppercase tracking-wide">
                          {guide.subtitle}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                          {guide.category}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{guide.title}</h4>

                      {/* Mini visual preview */}
                      <div className="h-32 rounded-lg bg-slate-900 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                        <DeviceVisual
                          type={guide.exampleVisualType}
                          className="w-full h-full"
                        />
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{guide.description}</p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                        <div className="font-semibold text-slate-400">Must Include:</div>
                        <ul className="space-y-1 text-slate-300">
                          {guide.keyRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 italic max-w-[180px] truncate">
                        {guide.lightingTip}
                      </span>
                      <button
                        type="button"
                        onClick={() => applyPresetGuideline(guide)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/40 text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Use This Preset</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* TAB 3: QUICK PRESETS CATALOG */
            <div className="space-y-4">
              <div className="text-xs text-slate-300">
                Click any device preset below to pre-populate the upload form with authentic specifications, pricing in Naira (₦), and verified hardware visual models:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RECOMMENDED_IMAGE_TYPES.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => applyPresetGuideline(preset)}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer flex items-center gap-3.5 group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-slate-900 border border-slate-800 shrink-0 overflow-hidden flex items-center justify-center">
                      <DeviceVisual
                        type={preset.exampleVisualType}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {preset.sampleProductName}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {preset.sampleSpecs}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="font-mono text-emerald-400 font-bold">
                          ₦{preset.samplePrice.toLocaleString()}
                        </span>
                        <span className="text-blue-400 font-semibold text-[10px] uppercase group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Load <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Store Location: Opposite Adeyemi, Ondo State · WhatsApp: {STORE_LOCATION.phonePrimary}</span>
          </div>
          <div className="text-slate-500">
            Real device photography builds buyer confidence
          </div>
        </div>
      </div>
    </div>
  );
};
