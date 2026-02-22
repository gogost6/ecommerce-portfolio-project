import Image from "next/image";
import Link from "next/link";
import { Star } from "./icons/star";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl flex flex-col md:flex-row mx-auto">
        <div className="px-4 pt-10 md:h-[653px] md:w-1/2 md:pt-0 md:flex md:flex-col md:justify-center">
          <h1 className="font-black leading-8 text-4xl mb-5 md:mb-8 md:text-6xl">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button asChild className="mb-5 w-full md:hidden">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button className="mb-12 w-52 hidden md:block" size={"lg"}>
            <Link href="/products">Shop Now</Link>
          </Button>
          <div className="flex justify-center md:justify-start flex-col md:flex-row items-center">
            <div className="flex gap-7 items-center mb-3 md:mb-0">
              <div>
                <p className="font-black md:font-bold text-2xl md:text-4xl">
                  200+
                </p>
                <p className="text-xs md:text-base text-gray-600">
                  International Brands
                </p>
              </div>
              <div className="w-[1px] self-stretch bg-gray-200"></div>
              <div>
                <p className="font-black md:font-bold text-2xl md:text-4xl">
                  2,000+
                </p>
                <p className="text-xs md:text-base text-gray-600">
                  High-Quality Products
                </p>
              </div>
            </div>
            <div className="hidden md:block w-[1px] self-stretch bg-gray-200 mx-7"></div>
            <div>
              <p className="font-black md:font-bold text-2xl md:text-4xl">
                30,000+
              </p>
              <p className="text-xs md:text-base text-gray-600">
                Happy customers
              </p>
            </div>
          </div>
        </div>
        <div className="relative md:w-full">
          <Star className="absolute top-36 left-10 md:w-14 md:h-14 md:top-72 md:left-40" />
          <Star className="absolute top-16 right-10 md:w-28 md:h-28" />
          <Image
            src="/hero.png"
            alt="Hero Image"
            className="md:hidden w-full"
            width={400}
            height={600}
          />
          <Image
            src="/hero-desktop.png"
            alt="Hero Image Desktop"
            className="hidden md:block absolute -right-20 h-full object-contain"
            width={1400}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};
