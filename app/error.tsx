"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="grid min-h-screen place-items-center bg-sky-tint p-4 text-center">
      <div>
        <h1 className="display text-3xl sm:text-5xl">Something went wrong</h1>
        <p className="mt-4 text-ink-600">We couldn&apos;t load this page. Please try again in a moment.</p>
        <button onClick={reset} className="btn-primary mt-8">
          Try again
        </button>
      </div>
    </section>
  );
}
