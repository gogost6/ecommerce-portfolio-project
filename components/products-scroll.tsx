import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type ProductCardParams = Database["public"]["Tables"]["products"]["Row"] & {
  url: string;
  alt?: string;
};

const ProductCard = ({
  title,
  rating,
  url,
  alt,
  price,
  discounted_price,
  percent_discount,
}: ProductCardParams) => {
  return (
    <div className="flex-shrink-0 max-w-48 md:max-w-72">
      <Image
        src={url}
        alt={alt || url.split(".")[0]}
        width={298}
        height={298}
        className="mb-2.5 md:mb-4 w-48 h-48 md:w-72 md:h-72 rounded-2xl object-cover"
      />
      <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2">{title}</h3>
      <StarRating rating={rating} />
      {discounted_price ? (
        <div className="font-bold text-xl md:text-2xl mt-1 md:mt-2 flex items-center justify-start gap-2.5">
          <span>${discounted_price}</span>
          <span className="line-through text-gray-500">${price}</span>{" "}
          <Badge variant={"red"}>-{percent_discount}%</Badge>
        </div>
      ) : (
        <p className="font-bold text-xl md:text-2xl mt-1 md:mt-2">${price}</p>
      )}
    </div>
  );
};

type ProductsScrollParams = {
  title: string;
  type: "new-arrivals" | "top-selling";
};

export const ProductsScroll = async ({ title, type }: ProductsScrollParams) => {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
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
