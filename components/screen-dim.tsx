"use client";

import { cn } from "@/lib/utils";
import { useFiltersOpenerStore } from "@/store/filters-opener-store";

export function ScreenDim() {
  const { isOpen } = useFiltersOpenerStore();

  return (
    <div
      className={cn(
        "screen-dim fixed inset-0 bg-black/50 z-10 opacity-0 transition-opacity pointer-events-none",
        isOpen && "opacity-100",
      )}
    />
  );
}
