"use server";

import { db } from "@/drizzle";
import { carts } from "@/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getActiveCart() {
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
    return null;
  }

  const [cart] = await db
    .select({ id: carts.id })
    .from(carts)
    .where(cartCondition)
    .limit(1);

  return cart ?? null;
}
