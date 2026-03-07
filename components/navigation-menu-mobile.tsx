"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const NavigationMenuMobile = ({
  links,
}: {
  links: { name: string; href: string }[];
}) => {
  const handleMenuToggle = () => {
    const menu = document.querySelector(".mobile-menu");
    if (menu) {
      menu.classList.toggle("opacity-0");
      menu.classList.toggle("-translate-x-full");
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
      <div className="mobile-menu absolute -top-8 left-0 z-10 h-screen w-screen -translate-x-full bg-white opacity-0 transition-all md:hidden">
        <div className="flex flex-col gap-4 p-4">
          <div className="mt-4 mb-2 flex flex-row items-center justify-between">
            <p className="text-2xl font-black">SHOP.CO</p>
            <Button variant="ghost" size="icon" onClick={handleMenuToggle}>
              <X />
            </Button>
          </div>
          {links.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              asChild
              onClick={handleMenuToggle}
            >
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};
