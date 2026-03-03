"use client";
import { ensureCartSessionCookie } from "@/lib/utils";
import { useEffect } from "react";

export function CartSessionInit() {
  useEffect(() => {
    ensureCartSessionCookie();
  }, []);

  return null;
}
