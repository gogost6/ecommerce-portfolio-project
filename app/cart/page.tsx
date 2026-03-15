import { db } from "@/db";
import {
  cartItems,
  carts,
  colors,
  productImages,
  products,
  productVariants,
  sizes,
} from "@/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { and, eq, inArray } from "drizzle-orm";
import { cookies } from "next/headers";
import { CartClient } from "./_components/cart-client";
import { EmptyCart } from "./_components/empty-cart";
import { CartItemProps } from "./types";

export const metadata = {
  title: "Your Cart",
  description: "Review the items in your cart and proceed to checkout",
};

export default async function Page() {
  const cookiesStore = await cookies();
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data?.user?.id;
  const sessionId = cookiesStore.get("cart_session_id")?.value;

  const cartCondition = sessionId
    ? and(eq(carts.sessionId, sessionId), eq(carts.isActive, true))
    : userId
      ? and(eq(carts.userId, userId), eq(carts.isActive, true))
      : null;

  if (!cartCondition) {
    return <EmptyCart />;
  }

  const [cart] = await db
    .select({ id: carts.id })
    .from(carts)
    .where(cartCondition)
    .limit(1);

  if (!cart) {
    return <EmptyCart />;
  }

  const { data } = await supabase
    .from("cart_items")
    .select(
      `
        id,
        quantity,
        price_at_time,
        product_variants (
          id,
          price,
          sizes (
            name
          ),
          colors (
            name
          ),
          products (
            title,
            product_images (
              url,
              alt,
              is_primary
            )
          )
        )
      `,
    )
    .eq("cart_id", cart.id);

  const cartRows = await db
    .select({
      id: cartItems.id,
      quantity: cartItems.quantity,
      priceAtTime: cartItems.priceAtTime,

      variantId: productVariants.id,
      variantPrice: productVariants.price,

      sizeName: sizes.name,
      colorName: colors.name,

      productId: products.id,
      productTitle: products.title,
    })
    .from(cartItems)
    .innerJoin(
      productVariants,
      eq(cartItems.productVariantId, productVariants.id),
    )
    .leftJoin(sizes, eq(productVariants.sizeId, sizes.id))
    .leftJoin(colors, eq(productVariants.colorId, colors.id))
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(eq(cartItems.cartId, cart.id));

  const productIds = [...new Set(cartRows.map((row) => row.productId))];

  const images = productIds.length
    ? await db
        .select({
          productId: productImages.productId,
          url: productImages.url,
          alt: productImages.alt,
          isPrimary: productImages.isPrimary,
        })
        .from(productImages)
        .where(inArray(productImages.productId, productIds))
    : [];

  if (!data || data.length === 0) {
    return <EmptyCart />;
  }

  const formattedCartItems: CartItemProps[] = cartRows.map((row) => {
    const image = images.find(
      (img) => img.productId === row.productId && img.isPrimary,
    );

    return {
      id: row.id,
      title: row.productTitle || "Unknown Product",
      size: row.sizeName || "Unknown Size",
      color: row.colorName || "Unknown Color",
      price: Number(row.priceAtTime),
      originalPrice: Number(row.variantPrice ?? row.priceAtTime),
      quantity: row.quantity,
      src: image?.url || DEFAULT_PRODUCT_IMAGE_URL,
      alt: image?.alt || "Product Image",
    };
  });

  return <CartClient initialItems={formattedCartItems} />;
}
