
import React from 'react';
import { Button } from '../components/Button';

interface HeroSectionProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLogin, onOpenRegister, isLoggedIn }) => {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center bg-[#0A0A0A] px-4 py-24 text-center overflow-hidden">
      
      {/* V5.2 Kinetic Background Grid - Animated */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px] animate-moving-grid"></div>
      </div>
      {/* Radial Mask for focus */}
      <div className="absolute inset-0 bg-[#0A0A0A] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,#000_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl flex flex-col items-center">
        {/* Transmission Signal */}
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-1.5 bg-[#00FFC0]/5 border border-[#00FFC0]/30 rounded-sm text-[#00FFC0] font-mono text-xs uppercase tracking-[0.3em] animate-fade-up backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFC0]"></span>
            </span>
            INCOMING TRANSMISSION //
        </div>

        {/* Main Headline - Kinetic Type Reveal */}
        <h1 className="font-orbitron text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-none mb-8 animate-depth-in drop-shadow-[0_0_25px_rgba(0,255,192,0.1)]">
          WE'RE NOT A CASINO.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FFC0] to-[#00FFC0] animate-pulse-slow">
            WE'RE THE REVOLUTION.
          </span>
        </h1>

        {/* Subheadline - Staggered Reveal */}
        <p className="mx-auto max-w-3xl text-xl text-[#8d8c9e] md:text-2xl leading-relaxed mb-12 animate-fade-up font-tactical" style={{ animationDelay: '200ms' }}>
          Your fortified gateway to a smarter, fairer crypto gambling ecosystem. Engineered by degens, hardened by unassailable data, amplified by the collective pulse.
        </p>

        {/* CTA Cluster - Final Stagger */}
        {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Button size="lg" onClick={onOpenRegister} className="shadow-[0_0_50px_rgba(0,255,192,0.4)] font-orbitron font-black uppercase tracking-[0.2em] py-8 px-16 text-lg md:text-xl animate-pulse-glow border-2 border-[#00FFC0] hover:scale-105 transition-transform">
                [ JOIN THE CIRCUIT ]
            </Button>
          </div>
        )}
      </div>
      
      {/* Decorative Bottom Fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
    </section>
  );
};
