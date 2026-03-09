"use client";

import { subscribeNewsletter } from "@/actions/subscribe-newsletter";
import { Mail } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      className="w-full"
      disabled={pending}
    >
      {pending ? "Subscribing..." : "Subscribe to newsletter"}
    </Button>
  );
}

export const SubscribeToNewsletter = () => {
  const [state, action] = useActionState(subscribeNewsletter, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="absolute -top-34.25 left-1/2 w-11/12 max-w-7xl -translate-x-1/2 transform rounded-xl bg-black px-6 py-10 md:-top-24 md:flex md:items-center md:px-16 md:py-11">
      <h3 className="mb-8 text-3xl font-black text-white md:mb-0 lg:text-4xl xl:text-5xl">
        STAY UPTO DATE ABOUT <br className="hidden md:block" /> OUR LATEST
        OFFERS
      </h3>

      <form action={action} className="md:ml-auto md:w-80">
        <Input
          name="email"
          startIcon={<Mail size={16} />}
          type="email"
          placeholder="Enter your email address"
          className="mb-3 bg-white text-black"
          required
        />

        <SubmitButton />
      </form>
    </section>
  );
};
