import { db } from "@/db";
import {
  categories,
  productImages,
  products,
  productTypes,
} from "@/drizzle/schema";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { ProductCardParams } from "./products-listing";
import { Button } from "./ui/button";

type ProductsScrollParams = {
  title: string;
  type: "new-arrivals" | "top-selling";
};

export const ProductsScroll = async ({ title, type }: ProductsScrollParams) => {
  const orderByCols =
    type === "new-arrivals"
      ? asc(products.createdAt)
      : desc(products.createdAt);
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .leftJoin(productTypes, eq(products.productTypeId, productTypes.id))
    .leftJoin(categories, eq(products.categoryTypeId, categories.id))
    .orderBy(orderByCols)
    .limit(4);
  const formattedProducts = rows.map(
    (row) =>
      ({
        rating: row.products.rating,
        price: row.products.price,
        discountedPrice: row.products.discountedPrice,
        isActive: row.products.isActive,
        categoryTypeId: row.products.categoryTypeId,
        createdAt: row.products.createdAt,
        description: row.products.description,
        gender: row.products.gender,
        id: row.products.id,
        title: row.products.title,
        percentDiscount: row.products.percentDiscount,
        productTypeId: row.products.productTypeId,
        slug: row.products.slug,
        updatedAt: row.products.updatedAt,
        alt: row.products.title,
        productType: {
          slug: row.product_types?.slug || "",
        },
        category: {
          slug: row.categories?.slug || "",
        },
      }) satisfies ProductCardParams,
  );

  if (!formattedProducts) return null;

  const images = await db
    .select({
      productId: productImages.productId,
      url: productImages.url,
      alt: productImages.alt,
    })
    .from(productImages)
    .where(
      and(
        eq(productImages.isPrimary, true),
        inArray(
          productImages.productId,
          formattedProducts.map((p) => p.id),
        ),
      ),
    );

  return (
    <section className="mx-auto max-w-7xl pt-12 md:pt-16">
      <div className="px-4">
        <h2 className="mb-8 text-center text-4xl font-black md:mb-14 md:text-5xl">
          {title}
        </h2>
      </div>
      <div className="mb-5 flex flex-row gap-4 overflow-scroll pl-4 md:mb-9">
        {formattedProducts.map((p, index) => (
          <ProductCard
            key={p.title + index}
            {...p}
            url={
              images?.find((img) => img.productId === p.id)?.url ||
              DEFAULT_PRODUCT_IMAGE_URL
            }
            alt={images?.find((img) => img.productId === p.id)?.alt || p.title}
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
