import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select(
      `
      slug,
      updated_at,
      gender,
      categories ( slug ),
      product_types ( slug )
    `,
    )
    .eq("is_active", true);

  const productUrls =
    products?.map((product) => ({
      url: `${baseUrl}/shop/${product.gender}/${product.categories.slug}/${product.product_types.slug}/${product.slug}`,
      lastModified: product.updated_at
        ? new Date(product.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) ?? [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/example-home`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...productUrls,
  ];
}
