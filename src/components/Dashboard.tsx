'use client';
// import { Tournament } from '../App';
import { TournamentCard } from './TournamentCard';
import { CustomPractice } from './CustomPractice';
import { Trophy, Sparkles, FileText } from 'lucide-react';
import { ITournamentGame, useGameStore } from '../store/useGameStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IReport, useReportStore } from '../store/useReportStore';
import SkeletonLoader from './ui/skeleton-loader';

export function Dashboard() {
  const navigate = useNavigate();
  const { tournametGames, selectedTournamentGame, loading, error, fetchTournamentGames, setSelectedTournamentGame } = useGameStore();
  const { report, error: reportError, loading: reportLoading, fetchReport } = useReportStore();
  const [tournaments, setTournaments] = useState<ITournamentGame[]>();
  const [reportData, setReportData] = useState<IReport | null>(null);

  const [showMCQPractice, setShowMCQPractice] = useState(false);
  const onMCQPractice = () => {
    setShowMCQPractice(true);
    navigate('/mcq');
  };

  useEffect(() => {
    fetchTournamentGames();
    fetchReport();
  }, []);

  useEffect(() => {
    setTournaments(tournametGames as any);
    setReportData(report);
  }, [tournametGames, report]);

  const onSelectTournament = (tournament: ITournamentGame) => {
    setSelectedTournamentGame(tournament);
    navigate('/game');
  };

  const onCustomPractice = (settings: {
    digitCount: number;
    operations: ('add' | 'subtract')[];
    numberCount: number;
    delay: number;
  }) => {
    const customTournament: ITournamentGame = {
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
    setSelectedTournamentGame(customTournament);
    navigate('/game');
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            My Abacus Training
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your planet and master mental math
          </p>
        </div>

        {/* MCQ Practice Button */}
        {onMCQPractice && (
          <div className="mb-8">
            <button
              onClick={onMCQPractice}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-3xl p-6 shadow-lg transition-all border border-blue-400/20 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white text-xl mb-1">MCQ Practice</h3>
                    <p className="text-blue-100 text-sm">
                      5 questions · No time limit · Step-by-step navigation
                    </p>
                  </div>
                </div>
                <div className="text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Stats Bar */}
        {reportLoading ? <SkillProgressionSkeleton /> :
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-sm border border-white/10">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl text-white">{reportLoading ? <SkeletonLoader height={30} width={30} radius={8} /> : reportData?.achievements}</span>
                </div>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl">🎯</span>
                  <span className="text-2xl text-white">{reportLoading ? <SkeletonLoader height={30} width={30} radius={8} /> : reportData?.accuracy}</span>
                </div>
                <p className="text-xs text-gray-400">Accuracy</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl">⚡</span>
                  <span className="text-2xl text-white">{reportLoading ? <SkeletonLoader height={30} width={30} radius={8} /> : reportData?.streak}</span>
                </div>
                <p className="text-xs text-gray-400">Streak</p>
              </div>
            </div>
          </div>
        }

        {/* Tournament Carousel */}
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4 px-2">Tournaments</h2>
          <div className="relative -mx-4 px-4">
            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 pb-4">
              {loading ? <TournamentCaraouselSkeleton /> : tournaments?.map((tournament) => (
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

const TournamentCaraouselSkeleton = () => {
  return (
    <div className="overflow-x-auto scrollbar-hide flex gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((tournament) => (
        <div key={tournament} className="snap-start shrink-0 w-[280px] first:ml-0">
          <SkeletonLoader height={290} width={278} radius={20} />
        </div>
      ))}
    </div>
  );
}


const SkillProgressionSkeleton = () => {
  return (
    <div style={{ marginBottom: 32 }}>
      <SkeletonLoader height={101} width={'100%'} radius={20} />
    </div>
  );
}