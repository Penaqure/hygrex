import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact HYGERX for equipment rental enquiries, specifications and project support in Dubai and across the UAE.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to our team" intro="For rental enquiries, specifications and project support." image="banner-contact" position="50% 50%" />
      <Contact />
    </>
  );
}
