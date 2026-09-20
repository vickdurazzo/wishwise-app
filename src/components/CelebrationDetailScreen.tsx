import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { WishlistItem, ScreenType } from '../types';

interface CelebrationDetailScreenProps {
  lastSavedItem: WishlistItem | null;
  totalSaved?: number;
  savedCount?: number;
  onNavigate: (screen: ScreenType) => void;
}

export const CelebrationDetailScreen: React.FC<CelebrationDetailScreenProps> = ({
  lastSavedItem,
  onNavigate,
}) => {
  const [isSavingDecision, setIsSavingDecision] = useState(false);

  const itemName = lastSavedItem ? lastSavedItem.name : 'Jaqueta Corta-vento';
  const itemPrice = lastSavedItem ? lastSavedItem.price : 280.00;

  const handleReturn = () => {
    setIsSavingDecision(true);
    setTimeout(() => {
      onNavigate('meus-desejos');
    }, 400);
  };

  return (
    <div className="flex flex-col w-full pb-16 pt-20 px-4 sm:px-6 max-w-lg mx-auto space-y-4">
      {/* Top Dismiss / Reassurance Bar */}
      <div className="flex items-center justify-between py-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#92f7c3] text-[#00734d] text-xs font-semibold shadow-sm">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
          Pausa Concluída
        </span>

        <button
          aria-label="Fechar celebração"
          className="w-9 h-9 rounded-full bg-[#edecff] flex items-center justify-center text-[#181a2e] hover:bg-[#e0e0fc] transition-colors cursor-pointer"
          onClick={() => onNavigate('meus-desejos')}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Hero Visual Sanctuary */}
      <div className="relative w-full rounded-2xl bg-[#f4f2ff] p-5 sm:p-6 flex flex-col items-center text-center shadow-sm overflow-hidden border border-[#2d6a4f]/5">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#b1f0ce]/40 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#92f7c3]/30 blur-2xl pointer-events-none"></div>

        {/* Micro Celebration Graphic */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md">
            <svg className="w-14 h-14 text-[#0f5238]" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" fill="#b1f0ce" fillOpacity="0.35" r="30"></circle>
              {/* Pot Base */}
              <path d="M22 39L24.5 51C24.8 52.1 25.8 53 27 53H37C38.2 53 39.2 52.1 39.5 51L42 39H22Z" fill="#2d6a4f"></path>
              <rect fill="#0f5238" height="4" rx="2" width="24" x="20" y="36"></rect>
              {/* Little Coin in Soil */}
              <circle cx="32" cy="35" fill="#e6e3d0" r="4.5"></circle>
              <circle cx="32" cy="35" fill="none" r="3" stroke="#49483b" strokeWidth="1"></circle>
              {/* Flourishing Leaves */}
              <path d="M32 34V22C32 22 23 20 22 13C30 13 32 20 32 22Z" fill="#006c48"></path>
              <path d="M32 28C32 28 41 26 43 18C34 18 32 25 32 28Z" fill="#2c694e"></path>
              <path d="M32 22C33.5 17 38 10 38 10C38 10 32 12 30.5 17C30.2 18 31.2 21 32 22Z" fill="#75daa8"></path>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0f5238] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check
            </span>
          </div>
        </div>

        {/* Soft Confirmation Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white shadow-sm mb-2 text-[#0f5238]">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span className="text-xs font-semibold text-[#0f5238]">Decisão Consciente Confirmada</span>
        </div>

        {/* Empathic Congratulatory Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#181a2e] mb-1">
          Mais uma vitória do seu bolso!
        </h2>
        <p className="text-xs sm:text-sm text-[#404943] max-w-sm mb-3 leading-relaxed">
          Você abriu mão de comprar <span className="font-semibold text-[#181a2e]">{itemName}</span> e manteve{' '}
          <span className="font-bold text-[#0f5238]">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itemPrice)}
          </span>{' '}
          com você.
        </p>

      </div>


      {/* Warm Photographic Breathing Space */}
      <div className="w-full rounded-2xl overflow-hidden bg-[#edecff] p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm border border-[#2d6a4f]/5">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
          <img
            className="w-full h-full object-cover"
            src={ASSETS.zenTea}
            alt="Xícara de chá aconchegante"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#0f5238]">Respiro mindful</p>
          <p className="text-[11px] text-[#404943] leading-relaxed">
            Você deu tempo ao seu cérebro para sair do modo automático. Esse é o verdadeiro autocuidado financeiro.
          </p>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          className="w-full py-3.5 px-6 rounded-full bg-[#2d6a4f] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#0f5238] transition-all flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleReturn}
          type="button"
          disabled={isSavingDecision}
        >
          {isSavingDecision ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              <span>Salvando decisão...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              <span>Voltar para Meus Desejos</span>
            </>
          )}
        </button>

        <button
          className="w-full py-3 px-6 rounded-full bg-white text-[#0f5238] text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#f4f2ff] transition-all flex items-center justify-center gap-2 border border-[#2d6a4f]/10 cursor-pointer"
          onClick={() => onNavigate('historico-e-conquistas')}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
          <span>Ver Meu Histórico de Conquistas</span>
        </button>
      </div>
    </div>
  );
};
