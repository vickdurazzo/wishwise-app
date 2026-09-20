import React, { useState } from 'react';
import { WishlistItem, NeedCategory, ScreenType } from '../types';
import { WishDetailModal } from './WishDetailModal';

interface WishlistScreenProps {
  items: WishlistItem[];
  onNavigate: (screen: ScreenType) => void;
  onGiveUpAndSave: (item: WishlistItem) => void;
  onBought: (item: WishlistItem) => void;
  onOpenDetails?: (item: WishlistItem) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  items,
  onNavigate,
  onGiveUpAndSave,
  onBought,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | NeedCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'remaining' | 'price' | 'name'>('remaining');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<WishlistItem | null>(null);

  const totalPotentialSaving = items.reduce((acc, item) => acc + item.price, 0);

  const totalPuroDesejo = items
    .filter((i) => i.category === 'puro-desejo')
    .reduce((acc, item) => acc + item.price, 0);
  const totalUtil = items
    .filter((i) => i.category === 'util')
    .reduce((acc, item) => acc + item.price, 0);
  const totalEssencial = items
    .filter((i) => i.category === 'essencial')
    .reduce((acc, item) => acc + item.price, 0);

  const countPuroDesejo = items.filter((i) => i.category === 'puro-desejo').length;
  const countUtil = items.filter((i) => i.category === 'util').length;
  const countEssencial = items.filter((i) => i.category === 'essencial').length;

