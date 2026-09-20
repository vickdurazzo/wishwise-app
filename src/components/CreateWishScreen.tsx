import React, { useState, useRef } from 'react';
import { ASSETS } from '../data/mockData';
import { WishlistItem, NeedCategory, ScreenType } from '../types';

interface CreateWishScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddItem: (item: Omit<WishlistItem, 'id' | 'daysElapsed' | 'status'>) => void;
}

export const CreateWishScreen: React.FC<CreateWishScreenProps> = ({
  onNavigate,
  onAddItem,
}) => {
  const [name, setName] = useState('Tênis casual esportivo edição retrô');
  const [price, setPrice] = useState('349,90');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [imageUploadTab, setImageUploadTab] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<NeedCategory>('util');
  const [incubationDays] = useState<number>(14);
  const [reflectionText, setReflectionText] = useState(
    'Vi uma promoção relâmpago no feed e senti vontade de trocar o meu par antigo. Mas ele ainda está confortável e inteiro.'
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    // Parse price safely
    const cleanPrice = parseFloat(
      price.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')
    ) || 0;

    // Pick custom image or fallback based on category
    let selectedImage = imageUrl.trim();
    if (!selectedImage) {
      if (category === 'essencial') selectedImage = ASSETS.monitorArm;
      else if (category === 'util') selectedImage = ASSETS.powerStrip;
      else selectedImage = ASSETS.windbreaker;
    }

    onAddItem({
      name: name.trim(),
      price: cleanPrice,
      url: url.trim() || undefined,
      imageUrl: selectedImage,
      category,
      incubationDays,
      reflectionText: reflectionText.trim(),
    });

    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col w-full pb-16 pt-20 px-4 sm:px-6 max-w-lg mx-auto space-y-4">
      {/* Form Container */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Item Details Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-[#2d6a4f]/5 flex flex-col gap-3.5">
          {/* Field 1: Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#181a2e] flex items-center justify-between" htmlFor="itemName">
              <span>O que você deseja comprar?</span>
              <span className="text-[#404943] text-[11px] font-normal">Obrigatório</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                shopping_bag
              </span>
              <input
                className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                id="itemName"
                placeholder="Ex: Tênis casual de corrida, Smartwatch..."
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Field 2: Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#181a2e]" htmlFor="itemPrice">
              Qual é o valor aproximado?
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs text-[#0f5238] font-bold">R$</span>
              <input
                className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm font-semibold rounded-xl pl-11 pr-4 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all"
                id="itemPrice"
                placeholder="0,00"
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Field 3: Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#181a2e] flex items-center justify-between" htmlFor="itemUrl">
              <span>Link do produto ou loja</span>
              <span className="text-[#707973] text-[11px] font-normal">Opcional</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                link
              </span>
              <input
                className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                id="itemUrl"
                placeholder="Cole o link aqui para rever depois..."
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Field 4: Image */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#f4f2ff]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#181a2e] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#0f5238]">photo_camera</span>
                <span>Imagem do produto</span>
              </label>

              {/* Mode switch */}
              <div className="flex items-center gap-1 p-0.5 bg-[#f4f2ff] rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageUploadTab('upload')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    imageUploadTab === 'upload'
                      ? 'bg-white text-[#0f5238] shadow-xs'
                      : 'text-[#707973] hover:text-[#181a2e]'
                  }`}
                >
                  Arquivo
                </button>
                <button
                  type="button"
                  onClick={() => setImageUploadTab('url')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    imageUploadTab === 'url'
                      ? 'bg-white text-[#0f5238] shadow-xs'
                      : 'text-[#707973] hover:text-[#181a2e]'
                  }`}
                >
                  Link URL
                </button>
              </div>
            </div>

            {imageUrl ? (
              /* Image Preview Card */
              <div className="relative flex items-center gap-3 p-2.5 rounded-xl bg-[#f4f2ff] border border-[#2d6a4f]/15">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-xs">
                  <img
                    src={imageUrl}
                    alt="Pré-visualização do produto"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      // Fallback if URL fails to load
                      setImageUrl('');
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                  <span className="text-xs font-semibold text-[#181a2e] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#0f5238]">check_circle</span>
                    Imagem selecionada
                  </span>
                  <span className="text-[11px] text-[#707973] truncate">
                    {imageUrl.startsWith('data:') ? 'Foto carregada do dispositivo' : imageUrl}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {imageUploadTab === 'upload' && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 rounded-lg text-[#0f5238] hover:bg-white transition-colors cursor-pointer"
                      title="Trocar imagem"
                      aria-label="Trocar imagem"
                    >
                      <span className="material-symbols-outlined text-[18px]">cached</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="p-1.5 rounded-lg text-[#ba1a1a] hover:bg-white transition-colors cursor-pointer"
                    title="Remover imagem"
                    aria-label="Remover imagem"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ) : imageUploadTab === 'upload' ? (
              /* Drag and Drop Zone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${
                  isDragging
                    ? 'border-[#0f5238] bg-[#0f5238]/10 scale-[1.01]'
                    : 'border-[#2d6a4f]/25 bg-[#f4f2ff]/60 hover:bg-[#f4f2ff] hover:border-[#0f5238]/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0f5238] mb-1.5">
                  <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
                </div>
                <p className="text-xs font-semibold text-[#181a2e]">
                  Arraste uma foto ou clique para escolher
                </p>
                <p className="text-[11px] text-[#707973] mt-0.5">
                  PNG, JPG ou WEBP do seu aparelho
                </p>
              </div>
            ) : (
              /* URL Input Field */
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#707973] text-[20px]">
                  image
                </span>
                <input
                  className="w-full bg-[#f4f2ff] text-[#181a2e] text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:bg-white focus:ring-1 focus:ring-[#0f5238]/30 transition-all placeholder:text-[#707973]"
                  placeholder="https://exemplo.com/foto-produto.jpg"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Classification of Need */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold text-[#181a2e]">Classificação de Necessidade</h3>
            <span className="text-[#707973] text-[11px]">Seja honesto(a)</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Option 1: Essencial */}
            <div
              className={`relative flex items-center p-3.5 rounded-xl cursor-pointer shadow-sm border transition-all ${
                category === 'essencial'
                  ? 'bg-[#92f7c3]/30 border-[#0f5238]/30'
                  : 'bg-white border-transparent hover:bg-[#f4f2ff]'
              }`}
              onClick={() => setCategory('essencial')}
            >
              <div className="w-full flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e0e0fc] flex items-center justify-center text-[#0f5238] flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#181a2e]">Essencial</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e0e0fc] text-[#404943] text-[10px] font-semibold">
                      Prioritário
                    </span>
                  </div>
                  <p className="text-[11px] text-[#404943] truncate">
                    Preciso para a minha rotina básica, trabalho ou saúde.
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    category === 'essencial'
                      ? 'bg-[#0f5238] text-white shadow-sm'
                      : 'bg-[#edecff] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              </div>
            </div>

            {/* Option 2: Útil */}
            <div
              className={`relative flex items-center p-3.5 rounded-xl cursor-pointer shadow-sm border transition-all ${
                category === 'util'
                  ? 'bg-[#92f7c3]/30 border-[#0f5238]/30'
                  : 'bg-white border-transparent hover:bg-[#f4f2ff]'
              }`}
              onClick={() => setCategory('util')}
            >
              <div className="w-full flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#92f7c3] flex items-center justify-center text-[#00734d] flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lightbulb
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#181a2e]">Útil</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#92f7c3] text-[#00734d] text-[10px] font-bold">
                      Prático
                    </span>
                  </div>
                  <p className="text-[11px] text-[#404943] truncate">
                    Facilita algo prático, mas posso viver sem por um tempo.
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    category === 'util'
                      ? 'bg-[#0f5238] text-white shadow-sm'
                      : 'bg-[#edecff] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              </div>
            </div>

            {/* Option 3: Puro Desejo */}
            <div
              className={`relative flex items-center p-3.5 rounded-xl cursor-pointer shadow-sm border transition-all ${
                category === 'puro-desejo'
                  ? 'bg-[#92f7c3]/30 border-[#0f5238]/30'
                  : 'bg-white border-transparent hover:bg-[#f4f2ff]'
              }`}
              onClick={() => setCategory('puro-desejo')}
            >
              <div className="w-full flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e6e6ff] flex items-center justify-center text-[#2d6a4f] flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#181a2e]">Puro Desejo</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#edecff] text-[#181a2e] text-[10px] font-semibold">
                      Estético / Status
                    </span>
                  </div>
                  <p className="text-[11px] text-[#404943] truncate">
                    É lazer, empolgação passageira ou novidade de vitrine.
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    category === 'puro-desejo'
                      ? 'bg-[#0f5238] text-white shadow-sm'
                      : 'bg-[#edecff] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mindful Reflection Card */}
        <div className="bg-[#2d6a4f] text-white p-4 sm:p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#b1f0ce] text-[#002114] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Espaço de Reflexão Consciente</h4>
                <p className="text-[11px] text-[#a8e7c5]">O coração da sua serenidade financeira</p>
              </div>
            </div>

            <p className="text-xs text-[#95d4b3]">
              Por que você quer adquirir isso agora? O que realmente muda na sua rotina se você aguardar?
            </p>

            <textarea
              className="w-full bg-white text-[#181a2e] text-xs sm:text-sm rounded-xl p-3 outline-none shadow-inner placeholder:text-[#707973] resize-none"
              placeholder="Ex: Vi uma promoção e achei incrível, mas já possuo algo semelhante que cumpre o papel..."
              rows={3}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
            />

            <div className="flex items-center gap-2 pt-0.5 text-[#a8e7c5] text-[11px]">
              <span className="material-symbols-outlined text-[16px]">nature_people</span>
              <span>Ao nomear a emoção, o impulso perde a urgência.</span>
            </div>
          </div>
        </div>

        {/* Submission CTA */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            className="w-full py-4 px-6 rounded-full bg-[#0f5238] text-white text-sm font-bold shadow-md hover:bg-[#2d6a4f] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            type="submit"
          >
            <span>Salvar</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[#404943] text-xs text-center">
            <span className="material-symbols-outlined text-[15px] text-[#0f5238]">verified_user</span>
            <span>Sem alertas invasivos. Apenas clareza e paz mental.</span>
          </div>
        </div>
      </form>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#181a2e]/40 backdrop-blur-sm flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white text-[#181a2e] w-full max-w-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#92f7c3] text-[#00734d] flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Desejo Acolhido</h3>
            <p className="text-xs sm:text-sm text-[#404943] mb-6 leading-relaxed">
              Seu item está seguro no ninho da reflexão. Respire fundo: o autocontrole acabou de vencer.
            </p>
            <button
              className="w-full py-3 px-6 rounded-full bg-[#0f5238] hover:bg-[#2d6a4f] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              onClick={() => {
                setShowSuccessModal(false);
                onNavigate('meus-desejos');
              }}
              type="button"
            >
              Voltar à Lista
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
