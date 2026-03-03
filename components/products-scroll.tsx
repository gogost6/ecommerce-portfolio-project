import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";

type ProductsScrollParams = {
  title: string;
  type: "new-arrivals" | "top-selling";
};

export const ProductsScroll = async ({ title, type }: ProductsScrollParams) => {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select(
      `
        *,
        product_types (
          slug
        ),
        categories (
          slug
        )
      `,
    )
    .eq("is_active", true)
    .order("created_at", { ascending: type === "new-arrivals" })
    .limit(4);

  if (!products) return null;

  const { data: images } = await supabase
    .from("product_images")
    .select("product_id,url,alt")
    .in(
      "product_id",
      products.map((p) => p.id),
    )
    .eq("is_primary", true);

  return (
    <section className="pt-12 md:pt-16 max-w-7xl mx-auto">
      <div className="px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-8 md:mb-14">
          {title}
        </h2>
      </div>
      <div className="flex flex-row gap-4 overflow-scroll mb-5 md:mb-9 pl-4">
        {products.map((p, index) => (
          <ProductCard
            key={p.title + index}
            {...p}
            url={
              images?.find((img) => img.product_id === p.id)?.url ||
              "https://tmfbysibhlpkahvvpoeu.supabase.co/storage/v1/object/public/shop.me/default-product.jpg"
            }
            alt={images?.find((img) => img.product_id === p.id)?.alt || p.title}
          />
        ))}
      </div>
      <div className="px-4 md:w-56 md:mx-auto mb-10 md:mb-16">
        <Button variant="outline" asChild className="w-full">
          <Link href="/products?sort=new-releases">View all</Link>
        </Button>
      </div>
    </section>
  );
};
