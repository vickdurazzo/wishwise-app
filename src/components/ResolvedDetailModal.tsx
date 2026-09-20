import React, { useState } from 'react';
import { ResolvedItem } from '../types';

interface ResolvedDetailModalProps {
  item: ResolvedItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResolvedDetailModal: React.FC<ResolvedDetailModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const categoryConfig =
    item.category === 'puro-desejo'
      ? { bg: 'bg-purple-100 text-purple-800', label: 'Puro Desejo', icon: 'flag' }
      : item.category === 'util'
      ? { bg: 'bg-amber-100 text-amber-800', label: 'Útil', icon: 'psychology' }
      : { bg: 'bg-blue-100 text-blue-800', label: 'Essencial', icon: 'balance' };

  const isSaved = item.type === 'saved';

  const handleCopyLink = () => {
    if (item.url) {
      navigator.clipboard.writeText(item.url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#181a2e]/45 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-[#181a2e] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#f4f2ff] pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isSaved
                  ? 'bg-[#b1f0ce]/40 text-[#006c48]'
                  : 'bg-[#edecff] text-[#0f5238]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">
                {isSaved ? 'savings' : 'verified'}
              </span>
              {isSaved ? 'Economizado' : 'Compra Registrada'}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryConfig.bg}`}
            >
              <span className="material-symbols-outlined text-[13px]">{categoryConfig.icon}</span>
              {categoryConfig.label}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4f2ff] hover:bg-[#edecff] flex items-center justify-center text-[#181a2e] transition-colors cursor-pointer"
            type="button"
            aria-label="Fechar detalhes"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Hero image and Title */}
        <div className="flex items-center gap-3.5 bg-[#f4f2ff] p-3.5 rounded-2xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#e0e0fc] shadow-sm">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[#181a2e] leading-snug">
              {item.name}
            </h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-lg sm:text-xl font-extrabold ${isSaved ? 'text-[#006c48]' : 'text-[#0f5238]'}`}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  item.price
                )}
              </span>
              <span className="text-xs text-[#707973] font-medium">
                {isSaved ? 'economizados' : 'adquirido'}
              </span>
            </div>
          </div>
        </div>

        {/* Data do Registro */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f4f2ff]/60 border border-[#2d6a4f]/5 text-xs text-[#404943]">
          <span className="material-symbols-outlined text-[16px] text-[#0f5238]">calendar_today</span>
          <span>
            Registrado em: <strong className="text-[#181a2e]">{item.resolvedDate}</strong>
          </span>
        </div>

        {/* Link do Produto Section */}
        <div className="rounded-2xl border border-[#2d6a4f]/15 bg-gradient-to-br from-white to-[#f4f2ff] p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#181a2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#0f5238]">link</span>
              Link do Produto
            </span>
            {item.url && (
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-[11px] font-semibold text-[#0f5238] hover:text-[#00734d] flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-[#2d6a4f]/10 shadow-xs cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copiado!' : 'Copiar link'}</span>
              </button>
            )}
          </div>

          {item.url ? (
            <div className="flex flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#2d6a4f]/10 flex items-center justify-between gap-2">
                <span className="text-xs text-[#404943] font-mono break-all line-clamp-2 select-all">
                  {item.url}
                </span>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#0f5238] hover:bg-[#2d6a4f] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Acessar página do produto</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-white border border-dashed border-[#2d6a4f]/20 text-center">
              <p className="text-xs text-[#707973]">
                Nenhum link web anexado a este item.
              </p>
            </div>
          )}
        </div>

        {/* Reflexão Registrada */}
        {item.reflectionQuote && (
          <div className="bg-[#fdfcf9] border border-[#d8d3c5]/60 p-3.5 rounded-2xl flex flex-col gap-1.5 shadow-xs">
            <span className="text-xs font-bold text-[#49483b] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#0f5238]">psychology_alt</span>
              Reflexão
            </span>
            <p className="text-xs text-[#404943] italic leading-relaxed">
              "{item.reflectionQuote}"
            </p>
          </div>
        )}

        {/* Footer Action */}
        <div className="pt-2 border-t border-[#f4f2ff]">
          <button
            className="w-full py-3 px-4 rounded-full bg-[#edecff] hover:bg-[#e0e0fc] text-[#181a2e] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
