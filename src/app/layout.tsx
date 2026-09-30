import type { Metadata, Viewport } from "next";
import "./globals.css";

// absolute base for the link-preview image: the Vercel production domain when deployed, otherwise local
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:8784";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Pokemon - Claude Red",
  description: "A fan remake of Pokémon Red where every visual is drawn from raw pixels in code. Plays in the browser with keyboard, mouse, touch or gamepad.",
  openGraph: {
    type: "website",
    title: "Pokemon - Claude Red",
    description: "Pokémon Red remade from raw pixels in code, with the 100 Gen 2 POKéMON added under Gen 1 rules. Free fan project, runs in the browser.",
    images: [{ url: "/preview.png", width: 1280, height: 720 }],
  },
  twitter: { card: "summary_large_image" },
  // private build: keep it out of search engines (also robots.txt and an X-Robots-Tag header in next.config.ts)
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0c16",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
