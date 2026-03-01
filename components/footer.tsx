import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { ApplePay } from "./icons/apple-pay";
import { GooglePay } from "./icons/google-pay";
import { MasterCard } from "./icons/master-card";
import { Paypal } from "./icons/paypal";
import { Visa } from "./icons/visa";
import { SubscribeToNewsletter } from "./subscribe-to-newsletter";
import { Button } from "./ui/button";

const footerGroups = [
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Features", href: "#" },
      { label: "Works", href: "#" },
      { label: "Career", href: "#" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "#" },
      { label: "Delivery Details", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "#" },
      { label: "Manage Deliveries", href: "#" },
      { label: "Orders", href: "#" },
      { label: "Payment", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Free eBook", href: "#" },
      { label: "Development Tutorial", href: "#" },
      { label: "How to - Blog", href: "#" },
      { label: "Youtube Playlist", href: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="px-4 bg-gray-200 pt-48 md:pt-36 mt-44 pb-20 relative">
      <SubscribeToNewsletter />
      <div className="max-w-7xl mx-auto">
        <div className="md:hidden">
          <h3 className="font-black text-3xl mb-3">SHOP.CO</h3>
          <p className="text-sm text-gray-600 mb-5">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex flex-row gap-3 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.facebook.com/" target="_blank">
                <Twitter />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.twitter.com/" target="_blank">
                <Facebook />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.instagram.com/" target="_blank">
                <Instagram />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.github.com/" target="_blank">
                <Github />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-12 md:flex md:justify-between mb-10">
          <div className="hidden md:block">
            <h3 className="font-black text-4xl mb-6 md:leading-5">SHOP.CO</h3>
            <p className="text-sm text-gray-600 mb-9">
              We have clothes that suits your style and{" "}
              <br className="hidden md:block" /> which you’re proud to wear.{" "}
              <br className="hidden md:block" />
              From women to men.
            </p>
            <div className="flex flex-row gap-3 mb-6">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://www.facebook.com/" target="_blank">
                  <Twitter />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://www.twitter.com/" target="_blank">
                  <Facebook />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://www.instagram.com/" target="_blank">
                  <Instagram />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://www.github.com/" target="_blank">
                  <Github />
                </Link>
              </Button>
            </div>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm text-black mb-4 md:mb-6">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-[1px] bg-gray-300 mb-4"></div>
        <div className="flex flex-col justify-between md:flex-row mx-auto max-w-7xl">
          <p className="text-sm text-gray-600 mb-4 text-center">
            Shop.co © 2000-2021, All rights reserved
          </p>
          <div className="flex flex-row gap-2.5 justify-center items-center">
            <Visa />
            <MasterCard />
            <Paypal />
            <ApplePay />
            <GooglePay />
          </div>
        </div>
      </div>
    </footer>
  );
};
