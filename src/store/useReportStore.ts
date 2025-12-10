import { create } from 'zustand';
import axios from 'axios';
import ApiURL from '../utils/apiurl';

export interface IReport {
  sessions: number;
  accuracy: number;
  streak: number;
  achievements: number;
}

export interface IUseReportStore {
  report: IReport | null;
  error: string | null;
  loading: boolean;
  fetchReport: () => void;
}

export const useReportStore = create<IUseReportStore>(set => ({
  report: null,
  error: null,
  loading: false,
  fetchReport: async () => {
    set({ loading: true, error: null });
    try {
      const result = await axios.get(ApiURL.report.fetchProgressReport, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });
      set({ report: result.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch report', loading: false });
    }
    return;
  },
}));
