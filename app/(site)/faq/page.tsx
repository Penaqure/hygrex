import type { Metadata } from "next";
import { CtaBand, PageHeader } from "@/components/PageHeader";
import { FAQ } from "@/components/Sections";
import { getFaqs } from "@/lib/store";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about renting heavy equipment from HYGERX: rental terms, delivery, equipment condition and quotes.",
};

export default async function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Questions, answered" intro="What customers usually ask before they rent. Can't find yours? Our team is one message away." />
      <FAQ faqs={await getFaqs()} />
      <CtaBand title="Still have a question?" body="Send us your project details and our team will get back to you." />
    </>
  );
}
