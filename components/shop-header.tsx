import { ShopHeaderFiltersBtn } from "./shop-header-filters-btn";

export default function ShopHeader({
  title,
  showingFrom,
  showingTo,
  total,
}: {
  title: string;
  showingFrom: number;
  showingTo: number;
  total: number;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mt-3 mb-6">
      <div className="min-w-0">
        <h1 className="text-3xl font-extrabold leading-tight">{title}</h1>

        <p className="text-gray-500 mt-2">
          Showing {showingFrom}-{showingTo} of {total} Products
        </p>
      </div>

      <ShopHeaderFiltersBtn />
    </div>
  );
}
