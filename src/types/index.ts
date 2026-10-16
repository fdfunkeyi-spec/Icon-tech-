export type PageTab = 'home' | 'services' | 'shop' | 'about' | 'contact' | 'admin';

export type ProductCategory =
  | 'all'
  | 'smartphones'
  | 'laptops'
  | 'audio'
  | 'chargers'
  | 'powerbanks'
  | 'accessories'
  | 'phones'; // for backward-compatibility

export type ProductCondition = 'Brand New' | 'Certified Refurbished';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'chargers' | 'powerbanks' | 'accessories' | 'phones';
  condition: ProductCondition;
  price: number; // in NGN
  originalPrice?: number;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    battery?: string;
    camera?: string;
    features?: string[];
  };
  keySpecsSummary: string;
  description: string;
  inStock: boolean;
  warranty: string;
  badge?: string;
  customImageUrl?: string;
  visualType: string;
}

export interface RepairService {
  id: string;
  category: 'mobile' | 'laptop' | 'software';
  title: string;
  shortDesc: string;
  turnaround: string;
  warranty: string;
  startingPrice: number; // in NGN
  bulletPoints: string[];
  iconName: string;
}

export interface RepairEstimateOption {
  deviceType: 'smartphone' | 'laptop' | 'tablet' | 'desktop';
  brands: string[];
  commonIssues: {
    id: string;
    label: string;
    minPrice: number;
    maxPrice: number;
    turnaround: string;
    description: string;
  }[];
}

export interface RepairTicket {
  ticketId: string;
  customerName: string;
  customerPhone: string;
  deviceModel: string;
  serviceType: string;
  status: 'Received' | 'Diagnostics' | 'Micro-Soldering' | 'Quality Testing' | 'Ready for Pickup';
  dateReceived: string;
  estimatedCompletion: string;
  cost: number;
  notes: string;
}

export interface RepairBookingRequest {
  id: string;
  ticketId: string;
  customerName: string;
  customerPhone: string;
  deviceType: string;
  brandModel: string;
  problemDescription: string;
  preferredDate: string;
  faultImageUrl?: string;
  status: 'Pending Review' | 'Accepted' | 'In Progress' | 'Completed' | 'Declined';
  createdAt: string;
  estimatedCost?: string;
}

export interface OrderEnquiry {
  id: string;
  orderReference: string;
  customerName?: string;
  customerPhone?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  createdAt: string;
  status: 'Submitted via WhatsApp' | 'Contacted' | 'Fulfilled';
}

export interface StoreConfig {
  name: string;
  tagline: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
  directionsUrl: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  email: string;
  salesEmail: string;
  hours: {
    weekdays: string;
    saturdays: string;
    sundays: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
