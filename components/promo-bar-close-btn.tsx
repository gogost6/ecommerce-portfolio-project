"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

export const PromoBarCloseBtn = () => {
  const handleClose = () => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("promoBarClosed") === "true") return;
    const promoBar = document.querySelector(".promo-bar");
    if (promoBar) {
      promoBar.classList.add("hidden");
      localStorage.setItem("promoBarClosed", "true");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      localStorage.getItem("promoBarClosed") === "false" ||
      !localStorage.getItem("promoBarClosed")
    ) {
      const promoBar = document.querySelector(".promo-bar");
      if (promoBar) {
        promoBar.classList.remove("opacity-0");
        promoBar.classList.remove("hidden");
      }
    }
  }, []);

  return (
    <X
      color="white"
      onClick={handleClose}
      className="absolute top-1 right-1 cursor-pointer"
    />
  );
};
