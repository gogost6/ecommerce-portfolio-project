"use client";

import { cn } from "@/lib/utils";
import { useFiltersOpenerStore } from "@/store/filters-opener-store";

export function ScreenDim() {
  const { isOpen } = useFiltersOpenerStore();

  return (
    <div
      className={cn(
        "screen-dim pointer-events-none fixed inset-0 z-10 bg-black/50 opacity-0 transition-opacity",
        isOpen && "opacity-100",
      )}
    />
  );
}
