import { create } from 'zustand';
import { login as apiLogin, validateToken } from '../apiCalls/auth';

const useAuthStore = create((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,

  // Login function
  login: async (email, password) => {
    try {
      // Call API login function
      const data = await apiLogin(email, password);
      
      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        error: null,
      });
      
      // Store user data and token in localStorage
      localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
  },

  // Logout function
  logout: () => {
    set({ isAuthenticated: false, user: null, token: null, error: null });
    localStorage.removeItem('auth');
  },

  // Initialize function to check token validity on app load
  initialize: async () => {
    // Get stored auth data from localStorage
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { token } = JSON.parse(storedAuth);

      // Validate token with the backend
      const validatedUser = await validateToken(token);
      if (validatedUser) {
        set({ isAuthenticated: true, user: validatedUser, token });
      } else {
        set({ isAuthenticated: false, user: null, token: null, error: null });
        localStorage.removeItem('auth');
      }
    }
  },
}));

export default useAuthStore;
