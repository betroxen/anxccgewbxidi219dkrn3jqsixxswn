import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';
import { AuthProvider } from '@/auth/AuthContext';
import { SoundProvider } from '@/context/SoundContext';
import { ToastProvider } from '@/context/ToastContext';
import { UIProvider } from '@/context/UIContext';
import { GlobalStyles } from '@/components/GlobalStyles';

const App: React.FC = () => (
    <AuthProvider>
      <SoundProvider>
        <UIProvider>
          <ToastProvider>
            <GlobalStyles />
            <Router>
              <AppRoutes />
            </Router>
          </ToastProvider>
        </UIProvider>
      </SoundProvider>
    </AuthProvider>
);

export default App;