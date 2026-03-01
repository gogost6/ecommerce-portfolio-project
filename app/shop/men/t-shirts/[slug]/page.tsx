import Breadcrumbs from "@/components/breadcrumb";
import ProductGallery from "@/components/product-gallery";
import { ProductsScroll } from "@/components/products-scroll";
import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Check, SlidersVertical } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select(
      `
    id,
    title,
    rating,
    price,
    discounted_price,
    percent_discount,
    description,
    product_images (
      id,
      url,
      alt,
      sort_order,
      is_primary
    ),
    product_variants (
      id,
      sku,
      price,
      discounted_price,
      percent_discount,
      stock,
      is_active,
      size_id,
      color_id,
      sizes ( id, name, slug ),
      colors ( id, name, slug, hex )
    )
  `,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) {
    notFound();
  }

  const {
    id,
    title,
    rating,
    price,
    description,
    discounted_price,
    percent_discount,
    product_images,
    product_variants,
  } = product;

  const { data: productReviews } = await supabase
    .from("product_reviews")
    .select(
      `
      reviewer_name,
      rating,
      body,
      is_verified_purchase,
      is_published,
      created_at
  `,
    )
    .eq("product_id", id)
    .eq("is_verified_purchase", true)
    .eq("is_published", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  const { data: reviewsCount } = await supabase
    .from("product_reviews")
    .select("id", { count: "exact" })
    .eq("product_id", id)
    .eq("is_verified_purchase", true)
    .eq("is_published", true);

  return (
    <div className="mx-auto px-4 w-full max-w-7xl">
      <Suspense
        fallback={
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
        }
      >
        <Breadcrumbs />
      </Suspense>
      <ProductGallery images={product_images} />
      <h1 className="text-2xl font-black mt-20 mb-3">{title}</h1>
      <StarRating rating={rating} />
      <div className="flex flex-row gap-2.5 mt-2.5 mb-5">
        <p className="text-2xl font-medium">{price}$</p>
        {discounted_price && percent_discount && (
          <>
            <p className="text-gray-600 line-through text-2xl font-medium">
              {discounted_price}
              {"$ "}
            </p>
            <Badge variant={"red"}>{percent_discount}%</Badge>
          </>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      <div className="h-[1px] bg-gray-100 mb-6"></div>
      <div className="flex flex-col gap-4 mb-6">
        <p className="text-gray-600 text-sm">Select Colors</p>
        <div className="flex flex-row gap-3">
          {product_variants
            .filter((variant, index, self) => {
              const colorIds = self
                .filter((v) => v.colors)
                .map((v) => v.colors!.id);
              return colorIds.indexOf(variant.colors!.id) === index;
            })
            .map(({ colors }) => (
              <button
                key={colors!.id}
                type="button"
                className="w-8 h-8 rounded-full border-2 border-gray-300 transition-colors hover:border-gray-600 focus:outline-none"
                style={{ backgroundColor: colors!.hex }}
                aria-label={`Select color: ${colors!.name}`}
              />
            ))}
        </div>
      </div>
      <div className="h-[1px] bg-gray-100 mb-6"></div>
      <div className="flex flex-col gap-4 mb-6">
        <p className="text-gray-600 text-sm">Choose size</p>
        <div className="flex flex-row gap-3">
          {product_variants
            .filter((variant, index, self) => {
              const sizeIds = self
                .filter((v) => v.sizes)
                .map((v) => v.sizes!.id);
              return sizeIds.indexOf(variant.sizes!.id) === index;
            })
            .map(({ sizes }) => (
              <Button key={sizes?.id} variant={"outline"}>
                {sizes!.name}
              </Button>
            ))}
        </div>
      </div>
      <div className="h-[1px] bg-gray-100 mb-6"></div>
      <div className="flex items-stretch justify-center gap-3 mb-12">
        <div className="bg-gray-100 rounded-2xl flex items-center">
          <button className="px-4 h-full text-2xl flex items-center">-</button>
          <span>1</span>
          <button className="px-4 h-full text-2xl flex items-center">+</button>
        </div>

        <Button className="flex-1">Add to Cart</Button>
      </div>
      <div className="w-full border-b mb-5">
        <div className="flex justify-center gap-12 text-gray-400 text-sm">
          <button className="pb-4">Product Details</button>
          <button className="pb-4 text-black relative">
            Rating & Reviews
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></span>
          </button>
          <button className="pb-4">FAQs</button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row gap-2.5 justify-center items-center">
          <h3 className="font-bold text-xl">All Reviews</h3>
          <p className="text-gray-600 text-base">({reviewsCount?.length})</p>
        </div>
        <div className="flex flex-row gap-2.5 justify-center items-center">
          <Button variant={"outline"} size={"icon"}>
            <SlidersVertical size={12} />
          </Button>
          <Button>Write a Review</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-5">
        {productReviews?.map((review, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4">
            <StarRating rating={review.rating} />
            <div className="flex flex-row gap-1 items-center justify-center w-fit mt-3 mb-2">
              <h4 className="text-lg font-bold">{review.reviewer_name}</h4>
              <div className="w-5 h-5 bg-green-500 relative rounded-full">
                <Check
                  size={10}
                  color="white"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <p className="text-gray-600 text-base mb-4">{review.body}</p>
            <span className="font-medium text-base text-gray-600">
              Posted on {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
      <Button variant={"outline"} className="block mx-auto mb-12">
        Load More Reviews
      </Button>
      <ProductsScroll title="YOU MIGHT ALSO LIKE" type="new-arrivals" />
    </div>
  );
}
