import { db } from "@/drizzle";
import { cartItems } from "@/drizzle/schema";
import { getActiveCart } from "@/lib/serverUtils";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getOwnedCartItemIdOrNull(cartItemId: number) {
  const cart = await getActiveCart();

  if (!cart) {
    return null;
  }

  const [cartItem] = await db
    .select({ id: cartItems.id })
    .from(cartItems)
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cart.id)))
    .limit(1);

  return cartItem?.id ?? null;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const cartItemId = Number(id);

    if (!Number.isFinite(cartItemId)) {
      return NextResponse.json(
        { error: "Invalid cart item id" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const quantity = Number(body?.quantity);

    if (!Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const ownedCartItemId = await getOwnedCartItemIdOrNull(cartItemId);

    if (!ownedCartItemId) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, ownedCartItemId));

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Unexpected server error", message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const cartItemId = Number(id);

    if (!Number.isFinite(cartItemId)) {
      return NextResponse.json(
        { error: "Invalid cart item id" },
        { status: 400 },
      );
    }

    const ownedCartItemId = await getOwnedCartItemIdOrNull(cartItemId);

    if (!ownedCartItemId) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 },
      );
    }

    await db.delete(cartItems).where(eq(cartItems.id, ownedCartItemId));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
