"use client";

import { cn, parseIds } from "@/lib/utils";
import { useFiltersOpenerStore } from "@/store/filters-opener-store";
import * as Slider from "@radix-ui/react-slider";
import { ChevronDown, X } from "lucide-react";
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

  useEffect(() => {
    setSelectedTypes(parseIds(searchParams.get("types")));
    setSelectedCategories(parseIds(searchParams.get("categories")));
    setSelectedColors(parseIds(searchParams.get("colors")));
    setSelectedSizes(parseIds(searchParams.get("sizes")));

    const min = Number(searchParams.get("min") ?? 0);
    const max = Number(searchParams.get("max") ?? 500);

    setPrice([min, max]);
  }, [searchParams]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "p-5 pt-0 pb-8 bg-white pointer-events-none rounded-t-2xl opacity-0 absolute z-20 w-full left-0 transform translate-y-full shadow-lg max-h-[85vh] overflow-y-auto",
          { "-translate-y-16 opacity-100 pointer-events-auto": isOpen },
        )}
      >
        <div className="sticky top-0 bg-white z-30 pt-5 mb-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Filters</h2>
            <X
              size={24}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={apply}>
              Apply
            </Button>
            <Button className="flex-1" variant="secondary" onClick={clear}>
              Clear
            </Button>
          </div>
          <div className="h-[1px] bg-gray-100 mt-5"></div>
        </div>
        <div className="flex flex-col gap-5 justify-between items-center mb-6">
          {productTypes?.map((type) => (
            <div key={type.id} className="flex items-center gap-2 w-full">
              <Checkbox
                id={`type-${type.id}`}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() =>
                  setSelectedTypes((prev) => toggleId(prev, type.id))
                }
              />
              <label
                htmlFor={`type-${type.id}`}
                className="text-base text-gray-600 cursor-pointer"
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
        <div className="h-[1px] bg-gray-100 mb-5" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Price</h2>
          <ChevronDown size={16} />
        </div>

        <div className="mb-6">
          <Slider.Root
            value={price}
            min={0}
            max={500}
            step={1}
            onValueChange={setPrice}
            className="relative flex w-full touch-none select-none items-center h-6"
          >
            <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
              <Slider.Range className="absolute h-full rounded-full bg-black" />
            </Slider.Track>

            <Slider.Thumb className="block h-5 w-5 rounded-full bg-black shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50" />
            <Slider.Thumb className="block h-5 w-5 rounded-full bg-black shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50" />
          </Slider.Root>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium pl-9">${price[0]}</span>
            <span className="text-sm font-medium pr-9">${price[1]}</span>
          </div>
        </div>
        <div className="h-[1px] bg-gray-100 mb-5"></div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Colors</h2>
          <ChevronDown size={16} />
        </div>
        <div className="flex gap-4 flex-wrap mb-6">
          {colors?.map((color) => (
            <button
              key={color.id}
              type="button"
              className={cn(
                "w-8 h-8 rounded-full ring-1 ring-gray-200",
                selectedColors.includes(color.id) && "ring-2 ring-black",
              )}
              style={{ backgroundColor: color.hex }}
              onClick={() =>
                setSelectedColors((prev) => toggleId(prev, color.id))
              }
            />
          ))}
        </div>
        <div className="h-[1px] bg-gray-100 mb-5"></div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Size</h2>
          <ChevronDown size={16} />
        </div>
        <div className="flex gap-2 flex-wrap mb-5">
          {sizes?.map((size) => (
            <Button
              key={size.id}
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
        <div className="h-[1px] bg-gray-100 mb-5"></div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Dress Style</h2>
          <ChevronDown size={16} />
        </div>
        <div className="flex flex-col gap-5 justify-between items-center mb-6">
          {categories?.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 w-full">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() =>
                  setSelectedCategories((prev) => toggleId(prev, cat.id))
                }
              />
              <label
                htmlFor={`cat-${cat.id}`}
                className="text-base text-gray-600 cursor-pointer"
              >
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
