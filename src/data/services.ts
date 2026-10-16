import { RepairService, RepairEstimateOption, RepairTicket } from '../types';
import { STORE_LOCATION } from './inventory';
export { STORE_LOCATION };

export const REPAIR_SERVICES: RepairService[] = [
  // CATEGORY 1: MOBILE PHONE REPAIRS
  {
    id: 'mob-screen',
    category: 'mobile',
    title: 'Display & Touch Panel Replacement',
    shortDesc: 'OEM-grade OLED, AMOLED, and IPS LCD touch assemblies with TrueTone recalibration.',
    turnaround: '45 – 90 Minutes (Same-Day Express)',
    warranty: '90-Day Functional Warranty',
    startingPrice: 18000,
    bulletPoints: [
      'Original OLED / Retina display assemblies with factory color temperature accuracy',
      'Full touch digitizer responsiveness testing and 3D Touch/haptic calibration',
      'TrueTone data transfer for iPhones to retain native ambient light calibration',
      'Includes complimentary 9H tempered glass screen shield installation'
    ],
    iconName: 'Smartphone'
  },
  {
    id: 'mob-battery',
    category: 'mobile',
    title: 'High-Capacity Battery Replacement',
    shortDesc: 'Certified zero-cycle lithium cells with battery health verification and power IC check.',
    turnaround: '30 – 60 Minutes',
    warranty: '180-Day Warranty',
    startingPrice: 12000,
    bulletPoints: [
      'Zero-cycle high-density lithium-ion & polymer cells with verified mAh capacity',
      'Removal of "Important Battery Message" non-genuine warnings on supported models',
      'Comprehensive Tristar / Hydra charging IC diagnostic before handover',
      'Safe discharge and eco-friendly certified recycling of swollen/degraded cells'
    ],
    iconName: 'BatteryCharging'
  },
  {
    id: 'mob-port-charging',
    category: 'mobile',
    title: 'Charging Port & Flex Micro-Soldering',
    shortDesc: 'Precision replacement of damaged USB-C / Lightning ports, microphone ribbons, and fast-charging lines.',
    turnaround: '1 – 3 Hours',
    warranty: '90-Day Warranty',
    startingPrice: 10000,
    bulletPoints: [
      'Microscope-assisted SMD desoldering and re-soldering of USB-C and Lightning jacks',
      'Testing of fast charging (USB-PD / QC), OTG data connectivity, and microphone audio',
      'De-oxidation and debris removal from internal sub-board flex connectors',
      'Original flex assemblies to guarantee fast-charge amperage compatibility'
    ],
    iconName: 'Zap'
  },
  {
    id: 'mob-liquid-motherboard',
    category: 'mobile',
    title: 'Liquid Damage Recovery & Logic Board Repair',
    shortDesc: 'Ultrasonic chemical de-oxidation, short-circuit thermal tracing, and component-level micro-soldering.',
    turnaround: '24 – 48 Hours',
    warranty: '60-Day Logic Board Warranty',
    startingPrice: 25000,
    bulletPoints: [
      'Immediate chemical bath in industrial ultrasonic cleaner with specialized PCB de-oxidizer',
      'Thermal imaging infrared inspection to pinpoint microscopic capacitors and diodes with dead shorts',
      'Logic board layer re-balling and PMIC (Power Management IC) replacement',
      'Special focus on emergency data salvage before board restoration'
    ],
    iconName: 'Cpu'
  },

  // CATEGORY 2: LAPTOP & NOTEBOOK REPAIRS
  {
    id: 'lap-screen-replacement',
    category: 'laptop',
    title: 'Laptop Screen Panel Replacement',
    shortDesc: 'Replacement of cracked, flickering, or vertical line displays across HP, Dell, Lenovo, Apple, and ASUS.',
    turnaround: '2 – 4 Hours (Stock Panels)',
    warranty: '90-Day Warranty',
    startingPrice: 35000,
    bulletPoints: [
      'Slim-bezel, FHD, 2K/4K, 144Hz high refresh rate, and touchscreen assembly inventory',
      'Precise EDP 30-pin & 40-pin cable verification to eliminate backlight shorts',
      'Color gamut matching for photo/video editing professionals',
      'Careful bezel preservation with zero unsightly gaps or adhesive bleed'
    ],
    iconName: 'Monitor'
  },
  {
    id: 'lap-thermal-service',
    category: 'laptop',
    title: 'Thermal Overhaul & Fan Restoration',
    shortDesc: 'Deep ultrasonic dust cleaning, fan bearing lubrication, and Arctic MX-4 / Thermal Grizzly repasting.',
    turnaround: '60 – 120 Minutes',
    warranty: '180-Day Guarantee',
    startingPrice: 15000,
    bulletPoints: [
      'Eliminates laptop thermal throttling, abrupt shutdowns, and jet-engine fan noise',
      'Application of high-performance thermal paste (Arctic MX-4 / Kryonaut) on CPU & GPU dies',
      'Replacement of dried silicone thermal pads on VRAM and VRM power chokes',
      'Pre- and post-service Cinebench and FurMark temperature differential stress tests'
    ],
    iconName: 'Wind'
  },
  {
    id: 'lap-ram-ssd-upgrade',
    category: 'laptop',
    title: 'RAM & NVMe High-Speed SSD Upgrades',
    shortDesc: 'Upgrade your sluggish laptop to lightning speeds with Gen3/Gen4 NVMe solid state drives and dual-channel RAM.',
    turnaround: '45 – 90 Minutes (Including OS Migration)',
    warranty: '1-Year Storage Warranty',
    startingPrice: 22000,
    bulletPoints: [
      'Full bit-by-bit clone of your existing system — all files, software, and passwords intact',
      'Boot time reduction from 2+ minutes down to 8 seconds',
      'Crucial, Kingston, and Samsung genuine memory modules with strict frequency matching',
      'Complimentary internal dust blow-out during disassembly'
    ],
    iconName: 'HardDrive'
  },
  {
    id: 'lap-hinge-keyboard',
    category: 'laptop',
    title: 'Structural Hinge & Keyboard Replacement',
    shortDesc: 'Reconstruction of broken hinge anchor points, palmrest screw studs, and non-responsive key matrices.',
    turnaround: '3 – 6 Hours',
    warranty: '90-Day Warranty',
    startingPrice: 18000,
    bulletPoints: [
      'Industrial resin molding and metal anchor reinforcement for cracked plastic palmrests',
      'Backlit and standard UK/US layout keyboard replacements',
      'Adjustment of hinge torque to prevent future chassis fracture',
      'Touchpad alignment and tactile click mechanism reconditioning'
    ],
    iconName: 'Wrench'
  },

  // CATEGORY 3: SOFTWARE, OS & DATA RECOVERY
  {
    id: 'soft-os-deployment',
    category: 'software',
    title: 'OS Deployment & Driver Optimization',
    shortDesc: 'Clean genuine installation of Windows 10/11 Pro, macOS Sonoma/Sequoia, or Ubuntu Linux with full driver suites.',
    turnaround: '60 – 120 Minutes',
    warranty: '30-Day Support Guarantee',
    startingPrice: 8000,
    bulletPoints: [
      'Zero bloatware, genuine digital licensing activation assistance',
      'Complete proprietary chipset, audio, graphics, and WiFi driver validation',
      'Installation of essential software suite (Office packages, PDF readers, web browsers)',
      'BIOS/UEFI firmware security updates and boot optimizations'
    ],
    iconName: 'Terminal'
  },
  {
    id: 'soft-malware-removal',
    category: 'software',
    title: 'Malware Isolation & Rootkit Eradication',
    shortDesc: 'Elimination of ransomware, trojans, crypto-miners, browser hijackers, and stubborn registry corruptions.',
    turnaround: '2 – 4 Hours',
    warranty: '30-Day Protection Guarantee',
    startingPrice: 10000,
    bulletPoints: [
      'Deep offline scanning via hardware boot environment',
      'Registry cleanup and restoration of corrupted Windows security services',
      'Browser cleanout and removal of rogue extension backdoors',
      'Installation and tuning of lightweight resident anti-malware shields'
    ],
    iconName: 'ShieldCheck'
  },
  {
    id: 'soft-data-recovery',
    category: 'software',
    title: 'Advanced Logical Data Recovery',
    shortDesc: 'Retrieval of deleted, formatted, RAW, or corrupted data from external hard drives, SSDs, and flash drives.',
    turnaround: '24 – 72 Hours',
    warranty: 'Strict Confidentiality Guarantee',
    startingPrice: 20000,
    bulletPoints: [
      'Deep sector-by-sector disk imaging to prevent further magnetic or flash wear',
      'Recovery from RAW partition errors, accidental format, and corrupted file tables',
      'Special handling for academic theses, school coursework, and business records',
      'Zero recovery fee policy if critical targeted files cannot be salvaged'
    ],
    iconName: 'Database'
  }
];

