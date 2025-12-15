import { create } from 'zustand';
import CONSTANTS from '../utils/constants';
import api from '../utils/api';

export interface IAuthenticatedUser {
  token: string | null;
  email: string | null;
}

export interface IUseUserStore {
  authenticatedUser: IAuthenticatedUser;
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => void;
  removeAuthenticatedUser: () => void;

  getOnboardingFlag: () => boolean;
  setOnboardingFlag: () => void;

  login: (email: string, password: string) => void;
  loginLoading: boolean;
  loginError: string | null;
}

export const useUserStore = create<IUseUserStore>(set => ({
  authenticatedUser: {
    token: null,
    email: null,
  },
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => {
    try {
      localStorage.setItem(
        CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY,
        JSON.stringify(authenticatedUser)
      );
      return set({ authenticatedUser: authenticatedUser });
    } catch (error) {
      console.error('Error setting authenticated user in localStorage', error);
    }
  },
  removeAuthenticatedUser: () => {
    try {
      localStorage.removeItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY);
      set({
        authenticatedUser: {
          token: null,
          email: null,
        },
      });
    } catch (error) {
      console.error('Error removing authenticated user from localStorage', error);
    }
  },

  getOnboardingFlag: () => {
    if (localStorage.getItem(CONSTANTS.ONBOARDING_FLAG_STORAGE_KEY) === 'present') {
      return false;
    } else {
      return true;
    }
  },
  setOnboardingFlag: () => {
    localStorage.setItem(CONSTANTS.ONBOARDING_FLAG_STORAGE_KEY, 'present');
  },

  loginLoading: false,
  loginError: null,
  login: async (email: string, password: string) => {
    set({ loginError: null, loginLoading: true });
    try {
      const res: any = await api.post('login', { email, password });
      const authenticatedUser = { token: res.data.access_token, email };
      localStorage.setItem(
        CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY,
        JSON.stringify(authenticatedUser)
      );
      set({ authenticatedUser: authenticatedUser });
    } catch (error) {
      set({ loginError: 'Invalid Credential', loginLoading: false });
    }
  },
}));
