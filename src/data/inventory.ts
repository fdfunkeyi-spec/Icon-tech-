import { Product, StoreConfig, RepairBookingRequest, OrderEnquiry } from '../types';

export const INITIAL_STORE_LOCATION: StoreConfig = {
  name: 'ICON TECH',
  tagline: 'Your Trusted Hub for Electronics Sales & Repairs',
  landmark: 'Opposite Adeyemi (Adeyemi Federal University of Education / ACE Main Gate)',
  city: 'Ondo City',
  state: 'Ondo State',
  country: 'Nigeria',
  fullAddress: 'Opposite Adeyemi, Ondo-Ore Expressway, Ondo City, Ondo State, Nigeria',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Adeyemi+Federal+University+of+Education+Ondo+Nigeria',
  phonePrimary: '+234 814 590 3821',
  phoneSecondary: '+234 803 492 1109',
  whatsappNumber: '2348145903821',
  email: 'support@icontech.ng',
  salesEmail: 'sales@icontech.ng',
  hours: {
    weekdays: '8:00 AM – 6:30 PM (Mon – Fri)',
    saturdays: '9:00 AM – 6:00 PM (Sat)',
    sundays: 'Emergency WhatsApp Inquiries Only'
  }
};

export const STORE_LOCATION = INITIAL_STORE_LOCATION;

