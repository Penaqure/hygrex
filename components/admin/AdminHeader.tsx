export function AdminHeader({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-ink-950">{title}</h1>
        {intro && <p className="mt-1 text-sm text-ink-600">{intro}</p>}
      </div>
      {children}
    </header>
  );
}
