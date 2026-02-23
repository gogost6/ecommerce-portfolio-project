import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export type ProductCardParams = {
  src: string;
  alt?: string;
  title: string;
  rating: number;
  price: number;
  discountedPrice?: number;
  discountedPercentage?: number;
};

const ProductCard = ({
  src,
  alt,
  title,
  rating,
  price,
  discountedPrice,
  discountedPercentage,
}: ProductCardParams) => {
  return (
    <div className="flex-shrink-0 max-w-48 md:max-w-72">
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
        width={298}
        height={298}
        className="mb-2.5 md:mb-4 w-48 h-48 md:w-72 md:h-72"
      />
      <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2">{title}</h3>
      <StarRating rating={rating} />
      {discountedPrice ? (
        <div className="font-bold text-xl md:text-2xl mt-1 md:mt-2 flex items-center justify-start gap-2.5">
          <span>${discountedPrice}</span>
          <span className="line-through text-gray-500">${price}</span>{" "}
          <Badge variant={"red"}>-{discountedPercentage}%</Badge>
        </div>
      ) : (
        <p className="font-bold text-xl md:text-2xl mt-1 md:mt-2">${price}</p>
      )}
    </div>
  );
};

type ProductsScrollParams = {
  products: ProductCardParams[];
  title: string;
};

export const ProductsScroll = ({ products, title }: ProductsScrollParams) => {
  return (
    <section className="pt-12 md:pt-16 max-w-7xl mx-auto">
      <div className="px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-8 md:mb-14">
          {title}
        </h2>
      </div>
      <div className="flex flex-row gap-4 overflow-scroll mb-5 md:mb-9 pl-4">
        {products.map((p, index) => (
          <ProductCard key={p.title + index} {...p} />
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
