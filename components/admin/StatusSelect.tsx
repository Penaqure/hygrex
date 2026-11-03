"use client";

import { statusLabels, type EnquiryStatus } from "@/lib/data";

export function StatusSelect({ status }: { status: EnquiryStatus }) {
  return (
    <select
      name="status"
      defaultValue={status}
      aria-label="Enquiry status"
      className="field !w-auto !py-2"
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      {Object.entries(statusLabels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
