import { createClient } from "@/lib/supabase/server";
import { DEFAULT_PRODUCT_IMAGE_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { CartItem } from "./_components/cart-item";
import { CartOrderContent } from "./_components/cart-order-content";
import { EmptyCart } from "./_components/empty-cart";
import { CartItemProps } from "./types";

export default async function Page() {
  const cookiesStore = await cookies();
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data?.user?.id;
  const sessionId = cookiesStore.get("cart_session_id")?.value;

  const cart = supabase.from("carts").select("id").eq("is_active", true);

  if (sessionId) {
    cart.eq("session_id", sessionId).single();
  } else if (userId) {
    cart.eq("user_id", userId).single();
  } else {
    // If there's no session ID and no user ID, we can assume there's no cart
    return <EmptyCart />;
  }

  const { data: carts } = await cart;

  if (!carts) {
    return <EmptyCart />;
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(
      `
      quantity,
      price_at_time,
      product_variants (
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
    .eq("cart_id", (carts as unknown as { id: string }).id);

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  const formattedCartItems: CartItemProps[] = cartItems.map((item) => {
    const variant = item.product_variants;
    const product = variant?.products;
    const image = product?.product_images.find((img) => img.is_primary);

    return {
      title: product?.title || "Unknown Product",
      size: variant?.sizes?.name || "Unknown Size",
      color: variant?.colors?.name || "Unknown Color",
      price: item.price_at_time,
      quantity: item.quantity,
      src: image?.url || DEFAULT_PRODUCT_IMAGE_URL,
      alt: image?.alt || "Product Image",
    };
  });

  const orderContentProps = cartItems.reduce(
    (acc, item) => {
      const subtotal = Number((item.price_at_time * item.quantity).toFixed(2));
      const discountPercentage = Math.round(
        100 - (item.price_at_time / item.product_variants.price) * 100,
      );
      const discount = Number(
        ((subtotal * discountPercentage) / 100).toFixed(2),
      );

      acc.subtotal += subtotal;
      acc.discount += discount;

      return acc;
    },
    {
      subtotal: 0,
      discount: 0,
    },
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4">
      <h1 className="text-3xl font-black">Cart</h1>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex shrink-0 flex-col gap-4 rounded-xl border border-gray-100 p-3.5 md:w-178.75 md:gap-6">
          {formattedCartItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <CartItem {...item} />
              {index < formattedCartItems.length - 1 && (
                <div className="mx-4 h-px bg-gray-100"></div>
              )}
            </div>
          ))}
        </div>
        <CartOrderContent {...orderContentProps} />
      </div>
    </div>
  );
}
