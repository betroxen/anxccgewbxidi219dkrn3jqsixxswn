import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { Icons } from '@/components/icons';

interface MobileBottomNavProps {
    onToggleMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onToggleMenu }) => {
    const { user } = useAuth();

    if (!user) return null;

    const navItems = [
        { path: '/dashboard', label: 'HQ', icon: Icons.LayoutDashboard },
        { path: '/casinos', label: 'GRID', icon: Icons.Server },
        { path: '/missions', label: 'OPS', icon: Icons.Target },
        { path: '/messages', label: 'COMMS', icon: Icons.Mail },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 z-[60] w-full bg-[#0c0c0e]/95 backdrop-blur-xl border-t border-[#333] shadow-[0_-5px_30px_rgba(0,0,0,0.8)] pb-[env(safe-area-inset-bottom)]">
            <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FFC0]/40 to-transparent"></div>
            
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                            `flex flex-1 flex-col items-center justify-center h-full relative group active:scale-95 transition-transform ${isActive ? 'is-active' : ''}`
                        }
                        aria-label={item.label}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute top-0 left-[35%] right-[35%] h-[2px] bg-[#00FFC0] shadow-[0_2px_12px_#00FFC0]"></div>
                                )}
                                <item.icon 
                                    className={`h-5 w-5 mb-1.5 transition-all duration-300 ${isActive ? 'text-[#00FFC0] -translate-y-0.5 drop-shadow-[0_0_8px_rgba(0,255,192,0.4)]' : 'text-[#8d8c9e] group-hover:text-[#FAFBFF]'}`} 
                                />
                                <span className={`text-[9px] font-mono uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-[#8d8c9e] group-hover:text-[#FAFBFF]'}`}>
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
                <button
                    onClick={onToggleMenu}
                    className="flex flex-1 flex-col items-center justify-center h-full relative group active:scale-95 transition-transform"
                    aria-label="Menu"
                >
                    <Icons.Menu className="h-5 w-5 mb-1.5 text-[#8d8c9e] group-hover:text-[#FAFBFF]" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#8d8c9e] group-hover:text-[#FAFBFF]">
                        MENU
                    </span>
                </button>
            </div>
        </div>
    );
};