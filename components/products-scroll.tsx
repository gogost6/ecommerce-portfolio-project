import { createClient } from "@/lib/supabase/client";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
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
    <section className="mx-auto max-w-7xl pt-12 md:pt-16">
      <div className="px-4">
        <h2 className="mb-8 text-center text-4xl font-black md:mb-14 md:text-5xl">
          {title}
        </h2>
      </div>
      <div className="mb-5 flex flex-row gap-4 overflow-scroll pl-4 md:mb-9">
        {products.map((p, index) => (
          <ProductCard
            key={p.title + index}
            {...p}
            url={
              images?.find((img) => img.product_id === p.id)?.url ||
              DEFAULT_PRODUCT_IMAGE_URL
            }
            alt={images?.find((img) => img.product_id === p.id)?.alt || p.title}
          />
        ))}
      </div>
      <div className="mb-10 px-4 md:mx-auto md:mb-16 md:w-56">
        <Button variant="outline" asChild className="w-full">
          <Link href="/products?sort=new-releases">View all</Link>
        </Button>
      </div>
    </section>
  );
};
