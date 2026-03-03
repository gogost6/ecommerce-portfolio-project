import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../database.types";

export function createClient() {
  const cartSessionId =
    typeof document !== "undefined"
      ? (document.cookie
          .split("; ")
          .find((c) => c.startsWith("cart_session_id="))
          ?.split("=")[1] ?? "")
      : "";

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        headers: {
          "x-cart-session": decodeURIComponent(cartSessionId),
        },
      },
    },
  );
}
