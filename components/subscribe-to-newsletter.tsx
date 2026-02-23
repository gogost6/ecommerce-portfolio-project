import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SubscribeToNewsletter = () => {
  return (
    <section className="mx-4 bg-black rounded-xl px-6 py-10 absolute top-[-137px] max-w-7xl md:w-full md:mx-0 md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:px-16 md:py-11 md:-top-24">
      <h3 className="font-black text-3xl md:text-5xl mb-8 text-white md:mb-0">
        STAY UPTO DATE ABOUT <br className="hidden md:block" /> OUR LATEST
        OFFERS
      </h3>
      <form className="md:w-80 md:ml-auto">
        <Input
          startIcon={<Mail size={16} />}
          type="email"
          placeholder="Enter your email address"
          className="mb-3 bg-white text-black"
        />
        <Button type="submit" variant="secondary" className="w-full">
          Subscribe to newsletter
        </Button>
      </form>
    </section>
  );
};
