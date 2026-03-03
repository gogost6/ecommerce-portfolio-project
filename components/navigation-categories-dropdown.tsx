import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

export async function NavigationCategoriesDropdown({
  gender,
}: {
  gender: string;
}) {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, name");

  return (
    <DropdownMenuContent align="center" className="w-48">
      {categories?.map((category) => (
        <DropdownMenuItem key={category.slug} asChild>
          <Link href={`/shop/${category.slug}/${gender}`}>{category.name}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
