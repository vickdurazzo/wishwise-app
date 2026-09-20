import React from 'react';
import { ASSETS } from '../data/mockData';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onLogout: () => void;
  totalSaved?: number;
  savedCount?: number;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onLogout,
  onResetData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#181a2e]/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#181a2e] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#f4f2ff] pb-3">
          <h3 className="text-base font-bold text-[#181a2e]">Perfil</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4f2ff] hover:bg-[#edecff] flex items-center justify-center text-[#181a2e] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 bg-[#f4f2ff] p-3.5 rounded-2xl">
         
          <div className="min-w-0 flex-1">
            
            <p className="text-xs text-[#404943] truncate">{currentUser.email}</p>
            
          </div>
        </div>

        {/* Conta & Autenticação */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#707973] uppercase tracking-wider px-1">
            Sua Conta
          </span>

          
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-[#ba1a1a]/15 hover:bg-[#ffdad6]/20 transition-colors text-xs text-left cursor-pointer text-[#ba1a1a]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffdad6]/40 flex items-center justify-center text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </div>
                <div>
                  <span className="font-semibold block">Sair da Conta</span>
                  <span className="text-[11px] text-[#ba1a1a]/80">Desconectar deste dispositivo</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          
        </div>

        {/* Mindful Settings */}
        

        {/* Reset / Demo Action */}
        <div className="pt-2 border-t border-[#f4f2ff] flex flex-col gap-2">
          <button
            className="w-full py-2.5 px-4 rounded-full bg-[#f4f2ff] hover:bg-[#edecff] text-xs font-semibold text-[#404943] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => {
              onResetData();
              onClose();
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Restaurar dados de demonstração</span>
          </button>
        </div>
      </div>
    </div>
  );
};
