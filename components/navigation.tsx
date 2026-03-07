import { createClient } from "@/lib/supabase/server";
import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CartBadge } from "./cart-badge";
import { NavigationCategoriesDropdown } from "./navigation-categories-dropdown";
import { NavigationMenuMobile } from "./navigation-menu-mobile";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "#" },
  { name: "Women", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export const Navigation = async () => {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, name")
    .order("name", { ascending: true });

  const safeCategories = categories ?? [];

  return (
    <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
      <div className="flex items-center gap-2">
        <NavigationMenuMobile links={LINKS} />
        <Link href={"/"} className="text-2xl font-black md:text-3xl">
          SHOP.CO
        </Link>
      </div>

      <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
        {LINKS.map((link) => {
          if (link.name === "Men") {
            return (
              <NavigationCategoriesDropdown
                key={link.name}
                label="Men"
                gender="men"
                categories={safeCategories}
              />
            );
          }

          if (link.name === "Women") {
            return (
              <NavigationCategoriesDropdown
                key={link.name}
                label="Women"
                gender="women"
                categories={safeCategories}
              />
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-light underline-offset-4 hover:underline"
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-1 flex-row justify-end gap-1 text-2xl">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search />
        </Button>

        <form className="mx-4 hidden w-full max-w-[577px] md:block">
          <Input
            startIcon={<Search size={24} />}
            placeholder="Search for products..."
            name="search"
          />
        </form>

        <Button variant="ghost" size="icon" asChild className="relative">
          <Link href="/cart" className="relative">
            <ShoppingCart />
            <CartBadge />
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
