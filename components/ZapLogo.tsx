
import React from 'react';
import { Icons } from './icons';

interface ZapLogoProps {
  className?: string;
  iconClassName?: string;
}

export const ZapLogo: React.FC<ZapLogoProps> = ({
  className = "p-3 rounded-xl",
  iconClassName = "h-8 w-8"
}) => {
  return (
    <div className={`relative ${className} bg-[#00FFC0]/5 border border-[#00FFC0]/20 group-hover:border-[#00FFC0] group-hover:bg-[#00FFC0]/10 transition-all duration-500 overflow-hidden isolate`}>
        {/* Internal Kinetic Energy Scan */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-[#00FFC0]/30 to-transparent transition-transform duration-700 ease-in-out -z-10"></div>
        
        {/* Primary Icon Layer */}
        <Icons.Zap className={`relative z-10 ${iconClassName} text-[#00FFC0] drop-shadow-[0_0_10px_rgba(0,255,192,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,192,0.8)] transition-all duration-300`} />
    </div>
  );
};
