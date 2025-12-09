'use client';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Navigation, NavSection } from './components/Navigation';
import Login from './components/Login';
import { useUserStore } from './store/useUserStore';
import { ITournamentGame } from './store/useGameStore';
import CONSTANTS from './utils/constants';

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
    if (localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY)) {
      const authResponse = JSON.parse(
        localStorage.getItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY) as string
      );
      setAuthenticatedUser({ token: authResponse.token, email: authResponse.email });
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={setAuthenticatedUser} />
          )
        }
      />
      <Route
        path="/*"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <div
              className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col"
              style={{ paddingTop: '40px', paddingBottom: '60px' }}
            >
              <div className="flex-1 overflow-auto">
                <AppRoutes />
              </div>
              {location.pathname !== '/game' && (
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
