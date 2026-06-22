import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abenezerfurniture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abenezer Furniture | Home & Office Furniture in Dessie, Ethiopia",
    template: "%s | Abenezer Furniture",
  },
  description:
    "Abenezer Furniture manufactures and sells quality home and office furniture in Dessie, Ethiopia, near Furkan Masjid. Beds, sofas, dining tables, chairs, wardrobes, doors, office and custom furniture. Call 0914-7147-18.",
  keywords: [
    "Abenezer Furniture", "furniture Dessie", "Ethiopia furniture", "Dessie furniture shop",
    "home furniture Ethiopia", "office furniture Dessie", "beds Ethiopia", "sofas Dessie",
    "wardrobes Dessie", "custom furniture Ethiopia", "furniture near Furkan Masjid",
  ],
  authors: [{ name: "Abenezer Furniture" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Abenezer Furniture",
    title: "Abenezer Furniture | Home & Office Furniture in Dessie, Ethiopia",
    description:
      "Quality, handcrafted home and office furniture in Dessie, Ethiopia. Browse beds, sofas, dining tables, wardrobes, doors and more.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abenezer Furniture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abenezer Furniture | Dessie, Ethiopia",
    description: "Quality home and office furniture manufacturing and sales in Dessie, Ethiopia.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Abenezer Furniture",
  image: `${siteUrl}/og-image.jpg`,
  telephone: "+251914714718",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dessie",
    addressRegion: "Amhara",
    addressCountry: "ET",
    streetAddress: "Near Furkan Masjid",
  },
  url: siteUrl,
  priceRange: "$$",
  openingHours: "Mo-Sa 08:00-19:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
