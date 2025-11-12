
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button';
import { Icons } from '../icons';
import { ZapLogo } from '../ZapLogo';
import { useSound } from '../../context/SoundContext';
import { useAuth } from '../../auth/AuthContext';
import { useUI } from '../../context/UIContext';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarCollapsed, onToggleMobileNav }) => {
  const { user, logout } = useAuth();
  const { openLogin, openRegister, openReviewModal } = useUI();
  const { isMuted, setMuted, playSound } = useSound();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMuteToggle = () => {
      const newState = !isMuted;
      setMuted(newState);
      if (!newState) {
          setTimeout(() => playSound('ui_open', 0.4), 50);
      }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#333333] bg-[#0c0c0e]/90 backdrop-blur-xl px-4 py-3 md:px-6 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]`}>
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFC0]/50 to-transparent animate-pulse-glow"></div>

      <div className="flex items-center gap-4">
         {user && (
             <button className="text-[#8d8c9e] hover:text-[#00FFC0] transition-colors md:hidden focus:outline-none" onClick={onToggleMobileNav} aria-label="Open Menu">
                 <Icons.Menu className="h-6 w-6" aria-hidden="true" />
             </button>
         )}
         
         <NavLink to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
             <ZapLogo className="p-1.5 rounded-lg" iconClassName="h-5 w-5" />
             <span className={`font-heading text-xl font-bold text-white tracking-wider group-hover:text-glow transition-all ${user ? 'hidden sm:block' : 'block'}`}>ZAP</span>
         </NavLink>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-[#00FFC0] hover:text-[#00FFC0] hover:bg-[#00FFC0]/10 font-heading uppercase" onClick={() => openReviewModal()}>
                <Icons.Edit className="h-4 w-4" aria-hidden="true" /> Write Review
            </Button>
            <button 
                className={`transition-all duration-200 focus:outline-none ${isMuted ? 'text-[#8d8c9e] hover:text-white' : 'text-[#00FFC0] hover:text-[#00FFC0]/80'}`}
                onClick={handleMuteToggle}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
               {isMuted ? <Icons.EyeOff className="h-5 w-5" /> : <Icons.Activity className="h-5 w-5 animate-pulse-slow" />}
            </button>

            <NavLink to="/messages" className="text-[#8d8c9e] hover:text-white transition-colors relative hover:scale-110 transform duration-200 focus:outline-none" aria-label="Messages">
               <Icons.Mail className="h-5 w-5" aria-hidden="true" />
               <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#00FFC0] rounded-full border-2 border-[#0c0c0e]"></span>
            </NavLink>
            <NavLink to="/rewards" className="text-[#8d8c9e] hover:text-white transition-colors hover:scale-110 transform duration-200 focus:outline-none" aria-label="Rewards">
               <Icons.Gift className="h-5 w-5" aria-hidden="true" />
            </NavLink>

            <div className="hidden md:flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5 border border-[#00FFC0]/30 hover:border-[#00FFC0] transition-colors cursor-default" aria-label="Zap Point Balance: 1240">
                <Icons.Zap className="h-3.5 w-3.5 text-[#00FFC0]" aria-hidden="true" />
                <span className="text-xs font-bold text-white font-mono">1,240 ZP</span>
            </div>

            <div className="relative">
              <button 
                onClick={() => { setIsProfileDropdownOpen(!isProfileDropdownOpen); if(!isProfileDropdownOpen) playSound('click_secondary', 0.2); }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isProfileDropdownOpen}
                aria-label="User Menu"
              >
                <img
                  src="https://placehold.co/32x32/00FFC0/000000?text=DG"
                  alt="Profile"
                  className="h-8 w-8 rounded-md ring-1 ring-[#333333]"
                />
              </button>

              {isProfileDropdownOpen && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} aria-hidden="true"></div>
                    <div className="absolute right-0 mt-2 w-60 rounded-lg bg-[#0c0c0e] border border-[#333333] shadow-[0_0_30px_rgba(0,0,0,0.5)] py-1 z-40 animate-fadeIn origin-top-right" role="menu">
                        <div className="px-4 py-3 border-b border-[#333333] bg-[#14131c]/50">
                            <p className="text-sm font-bold text-white font-heading uppercase">{user.username}</p>
                            <p className="text-[10px] text-[#00FFC0] font-mono flex items-center gap-1 mt-1">
                                <Icons.Shield className="h-3 w-3" /> LVL 42 OPERATOR
                            </p>
                        </div>
                        <div className="p-1">
                            <NavLink to="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white transition-colors font-heading uppercase rounded-md" role="menuitem">
                                <Icons.Users className="h-4 w-4" aria-hidden="true" /> Profile Blueprint
                            </NavLink>
                            <NavLink to="/settings" onClick={() => setIsProfileDropdownOpen(false)} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white transition-colors font-heading uppercase rounded-md" role="menuitem">
                                <Icons.Settings className="h-4 w-4" aria-hidden="true" /> Command Console
                            </NavLink>
                        </div>
                        <div className="border-t border-[#333333] p-1">
                             <button onClick={() => { logout(); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors font-heading uppercase rounded-md" role="menuitem">
                                <Icons.LogOut className="h-4 w-4" aria-hidden="true" /> Terminate Session
                            </button>
                        </div>
                    </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={openLogin} className="hidden sm:flex font-heading uppercase">
              LOG IN
            </Button>
            <Button size="sm" onClick={openRegister} className="shadow-[0_0_15px_rgba(0,255,192,0.3)] font-heading uppercase tracking-wider">
              JOIN CIRCUIT
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
