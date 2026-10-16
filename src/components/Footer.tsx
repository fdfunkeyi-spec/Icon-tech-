import React from 'react';
import { PageTab } from '../types';
import { STORE_LOCATION } from '../data/inventory';
import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldCheck, Cpu } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenEstimator: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEstimator, onOpenTracker }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Genuine OEM Parts & 90-Day Warranty</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every screen, battery, and motherboard component undergoes bench testing with comprehensive coverage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Physical Store in Ondo City</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Conveniently situated Opposite Adeyemi (ACE Gate axis), serving students, businesses, and residents.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Fast Turnaround Protocol</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Screen and battery replacements completed in 45–90 minutes with express same-day return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">ICON TECH</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier electronics sales hub and component-level device repair workshop in Ondo State. Precision diagnostics, certified hardware engineers, and genuine gadgets.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{STORE_LOCATION.landmark}, {STORE_LOCATION.city}, {STORE_LOCATION.state}, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{STORE_LOCATION.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{STORE_LOCATION.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Repair Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  iPhone & Samsung Screen Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  High-Capacity Battery Swaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Motherboard Micro-Soldering & IC Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Laptop Thermal Overhaul & Fan Repasting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Broken Hinge & Chassis Structural Epoxy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Logical Data Recovery & OS Optimization
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Direct Access
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Browse Laptops & Workstations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Flagship & Mid-Range Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Power Banks, Chargers & Audio Gear
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEstimator}
                  className="hover:text-blue-400 transition-colors text-left font-medium text-blue-400 cursor-pointer"
                >
                  Instant Repair Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-blue-400 transition-colors text-left font-medium text-sky-400 cursor-pointer"
                >
                  Live Repair Ticket Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  About Our Engineering Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Store Map & Opening Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hours & WhatsApp Sales */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Store Schedule & Support
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-slate-300 font-medium">Monday — Friday:</span>
                <span className="text-slate-400">8:00 AM – 6:30 PM</span>
              </div>
              <div>
                <span className="block text-slate-300 font-medium">Saturday:</span>
                <span className="text-slate-400">9:00 AM – 6:00 PM</span>
              </div>
              <div>
                <span className="block text-slate-300 font-medium">Sunday:</span>
                <span className="text-slate-400">Emergency WhatsApp Consultations</span>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Icon Tech, I am reaching out from your website for technical support/sales.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} ICON TECH. Opposite Adeyemi, Ondo State, Nigeria. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Hardware Diagnostics</span>
            <span>·</span>
            <span>OEM Replacements</span>
            <span>·</span>
            <span>Certified Gadgets</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
