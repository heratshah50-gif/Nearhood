import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nearhood | Buy Together. Save Together.",
  description: "Join thousands of smart buyers unlocking group discounts on premium properties. Real estate group buying platform for maximum savings.",
  keywords: ["real estate", "group buying", "property discount", "home buying", "collective purchasing", "Nearhood"],
  authors: [{ name: "Nearhood" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Nearhood | Buy Together. Save Together.",
    description: "Join thousands of smart buyers unlocking group discounts on premium properties.",
    type: "website",
    locale: "en_IN",
    siteName: "Nearhood",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nearhood | Buy Together. Save Together.",
    description: "Join thousands of smart buyers unlocking group discounts on premium properties.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={{ backgroundColor: "#FFFFFF" }}>
      <body
        className={`${outfit.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-body)", backgroundColor: "#FFFFFF", margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
