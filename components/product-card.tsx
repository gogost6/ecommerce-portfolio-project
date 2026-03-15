import Link from "next/link";
import { ImageWithSkeleton } from "./image-with-skeleton";
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
  discountedPrice,
  productType,
  category,
  slug,
  gender,
}: ProductCardProps) => {
  const discountPercentage =
    discountedPrice && discountedPrice < price
      ? Math.round(((+price - +discountedPrice) / +price) * 100)
      : null;
  const href = `/shop/${category.slug}/${gender}/${productType.slug}/${slug}`;

  return (
    <div className="max-w-48 shrink-0 md:max-w-72">
      <Link href={href}>
        <ImageWithSkeleton
          src={url}
          alt={alt || url.split(".")[0]}
          width={298}
          height={298}
          containerClassName="mb-2.5 h-48 w-48 rounded-2xl object-cover transition-transform hover:scale-[1.01] md:mb-4 md:h-72 md:w-72"
          skeletonClassName="rounded-2xl"
        />
      </Link>
      <h3 className="mb-1 text-base font-bold md:mb-2 md:text-xl">{title}</h3>
      <StarRating rating={+rating} />
      {discountPercentage && discountPercentage > 0 ? (
        <div className="mt-1 flex flex-wrap items-center justify-start gap-2.5 text-xl font-bold md:mt-2 md:text-2xl">
          <span>${discountedPrice}</span>
          <span className="text-gray-500 line-through">${price}</span>{" "}
          <Badge variant={"red"}>-{discountPercentage}%</Badge>
        </div>
      ) : (
        <p className="mt-1 text-xl font-bold md:mt-2 md:text-2xl">${price}</p>
      )}
    </div>
  );
};
