import { create } from 'zustand'

export interface IAuthenticatedUser {
  token: string | null;
  email: string | null;
}

export interface IUseUserStore {
  authenticatedUser: IAuthenticatedUser;
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => void;
  removeAuthenticatedUser: () => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  authenticatedUser: {
    token: null,
    email: null,
  },
  setAuthenticatedUser: (authenticatedUser: IAuthenticatedUser) => {
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser))
    return set({ authenticatedUser: authenticatedUser })
  },
  removeAuthenticatedUser: () => {
    console.log('authenticatedUser being removed from store and localStorage');
    localStorage.removeItem('authenticatedUser')
    return set({
      authenticatedUser: {
        token: null,
        email: null,
      }
    })
  }
}))
