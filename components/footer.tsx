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
    <footer className="relative mt-44 bg-gray-200 px-4 pt-48 pb-20 md:pt-36">
      <SubscribeToNewsletter />
      <div className="mx-auto max-w-7xl">
        <div className="lg:hidden">
          <h3 className="mb-3 text-3xl font-black">SHOP.CO</h3>
          <p className="mb-5 text-sm text-gray-600">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="mb-6 flex flex-row gap-3">
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
        <div className="mb-10 grid grid-cols-2 gap-x-20 gap-y-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="hidden lg:block">
            <h3 className="mb-6 text-4xl font-black md:leading-5">SHOP.CO</h3>
            <p className="mb-9 text-sm text-gray-600">
              We have clothes that suits your style and{" "}
              <br className="hidden md:block" /> which you’re proud to wear.{" "}
              <br className="hidden md:block" />
              From women to men.
            </p>
            <div className="mb-6 flex flex-row gap-3">
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
              <h4 className="mb-4 text-sm text-black md:mb-6">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-gray-800"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mb-4 h-px bg-gray-300"></div>
        <div className="mx-auto flex max-w-7xl flex-col justify-between md:flex-row">
          <p className="mb-4 text-center text-sm text-gray-600">
            Shop.co © 2000-2021, All rights reserved
          </p>
          <div className="flex flex-row items-center justify-center gap-2.5">
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
