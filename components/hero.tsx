import Image from "next/image";
import Link from "next/link";
import { Star } from "./icons/star";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="bg-gray-100">
      <div className=" px-4 pt-10">
        <h1 className="font-black leading-8 text-4xl mb-5">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button asChild className="mb-5 w-full">
          <Link href="/products">Shop Now</Link>
        </Button>
        <div className="flex justify-center flex-col items-center">
          <div className="flex gap-7 items-center mb-3">
            <div>
              <p className="font-black text-2xl">200+</p>
              <p className="text-xs text-gray-600">International Brands</p>
            </div>
            <div className="w-[1px] self-stretch bg-gray-200"></div>
            <div>
              <p className="font-black text-2xl">2,000+</p>
              <p className="text-xs text-gray-600">High-Quality Products</p>
            </div>
          </div>
          <div>
            <p className="font-black text-2xl">30,000+</p>
            <p className="text-xs text-gray-600">Happy customers</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <Star className="absolute top-36 left-10" />
        <Star className="absolute top-16 right-10" />
        <Image src="/hero.png" alt="Hero Image" width={1200} height={600} />
      </div>
    </section>
  );
};
