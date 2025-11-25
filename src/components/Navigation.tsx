import { motion } from 'motion/react';
import { Home, TrendingUp, Trophy, Settings, User } from 'lucide-react';

export type NavSection = 'dashboard' | 'progress' | 'leaderboard' | 'profile' | 'settings';

interface NavigationProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const navItems = [
  { id: 'dashboard' as NavSection, label: 'Home', icon: Home },
  { id: 'progress' as NavSection, label: 'Progress', icon: TrendingUp },
  { id: 'leaderboard' as NavSection, label: 'Leaderboard', icon: Trophy },
  { id: 'profile' as NavSection, label: 'Profile', icon: User },
  { id: 'settings' as NavSection, label: 'Settings', icon: Settings },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🧮</span>
            </div>
            <span className="text-xl text-white hidden sm:block">Abacus Training</span>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="relative px-4 py-2 rounded-xl transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`text-base ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="relative p-2 rounded-xl transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabMobile"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`relative w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
