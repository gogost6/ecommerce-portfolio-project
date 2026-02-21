import Image from "next/image";

const styles = [
  {
    src: "/casual-style.png",
    alt: "Casual Style",
    title: "Casual",
  },
  {
    src: "/formal-style.png",
    alt: "Formal Style",
    title: "Formal",
  },
  {
    src: "/party-style.png",
    alt: "Party Style",
    title: "Party",
  },
  {
    src: "/gym-style.png",
    alt: "Gym Style",
    title: "Gym",
  },
];

const StyleBox = ({
  src,
  alt,
  title,
}: {
  src: string;
  alt?: string;
  title: string;
}) => {
  return (
    <div className="h-48 w-full relative">
      <Image
        src={src}
        alt={alt || src.split(".")[0]}
        width={1200}
        height={600}
        className="object-cover w-full h-full rounded-lg"
      />
      <p className="font-bold text-2xl absolute left-6 top-4">{title}</p>
    </div>
  );
};

export const StylesBoxes = () => {
  return (
    <section className="mx-4 px-6 pt-10 pb-7 rounded-2xl bg-gray-200 mb-12">
      <h3 className="font-black text-3xl mb-7 text-center">
        BROWSE BY DRESS STYLE
      </h3>
      <div className="flex flex-col gap-4">
        {styles.map((style) => (
          <StyleBox key={style.title} {...style} />
        ))}
      </div>
    </section>
  );
};
