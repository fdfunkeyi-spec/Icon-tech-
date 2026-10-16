import React, { useState } from 'react';

interface DeviceVisualProps {
  type: string;
  customImageUrl?: string;
  className?: string;
  accent?: string;
}

// Commercial-grade studio & lifestyle photography registry (Jumia & Pinterest quality)
export const GADGET_PHOTOGRAPHY_REGISTRY: Record<
  string,
  {
    url: string;
    alt: string;
    categoryTag: string;
    fitMode: 'cover' | 'contain';
  }
> = {
  // LAPTOPS & NOTEBOOKS
  'laptop-mac': {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    alt: 'Apple MacBook Pro Retina Display Laptop',
    categoryTag: 'Apple MacBook',
    fitMode: 'cover'
  },
  'laptop-mac-hand': {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    alt: 'Apple MacBook Air M2 Space Gray Aluminum Body',
    categoryTag: 'Apple MacBook Air',
    fitMode: 'cover'
  },
  'laptop-hp': {
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    alt: 'HP EliteBook Business Workstation Laptop',
    categoryTag: 'HP EliteBook',
    fitMode: 'cover'
  },
  'laptop-dell': {
    url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    alt: 'Dell Latitude Precision Aluminum Notebook',
    categoryTag: 'Dell Latitude',
    fitMode: 'cover'
  },
  'laptop-lenovo': {
    url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80',
    alt: 'Lenovo ThinkPad Business Workstation',
    categoryTag: 'Lenovo ThinkPad',
    fitMode: 'cover'
  },
  'laptop-asus': {
    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    alt: 'Asus ZenBook Ultra-Slim Laptop',
    categoryTag: 'Asus ZenBook',
    fitMode: 'cover'
  },
  'laptop-gaming': {
    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    alt: 'High Performance Gaming Laptop with RGB Display',
    categoryTag: 'Gaming Workstation',
    fitMode: 'cover'
  },

  // SMARTPHONES & TABLETS
  'phone-iphone15': {
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    alt: 'Apple iPhone 15 Pro Titanium Studio Shot',
    categoryTag: 'iPhone 15 Pro',
    fitMode: 'cover'
  },
  'phone-iphone-mirror': {
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    alt: 'Apple iPhone 15 Pro Max with Mirror Frame',
    categoryTag: 'iPhone 15 Pro Max',
    fitMode: 'cover'
  },
  'phone-iphone13': {
    url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
    alt: 'Apple iPhone Midnight OLED Display',
    categoryTag: 'iPhone 13 Series',
    fitMode: 'cover'
  },
  'phone-samsung-ultra': {
    url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    alt: 'Samsung Galaxy S24 Ultra Titanium Flagship Phone',
    categoryTag: 'Galaxy S24 Ultra',
    fitMode: 'cover'
  },
  'phone-samsung-a': {
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
    alt: 'Samsung Galaxy Smartphone on Stand',
    categoryTag: 'Galaxy Series',
    fitMode: 'cover'
  },
  'phone-redmi-5g': {
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    alt: 'Xiaomi Redmi Note 5G Peacock Blue Gradient',
    categoryTag: 'Xiaomi Redmi 5G',
    fitMode: 'cover'
  },
  'phone-tecno': {
    url: 'https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=800&auto=format&fit=crop&q=80',
    alt: 'Tecno Spark / Camon AI Camera Smartphone',
    categoryTag: 'Tecno Series',
    fitMode: 'cover'
  },
  'phone-tecno-gold': {
    url: 'https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=800&auto=format&fit=crop&q=80',
    alt: 'Tecno Spark Gold Edition Smartphone',
    categoryTag: 'Tecno Mobile',
    fitMode: 'cover'
  },
  'phone-infinix': {
    url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    alt: 'Infinix Hot / Note High-Refresh Display',
    categoryTag: 'Infinix Series',
    fitMode: 'cover'
  },
  'tab-android-hd': {
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    alt: '10.1-inch Android 4G HD Smart Tablet',
    categoryTag: 'Android HD Tablet',
    fitMode: 'cover'
  },

  // WEARABLES & GADGETS
  'watch-5g-sim': {
    url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
    alt: 'Ultra 5G Smart Watch with Orange Ocean Band',
    categoryTag: 'Ultra 5G Watch',
    fitMode: 'cover'
  },

  // POWER & ACCESSORIES
  'acc-poweradd-65w': {
    url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    alt: 'POWERADD PRO 50,000mAh 65W High-Capacity Power Station',
    categoryTag: 'Power Station 65W',
    fitMode: 'cover'
  },
  'acc-powerbank': {
    url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    alt: 'High-Capacity Fast-Charge Power Bank',
    categoryTag: 'Power Bank',
    fitMode: 'cover'
  },
  'acc-powerbank-mirror': {
    url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    alt: '20,000mAh Mirror LED Power Bank with Lanyard',
    categoryTag: 'Mirror Power Bank',
    fitMode: 'cover'
  },
  'acc-oraimo-powerbank': {
    url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    alt: 'Oraimo PowerPro 30,000mAh High-Density Battery Bank',
    categoryTag: 'Oraimo Battery',
    fitMode: 'cover'
  },
  'acc-charger': {
    url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80',
    alt: 'Fast USB-C Wall Charger with Braided Cord',
    categoryTag: 'Fast Charger',
    fitMode: 'cover'
  },
  'acc-dual-chargers': {
    url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80',
    alt: 'Dual Port 35W USB-C Fast Charger',
    categoryTag: 'Dual Charger',
    fitMode: 'cover'
  },
  'acc-cable': {
    url: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80',
    alt: 'Braided Fast Charging Cable',
    categoryTag: 'Charging Cable',
    fitMode: 'cover'
  },
  'acc-oraimo-boxed': {
    url: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80',
    alt: 'Genuine Oraimo PlusLine 3A Fast Charging Type-C Boxed Cables',
    categoryTag: 'Oraimo Official Pack',
    fitMode: 'cover'
  },
  'acc-airpods': {
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    alt: 'TWS True Wireless Stereo Bluetooth Earbuds',
    categoryTag: 'Wireless Earbuds',
    fitMode: 'cover'
  },
  'acc-tws-battery-led': {
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    alt: 'TWS Bluetooth Earbuds with Digital Battery LED Case',
    categoryTag: 'TWS Earbuds',
    fitMode: 'cover'
  },
  'acc-headphones': {
    url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    alt: 'Wireless Noise-Cancelling Over-Ear Studio Headphones',
    categoryTag: 'Studio Audio',
    fitMode: 'cover'
  },
  'acc-tg-speakers': {
    url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    alt: 'TG Portable Waterproof Wireless Bass Speaker',
    categoryTag: 'Bluetooth Speaker',
    fitMode: 'cover'
  },
  'acc-orico-hub': {
    url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80',
    alt: 'ORICO Aluminum Multi-Port USB-C Hub & Docking Station',
    categoryTag: 'USB-C Dock Hub',
    fitMode: 'cover'
  },
  'acc-ssd': {
    url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80',
    alt: 'High Speed NVMe Solid State Drive',
    categoryTag: 'NVMe SSD Storage',
    fitMode: 'cover'
  },
  'acc-mouse': {
    url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    alt: 'Ergonomic Precision Wireless Bluetooth Mouse',
    categoryTag: 'Wireless Mouse',
    fitMode: 'cover'
  },

  'acc-flashdrive': {
    url: 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&auto=format&fit=crop&q=80',
    alt: 'High Speed Metal USB 3.0 Flash Drive',
    categoryTag: 'USB Flash Drive',
    fitMode: 'cover'
  },
  'acc-case': {
    url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=80',
    alt: 'Shockproof Silicone Phone Armor Case and Tempered Glass',
    categoryTag: 'Cases & Protection',
    fitMode: 'cover'
  },
  'hero-gadgets': {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80',
    alt: 'Smartphones, laptops, and electronic gadgets display',
    categoryTag: 'ICON TECH Gadgets',
    fitMode: 'cover'
  },
  'cat-smartphones': {
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    alt: 'Smartphones Category',
    categoryTag: 'Smartphones',
    fitMode: 'cover'
  },
  'cat-laptops': {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    alt: 'Laptops Category',
    categoryTag: 'Laptops',
    fitMode: 'cover'
  },
  'cat-audio': {
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    alt: 'Audio & Headsets Category',
    categoryTag: 'Audio & Headsets',
    fitMode: 'cover'
  },
  'cat-chargers': {
    url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80',
    alt: 'Chargers & Cables Category',
    categoryTag: 'Chargers & Cables',
    fitMode: 'cover'
  },
  'cat-powerbanks': {
    url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&auto=format&fit=crop&q=80',
    alt: 'Power Banks Category',
    categoryTag: 'Power Banks',
    fitMode: 'cover'
  },
  'cat-accessories': {
    url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80',
    alt: 'Accessories Category',
    categoryTag: 'Accessories',
    fitMode: 'cover'
  },

  // HERO & WORKSHOP BENCH PHOTOS
  'hero-lab': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    alt: 'Icon Tech Hardware Laboratory and Workbench Station',
    categoryTag: 'Hardware Laboratory',
    fitMode: 'cover'
  },
  'repair-screen': {
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80',
    alt: 'Certified Technician Precision Smartphone Screen Replacement',
    categoryTag: 'Screen Restoration',
    fitMode: 'cover'
  },
  'repair-board': {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    alt: 'Component Level Logic Board Micro-Soldering',
    categoryTag: 'Micro-Soldering Lab',
    fitMode: 'cover'
  }
};

