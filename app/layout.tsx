import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, FloatingActions } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { QuoteDrawer } from "@/components/QuoteDrawer";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "HYGERX Heavy Equipment Rental | Cranes, Excavators & Loaders in Dubai, UAE",
    template: "%s | HYGERX Heavy Equipment Rental",
  },
  description:
    "Reliable heavy equipment rental in Dubai and across the UAE — mobile cranes (25–500T), crawler cranes (55–400T), excavators up to 60T, wheel loaders, skid steers, backhoe loaders and telehandlers. Short-term & long-term.",
  keywords: ["heavy equipment rental Dubai", "crane rental UAE", "excavator rental Dubai", "mobile crane hire", "crawler crane rental", "telehandler rental"],
  openGraph: {
    title: "HYGERX Heavy Equipment Rental",
    description: "Powering your projects forward — reliable equipment, flexible rentals, delivered across the UAE.",
    images: ["/images/hero-lineup.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#1546d1" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: company.url,
  email: company.email,
  telephone: company.phones.map((p) => p.label),
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  areaServed: "United Arab Emirates",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <QuoteDrawer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
