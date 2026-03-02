import Breadcrumbs from "@/components/breadcrumb";
import ProductGallery from "@/components/product-gallery";
import { ProductsScroll } from "@/components/products-scroll";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Reviews } from "./_components/Reviews";
import { TabsHeader } from "./_components/TabsHeader";
import ProductDetailsClient from "./product-details.client";

export const REVIEWS_PAGE_SIZE = 4;

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
      rating,
      price,
      discounted_price,
      percent_discount,
      description,
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

  if (!product) notFound();

  const { data: initialReviews } = await supabase
    .from("product_reviews")
    .select(
      `
      id,
      reviewer_name,
      rating,
      body,
      is_verified_purchase,
      is_published,
      created_at
    `,
    )
    .eq("product_id", product.id)
    .eq("is_verified_purchase", true)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(REVIEWS_PAGE_SIZE);

  const { count: reviewsCount } = await supabase
    .from("product_reviews")
    .select("id", { count: "exact", head: true })
    .eq("product_id", product.id)
    .eq("is_verified_purchase", true)
    .eq("is_published", true);

  return (
    <div className="mx-auto px-4 w-full max-w-7xl">
      <Breadcrumbs />
      <div className="md:flex md:gap-10">
        <ProductGallery images={product.product_images} />
        <ProductDetailsClient product={product} />
      </div>
      <TabsHeader />
      <Reviews
        initialReviews={initialReviews ?? []}
        reviewsCount={reviewsCount ?? 0}
        productId={product.id}
      />
      <ProductsScroll title="YOU MIGHT ALSO LIKE" type="new-arrivals" />
    </div>
  );
}
