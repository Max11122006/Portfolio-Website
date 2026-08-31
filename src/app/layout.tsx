import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const SITE_URL = "https://www.maxdubowski.com";

// The old description claimed "future commercial pilot" and property-management
// experience, neither of which the site argues. The replacement sentence is
// being written alongside the project copy — see 02/04 in docs/portfolio-fixes.
// MUST NOT SHIP: replace before deploying.
const DESCRIPTION =
  "TODO(copy): one sentence under 155 characters, hardware-plus-software framing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Max Dubowski",
  description: DESCRIPTION,
  keywords: [
    "aerospace engineering",
    "embedded systems",
    "Heriot-Watt",
    "Edinburgh",
    "portfolio",
    "Maksymilian Dubowski",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Maksymilian Dubowski",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Maksymilian Dubowski",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maksymilian Dubowski",
    description: DESCRIPTION,
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Scroll-reveal is JS-driven: framer-motion server-renders the hidden
            state as an inline opacity:0. Without JS that content never appears,
            so force it visible when scripts don't run. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
