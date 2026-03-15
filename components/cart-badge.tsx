"use client";

import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";

export function CartBadge() {
  const count = useCartStore((s) => s.count);
  const setCount = useCartStore((s) => s.setCount);

  useEffect(() => {
    let cancelled = false;

    const fetchCartItems = async () => {
      if (cancelled) return;

      const res = await fetch("/api/cart-items/count");
      const data = await res.json();
      const total = data?.count ?? 0;

      setCount(total);
    };

    fetchCartItems();

    return () => {
      cancelled = true;
    };
  }, [setCount]);

  if (count <= 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-xs text-white">
      {count}
    </span>
  );
}
