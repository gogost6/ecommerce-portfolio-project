import { Button } from "@/components/ui/button";

export function Sizes({
  sizes,
  selectedSizeId,
  setSelectedSizeId,
}: {
  sizes: { id: number; name: string; slug: string }[];
  selectedSizeId: number | null;
  setSelectedSizeId: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <p className="text-gray-600 text-sm md:text-base">Choose size</p>
      <div className="flex flex-row gap-3 flex-wrap">
        {sizes.map((s) => {
          const active = s.id === selectedSizeId;
          return (
            <Button
              key={s.id}
              variant={active ? "default" : "outline"}
              onClick={() => setSelectedSizeId(s.id)}
            >
              {s.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
