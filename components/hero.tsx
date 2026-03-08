import Image from "next/image";
import Link from "next/link";
import { Star } from "./icons/star";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <div className="px-4 pt-10 md:flex md:h-163.25 md:w-1/2 md:flex-col md:justify-center md:pt-0">
          <h1 className="mb-5 text-4xl leading-14 font-black md:mb-8 md:text-6xl">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mb-6 text-sm text-gray-600 md:mb-8 md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button asChild className="mb-5 w-full md:hidden">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button className="mb-12 hidden w-52 md:flex" size={"lg"} asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-start">
            <div className="mb-3 flex items-center gap-7 md:mb-0">
              <div>
                <p className="text-2xl font-black md:text-4xl md:font-bold">
                  200+
                </p>
                <p className="text-xs text-gray-600 md:text-base">
                  International Brands
                </p>
              </div>
              <div className="w-px self-stretch bg-gray-200"></div>
              <div>
                <p className="text-2xl font-black md:text-4xl md:font-bold">
                  2,000+
                </p>
                <p className="text-xs text-gray-600 md:text-base">
                  High-Quality Products
                </p>
              </div>
            </div>
            <div className="mx-7 hidden w-px self-stretch bg-gray-200 md:block"></div>
            <div>
              <p className="text-2xl font-black md:text-4xl md:font-bold">
                30,000+
              </p>
              <p className="text-xs text-gray-600 md:text-base">
                Happy customers
              </p>
            </div>
          </div>
        </div>
        <div className="relative md:w-full">
          <Star className="absolute top-36 left-10 md:top-72 md:left-40 md:h-14 md:w-14" />
          <Star className="absolute top-16 right-10 md:h-28 md:w-28" />
          <Image
            src="/hero.png"
            alt="Hero Image"
            className="w-full md:hidden"
            width={400}
            height={600}
          />
          <Image
            src="/hero-desktop.png"
            alt="Hero Image Desktop"
            className="absolute -right-20 hidden h-full object-contain md:block"
            width={1400}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};
