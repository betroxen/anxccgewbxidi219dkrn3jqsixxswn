
import React, { forwardRef } from 'react';
import { Icons } from './icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

// V4.0 Tactical Spinner - Segmented & Adaptive
const TacticalSpinner = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'default', children, loading = false, ...props }, ref) => {
  const variants = {
    primary: 'bg-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.4)] hover:bg-[#33ffcc] hover:shadow-[0_0_30px_rgba(0,255,192,0.6)] border border-[#00FFC0] active:shadow-[0_0_40px_rgba(0,255,192,0.8)]',
    secondary: 'bg-[#1A1A1A] text-[#8d8c9e] border border-[#333333] hover:bg-[#252525] hover:text-white hover:border-white/20 active:bg-[#333]',
    ghost: 'hover:bg-[#1A1A1A] hover:text-white text-[#8d8c9e] active:bg-[#222]',
    link: 'text-[#00FFC0] underline-offset-4 hover:underline',
  };
 
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 rounded-[4px] px-3 text-xs',
    lg: 'h-12 rounded-[4px] px-8 text-base',
    icon: 'h-10 w-10',
  };
  
  // V5.0 Kinetic Feedback: active:scale-[0.98] ensures tactile press response
  const baseClasses = 'relative inline-flex items-center justify-center rounded-[4px] font-heading uppercase tracking-wider transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] overflow-hidden';
 
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
              <TacticalSpinner className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
          </div>
      )}
      <span className={`flex items-center justify-center gap-2 transition-all duration-200 ${loading ? 'invisible opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
