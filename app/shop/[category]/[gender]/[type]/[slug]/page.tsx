import ProductGallery from "@/components/product-gallery";
import { ProductsScroll } from "@/components/products-scroll";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductTabs } from "./_components/ProductTabs";
import ProductDetailsClient from "./product-details.client";

export const REVIEWS_PAGE_SIZE = 4;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("title, description, product_images ( url, alt )")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }

  const images = product.product_images.map((img) => ({
    url: img.url,
    alt: img.alt || product.title,
  }));

  if (images.length === 0) {
    images.push({
      url: `${DEFAULT_PRODUCT_IMAGE_URL}`,
      alt: "Default product image",
    });
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description || "Product from our shop",
      images,
    },
    twitter: {
      title: product.title,
      description: product.description || "Product from our shop",
      images,
    },
  };
};

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
      gender,
      created_at,
      updated_at,
      categories!inner ( slug ),
      product_types!inner ( slug ),
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
    .order("created_at", { ascending: true })
    .limit(REVIEWS_PAGE_SIZE);

  const { count: reviewsCount } = await supabase
    .from("product_reviews")
    .select("id", { count: "exact", head: true })
    .eq("product_id", product.id)
    .eq("is_verified_purchase", true)
    .eq("is_published", true);

  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return (
    <>
      <script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: product.title,
            description: product.description,
            url: `${defaultUrl}/shop/${product.categories.slug}/${product.gender}/${product.product_types.slug}/${slug}`,
            datePublished: product.created_at,
            dateModified: product.updated_at,
          }),
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-12 md:flex md:gap-10">
          <ProductGallery images={product.product_images} />
          <ProductDetailsClient product={product} />
        </div>
        <ProductTabs
          initialReviews={initialReviews ?? []}
          reviewsCount={reviewsCount ?? 0}
          productId={product.id}
        />
        <ProductsScroll title="YOU MIGHT ALSO LIKE" type="new-arrivals" />
      </div>
    </>
  );
}
