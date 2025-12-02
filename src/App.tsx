import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Dashboard } from './components/Dashboard';
import { TrainingGame } from './components/TrainingGame';
import { Navigation, NavSection } from './components/Navigation';
import { ProgressPage } from './components/ProgressPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import Login from './components/Login';
import { LoginResponse } from './components/Login';
import { IAuthenticatedUser, IUseUserStore, useUserStore } from './store/useUserStore';

export interface Tournament {
  id: string;
  name: string;
  planet: string;
  digitCount: number;
  operations: ('add' | 'subtract')[];
  numberCount: number;
  delay: number;
  color: string;
  icon: string;
}

const tournaments: Tournament[] = [
  {
    id: '1',
    name: 'Pluto',
    planet: 'Pluto',
    digitCount: 3,
    operations: ['add', 'subtract'],
    numberCount: 5,
    delay: 1000,
    color: 'from-slate-400 to-slate-600',
    icon: '🪐'
  },
  {
    id: '2',
    name: 'Mercury',
    planet: 'Mercury',
    digitCount: 2,
    operations: ['add'],
    numberCount: 4,
    delay: 1500,
    color: 'from-orange-400 to-orange-600',
    icon: '☿️'
  },
  {
    id: '3',
    name: 'Venus',
    planet: 'Venus',
    digitCount: 3,
    operations: ['add'],
    numberCount: 6,
    delay: 1200,
    color: 'from-yellow-400 to-amber-600',
    icon: '♀️'
  },
  {
    id: '4',
    name: 'Mars',
    planet: 'Mars',
    digitCount: 4,
    operations: ['add', 'subtract'],
    numberCount: 7,
    delay: 900,
    color: 'from-red-400 to-red-600',
    icon: '♂️'
  },
  {
    id: '5',
    name: 'Jupiter',
    planet: 'Jupiter',
    digitCount: 5,
    operations: ['add', 'subtract'],
    numberCount: 8,
    delay: 800,
    color: 'from-orange-500 to-yellow-600',
    icon: '♃'
  },
  {
    id: '6',
    name: 'Saturn',
    planet: 'Saturn',
    digitCount: 4,
    operations: ['add', 'subtract'],
    numberCount: 10,
    delay: 700,
    color: 'from-yellow-500 to-amber-700',
    icon: '♄'
  },
  {
    id: '7',
    name: 'Uranus',
    planet: 'Uranus',
    digitCount: 5,
    operations: ['add', 'subtract'],
    numberCount: 9,
    delay: 750,
    color: 'from-cyan-400 to-blue-600',
    icon: '♅'
  },
  {
    id: '8',
    name: 'Neptune',
    planet: 'Neptune',
    digitCount: 6,
    operations: ['add', 'subtract'],
    numberCount: 12,
    delay: 600,
    color: 'from-blue-500 to-indigo-700',
    icon: '♆'
  }
];

export default function App() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticatedUser, setAuthenticatedUser, removeAuthenticatedUser } = useUserStore();

  const handleTournamentSelect = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    navigate('/game');
  };

  const handleBackToDashboard = () => {
    setSelectedTournament(null);
    navigate('/');
  };

  const handleCustomPractice = (settings: {
    digitCount: number;
    operations: ('add' | 'subtract')[];
    numberCount: number;
    delay: number;
  }) => {
    const customTournament: Tournament = {
      id: 'custom',
      name: 'Custom Practice',
      planet: 'Custom Practice',
      digitCount: settings.digitCount,
      operations: settings.operations,
      numberCount: settings.numberCount,
      delay: settings.delay,
      color: 'from-purple-500 to-pink-600',
      icon: '⚙️'
    };
    setSelectedTournament(customTournament);
    navigate('/game');
  };

  const handleSignOut = () => {
    console.log('1 authenticatedUser being removed from store and localStorage');
    removeAuthenticatedUser();
    // navigate('/login');
  };

  // Map path to NavSection
  const pathToSection = (pathname: string): NavSection => {
    switch (pathname) {
      case '/progress': return 'progress';
      case '/leaderboard': return 'leaderboard';
      case '/profile': return 'profile';
      case '/settings': return 'settings';
      default: return 'dashboard';
    }
  };

  useEffect(() => {
    if (localStorage.getItem('authenticatedUser')) {
      console.log('authenticatedUser now [] if authed BEFORE', authenticatedUser);
      const authResponse = JSON.parse(localStorage.getItem('authenticatedUser') as string);
      setAuthenticatedUser({ token: authResponse.token, email: authResponse.email });
      console.log('authenticatedUser now [] if authed AFTER', authenticatedUser);
    } else {
      console.log('authenticatedUser now [] if NOT authed', authenticatedUser);
    }
    // if (authenticatedUser && authenticatedUser.token) {
    //   console.log('user now [] if authed', user);
    //   console.log('authenticatedUser now [] if authed', authenticatedUser);
    // } else {
    //   console.log('user now [] if NOT authed', user);
    //   console.log('authenticatedUser now [] if NOT authed', authenticatedUser);
    // }
  }, []);

  useEffect(() => {
    if (authenticatedUser && authenticatedUser.token) {
      console.log('authenticatedUser now [authenticatedUser] if authed', authenticatedUser);
    } else {
      console.log('authenticatedUser now [authenticatedUser] if NOT authed', authenticatedUser);
    }
  }, [authenticatedUser]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          authenticatedUser && authenticatedUser.token ? <Navigate to="/" replace /> : <Login onLogin={setAuthenticatedUser} />
        }
      />
      <Route
        path="/*"
        element={
          authenticatedUser && authenticatedUser.token ? (
            <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col" style={{ paddingTop: '40px' }}>
              <div className="flex-1 overflow-auto">
                <AppRoutes
                  tournaments={tournaments}
                  onSelectTournament={handleTournamentSelect}
                  onCustomPractice={handleCustomPractice}
                  selectedTournament={selectedTournament}
                  handleBackToDashboard={handleBackToDashboard}
                  handleSignOut={handleSignOut}
                />
              </div>
              {location.pathname !== '/game' && (
                <Navigation activeSection={pathToSection(location.pathname)} onSectionChange={section => navigate(section === 'dashboard' ? '/' : `/${section}`)} />
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