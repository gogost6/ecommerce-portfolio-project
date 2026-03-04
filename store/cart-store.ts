"use client";

import { create } from "zustand";

type CartState = {
  count: number;
  setCount: (count: number) => void;
  incBy: (delta: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  incBy: (delta) => set((s) => ({ count: Math.max(0, s.count + delta) })),
}));
