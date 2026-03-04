"use client";

import { cn } from "@/lib/utils";
import { useFiltersOpenerStore } from "@/store/filters-opener-store";
import * as Slider from "@radix-ui/react-slider";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";

type ProductsListingFiltersProps = {
  productTypes: { id: number; name: string; slug: string }[] | null;
  colors: { id: number; name: string; hex: string }[] | null;
  sizes: { id: number; name: string }[] | null;
  categories: { id: number; name: string; slug: string }[] | null;
};

export function ProductsListingFilters({
  productTypes,
  colors,
  sizes,
  categories,
}: ProductsListingFiltersProps) {
  const { isOpen, setIsOpen } = useFiltersOpenerStore();

  return (
    <div
      className={cn(
        "p-5 bg-white rounded-t-2xl absolute z-20 w-full left-0 transform translate-y-full shadow-lg",
        { "translate-y-0": isOpen },
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Filters</h2>
        <X
          size={24}
          onClick={() => setIsOpen(false)}
          className="cursor-pointer"
        />
      </div>
      <div className="h-[1px] bg-gray-100 mb-5"></div>
      <div className="flex flex-col gap-5 justify-between items-center mb-6">
        {productTypes?.map((type) => (
          <div
            key={type.id}
            className="flex items-center justify-between w-full"
          >
            <p className="text-base text-gray-600">{type.name}</p>
            <ChevronRight size={16} />
          </div>
        ))}
      </div>
      <div className="h-[1px] bg-gray-100 mb-5"></div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">Price</h2>
        <ChevronDown size={16} />
      </div>
      <Slider.Root className="mb-5">
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
      </Slider.Root>
      <div className="h-[1px] bg-gray-100 mb-5"></div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">Colors</h2>
        <ChevronDown size={16} />
      </div>
      <div className="flex gap-4 flex-wrap mb-6">
        {colors?.map((color) => (
          <div
            key={color.id}
            className="w-8 h-8 rounded-full ring-1 ring-gray-200 ring-offset-1 cursor-pointer"
            style={{ backgroundColor: color.hex }}
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
          <Button key={size.id} variant={"secondary"} size={"sm"}>
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
          <div
            key={cat.id}
            className="flex items-center justify-between w-full"
          >
            <p className="text-base text-gray-600">{cat.name}</p>
            <ChevronRight size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}
