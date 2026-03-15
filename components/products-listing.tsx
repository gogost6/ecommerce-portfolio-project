import { db } from "@/drizzle";
import {
  categories,
  colors,
  productImages,
  products,
  productTypes,
  sizes,
} from "@/drizzle/schema";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { and, eq, inArray, InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { ProductsListingFilters } from "./products-listing-filters";
import ShopHeader from "./shop-header";

type ProductRow = InferSelectModel<typeof products>;
type CategoryRow = InferSelectModel<typeof categories>;
type ProductTypeRow = InferSelectModel<typeof productTypes>;

export type ProductCardParams = ProductRow & {
  alt?: string;
  productType: Pick<ProductTypeRow, "slug">;
  category: Pick<CategoryRow, "slug">;
};

type ProductsListingProps = {
  header: {
    title: string;
    showingFrom: number;
    showingTo: number;
    total: number;
  };
  basePath: string;
  sp: Record<string, string | string[] | undefined>;
  safePage: number;
  totalPages: number;
  products: ProductCardParams[];
};

export const ProductsListing = async ({
  header,
  basePath,
  sp,
  safePage,
  totalPages,
  products,
}: ProductsListingProps) => {
  const productIds = products.map((p) => p.id);
  const images = await db
    .select({
      productId: productImages.productId,
      url: productImages.url,
      alt: productImages.alt,
    })
    .from(productImages)
    .where(
      and(
        inArray(productImages.productId, productIds),
        eq(productImages.isPrimary, true),
      ),
    );

  const [productTypesData, colorsData, sizesData, categoriesData] =
    await Promise.all([
      db.select().from(productTypes),
      db.select().from(colors),
      db.select().from(sizes),
      db.select().from(categories),
    ]);

  const pageHref = (p: number) => {
    const newSp = new URLSearchParams(sp as Record<string, string>);

    if (p <= 1) newSp.delete("p");
    else newSp.set("p", String(p));

    const qs = newSp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <section className="flex w-full gap-5 px-3">
      <ProductsListingFilters
        productTypes={productTypesData}
        colors={colorsData}
        sizes={sizesData}
        categories={categoriesData}
      />

      <div className="mx-auto w-fit">
        <ShopHeader {...header} className="hidden md:block" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((p) => {
            const img = images.find((i) => i.productId === p.id);

            return (
              <ProductCard
                key={p.id}
                {...p}
                url={img?.url || DEFAULT_PRODUCT_IMAGE_URL}
                alt={img?.alt || p.title}
              />
            );
          })}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          <Link
            className={`rounded-lg border px-3 py-2 ${safePage <= 1 ? "pointer-events-none opacity-50" : ""}`}
            href={pageHref(safePage - 1)}
          >
            Prev
          </Link>

          <div className="px-3 py-2 text-sm text-gray-600">
            Page <span className="font-semibold">{safePage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <Link
            className={`rounded-lg border px-3 py-2 ${safePage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
            href={pageHref(safePage + 1)}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
};
