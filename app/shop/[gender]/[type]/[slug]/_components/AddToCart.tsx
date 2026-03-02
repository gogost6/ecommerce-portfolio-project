import { Button } from "@/components/ui/button";

export function AddToCard({
  qty,
  incQty,
  decQty,
  outOfStock,
}: {
  qty: number;
  incQty: () => void;
  decQty: () => void;
  outOfStock: boolean;
}) {
  return (
    <div className="flex items-stretch justify-center gap-3 mb-12">
      <div className="bg-gray-100 rounded-2xl flex items-stretch">
        <button
          type="button"
          onClick={decQty}
          className="px-4 text-2xl flex items-center"
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className="px-3 flex items-center">{qty}</span>

        <button
          type="button"
          onClick={incQty}
          className="px-4 text-2xl flex items-center"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <Button className="flex-1" disabled={outOfStock}>
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
