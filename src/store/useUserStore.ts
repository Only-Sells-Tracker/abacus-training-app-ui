import { create } from 'zustand';
import CONSTANTS from '../utils/constants';

export interface IAuthenticatedUser {
  token: string | null;
  email: string | null;
}

export interface IUseUserStore {
  authenticatedUser: IAuthenticatedUser;
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => void;
  removeAuthenticatedUser: () => void;
}

export const useUserStore = create<IUseUserStore>(set => ({
  authenticatedUser: {
    token: null,
    email: null,
  },
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => {
    localStorage.setItem(
      CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY,
      JSON.stringify(authenticatedUser)
    );
    return set({ authenticatedUser: authenticatedUser });
  },
  removeAuthenticatedUser: () => {
    console.log('authenticatedUser being removed from store and localStorage');
    localStorage.removeItem(CONSTANTS.AUTHENTICATED_USER_STORAGE_KEY);
    return set({
      authenticatedUser: {
        token: null,
        email: null,
      },
    });
  },
}));
