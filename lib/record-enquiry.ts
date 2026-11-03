import { submitEnquiry } from "@/app/(site)/actions";
import type { Enquiry } from "./enquiry";

let last = "";

/** Saves a copy to the admin inbox. Best effort: the customer's WhatsApp or email message is the one that must go through. */
export function recordEnquiry(e: Enquiry, source: "quote" | "contact") {
  const key = JSON.stringify(e);
  // Sending the same enquiry by WhatsApp and then email shouldn't create two entries.
  if (key === last) return;
  last = key;
  submitEnquiry(e, source).catch(() => {
    last = "";
  });
}
