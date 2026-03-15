import { db } from "@/db";
import { categories } from "@/drizzle/schema";
import { cn } from "@/lib/utils";
import { asc } from "drizzle-orm";
import Link from "next/link";
import { ImageWithSkeleton } from "./image-with-skeleton";

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
        "group relative h-48 w-full cursor-pointer overflow-hidden transition md:h-72",
        colClass,
      )}
    >
      <ImageWithSkeleton
        src={src}
        alt={alt || src.split(".")[0]}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(imgClass, "object-cover group-hover:scale-105")}
        containerClassName={cn("h-full w-full rounded-lg", imgClass)}
        skeletonClassName="z-10 rounded-lg w-full h-full bg-white"
      />
      <p className="absolute top-4 left-6 z-20 text-2xl font-bold">{name}</p>
    </Link>
  );
};

export const StylesBoxes = async () => {
  const cats = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.createdAt));

  return (
    <section className="mx-4 mb-12 max-w-7xl rounded-2xl bg-gray-200 px-6 pt-10 pb-7 md:mx-auto md:px-16 md:py-16">
      <h3 className="mb-7 text-center text-3xl font-black md:mb-16 md:text-5xl">
        BROWSE BY DRESS STYLE
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        {cats?.map((category) => {
          const ui = categoryUIConfig[category.slug];

          if (!ui) return null; // skip if no UI config

          return <StyleBox key={category.id} {...ui} {...category} />;
        })}
      </div>
    </section>
  );
};