export const ESTIMATE_MATRIX: Record<string, {
  name: string;
  brands: string[];
  issues: {
    id: string;
    label: string;
    minPrice: number;
    maxPrice: number;
    turnaround: string;
    notes: string;
  }[];
}> = {
  smartphone: {
    name: 'Smartphones & Mobile Devices',
    brands: ['Apple iPhone', 'Samsung Galaxy', 'Tecno', 'Infinix', 'Xiaomi / Redmi', 'Oppo / Vivo', 'Google Pixel'],
    issues: [
      { id: 'screen', label: 'Broken / Black / Flickering Screen', minPrice: 18000, maxPrice: 140000, turnaround: '1 - 2 Hours', notes: 'Depends on model (LCD vs AMOLED vs OLED Retina).' },
      { id: 'battery', label: 'Battery Draining Fast / Swollen / Shutting Down', minPrice: 10000, maxPrice: 35000, turnaround: '45 Minutes', notes: 'Includes zero-cycle high capacity cell and seal replacement.' },
      { id: 'port', label: 'Not Charging / Loose USB-C or Lightning Port', minPrice: 8000, maxPrice: 25000, turnaround: '1 - 2 Hours', notes: 'Micro-soldering or genuine flex replacement.' },
      { id: 'water', label: 'Dropped in Water / Liquid Damage', minPrice: 20000, maxPrice: 60000, turnaround: '24 - 48 Hours', notes: 'Ultrasonic chemical de-oxidation and thermal diagnostic.' },
      { id: 'motherboard', label: 'No Power / Dead Device / IC Short Circuit', minPrice: 25000, maxPrice: 75000, turnaround: '24 - 48 Hours', notes: 'Component-level microscope tracing and chip replacement.' },
      { id: 'camera', label: 'Camera Shaking / Blurry / Black Lens', minPrice: 15000, maxPrice: 65000, turnaround: '2 Hours', notes: 'Original OIS camera module replacement.' }
    ]
  },
  laptop: {
    name: 'Laptops & Notebooks',
    brands: ['HP (EliteBook, Pavilion, Envy)', 'Dell (Latitude, XPS, Inspiron)', 'Lenovo (ThinkPad, IdeaPad)', 'Apple MacBook (Air, Pro)', 'ASUS (ZenBook, TUF, ROG)', 'Acer', 'Toshiba'],
    issues: [
      { id: 'screen', label: 'Broken LCD / Lines / Cracked Display', minPrice: 35000, maxPrice: 160000, turnaround: '2 - 4 Hours', notes: 'Standard FHD panels readily available in Ondo store.' },
      { id: 'thermal', label: 'Overheating / Fan Loud / Random Shutdown', minPrice: 12000, maxPrice: 25000, turnaround: '1 - 2 Hours', notes: 'Deep heatsink cleaning + Arctic MX-4 thermal repaste.' },
      { id: 'speed', label: 'Sluggish Performance / Need SSD & RAM Upgrade', minPrice: 22000, maxPrice: 70000, turnaround: '1 Hour', notes: 'Includes fast NVMe SSD and file cloning.' },
      { id: 'hinge', label: 'Broken Hinge / Separated Body Plastics', minPrice: 15000, maxPrice: 35000, turnaround: '3 - 5 Hours', notes: 'Structural epoxy reinforcement and screw anchor molding.' },
      { id: 'keyboard', label: 'Keyboard Keys Missing / Non-responsive', minPrice: 16000, maxPrice: 45000, turnaround: '2 Hours', notes: 'Original replacement with correct language layout.' },
      { id: 'nopower', label: 'No Power / Charging Light Blinks / Dead Board', minPrice: 28000, maxPrice: 85000, turnaround: '24 - 48 Hours', notes: 'Motherboard power rail diagnostics, MOSFET & charging IC fix.' }
    ]
  },
  software: {
    name: 'Software, System & Data Recovery',
    brands: ['Windows 10 / 11', 'macOS (Sonoma, Sequoia, Big Sur)', 'Linux Ubuntu', 'External Hard Drive / Flash Drive'],
    issues: [
      { id: 'os-reinstall', label: 'Clean Operating System Installation & Activation', minPrice: 8000, maxPrice: 15000, turnaround: '1 - 2 Hours', notes: 'Includes full drivers, Microsoft Office, and essential utilities.' },
      { id: 'virus', label: 'Malware / Adware / Virus Removal & Security Tuning', minPrice: 8000, maxPrice: 18000, turnaround: '2 Hours', notes: 'Safe rootkit eradication without deleting personal files.' },
      { id: 'data-lost', label: 'Lost Files / Corrupted Hard Drive / Formatted Storage', minPrice: 20000, maxPrice: 85000, turnaround: '24 - 72 Hours', notes: 'Advanced sector recovery for project files and thesis documents.' }
    ]
  }
};

