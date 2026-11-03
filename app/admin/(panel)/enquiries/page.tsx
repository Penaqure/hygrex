import { Mail, Phone, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteEnquiry, updateEnquiryStatus } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { WhatsAppIcon } from "@/components/Logo";
import { requireAdmin } from "@/lib/auth";
import { statusLabels, type EnquiryStatus } from "@/lib/data";
import { countEnquiries, getEnquiries } from "@/lib/store";

export const metadata: Metadata = { title: "Enquiries" };

const PAGE_SIZE = 200;
const isEmail = (v?: string): v is string => Boolean(v && /^[^\s@?&]+@[^\s@?&]+\.[^\s@?&]+$/.test(v));
const contactLink = "inline-flex items-center gap-1.5 rounded-full bg-steel/70 px-3 py-1.5 text-xs font-bold text-ink-800 transition hover:bg-brand-50 hover:text-brand-700";

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const active = status && status in statusLabels ? (status as EnquiryStatus) : null;
  const [list, counts] = await Promise.all([getEnquiries({ status: active ?? undefined, limit: PAGE_SIZE }), countEnquiries()]);
  const tabs = [
    { href: "/admin/enquiries", label: "All", n: counts.all, on: !active },
    ...(Object.keys(statusLabels) as EnquiryStatus[]).map((s) => ({
      href: `/admin/enquiries?status=${s}`,
      label: statusLabels[s],
      n: counts[s],
      on: active === s,
    })),
  ];

  return (
    <>
      <AdminHeader title="Enquiries" intro="A copy of every quote and contact form sent from the website." />

      <nav className="mb-5 flex flex-wrap gap-2" aria-label="Filter by status">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            aria-current={t.on ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${t.on ? "bg-brand-600 text-white" : "bg-white text-ink-600 ring-1 ring-ink-900/8 hover:text-ink-900"}`}
          >
            {t.label} <span className={t.on ? "text-white/70" : "text-ink-500/70"}>{t.n}</span>
          </Link>
        ))}
      </nav>

      {list.length === 0 ? (
        <p className="card p-10 text-center text-ink-500">{active ? `No ${statusLabels[active].toLowerCase()} enquiries.` : "No enquiries yet. They appear here when customers send a quote or the contact form."}</p>
      ) : (
        <ul className="space-y-4">
          {list.map((e) => {
            const digits = e.phone.replace(/\D/g, "");
            const details = [
              ["Site", e.emirate],
              ["Start", e.start],
              ["Period", e.duration],
              ["Operator", e.operator],
            ].filter(([, v]) => v);
            return (
              <li key={e.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-ink-950">
                      {e.name}
                      {e.company && <span className="font-semibold text-ink-600"> · {e.company}</span>}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {new Date(e.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dubai" })} · {e.source === "quote" ? "Quote list" : "Contact form"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <form action={updateEnquiryStatus.bind(null, e.id)}>
                      <StatusSelect key={e.status} status={e.status} />
                    </form>
                    <form action={deleteEnquiry.bind(null, e.id)}>
                      <ConfirmButton
                        message={`Delete the enquiry from ${e.name}? This can't be undone.`}
                        label={`Delete enquiry from ${e.name}`}
                        className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 transition hover:bg-steel hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </ConfirmButton>
                    </form>
                  </div>
                </div>

                {e.items.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.items.map((i) => (
                      <li key={i.slug} className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                        {i.qty} × {i.name}
                      </li>
                    ))}
                  </ul>
                )}
                {details.length > 0 && (
                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    {details.map(([k, v]) => (
                      <div key={k} className="flex gap-1.5">
                        <dt className="text-ink-500">{k}:</dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {e.notes && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-700">{e.notes}</p>}

                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={`tel:+${digits}`} className={contactLink}>
                    <Phone className="h-3.5 w-3.5" /> {e.phone}
                  </a>
                  <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener" className={contactLink}>
                    <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                  {isEmail(e.email) && (
                    <a href={`mailto:${e.email}`} className={contactLink}>
                      <Mail className="h-3.5 w-3.5" /> {e.email}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {list.length === PAGE_SIZE && <p className="mt-4 text-center text-sm text-ink-500">Showing the latest {PAGE_SIZE}.</p>}
    </>
  );
}
