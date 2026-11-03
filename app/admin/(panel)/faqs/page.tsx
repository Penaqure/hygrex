import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import { deleteFaq, moveFaq, saveFaq } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { FaqForm } from "@/components/admin/FaqForm";
import { requireAdmin } from "@/lib/auth";
import { getFaqs } from "@/lib/store";

export const metadata: Metadata = { title: "FAQs" };

const iconButton = "grid h-9 w-9 place-items-center rounded-lg text-ink-600 transition hover:bg-steel hover:text-ink-900 disabled:opacity-30 disabled:hover:bg-transparent";

export default async function FaqsAdminPage() {
  await requireAdmin();
  const faqs = await getFaqs();
  return (
    <div className="max-w-3xl">
      <AdminHeader title="FAQs" intro="Shown on the FAQ page, in this order." />
      <ul className="space-y-4">
        {faqs.map((f, i) => (
          <li key={f.id} className="card relative p-5">
            <FaqForm action={saveFaq.bind(null, f.id)} faq={f} />
            <div className="absolute bottom-5 right-5 flex items-center">
              <form action={moveFaq.bind(null, f.id, -1)}>
                <button className={iconButton} disabled={i === 0} aria-label="Move question up" title="Move up">
                  <ArrowUp className="h-4 w-4" />
                </button>
              </form>
              <form action={moveFaq.bind(null, f.id, 1)}>
                <button className={iconButton} disabled={i === faqs.length - 1} aria-label="Move question down" title="Move down">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </form>
              <form action={deleteFaq.bind(null, f.id)}>
                <ConfirmButton message="Delete this question? This can't be undone." label="Delete question" className={`${iconButton} hover:!text-red-600`}>
                  <Trash2 className="h-4 w-4" />
                </ConfirmButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
      <section className="card mt-6 border-dashed p-5">
        <h2 className="mb-3 font-extrabold">Add a question</h2>
        <FaqForm action={saveFaq.bind(null, null)} />
      </section>
    </div>
  );
}
