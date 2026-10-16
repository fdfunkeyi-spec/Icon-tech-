import React from 'react';
import { STORE_LOCATION } from '../data/inventory';
import { PageTab } from '../types';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Wrench,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenEstimator: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEstimator }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO HEADER */}
      <section className="relative pt-10 sm:pt-14 pb-10 border-b border-slate-800 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              Engineering Excellence Since Inception
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Pioneering Hardware Engineering in Ondo State
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              ICON TECH was founded to bridge the gap between fragile modern consumer electronics and high-precision restoration. Located Opposite Adeyemi in Ondo City, we combine certified component-level diagnostics with transparent technology sales.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE PROFILE & FOUNDATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Our Technical Foundation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Moving Beyond Module Swapping to Component Restoration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In today's fast-moving electronics landscape, most repair shops merely swap out entire boards or declare devices unfixable when faced with power shorts or water corrosion. At Icon Tech, our laboratory is purpose-built for component-level troubleshooting.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our hardware engineers utilize stereo optical microscopes, regulated hot-air rework stations, digital oscilloscopes, and thermal infrared cameras. Whether resolving a microscopic capacitor short on an iPhone motherboard or performing a power management IC replacement on an HP EliteBook, we approach every repair with scientific precision.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white">ESD Anti-Static Lab</div>
                <p className="text-slate-400">
                  Every workbench is grounded to prevent electro-static discharge to sensitive micro-controllers.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white">Direct OEM Supply Lines</div>
                <p className="text-slate-400">
                  Reliable procurement of genuine screens, zero-cycle batteries, and genuine chips.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Highlights Box (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Our Strategic Ondo Hub</h3>
                <span className="text-xs text-slate-400">Opposite Adeyemi Federal University axis</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Serving the academic community of Adeyemi Federal University of Education (AFUED), local business owners, researchers, and tech enthusiasts throughout Ondo State. We understand that downtime means lost productivity, missed project deadlines, and stalled communication.
            </p>

            <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Physical Address:</span>
                <span className="text-white font-medium text-right">Opposite Adeyemi, Ondo City</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Direct Inquiries:</span>
                <span className="text-blue-400 font-mono font-medium">{STORE_LOCATION.phonePrimary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operational Standard:</span>
                <span className="text-emerald-400 font-medium">No-Fix, No-Fee Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL STANDARDS & TESTING PROTOCOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Rigorous Quality Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Operational Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every customer device and retail inventory unit passes through strict bench validation stages before release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Diagnostic Precision</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We never perform guesswork repairs. Before touching a screw, we measure DC power draw, scan board schematics, inspect for oxidation under magnification, and present the client with an honest upfront estimate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Micro-Soldering Integrity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using high-silver lead-free solder alloys and thermal flux, we guarantee microscopic SMD solder joints that withstand daily mechanical flex, thermal heating, and vibration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Transparent Turnaround</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We provide explicit turnaround projections. Simple screen and battery jobs are returned within 45 to 90 minutes; complex logic board recovery timelines are communicated transparently with live tracking.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Experience the Icon Tech Standard
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Visit our workshop Opposite Adeyemi in Ondo State or get an instant estimation for your damaged device right now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenEstimator}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              Request Repair Estimate
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
