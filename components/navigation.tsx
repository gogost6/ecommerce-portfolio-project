import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { NavigationMenuMobile } from "./navigation-menu-mobile";
import { Button } from "./ui/button";

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-5 relative">
      <div className="flex gap-2 items-center">
        <NavigationMenuMobile />
        <p className="font-black text-2xl">SHOP.CO</p>
      </div>
      <div className="flex flex-row gap-1 text-2xl">
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/protected">
            <CircleUser />
          </Link>
        </Button>
      </div>
    </nav>
  );
};
