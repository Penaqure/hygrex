import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-sky-tint pt-[72px] text-center">
      <div className="container-x">
        <p className="display text-[8rem] text-brand-600/20 sm:text-[12rem]">404</p>
        <h1 className="display -mt-6 text-3xl sm:text-5xl">Wrong site, wrong lift</h1>
        <p className="mt-4 text-ink-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}
