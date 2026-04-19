import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8428/api/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getErrorMessage = (error, fallback) => error?.response?.data?.error || error?.message || fallback;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
  isAdmin: false,

  register: async (formData) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await api.post('/register', formData);
      set({
        isLoading: false,
        message: 'რეგისტრაცია წარმატებით დასრულდა!',
      });
      return res.data;
    } catch (error) {
      const msg = getErrorMessage(error, 'Registration failed');
      set({ isLoading: false, error: msg });
      throw error;
    }
  },

  login: async (formData) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await api.post('/login', formData);
	  const user = res.data?.user ?? null;
		set({
			user,
			isAuthenticated: !!user,
			isAdmin: user?.role === 'admin',
			isLoading: false,
			message: res.data?.message || 'Login successful',
		});
      return res.data;
    } catch (error) {
      const msg = getErrorMessage(error, 'შესვლა ვერ მოხერხდა');
      set({ isLoading: false, error: msg, isAuthenticated: false, user: null, isAdmin: false, });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get('/me');
		const user = res.data?.user ?? null;
		set({
			user,
			isAuthenticated: !!user,
			isAdmin: user?.role === 'admin',
			isLoading: false,
		});
      return res.data?.user ?? null;
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
		isAdmin: false,
      });
      return null;
    }
  },

//   logout: () => {
//     set({
//       user: null,
//       isAuthenticated: false,
//       error: null,
//       message: null,
//     });
//   },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
}));