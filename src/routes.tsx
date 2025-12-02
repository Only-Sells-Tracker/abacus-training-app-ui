import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { ProgressPage } from './components/ProgressPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { TrainingGame } from './components/TrainingGame';

export function AppRoutes({ tournaments, onSelectTournament, onCustomPractice, selectedTournament, handleBackToDashboard, handleSignOut }: any) {
  return (
    <Routes>
      <Route path="/" element={<Dashboard tournaments={tournaments} onSelectTournament={onSelectTournament} onCustomPractice={onCustomPractice} />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage onSignOut={handleSignOut} />} />
      <Route path="/game" element={<TrainingGame tournament={selectedTournament} onBack={handleBackToDashboard} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
