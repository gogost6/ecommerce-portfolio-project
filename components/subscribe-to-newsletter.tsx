import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SubscribeToNewsletter = () => {
  return (
    <section className="absolute top-[-137px] mx-4 max-w-7xl rounded-xl bg-black px-6 py-10 md:-top-24 md:left-1/2 md:mx-0 md:flex md:w-full md:-translate-x-1/2 md:transform md:items-center md:px-16 md:py-11">
      <h3 className="mb-8 text-3xl font-black text-white md:mb-0 md:text-5xl">
        STAY UPTO DATE ABOUT <br className="hidden md:block" /> OUR LATEST
        OFFERS
      </h3>
      <form className="md:ml-auto md:w-80">
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
