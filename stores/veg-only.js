import { create } from "zustand";

export const useVegOnlyStore = create((set) => ({
  vegOnly: false,
  toggleVegMode: () =>
    set((state) => ({
      vegOnly: !state.vegOnly,
    })),
}));
