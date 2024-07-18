import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../types/models';

export const AUTH_STORAGE_KEY = 'bg-polya-auth-data';

interface AuthStoreState extends Partial<IUser> {
  token: string | null;
}

interface AuthStoreActions {
  setUser(data: any): void;
  updateUser(data: Partial<IUser>): void;
  resetUser(): void;
}

export const useAuth = create<AuthStoreActions & AuthStoreState>()(
  persist(
    (set) => ({
      token: null,

      setUser(data) {
        set(data);
      },
      resetUser() {
        set({ token: null });
      },
      updateUser(data) {
        set((state) => ({
          ...state,
          ...data,
          token: state.token,
        }));
      },
    }),
    { name: AUTH_STORAGE_KEY }
  )
);
