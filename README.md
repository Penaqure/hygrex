# HYGERX Heavy Equipment Rental — Website

Modern static Next.js website for HYGERX Heavy Equipment Rental L.L.C (Dubai, UAE), built from the company profile brochure.

## Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Framer Motion (animations), Lucide icons
- Self-hosted fonts (Archivo + Manrope via Fontsource)

## Features
- Animated hero: masked headline reveal, parallax fleet image, rotating "Rent / Build / Move / Grow" ticker, counting stats
- Scroll progress bar, auto-hiding glass navbar, animated full-screen mobile menu
- **Fleet catalog** with category filters (animated pill), live search, 3D tilt + spotlight cards
- **Equipment detail pages** (`/fleet/[slug]`) — statically generated, with SEO metadata
- **Quote builder**: add machines to a quote list (saved in the browser), set quantities, rental period, start date, emirate, operator need — then send in one tap via **WhatsApp** or **email**
- **Crane Finder**: interactive tool recommending mobile crane / crawler crane / telehandler from load, ground and lifting pattern, with live capacity-range chart
- Scroll-drawn "How it works" timeline, Why-choose-us, UAE service area, FAQ accordion
- Contact form (prefills WhatsApp / email), floating WhatsApp button, back-to-top, "added" toasts
- SEO: metadata, Open Graph, JSON-LD LocalBusiness, sitemap.xml, robots.txt, favicon
- Respects `prefers-reduced-motion`; fully responsive

## Pages
Home, About, Fleet, Fleet detail (`/fleet/[slug]`), Crane Finder, How it works, FAQ, Contact and Photo credits.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # fully static site in /out
```
Upload the `out` folder to any static host. No server or database is needed.

## Editing content
All company details, equipment, FAQs and emirates live in `lib/data.ts`. Edit the file, rebuild and upload again.

## Images
The originals live in `assets/photos`. `npm run images` pre-generates AVIF and WebP versions in `public/images/hd`, so they load straight away. To change a photo, replace it under the same name, run the script, and commit the result. For a new photo, add it to the same folder, run the script, and refer to it by file name in `lib/data.ts`.

Stock photos are from Wikimedia Commons and listed on `/photo-credits`. Replace them with photos of your own machines, and remove a photo's entry from `lib/photo-credits.ts` once it's no longer used.

## Enquiries
The enquiry forms open WhatsApp or the customer's email app with the message prefilled. Nothing is stored on the site.

## Admin panel
The admin panel and MongoDB version of the site is kept on the `admin-panel` branch. It needs a Node server and a database.
