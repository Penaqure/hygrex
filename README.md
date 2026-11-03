# HYGERX Heavy Equipment Rental — Website

Modern Next.js website for HYGERX Heavy Equipment Rental L.L.C (Dubai, UAE), built from the company profile brochure.

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
- **Admin panel** for the fleet, enquiries, FAQs and company details
- Contact form (prefills WhatsApp / email), floating WhatsApp button, back-to-top, "added" toasts
- SEO: metadata, Open Graph, JSON-LD LocalBusiness, sitemap.xml, robots.txt, favicon
- Respects `prefers-reduced-motion`; fully responsive

## Pages
Home, About, Fleet, Fleet detail (`/fleet/[slug]`), Crane Finder, How it works, FAQ, Contact, and the admin panel at `/admin`.

## Run
Needs MongoDB (local, or a hosted service such as MongoDB Atlas).
```bash
npm install
cp .env.example .env.local   # then set MONGODB_URI and ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
npm run build && npm start
```
An empty database fills itself with the starting content on first connection.

## Admin panel
Sign in at `/admin` with `ADMIN_PASSWORD`.
- **Fleet**: add, edit, reorder, hide or delete machines, and upload photos
- **Enquiries**: every quote and contact form sent from the site, with a status (new, contacted, closed)
- **FAQs** and **Company details** (phones, email, website)

Changes appear on the site immediately.

## Data and hosting
Everything editable lives in MongoDB, including uploaded photos. `lib/seed.ts` holds the starting content, and `lib/store.ts` holds all database access.

| Collection | Holds |
|---|---|
| `fleet`, `faqs` | Machines and questions, ordered by `position` |
| `settings` | Company details |
| `enquiries` | Quotes and contact forms |
| `images` | Uploaded photos (up to 5 MB each) |
| `rate_limits` | Login and enquiry limits; entries expire on their own |
| `meta` | Records that the starting content was added, so deleted items don't return |

- In production, use a database that requires a username and password, and back it up.
- Serve the site over HTTPS: the admin session cookie is HTTPS-only in production.

## Images
- **Large page images** (hero, banners, About, Why choose us, Contact): the 3840px originals live in `assets/photos`. `npm run images` pre-generates AVIF and WebP versions from 640px to 3840px into `public/images/hd`, so they load straight away. Replace a photo under the same name, run the script, and commit the result.
- **Machine photos** in `public/images/fleet`, and uploads from the admin panel, are resized when first requested, then cached.
- Stock photos are from Wikimedia Commons and listed on `/photo-credits`. Replace them with photos of your own machines, and remove a photo's entry from `lib/photo-credits.ts` once it's no longer used.

## Notes
- Customers' enquiries still open WhatsApp or their email app with the message prefilled. A copy is saved to the admin inbox at the same time.
- Static export is not available, because the admin panel needs a server.
