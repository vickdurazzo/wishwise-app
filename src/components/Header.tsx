import React from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenType, UserProfile } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  currentUser?: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onOpenProfile: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  currentUser,
  onNavigate,
  onOpenProfile,
  onBack,
  showBack = false,
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'meus-desejos':
        return 'Meus Desejos';
      case 'cadastrar-desejo':
        return 'Adicionar Novo Desejo';
      case 'detalhes-desejo':
        return 'Detalhes Do Desejo';
      case 'historico-e-conquistas':
        return 'Histórico E Conquistas';
      case 'perfil-e-configuracoes':
        return 'Perfil e Ajustes';
      case 'auth':
        return 'Entrar ou Cadastrar';
      default:
        return 'Quarentena de Desejos';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbf8ff]/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(45,106,79,0.04)] pt-safe">
      <div className="h-16 px-4 sm:px-6 max-w-lg mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {showBack && (
            <button
              aria-label="Voltar"
              className="w-10 h-10 flex items-center justify-center text-[#181a2e] rounded-full hover:bg-[#edecff] transition-colors -ml-1 cursor-pointer"
              onClick={onBack || (() => onNavigate('meus-desejos'))}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('meus-desejos')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            type="button"
          >
            <img
              alt="Logo Quarentena de Desejos"
              className="h-8 w-8 object-contain flex-shrink-0"
              src={ASSETS.logo}
              referrerPolicy="no-referrer"
            />
            <span className="font-semibold text-lg text-[#2d6a4f] truncate">
              {getScreenTitle()}
            </span>
          </button>
        </div>

        <button
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#2d6a4f]/15 hover:bg-[#edecff] text-[#2d6a4f] transition-colors cursor-pointer shadow-xs"
          onClick={onOpenProfile}
          type="button"
          aria-label="Abrir Perfil"
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
        </button>
      </div>
    </header>
  );
};
