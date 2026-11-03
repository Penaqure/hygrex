import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false, className = "h-9 w-auto" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="HYGERX Heavy Equipment Rental — home" className="inline-flex shrink-0">
      <Image
        src={light ? "/images/logo-light.png" : "/images/logo.png"}
        alt="HYGERX Heavy Equipment Rental L.L.C"
        width={1179}
        height={270}
        priority
        className={className}
      />
    </Link>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.18 4.22-9.4 9.42-9.4a9.34 9.34 0 0 1 6.65 2.76 9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.4 9.4m8-17.4A11.25 11.25 0 0 0 12.05.8C5.82.8.74 5.87.74 12.1c0 1.99.52 3.94 1.51 5.65L.65 23.6l6-1.57a11.3 11.3 0 0 0 5.4 1.37h.01c6.23 0 11.31-5.07 11.31-11.3 0-3.02-1.18-5.86-3.32-8z" />
    </svg>
  );
}
