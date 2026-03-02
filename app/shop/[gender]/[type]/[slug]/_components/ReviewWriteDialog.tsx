"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { createClient } from "@/lib/supabase/client";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

type Props = {
  productId: number;
};

export function ReviewWriteDialog({ productId }: Props) {
  const supabase = createClient();

  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setNameError(null);
    setEmailError(null);
    setBodyError(null);

    if (!name || !email || !body) {
      setNameError(name ? null : "Name is required");
      setEmailError(email ? null : "Email is required");
      setBodyError(body ? null : "Review body is required");
      toast("Please fill all required fields", { type: "error" });
      return;
    }

    if (validator.isEmail(email)) {
      setEmailError("Invalid email address");
      toast("Please enter a valid email", { type: "error" });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("product_reviews").insert({
        product_id: productId,
        reviewer_name: name,
        reviewer_email: email,
        rating,
        body,
        is_verified_purchase: false,
        is_published: true,
      });

      if (error) throw error;

      toast("Review submitted successfully!", { type: "success" });

      // reset form
      setRating(5);
      setBody("");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Write a Review</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              Write a Review
            </Dialog.Title>
            <Dialog.Close>
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            {/* Rating */}
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rating (1-5)
                </label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-full border rounded-lg px-3 py-2 text-left flex items-center justify-between"
                    >
                      <span>{rating}</span>
                      <ChevronRight className="rotate-90" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                  >
                    <DropdownMenuLabel>Choose rating</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup
                      value={String(rating)}
                      onValueChange={(v) => setRating(Number(v))}
                    >
                      {["1", "2", "3", "4", "5"].map((r) => (
                        <DropdownMenuRadioItem key={r} value={r}>
                          {r}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Input
              placeholder="Your name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
            />

            <Input
              placeholder="Your email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />

            <Textarea
              placeholder="Write your review..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              error={bodyError}
            />

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
