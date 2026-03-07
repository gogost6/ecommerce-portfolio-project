import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getOwnedCartItemIdOrNull(cartItemId: number) {
  const supabase = await createClient();
  const cookiesStore = await cookies();

  const userId = (await supabase.auth.getUser()).data?.user?.id;
  const sessionId = cookiesStore.get("cart_session_id")?.value;

  let cartQuery = supabase.from("carts").select("id").eq("is_active", true);

  if (sessionId) {
    cartQuery = cartQuery.eq("session_id", sessionId);
  } else if (userId) {
    cartQuery = cartQuery.eq("user_id", userId);
  } else {
    return null;
  }

  const { data: cart } = await cartQuery.single();

  if (!cart) {
    return null;
  }

  const { data: cartItem } = await supabase
    .from("cart_items")
    .select("id")
    .eq("id", cartItemId)
    .eq("cart_id", cart.id)
    .single();

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

    const supabase = await createClient();

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", ownedCartItemId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
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

    const supabase = await createClient();

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", ownedCartItemId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
