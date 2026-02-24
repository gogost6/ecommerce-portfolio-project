import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const categoryUIConfig: Record<
  string,
  {
    src: string;
    imgClass: string;
    colClass: string;
  }
> = {
  casual: {
    src: "/casual-style.png",
    imgClass: "object-right",
    colClass: "md:col-span-4",
  },
  formal: {
    src: "/formal-style.png",
    imgClass: "object-left",
    colClass: "md:col-span-8",
  },
  party: {
    src: "/party-style.png",
    imgClass: "object-center",
    colClass: "md:col-span-8",
  },
  gym: {
    src: "/gym-style.png",
    imgClass: "object-right",
    colClass: "md:col-span-4",
  },
};

const StyleBox = ({
  src,
  alt,
  name,
  slug,
  colClass = "",
  imgClass = "",
}: {
  src: string;
  alt?: string;
  name: string;
  slug: string;
  colClass?: string;
  imgClass?: string;
}) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className={cn(
        "h-48 md:h-72 w-full relative cursor-pointer group overflow-hidden",
        colClass,
      )}
    >
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(
          "object-cover w-full h-full rounded-lg transition group-hover:scale-105",
          imgClass,
        )}
      />
      <p className="font-bold text-2xl absolute left-6 top-4">{name}</p>
    </Link>
  );
};

export const StylesBoxes = async () => {
  const supabase = createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at");

  return (
    <section className="mx-4 px-6 md:px-16 pt-10 pb-7 md:py-16 rounded-2xl bg-gray-200 mb-12 max-w-7xl md:mx-auto">
      <h3 className="font-black text-3xl md:text-5xl mb-7 md:mb-16 text-center">
        BROWSE BY DRESS STYLE
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {categories?.map((category) => {
          const ui = categoryUIConfig[category.slug];

          if (!ui) return null; // skip if no UI config

          return <StyleBox key={category.id} {...ui} {...category} />;
        })}
      </div>
    </section>
  );
};
