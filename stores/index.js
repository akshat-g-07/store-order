import { create } from "zustand";

export const useOrderItemsStore = create((set) => ({
  orderItems: [],
  addItem: (item) =>
    set((state) => ({
      orderItems: [...state.orderItems, item],
    })),
  removeItem: (item) =>
    set((state) => ({
      orderItems: state.orderItems.filter((itm) => itm !== item),
    })),
  clearItems: () => set(() => ({ orderItems: [] })),
}));
