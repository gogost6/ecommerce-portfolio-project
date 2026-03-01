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
    <div className="flex flex-col gap-4 mb-6">
      <p className="text-gray-600 text-sm">Select Colors</p>
      <div className="flex flex-row gap-3">
        {colors.map((c) => {
          const active = c.id === selectedColorId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedColorId(c.id)}
              className={[
                "w-8 h-8 rounded-full border-2 transition-colors focus:outline-none",
                active
                  ? "border-gray-900"
                  : "border-gray-300 hover:border-gray-600",
              ].join(" ")}
              style={{ backgroundColor: c.hex }}
              aria-label={`Select color: ${c.name}`}
            />
          );
        })}
      </div>
    </div>
  );
}