export const INVENTORY_PRODUCTS: Product[] = [
  // 1. APPLE MACBOOK AIR M2
  {
    id: 'lap-mac-spacegray',
    name: 'Apple MacBook Air M2 Space Gray (Clean Pre-Owned)',
    brand: 'Apple',
    category: 'laptops',
    condition: 'Certified Refurbished',
    price: 1150000,
    originalPrice: 1250000,
    keySpecsSummary: 'Apple M2 8-Core · 8GB Unified · 256GB SSD · Liquid Retina · Space Gray',
    specs: {
      processor: 'Apple M2 chip with 8-core CPU and 8-core GPU',
      ram: '8GB Unified High-Bandwidth Memory',
      storage: '256GB Ultra-Fast Solid State Storage',
      screen: '13.6-inch Liquid Retina Display with True Tone (2560 x 1664)',
      battery: '100% Battery Cycle Health verified by Icon Tech diagnostics (up to 18 hrs)',
      features: [
        'Anodized Space Gray Aluminum Unibody Finish',
        'MagSafe 3 Charging + Dual Thunderbolt 4 / USB-C',
        'Magic Keyboard with Touch ID Sensor',
        'Ultra-slim 11.3mm featherweight profile'
      ]
    },
    description: 'Iconic Apple craftsmanship in pristine Space Gray. Thoroughly tested by Icon Tech certified technicians opposite Adeyemi with 100% clean battery and flawless keyboard deck.',
    inStock: true,
    warranty: '6 Months Full Hardware Warranty',
    badge: 'Uploaded Stock',
    visualType: 'laptop-mac-hand'
  },

  // 2. SAMSUNG GALAXY S24 ULTRA 5G
  {
    id: 'ph-s24ultra',
    name: 'Samsung Galaxy S24 Ultra 5G 256GB with S-Pen',
    brand: 'Samsung',
    category: 'smartphones',
    condition: 'Brand New',
    price: 1580000,
    keySpecsSummary: 'Snapdragon 8 Gen 3 · Titanium Phantom Black · 200MP Quad Camera · Built-in S-Pen',
    specs: {
      processor: 'Snapdragon 8 Gen 3 for Galaxy (4nm, 3.39GHz)',
      ram: '12GB High-Speed LPDDR5X RAM',
      storage: '256GB UFS 4.0 Storage',
      screen: '6.8" Dynamic LTPO AMOLED 2X 120Hz QHD+ (2600 nits peak)',
      battery: '5000 mAh with 45W Wired Super Fast Charge',
      camera: '200MP Main + 50MP Periscope (5x) + 10MP (3x) + 12MP Ultra-Wide',
      features: [
        'Integrated Precision S-Pen Stylus for sketching & note-taking',
        'Corning Gorilla Armor Anti-Reflective Glass',
        'Galaxy AI Productivity & Live Translation Suite',
        'IP68 Dust/Water Resistant up to 1.5m'
      ]
    },
    description: 'The definitive Android flagship. Boxy titanium frame, flat anti-reflective display, unmatched 200MP zoom clarity, and integrated S-Pen stylus.',
    inStock: true,
    warranty: '1 Year Official Samsung Nigeria Warranty',
    badge: 'Flagship Deal',
    visualType: 'phone-samsung-ultra'
  },

  // 3. APPLE IPHONE 15 PRO MAX
  {
    id: 'ph-iphone15-mirror',
    name: 'Apple iPhone 15 Pro Max 256GB + Luxury Mirror Shield',
    brand: 'Apple',
    category: 'smartphones',
    condition: 'Brand New',
    price: 1720000,
    originalPrice: 1790000,
    keySpecsSummary: 'A17 Pro Bionic · Electroplated Mirror Black Case · 48MP Triple Lens · Dynamic Island',
    specs: {
      processor: 'Apple A17 Pro (3nm architecture with 6-core GPU)',
      ram: '8GB RAM',
      storage: '256GB NVMe Internal Storage',
      screen: '6.7" Super Retina XDR OLED ProMotion 120Hz (2000 nits peak)',
      battery: '4422 mAh with USB-C Fast Charging & MagSafe 15W',
      camera: '48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto Optical Zoom',
      features: [
        'Comes fitted with Luxury Electroplated Mirror Magnetic Case',
        'Action Button customizable shortcut',
        'USB-C 3.0 with 10Gbps transfer speed',
        'Dynamic Island Interactive Notch',
        'Ceramic Shield Front Glass'
      ]
    },
    description: 'Breathtaking aerospace-grade performance paired with our signature electroplated mirror case. Unmatched videography and battery longevity.',
    inStock: true,
    warranty: '1 Year Apple International Warranty',
    badge: 'Popular Choice',
    visualType: 'phone-iphone-mirror'
  },

  // 4. XIAOMI REDMI 5G NOTE
  {
    id: 'ph-redmi-note5g',
    name: 'Xiaomi Redmi Note 5G (Peacock Blue / Teal)',
    brand: 'Xiaomi',
    category: 'smartphones',
    condition: 'Brand New',
    price: 245000,
    originalPrice: 270000,
    keySpecsSummary: 'Dimensity 700 5G · 128GB Storage · 48MP Triple AI Camera · 90Hz DotDisplay',
    specs: {
      processor: 'MediaTek Dimensity 700 5G Octa-Core (7nm)',
      ram: '6GB RAM (+ 4GB Virtual Memory Expansion)',
      storage: '128GB High-Speed Flash Storage (microSD expandable)',
      screen: '6.5" Full HD+ 90Hz AdaptiveSync DotDisplay (Corning Gorilla Glass)',
      battery: '5000 mAh High-Capacity Battery with 18W Fast Charging',
      camera: '48MP High-Resolution AI Main + 2MP Macro + 2MP Depth',
      features: [
        'Dual 5G Standby support (MTN, Airtel 5G tested in Ondo)',
        'Iridescent Peacock Blue/Teal gradient curved back',
        'Side-mounted fingerprint scanner + AI Face Unlock',
        'IR Blaster to control TV and Air Conditioners'
      ]
    },
    description: 'Fast 5G mobile connectivity with stunning peacock blue reflection, sharp 48MP photography, and huge 5000mAh battery that easily powers through university study days.',
    inStock: true,
    warranty: '1 Year Xiaomi Official Warranty',
    badge: 'Best Value 5G',
    visualType: 'phone-redmi-5g'
  },

  // 5. HP ELITEBOOK 840 G8 WORKSTATION
  {
    id: 'lap-hp-840g8',
    name: 'HP EliteBook 840 G8 Workstation',
    brand: 'HP',
    category: 'laptops',
    condition: 'Certified Refurbished',
    price: 485000,
    originalPrice: 540000,
    keySpecsSummary: 'Intel Core i7 11th Gen · 16GB RAM · 512GB NVMe SSD · 14" FHD IPS',
    specs: {
      processor: 'Intel Core i7-1165G7 (up to 4.7 GHz, 4 cores, 8 threads)',
      ram: '16GB DDR4-3200 MHz (Upgradable to 64GB)',
      storage: '512GB PCIe NVMe M.2 Solid State Drive',
      screen: '14.0" Full HD (1920 x 1080) Anti-glare, 400 nits IPS',
      battery: '3-Cell 53Wh Long Life Battery with Fast Charge (8+ hrs)',
      features: [
        'Backlit Spill-Resistant Keyboard',
        'Bang & Olufsen Dual Stereo Speakers',
        'Windows 11 Pro 64-bit Genuine',
        'Aluminum Unibody Chassis',
        'Fingerprint & IR Face Recognition'
      ]
    },
    description: 'Ultra-durable corporate-grade laptop engineered for intensive multitasking, coding, data analysis, and office workflows. Thoroughly bench-tested with 100% battery and hardware integrity.',
    inStock: true,
    warranty: '6 Months Full Hardware Warranty + Free 1-Year OS Support',
    badge: 'Engineer Pick',
    visualType: 'laptop-hp'
  },

  // 6. LENOVO THINKPAD T14 GEN 2
  {
    id: 'lap-lenovo-t14',
    name: 'Lenovo ThinkPad T14 Gen 2',
    brand: 'Lenovo',
    category: 'laptops',
    condition: 'Certified Refurbished',
    price: 420000,
    originalPrice: 460000,
    keySpecsSummary: 'AMD Ryzen 5 PRO 5650U · 16GB RAM · 512GB SSD · Legendary TrackPoint',
    specs: {
      processor: 'AMD Ryzen 5 PRO 5650U (6 Cores, 12 Threads, up to 4.2GHz)',
      ram: '16GB DDR4-3200MHz RAM',
      storage: '512GB PCIe M.2 NVMe SSD',
      screen: '14.0" FHD (1920 x 1080) IPS Anti-glare 300 nits',
      battery: '50Wh Battery with Rapid Charge technology',
      features: [
        'Legendary spill-resistant ThinkPad Ergonomic Keyboard',
        'Physical ThinkShutter Webcam Privacy Slider',
        'MIL-STD 810H Military Grade Tested Body',
        'Dual USB-C 3.2 Gen 2 + HDMI 2.0'
      ]
    },
    description: 'Renowned for industrial-grade durability and keyboard comfort. Built for developers, engineers, and heavy workloads.',
    inStock: true,
    warranty: '6 Months Shop Warranty',
    visualType: 'laptop-lenovo'
  },

  // 7. DELL LATITUDE 5420
  {
    id: 'lap-dell-5420',
    name: 'Dell Latitude 5420 Rugged Business Notebook',
    brand: 'Dell',
    category: 'laptops',
    condition: 'Certified Refurbished',
    price: 360000,
    originalPrice: 395000,
    keySpecsSummary: 'Intel Core i5 11th Gen · 16GB RAM · 256GB NVMe SSD · 14" Antiglare',
    specs: {
      processor: 'Intel Core i5-1145G7 vPro (up to 4.4 GHz)',
      ram: '16GB DDR4 High-Speed RAM',
      storage: '256GB NVMe Class 35 SSD',
      screen: '14.0" FHD (1920x1080) Non-Touch, Anti-Glare',
      battery: '4-Cell 63Wh ExpressCharge Capable Battery',
      features: [
        'Thunderbolt 4 with Power Delivery & DisplayPort',
        'Carbon-fiber reinforced polymer chassis',
        'ComfortView Plus Low Blue Light Display',
        'Precision Touchpad & Backlit Keyboard'
      ]
    },
    description: 'The workhorse of modern businesses. Dependable performance, superb keyboard ergonomics, and unmatched upgradeability.',
    inStock: true,
    warranty: '6 Months Shop Warranty',
    visualType: 'laptop-dell'
  },

  // 8. POWERADD PRO 50,000mAh 65W WITH CARRY HANDLE
  {
    id: 'acc-poweradd-65w',
    name: 'POWERADD PRO 50000mAh 65W High-Capacity Power Station',
    brand: 'POWERADD',
    category: 'powerbanks',
    condition: 'Brand New',
    price: 58000,
    originalPrice: 65000,
    keySpecsSummary: '50,000mAh (185Wh) Monster Battery · 65W USB-C PD · Handle · Camping LED Light',
    specs: {
      battery: '50,000mAh (185Wh) High-Density Lithium-Polymer Cells',
      features: [
        '65W Two-Way Fast USB-C PD (powers MacBook, HP, Dell laptops directly)',
        'Sturdy Folding Orange Carry Handle for easy portability',
        'Emergency White LED Light Bar with multiple brightness modes',
        'Digital Screen showing exact battery percentage and FAST charge indicator',
        'Charges average smartphone 12 to 14 times on single charge'
      ]
    },
    description: 'The ultimate power blackout companion for Ondo State students and professionals. Powers your laptop and multiple phones all week long.',
    inStock: true,
    warranty: '1 Year Full Replacement Warranty',
    badge: 'Campus Essential',
    visualType: 'acc-poweradd-65w'
  },

  // 9. 20,000mAh MIRROR DISPLAY POWER BANK
  {
    id: 'acc-powerbank-mirror20k',
    name: '20,000mAh Power Bank with Mirror LED & Built-in Lanyard Cable',
    brand: 'Icon Tech Series',
    category: 'powerbanks',
    condition: 'Brand New',
    price: 28000,
    originalPrice: 32000,
    keySpecsSummary: '20,000mAh · Glossy Mirror LED Display (100%) · Built-in Cable Strap · 22.5W',
    specs: {
      battery: '20,000mAh High-Density Polymer Cells',
      features: [
        'Integrated heavy-duty loop lanyard cable so you never forget your cord',
        'Top glossy mirror-finish LED digital readout showing exact 100% battery',
        'Dual Orange 22.5W Fast Charging USB-A ports + Type-C PD input/output',
        'Multi-protection against overcharging, voltage spikes, and heating',
        'Charges standard smartphone 4 to 5 times'
      ]
    },
    description: 'Pocket-friendly high-speed charging. The built-in lanyard cable doubles as a carrying strap so you are always powered on the move.',
    inStock: true,
    warranty: '1 Year Store Warranty',
    visualType: 'acc-powerbank-mirror'
  },

  // 10. GENUINE ORAIMO PLUSLINE & FASTLINE CHARGING CABLES
  {
    id: 'acc-oraimo-boxed-cables',
    name: 'Genuine Oraimo PlusLine 3A Ultra Fast Charging Type-C Cables',
    brand: 'Oraimo',
    category: 'chargers',
    condition: 'Brand New',
    price: 6500,
    originalPrice: 8000,
    keySpecsSummary: '3A Ultra Fast Charging · 1.5 Metre Type-C to Type-C · In Official Green Box',
    specs: {
      features: [
        'Original Oraimo PlusLine series in sealed official green packaging',
        '3A Ultra Fast Charging speed supports up to 60W USB-PD',
        'High-density braided nylon cord tested for 20,000+ bends',
        'Reinforced copper wiring for safe low-temperature charging',
        'Includes 180 Days Official Oraimo Warranty Card'
      ]
    },
    description: '100% verified genuine Oraimo accessories in official retail packaging. Protects your device battery from dangerous power surges.',
    inStock: true,
    warranty: '180 Days Official Oraimo Warranty',
    visualType: 'acc-oraimo-boxed'
  },

  // 11. DUAL-PORT USB FAST WALL CHARGER BLOCKS
  {
    id: 'acc-dual-wall-chargers',
    name: 'Dual-Port USB Fast Wall Charger Blocks 3-Pack',
    brand: 'Icon Tech Series',
    category: 'chargers',
    condition: 'Brand New',
    price: 7500,
    originalPrice: 9000,
    keySpecsSummary: '2x USB-A 2.4A Smart IC · Compact White Cube · Surge Protection · Universal',
    specs: {
      features: [
        'Charges two devices simultaneously with intelligent load distribution',
        'Compact travel cube with side thumb grip recesses for easy pulling',
        'Built-in safety IC prevents over-voltage, overheating, and short-circuits',
        'Fire-retardant PC casing with high-durability internal capacitors'
      ]
    },
    description: 'Dependable fast wall adapters for charging your phones, power banks, and accessories safely from any socket.',
    inStock: true,
    warranty: '6 Months Replacement Warranty',
    visualType: 'acc-dual-chargers'
  },

  // 12. TWS PRO WIRELESS EARBUDS
  {
    id: 'acc-tws-battery-led',
    name: 'TWS Pro Wireless Bluetooth Earbuds with Dual LED Display',
    brand: 'Icon Tech Series',
    category: 'audio',
    condition: 'Brand New',
    price: 18500,
    originalPrice: 22000,
    keySpecsSummary: 'Dual LED Digital Battery Readout · Touch Controls · Deep Bass · Bluetooth 5.3',
    specs: {
      battery: '5 hours playback on earbuds; charging case provides 28 hours total',
      features: [
        'Glossy clamshell case with bright blue digital LED battery percentage',
        'Independent Left and Right multi-bar battery indicators',
        'Ergonomic stem design with sensitive touch playback controls',
        'ENC Environmental Noise Cancelling for crystal clear phone calls',
        'Automatic instant pairing when case lid is opened'
      ]
    },
    description: 'Stylish in-ear audio with rich bass and visual battery telemetry so you never get caught with depleted earbuds.',
    inStock: true,
    warranty: '6 Months Replacement Warranty',
    badge: 'Popular Audio',
    visualType: 'acc-tws-battery-led'
  },

  // 13. T&G PORTABLE BLUETOOTH BOOMBOX SPEAKER
  {
    id: 'acc-tg-boombox',
    name: 'T&G Portable Bluetooth Outdoor Bass Speaker',
    brand: 'T&G',
    category: 'audio',
    condition: 'Brand New',
    price: 26000,
    originalPrice: 30000,
    keySpecsSummary: 'Dual Passive Radiators · IPX5 Splashproof · FM Radio / Flash Drive · Rich Bass',
    specs: {
      battery: '1200mAh Li-ion battery providing 6–8 hours loud music playback',
      features: [
        'Available in Military Camouflage, Stealth Black, Royal Blue, and Crimson Red',
        'Dual 52mm full-range drivers with side passive bass radiators',
        'Supports Bluetooth 5.0, USB flash drives, TF memory cards, and AUX 3.5mm',
        'Built-in FM radio with auto-tuning antenna',
        'Tough splashproof fabric mesh cylinder with carrying lanyard'
      ]
    },
    description: 'Punchy room-filling audio for campus gatherings, hostels, room entertainment, and outdoor events.',
    inStock: true,
    warranty: '6 Months Warranty',
    visualType: 'acc-tg-speakers'
  },

  // 14. OVER-EAR WIRELESS STUDIO HEADPHONES
  {
    id: 'acc-studio-headphones',
    name: 'Icon Pro ANC Wireless Over-Ear Studio Headset',
    brand: 'Icon Tech Pro',
    category: 'audio',
    condition: 'Brand New',
    price: 34000,
    originalPrice: 39000,
    keySpecsSummary: 'Active Noise Cancelling · 40mm Neodymium Drivers · 40hr Battery · Hi-Res Audio',
    specs: {
      battery: '40 hours continuous playback with quick 10-minute USB-C boost',
      features: [
        'Active Noise Cancellation blocks ambient hostel, study hall, and street noise',
        'Plush memory foam protein leather earcups for all-day comfort',
        'Dual-mic beamforming for crystal clear remote study and Zoom meetings',
        'Includes 3.5mm backup cable and protective travel case'
      ]
    },
    description: 'Immersive sound isolating headphones for students studying, podcast creators, video editors, and music lovers.',
    inStock: true,
    warranty: '1 Year Warranty',
    visualType: 'acc-headphones'
  },

  // 15. ULTRA 5G SMARTWATCH WITH NANO-SIM SLOT
  {
    id: 'watch-ultra-5g-sim',
    name: 'Ultra 5G Smart Watch with Cellular Nano-SIM Tray',
    brand: 'Icon Tech Special',
    category: 'accessories',
    condition: 'Brand New',
    price: 42000,
    originalPrice: 48000,
    keySpecsSummary: 'Cellular Nano-SIM Slot · Orange Ocean Band · WhatsApp / Play Store · 4G/5G Calling',
    specs: {
      battery: '850mAh Long-Stamina Battery with Magnetic Wireless Charging',
      features: [
        'Independent Cellular Nano-SIM slot — make calls without a phone',
        'High-grade Orange Ribbed Ocean Loop Band with titanium buckle',
        'Runs standalone Android apps: WhatsApp, Facebook, TikTok, Google Maps',
        'HD Camera for video calls and quick snapshots',
        'Heart rate, blood pressure, and sports tracking'
      ]
    },
    description: 'A complete smartphone on your wrist. Insert your Nigerian SIM card directly into the side tray to make calls, browse WhatsApp, and download apps.',
    inStock: true,
    warranty: '6 Months Store Warranty',
    visualType: 'watch-5g-sim'
  },

  // 16. ORICO 7-PORT USB 3.0 POWERED HUB
  {
    id: 'acc-orico-7port-hub',
    name: 'ORICO 7-Port High-Speed USB 3.0 Extension Splitter Hub',
    brand: 'ORICO',
    category: 'accessories',
    condition: 'Brand New',
    price: 22000,
    originalPrice: 26000,
    keySpecsSummary: '7x USB 3.0 5Gbps Ports · Blue LED Indicator · Textured Finish · 1M Cable',
    specs: {
      features: [
        'Expands a single laptop USB port into 7 independent high-speed USB 3.0 ports',
        '5Gbps data transfer rate — transfers full HD movie in seconds',
        'Individual port power management chip protects connected flash drives',
        'Blue LED power status indicator and carbon-fiber textured faceplate',
        'Driver-free plug-and-play for Windows, macOS, and Linux'
      ]
    },
    description: 'Must-have peripheral for computer users, audio producers, and project students connecting multiple flash drives, mice, and printers.',
    inStock: true,
    warranty: '1 Year Warranty',
    visualType: 'acc-orico-hub'
  },

  // 17. SANDISK 128GB DUAL DRIVE METAL FLASH DRIVE
  {
    id: 'acc-sandisk-flashdrive-128',
    name: 'SanDisk Ultra Dual Drive Luxe 128GB USB 3.1 & Type-C Metal Flash Drive',
    brand: 'SanDisk',
    category: 'accessories',
    condition: 'Brand New',
    price: 15500,
    originalPrice: 18000,
    keySpecsSummary: '128GB High Speed · Dual USB-C & USB-A Swivel · Full All-Metal Housing · 150MB/s',
    specs: {
      storage: '128GB High-Speed Flash Memory',
      features: [
        '2-in-1 all-metal flash drive with reversible USB Type-C and traditional Type-A connectors',
        'Seamlessly move content between USB Type-C smartphone, tablets, and Macs or PCs',
        'High-performance USB 3.1 Gen 1 drive with 150MB/s read speeds',
        'Stylish swivel design with keyring hole to prevent loss'
      ]
    },
    description: 'Essential for students moving assignments between phone and cyber café or campus laptop without internet connectivity.',
    inStock: true,
    warranty: '5 Years Manufacturer Warranty',
    visualType: 'acc-flashdrive'
  },

  // 18. SHOCKPROOF ARMOR PHONE CASE & 9H TEMPERED GLASS
  {
    id: 'acc-armor-case-glass',
    name: 'Heavy-Duty Shockproof Armor Case + 9H Tempered Glass Protector Combo',
    brand: 'Icon Tech Shield',
    category: 'accessories',
    condition: 'Brand New',
    price: 6000,
    originalPrice: 8500,
    keySpecsSummary: 'Dual-Layer Drop Protection · Raised Camera Lips · Anti-Scratch 9H Oleophobic Glass',
    specs: {
      features: [
        'Available tailored for iPhone 11-15, Samsung Galaxy A/S Series, and Redmi models',
        'Reinforced air-cushioned corners absorb high drops on concrete floors',
        'Includes complimentary laser-cut 9H tempered glass screen guard with installation wipes',
        'Non-slip textured tactile side grips'
      ]
    },
    description: 'Protect your valuable phone investment against accidental drops on campus or pavement.',
    inStock: true,
    warranty: 'Store Quality Guarantee',
    visualType: 'acc-case'
  },

  // 19. 10.1" ANDROID 4G HD SMART TABLET
  {
    id: 'tab-android-10hd',
    name: '10.1" Android 4G HD Smart Tablet (Dual SIM / WiFi)',
    brand: 'Icon Tech Series',
    category: 'smartphones',
    condition: 'Brand New',
    price: 165000,
    originalPrice: 185000,
    keySpecsSummary: '10.1" IPS HD Screen · 128GB Storage · 4G LTE Dual SIM · Slate Blue Metal Body',
    specs: {
      processor: 'Octa-Core High-Speed Processor with 4G Modem',
      ram: '6GB RAM (+ 4GB Virtual Memory Expansion)',
      storage: '128GB Internal Storage (expandable up to 512GB)',
      screen: '10.1-inch IPS Full HD Eye-Care Display (1920 x 1200)',
      battery: '7000 mAh All-Day Battery with USB-C Charging',
      camera: '13MP Rear Camera + 8MP Front Selfie for Zoom & Google Meet',
      features: [
        'Quad-speaker stereo audio system for crystal clear sound',
        'Dual SIM 4G LTE support for reliable internet anywhere',
        'Pre-loaded with Google Play Store, Zoom, MS Office, and PDF reader',
        'Midnight Slate Blue brushed aluminum back panel'
      ]
    },
    description: 'Ideal tablet for online lectures, reading textbooks, school projects, watching movies, and video conferencing at Adeyemi University.',
    inStock: true,
    warranty: '1 Year Warranty',
    visualType: 'tab-android-hd'
  },

  // 20. TECNO CLASSIC KEYPAD FEATURE PHONE
  {
    id: 'ph-tecno-gold-keypad',
    name: 'Tecno Classic Champagne Gold Keypad Phone',
    brand: 'Tecno',
    category: 'smartphones',
    condition: 'Brand New',
    price: 24500,
    keySpecsSummary: 'Champagne Gold · T9 Keypad · FM Radio Without Earphones · Monster Battery Life',
    specs: {
      battery: '1500 mAh battery providing up to 30 days standby and 20 hours talk time',
      features: [
        'Dual SIM Dual Standby support',
        'Wireless FM Radio that plays loud through rear big speaker without earphones',
        'Bright built-in LED flashlight torchlight for nighttime in Ondo',
        'Rear camera with digital zoom and Bluetooth connectivity',
        'MicroSD card slot for playing MP3 music tracks'
      ]
    },
    description: 'The legendary durable battery king in luxurious champagne gold. Ideal as a reliable backup phone that never dies when you need calls most.',
    inStock: true,
    warranty: '1 Year Official Carlcare Warranty',
    visualType: 'phone-tecno-gold'
  }
];

