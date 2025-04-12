import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: new Map(),

  addItem: (item) =>
    set((state) => {
      const tempCart = new Map(state.cart);
      const currentFrequency = tempCart.get(item) || 0;
      tempCart.set(item, currentFrequency + 1);
      return { cart: tempCart };
    }),

  decreaseItem: (item) =>
    set((state) => {
      const tempCart = new Map(state.cart);
      const currentFrequency = tempCart.get(item) || 0;
      if (currentFrequency <= 1) {
        tempCart.delete(item);
      } else {
        tempCart.set(item, currentFrequency - 1);
      }
      return { cart: tempCart };
    }),

  getItem: (item) => {
    return get().cart.get(item) || 0;
  },

  getTotalItems: () => {
    let total = 0;
    get().cart.forEach((frequency) => {
      total += frequency;
    });
    return total;
  },

  getAllObjects: () => {
    const tempObj = Object.fromEntries(get().cart);
    return Object.keys(tempObj);
  },

  removeItem: (item) =>
    set((state) => {
      const tempCart = new Map(state.cart);
      tempCart.delete(item);
      return { cart: tempCart };
    }),

  clearItems: () => set({ cart: new Map() }),
}));
