import Image from "next/image";
import Link from "next/link";
import { ProductCardParams } from "./products-listing";
import { StarRating } from "./star-rating";
import { Badge } from "./ui/badge";

type ProductCardProps = ProductCardParams & {
  url: string;
  alt: string;
};

export const ProductCard = ({
  title,
  rating,
  url,
  alt,
  price,
  discounted_price,
  product_types,
  categories,
  slug,
  gender,
}: ProductCardProps) => {
  const discountPercentage = discounted_price
    ? Math.round(((price - discounted_price) / price) * 100)
    : null;
  const href = `/shop/${categories.slug}/${gender}/${product_types.slug}/${slug}`;

  return (
    <div className="max-w-48 shrink-0 md:max-w-72">
      <Link href={href}>
        <Image
          src={url}
          alt={alt || url.split(".")[0]}
          width={298}
          height={298}
          className="mb-2.5 h-48 w-48 rounded-2xl object-cover transition-transform hover:scale-[1.01] md:mb-4 md:h-72 md:w-72"
        />
      </Link>
      <h3 className="mb-1 text-base font-bold md:mb-2 md:text-xl">{title}</h3>
      <StarRating rating={rating} />
      {discounted_price ? (
        <div className="mt-1 flex items-center justify-start gap-2.5 text-xl font-bold md:mt-2 md:text-2xl">
          <span>${discounted_price}</span>
          <span className="text-gray-500 line-through">${price}</span>{" "}
          <Badge variant={"red"}>-{discountPercentage}%</Badge>
        </div>
      ) : (
        <p className="mt-1 text-xl font-bold md:mt-2 md:text-2xl">${price}</p>
      )}
    </div>
  );
};
