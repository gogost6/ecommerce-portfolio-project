import { Check } from "lucide-react";

export function Colors({
  colors,
  selectedColorId,
  setSelectedColorId,
}: {
  colors: { id: number; name: string; slug: string; hex: string }[];
  selectedColorId: number | null;
  setSelectedColorId: (id: number) => void;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <p className="text-sm text-gray-600 md:text-base">Select Colors</p>
      <div className="flex flex-row gap-3">
        {colors.map((c) => {
          const active = c.id === selectedColorId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedColorId(c.id)}
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors focus:outline-hidden",
                active
                  ? "border-gray-900"
                  : "border-gray-300 hover:border-gray-600",
              ].join(" ")}
              style={{ backgroundColor: c.hex }}
              aria-label={`Select color: ${c.name}`}
            >
              {active && (
                <Check
                  className={c.name === "White" ? "text-black" : "text-white"}
                  size={20}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
