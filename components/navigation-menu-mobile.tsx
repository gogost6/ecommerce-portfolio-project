"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const NavigationMenuMobile = () => {
  const handleMenuToggle = () => {
    const menu = document.querySelector(".mobile-menu");
    if (menu) {
      menu.classList.toggle("opacity-0");
      menu.classList.toggle("translate-x-[-100%]");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMenuToggle}
        className="md:hidden"
      >
        <Menu />
      </Button>
      <div className="mobile-menu w-screen h-screen md:hidden z-10 transition-all -top-8 left-0 absolute opacity-0 translate-x-[-100%] bg-white">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row justify-between items-center mt-4 mb-2">
            <p className="font-black text-2xl">SHOP.CO</p>
            <Button variant="ghost" size="icon" onClick={handleMenuToggle}>
              <X />
            </Button>
          </div>
          <Button variant="outline" asChild onClick={handleMenuToggle}>
            <Link href="#">Home</Link>
          </Button>
          <Button variant="outline" asChild onClick={handleMenuToggle}>
            <Link href="#">Shop</Link>
          </Button>
          <Button variant="outline" asChild onClick={handleMenuToggle}>
            <Link href="#">About</Link>
          </Button>
          <Button variant="outline" asChild onClick={handleMenuToggle}>
            <Link href="#">Contact</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
