import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TrainingGame } from './components/TrainingGame';
import { Navigation, NavSection } from './components/Navigation';
import { ProgressPage } from './components/ProgressPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';

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
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');

  const handleTournamentSelect = (tournament: Tournament) => {
    setSelectedTournament(tournament);
  };

  const handleBackToDashboard = () => {
    setSelectedTournament(null);
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
  };

  const renderContent = () => {
    if (selectedTournament) {
      return <TrainingGame tournament={selectedTournament} onBack={handleBackToDashboard} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard 
            tournaments={tournaments} 
            onSelectTournament={handleTournamentSelect}
            onCustomPractice={handleCustomPractice}
          />
        );
      case 'progress':
        return <ProgressPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <Dashboard 
            tournaments={tournaments} 
            onSelectTournament={handleTournamentSelect}
            onCustomPractice={handleCustomPractice}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {!selectedTournament && (
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      )}
      {renderContent()}
    </div>
  );
}