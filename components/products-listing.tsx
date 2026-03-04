import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { ProductsListingFilters } from "./products-listing-filters";

type ProductsListingProps = {
  category?: string;
  gender?: string;
  type?: string;
  page?: number;
  basePath: string; // e.g. "/shop/casual/men/t-shirt"
};

const PAGE_SIZE = 6;

export const ProductsListing = async ({
  category,
  gender,
  type,
  page = 1,
  basePath,
}: ProductsListingProps) => {
  const supabase = createClient();
  const safePage = Math.max(1, Number(page) || 1);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("products")
    .select(
      `
        *,
        product_types!inner ( slug ),
        categories!inner ( slug )
      `,
      { count: "exact" },
    )
    .eq("is_active", true);

  if (gender) query = query.eq("gender", gender);
  if (category) query = query.eq("categories.slug", category);
  if (type) query = query.eq("product_types.slug", type);

  const {
    data: products,
    count,
    error,
  } = await query
    .order("created_at", { ascending: false }) // stable pagination
    .range(from, to);

  if (error) throw error;
  if (!products?.length) return null;

  const { data: images } = await supabase
    .from("product_images")
    .select("product_id,url,alt")
    .in(
      "product_id",
      products.map((p) => p.id),
    )
    .eq("is_primary", true);

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageHref = (p: number) => (p <= 1 ? basePath : `${basePath}?p=${p}`);

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

      {/* Pagination */}
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
