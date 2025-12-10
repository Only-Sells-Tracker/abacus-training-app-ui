import { create } from 'zustand';
import axios from 'axios';
import ApiURL from '../utils/apiurl';

export interface ITournamentGame {
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

export interface IUseGameStore {
  tournametGames: ITournamentGame[] | null;
  selectedTournamentGame: ITournamentGame | null;
  error: string | null;
  loading: boolean;
  fetchTournamentGames: () => void;
  setSelectedTournamentGame: (tournament: ITournamentGame) => void;
}

export const useGameStore = create<IUseGameStore>(set => ({
  tournametGames: null,
  selectedTournamentGame: null,
  error: null,
  loading: false,
  fetchTournamentGames: async () => {
    set({ loading: true, error: null });
    try {
      const reult = await axios.get(ApiURL.game.fetchTournamentGame, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });
      set({ tournametGames: reult.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch report', loading: false });
    }
    return;
  },
  setSelectedTournamentGame: (tournament: ITournamentGame) => {
    set({ selectedTournamentGame: tournament });
  },
}));
