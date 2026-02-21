import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SubscribeToNewsletter = () => {
  return (
    <section className="mx-4 bg-black rounded-xl px-6 py-10 absolute top-[-137px]">
      <h3 className="font-black text-3xl mb-8 text-white">
        STAY UPTO DATE ABOUT OUR LATEST OFFERS
      </h3>
      <form>
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
