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
        <h3 className="font-black text-4xl md:text-5xl ">
          OUR HAPPY <br className="md:hidden" />
          CUSTOMERS
        </h3>
      }
    >
      {data.map((t, i) => (
        <div
          key={i}
          className="flex-[0_0_100%] md:flex-[0_0_33.333%] px-4 flex"
        >
          <div className="border border-gray-200 rounded-[32px] p-8 sm:p-10 bg-white h-full">
            <StarRating rating={t.rating} className="mb-5" />
            <div className="flex items-center gap-3 mb-4">
              <p className="font-bold text-2xl">{t.name}</p>
              {t.is_verified && (
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-500">
                  <CircleCheck className="h-5 w-5 text-white" />
                </span>
              )}
            </div>

            <p className="text-gray-500 text-xl leading-relaxed">
              “{t.description}”
            </p>
          </div>
        </div>
      ))}
    </Testimonials>
  );
}
