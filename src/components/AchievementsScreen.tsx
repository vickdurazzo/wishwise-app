import React, { useState } from 'react';
import { ResolvedItem, ScreenType } from '../types';
import { ResolvedDetailModal } from './ResolvedDetailModal';

interface AchievementsScreenProps {
  resolvedItems: ResolvedItem[];
  totalSaved: number;
  onNavigate?: (screen: ScreenType) => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  resolvedItems,
  totalSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'bought'>('saved');
  const [selectedFilter, setSelectedFilter] = useState<'Este Mês' | 'Últimos 3 Meses' | '2024' | 'Todos'>('Este Mês');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<ResolvedItem | null>(null);

  const savedList = resolvedItems.filter((i) => i.type === 'saved');
  const boughtList = resolvedItems.filter((i) => i.type === 'bought');

  const currentList = activeTab === 'saved' ? savedList : boughtList;

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 sm:px-6 max-w-lg mx-auto space-y-4">
      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#181a2e] tracking-tight">
          Histórico &amp; Conquistas
        </h1>
        <p className="text-xs text-[#404943]">Acompanhe a evolução do seu consumo consciente</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 bg-[#edecff] rounded-full relative">
        <button
          className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all text-center z-10 flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'saved'
              ? 'text-white bg-[#0f5238] shadow-sm'
              : 'text-[#404943] hover:text-[#181a2e]'
          }`}
          onClick={() => setActiveTab('saved')}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">savings</span>
          <span>Economizados ({savedList.length})</span>
        </button>

        <button
          className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all text-center z-10 flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'bought'
              ? 'text-white bg-[#0f5238] shadow-sm'
              : 'text-[#404943] hover:text-[#181a2e]'
          }`}
          onClick={() => setActiveTab('bought')}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>Comprados ({boughtList.length})</span>
        </button>
      </div>

      {/* Hero Banner: Total Preservado */}
      <div className="bg-gradient-to-br from-[#b1f0ce] to-[#92f7c3] rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/30 blur-xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-[#0e5138] uppercase tracking-wider">
              {activeTab === 'saved' ? 'Total Preservado com Sucesso' : 'Total em Compras Conscientes'}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#002114] tracking-tight">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                activeTab === 'saved'
                  ? totalSaved
                  : boughtList.reduce((acc, i) => acc + i.price, 0)
              )}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#0f5238] shadow-sm">
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {(['Este Mês', 'Últimos 3 Meses', '2024', 'Todos'] as const).map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === filter
                ? 'bg-[#2d6a4f] text-white shadow-sm'
                : 'bg-[#edecff] text-[#404943] hover:bg-[#e0e0fc]'
            }`}
            onClick={() => setSelectedFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Feed Container */}
      <div className="flex flex-col gap-3">
        {currentList.map((item) => {
          const categoryLabel =
            item.category === 'puro-desejo'
              ? 'Puro Desejo'
              : item.category === 'util'
              ? 'Útil'
              : 'Essencial';

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItemForDetail(item)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#2d6a4f]/10 hover:border-[#0f5238]/30 hover:shadow-md transition-all duration-200 flex flex-col gap-2.5 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#edecff] ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-200">
                    <img
                      className="w-full h-full object-cover"
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-[#181a2e] group-hover:text-[#0f5238] transition-colors truncate">
                      {item.name}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        item.type === 'saved' ? 'text-[#006c48]' : 'text-[#0f5238]'
                      }`}
                    >
                      {item.type === 'saved' ? '+ ' : ''}
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                        item.price
                      )}{' '}
                      {item.type === 'saved' ? 'economizados' : 'adquirido'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e0e0fc] text-[#404943] whitespace-nowrap">
                    {categoryLabel}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemForDetail(item);
                    }}
                    className="p-1 rounded-full text-[#707973] group-hover:text-[#0f5238] hover:bg-[#edecff] transition-colors cursor-pointer"
                    aria-label="Ver detalhes"
                    title="Ver detalhes"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_full</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 text-[#404943] text-xs pt-0.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>{item.resolvedDate}</span>
                </div>

                {item.url && (
                  <div className="flex items-center gap-1 text-[11px] text-[#0f5238] truncate">
                    <span className="material-symbols-outlined text-[13px]">link</span>
                    <span className="truncate max-w-[130px]">
                      {item.url.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {currentList.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center text-xs text-[#404943] shadow-sm">
            Nenhum registro para esta categoria no momento.
          </div>
        )}
      </div>

      {/* Modal de Detalhes da Conquista / Compra */}
      <ResolvedDetailModal
        item={selectedItemForDetail}
        isOpen={!!selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
      />
    </div>
  );
};
