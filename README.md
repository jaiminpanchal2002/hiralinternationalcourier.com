# Hiral International Courier Service — Website

A modern, animated, fully **admin-managed** website for Hiral International Courier Service (Ahmedabad).
Built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion and Prisma.

Everything on the public site — company details, services, destinations, testimonials,
FAQs, stats, and shipment tracking — is editable from the admin dashboard. No code edits needed.

---

## Quick start

```bash
npm install
npm run db:migrate     # create the SQLite database
npm run db:seed        # load starter content + admin user + demo shipments
npm run dev            # http://localhost:3000
```

## Admin dashboard

- URL: **/admin** (login at **/admin/login**)
- Default email: `admin@hiralinternational02.com`
- Default password: `Hiral@2025`  ← **change this** under Settings → Change Password after first login.

From the dashboard you can manage: Shipments (+ tracking timeline), Enquiries/messages,
Services, Destinations, Testimonials, FAQs, Statistics, and all Company/Contact/SEO settings.

## Tracking

Customers track by AWB number on **/track** (or the homepage bar).
Two demo shipments are seeded: `HIRAL10001` (in transit) and `HIRAL10002` (delivered).
Create real shipments in the admin, then add timeline updates from each shipment's "Timeline" page.

---

## Tech & structure

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router, RSC, Server Actions) |
| Styling | Tailwind CSS v4 + custom design tokens (`src/app/globals.css`) |
| Animation | Framer Motion (3D hero, scroll reveals, counters, carousels) |
| Database | Prisma + SQLite (`prisma/schema.prisma`) |
| Auth | JWT session cookie (`jose` + `bcryptjs`), guarded by `src/proxy.ts` |
| SEO | Metadata API, JSON-LD, `sitemap.ts`, `robots.ts` |

```
src/
  app/
    (site)/         Public pages (home, about, services, destinations, track, contact)
    admin/          Dashboard (login + panel + server actions)
    api/            Login/logout + contact endpoints
  components/       UI + sections + admin components
  lib/              prisma, auth, data access, utils
prisma/             schema + seed
```

## Useful scripts

```bash
npm run db:studio   # visual database browser (Prisma Studio)
npm run db:seed     # re-seed content
npm run db:reset    # wipe + re-migrate + re-seed
npm run build       # production build
npm run start       # run the production build
```

---

## Notes / next steps

- **Logo:** the header/footer logo is a scalable SVG recreation of the brand mark. To use the
  exact raster logo, drop `public/logo.png` and swap `<Logo>`/`<LogoMark>` for `next/image`.
- **Production database:** SQLite is used for simplicity. For hosting (e.g. Vercel), switch the
  Prisma `datasource` to PostgreSQL and set `DATABASE_URL` — no application code changes needed.
- **Secrets:** set a strong `AUTH_SECRET` and `NEXT_PUBLIC_SITE_URL` in production `.env`.
- **Email notifications:** contact enquiries are stored in the DB and shown in the admin. To also
  email them, add a provider (e.g. Resend/Nodemailer) inside `src/app/api/contact/route.ts`.
