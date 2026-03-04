import { ProductsListing } from "@/components/products-listing";
import ShopHeader from "@/components/shop-header";
import { createClient } from "@/lib/supabase/server";
import { capitalize } from "@/lib/utils";
import { notFound } from "next/navigation";

const PAGE_SIZE = 6;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const [category, gender, type] = slug;
  const p = (await searchParams).p;
  const safePage = Math.max(1, Number(p) || 1);

  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let select = ``;
  if (category) select += `categories!inner ( slug )`;
  if (type) select += `,product_types!inner ( slug )`;
  if (gender) select += `,gender`;

  const supabase = await createClient();
  const query = supabase
    .from("products")
    .select(select, { count: "exact" })
    .eq("is_active", true);

  if (category) query.eq("categories.slug", category);
  if (type) query.eq("product_types.slug", type);
  if (gender) query.eq("gender", gender).range(from, to);

  const { count, error } = await query;

  if (error) notFound();

  const total = count ?? 0;
  const showingFrom = total === 0 ? 0 : from + 1;
  const showingTo = Math.min(to + 1, total);
  let basePath = "/shop";
  if (category) basePath += `/${category}`;
  if (gender) basePath += `/${gender}`;
  if (type) basePath += `/${type}`;

  return (
    <section className="max-w-7xl px-3 relative">
      <ShopHeader
        title={capitalize(category)}
        showingFrom={showingFrom}
        showingTo={showingTo}
        total={total}
      />
      <ProductsListing
        page={safePage}
        basePath={basePath}
        category={category}
        gender={gender}
        type={type}
      />
    </section>
  );
}
