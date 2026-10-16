import React, { useState } from 'react';
import { REPAIR_SERVICES } from '../data/services';
import { STORE_LOCATION } from '../data/inventory';
import { BeforeAfterGallery } from '../components/BeforeAfterGallery';
import {
  Smartphone,
  Laptop,
  Terminal,
  Cpu,
  ShieldCheck,
  Clock,
  Wrench,
  CheckCircle2,
  MessageSquare,
  Search,
  ArrowRight,
  Sparkles,
  Zap,
  Sliders
} from 'lucide-react';

interface ServicesPageProps {
  onOpenEstimator: () => void;
  onOpenTracker: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenEstimator,
  onOpenTracker
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mobile' | 'laptop' | 'software'>('all');

  const filteredServices =
    activeFilter === 'all'
      ? REPAIR_SERVICES
      : REPAIR_SERVICES.filter((s) => s.category === activeFilter);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'mobile':
        return 'Mobile Phone Repairs';
      case 'laptop':
        return 'Laptop & Notebook Repairs';
      case 'software':
        return 'Software & Data Recovery';
      default:
        return 'Hardware Restoration';
    }
  };

  const getServiceWhatsAppUrl = (title: string, startingPrice: number) => {
    const text = `Hello Icon Tech Repair Team,
I am interested in booking: "${title}" (Starting from ₦${startingPrice.toLocaleString()}).
I am visiting your service center Opposite Adeyemi, Ondo State. Please let me know what time I can bring my device in.`;
    return `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const scrollToGallery = () => {
    const el = document.getElementById('before-after-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. PAGE HEADER */}
      <section className="relative pt-10 sm:pt-14 pb-10 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              Certified Hardware Laboratory · Opposite Adeyemi, Ondo State
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Diagnostic & Hardware Restoration Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Component-level electronics engineering executed by certified hardware specialists. We resolve microscopic logic board shorts, replace OEM displays, restore overheated laptops, and salvage critical data right here Opposite Adeyemi, Ondo State.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-600/25 cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                Calculate Repair Cost
              </button>
              <button
                onClick={scrollToGallery}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-800/50 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-blue-400" />
                Before & After Repairs
              </button>
              <button
                onClick={onOpenTracker}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-colors border border-slate-700 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Track Repair Ticket
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER TABS & SERVICE LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Interactive Filter Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Services ({REPAIR_SERVICES.length})
            </button>
            <button
              onClick={() => setActiveFilter('mobile')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'mobile'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mobile Phones (4)
            </button>
            <button
              onClick={() => setActiveFilter('laptop')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'laptop'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Laptops & PCs (4)
            </button>
            <button
              onClick={() => setActiveFilter('software')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'software'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Software & Data (3)
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredServices.length}</strong> specialized restoration protocols
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            // Map service to real commercial photography
            const servicePhotos: Record<string, string> = {
              'mob-screen': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop&q=80',
              'mob-battery': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
              'mob-port': 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80',
              'mob-liquid': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
              'lap-screen': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
              'lap-thermal': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
              'lap-upgrade': 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=80',
              'lap-hinge': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
              'soft-os': 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80',
              'soft-malware': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
              'soft-data': 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80'
            };
            const photoUrl =
              servicePhotos[service.id] ||
              'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-950/40"
              >
                {/* Real Photographic Header Image */}
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
                  <img
                    src={photoUrl}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/85 text-blue-300 border border-slate-700 backdrop-blur-md">
                      {getCategoryTitle(service.category)}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-3">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-200 px-2 py-0.5 rounded bg-slate-950/85 border border-slate-800 backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {service.turnaround}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1">
                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">{service.shortDesc}</p>

                  {/* Bullet Points */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Protocol Highlights:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {service.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              {/* Card Footer: Starting Price & WhatsApp Booking */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Diagnostic & Labor from:</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">
                      ₦{service.startingPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {service.warranty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={getServiceWhatsAppUrl(service.title, service.startingPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book on WhatsApp</span>
                  </a>

                  <button
                    onClick={onOpenEstimator}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5 text-blue-400" />
                    <span>Get Estimate</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </section>

      {/* 3. BEFORE & AFTER REPAIR GALLERY (PROVING CUSTOMER TRUST) */}
      <section id="before-after-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <BeforeAfterGallery onOpenEstimator={onOpenEstimator} />
      </section>

      {/* 4. LABORATORY STANDARDS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Bench Testing Standard Operating Procedure
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 22-Point Icon Tech Diagnostic Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Before any serviced device leaves our workshop Opposite Adeyemi, it passes a multi-phase hardware validation checklist to ensure complete factory functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="font-semibold text-white">1. Power & Amperage Draw</div>
              <p className="text-slate-400 leading-relaxed">
                Measuring current draw with inline USB-C/Lightning multimeters to rule out Tristar/PMIC parasitic leaks.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="font-semibold text-white">2. Digitizer Touch Grid</div>
              <p className="text-slate-400 leading-relaxed">
                Rigorous testing of every square millimeter of the touch screen with 10-point multi-touch verification.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="font-semibold text-white">3. Thermal Stress Profiling</div>
              <p className="text-slate-400 leading-relaxed">
                Full-load CPU/GPU thermal dissipation tests using synthetic Cinebench and FurMark stress loops.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="font-semibold text-white">4. RF & Sensor Calibration</div>
              <p className="text-slate-400 leading-relaxed">
                Verification of cellular 4G/5G signal, Wi-Fi 6, Bluetooth audio sync, proximity sensors, and TrueTone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
