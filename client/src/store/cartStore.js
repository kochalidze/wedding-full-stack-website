import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,

  fetchCart: async (userId) => {
    set({ loading: true });

    try {
      const res = await axios.get(`http://localhost:3000/cart/${userId}`);
      set({ cart: res.data });
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async ({ user_id, dress_id, decoration_id, quantity = 1 }) => {
    try {
      const res = await axios.post("http://localhost:3000/cart", {
        user_id,
        dress_id: dress_id || null,
        decoration_id: decoration_id || null,
        quantity
      });

      const newItem = res.data;

      set((state) => ({
        cart: [...state.cart, newItem]
      }));

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  },

  removeFromCart: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);

      set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      }));

    } catch (err) {
      console.log(err);
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      await axios.patch(`http://localhost:3000/cart/${id}`, {
        quantity
      });

      set((state) => ({
        cart: state.cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      }));

    } catch (err) {
      console.log(err);
    }
  }
}));

export default useCartStore;