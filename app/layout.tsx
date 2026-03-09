import { CartSessionInit } from "@/components/cart-session-init";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { PromoBar } from "@/components/promo-bar";
import { ScreenDim } from "@/components/screen-dim";
import ToastProvider from "@/components/toast-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "G. Stoilkov Showcase Project",
    template: "%s | G. Stoilkov Showcase Project",
  },
  description:
    "Ecommerce shop built with Next.js 16, Supabase, and Tailwind CSS by Georgi Stoilkov",
  openGraph: {
    title: "G. Stoilkov Showcase Project",
    type: "website",
    description:
      "Ecommerce shop built with Next.js 16, Supabase, and Tailwind CSS by Georgi Stoilkov",
    url: defaultUrl,
    siteName: "G. Stoilkov Showcase Project",
  },
  twitter: {
    card: "summary_large_image",
    title: "G. Stoilkov Showcase Project",
    description:
      "Ecommerce shop built with Next.js 16, Supabase, and Tailwind CSS by Georgi Stoilkov",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <PromoBar />
            <Navigation />
            {children}
            <Footer />
            <ScreenDim />
          </ToastProvider>
        </ThemeProvider>
        <CartSessionInit />
        <Analytics />
      </body>
    </html>
  );
}
