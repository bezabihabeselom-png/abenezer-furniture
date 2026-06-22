# Abenezer Furniture — Full-Stack E-Commerce Website

A production-ready website for **Abenezer Furniture** (Dessie, Ethiopia — near Furkan Masjid),
built with Next.js 14 (App Router), PostgreSQL, Prisma, NextAuth, Cloudinary, and Tailwind CSS.

## Features

- Public site: homepage, product catalog with categories, product detail pages, cart, checkout,
  about/contact/privacy/terms pages, WhatsApp + call buttons, dark/light mode, 404 & error pages.
- Admin dashboard (password-protected): add/edit/delete products with image upload, manage order
  statuses, view & respond to customer inquiries.
- Orders stored in PostgreSQL with automatic stock deduction.
- SEO: dynamic sitemap.xml, robots.txt, per-page metadata, Open Graph tags, JSON-LD structured data
  (FurnitureStore + Product schema) for Google rich results.
- Security: hashed admin passwords (bcrypt), JWT sessions (NextAuth), zod input validation on every
  API route, security headers, admin routes protected by middleware.

## 1. Local Setup

```bash
npm install
cp .env.example .env      # then fill in the values (see below)
npx prisma db push        # creates tables in your database
npm run db:seed           # creates admin login + sample categories/products
npm run dev                # http://localhost:3000
```

Default admin login (only if you don't set SEED_ADMIN_EMAIL/PASSWORD in `.env`):
`admin@abenezerfurniture.com` / `ChangeMe123!` — **change this immediately after first login is not
possible from the UI yet; update it directly via `npx prisma studio` or re-run the seed with new env
values.**

## 2. Required Environment Variables

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | A PostgreSQL connection string — free options: [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app), or Vercel Postgres |
| `NEXTAUTH_URL` | Your site's URL (e.g. `https://www.abenezerfurniture.com`, or `http://localhost:3000` locally) |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Free account at [cloudinary.com](https://cloudinary.com) → Dashboard |
| `NEXT_PUBLIC_SITE_URL` | Your live domain |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Already set to `251914714718` |

## 3. Deploying (recommended: Vercel — free tier works)

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. In **Settings → Environment Variables**, add all variables from `.env.example` with real values.
4. Create a free PostgreSQL database (Neon or Vercel Postgres are easiest) and put its connection
   string in `DATABASE_URL`.
5. Deploy. After the first deploy, run the database setup once from your local machine (pointed at
   the production `DATABASE_URL`):
   ```bash
   npx prisma db push
   npm run db:seed
   ```
6. Visit `/admin/login` on your live site and sign in with your seeded admin credentials.

## 4. Connecting Your Domain

1. Buy a domain (e.g. from Namecheap, GoDaddy, or a local Ethiopian registrar).
2. In Vercel → your project → **Settings → Domains**, add `www.abenezerfurniture.com` (or your
   chosen domain).
3. Update your domain's DNS records as instructed by Vercel (usually a CNAME or A record).
4. Update `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` env vars to match the final domain, then redeploy.

## 5. Getting Indexed by Google

1. Once live, go to [Google Search Console](https://search.google.com/search-console).
2. Add your domain as a property and verify ownership (Vercel domain settings provide the DNS TXT
   record needed).
3. Submit your sitemap: `https://yourdomain.com/sitemap.xml`.
4. Request indexing for the homepage. New products are automatically added to the sitemap.

## 6. Replacing Placeholder Photos

This project ships with generated placeholder images in `public/uploads/` (hero banner, workshop,
category tiles) so the site renders correctly out of the box. Replace these with real photos of your
showroom, workshop, and furniture:
- Keep the same filenames to avoid editing code, **or**
- Update the image paths in `app/page.tsx` and `app/about/page.tsx` to new filenames.
Product photos themselves are uploaded directly through the Admin → Products page and stored in
Cloudinary — no code changes needed for those.

## 7. Project Structure

```
app/                  Pages & API routes (Next.js App Router)
  admin/               Admin login, dashboard, products, orders management
  api/                 REST API: products, orders, inquiries, upload, auth
  products/            Public product listing & detail pages
  cart/, checkout/      Shopping cart & order placement
components/           Reusable UI components
lib/                   Prisma client, auth config, Cloudinary, validation, cart store
prisma/                Database schema & seed script
```

## 8. Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API routes (REST), Zod validation
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth (credentials + JWT sessions, bcrypt password hashing)
- **Image storage:** Cloudinary
- **State:** Zustand (cart, persisted to localStorage)

## 9. Support

For any setup help, the original development conversation and this codebase cover the full build.
Business contact: **0914-7147-18** | Dessie, Ethiopia, near Furkan Masjid.
