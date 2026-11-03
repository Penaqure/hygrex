import { Marquee } from "@/components/About";
import { FleetPreview } from "@/components/Fleet";
import { Hero } from "@/components/Hero";
import { CtaBand } from "@/components/PageHeader";
import { WhyUs } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FleetPreview />
      <WhyUs />
      <CtaBand title="Not sure which crane fits your lift?" body="Answer three quick questions in the Crane Finder, or ask our team directly." secondary={{ href: "/crane-finder", label: "Try the Crane Finder" }} />
    </>
  );
}
