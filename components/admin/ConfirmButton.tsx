"use client";

/** A submit button that asks before a destructive form goes through. */
export function ConfirmButton({ message, className, label, children }: { message: string; className?: string; label?: string; children: React.ReactNode }) {
  return (
    <button
      className={className}
      aria-label={label}
      title={label}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
