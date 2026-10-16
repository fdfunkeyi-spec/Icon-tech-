import React, { useState } from 'react';
import { ESTIMATE_MATRIX } from '../data/services';
import { STORE_LOCATION } from '../data/inventory';
import { X, Wrench, Clock, ShieldCheck, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

interface RepairEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDevice?: string;
}

export const RepairEstimatorModal: React.FC<RepairEstimatorModalProps> = ({
  isOpen,
  onClose,
  preselectedDevice = 'smartphone'
}) => {
  const [deviceCategory, setDeviceCategory] = useState<string>(preselectedDevice);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [modelInput, setModelInput] = useState<string>('');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [bookingGenerated, setBookingGenerated] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategoryData = ESTIMATE_MATRIX[deviceCategory] || ESTIMATE_MATRIX.smartphone;
  const currentIssue = currentCategoryData.issues.find((i) => i.id === selectedIssueId);

  const handleCategoryChange = (cat: string) => {
    setDeviceCategory(cat);
    setSelectedBrand('');
    setSelectedIssueId('');
    setBookingGenerated(null);
  };

  const formattedMin = currentIssue
    ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(currentIssue.minPrice)
    : '';

  const formattedMax = currentIssue
    ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(currentIssue.maxPrice)
    : '';

  const getWhatsAppBookingUrl = () => {
    const brandText = selectedBrand || 'Device';
    const modelText = modelInput ? ` (${modelInput})` : '';
    const issueText = currentIssue ? currentIssue.label : 'General Diagnosis';
    const priceText = currentIssue ? `${formattedMin} – ${formattedMax}` : 'Pending Bench Diagnostic';

    const text = `Hello Icon Tech Repair Desk,
I would like to book a device repair:
• Category: ${currentCategoryData.name}
• Device: ${brandText}${modelText}
• Issue: ${issueText}
• Estimated Cost: ${priceText}
• Customer Name: ${customerName || 'Inquirer'}
• Phone: ${customerPhone || 'Not provided'}

I am planning to bring it to your workshop Opposite Adeyemi, Ondo State. Please confirm technician availability.`;

    return `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `ICT-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingGenerated(randomTicket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Instant Repair Cost Estimator</h2>
              <p className="text-xs text-slate-400">
                Transparent pricing backed by Icon Tech hardware engineers in Ondo State
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {bookingGenerated ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Repair Reservation Confirmed!</h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Reservation Ticket:</span>
                  <span className="font-mono font-bold text-blue-400 text-sm">{bookingGenerated}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Device:</span>
                  <span className="text-white font-medium">{selectedBrand} {modelInput}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Issue:</span>
                  <span className="text-slate-200">{currentIssue?.label}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Price Range:</span>
                  <span className="text-emerald-400 font-bold">{formattedMin} – {formattedMax}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white">Opposite Adeyemi, Ondo State</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Present this ticket ID upon arrival at our store for priority bench diagnostics.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Forward Ticket to WhatsApp
                </a>
                <button
                  onClick={() => setBookingGenerated(null)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Estimate Another Device
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Category Segmented Control */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  1. Select Device Category
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('smartphone')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      deviceCategory === 'smartphone'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Smartphones
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('laptop')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      deviceCategory === 'laptop'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Laptops & PCs
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('software')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      deviceCategory === 'software'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Software & Data
                  </button>
                </div>
              </div>

              {/* Brand and Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    2. Select Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">-- Choose Manufacturer --</option>
                    {currentCategoryData.brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Model Name / Series (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., iPhone 13 Pro, HP EliteBook 840 G6"
                    value={modelInput}
                    onChange={(e) => setModelInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Issue Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  3. Select Hardware / Software Symptom
                </label>
                <div className="space-y-2">
                  {currentCategoryData.issues.map((issue) => {
                    const isSelected = selectedIssueId === issue.id;
                    return (
                      <button
                        key={issue.id}
                        type="button"
                        onClick={() => setSelectedIssueId(issue.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/10 border-blue-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium">{issue.label}</span>
                          <span className="text-xs font-mono font-bold text-blue-400 tabular-nums shrink-0">
                            from ₦{issue.minPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{issue.notes}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimation Card Display */}
              {currentIssue && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-blue-950/40 border border-blue-900/60 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Estimated Cost Range:</span>
                      <div className="text-2xl font-bold text-white font-mono tabular-nums">
                        {formattedMin} – {formattedMax}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        {currentIssue.turnaround}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 justify-end mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        90-Day Warranty Included
                      </span>
                    </div>
                  </div>

                  {/* Customer Contact for Ticket */}
                  <form onSubmit={handleGenerateTicket} className="pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Tunde Adebayo"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Phone / WhatsApp Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="080... or +234..."
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Generate Repair Ticket
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={getWhatsAppBookingUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Book Directly on WhatsApp
                      </a>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
