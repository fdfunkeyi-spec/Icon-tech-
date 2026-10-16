import React, { useState } from 'react';
import { STORE_LOCATION } from '../data/inventory';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    contactNumber: '',
    deviceModel: '',
    serviceCategory: 'Mobile Phone Repair',
    problemDescription: '',
    deliveryMethod: 'Walk-in Drop-off at Ondo Store'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getWhatsAppSubmissionUrl = () => {
    const text = `Hello Icon Tech Team,
New Service Inquiry from Website:
• Client: ${formData.clientName}
• Contact: ${formData.contactNumber}
• Device: ${formData.deviceModel}
• Category: ${formData.serviceCategory}
• Service Type: ${formData.deliveryMethod}
• Description: ${formData.problemDescription}

Location: Visiting Opposite Adeyemi, Ondo State.`;

    return `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HEADER */}
      <section className="relative pt-10 sm:pt-14 pb-8 border-b border-slate-800 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              Storefront & Service Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Contact & Store Location
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We are located Opposite Adeyemi in Ondo City, Ondo State, Nigeria. Visit our workshop for hands-on diagnostics or reach out via our direct communication channels below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DIRECT CHANNELS & STRUCTURED LOCATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Channels & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Channel Cards */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs">
                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Telephone Hotlines:</span>
                    <a href={`tel:${STORE_LOCATION.phonePrimary.replace(/\s+/g, '')}`} className="text-white hover:text-blue-400 font-mono font-semibold block mt-0.5">
                      {STORE_LOCATION.phonePrimary}
                    </a>
                    <a href={`tel:${STORE_LOCATION.phoneSecondary.replace(/\s+/g, '')}`} className="text-slate-400 hover:text-blue-400 font-mono block mt-0.5">
                      {STORE_LOCATION.phoneSecondary} (Secondary)
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Direct WhatsApp Line:</span>
                    <a
                      href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                        'Hello Icon Tech, I am contacting you regarding sales and device repairs.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-mono font-semibold block mt-0.5"
                    >
                      {STORE_LOCATION.phonePrimary} (Instant Chat)
                    </a>
                    <span className="text-[11px] text-slate-500 block">Average response time: &lt; 5 minutes</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-600/20 text-sky-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Support & Corporate Email:</span>
                    <a href={`mailto:${STORE_LOCATION.email}`} className="text-white hover:text-blue-400 block mt-0.5">
                      {STORE_LOCATION.email}
                    </a>
                    <a href={`mailto:${STORE_LOCATION.salesEmail}`} className="text-slate-400 hover:text-blue-400 block mt-0.5">
                      {STORE_LOCATION.salesEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Schedule */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Operational Hours</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Monday — Friday:</span>
                  <span className="text-white font-mono">8:00 AM – 6:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Saturday:</span>
                  <span className="text-white font-mono">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Sunday:</span>
                  <span className="text-emerald-400">Emergency WhatsApp Desk</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                Express diagnostic check-ins accepted until 5:30 PM on weekdays.
              </div>
            </div>
          </div>

          {/* Interactive Structured Locator & Map Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">Physical Store Locator</h3>
                </div>
                <div className="font-mono text-xs text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded border border-blue-800/60">
                  {STORE_LOCATION.coordinates.lat}, {STORE_LOCATION.coordinates.lng}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">{STORE_LOCATION.landmark}</strong>, Ondo-Ore Expressway, Ondo City, Ondo State, Nigeria.
              </p>
            </div>

            {/* Visual Schematic Map Representation */}
            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-6 overflow-hidden min-h-[240px] flex flex-col justify-between">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-radial from-blue-600/10 via-transparent to-transparent pointer-events-none" />
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                {/* Ondo-Ore Main Road */}
                <path d="M -20 120 L 620 120" stroke="#475569" strokeWidth="12" />
                <path d="M -20 120 L 620 120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 6" />
                {/* Adeyemi Campus Access Road */}
                <path d="M 280 120 L 280 20" stroke="#334155" strokeWidth="8" />
              </svg>

              {/* Top landmark: Adeyemi Federal University */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 shadow-md">
                  <div className="font-bold text-white text-[11px]">ADEYEMI COLLEGE / UNIVERSITY GATE</div>
                  <div className="text-[10px] text-slate-400">Main Campus Axis (North)</div>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded">
                  <Compass className="w-3 h-3 text-blue-400" />
                  <span>Toward Ondo Central Roundabout</span>
                </div>
              </div>

              {/* Road Indicator */}
              <div className="relative z-10 text-center py-2">
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 bg-slate-900/90 px-3 py-1 rounded-full border border-amber-500/30">
                  ONDO — ORE EXPRESSWAY
                </span>
              </div>

              {/* Bottom landmark: ICON TECH STORE */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-600/40 border border-blue-400 flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider">ICON TECH STORE & WORKSHOP</div>
                    <div className="text-[10px] text-blue-100">Directly Opposite Adeyemi Gate Axis</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 hidden sm:block bg-slate-900/90 px-2.5 py-1 rounded">
                  <span>Toward Ore / Benin Expressway</span>
                </div>
              </div>
            </div>

            {/* Landmark Driving Directions */}
            <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
              <h4 className="font-bold text-slate-200">How to Find Us:</h4>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">·</span>
                  <span><strong>From Adeyemi Campus:</strong> Walk or drive across the expressway right facing the front gate area. Our prominent blue and white signage is directly visible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">·</span>
                  <span><strong>From Ondo Central / Ife Road:</strong> Head south along the Ondo-Ore highway toward Adeyemi College. We are located just before the flyover pedestrian crossing.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INQUIRY & SERVICE BOOKING FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white">Send a Direct Service Inquiry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Describe your device issue or gadget requirements. Our hardware engineering desk will review and provide a preliminary diagnosis.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.clientName}. An assigned technician has been notified regarding your {formData.deviceModel}.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={getWhatsAppSubmissionUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Instant Copy on WhatsApp
                </a>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oluwaseun Adeleke"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="080... or +234..."
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Device Make/Model */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Device Make & Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 13 Pro, HP EliteBook 840 G6, Tecno Spark"
                    value={formData.deviceModel}
                    onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                  />
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Service Category *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Mobile Phone Repair">Mobile Phone Repair (Screen, Battery, Port)</option>
                    <option value="Laptop & PC Repair">Laptop & PC Repair (Display, Thermal, Hinge)</option>
                    <option value="Motherboard Micro-Soldering">Motherboard Micro-Soldering (No Power, IC)</option>
                    <option value="Software & Data Recovery">Software Deployment & Data Recovery</option>
                    <option value="Purchasing a Device / Gadget">Purchasing a Device / Gadget In-Store</option>
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Problem Description / Inquiry Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the issue (e.g. dropped in water, screen flickering, battery swelling, wants to upgrade to 512GB SSD)..."
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600 leading-relaxed"
                />
              </div>

              {/* Delivery / Dropoff preference */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Preferred Fulfillment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="Walk-in Drop-off at Ondo Store"
                      checked={formData.deliveryMethod === 'Walk-in Drop-off at Ondo Store'}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="text-blue-600"
                    />
                    <span>Walk-in Drop-off at Ondo Store (Opposite Adeyemi)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="Campus / Ondo City Pickup Dispatch"
                      checked={formData.deliveryMethod === 'Campus / Ondo City Pickup Dispatch'}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="text-blue-600"
                    />
                    <span>Campus / Ondo Dispatch Courier Pickup</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Service Request
                </button>

                <a
                  href={getWhatsAppSubmissionUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Directly on WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
