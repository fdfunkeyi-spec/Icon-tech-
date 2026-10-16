import React, { useState } from 'react';
import { DEMO_TICKETS } from '../data/services';
import { RepairTicket } from '../types';
import { STORE_LOCATION } from '../data/inventory';
import { X, Search, CheckCircle, Clock, Cpu, MessageSquare } from 'lucide-react';

interface RepairTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RepairTrackerModal: React.FC<RepairTrackerModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedTicket, setSearchedTicket] = useState<RepairTicket | null>(DEMO_TICKETS[0]);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchedTicket(DEMO_TICKETS[0]);
      return;
    }
    const found = DEMO_TICKETS.find(
      (t) =>
        t.ticketId.toLowerCase().includes(query) ||
        t.customerPhone.toLowerCase().includes(query) ||
        t.customerName.toLowerCase().includes(query)
    );
    setSearchedTicket(found || null);
  };

  const steps = [
    'Received',
    'Diagnostics',
    'Micro-Soldering',
    'Quality Testing',
    'Ready for Pickup'
  ];

  const getStepIndex = (status: string) => {
    return steps.indexOf(status);
  };

  const currentStepIdx = searchedTicket ? getStepIndex(searchedTicket.status) : -1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Live Repair Status Tracker</h2>
              <p className="text-xs text-slate-400">
                Track your device bench diagnostics & workbench milestones
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. ICT-7842) or Phone Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Track Device
            </button>
          </form>

          {/* Quick Demo Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1">
            <span className="shrink-0 text-[11px] font-medium text-slate-500">Sample Tickets:</span>
            {DEMO_TICKETS.map((t) => (
              <button
                key={t.ticketId}
                type="button"
                onClick={() => {
                  setSearchedTicket(t);
                  setSearchQuery(t.ticketId);
                }}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors shrink-0 cursor-pointer ${
                  searchedTicket?.ticketId === t.ticketId
                    ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.ticketId} ({t.status})
              </button>
            ))}
          </div>

          {/* Result Card */}
          {searchedTicket ? (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-blue-400 text-sm">
                      {searchedTicket.ticketId}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 font-medium">{searchedTicket.customerName}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {searchedTicket.deviceModel}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{searchedTicket.serviceType}</p>
                </div>

                <div className="sm:text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    {searchedTicket.status}
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-300 tabular-nums mt-1.5">
                    Repair Cost: ₦{searchedTicket.cost.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Workbench Progress
                </h4>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-800 -z-0 hidden sm:block" />
                  <div
                    className="absolute top-4 left-4 h-0.5 bg-blue-500 -z-0 hidden sm:block transition-all duration-500"
                    style={{
                      width: `${(Math.max(0, currentStepIdx) / (steps.length - 1)) * 90}%`
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                    {steps.map((st, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;
                      return (
                        <div key={st} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                              isComplete
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'bg-slate-900 border border-slate-700 text-slate-500'
                            }`}
                          >
                            {isComplete ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                          </div>
                          <div>
                            <div
                              className={`text-xs font-medium ${
                                isCurrent
                                  ? 'text-blue-400 font-semibold'
                                  : isComplete
                                  ? 'text-white'
                                  : 'text-slate-500'
                              }`}
                            >
                              {st}
                            </div>
                            {isCurrent && (
                              <div className="text-[10px] text-blue-400 hidden sm:block">
                                Current Stage
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Technician Notes */}
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lead Technician Bench Notes:</span>
                </div>
                <p className="text-slate-300 leading-relaxed pl-5">
                  "{searchedTicket.notes}"
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pl-5 pt-1">
                  <span>Logged: {searchedTicket.dateReceived}</span>
                  <span>·</span>
                  <span>Target: {searchedTicket.estimatedCompletion}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Icon Tech, I am inquiring about my active repair ticket ${searchedTicket.ticketId} (${searchedTicket.deviceModel}). Please provide an update.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message Assigned Technician
                </a>
                <div className="text-center sm:text-right text-xs text-slate-400 py-2 sm:py-0 flex items-center justify-center sm:justify-end gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Collection Location: Opposite Adeyemi, Ondo</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <p className="text-sm">No ticket found matching "{searchQuery}".</p>
              <p className="text-xs text-slate-500">
                Please double check your 7-character ticket ID printed on your physical claim slip or sent via SMS/WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