export const DEMO_TICKETS: RepairTicket[] = [
  {
    ticketId: 'ICT-7842',
    customerName: 'Adewale Bakare',
    customerPhone: '+234 803 *** 4821',
    deviceModel: 'Apple iPhone 13 (Midnight 128GB)',
    serviceType: 'OLED Screen Replacement + TrueTone Calibration',
    status: 'Ready for Pickup',
    dateReceived: 'Today, 10:15 AM',
    estimatedCompletion: 'Today, 12:30 PM (Completed)',
    cost: 45000,
    notes: 'OEM OLED assembly fitted. TrueTone serialized. Device passed all 22 touch grid audits. Glass screen protector applied.'
  },
  {
    ticketId: 'ICT-7843',
    customerName: 'Blessing Ogundele',
    customerPhone: '+234 814 *** 9912',
    deviceModel: 'HP EliteBook 840 G6',
    serviceType: '512GB NVMe Upgrade + Thermal Repasting',
    status: 'Quality Testing',
    dateReceived: 'Yesterday, 3:40 PM',
    estimatedCompletion: 'Today, 2:00 PM',
    cost: 38000,
    notes: 'Windows 11 Pro cloned to Kingston NV2 512GB SSD. Arctic MX-4 applied to CPU. Cinebench thermal peak down from 94°C to 68°C.'
  },
  {
    ticketId: 'ICT-7844',
    customerName: 'Kolawole Femi (Adeyemi Staff)',
    customerPhone: '+234 806 *** 1150',
    deviceModel: 'Samsung Galaxy A53 5G',
    serviceType: 'Sub-board USB-C Charging Port Micro-soldering',
    status: 'Micro-Soldering',
    dateReceived: 'Today, 11:20 AM',
    estimatedCompletion: 'Today, 3:30 PM',
    cost: 14000,
    notes: 'Pins on USB-C port corroded from moisture. Undergoing microscope desoldering on anti-static station #2.'
  },
  {
    ticketId: 'ICT-7845',
    customerName: 'Chioma Eze',
    customerPhone: '+234 708 *** 3329',
    deviceModel: 'Dell Inspiron 15 3520',
    serviceType: 'Left Hinge Fracture & Palmrest Structural Molding',
    status: 'Diagnostics',
    dateReceived: 'Today, 1:10 PM',
    estimatedCompletion: 'Tomorrow, 11:00 AM',
    cost: 22000,
    notes: 'Hinge metal anchor pulled out from screw studs. Chassis disassembled for high-tensile epoxy reinforcement.'
  }
];
