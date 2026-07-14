import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role, type IUserScope } from '@fln/shared';

interface AuthState {
  token: string | null;
  user: {
    _id: string;
    name: string;
    email: string;
    role: Role;
    scope: IUserScope;
  } | null;
  setAuth: (token: string, user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        localStorage.setItem('fln_token', token);
        set({ token, user });
      },
      logout: () => {
        localStorage.removeItem('fln_token');
        set({ token: null, user: null });
      },
    }),
    { name: 'fln-auth' },
  ),
);