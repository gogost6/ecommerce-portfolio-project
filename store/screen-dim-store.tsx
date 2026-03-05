"use client";

import { create } from "zustand";

type ScreenDimState = {
  isVisible: boolean;
  toggle: () => void;
  setIsVisible: (isVisible: boolean) => void;
};

export const useScreenDimStore = create<ScreenDimState>((set) => ({
  isVisible: false,
  toggle: () => set((s) => ({ isVisible: !s.isVisible })),
  setIsVisible: (isVisible) => set({ isVisible }),
}));
