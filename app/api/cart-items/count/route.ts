import { db } from "@/drizzle";
import { cartItems } from "@/drizzle/schema";
import { getActiveCart } from "@/lib/serverUtils";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cart = await getActiveCart();

    if (!cart) {
      return new NextResponse(JSON.stringify({ count: 0 }), { status: 200 });
    }

    const result = await db
      .select({ quantity: cartItems.quantity })
      .from(cartItems)
      .where(eq(cartItems.cartId, cart.id));

    const totalQuantity = result.reduce(
      (sum, item) => sum + (item.quantity ?? 0),
      0,
    );

    return new NextResponse(JSON.stringify({ count: totalQuantity }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error counting cart items:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to count cart items" }),
      { status: 500 },
    );
  }
}
