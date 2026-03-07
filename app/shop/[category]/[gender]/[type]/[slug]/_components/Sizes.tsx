import { Button } from "@/components/ui/button";

export function Sizes({
  sizes,
  selectedSizeId,
  setSelectedSizeId,
  isSizeOutOfStock,
}: {
  sizes: { id: number; name: string; slug: string }[];
  selectedSizeId: number | null;
  setSelectedSizeId: (id: number) => void;
  isSizeOutOfStock: (sizeId: number) => boolean;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <p className="text-sm text-gray-600 md:text-base">Choose size</p>
      <div className="flex flex-row flex-wrap gap-3">
        {sizes.map((s) => {
          const active = s.id === selectedSizeId;
          return (
            <Button
              key={s.id}
              variant={active ? "default" : "outline"}
              onClick={() => setSelectedSizeId(s.id)}
              disabled={isSizeOutOfStock(s.id)}
              className={isSizeOutOfStock(s.id) ? "line-through" : ""}
            >
              {s.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
