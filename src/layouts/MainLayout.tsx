import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { useUI } from '@/context/UIContext';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Footer } from '@/sections/Footer';
import { AuthModal } from '@/components/modals/AuthModal';
import { ReviewModal } from '@/components/modals/ReviewModal';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Icons } from '@/components/icons';


export const MainLayout: React.FC = () => {
    const { user, loading, logout } = useAuth();
    const { 
        isAuthModalOpen,
        isReviewModalOpen,
        openLogin,
        openRegister,
    } = useUI();
    const location = useLocation();

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center gap-4 z-[999]">
                <Icons.Loader className="h-12 w-12 text-[#00FFC0] animate-spin" />
                <p className="font-mono text-[#00FFC0] uppercase tracking-widest animate-pulse">
                    SYNCING WITH THE GRID...
                </p>
            </div>
        );
    }
    
    const hideFooterFor = ['/dashboard', '/messages', '/strategy-sandbox', '/strategy-sandbox/mines', '/strategy-sandbox/plinko'];
    const hideFooter = user && hideFooterFor.some(path => location.pathname.startsWith(path));

    return (
        <div className={`relative min-h-screen w-full max-w-[100vw] bg-[#0A0A0A] text-[#FAFBFF] overflow-x-hidden ${(isAuthModalOpen || isReviewModalOpen || isMobileNavOpen) ? 'modal-open' : ''}`}>
            
            <AuthModal />

            <Header 
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
            />

            {user ? (
                <>
                    <div className="flex min-h-screen pt-16">
                        <Sidebar 
                            isCollapsed={isSidebarCollapsed} 
                            setIsCollapsed={setIsSidebarCollapsed}
                            isMobileOpen={isMobileNavOpen}
                            setIsMobileOpen={setIsMobileNavOpen}
                        />
                        
                        <div className={`flex flex-1 flex-col min-w-0 w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-64'}`}>
                            <main key={location.pathname} className="flex-1 w-full bg-[#0A0A0A] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 animate-depth-in">
                                <Outlet />
                            </main>
                            {!hideFooter && <Footer />}
                        </div>
                    </div>

                    <MobileBottomNav onToggleMenu={() => setIsMobileNavOpen(!isMobileNavOpen)} />
                    <FloatingActionButton />
                    <ReviewModal />
                </>
            ) : (
                <div className="flex flex-col min-h-screen pt-16">
                    <main className="flex-1 w-full animate-depth-in">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            )}
        </div>
    );
};