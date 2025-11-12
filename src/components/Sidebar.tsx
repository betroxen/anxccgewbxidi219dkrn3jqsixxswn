import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from './icons';
import { sidebarNavItems } from '../constants/sidebar';
import { Button } from './Button';
import { Input } from './Input';
import { ProgressBar } from './ProgressBar';

const SidebarLink: React.FC<{ path: string; icon: React.FC<any>; children: React.ReactNode; isCollapsed: boolean; isMobile?: boolean; onClick?: () => void }> = ({ path, icon: Icon, children, isCollapsed, isMobile, onClick }) => {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      end={path === '/dashboard'} // Ensure dashboard is only active on exact path
      className={({ isActive }) => `group flex items-center gap-3 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium relative overflow-hidden
      ${isCollapsed ? 'justify-center px-2 py-3' : isMobile ? 'px-5 py-4 text-sm font-heading uppercase tracking-wider' : 'px-4 py-3 text-sm'}
      ${isActive 
        ? 'text-white bg-[#00FFC0]/5' 
        : 'text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white'}`}
    >
       {({ isActive }) => (
         <>
          {/* Active Indicator */}
          <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ease-out ${isActive ? 'bg-[#00FFC0] shadow-[0_0_12px_#00FFC0]' : 'bg-transparent group-hover:bg-[#333]'}`} />

          <Icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-[#00FFC0]' : 'group-hover:text-white'}`} aria-hidden="true" />
          <span className={`whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 block'}`}>{children}</span>
         </>
       )}
    </NavLink>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, isLoggedIn }) => {
    
    const handleNavClick = () => {
        setIsMobileOpen(false);
    }

    const groupLabels: { [key: string]: string } = {
        COM: 'Comm Grid',
        CAS: 'Operations',
        SUP: 'Support',
        TOOLS: 'Utilities'
    };

    const MobilePilotSummary = () => (
        <div className="p-5 bg-[#14131c]/50 border-b border-[#333]">
             <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <img
                    src="https://placehold.co/56x56/00FFC0/000000?text=DG"
                    alt="Profile"
                    className="h-14 w-14 rounded-xl border border-[#333]"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#00FFC0] rounded-full border-4 border-[#0c0c0e]"></div>
                </div>
                <div>
                    <div className="font-heading text-white uppercase text-sm tracking-wider">DegenGambler</div>
                    <div className="text-[10px] font-mono text-[#00FFC0] flex items-center gap-2 mt-1">
                        <Icons.Shield className="h-3 w-3" /> LVL 42 OPERATOR
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-[#8d8c9e] uppercase">
                    <span>XP TO NEXT LEVEL</span>
                    <span className="text-white">4,250 / 5,000</span>
                </div>
                <ProgressBar progress={85} className="h-1.5 bg-[#0c0c0e]" />
            </div>
        </div>
    );

    return (
    <>
      <div 
        className={`fixed inset-0 top-16 z-[80] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileOpen(false)} 
        aria-hidden="true" 
      />

      <div className={`fixed left-0 top-16 bottom-0 z-[90] w-[85vw] max-w-[300px] md:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-full flex flex-col bg-[#0c0c0e] border-r border-[#333] shadow-2xl">
             
             <div className="shrink-0">
                 {isLoggedIn && <MobilePilotSummary />}
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
                <nav className="flex flex-col gap-6">
                    {sidebarNavItems.map((group) => (
                    <div key={group.group}>
                        {group.group !== 'DAS' && (
                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#666666] mb-2 ml-5">
                             // {groupLabels[group.group] || group.group}
                        </h3>
                        )}
                        <div className="flex flex-col gap-px">
                        {group.items.map((item) => (
                            <SidebarLink
                                key={item.path}
                                path={item.path}
                                icon={item.icon}
                                isCollapsed={false}
                                isMobile={true}
                                onClick={handleNavClick}
                            >
                                {item.title}
                            </SidebarLink>
                        ))}
                        </div>
                    </div>
                    ))}
                </nav>
             </div>

             <div className="shrink-0 p-4 border-t border-[#333] bg-[#0c0c0e] pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <Button
                    variant="ghost"
                    className="w-full font-heading uppercase text-xs tracking-wider text-[#8d8c9e] hover:text-white border border-[#333] hover:bg-[#1A1A1A] h-11"
                    onClick={() => setIsMobileOpen(false)}
                >
                    <Icons.X className="h-4 w-4 mr-2" /> CLOSE TERMINAL
                </Button>
             </div>
         </div>
      </div>

      <aside 
        className={`hidden md:flex fixed left-0 top-16 bottom-0 flex-col flex-shrink-0 border-r border-[#333] bg-[#0c0c0e] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-40
        ${isCollapsed ? 'w-[72px]' : 'w-64'}`}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar py-6">
            {!isCollapsed && (
                <div className="px-4 mb-6">
                     <div className="relative group">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-4 w-4 group-focus-within:text-[#00FFC0] transition-colors" />
                        <Input placeholder="SEARCH INTEL..." className="pl-9 bg-[#1A1A1A] border-[#333] text-xs font-mono h-9 focus:border-[#00FFC0] transition-all" />
                    </div>
                </div>
            )}
             {isCollapsed && (
                <div className="flex justify-center mb-6">
                    <button className="p-2 text-[#8d8c9e] hover:text-white bg-[#1A1A1A] rounded-md border border-[#333] hover:border-[#00FFC0] transition-all">
                         <Icons.Search className="h-4 w-4" />
                    </button>
                </div>
            )}
            
            <nav className="flex flex-col gap-6">
                {sidebarNavItems.map((group) => (
                <div key={group.group}>
                    {!isCollapsed && group.group !== 'DAS' && (
                    <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#666666] px-6 mb-2">
                        // {groupLabels[group.group] || group.group}
                    </h3>
                    )}
                    <div className="flex flex-col gap-[1px]">
                    {group.items.map((item) => (
                        <SidebarLink
                            key={item.path}
                            path={item.path}
                            icon={item.icon}
                            isCollapsed={isCollapsed}
                            onClick={handleNavClick}
                        >
                            {item.title}
                        </SidebarLink>
                    ))}
                    </div>
                </div>
                ))}
            </nav>
        </div>

        <div className={`shrink-0 border-t border-[#333] bg-[#0c0c0e] p-4 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
             <Button
                variant="ghost"
                size="sm"
                className={`text-[#8d8c9e] hover:text-white border border-transparent hover:border-[#333] transition-all ${isCollapsed ? 'px-0 w-10 h-10 flex items-center justify-center' : 'w-full flex items-center justify-center gap-2'}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand" : "Collapse"}
            >
                {isCollapsed ? (
                    <Icons.ChevronRight className="h-5 w-5" />
                ) : (
                    <>
                        <Icons.ChevronLeft className="h-5 w-5" />
                        <span className="font-heading uppercase text-xs tracking-wider">COLLAPSE</span>
                    </>
                )}
            </Button>
        </div>
      </aside>
    </>
  );
};