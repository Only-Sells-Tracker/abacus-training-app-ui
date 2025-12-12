'use client';
import { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Navigation, NavSection } from './components/Navigation';
import Login from './components/Login';
import { useUserStore } from './store/useUserStore';
import { ITournamentGame } from './store/useGameStore';
import CONSTANTS from './utils/constants';
import { useConfigStore } from './store/useConfigStore';
import { LoginScreen } from './components/LoginScreen';

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
    UXConfigLogics();
    if (localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY)) {
      const authResponse = JSON.parse(
        localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY) as string
      );
      setAuthenticatedUser({ token: authResponse.token, email: authResponse.email });
    }
  }, []);

  useEffect(() => {
    UXConfigLogics(location.pathname);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const UXConfigLogics = (pathname?: string) => {
    if (pathname === '/mcq') {
      hideFooterNavigation();
      hideTopEmptySpace();
      hideBottomEmptySpace();
    }
    else {
      showTopEmptySpace();
      showBottomEmptySpace();
      showFooterNavigation();
    }
  }

  const { FooterNavigation, TopEmptySpace, BottomEmptySpace, showTopEmptySpace, showBottomEmptySpace, showFooterNavigation, hideFooterNavigation, hideTopEmptySpace, hideBottomEmptySpace } = useConfigStore();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <Navigate to="/" replace />
          ) : (
            // <Login onLogin={setAuthenticatedUser} />
            <LoginScreen onLogin={setAuthenticatedUser} />
          )
        }
      />
      <Route
        path="/*"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <div
              className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col"
            >
              <div ref={scrollContainerRef} className="flex-1 overflow-auto">
                {TopEmptySpace && <div style={{ height: '42px' }}></div>}
                <AppRoutes />
                {BottomEmptySpace && <div style={{ height: '68px' }}></div>}
              </div>
              {FooterNavigation && location.pathname !== '/game' && (
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