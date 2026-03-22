import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hukamnama — Daily Divine Order from Sri Darbar Sahib",
  description:
    "Read today's Hukamnama (divine order) from Sri Darbar Sahib, the Golden Temple, Amritsar. Gurmukhi and English translation.",
  keywords: ["Hukamnama", "Golden Temple", "Gurbani", "Sikh", "Daily Hukam"],
  openGraph: {
    title: "Hukamnama — Daily Divine Order",
    description: "Today's Hukamnama from Sri Darbar Sahib, Amritsar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