  const filteredItems = items
    .filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.reflectionText.toLowerCase().includes(query) ||
          (item.url && item.url.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default: remaining days
      const remA = Math.max(0, a.incubationDays - a.daysElapsed);
      const remB = Math.max(0, b.incubationDays - b.daysElapsed);
      return remA - remB;
    });

  const filteredTotal = filteredItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 sm:px-6 max-w-lg mx-auto space-y-4">
      {/* Top Title */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#181a2e] tracking-tight">
              Minha Wishlist Consciente
            </h1>
          </div>
        </div>
      </section>

      {/* Card Indicador de Valor Total dos Itens */}
      <section
        id="wishlist-total-value-card"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e5138] via-[#1b5e3f] to-[#2d6a4f] text-white p-4 sm:p-5 shadow-sm border border-[#2d6a4f]/20"
      >
        {/* Atmospheric watermarks */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#92f7c3]/15 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-[#b1f0ce]/10 blur-xl pointer-events-none" />
        <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[48px]">account_balance_wallet</span>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {/* Header row of the card */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[#b1f0ce] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[13px]">payments</span>
              <span>Valor Total</span>
            </div>
            <span className="text-[11px] text-[#b1f0ce]/90 font-medium">
              {items.length} {items.length === 1 ? 'item na lista' : 'itens na lista'}
            </span>
          </div>

          {/* Main numeric indicator */}
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs text-[#a8e7c5] font-medium block">Total acumulado na lista</span>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-0.5">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  totalPotentialSaving
                )}
              </div>
            </div>

            {/* Filtered subtotal badge if search or category is active */}
            {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 text-right">
                <span className="text-[10px] text-[#b1f0ce] uppercase font-bold tracking-wider block">
                  Na seleção ({filteredItems.length})
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    filteredTotal
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Category distribution pills */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-xs">
            <div className="flex flex-col bg-white/5 rounded-lg p-2">
              <span className="text-[10px] text-[#b1f0ce]/80 font-medium flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300 flex-shrink-0"></span>
                Puro Desejo
              </span>
              <span className="font-bold text-white text-xs mt-0.5 truncate">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  totalPuroDesejo
                )}
              </span>
            </div>

            <div className="flex flex-col bg-white/5 rounded-lg p-2">
              <span className="text-[10px] text-[#b1f0ce]/80 font-medium flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 flex-shrink-0"></span>
                Útil
              </span>
              <span className="font-bold text-white text-xs mt-0.5 truncate">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  totalUtil
                )}
              </span>
            </div>

            <div className="flex flex-col bg-white/5 rounded-lg p-2">
              <span className="text-[10px] text-[#b1f0ce]/80 font-medium flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0"></span>
                Essencial
              </span>
              <span className="font-bold text-white text-xs mt-0.5 truncate">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  totalEssencial
                )}
              </span>
            </div>
          </div>

          {/* Mindful Protection Badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#a8e7c5] bg-[#002114]/30 -mx-1 px-2.5 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[14px] text-[#92f7c3]">shield</span>
            <span>Montante protegido de compras impulsivas enquanto você reflete.</span>
          </div>
        </div>
      </section>

      {/* Search Bar & Tune Button */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#f4f2ff] px-4 py-2.5 rounded-full shadow-sm focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0f5238]/30 transition-all">
            <span className="material-symbols-outlined text-[#707973] text-[20px]">search</span>
            <input
              className="bg-transparent text-sm text-[#181a2e] placeholder:text-[#707973] w-full focus:outline-none"
              placeholder="Buscar item ou categoria..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#707973] hover:text-[#181a2e]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <div className="relative">
            <button
              aria-label="Opções de ordenação"
              className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-[#edecff] hover:bg-[#e0e0fc] active:scale-95 transition-all text-[#404943] shadow-sm cursor-pointer"
              onClick={() => setShowSortMenu(!showSortMenu)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-12 z-30 w-48 bg-white rounded-2xl shadow-xl border border-[#2d6a4f]/10 py-2 text-xs">
                <div className="px-3 py-1.5 font-semibold text-[#707973] uppercase tracking-wider text-[10px]">
                  Ordenar por
                </div>
                <button
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#f4f2ff] ${
                    sortBy === 'remaining' ? 'text-[#0f5238] font-bold' : 'text-[#181a2e]'
                  }`}
                  onClick={() => {
                    setSortBy('remaining');
                    setShowSortMenu(false);
                  }}
                  type="button"
                >
                  <span>Dias Restantes</span>
                  {sortBy === 'remaining' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
                <button
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#f4f2ff] ${
                    sortBy === 'price' ? 'text-[#0f5238] font-bold' : 'text-[#181a2e]'
                  }`}
                  onClick={() => {
                    setSortBy('price');
                    setShowSortMenu(false);
                  }}
                  type="button"
                >
                  <span>Maior Valor</span>
                  {sortBy === 'price' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
                <button
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#f4f2ff] ${
                    sortBy === 'name' ? 'text-[#0f5238] font-bold' : 'text-[#181a2e]'
                  }`}
                  onClick={() => {
                    setSortBy('name');
                    setShowSortMenu(false);
                  }}
                  type="button"
                >
                  <span>Nome A-Z</span>
                  {sortBy === 'name' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6 no-scrollbar">
          <button
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0f5238] text-white'
                : 'bg-[#e0e0fc] text-[#404943] hover:bg-[#edecff]'
            }`}
            onClick={() => setSelectedCategory('all')}
            type="button"
          >
            <span>Todos</span>
            <span
              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-black/10 text-[#404943]'
              }`}
            >
              {items.length}
            </span>
          </button>

          <button
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'puro-desejo'
                ? 'bg-[#0f5238] text-white shadow-sm'
                : 'bg-[#e0e0fc] text-[#404943] hover:bg-[#edecff]'
            }`}
            onClick={() => setSelectedCategory('puro-desejo')}
            type="button"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Puro Desejo</span>
            <span className="text-[11px] opacity-75">({countPuroDesejo})</span>
          </button>

          <button
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'util'
                ? 'bg-[#0f5238] text-white shadow-sm'
                : 'bg-[#e0e0fc] text-[#404943] hover:bg-[#edecff]'
            }`}
            onClick={() => setSelectedCategory('util')}
            type="button"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Útil</span>
            <span className="text-[11px] opacity-75">({countUtil})</span>
          </button>

          <button
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'essencial'
                ? 'bg-[#0f5238] text-white shadow-sm'
                : 'bg-[#e0e0fc] text-[#404943] hover:bg-[#edecff]'
            }`}
            onClick={() => setSelectedCategory('essencial')}
            type="button"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Essencial</span>
            <span className="text-[11px] opacity-75">({countEssencial})</span>
          </button>
        </div>
      </section>

      {/* Feed Vertical de Cards */}
      <div className="flex flex-col gap-3.5">
        {filteredItems.map((item) => {
          const categoryConfig =
            item.category === 'puro-desejo'
              ? { bg: 'bg-purple-100 text-purple-800', label: 'Puro Desejo', icon: 'flag' }
              : item.category === 'util'
              ? { bg: 'bg-amber-100 text-amber-800', label: 'Útil', icon: 'psychology' }
              : { bg: 'bg-blue-100 text-blue-800', label: 'Essencial', icon: 'balance' };

          return (
            <article
              key={item.id}
              onClick={() => setSelectedItemForDetail(item)}
              className="flex flex-col bg-white rounded-2xl p-4 shadow-sm border border-[#2d6a4f]/10 hover:border-[#0f5238]/35 hover:shadow-md transition-all duration-200 relative cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#e6e6ff] ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-200">
                    <img
                      className="w-full h-full object-cover"
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${categoryConfig.bg}`}
                      >
                        {categoryConfig.label}
                      </span>
                      <span className="text-base font-bold text-[#0f5238]">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                          item.price
                        )}
                      </span>
                    </div>

                    <h2 className="text-sm font-semibold text-[#181a2e] truncate mt-0.5 group-hover:text-[#0f5238] transition-colors">
                      {item.name}
                    </h2>

                    {item.url ? (
                      <span className="inline-flex items-center gap-1 text-[#404943]/80 text-xs truncate mt-0.5">
                        <span className="material-symbols-outlined text-[14px] text-[#0f5238]">link</span>
                        <span className="truncate underline underline-offset-2 decoration-[#0f5238]/40">
                          {item.url.replace(/^https?:\/\//, '')}
                        </span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#707973] mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">info</span>
                        Toque para ver detalhes
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setSelectedItemForDetail(item)}
                    className="p-1 rounded-full text-[#404943] hover:text-[#0f5238] hover:bg-[#edecff] transition-colors cursor-pointer"
                    title="Ver detalhes do desejo"
                    aria-label="Ver detalhes do desejo"
                  >
                    <span className="material-symbols-outlined text-[20px]">open_in_full</span>
                  </button>

                  <div className="relative">
                    <button
                      aria-label="Opções adicionais"
                      className="p-1 rounded-full text-[#404943] hover:bg-[#edecff] transition-colors cursor-pointer"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === item.id ? null : item.id)
                      }
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>

                    {activeMenuId === item.id && (
                      <div className="absolute right-0 top-8 z-30 w-44 bg-white rounded-xl shadow-xl border border-[#2d6a4f]/10 py-1 text-xs">
                        {item.reflectionText && (
                          <div className="px-3 py-2 text-[#404943] italic border-b border-[#f4f2ff]">
                            "{item.reflectionText}"
                          </div>
                        )}
                        <button
                          className="w-full text-left px-3 py-2 text-[#0f5238] hover:bg-[#f4f2ff] flex items-center gap-2 cursor-pointer"
                          onClick={() => {
                            setActiveMenuId(null);
                            setSelectedItemForDetail(item);
                          }}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          Ver detalhes e link
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-[#0f5238] hover:bg-[#f4f2ff] flex items-center gap-2 cursor-pointer border-t border-[#f4f2ff]"
                          onClick={() => {
                            setActiveMenuId(null);
                            onGiveUpAndSave(item);
                          }}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">savings</span>
                          Desistir agora
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ações do Card */}
              <div
                className="flex items-center gap-2 mt-3 pt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#0f5238]/10 hover:bg-[#0f5238]/20 active:scale-95 text-[#0f5238] text-xs font-semibold transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onGiveUpAndSave(item);
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">savings</span>
                  <span>Desisti (Economizar)</span>
                </button>
                <button
                  className="flex-none flex items-center justify-center gap-1 py-2.5 px-4 rounded-full bg-[#edecff] hover:bg-[#e0e0fc] active:scale-95 text-[#404943] text-xs font-semibold transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBought(item);
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Comprei</span>
                </button>
              </div>
            </article>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center space-y-3 shadow-sm border border-[#2d6a4f]/5">
            <div className="w-12 h-12 rounded-full bg-[#edecff] text-[#0f5238] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">filter_vintage</span>
            </div>
            <h3 className="text-base font-semibold text-[#181a2e]">Nenhum desejo encontrado</h3>
            <p className="text-xs text-[#404943] max-w-xs mx-auto">
              Nenhum item com os filtros atuais. Que tal pausar um novo desejo de consumo?
            </p>
            <button
              className="mt-2 py-2 px-4 rounded-full bg-[#0f5238] text-white text-xs font-semibold cursor-pointer"
              onClick={() => onNavigate('cadastrar-desejo')}
              type="button"
            >
              Pausar Novo Desejo
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-20 right-4 z-40 flex items-center gap-2">
        <button
          className="w-14 h-14 rounded-full bg-[#0f5238] hover:bg-[#2d6a4f] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 group cursor-pointer"
          onClick={() => onNavigate('cadastrar-desejo')}
          type="button"
          aria-label="Pausar novo desejo"
        >
          <span className="material-symbols-outlined text-[28px] transition-transform group-hover:rotate-90">
            add
          </span>
        </button>
      </div>

      {/* Modal de Detalhes do Desejo */}
      <WishDetailModal
        item={selectedItemForDetail}
        isOpen={!!selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onGiveUpAndSave={onGiveUpAndSave}
        onBought={onBought}
      />
    </div>
  );
};
