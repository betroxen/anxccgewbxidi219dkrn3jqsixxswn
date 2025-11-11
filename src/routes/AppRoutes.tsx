import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Pages
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/DashboardPage';
import { CasinoDirectoryPage } from '../pages/CasinoDirectoryPage';
import { CasinoDetailPage } from '../pages/CasinoDetailPage';
import { BonusOffersPage } from '../pages/BonusOffersPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SupportPage } from '../pages/SupportPage';
import { FAQPage } from '../pages/FAQPage';
import { TermsOfServicePage } from '../pages/TermsOfServicePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { AboutUsPage } from '../pages/AboutUsPage';
import { AffiliatePage } from '../pages/AffiliatePage';
import { BonusCalculatorPage } from '../pages/BonusCalculatorPage';
import { LiveRTPTrackerPage } from '../pages/LiveRTPTrackerPage';
import { MissionsPage } from '../pages/MissionsPage';
import { LeaderboardPage } from '../pages/LeaderboardPage';
import { CommunityHubPage } from '../pages/CommunityHubPage';
import { MessagesPage } from '../pages/MessagesPage';
import { TournamentsPage } from '../pages/TournamentsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { ReportsPage } from '../pages/ReportsPage';
import { RewardsPage } from '../pages/RewardsPage';
import { LiveSupportPage } from '../pages/LiveSupportPage';
import { ResponsibleGamingPage } from '../pages/ResponsibleGamingPage';
import { CommercialDisclosurePage } from '../pages/CommercialDisclosurePage';
import { PartnerVettingPage } from '../pages/PartnerVettingPage';
import { ReviewMethodologyPage } from '../pages/ReviewMethodologyPage';
import { KnowledgeBasePage } from '../pages/KnowledgeBasePage';
import { StrategySandboxPage } from '../pages/StrategySandboxPage';
import { MinesGamePage } from '../pages/MinesGamePage';
import { PlinkoGamePage } from '../pages/PlinkoGamePage';
import { ProvablyFairPage } from '../pages/ProvablyFairPage';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null; // Or a loading spinner
    return user ? <>{children}</> : <HomePage />;
};


export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/commercial-disclosure" element={<CommercialDisclosurePage />} />
        <Route path="/partner-vetting" element={<PartnerVettingPage />} />
        <Route path="/review-methodology" element={<ReviewMethodologyPage />} />
        <Route path="/provably-fair" element={<ProvablyFairPage />} />
        <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/casinos" element={<ProtectedRoute><CasinoDirectoryPage /></ProtectedRoute>} />
        <Route path="/casinos/:id" element={<ProtectedRoute><CasinoDetailPage /></ProtectedRoute>} />
        <Route path="/bonus-offers" element={<ProtectedRoute><BonusOffersPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
        <Route path="/bonus-calculator" element={<ProtectedRoute><BonusCalculatorPage /></ProtectedRoute>} />
        <Route path="/rtp-tracker" element={<ProtectedRoute><LiveRTPTrackerPage /></ProtectedRoute>} />
        <Route path="/missions" element={<ProtectedRoute><MissionsPage /></ProtectedRoute>} />
        <Route path="/leaderboards" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityHubPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
        <Route path="/live-support" element={<ProtectedRoute><LiveSupportPage /></ProtectedRoute>} />
        <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />
        <Route path="/strategy-sandbox" element={<ProtectedRoute><StrategySandboxPage /></ProtectedRoute>} />
        <Route path="/strategy-sandbox/mines" element={<ProtectedRoute><MinesGamePage /></ProtectedRoute>} />
        <Route path="/strategy-sandbox/plinko" element={<ProtectedRoute><PlinkoGamePage /></ProtectedRoute>} />
        
        <Route path="*" element={<div>Page not found</div>} />
    </Route>
  </Routes>
);
