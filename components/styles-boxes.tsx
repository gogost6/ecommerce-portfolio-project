import { cn } from "@/lib/utils";
import Image from "next/image";

const styles = [
  {
    src: "/casual-style.png",
    alt: "Casual Style",
    title: "Casual",
    colClass: "md:col-span-4",
    imgClass: "object-right",
  },
  {
    src: "/formal-style.png",
    alt: "Formal Style",
    title: "Formal",
    colClass: "md:col-span-8",
    imgClass: "object-left",
  },
  {
    src: "/party-style.png",
    alt: "Party Style",
    title: "Party",
    colClass: "md:col-span-8",
    imgClass: "object-center",
  },
  {
    src: "/gym-style.png",
    alt: "Gym Style",
    title: "Gym",
    colClass: "md:col-span-4",
    imgClass: "object-right",
  },
];

const StyleBox = ({
  src,
  alt,
  title,
  colClass = "",
  imgClass = "",
}: {
  src: string;
  alt?: string;
  title: string;
  colClass?: string;
  imgClass?: string;
}) => {
  return (
    <div
      className={cn(
        "h-48 md:h-72 w-full relative cursor-pointer group",
        colClass,
      )}
    >
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(
          "object-cover w-full h-full rounded-lg transition",
          imgClass,
        )}
      />
      <p className="font-bold text-2xl absolute left-6 top-4">{title}</p>
    </div>
  );
};

export const StylesBoxes = () => {
  return (
    <section className="mx-4 px-6 md:px-16 pt-10 pb-7 md:py-16 rounded-2xl bg-gray-200 mb-12 max-w-7xl md:mx-auto">
      <h3 className="font-black text-3xl md:text-5xl mb-7 md:mb-16 text-center">
        BROWSE BY DRESS STYLE
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {styles.map((style) => (
          <StyleBox key={style.title} {...style} />
        ))}
      </div>
    </section>
  );
};
