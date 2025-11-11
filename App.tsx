
import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { GlobalStyles } from './components/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Footer } from './sections/Footer';
import { ReviewModal } from './components/ReviewModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { CasinoDirectoryPage } from './pages/CasinoDirectoryPage';
import { CasinoDetailPage } from './pages/CasinoDetailPage';
import { BonusOffersPage } from './pages/BonusOffersPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SupportPage } from './pages/SupportPage';
import { FAQPage } from './pages/FAQPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { AffiliatePage } from './pages/AffiliatePage';
import { BonusCalculatorPage } from './pages/BonusCalculatorPage';
import { LiveRTPTrackerPage } from './pages/LiveRTPTrackerPage';
import { MissionsPage } from './pages/MissionsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { CommunityHubPage } from './pages/CommunityHubPage';
import { MessagesPage } from './pages/MessagesPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { RewardsPage } from './pages/RewardsPage';
import { LiveSupportPage } from './pages/LiveSupportPage';
import { ResponsibleGamingPage } from './pages/ResponsibleGamingPage';
import { CommercialDisclosurePage } from './pages/CommercialDisclosurePage';
import { PartnerVettingPage } from './pages/PartnerVettingPage';
import { ReviewMethodologyPage } from './pages/ReviewMethodologyPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { StrategySandboxPage } from './pages/StrategySandboxPage';
import { MinesGamePage } from './pages/MinesGamePage';
import { PlinkoGamePage } from './pages/PlinkoGamePage';
import { ProvablyFairPage } from './pages/ProvablyFairPage';

const App = () => {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // App state
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [viewingCasinoId, setViewingCasinoId] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewCasinoId, setReviewCasinoId] = useState<string | null>(null);

  useEffect(() => {
      // Placeholder for session persistence
  }, []);

  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = () => {
      setTimeout(() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
          setCurrentPage('Dashboard');
          window.scrollTo(0, 0);
      }, 400);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentPage('Home');
  };

  const handleOpenReviewModal = (casinoId?: string) => {
      setReviewCasinoId(casinoId || null);
      setIsReviewModalOpen(true);
  };

  const appContextValue: AppContextType = {
    currentPage,
    setCurrentPage: (page) => {
        if (!isLoggedIn) {
             handleOpenLogin();
             return;
        }
        setCurrentPage(page);
        setViewingCasinoId(null);
        setIsMobileNavOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    isLoggedIn,
    setViewingCasinoId
  };

  const renderContent = () => {
    if (viewingCasinoId) {
        return <CasinoDetailPage casinoId={viewingCasinoId} onBack={() => setViewingCasinoId(null)} onOpenReview={() => handleOpenReviewModal(viewingCasinoId)} />;
    }

    switch (currentPage) {
      case 'Dashboard': return <DashboardPage setViewingCasinoId={setViewingCasinoId} />;
      case 'Casino Directory': return <CasinoDirectoryPage setViewingCasinoId={setViewingCasinoId} />;
      case 'Bonus Offers': return <BonusOffersPage setViewingCasinoId={setViewingCasinoId} />;
      case 'Profile': return <ProfilePage />;
      case 'Command Console': return <SettingsPage />;
      case 'Support': return <SupportPage />;
      case 'FAQ': return <FAQPage />;
      case 'Terms of Service': return <TermsOfServicePage />;
      case 'Privacy Policy': return <PrivacyPolicyPage />;
      case 'About Us': return <AboutUsPage />;
      case 'Affiliate': return <AffiliatePage />;
      case 'Bonus Calculator': return <BonusCalculatorPage />;
      case 'RTP Tracker': return <LiveRTPTrackerPage />;
      case 'Missions': return <MissionsPage />;
      case 'Leaderboards': return <LeaderboardPage />;
      case 'Alpha Feed': return <CommunityHubPage />;
      case 'Messages': return <MessagesPage />;
      case 'Tournaments': return <TournamentsPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Reports': return <ReportsPage />;
      case 'Rewards': return <RewardsPage />;
      case 'Live Support': return <LiveSupportPage />;
      case 'Responsible Gaming': return <ResponsibleGamingPage />;
      case 'Commercial Disclosure': return <CommercialDisclosurePage />;
      case 'Partner Vetting': return <PartnerVettingPage />;
      case 'Review Methodology': return <ReviewMethodologyPage />;
      case 'Knowledge Base': return <KnowledgeBasePage />;
      case 'Strategy Sandbox': return <StrategySandboxPage />;
      case 'Mines': return <MinesGamePage />;
      case 'Plinko': return <PlinkoGamePage />;
      case 'Provably Fair': return <ProvablyFairPage />;
      default: return <DashboardPage setViewingCasinoId={setViewingCasinoId} />;
    }
  };

  // Determine if footer should be hidden for immersive pages
  const hideFooter = ['Dashboard', 'Messages', 'Strategy Sandbox', 'Mines', 'Plinko'].includes(currentPage);

  return (
    <AppContext.Provider value={appContextValue}>
      <ToastProvider>
        <GlobalStyles />
        <div className={`relative min-h-screen w-full max-w-[100vw] bg-[#0A0A0A] text-[#FAFBFF] overflow-x-hidden ${(isAuthModalOpen || isReviewModalOpen || isMobileNavOpen) ? 'modal-open' : ''}`}>
          
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            initialTab={authModalTab}
            onLoginSuccess={handleLoginSuccess}
          />

          {/* FIXED HEADER */}
          <Header 
              onOpenLogin={handleOpenLogin} 
              onOpenRegister={handleOpenRegister} 
              isLoggedIn={isLoggedIn} 
              onLogout={handleLogout}
              isSidebarCollapsed={isSidebarCollapsed}
              onOpenReview={() => handleOpenReviewModal()}
              onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />

          {!isLoggedIn ? (
            // === PUBLIC LANDING LAYOUT ===
            <div className="flex flex-col min-h-screen pt-16">
                <main className="flex-1 w-full animate-depth-in">
                    <HomePage onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} isLoggedIn={false} />
                </main>
                <Footer />
            </div>
          ) : (
            // === AUTHENTICATED APP LAYOUT ===
            <>
                <div className="flex min-h-screen pt-16">
                   <Sidebar 
                        isCollapsed={isSidebarCollapsed} 
                        setIsCollapsed={setIsSidebarCollapsed}
                        isMobileOpen={isMobileNavOpen}
                        setIsMobileOpen={setIsMobileNavOpen}
                   />
                   
                   {/* Main Content Area with smoother transition */}
                   <div className={`flex flex-1 flex-col min-w-0 w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-64'}`}>
                        <main key={currentPage} className="flex-1 w-full bg-[#0A0A0A] pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 animate-depth-in">
                            {renderContent()}
                        </main>
                        {!hideFooter && <Footer />}
                   </div>
                </div>

                <MobileBottomNav onToggleMenu={() => setIsMobileNavOpen(!isMobileNavOpen)} />
                <FloatingActionButton />
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    initialCasinoId={reviewCasinoId}
                />
            </>
          )}
        </div>
      </ToastProvider>
    </AppContext.Provider>
  );
};

export default App;
