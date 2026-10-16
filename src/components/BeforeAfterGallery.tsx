import React, { useState } from 'react';
import { STORE_LOCATION } from '../data/inventory';
import {
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Sliders,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Cpu
} from 'lucide-react';

export interface RepairCaseStudy {
  id: string;
  title: string;
  device: string;
  category: 'screen' | 'liquid' | 'hinge' | 'port' | 'thermal';
  categoryLabel: string;
  turnaround: string;
  warranty: string;
  customerProfile: string;
  beforeDescription: string;
  beforeSymptoms: string[];
  afterDescription: string;
  afterHighlights: string[];
  technicalOutcome: string;
  visualType: 'iphone-screen' | 'board-liquid' | 'laptop-hinge' | 'samsung-port' | 'macbook-thermal';
}

export const REPAIR_CASES: RepairCaseStudy[] = [
  {
    id: 'case-iphone13-screen',
    title: 'Shattered OLED & Bent Frame Restoration',
    device: 'Apple iPhone 13 (Midnight 128GB)',
    category: 'screen',
    categoryLabel: 'Screen & Touch',
    turnaround: '45 Minutes',
    warranty: '90-Day Warranty',
    customerProfile: 'Student at Adeyemi University, Ondo State',
    beforeDescription: 'Dropped on concrete road opposite Adeyemi campus. Heavy spider-web glass fracture, vertical pink lines across OLED display, and unresponsive bottom digitizer row.',
    beforeSymptoms: [
      'Spider-web shattered glass across front',
      'Vertical pink OLED bleeding lines',
      'Bottom touch row non-responsive',
      'Altered frame corner pressing into glass'
    ],
    afterDescription: 'Fitted OEM-grade Super Retina XDR OLED assembly, transferred TrueTone calibration ROM, straightened corner chassis with micro-clamp, and installed complimentary 9H tempered shield.',
    afterHighlights: [
      'Original color accuracy & TrueTone transfer',
      'All 22 touch grid zones 100% verified',
      'Zero display bleeding or chassis pressure points',
      'Free 9H Oleophobic tempered glass installed'
    ],
    technicalOutcome: 'Display returned to factory responsiveness with TrueTone active. Battery health preserved at 100%.',
    visualType: 'iphone-screen'
  },
  {
    id: 'case-hp-liquid-board',
    title: 'Liquid Spill & Power Rail Short-Circuit Recovery',
    device: 'HP EliteBook 840 G6 Business Laptop',
    category: 'liquid',
    categoryLabel: 'Liquid & Motherboard',
    turnaround: '24 Hours',
    warranty: '90-Day Logic Board Warranty',
    customerProfile: 'Corporate Accountant, Ondo City',
    beforeDescription: 'Water spill directly over keyboard while working. Laptop abruptly shut down and refused to power on (0.00A current draw, flashing orange charging LED, severe copper via oxidation).',
    beforeSymptoms: [
      'Complete power failure (0.00A current draw)',
      'Green oxidation across BQ24780S charging IC',
      'Blown high-side P-channel MOSFET',
      'Keyboard membrane shorted by dried minerals'
    ],
    afterDescription: 'Full motherboard ultrasonic bath in PCB chemical de-oxidizer. Microscope micro-soldering replacement of shorted charging IC and MOSFETs. Cleaned keyboard contact pads.',
    afterHighlights: [
      'Ultrasonic chemical wash eliminated all corrosion',
      'Replaced 2x SMD MOSFETs & Charging IC',
      'Restored standard 19.5V power rail & fast charging',
      'Zero data loss — client files 100% intact'
    ],
    technicalOutcome: 'System draws steady 2.45A under full load, battery charges normally, and Windows boots in 11 seconds.',
    visualType: 'board-liquid'
  },
  {
    id: 'case-dell-hinge',
    title: 'Fractured Hinge Anchor & Chassis Epoxy Molding',
    device: 'Dell Latitude 5400 Laptop',
    category: 'hinge',
    categoryLabel: 'Structural & Hinge',
    turnaround: '3.5 Hours',
    warranty: '180-Day Structural Guarantee',
    customerProfile: 'Secondary School Teacher, Ondo Town',
    beforeDescription: 'Left hinge seized from dust buildup, forcing brass screw studs to tear out of the plastic palmrest. Screen casing was gaping open 2 inches whenever opened.',
    beforeSymptoms: [
      'Cracked internal screw anchors',
      'Hinge separated completely from lower palmrest',
      'EDP display cable pinched by loose metal arm',
      'Laptop lid unable to close without snapping'
    ],
    afterDescription: 'Reconstructed screw mounting points using high-tensile industrial structural epoxy. Calibrated hinge torque for smooth one-hand opening. Inspected and re-routed EDP cable.',
    afterHighlights: [
      'Reinforced high-tensile structural epoxy weld',
      'Calibrated hinge friction resistance to factory spec',
      'Protected internal antenna and display cables',
      'Chassis closes flush with zero seam gaps'
    ],
    technicalOutcome: 'Structurally stronger than original factory plastic studs. 500-cycle open/close stress test passed.',
    visualType: 'laptop-hinge'
  },
  {
    id: 'case-samsung-port',
    title: 'Corroded USB-C Port Micro-Soldering',
    device: 'Samsung Galaxy S22 Ultra 5G',
    category: 'port',
    categoryLabel: 'Port & Charging',
    turnaround: '1 Hour 15 Mins',
    warranty: '90-Day Warranty',
    customerProfile: 'Mobile Trader, Ondo-Ore Axis',
    beforeDescription: 'Constant "Moisture Detected" warning in notification shade even after days of drying. Pin 4 and Pin 12 oxidised from moisture ingress, blocking all USB charging.',
    beforeSymptoms: [
      'Moisture detected warning permanently stuck',
      'Zero USB-PD fast charging amperage',
      'Loose cable connection wobbling in socket',
      'PC refuses to recognize device for data transfer'
    ],
    afterDescription: 'Desoldered damaged 24-pin USB-C receptacle under microscope with low-melt bismuth solder. Cleaned ground pads and installed genuine Samsung replacement sub-board port.',
    afterHighlights: [
      'Precision microscope SMD solder replacement',
      'Restored Samsung 45W Super Fast Charging 2.0',
      'Restored high-speed USB 3.2 data transfer',
      'Applied water-resistant silicone sealing barrier'
    ],
    technicalOutcome: 'Fast charging verified from 12% to 85% in 35 minutes. Zero moisture warnings.',
    visualType: 'samsung-port'
  },
  {
    id: 'case-macbook-thermal',
    title: 'Severe Thermal Throttling & Heatsink Overhaul',
    device: 'Apple MacBook Pro 15" Retina',
    category: 'thermal',
    categoryLabel: 'Thermal & Fans',
    turnaround: '1 Hour 30 Mins',
    warranty: '180-Day Guarantee',
    customerProfile: 'Video Editor & Graphic Designer, Ondo City',
    beforeDescription: 'Laptop fans screaming at 6,200 RPM maximum under mild usage. CPU core temperatures spiking to 99°C with aggressive kernel_task throttling slowing mouse cursor and video renders.',
    beforeSymptoms: [
      'CPU idle temps at 78°C, load temps hitting 99°C',
      'Fierce kernel_task throttling freezing UI',
      'Exhaust vents blocked by thick carpet of felted dust',
      'Factory thermal paste rock-hard and desiccated'
    ],
    afterDescription: 'Complete disassembly of dual-fan cooling module. Ultrasonic chemical cleaning of copper fin stacks. Applied high-performance Arctic MX-4 thermal compound to CPU/GPU silicon dies.',
    afterHighlights: [
      'Eliminated dust blockage from radiator fins',
      'Scraped dried paste and applied Arctic MX-4 compound',
      'Re-lubricated dual fan magnetic bearings',
      'Dropped thermal load temps by 31°C'
    ],
    technicalOutcome: 'Peak Cinebench temperature dropped from 99°C to 68°C. Full multicore render speeds restored with silent fans.',
    visualType: 'macbook-thermal'
  }
];

