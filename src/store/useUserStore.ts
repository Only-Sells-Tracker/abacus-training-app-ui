import { create } from 'zustand';
import CONSTANTS from '../utils/constants';

export interface IAuthenticatedUser {
  token: string | null;
  email: string | null;
}

export interface IUseUserStore {
  authenticatedUser: IAuthenticatedUser;
  onboardingUser: string | null;
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => void;
  removeAuthenticatedUser: () => void;
  setOnboardingUser: (onboardingUser: string) => void;
}

export const useUserStore = create<IUseUserStore>(set => ({
  authenticatedUser: {
    token: null,
    email: null,
  },
  onboardingUser: null,
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => {
    localStorage.setItem(
      CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY,
      JSON.stringify(authenticatedUser)
    );
    return set({ authenticatedUser: authenticatedUser });
  },
  removeAuthenticatedUser: () => {
    localStorage.removeItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY);
    return set({
      authenticatedUser: {
        token: null,
        email: null,
      },
    });
  },
  setOnboardingUser: (onboardingUser: string) => {
    localStorage.setItem(
      CONSTANTS.ONBOARDING_USER_STORAGE_KEY,
      JSON.stringify(onboardingUser)
    );
    return set({ onboardingUser });
  },
}));