// Fallback photograph if key is not found
const DEFAULT_PHOTO = {
  url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
  alt: 'Icon Tech Premium Hardware Device',
  categoryTag: 'Genuine Tech',
  fitMode: 'cover' as const
};

export const DeviceVisual: React.FC<DeviceVisualProps> = ({
  type,
  customImageUrl,
  className = 'w-full h-48'
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If user uploaded a custom real photo, prioritize it
  if (customImageUrl && !imgError) {
    return (
      <div className={`relative flex items-center justify-center bg-slate-950 overflow-hidden ${className}`}>
        <img
          src={customImageUrl}
          alt="Custom Uploaded Device Photography"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          }`}
        />
        <div className="absolute top-2.5 right-2.5 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow backdrop-blur-xs">
          Real Uploaded Photo
        </div>
      </div>
    );
  }

  const item = GADGET_PHOTOGRAPHY_REGISTRY[type] || DEFAULT_PHOTO;

  return (
    <div className={`relative flex items-center justify-center bg-slate-950 overflow-hidden ${className}`}>
      {/* High-Resolution Commercial Photography Image */}
      <img
        src={item.url}
        alt={item.alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-40 blur-xs bg-slate-900'
        }`}
      />

      {/* Subtle bottom gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

      {/* Subtle Jumia-style brand tag */}
      <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
        <span className="text-[10px] font-medium text-slate-300 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800/80 backdrop-blur-xs tracking-wide">
          {item.categoryTag}
        </span>
      </div>
    </div>
  );
};
