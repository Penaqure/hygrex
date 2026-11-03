"use client";

import { Building2, ExternalLink, HelpCircle, Inbox, LayoutDashboard, LogOut, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/fleet", label: "Fleet", icon: Truck },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Company", icon: Building2 },
];

export function AdminNav({ newEnquiries }: { newEnquiries: number }) {
  const pathname = usePathname();
  const item = "flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-bold transition";
  return (
    <aside className="border-b border-ink-900/8 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col lg:border-b-0 lg:border-r">
      <Link href="/admin" className="block px-4 pt-4 lg:px-6 lg:pt-6">
        <Image src="/images/logo.png" alt="HYGERX admin" width={1179} height={270} priority className="h-8 w-auto" />
      </Link>
      <nav className="flex items-center gap-1 overflow-x-auto p-3 lg:mt-4 lg:flex-1 lg:flex-col lg:items-stretch lg:overflow-visible" aria-label="Admin">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`${item} ${active ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-steel/60 hover:text-ink-900"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {href === "/admin/enquiries" && newEnquiries > 0 && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-amber px-1 text-[11px] font-extrabold text-ink-950">{newEnquiries}</span>
              )}
            </Link>
          );
        })}
        <div className="flex gap-1 lg:mt-auto lg:flex-col">
          <Link href="/" target="_blank" className={`${item} text-ink-600 hover:bg-steel/60 hover:text-ink-900`}>
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <form action={logout}>
            <button className={`${item} w-full text-ink-600 hover:bg-steel/60 hover:text-ink-900`}>
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
