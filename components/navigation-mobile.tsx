import { CircleUser, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const NavigationMobile = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-5">
      <div className="flex gap-2 items-center">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
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
