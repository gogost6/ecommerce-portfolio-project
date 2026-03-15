import ProductGallery from "@/components/product-gallery";
import { ProductsScroll } from "@/components/products-scroll";
import { db } from "@/drizzle";
import { productReviews } from "@/drizzle/schema";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { and, count, eq } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductTabs } from "./_components/ProductTabs";
import ProductDetailsClient from "./product-details.client";

export const REVIEWS_PAGE_SIZE = 4;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;

  const product = await db.query.products.findFirst({
    where: (products, { and, eq }) =>
      and(eq(products.slug, slug), eq(products.isActive, true)),
    columns: {
      title: true,
      description: true,
    },
    with: {
      productImages: {
        columns: {
          url: true,
          alt: true,
        },
        orderBy: (productImages, { asc }) => [asc(productImages.sortOrder)],
      },
    },
  });

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }

  const images = product.productImages.map((img) => ({
    url: img.url,
    alt: img.alt || product.title,
  }));

  if (images.length === 0) {
    images.push({
      url: `${DEFAULT_PRODUCT_IMAGE_URL}`,
      alt: "Default product image",
    });
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description || "Product from our shop",
      images,
    },
    twitter: {
      title: product.title,
      description: product.description || "Product from our shop",
      images,
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const productData = await db.query.products.findFirst({
    where: (products, { and, eq }) =>
      and(eq(products.slug, slug), eq(products.isActive, true)),
    columns: {
      id: true,
      title: true,
      rating: true,
      price: true,
      discountedPrice: true,
      percentDiscount: true,
      description: true,
      gender: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      category: {
        columns: {
          slug: true,
        },
      },
      productType: {
        columns: {
          slug: true,
        },
      },
      productImages: {
        columns: {
          id: true,
          url: true,
          alt: true,
          sortOrder: true,
          isPrimary: true,
        },
        orderBy: (productImages, { asc }) => [asc(productImages.sortOrder)],
      },
      productVariants: {
        columns: {
          id: true,
          sku: true,
          price: true,
          discountedPrice: true,
          percentDiscount: true,
          stock: true,
          isActive: true,
          sizeId: true,
          colorId: true,
        },
        with: {
          size: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
          },
          color: {
            columns: {
              id: true,
              name: true,
              slug: true,
              hex: true,
            },
          },
        },
      },
    },
  });

  if (!productData) notFound();

  const initialReviews = await db.query.productReviews.findMany({
    where: (productReviews, { and, eq }) =>
      and(
        eq(productReviews.productId, productData.id),
        eq(productReviews.isVerifiedPurchase, true),
        eq(productReviews.isPublished, true),
      ),
    columns: {
      id: true,
      reviewerName: true,
      rating: true,
      body: true,
      isVerifiedPurchase: true,
      isPublished: true,
      createdAt: true,
    },
    orderBy: (productReviews, { asc }) => [asc(productReviews.createdAt)],
    limit: REVIEWS_PAGE_SIZE,
  });

  const [{ value: reviewsCount }] = await db
    .select({ value: count() })
    .from(productReviews)
    .where(
      and(
        eq(productReviews.productId, productData.id),
        eq(productReviews.isVerifiedPurchase, true),
        eq(productReviews.isPublished, true),
      ),
    );

  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const product = {
    id: productData.id,
    title: productData.title,
    rating: +productData.rating,
    price: +productData.price,
    discounted_price: Number(productData.discountedPrice) || 0,
    percent_discount: Number(productData.percentDiscount) || 0,
    description: productData.description,
    gender: productData.gender,
    created_at: productData.createdAt,
    updated_at: productData.updatedAt,
    categories: {
      slug: productData.category?.slug ?? "",
    },
    product_types: {
      slug: productData.productType?.slug ?? "",
    },
    product_images: productData.productImages.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      sort_order: img.sortOrder,
      is_primary: img.isPrimary,
    })),
    product_variants: productData.productVariants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      price: Number(variant.price),
      discounted_price:
        variant.discountedPrice !== null
          ? Number(variant.discountedPrice)
          : null,
      percent_discount:
        variant.percentDiscount !== null
          ? Number(variant.percentDiscount)
          : null,
      stock: variant.stock,
      is_active: variant.isActive,
      size_id: variant.sizeId,
      color_id: variant.colorId,
      sizes: variant.size
        ? {
            id: variant.size.id,
            name: variant.size.name,
            slug: variant.size.slug,
          }
        : null,
      colors: variant.color
        ? {
            id: variant.color.id,
            name: variant.color.name,
            slug: variant.color.slug,
            hex: variant.color.hex,
          }
        : null,
    })),
  };

  const mappedInitialReviews = initialReviews.map((review) => ({
    id: review.id,
    reviewer_name: review.reviewerName,
    rating: review.rating,
    body: review.body,
    is_verified_purchase: review.isVerifiedPurchase,
    is_published: review.isPublished,
    created_at: review.createdAt,
  }));

  return (
    <>
      <script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: product.title,
            description: product.description,
            url: `${defaultUrl}/shop/${product.categories.slug}/${product.gender}/${product.product_types.slug}/${slug}`,
            datePublished: product.created_at,
            dateModified: product.updated_at,
          }),
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-12 md:flex md:gap-10">
          <ProductGallery images={product.product_images} />
          <ProductDetailsClient product={product} />
        </div>
        <ProductTabs
          initialReviews={mappedInitialReviews}
          reviewsCount={reviewsCount ?? 0}
          productId={product.id}
        />
        <ProductsScroll title="YOU MIGHT ALSO LIKE" type="new-arrivals" />
      </div>
    </>
  );
}
