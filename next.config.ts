import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    domains: ["images.unsplash.com", "tmfbysibhlpkahvvpoeu.supabase.co"],
  },
};

export default nextConfig;
