import React from 'react';
import { ToastNotification } from '../types';

interface SereneToastProps {
  toast: ToastNotification | null;
}

export const SereneToast: React.FC<SereneToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white text-[#181a2e] px-4 py-3 rounded-full shadow-xl border border-[#2d6a4f]/10 flex items-center gap-2.5 max-w-sm pointer-events-auto">
        <div className="w-7 h-7 rounded-full bg-[#92f7c3] text-[#00734d] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[18px]">
            {toast.icon || 'celebration'}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-medium leading-snug">
          {toast.message}
        </span>
      </div>
    </div>
  );
};
