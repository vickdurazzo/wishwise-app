import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { WishlistScreen } from './components/WishlistScreen';
import { CreateWishScreen } from './components/CreateWishScreen';
import { CelebrationDetailScreen } from './components/CelebrationDetailScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { ProfileModal } from './components/ProfileModal';
import { SereneToast } from './components/SereneToast';
import { AuthScreen } from './components/AuthScreen';
import {
  INITIAL_READY_ITEMS,
  INITIAL_WISHLIST_ITEMS,
  INITIAL_RESOLVED_ITEMS,
  ASSETS,
} from './data/mockData';
import { WishlistItem, ResolvedItem, ScreenType, ToastNotification, UserProfile } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('meus-desejos');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('meus-desejos');

  // Current logged in user
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const cached = localStorage.getItem('quarentena_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // Fallback
      }
    }
    return {
      id: 'user-camila',
      name: 'Camila',
      email: 'marividurazzo@gmail.com',
      avatarUrl: ASSETS.profile,
      isAuthenticated: true,
    };
  });

  // App State with local storage persistence fallback
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const cachedWishlist = localStorage.getItem('quarentena_wishlist');
    const cachedReady = localStorage.getItem('quarentena_ready');
    if (cachedWishlist && cachedReady) {
      try {
        const w: WishlistItem[] = JSON.parse(cachedWishlist);
        const r: WishlistItem[] = JSON.parse(cachedReady);
        const ids = new Set(w.map((item) => item.id));
        return [...r.filter((item) => !ids.has(item.id)), ...w];
      } catch {
        return [...INITIAL_READY_ITEMS, ...INITIAL_WISHLIST_ITEMS];
      }
    } else if (cachedWishlist) {
      try {
        return JSON.parse(cachedWishlist);
      } catch {
        return [...INITIAL_READY_ITEMS, ...INITIAL_WISHLIST_ITEMS];
      }
    }
    return [...INITIAL_READY_ITEMS, ...INITIAL_WISHLIST_ITEMS];
  });

  const [resolvedItems, setResolvedItems] = useState<ResolvedItem[]>(() => {
    const cached = localStorage.getItem('quarentena_resolved');
    return cached ? JSON.parse(cached) : INITIAL_RESOLVED_ITEMS;
  });

  const [totalSaved, setTotalSaved] = useState<number>(() => {
    const cached = localStorage.getItem('quarentena_total_saved');
    return cached ? Number(cached) : 1450.0;
  });

  const [savedCount, setSavedCount] = useState<number>(() => {
    const cached = localStorage.getItem('quarentena_saved_count');
    return cached ? Number(cached) : 6;
  });

  const [lastSavedItem, setLastSavedItem] = useState<WishlistItem | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('quarentena_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('quarentena_resolved', JSON.stringify(resolvedItems));
  }, [resolvedItems]);

  useEffect(() => {
    localStorage.setItem('quarentena_total_saved', totalSaved.toString());
  }, [totalSaved]);

  useEffect(() => {
    localStorage.setItem('quarentena_saved_count', savedCount.toString());
  }, [savedCount]);

  useEffect(() => {
    localStorage.setItem('quarentena_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const showToast = (message: string, icon = 'celebration') => {
    const id = Date.now().toString();
    setToast({ id, message, icon });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3500);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    const guestUser: UserProfile = {
      id: 'guest',
      name: 'Convidado',
      email: '',
      isAuthenticated: false,
    };
    setCurrentUser(guestUser);
    handleNavigate('auth');
    showToast('Sessão encerrada.', 'logout');
  };

  const handleNavigate = (screen: ScreenType) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentScreen === 'cadastrar-desejo' || currentScreen === 'detalhes-desejo') {
      handleNavigate(previousScreen === currentScreen ? 'meus-desejos' : previousScreen);
    } else if (currentScreen === 'auth') {
      handleNavigate('meus-desejos');
    } else {
      handleNavigate('meus-desejos');
    }
  };

  // Give up on an item (Desistir - Economizar)
  const handleGiveUpAndSave = (item: WishlistItem) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));

    // Update totals
    const newTotal = totalSaved + item.price;
    const newCount = savedCount + 1;
    setTotalSaved(newTotal);
    setSavedCount(newCount);
    setLastSavedItem(item);

    // Add to resolved
    const newResolved: ResolvedItem = {
      id: `resolved-${Date.now()}`,
      name: item.name,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl,
      url: item.url,
      resolvedDate: 'Hoje',
      quarantineDays: item.incubationDays,
      reflectionQuote: item.reflectionText || 'Decidi esperar e percebi que não precisava.',
      type: 'saved',
    };
    setResolvedItems((prev) => [newResolved, ...prev]);

    // Open celebration screen (Screen 4)
    handleNavigate('detalhes-desejo');
    showToast(`Incrível! Você economizou R$ ${item.price.toFixed(2)} ao dispensar o item.`, 'savings');
  };

  // Confirm Conscious Buy (Ainda Quero / Comprei)
  const handleBought = (item: WishlistItem) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));

    const newResolved: ResolvedItem = {
      id: `bought-${Date.now()}`,
      name: item.name,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl,
      url: item.url,
      resolvedDate: 'Hoje',
      quarantineDays: item.incubationDays,
      reflectionQuote: item.reflectionText || 'Decisão tomada após quarentena respeitada.',
      type: 'bought',
    };
    setResolvedItems((prev) => [newResolved, ...prev]);

    showToast('Compra registrada!', 'check_circle');
  };

  // Add new wish to quarantine
  const handleAddItem = (
    itemData: Omit<WishlistItem, 'id' | 'daysElapsed' | 'status'>
  ) => {
    const newItem: WishlistItem = {
      ...itemData,
      id: `wish-${Date.now()}`,
      daysElapsed: 0,
      status: 'quarantine',
    };

    setWishlistItems((prev) => [newItem, ...prev]);
    showToast('Desejo acolhido na quarentena consciente!', 'spa');
  };

  // Reset to default demo data
  const handleResetData = () => {
    setWishlistItems([...INITIAL_READY_ITEMS, ...INITIAL_WISHLIST_ITEMS]);
    setResolvedItems(INITIAL_RESOLVED_ITEMS);
    setTotalSaved(1450.0);
    setSavedCount(6);
    setLastSavedItem(null);
    showToast('Dados restaurados com sucesso!', 'restart_alt');
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#181a2e] flex flex-col antialiased">
      {/* Toast notifications */}
      <SereneToast toast={toast} />

      {/* Top Header */}
      {currentScreen !== 'auth' && (
        <Header
          currentScreen={currentScreen}
          currentUser={currentUser}
          onNavigate={handleNavigate}
          onOpenProfile={() => setIsProfileOpen(true)}
          onBack={handleBack}
          showBack={currentScreen === 'cadastrar-desejo' || currentScreen === 'detalhes-desejo'}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full">
        {currentScreen === 'meus-desejos' && (
          <WishlistScreen
            items={wishlistItems}
            onNavigate={handleNavigate}
            onGiveUpAndSave={handleGiveUpAndSave}
            onBought={handleBought}
          />
        )}

        {currentScreen === 'cadastrar-desejo' && (
          <CreateWishScreen
            onNavigate={handleNavigate}
            onAddItem={handleAddItem}
          />
        )}

        {currentScreen === 'detalhes-desejo' && (
          <CelebrationDetailScreen
            lastSavedItem={lastSavedItem}
            totalSaved={totalSaved}
            savedCount={savedCount}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'historico-e-conquistas' && (
          <AchievementsScreen
            resolvedItems={resolvedItems}
            totalSaved={totalSaved}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            currentUser={currentUser}
            onLogin={handleLogin}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeScreen={currentScreen}
        onNavigate={handleNavigate}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => handleNavigate('auth')}
        onLogout={handleLogout}
        totalSaved={totalSaved}
        savedCount={savedCount}
        onResetData={handleResetData}
      />
    </div>
  );
}
