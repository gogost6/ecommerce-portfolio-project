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
    <div className="shrink-0 max-w-48 md:max-w-72">
      <Link href={href}>
        <Image
          src={url}
          alt={alt || url.split(".")[0]}
          width={298}
          height={298}
          className="mb-2.5 md:mb-4 w-48 h-48 md:w-72 md:h-72 rounded-2xl object-cover hover:scale-[1.01] transition-transform"
        />
      </Link>
      <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2">{title}</h3>
      <StarRating rating={rating} />
      {discounted_price ? (
        <div className="font-bold text-xl md:text-2xl mt-1 md:mt-2 flex items-center justify-start gap-2.5">
          <span>${discounted_price}</span>
          <span className="line-through text-gray-500">${price}</span>{" "}
          <Badge variant={"red"}>-{discountPercentage}%</Badge>
        </div>
      ) : (
        <p className="font-bold text-xl md:text-2xl mt-1 md:mt-2">${price}</p>
      )}
    </div>
  );
};
