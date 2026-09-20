import React from 'react';
import { ScreenType } from '../types';

interface BottomNavigationProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeScreen,
  onNavigate,
}) => {
  // Hide bottom nav in forms, auth, or full modals like cadastrar-desejo or detalhes-desejo
  if (activeScreen === 'cadastrar-desejo' || activeScreen === 'detalhes-desejo' || activeScreen === 'auth') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-8px_32px_-4px_rgba(45,106,79,0.06)] rounded-t-2xl border-t border-[#edecff]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-6">
        <button
          aria-current={activeScreen === 'meus-desejos' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-1 min-w-[72px] h-12 transition-all cursor-pointer ${
            activeScreen === 'meus-desejos'
              ? 'text-[#2d6a4f] font-semibold'
              : 'text-[#404943] hover:text-[#2d6a4f]'
          }`}
          onClick={() => onNavigate('meus-desejos')}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-transform ${
              activeScreen === 'meus-desejos' ? 'scale-110' : ''
            }`}
            style={{ fontVariationSettings: activeScreen === 'meus-desejos' ? "'FILL' 1" : "'FILL' 0" }}
          >
            bookmarks
          </span>
          <span className="text-[11px] leading-tight">Meus Desejos</span>
        </button>

        <button
          aria-current={activeScreen === 'historico-e-conquistas' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-1 min-w-[72px] h-12 transition-all cursor-pointer ${
            activeScreen === 'historico-e-conquistas'
              ? 'text-[#2d6a4f] font-semibold'
              : 'text-[#404943] hover:text-[#2d6a4f]'
          }`}
          onClick={() => onNavigate('historico-e-conquistas')}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-transform ${
              activeScreen === 'historico-e-conquistas' ? 'scale-110' : ''
            }`}
            style={{ fontVariationSettings: activeScreen === 'historico-e-conquistas' ? "'FILL' 1" : "'FILL' 0" }}
          >
            emoji_events
          </span>
          <span className="text-[11px] leading-tight">Conquistas</span>
        </button>
      </div>
    </nav>
  );
};
