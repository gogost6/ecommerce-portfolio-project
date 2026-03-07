"use client";

import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";

export function CartBadge() {
  const count = useCartStore((s) => s.count);
  const setCount = useCartStore((s) => s.setCount);

  useEffect(() => {
    let cancelled = false;

    const fetchCartItems = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("cart_items")
        .select("quantity");

      if (cancelled) return;

      if (error) {
        // keep badge hidden if error
        setCount(0);
        return;
      }

      const total = (data ?? []).reduce(
        (sum, row) => sum + (row.quantity ?? 0),
        0,
      );
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
