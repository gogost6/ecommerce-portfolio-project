import { cn, DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ProductSearchResult } from "./types";

type ProductSearchResultsProps = {
  results: ProductSearchResult[];
  onSelect: () => void;
  className?: string;
};

export function ProductSearchResults({
  results,
  onSelect,
  className,
}: ProductSearchResultsProps) {
  return (
    <div
      className={cn(
        "bg-background absolute left-0 z-20 mt-2 flex w-full flex-col gap-2 rounded-sm border border-gray-100 p-1 shadow-xl transition-opacity",
        results.length > 0
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        className,
      )}
    >
      {results.map((result, index) => {
        const primaryImage =
          result.product_images?.find((img) => img.is_primary)?.url ||
          DEFAULT_PRODUCT_IMAGE_URL;

        const primaryAlt =
          result.product_images?.find((img) => img.is_primary)?.alt ||
          "Placeholder";

        return (
          <Link
            href={`/shop/${result.categories.slug}/${result.gender}/${result.product_types.slug}/${result.slug}`}
            key={result.id + "-" + index}
            onClick={onSelect}
            className="hover:bg-accent rounded-md p-2 transition-colors"
          >
            <div className="flex gap-3">
              <Image
                src={primaryImage}
                alt={primaryAlt}
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center gap-1">
                <h3 className="text-sm font-semibold">{result.title}</h3>
                <p className="text-muted-foreground text-sm">${result.price}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
