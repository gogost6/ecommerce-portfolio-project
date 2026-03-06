import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function ensureCartSessionCookie() {
  const hasCookie = document.cookie
    .split("; ")
    .some((c) => c.startsWith("cart_session_id="));

  if (!hasCookie) {
    const id = uuidv4();
    document.cookie = `cart_session_id=${encodeURIComponent(id)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }
}

export const getFirst = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export function parseIds(v?: string | string[]) {
  const s = getFirst(v);
  if (!s) return [];
  return s
    .split(",")
    .map((x) => Number(x))
    .filter((n) => Number.isFinite(n));
}
