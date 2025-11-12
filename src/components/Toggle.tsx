import React from 'react';
import { useSound } from '@/context/SoundContext';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => {
  const { playSound } = useSound();

  const handleToggle = () => {
      playSound('click_secondary', 0.3);
      onChange(!checked);
  };

  return (
    <div className="flex items-center justify-between py-3">
        <div className="pr-8">
            {label && <label className="font-medium text-white block font-heading uppercase text-sm">{label}</label>}
            {description && <div className="text-sm text-[#8d8c9e] mt-1">{description}</div>}
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00FFC0] focus:ring-offset-2 focus:ring-offset-[#121212] ${
            checked ? 'bg-[#00FFC0]' : 'bg-[#333333]'
            }`}
        >
            <span className="sr-only">{typeof label === 'string' ? label : 'Toggle'}</span>
            <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                checked ? 'translate-x-5' : 'translate-x-0'
            }`}
            />
        </button>
    </div>
  );
};
