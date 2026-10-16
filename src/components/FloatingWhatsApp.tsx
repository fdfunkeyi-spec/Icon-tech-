import React, { useState } from 'react';
import { STORE_LOCATION } from '../data/inventory';
import { MessageSquare, X, Wrench, ShoppingBag, ShieldCheck } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getUrl = (text: string) => {
    return `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">Icon Tech Direct Desk</h4>
                <p className="text-[10px] text-emerald-100">Opposite Adeyemi, Ondo State</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="p-3 space-y-2 bg-slate-950">
            <a
              href={getUrl(
                'Hello Icon Tech, I want to book a repair for my device. Please let me know what time I can bring it in.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-xs group"
            >
              <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold block">Book a Device Repair</span>
                <span className="text-[10px] text-slate-400">Phone & laptop troubleshooting</span>
              </div>
            </a>

            <a
              href={getUrl(
                'Hello Icon Tech, I am looking to buy a new/certified phone or laptop. What is currently in stock?'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-xs group"
            >
              <div className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold block">Inquire About Gadgets</span>
                <span className="text-[10px] text-slate-400">New phones, laptops & accessories</span>
              </div>
            </a>

            <div className="pt-1 text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Typical response: Under 5 minutes</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Icon Tech on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 transition-all active:scale-95 group cursor-pointer"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
          Chat with Icon Tech
        </span>
      </button>
    </div>
  );
};
