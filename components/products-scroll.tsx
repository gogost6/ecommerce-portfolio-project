import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Button } from "./ui/button";

export type ProductCardParams = {
  src: string;
  alt?: string;
  title: string;
  rating: number;
  price: number;
};

const ProductCard = ({ src, alt, title, rating, price }: ProductCardParams) => {
  return (
    <div className="w-52 flex-shrink-0">
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
        width={200}
        height={200}
        className="mb-2.5"
      />
      <h3 className="font-bold text-xl mb-1">{title}</h3>
      <StarRating rating={rating} />
      <p className="font-bold text-xl mt-1 mb-1">${price}</p>
    </div>
  );
};

type ProductsScrollParams = {
  products: ProductCardParams[];
  title: string;
};

export const ProductsScroll = ({ products, title }: ProductsScrollParams) => {
  return (
    <section className="pt-12">
      <div className="px-4">
        <h2 className="text-4xl font-black text-center mb-8">{title}</h2>
      </div>
      <div className="flex flex-row gap-4 overflow-scroll mb-5 pl-4">
        {products.map((p, index) => (
          <ProductCard key={p.title + index} {...p} />
        ))}
      </div>
      <div className="px-4">
        <Button variant="outline" asChild className="mb-10 w-full">
          <Link href="/products?sort=new-releases">View all</Link>
        </Button>
      </div>
    </section>
  );
};
