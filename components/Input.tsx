
import React, { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-[4px] border border-[#333333] bg-[#1A1A1A] px-3 py-2 text-sm text-white placeholder:text-[#666666] font-mono
      transition-all duration-200
      hover:bg-[#222222] hover:border-[#444444]
      focus:outline-none focus:border-b-[3px] focus:border-[#00FFC0] focus:bg-[#0c0c0c] focus:shadow-[0_4px_20px_-5px_rgba(0,255,192,0.2)]
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
