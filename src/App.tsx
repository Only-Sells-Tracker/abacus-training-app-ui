'use client';
import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Navigation, NavSection } from './components/Navigation';
import Login from './components/Login';
import { useUserStore } from './store/useUserStore';
import { ITournamentGame } from './store/useGameStore';
import CONSTANTS from './utils/constants';
import { useConfigStore } from './store/useConfigStore';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingFlow } from './components/OnboardingFlow';

export interface Tournament {
  id: string;
  name: string;
  planet: string;
  digitCount: number;
  operations: ('add' | 'subtract' | 'multiply' | 'divide')[];
  numberCount: number;
  delay: number;
  color: string;
  icon: string;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticatedUser, setAuthenticatedUser } = useUserStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const pathToSection = (pathname: string): NavSection => {
    switch (pathname) {
      case '/progress':
        return 'progress';
      case '/leaderboard':
        return 'leaderboard';
      case '/profile':
        return 'profile';
      case '/settings':
        return 'settings';
      default:
        return 'dashboard';
    }
  };

  useEffect(() => {
    try {
      UXConfigLogics();
      // onboardingUser();
      const storedUser = localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY);
      if (storedUser) {
        const authResponse = JSON.parse(storedUser);
        setAuthenticatedUser({ token: authResponse.token, email: authResponse.email });
        console.log(authenticatedUser);
        
      }
    } finally {
      setIsAuthLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    UXConfigLogics(location.pathname);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const onboardingUser = () => {
    navigate('/onboarding');
  }

  const UXConfigLogics = (pathname?: string) => {
    if (pathname === '/mcq' || pathname === '/game' || pathname === '/paywall') {
      hideTopEmptySpace();
      hideBottomEmptySpace();
      hideFooterNavigation();
    } else {
      showTopEmptySpace();
      showBottomEmptySpace();
      showFooterNavigation();
    }
  };

  const {
    FooterNavigation,
    TopEmptySpace,
    BottomEmptySpace,
    showTopEmptySpace,
    showBottomEmptySpace,
    showFooterNavigation,
    hideFooterNavigation,
    hideTopEmptySpace,
    hideBottomEmptySpace,
  } = useConfigStore();

  if (isAuthLoading) {
    return null; // Or a loading spinner component
  }

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <Navigate to="/" replace />
          ) : (
            <OnboardingFlow />
          )
        }
      />
      <Route
        path="/login"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <Navigate to="/" replace />
          ) : (
            <LoginScreen onLogin={setAuthenticatedUser} />
          )
        }
      />
      <Route
        path="/*"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col">
              <div ref={scrollContainerRef} className="flex-1 overflow-auto">
                {TopEmptySpace && <div style={{ height: '42px' }}></div>}
                <AppRoutes />
                {BottomEmptySpace && <div style={{ height: '68px' }}></div>}
              </div>
              {FooterNavigation && (
                <Navigation
                  activeSection={pathToSection(location.pathname)}
                  onSectionChange={section =>
                    navigate(section === 'dashboard' ? '/' : `/${section}`)
                  }
                />
              )}
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