interface BeforeAfterGalleryProps {
  onOpenEstimator: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onOpenEstimator }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isComparing, setIsComparing] = useState<'slider' | 'before' | 'after'>('slider');
  const [activeFilter, setActiveFilter] = useState<'all' | 'screen' | 'liquid' | 'hinge' | 'port' | 'thermal'>('all');

  const filteredCases = activeFilter === 'all'
    ? REPAIR_CASES
    : REPAIR_CASES.filter((c) => c.category === activeFilter);

  const currentCase = filteredCases[activeCaseIndex] || filteredCases[0] || REPAIR_CASES[0];

  const handleNext = () => {
    setActiveCaseIndex((prev) => (prev + 1) % filteredCases.length);
    setSliderPosition(50);
  };

  const handlePrev = () => {
    setActiveCaseIndex((prev) => (prev - 1 + filteredCases.length) % filteredCases.length);
    setSliderPosition(50);
  };

  const getWhatsAppCaseUrl = (caseItem: RepairCaseStudy) => {
    const text = `Hello Icon Tech, I saw your repair case study: "${caseItem.title}" on the ${caseItem.device}.
I have a similar hardware issue with my device and would like to bring it to your workshop Opposite Adeyemi, Ondo State.`;
    return `https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Verified Hardware Proof
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Before & After Repair Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Real customer hardware brought into our laboratory Opposite Adeyemi, Ondo State. Slide or toggle between the initial defect and completed restoration.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrev}
            aria-label="Previous Case Study"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 px-2 tabular-nums">
            {activeCaseIndex + 1} / {filteredCases.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next Case Study"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills (unboxed clean buttons) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => {
            setActiveFilter('all');
            setActiveCaseIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Cases ({REPAIR_CASES.length})
        </button>
        <button
          onClick={() => {
            setActiveFilter('screen');
            setActiveCaseIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'screen'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Screen & OLED
        </button>
        <button
          onClick={() => {
            setActiveFilter('liquid');
            setActiveCaseIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'liquid'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Liquid Spill & Motherboard
        </button>
        <button
          onClick={() => {
            setActiveFilter('hinge');
            setActiveCaseIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'hinge'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Structural Hinges
        </button>
        <button
          onClick={() => {
            setActiveFilter('port');
            setActiveCaseIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'port'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          USB Ports & Power
        </button>
        <button
          onClick={() => {
            setActiveFilter('thermal');
            setActiveCaseIndex(0);
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'thermal'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Thermal Overhauls
        </button>
      </div>

      {/* Main Interactive Comparison Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Visual Comparison Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* View Mode Toggle Bar */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setIsComparing('slider')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    isComparing === 'slider'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Interactive Split Slider
                </button>
                <button
                  onClick={() => setIsComparing('before')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    isComparing === 'before'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  View Defect (Before)
                </button>
                <button
                  onClick={() => setIsComparing('after')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    isComparing === 'after'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  View Restored (After)
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Drag slider to inspect
              </div>
            </div>

            {/* Visual Canvas Container */}
            <div className="relative w-full h-72 sm:h-84 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 select-none">
              {/* After Visual (Underneath base) */}
              <div className="absolute inset-0 w-full h-full">
                <RepairCaseVisual
                  type={currentCase.visualType}
                  state="after"
                  className="w-full h-full"
                />
                <span className="absolute bottom-3 right-3 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 backdrop-blur-xs">
                  Restored By Icon Tech
                </span>
              </div>

              {/* Before Visual (Clipped on top based on sliderPosition or active tab) */}
              {isComparing !== 'after' && (
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
                  style={{
                    clipPath:
                      isComparing === 'before'
                        ? 'inset(0 0 0 0)'
                        : `inset(0 ${100 - sliderPosition}% 0 0)`
                  }}
                >
                  <RepairCaseVisual
                    type={currentCase.visualType}
                    state="before"
                    className="w-full h-full"
                  />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-800/60 backdrop-blur-xs">
                    Initial Defect (Drop-off)
                  </span>
                </div>
              )}

              {/* Slider Divider Line & Handle */}
              {isComparing === 'slider' && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-bold text-xs pointer-events-auto cursor-ew-resize">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Range Input Overlay for Dragging */}
              {isComparing === 'slider' && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  aria-label="Comparison slider"
                />
              )}
            </div>

            {/* Slider Range Hint */}
            <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                Before: Damaged Hardware
              </span>
              <span className="font-mono text-slate-500">{sliderPosition}% split</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                After: Laboratory Restored
              </span>
            </div>
          </div>

          {/* Right: Technical Case Dossier & Highlights (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Device line */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="uppercase tracking-wider font-semibold text-blue-400">
                  {currentCase.categoryLabel}
                </span>
                <span className="flex items-center gap-1 font-mono text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {currentCase.turnaround}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">{currentCase.title}</h3>
              <div className="text-xs font-semibold text-slate-300 mt-1">
                Device: <span className="text-white">{currentCase.device}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Client Profile: {currentCase.customerProfile}
              </div>

              {/* Problem vs Solution Description */}
              <div className="mt-5 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-rose-900/30 space-y-1">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Defect Diagnosis:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentCase.beforeDescription}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/30 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Icon Tech Engineering Procedure:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentCase.afterDescription}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Restoration Milestones:
                </div>
                <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                  {currentCase.afterHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warranty & Outcome Badge */}
              <div className="mt-4 p-3 rounded-lg bg-blue-950/30 border border-blue-900/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Coverage: <strong className="text-white">{currentCase.warranty}</strong></span>
                </div>
                <span className="text-[11px] font-medium text-blue-300">Verified Bench Test</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppCaseUrl(currentCase)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors text-center shadow-lg shadow-emerald-950/40"
              >
                Inquire on WhatsApp
              </a>

              <button
                onClick={onOpenEstimator}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-950/40"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Estimate Your Repair</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Repair Photography & Documentation Standards */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Intake & Completion Photography Protocol</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              The 3 Types of Hardware Photos We Document For Every Customer Device
            </h3>
          </div>
          <a
            href={`https://wa.me/${STORE_LOCATION.whatsappNumber}?text=${encodeURIComponent(
              'Hello Icon Tech, I am sending a photo of my damaged device (screen crack / liquid spill / port issue) for a fast diagnostic evaluation.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-md shadow-emerald-950/40"
          >
            <span>Send Photo on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center">
              1
            </div>
            <div className="font-bold text-white">Intake Defect Photography</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              High-resolution close-up of initial shattered glass, torn flex cables, chassis denting, or oxidised charging ports taken upon drop-off opposite Adeyemi with the client ticket ID.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center">
              2
            </div>
            <div className="font-bold text-white">Microscope Logic Board Inspection</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Magnified bench photography showing component-level rework: replaced SMD MOSFETs, ultrasonic clean-bath copper traces, and fresh Arctic MX-4 thermal paste application.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
              3
            </div>
            <div className="font-bold text-white">Bench Test Handover Verification</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Verification photo capturing TrueTone calibration active, flawless touch grid across all 22 zones, full-wattage fast charging (e.g. 45W 2.45A), and silent fan thermals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// REAL PHOTOGRAPHIC VISUAL RENDERER FOR BEFORE & AFTER COMPARISONS
// ============================================================================
interface RepairCaseVisualProps {
  type: 'iphone-screen' | 'board-liquid' | 'laptop-hinge' | 'samsung-port' | 'macbook-thermal';
  state: 'before' | 'after';
  className?: string;
}

const REPAIR_CASE_PHOTOS: Record<
  string,
  {
    before: { url: string; label: string; badge: string };
    after: { url: string; label: string; badge: string };
  }
> = {
  'iphone-screen': {
    before: {
      url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop&q=80',
      label: 'Severe spider-web glass fracture, vertical pink lines across OLED display',
      badge: 'Intake Defect: Shattered OLED'
    },
    after: {
      url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      label: 'Fitted OEM-grade Super Retina XDR OLED assembly with TrueTone active',
      badge: 'Restored: TrueTone & Full Touch Active'
    }
  },
  'board-liquid': {
    before: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      label: 'Corroded motherboard power rail, mineral oxidation across BQ24780S chip',
      badge: 'Intake Defect: Shorted 19.5V Power Rail'
    },
    after: {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      label: 'Microscope SMD micro-soldering, ultrasonic de-oxidizing wash completed',
      badge: 'Restored: Stable 2.45A · Fast Charging'
    }
  },
  'laptop-hinge': {
    before: {
      url: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=80',
      label: 'Fractured internal screw anchors, gaping chassis seam unable to close',
      badge: 'Intake Defect: Snapped Hinge Anchors'
    },
    after: {
      url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
      label: 'Industrial high-tensile epoxy weld with calibrated friction torque',
      badge: 'Restored: Flush Seamless Lid Alignment'
    }
  },
  'samsung-port': {
    before: {
      url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80',
      label: 'Oxidized 24-pin USB receptacle with persistent moisture detected warning',
      badge: 'Intake Defect: Corroded USB-C Port'
    },
    after: {
      url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      label: 'Microscope desoldered and replaced genuine sub-board with 45W fast charge',
      badge: 'Restored: 45W Super Fast Charging 2.0'
    }
  },
  'macbook-thermal': {
    before: {
      url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
      label: 'Fans screaming at 6,200 RPM, exhaust fins carpeted in dust, 99°C throttle',
      badge: 'Intake Defect: 99°C Thermal Throttling'
    },
    after: {
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      label: 'Ultrasonic chemical heatsink wash, Arctic MX-4 compound re-paste applied',
      badge: 'Restored: 68°C Full Load · Silent Operation'
    }
  }
};

const RepairCaseVisual: React.FC<RepairCaseVisualProps> = ({ type, state, className = '' }) => {
  const caseData = REPAIR_CASE_PHOTOS[type] || REPAIR_CASE_PHOTOS['iphone-screen'];
  const photo = state === 'before' ? caseData.before : caseData.after;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full bg-slate-950 overflow-hidden ${className}`}>
      {/* High-Resolution Macro Repair Photograph */}
      <img
        src={photo.url}
        alt={photo.label}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-40 bg-slate-900'
        }`}
      />

      {/* Atmospheric dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

      {/* Callout Info Badge */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-md border shadow-md ${
            state === 'before'
              ? 'bg-rose-950/90 text-rose-300 border-rose-800/80'
              : 'bg-emerald-950/90 text-emerald-300 border-emerald-800/80'
          }`}
        >
          {photo.badge}
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
        <p className="text-[11px] font-medium text-slate-200 line-clamp-1 drop-shadow-md">
          {photo.label}
        </p>
      </div>
    </div>
  );
};
