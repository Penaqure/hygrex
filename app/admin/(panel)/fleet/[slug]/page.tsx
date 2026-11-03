import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { saveFleet } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FleetForm } from "@/components/admin/FleetForm";
import { requireAdmin } from "@/lib/auth";
import { getAllFleet } from "@/lib/store";

export const metadata: Metadata = { title: "Edit machine" };

export default async function EditFleetPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const machine = (await getAllFleet()).find((e) => e.slug === slug);
  if (!machine) notFound();
  return (
    <>
      <AdminHeader title={`Edit ${machine.name}`} />
      <FleetForm action={saveFleet.bind(null, slug)} machine={machine} />
    </>
  );
}
