import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | HYGERX Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sky-tint">{children}</div>;
}
