import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { ProductsListingFilters } from "./products-listing-filters";

export type ProductCardParams =
  Database["public"]["Tables"]["products"]["Row"] & {
    alt?: string;
    product_types: { slug: string };
    categories: { slug: string };
  };

type ProductsListingProps = {
  basePath: string;
  sp: Record<string, string | string[] | undefined>;
  safePage: number;
  totalPages: number;
  products: ProductCardParams[];
};

export const ProductsListing = async ({
  basePath,
  sp,
  safePage,
  totalPages,
  products,
}: ProductsListingProps) => {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("product_images")
    .select("product_id,url,alt")
    .in(
      "product_id",
      products.map((p) => p.id),
    )
    .eq("is_primary", true);

  const pageHref = (p: number) => {
    const newSp = new URLSearchParams(sp as Record<string, string>);

    if (p <= 1) newSp.delete("p");
    else newSp.set("p", String(p));

    const qs = newSp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const { data: productTypes } = await supabase
    .from("product_types")
    .select("*");
  const { data: colors } = await supabase.from("colors").select("*");
  const { data: sizes } = await supabase.from("sizes").select("*");
  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <section className="max-w-7xl px-3">
      <ProductsListingFilters
        productTypes={productTypes}
        colors={colors}
        sizes={sizes}
        categories={categories}
      />
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {products.map((p) => {
          const img = images?.find((i) => i.product_id === p.id);

          return (
            <ProductCard
              key={p.id}
              {...p}
              url={
                img?.url ||
                "https://tmfbysibhlpkahvvpoeu.supabase.co/storage/v1/object/public/shop.me/default-product.jpg"
              }
              alt={img?.alt || p.title}
            />
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        <Link
          className={`px-3 py-2 rounded-lg border ${safePage <= 1 ? "pointer-events-none opacity-50" : ""}`}
          href={pageHref(safePage - 1)}
        >
          Prev
        </Link>

        <div className="px-3 py-2 text-sm text-gray-600">
          Page <span className="font-semibold">{safePage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>

        <Link
          className={`px-3 py-2 rounded-lg border ${safePage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
          href={pageHref(safePage + 1)}
        >
          Next
        </Link>
      </div>
    </section>
  );
};
