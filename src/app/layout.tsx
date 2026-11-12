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

// Feeds <meta description>, og:description and twitter:description.
const DESCRIPTION =
  "MEng Aerospace Engineering student at Heriot-Watt University and technical co-founder of PackSync. Projects in simulation, instrumentation and software.";

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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <a href="#main-content" className="portfolio-button sr-only z-60 focus:not-sr-only focus:fixed focus:top-3 focus:left-4">
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
