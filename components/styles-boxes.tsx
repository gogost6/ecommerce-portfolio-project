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
      href={`/shop/${slug}`}
      className={cn(
        "group relative h-48 w-full cursor-pointer overflow-hidden md:h-72",
        colClass,
      )}
    >
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(
          "h-full w-full rounded-lg object-cover transition group-hover:scale-105",
          imgClass,
        )}
      />
      <p className="absolute top-4 left-6 text-2xl font-bold">{name}</p>
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
    <section className="mx-4 mb-12 max-w-7xl rounded-2xl bg-gray-200 px-6 pt-10 pb-7 md:mx-auto md:px-16 md:py-16">
      <h3 className="mb-7 text-center text-3xl font-black md:mb-16 md:text-5xl">
        BROWSE BY DRESS STYLE
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        {categories?.map((category) => {
          const ui = categoryUIConfig[category.slug];

          if (!ui) return null; // skip if no UI config

          return <StyleBox key={category.id} {...ui} {...category} />;
        })}
      </div>
    </section>
  );
};
