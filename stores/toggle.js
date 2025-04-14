import { create } from "zustand";

export const useToggleStore = create((set) => ({
  vegOnly: false,
  nonVegOnly: false,

  toggleVegMode: () =>
    set((state) => {
      if (!state.vegOnly) {
        return {
          vegOnly: true,
          nonVegOnly: false,
        };
      }
      return {
        vegOnly: false,
        nonVegOnly: state.nonVegOnly,
      };
    }),

  toggleNonVegMode: () =>
    set((state) => {
      if (!state.nonVegOnly) {
        return {
          vegOnly: false,
          nonVegOnly: true,
        };
      }
      return {
        vegOnly: state.vegOnly,
        nonVegOnly: false,
      };
    }),

  clickBothMode: () => set({ vegOnly: false, nonVegOnly: false }),
}));
