import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { countEnquiries } from "@/lib/store";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const { new: newEnquiries } = await countEnquiries();
  return (
    <>
      <AdminNav newEnquiries={newEnquiries} />
      <main className="p-4 sm:p-8 lg:ml-60">{children}</main>
    </>
  );
}
