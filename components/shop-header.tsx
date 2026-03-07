import { cn } from "@/lib/utils";
import { ShopHeaderFiltersBtn } from "./shop-header-filters-btn";
import { ShopHeaderSortByDropdown } from "./shop-header-sort-by-dropdown";

type ShopHeaderProps = {
  title: string;
  showingFrom: number;
  showingTo: number;
  total: number;
  className?: string;
};

export default function ShopHeader({
  title,
  showingFrom,
  showingTo,
  total,
  className,
}: ShopHeaderProps) {
  return (
    <div
      className={cn(
        "mt-3 mb-6 flex items-end justify-between gap-4",
        className,
      )}
    >
      <div className="flex w-full items-center gap-4 md:justify-between">
        <h1 className="text-3xl leading-tight font-extrabold">{title}</h1>

        <div className="flex items-center justify-center gap-3">
          <p className="text-gray-500">
            Showing {showingFrom}-{showingTo} of {total} Products
          </p>
          <div className="hidden gap-1 md:flex">
            <p className="text-base">Sort by:</p> <ShopHeaderSortByDropdown />
          </div>
        </div>
      </div>

      <ShopHeaderFiltersBtn />
    </div>
  );
}
