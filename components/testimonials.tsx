import { createClient } from "@/lib/supabase/client";
import { CircleCheck } from "lucide-react";
import { StarRating } from "./star-rating";
import Testimonials from "./testimonials.client";

export default async function TestimonialsSection() {
  const supabase = createClient();
  const { data } = await supabase
    .from("testimonials")
    .select()
    .order("created_at", { ascending: false })
    .limit(6);

  if (!data) return null;

  return (
    <Testimonials
      title={
        <h3 className="text-4xl font-black md:text-5xl">
          OUR HAPPY <br className="md:hidden" />
          CUSTOMERS
        </h3>
      }
    >
      {data.map((t, i) => (
        <div
          key={i}
          className="flex flex-[0_0_100%] px-4 md:flex-[0_0_33.333%]"
        >
          <div className="h-full rounded-[32px] border border-gray-200 bg-white p-8 sm:p-10">
            <StarRating rating={t.rating} className="mb-5" />
            <div className="mb-4 flex items-center gap-3">
              <p className="text-2xl font-bold">{t.name}</p>
              {t.is_verified && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                  <CircleCheck className="h-5 w-5 text-white" />
                </span>
              )}
            </div>

            <p className="text-xl leading-relaxed text-gray-500">
              “{t.description}”
            </p>
          </div>
        </div>
      ))}
    </Testimonials>
  );
}
