import { ProductsListing } from "@/components/products-listing";
import ShopHeader from "@/components/shop-header";
import { createClient } from "@/lib/supabase/server";
import { capitalize } from "@/lib/utils";
import { notFound } from "next/navigation";

const PAGE_SIZE = 6;

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}) {
  const { category, page } = await params;

  const safePage = Math.max(1, Number(page) || 1);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("products")
    .select(
      `
        categories!inner ( slug )
      `,
      { count: "exact" },
    )
    .eq("is_active", true)
    .eq("categories.slug", category)
    .range(from, to);

  if (error) notFound();

  const total = count ?? 0;
  const showingFrom = total === 0 ? 0 : from + 1;
  const showingTo = Math.min(to + 1, total);

  return (
    <section className="max-w-7xl px-3">
      <ShopHeader
        title={capitalize(category)}
        showingFrom={showingFrom}
        showingTo={showingTo}
        total={total}
      />
      <ProductsListing
        page={safePage}
        basePath={`/shop/${category}`}
        category={category}
      />
    </section>
  );
}
