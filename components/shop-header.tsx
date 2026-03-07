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
    <div className="mt-3 mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl leading-tight font-extrabold">{title}</h1>

        <p className="mt-2 text-gray-500">
          Showing {showingFrom}-{showingTo} of {total} Products
        </p>
      </div>

      <ShopHeaderFiltersBtn />
    </div>
  );
}
