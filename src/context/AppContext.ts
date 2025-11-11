import { createContext } from 'react';

export interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setViewingCasinoId: (id: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
