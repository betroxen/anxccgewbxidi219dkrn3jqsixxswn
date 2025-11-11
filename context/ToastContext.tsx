
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { Icons } from '../components/icons';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000); // Auto-dismiss after 3 seconds
  }, []);

  const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-md shadow-lg border animate-slideInRight
              ${toast.type === 'success' ? 'bg-[#14131c] border-[#1ed760]/50 text-white' : 
                toast.type === 'error' ? 'bg-[#14131c] border-red-500/50 text-white' : 
                'bg-[#14131c] border-[#3a3846] text-white'}`}
          >
             {toast.type === 'success' && <Icons.CheckCircle className="h-5 w-5 text-[#1ed760]" />}
             {toast.type === 'error' && <Icons.X className="h-5 w-5 text-red-500" />}
             {toast.type === 'info' && <Icons.Info className="h-5 w-5 text-blue-400" />}
            <p className="text-sm font-medium">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="ml-4 text-[#8d8c9e] hover:text-white">
                <Icons.X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
