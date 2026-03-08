"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type NavigationMenuMobileProps = {
  links: { name: string; href: string }[];
};

export const NavigationMenuMobile = ({ links }: NavigationMenuMobileProps) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden"
      >
        <Menu />
      </Button>

      <div
        className={cn(
          "absolute top-0 left-0 z-10 h-screen w-screen bg-white transition-all md:hidden",
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
        )}
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="mb-2 flex flex-row items-center justify-between">
            <p className="text-2xl font-black">SHOP.CO</p>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X />
            </Button>
          </div>

          {links.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              asChild
              onClick={closeMenu}
            >
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};
