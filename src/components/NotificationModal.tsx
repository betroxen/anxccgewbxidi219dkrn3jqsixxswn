
import React, { useEffect } from 'react';
import { Icons } from './icons';
import { Button } from './Button';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, title, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-lg bg-[#14131c] p-8 text-center shadow-2xl ring-1 ring-[#3a3846]">
        <span className="mb-4 inline-block rounded-full bg-[#00FFC0]/10 p-3 text-[#00FFC0]">
          <Icons.Zap className="h-6 w-6" />
        </span>
        <h2 className="font-heading text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-[#8d8c9e] mb-6">{message}</p>
        <Button variant="secondary" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
};
