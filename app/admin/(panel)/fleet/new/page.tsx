import type { Metadata } from "next";
import { saveFleet } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { FleetForm } from "@/components/admin/FleetForm";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Add machine" };

export default async function NewFleetPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="Add machine" />
      <FleetForm action={saveFleet.bind(null, null)} />
    </>
  );
}
