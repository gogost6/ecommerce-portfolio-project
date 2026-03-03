import { ChevronDown, CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { NavigationCategoriesDropdown } from "./navigation-categories-dropdown";
import { NavigationMenuMobile } from "./navigation-menu-mobile";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "#" },
  { name: "Women", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-5 relative max-w-7xl mx-auto">
      <div className="flex gap-2 items-center">
        <NavigationMenuMobile links={LINKS} />
        <Link href={"/"} className="font-black text-2xl md:text-3xl">
          SHOP.CO
        </Link>
      </div>
      <div className="hidden md:flex gap-6 items-center flex-1 justify-center">
        {LINKS.map((link) => {
          if (["Men", "Women"].includes(link.name)) {
            return (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger asChild>
                  <button className="text-base hover:underline underline-offset-4 font-light flex items-center gap-1">
                    {link.name} <ChevronDown size={12} />
                  </button>
                </DropdownMenuTrigger>
                <NavigationCategoriesDropdown
                  gender={link.name.toLowerCase()}
                />
              </DropdownMenu>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className="text-base hover:underline underline-offset-4 font-light"
            >
              {link.name}
            </Link>
          );
        })}
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
