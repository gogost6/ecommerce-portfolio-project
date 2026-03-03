import { ProductsListing } from "@/components/products-listing";
import ShopHeader from "@/components/shop-header";
import { createClient } from "@/lib/supabase/server";
import { capitalize } from "@/lib/utils";
import { notFound } from "next/navigation";

const PAGE_SIZE = 6;

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; gender: "men" | "women"; type: string }>;
}) {
  const { category, gender, type } = await params;

  const from = 1;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("products")
    .select(
      `
        categories!inner ( slug ),
        product_types!inner ( slug ),
        gender
      `,
      { count: "exact" },
    )
    .eq("is_active", true)
    .eq("categories.slug", category)
    .eq("product_types.slug", type)
    .eq("gender", gender)
    .range(from, to);

  if (error) notFound();

  const total = count ?? 0;
  const showingFrom = 1;
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
        page={1}
        basePath={`/shop/${category}/${gender}/${type}`}
        category={category}
        gender={gender}
        type={type}
      />
    </section>
  );
}
