"use client";

import * as Accordion from "@radix-ui/react-accordion";

const faqs = [
  {
    id: "sizes",
    question: "What sizes do your clothes come in?",
    answer:
      "We offer sizes XS through XXL. Please check each product’s size chart for exact measurements before ordering.",
  },
  {
    id: "size-guide",
    question: "How do I choose the right size?",
    answer:
      "Use the size guide available on every product page. If you're between sizes, we recommend sizing up for a more relaxed fit.",
  },
  {
    id: "returns",
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 30 days of delivery for unworn items with original tags attached.",
  },
  {
    id: "shipping",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3–7 business days. Express delivery options are available at checkout.",
  },
  {
    id: "international",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Delivery times and shipping fees vary depending on your location.",
  },
  {
    id: "care",
    question: "How should I wash and care for my clothes?",
    answer:
      "Always follow the care label instructions. Most items should be washed cold and air-dried to preserve fabric quality.",
  },
];

export function FAQ() {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="w-full max-w-2xl mx-auto space-y-3"
    >
      {faqs.map((faq) => (
        <Accordion.Item
          key={faq.id}
          value={faq.id}
          className="border rounded-md overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-lg bg-gray-100 hover:bg-gray-200 transition">
              {faq.question}
              <span className="transition-transform duration-200 data-[state=open]:rotate-180">
                ▼
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="px-4 py-3 text-gray-700 bg-white">
            {faq.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
