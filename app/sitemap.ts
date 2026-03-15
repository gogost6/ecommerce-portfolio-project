import { db } from "@/db";
import { categories, products, productTypes } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const result = await db
    .select({
      slug: products.slug,
      updatedAt: products.updatedAt,
      gender: products.gender,
      categorySlug: categories.slug,
      productTypeSlug: productTypes.slug,
    })
    .from(products)
    .where(eq(products.isActive, true))
    .leftJoin(categories, eq(products.categoryTypeId, categories.id))
    .leftJoin(productTypes, eq(products.productTypeId, productTypes.id));

  const productUrls =
    result?.map((data) => ({
      url: `${baseUrl}/shop/${data.gender}/${data.categorySlug}/${data.productTypeSlug}/${data.slug}`,
      lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(),
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
