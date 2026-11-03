import type { Metadata } from "next";
import { Fleet } from "@/components/Fleet";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Our Fleet",
  description: "Mobile cranes, crawler cranes, excavators, wheel loaders, skid steers, backhoe loaders and telehandlers for rent across the UAE.",
};

export default function FleetPage() {
  return (
    <>
      <PageHeader eyebrow="Our fleet" title="Machines for rent" intro="Search the fleet, add what you need to your quote list, and send it to our team in one tap." image="banner-fleet" position="50% 55%" />
      <Fleet />
    </>
  );
}
