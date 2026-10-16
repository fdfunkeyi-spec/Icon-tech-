import React from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600/95 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-white shadow-xl shadow-amber-950/40 border border-amber-400/40 animate-pulse">
      <WifiOff className="w-4 h-4 text-white" />
      <span>Offline Mode — Browsing cached ICON TECH inventory</span>
    </div>
  );
};
