import Breadcrumbs from "@/components/breadcrumb";
import ProductGallery from "@/components/product-gallery";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select(
      `
    id,
    title,
    product_images (
      id,
      url,
      alt,
      sort_order,
      is_primary
    ),
    product_variants (
      id,
      sku,
      price,
      discounted_price,
      percent_discount,
      stock,
      is_active,
      size_id,
      color_id,
      sizes ( id, name, slug ),
      colors ( id, name, slug, hex )
    )
  `,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) {
    notFound();
  }

  const { id, title, product_images, product_variants } = product;

  return (
    <div>
      <Suspense
        fallback={
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
        }
      >
        <Breadcrumbs />
      </Suspense>
      <ProductGallery images={product_images} />
    </div>
  );
}
