import { Footer, FloatingActions } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { QuoteDrawer } from "@/components/QuoteDrawer";
import { getCompany, getPublishedFleet } from "@/lib/store";

// Rendered per request so admin changes appear on the site immediately.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [company, equipment] = await Promise.all([getCompany(), getPublishedFleet()]);
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

  return (
    <Providers company={company} equipment={equipment}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <QuoteDrawer />
      <FloatingActions />
    </Providers>
  );
}
