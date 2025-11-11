import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UIContextType {
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openLogin: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
  
  isReviewModalOpen: boolean;
  reviewCasinoId: string | null;
  openReviewModal: (casinoId?: string) => void;
  closeReviewModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewCasinoId, setReviewCasinoId] = useState<string | null>(null);

  const openLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  
  const openReviewModal = (casinoId?: string) => {
      setReviewCasinoId(casinoId || null);
      setIsReviewModalOpen(true);
  };
  
  const closeReviewModal = () => setIsReviewModalOpen(false);

  return (
    <UIContext.Provider value={{ 
        isAuthModalOpen, authModalTab, openLogin, openRegister, closeAuthModal,
        isReviewModalOpen, reviewCasinoId, openReviewModal, closeReviewModal
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
