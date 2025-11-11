import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import { Icons } from '../components/icons';
import { useSound } from './SoundContext';

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
  const { playSound } = useSound();

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (type === 'success') playSound('success', 0.3);
    else if (type === 'error') playSound('error', 0.35);
    else playSound('info', 0.25);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }, [playSound]);

  const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-4 p-4 rounded-md shadow-[0_5px_30px_-10px_rgba(0,0,0,0.8)] border animate-slideInRight backdrop-blur-xl min-w-[300px]
              ${toast.type === 'success' ? 'bg-[#0c0c0e]/95 border-[#00FFC0]/50 text-white' : 
                toast.type === 'error' ? 'bg-[#0c0c0e]/95 border-red-500/50 text-white' : 
                'bg-[#0c0c0e]/95 border-[#3a3846] text-white'}`}
          >
             {toast.type === 'success' && <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0" />}
             {toast.type === 'error' && <Icons.AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />}
             {toast.type === 'info' && <Icons.Info className="h-5 w-5 text-blue-400 shrink-0" />}
            
            <p className="text-sm font-medium font-mono tracking-tight flex-1">{toast.message}</p>
            
            <button onClick={() => removeToast(toast.id)} className="text-[#8d8c9e] hover:text-white transition-colors shrink-0 p-1">
                <Icons.X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// FIX: Add useToast custom hook for consistency and to resolve export error.
export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};