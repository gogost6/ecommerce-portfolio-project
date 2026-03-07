import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cart-store";
import { useTransition } from "react";
import { toast } from "react-toastify";

export function AddToCard({
  qty,
  incQty,
  decQty,
  outOfStock,
  variantId,
}: {
  qty: number;
  incQty: () => void;
  decQty: () => void;
  outOfStock: boolean;
  variantId: number | null;
}) {
  const [pending, startTransition] = useTransition();
  const incBy = useCartStore((s) => s.incBy);

  const handleAddToCart = async () => {
    if (outOfStock || !variantId) return;
    const supabase = createClient();
    const { error } = await supabase.rpc("add_to_cart", {
      p_variant_id: variantId,
      p_qty: qty,
    });

    if (error) {
      toast.error("Failed to add to cart");
    } else {
      toast.success("Added to cart");
      incBy(qty);
    }
  };

  return (
    <div className="flex items-stretch justify-center gap-3">
      <div className="flex items-stretch rounded-2xl bg-gray-100">
        <button
          type="button"
          onClick={decQty}
          className="flex items-center px-4 text-2xl"
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className="flex items-center px-3">{qty}</span>

        <button
          type="button"
          onClick={incQty}
          className="flex items-center px-4 text-2xl"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <Button
        className="flex-1"
        disabled={outOfStock || pending}
        onClick={() =>
          startTransition(async () => {
            await handleAddToCart();
          })
        }
      >
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
