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
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
