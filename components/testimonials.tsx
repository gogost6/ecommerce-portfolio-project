import { CircleCheck } from "lucide-react";
import { StarRating } from "./star-rating";
import Testimonials from "./testimonials.client";

type Testimonial = {
  name: string;
  verified?: boolean;
  rating: number;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    verified: true,
    rating: 5,
    text: `I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.`,
  },
  {
    name: "Alex P.",
    verified: true,
    rating: 5,
    text: `Shipping was fast and the fit was perfect. The materials feel premium and the attention to detail is amazing.`,
  },
  {
    name: "Daniel K.",
    verified: true,
    rating: 5,
    text: `Customer support was super helpful and the items look even better in person. Definitely ordering again.`,
  },
];

export default function TestimonialsSection() {
  return (
    <Testimonials
      title={
        <h3 className="font-black text-4xl sm:text-6xl leading-[0.95] tracking-tight">
          OUR HAPPY
          <br />
          CUSTOMERS
        </h3>
      }
    >
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className="flex-[0_0_100%] px-4">
          <div className="max-w-4xl">
            <div className="border border-gray-200 rounded-[32px] p-8 sm:p-10 bg-white">
              <StarRating rating={t.rating} className="mb-5" />

              <div className="flex items-center gap-3 mb-4">
                <p className="font-bold text-2xl">{t.name}</p>
                {t.verified && (
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-500">
                    <CircleCheck className="h-5 w-5 text-white" />
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-xl leading-relaxed">
                “{t.text}”
              </p>
            </div>
          </div>
        </div>
      ))}
    </Testimonials>
  );
}
