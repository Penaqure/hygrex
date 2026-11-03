import type { Metadata } from "next";
import { CtaBand, PageHeader } from "@/components/PageHeader";
import { Coverage, Process } from "@/components/Sections";

export const metadata: Metadata = {
  title: "How It Works",
  description: "From enquiry to site in four steps: build your list, send your enquiry, we deliver anywhere in the UAE, and you build with on-ground support.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="How it works" title="Renting, made simple" intro="Pick your machines, tell us your dates, and we deliver to your site anywhere in the UAE." image="banner-how-it-works" position="50% 65%" />
      <Process />
      <Coverage />
      <CtaBand />
    </>
  );
}
