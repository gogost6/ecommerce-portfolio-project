import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { NavigationMenuMobile } from "./navigation-menu-mobile";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LINKS = [
  { name: "Home", href: "#" },
  { name: "Shop", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-5 relative max-w-7xl mx-auto">
      <div className="flex gap-2 items-center">
        <NavigationMenuMobile links={LINKS} />
        <p className="font-black text-2xl md:text-3xl">SHOP.CO</p>
      </div>
      <div className="hidden md:flex gap-6 items-center flex-1 justify-center">
        {LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-base hover:underline underline-offset-4 font-light"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-row gap-1 text-2xl flex-1 justify-end">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search />
        </Button>
        <form className="max-w-[577px] w-full mx-4 hidden md:block">
          <Input
            startIcon={<Search size={24} />}
            placeholder="Search for products..."
            name="search"
          />
        </form>
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
