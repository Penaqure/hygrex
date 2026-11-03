import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { photoCredits } from "@/lib/photo-credits";

export const metadata: Metadata = { title: "Photo Credits", description: "Sources and licences for photos used on this website." };

export default function PhotoCreditsPage() {
  return (
    <>
      <PageHeader eyebrow="Photo credits" title="Image sources" intro="Illustrative photos used on this website, with their authors and licences." />
      <section className="py-16">
        <div className="container-x">
          <ul className="card max-w-4xl divide-y divide-ink-900/8">
            {photoCredits.map((c) => (
              <li key={c.source} className="p-5 text-sm">
                <p className="font-bold text-ink-950">{c.usedFor}</p>
                <p className="mt-1 text-ink-600">
                  <a href={c.source} target="_blank" rel="noopener" className="font-semibold text-brand-600 underline">
                    {c.title}
                  </a>{" "}
                  by {c.author}, {c.license}, via Wikimedia Commons. Cropped and resized.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
