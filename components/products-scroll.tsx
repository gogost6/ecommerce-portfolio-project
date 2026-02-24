import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type ProductCardParams = Database["public"]["Tables"]["products"]["Row"] & {
  src: string;
  alt?: string;
};

const ProductCard = ({
  src,
  alt,
  title,
  rating,
  price,
  discounted_price,
  percent_discount,
}: ProductCardParams) => {
  return (
    <div className="flex-shrink-0 max-w-48 md:max-w-72">
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
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
};

export const ProductsScroll = async ({ title }: ProductsScrollParams) => {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (!products) return null;

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
            src="https://images.unsplash.com/photo-1634839325124-e69977f01b98?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
