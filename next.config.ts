import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WebP only: these are encoded on first request, and AVIF took up to 10 s per image, which visitors saw as a slow load.
  images: { formats: ["image/webp"], qualities: [75, 90] },
  // Fleet photos are uploaded through a server action; the store accepts up to 5 MB.
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
};

export default nextConfig;
