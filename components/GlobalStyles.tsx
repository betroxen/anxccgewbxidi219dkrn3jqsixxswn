
import React from 'react';

export const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;700&family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

    :root {
      --zap-green: #00FFC0;
      --bg-dark: #0A0A0A;
      --bg-card: #14131c;
      --ease-sleek: cubic-bezier(0.4, 0, 0.2, 1);
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg-dark);
      color: #FAFBFF;
      font-family: 'Rajdhani', 'Inter', sans-serif;
      font-size: 16px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      scrollbar-color: #333333 #0A0A0A;
    }

    /* === ZAP V5.2 KINETIC SCROLLBAR === */
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 10px;
      transition: background 0.3s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #00FFC0;
    }

    /* Utility Classes */
    .font-heading { font-family: 'Orbitron', sans-serif; letter-spacing: 0.05em; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-tactical { font-family: 'Rajdhani', sans-serif; font-weight: 500; }
    .text-glow { text-shadow: 0 0 12px rgba(0, 255, 192, 0.6); }
    .transition-sleek { transition: all 0.3s var(--ease-sleek); }

    /* V5.1 Kinetic Animations */
    @keyframes depthScaleIn {
      0% { opacity: 0; transform: scale(0.98) translateY(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 192, 0.1); }
      50% { box-shadow: 0 0 30px rgba(0, 255, 192, 0.4); }
    }

    @keyframes scanline {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes movingGrid {
      0% { background-position: 0 0; }
      100% { background-position: 50px 50px; }
    }
    
    @keyframes modalEnter {
        from { opacity: 0; transform: scale(0.96) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }

    @keyframes glitchReveal {
      0% { opacity: 0; clip-path: inset(50% 0 50% 0); }
      100% { opacity: 1; clip-path: inset(0 0 0 0); }
    }

    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    .animate-depth-in { animation: depthScaleIn 0.5s var(--ease-sleek) forwards; }
    .animate-fade-up { opacity: 0; animation: fadeUp 0.6s var(--ease-sleek) forwards; }
    .animate-pulse-glow { animation: pulseGlow 4s infinite ease-in-out; }
    .animate-pulse-slow { animation: pulseGlow 6s infinite ease-in-out; }
    .animate-scanline { animation: scanline 4s linear infinite; }
    .animate-moving-grid { animation: movingGrid 10s linear infinite; }
    .animate-modal-enter { animation: modalEnter 0.4s var(--ease-sleek) forwards; }
    .animate-glitch-reveal { animation: glitchReveal 0.4s steps(5, end) forwards; }

    /* Standard Fade */
    .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    
    /* Tab Slide Animation */
    .animate-tabSlideIn { animation: tabSlideIn 0.4s var(--ease-sleek) forwards; }
    @keyframes tabSlideIn { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; transform: translateX(0); } }
    
    /* Page Load Fade */
    .page-fade-in { animation: depthScaleIn 0.4s var(--ease-sleek) forwards; }

    .animate-shimmer {
      background: linear-gradient(to right, #2a2a35 4%, #333 25%, #2a2a35 36%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
    }

    /* Modal Locking */
    body.modal-open { overflow: hidden; padding-right: 5px; /* compensate for scrollbar */ }
    
    /* Tactical Card Hover Common */
    .card-hover {
        transition: all 0.3s var(--ease-sleek);
    }
    .card-hover:hover {
        transform: translateY(-4px);
        border-color: rgba(0, 255, 192, 0.4);
        box-shadow: 0 10px 30px -10px rgba(0, 255, 192, 0.2);
    }
  `}} />
);
