import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/auth/", "/login", "/cart"],
    },
    sitemap: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/sitemap.xml`
      : "http://localhost:3000/sitemap.xml",
  };
}