// Helper functions for Local Storage persistence (Admin Management)
const STORAGE_KEYS = {
  PRODUCTS: 'icon_tech_catalog_products',
  STORE_CONFIG: 'icon_tech_store_config',
  REPAIR_REQUESTS: 'icon_tech_repair_requests',
  ORDER_ENQUIRIES: 'icon_tech_order_enquiries',
};

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return INVENTORY_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Could not read stored products', err);
  }
  return INVENTORY_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage', err);
  }
}

export function getStoreConfig(): StoreConfig {
  if (typeof window === 'undefined') return INITIAL_STORE_LOCATION;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORE_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_STORE_LOCATION, ...parsed };
    }
  } catch (err) {
    console.warn('Could not read stored config', err);
  }
  return INITIAL_STORE_LOCATION;
}

export function saveStoreConfig(config: StoreConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.STORE_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save store config', err);
  }
}

export function getStoredRepairRequests(): RepairBookingRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPAIR_REQUESTS);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read repair requests', err);
  }
  return [];
}

export function saveStoredRepairRequests(requests: RepairBookingRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.REPAIR_REQUESTS, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed to save repair requests', err);
  }
}

export function getStoredOrderEnquiries(): OrderEnquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDER_ENQUIRIES);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read order enquiries', err);
  }
  return [];
}

export function saveStoredOrderEnquiries(enquiries: OrderEnquiry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ORDER_ENQUIRIES, JSON.stringify(enquiries));
  } catch (err) {
    console.error('Failed to save order enquiries', err);
  }
}
