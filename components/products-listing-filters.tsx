"use client";

import { cn, parseIds } from "@/lib/utils";
import { useFiltersOpenerStore } from "@/store/filters-opener-store";
import * as Slider from "@radix-ui/react-slider";
import { ChevronDown, SlidersVertical, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type ProductsListingFiltersProps = {
  productTypes: { id: number; name: string; slug: string }[] | null;
  colors: { id: number; name: string; hex: string }[] | null;
  sizes: { id: number; name: string }[] | null;
  categories: { id: number; name: string; slug: string }[] | null;
};

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function toggleId(list: number[], id: number) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function ProductsListingFilters({
  productTypes,
  colors,
  sizes,
  categories,
}: ProductsListingFiltersProps) {
  const { isOpen, setIsOpen } = useFiltersOpenerStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([0, 500]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSelectedTypes(parseIds(searchParams.get("types") ?? undefined));
    setSelectedCategories(
      parseIds(searchParams.get("categories") ?? undefined),
    );
    setSelectedColors(parseIds(searchParams.get("colors") ?? undefined));
    setSelectedSizes(parseIds(searchParams.get("sizes") ?? undefined));

    const min = Number(searchParams.get("min") ?? 0);
    const max = Number(searchParams.get("max") ?? 500);

    setPrice([min, max]);
  }, [searchParams]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsMobile(isMobile);

    if (!isMobile) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const apply = () => {
    const sp = new URLSearchParams(searchParams.toString());

    sp.delete("p");

    if (selectedTypes.length) sp.set("types", selectedTypes.join(","));
    else sp.delete("types");

    if (selectedCategories.length)
      sp.set("categories", selectedCategories.join(","));
    else sp.delete("categories");

    if (selectedColors.length) sp.set("colors", selectedColors.join(","));
    else sp.delete("colors");

    if (selectedSizes.length) sp.set("sizes", selectedSizes.join(","));
    else sp.delete("sizes");

    sp.set("min", String(price[0]));
    sp.set("max", String(price[1]));

    const query = sp.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setIsOpen(false);
  };

  const clear = () => {
    const sp = new URLSearchParams(searchParams.toString());

    sp.delete("p");
    sp.delete("types");
    sp.delete("categories");
    sp.delete("colors");
    sp.delete("sizes");
    sp.delete("min");
    sp.delete("max");

    const query = sp.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-10 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "pointer-events-none absolute left-0 z-20 max-h-[85vh] w-full translate-y-full transform overflow-y-auto rounded-t-2xl bg-white p-5 pt-0 pb-8 opacity-0 shadow-lg md:pointer-events-auto md:relative md:block md:max-w-80 md:translate-y-0 md:rounded-lg md:border md:border-gray-100 md:opacity-100 md:shadow-none",
          {
            "pointer-events-auto -translate-y-16 opacity-100":
              isOpen && isMobile,
          },
        )}
      >
        <div className="sticky top-0 z-30 mb-5 bg-white pt-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <X
              size={24}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer md:hidden"
            />
            <SlidersVertical className="hidden text-gray-600 md:block" />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={apply}>
              Apply
            </Button>
            <Button className="flex-1" variant="secondary" onClick={clear}>
              Clear
            </Button>
          </div>
          <div className="mt-5 h-px bg-gray-100"></div>
        </div>

        <FilterSection title="Types">
          <div className="flex flex-col items-center justify-between gap-5">
            {productTypes?.map((type) => (
              <div key={type.id} className="flex w-full items-center gap-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() =>
                    setSelectedTypes((prev) => toggleId(prev, type.id))
                  }
                />
                <label
                  htmlFor={`type-${type.id}`}
                  className="cursor-pointer text-base text-gray-600"
                >
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price">
          <div>
            <Slider.Root
              value={price}
              min={0}
              max={500}
              step={1}
              onValueChange={setPrice}
              className="relative flex h-6 w-full touch-none items-center select-none"
            >
              <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
                <Slider.Range className="absolute h-full rounded-full bg-black" />
              </Slider.Track>

              <Slider.Thumb className="block h-5 w-5 rounded-full bg-black shadow-xs transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-black/20 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
              <Slider.Thumb className="block h-5 w-5 rounded-full bg-black shadow-xs transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-black/20 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
            </Slider.Root>

            <div className="mt-4 flex items-center justify-between">
              <span className="pl-9 text-sm font-medium">${price[0]}</span>
              <span className="pr-9 text-sm font-medium">${price[1]}</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Colors">
          <div className="flex flex-wrap gap-4">
            {colors?.map((color) => (
              <button
                key={color.id}
                type="button"
                aria-label={color.name}
                className={cn(
                  "h-8 w-8 rounded-full ring-1 ring-gray-200",
                  selectedColors.includes(color.id) && "ring-2 ring-black",
                )}
                style={{ backgroundColor: color.hex }}
                onClick={() =>
                  setSelectedColors((prev) => toggleId(prev, color.id))
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Size">
          <div className="flex flex-wrap gap-2">
            {sizes?.map((size) => (
              <Button
                key={size.id}
                type="button"
                variant={
                  selectedSizes.includes(size.id) ? "default" : "secondary"
                }
                size="sm"
                onClick={() =>
                  setSelectedSizes((prev) => toggleId(prev, size.id))
                }
              >
                {size.name}
              </Button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Dress Style" defaultOpen={false}>
          <div className="flex flex-col items-center justify-between gap-5">
            {categories?.map((cat) => (
              <div key={cat.id} className="flex w-full items-center gap-2">
                <Checkbox
                  id={`cat-${cat.id}`}
                  checked={selectedCategories.includes(cat.id)}
                  onCheckedChange={() =>
                    setSelectedCategories((prev) => toggleId(prev, cat.id))
                  }
                />
                <label
                  htmlFor={`cat-${cat.id}`}
                  className="cursor-pointer text-base text-gray-600"
                >
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mb-4 flex w-full items-center justify-between text-left"
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <ChevronDown
          size={16}
          className={cn("transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen
            ? "mb-6 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>

      <div className="mb-5 h-px bg-gray-100" />
    </div>
  );
}
