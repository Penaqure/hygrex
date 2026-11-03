import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth";
import { getCompany } from "@/lib/store";

export const metadata: Metadata = { title: "Company" };

export default async function SettingsPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="Company details" intro="Used across the website, the footer and enquiry messages." />
      <SettingsForm company={await getCompany()} />
    </>
  );
}
