import type { Metadata } from "next";
import { CraneFinder } from "@/components/CraneFinder";
import { CtaBand, PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Crane Finder",
  description: "Find out whether a mobile crane, crawler crane or telehandler fits your lift, based on load, ground conditions and lifting pattern.",
};

export default function CraneFinderPage() {
  return (
    <>
      <PageHeader eyebrow="Interactive tool" title="Find the right crane" intro="An indicative match for your lift, based on the load, the ground and how you'll work." image="banner-crane-finder" position="50% 40%" />
      <CraneFinder />
      <CtaBand title="Got a lift plan?" body="Our team will confirm the right machine against your radius, boom length and site conditions." />
    </>
  );
}
