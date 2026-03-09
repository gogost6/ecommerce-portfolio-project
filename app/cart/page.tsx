import { createClient } from "@/lib/supabase/server";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
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

  let cartQuery = supabase.from("carts").select("id").eq("is_active", true);

  if (sessionId) {
    cartQuery = cartQuery.eq("session_id", sessionId);
  } else if (userId) {
    cartQuery = cartQuery.eq("user_id", userId);
  } else {
    // If there's no session ID and no user ID, we can assume there's no cart
    return <EmptyCart />;
  }

  const { data: cart } = await cartQuery.single();

  if (!cart) {
    return <EmptyCart />;
  }

  const { data: cartItems } = await supabase
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

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  const formattedCartItems: CartItemProps[] = cartItems.map((item) => {
    const variant = item.product_variants;
    const product = variant?.products;
    const image = product?.product_images.find((img) => img.is_primary);

    return {
      id: item.id,
      title: product?.title || "Unknown Product",
      size: variant?.sizes?.name || "Unknown Size",
      color: variant?.colors?.name || "Unknown Color",
      price: item.price_at_time,
      originalPrice: Number(variant?.price ?? item.price_at_time),
      quantity: item.quantity,
      src: image?.url || DEFAULT_PRODUCT_IMAGE_URL,
      alt: image?.alt || "Product Image",
    };
  });

  return <CartClient initialItems={formattedCartItems} />;
}
