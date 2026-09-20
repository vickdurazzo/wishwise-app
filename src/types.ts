export type NeedCategory = 'essencial' | 'util' | 'puro-desejo';

export type QuarantineStatus = 'quarantine' | 'ready' | 'saved' | 'bought';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  url?: string;
  imageUrl: string;
  category: NeedCategory;
  incubationDays: number;
  daysElapsed: number;
  reflectionText: string;
  status: QuarantineStatus;
  readyDate?: string;
  resolvedDate?: string;
  resolvedNote?: string;
}

export interface ResolvedItem {
  id: string;
  name: string;
  price: number;
  category: NeedCategory;
  imageUrl: string;
  resolvedDate: string;
  quarantineDays: number;
  reflectionQuote?: string;
  type: 'saved' | 'bought';
  url?: string;
}

export type ScreenType = 
  | 'meus-desejos'
  | 'cadastrar-desejo'
  | 'detalhes-desejo'
  | 'historico-e-conquistas'
  | 'perfil-e-configuracoes'
  | 'auth';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isAuthenticated: boolean;
}

export interface ToastNotification {
  id: string;
  message: string;
  icon: string;
  type?: 'success' | 'info';
}
