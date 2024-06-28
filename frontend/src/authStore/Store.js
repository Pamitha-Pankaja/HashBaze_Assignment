import {create} from 'zustand';
import { login as apiLogin, register as apiRegister } from '../apiCalls/auth';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  login: async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        error: null,
      });
      localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },
 logout: () => {
    set({ isAuthenticated: false, user: null, token: null, error: null });
    localStorage.removeItem('auth');
  },
  initialize: () => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { user, token } = JSON.parse(storedAuth);
      set({ isAuthenticated: true, user, token });
    }
  },
}));

export default useAuthStore;


