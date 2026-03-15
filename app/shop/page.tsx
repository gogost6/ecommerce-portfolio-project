import {
  ProductCardParams,
  ProductsListing,
} from "@/components/products-listing";
import ShopHeader from "@/components/shop-header";
import { db } from "@/drizzle";
import {
  categories,
  products,
  productTypes,
  productVariants,
} from "@/drizzle/schema";
import { getFirst, parseIds } from "@/lib/utils";
import { and, asc, count, desc, eq, gte, inArray, lte } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our collection of products",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const p = sp.p;
  const safePage = Math.max(1, Number(p) || 1);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const colorIds = parseIds(sp?.colors);
  const sizeIds = parseIds(sp?.sizes);
  const types = parseIds(sp?.types);
  const categoriesSP = parseIds(sp?.categories);
  const minPrice = getFirst(sp?.min) ? Number(getFirst(sp?.min)) : null;
  const maxPrice = getFirst(sp?.max) ? Number(getFirst(sp?.max)) : null;
  const sort = getFirst(sp?.sort) || "latest";

  let filteredProductIds: number[] | null = null;

  const needsVariantFilter =
    colorIds.length ||
    sizeIds.length ||
    minPrice !== null ||
    maxPrice !== null ||
    types.length ||
    categoriesSP.length;

  if (needsVariantFilter) {
    const whereClauses = [];

    if (colorIds.length)
      whereClauses.push(inArray(productVariants.colorId, colorIds));
    if (sizeIds.length)
      whereClauses.push(inArray(productVariants.sizeId, sizeIds));
    if (minPrice !== null)
      whereClauses.push(gte(productVariants.price, String(minPrice)));
    if (maxPrice !== null)
      whereClauses.push(lte(productVariants.price, String(maxPrice)));

    const data = await db
      .select({ productId: productVariants.productId })
      .from(productVariants)
      .where(whereClauses.length ? and(...whereClauses) : undefined);

    const ids = Array.from(new Set((data ?? []).map((r) => r.productId)));

    filteredProductIds = ids;
  }

  const whereClauses = [eq(products.isActive, true)];
  if (categoriesSP.length)
    whereClauses.push(inArray(categories.id, categoriesSP));
  if (types.length) whereClauses.push(inArray(productTypes.id, types));
  if (filteredProductIds)
    whereClauses.push(inArray(products.id, filteredProductIds));

  const orderByClauses = [];
  if (sort === "latest") orderByClauses.push(desc(products.createdAt));
  if (sort === "oldest") orderByClauses.push(asc(products.createdAt));
  if (sort === "highest") orderByClauses.push(desc(products.rating));
  if (sort === "lowest") orderByClauses.push(asc(products.rating));

  let rows;
  let total = 0;

  try {
    rows = await db
      .select()
      .from(products)
      .leftJoin(categories, eq(products.categoryTypeId, categories.id))
      .leftJoin(productTypes, eq(products.productTypeId, productTypes.id))
      .where(and(...whereClauses))
      .orderBy(...orderByClauses)
      .limit(PAGE_SIZE)
      .offset(from);

    const [totalQuery] = await db
      .select({ count: count() })
      .from(products)
      .leftJoin(categories, eq(products.categoryTypeId, categories.id))
      .leftJoin(productTypes, eq(products.productTypeId, productTypes.id))
      .where(and(...whereClauses))
      .limit(1);
    total = totalQuery?.count ?? 0;
  } catch (error) {
    console.error("Database query error:", error);
    notFound();
  }

  const showingFrom = total === 0 ? 0 : from + 1;
  const showingTo = Math.min(to + 1, total);
  const title = "Home";

  const data = rows.map(
    (row) =>
      ({
        id: row.products.id,
        title: row.products.title,
        price: row.products.price,
        rating: row.products.rating,
        description: row.products.description,
        gender: row.products.gender,
        slug: row.products.slug,
        alt: row.products.title,
        categoryTypeId: row.products.categoryTypeId,
        productTypeId: row.products.productTypeId,
        createdAt: row.products.createdAt,
        discountedPrice: row.products.discountedPrice,
        isActive: row.products.isActive,
        percentDiscount: row.products.percentDiscount,
        updatedAt: row.products.updatedAt,
        category: {
          slug: row?.categories?.slug || "",
        },
        productType: {
          slug: row?.product_types?.slug || "",
        },
      }) satisfies ProductCardParams,
  );

  if (!data || data.length === 0) {
    return notFound();
  }

  return (
    <section className="relative mx-auto max-w-7xl px-3">
      <ShopHeader
        title={title}
        showingFrom={showingFrom}
        showingTo={showingTo}
        total={total}
        className="md:hidden"
      />
      <ProductsListing
        header={{
          title,
          showingFrom,
          showingTo,
          total,
        }}
        safePage={safePage}
        basePath={`/shop`}
        sp={sp}
        totalPages={Math.ceil(total / PAGE_SIZE)}
        products={data}
      />
    </section>
  );
}
