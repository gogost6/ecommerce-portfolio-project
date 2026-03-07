import { ProductsListing } from "@/components/products-listing";
import ShopHeader from "@/components/shop-header";
import { createClient } from "@/lib/supabase/server";
import { getFirst, parseIds } from "@/lib/utils";
import { notFound } from "next/navigation";

const PAGE_SIZE = 6;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const p = sp.p;
  const safePage = Math.max(1, Number(p) || 1);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  const colorIds = parseIds(sp?.colors);
  const sizeIds = parseIds(sp?.sizes);
  const types = parseIds(sp?.types);
  const categories = parseIds(sp?.categories);
  const minPrice = getFirst(sp?.min) ? Number(getFirst(sp?.min)) : null;
  const maxPrice = getFirst(sp?.max) ? Number(getFirst(sp?.max)) : null;

  let filteredProductIds: number[] | null = null;

  const needsVariantFilter =
    colorIds.length ||
    sizeIds.length ||
    minPrice !== null ||
    maxPrice !== null ||
    types.length ||
    categories.length;

  if (needsVariantFilter) {
    let vq = supabase.from("product_variants").select("product_id");

    if (colorIds.length) vq = vq.in("color_id", colorIds);
    if (sizeIds.length) vq = vq.in("size_id", sizeIds);
    if (minPrice !== null) vq = vq.gte("price", minPrice);
    if (maxPrice !== null) vq = vq.lte("price", maxPrice);

    const { data } = await vq;

    const ids = Array.from(new Set((data ?? []).map((r) => r.product_id)));

    filteredProductIds = ids;
  }

  const query = supabase
    .from("products")
    .select(
      `*,
      categories!inner ( slug ),
      product_types!inner ( slug ),
      gender
      `,
      { count: "exact" },
    )
    .eq("is_active", true);

  if (filteredProductIds) query.in("id", filteredProductIds);
  if (categories.length) query.in("categories.id", categories);
  if (types.length) query.in("product_types.id", types);
  query.range(from, to);

  const { count, error, data: products } = await query;

  if (error) notFound();

  const total = count ?? 0;
  const showingFrom = total === 0 ? 0 : from + 1;
  const showingTo = Math.min(to + 1, total);

  return (
    <section className="relative max-w-7xl px-3">
      <ShopHeader
        title={"Home"}
        showingFrom={showingFrom}
        showingTo={showingTo}
        total={total}
      />
      <ProductsListing
        safePage={safePage}
        basePath={`/shop`}
        sp={sp}
        totalPages={Math.ceil(total / PAGE_SIZE)}
        products={products}
      />
    </section>
  );
}
