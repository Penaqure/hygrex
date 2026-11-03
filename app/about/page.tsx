import type { Metadata } from "next";
import { About } from "@/components/About";
import { CtaBand, PageHeader } from "@/components/PageHeader";
import { WhyUs } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About Us",
  description: "HYGERX Heavy Equipment Rental is your reliable partner for heavy machinery solutions in Dubai and across the UAE.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About HYGERX" title="Built for a stronger tomorrow" intro="Well-maintained heavy machinery for construction, industrial and infrastructure projects, from our base in Dubai." />
      <About />
      <WhyUs />
      <CtaBand />
    </>
  );
}
