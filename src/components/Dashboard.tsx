import { Tournament } from '../App';
import { TournamentCard } from './TournamentCard';
import { CustomPractice } from './CustomPractice';
import { Trophy, Sparkles } from 'lucide-react';

interface DashboardProps {
  tournaments: Tournament[];
  onSelectTournament: (tournament: Tournament) => void;
  onCustomPractice: (settings: {
    digitCount: number;
    operations: ('add' | 'subtract')[];
    numberCount: number;
    delay: number;
  }) => void;
}

export function Dashboard({ tournaments, onSelectTournament, onCustomPractice }: DashboardProps) {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Abacus Training
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your planet and master mental math
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-sm border border-white/10">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl text-white">0</span>
              </div>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">🎯</span>
                <span className="text-2xl text-white">0%</span>
              </div>
              <p className="text-xs text-gray-400">Accuracy</p>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">⚡</span>
                <span className="text-2xl text-white">0</span>
              </div>
              <p className="text-xs text-gray-400">Streak</p>
            </div>
          </div>
        </div>

        {/* Tournament Carousel */}
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4 px-2">Tournaments</h2>
          <div className="relative -mx-4 px-4">
            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 pb-4">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="snap-start shrink-0 w-[280px] first:ml-0">
                  <TournamentCard
                    tournament={tournament}
                    onSelect={() => onSelectTournament(tournament)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Practice Section */}
        <CustomPractice onStart={onCustomPractice} />

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Practice daily to improve your mental calculation speed</p>
        </div>
      </div>
    </div>
  );
}