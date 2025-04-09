import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addItem: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeItem: (item) =>
    set((state) => ({
      cart: state.cart.filter((itm) => itm !== item),
    })),
  clearItems: () => set(() => ({ cart: [] })),
}));
