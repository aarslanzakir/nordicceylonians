# Nordic Ceylonians

Marketing site for **Nordic Ceylonians** — an overseas education and migration consultancy that helps students study and settle in Finland. This is the custom build that replaces the old Wix site (`nordicceylonians.wixsite.com/education`).

It's a single-page marketing site with a small admin panel bolted on, so the team can edit the copy, swap images, and read contact enquiries without touching code or paying for Wix.

## What's in here

- **Public landing page** — hero, services, "why us", the step-by-step process, programs, testimonials, and a contact form.
- **Per-service pages** at `/services/[slug]` with the longer write-up and feature list for each service.
- **Contact form** that saves enquiries straight to the database (with a honeypot field to keep bots out).
- **Admin panel** at `/admin` — password login, an inline editor for all site content, image uploads, and an inbox for enquiries.

Everything the visitor sees comes out of the database, with a bundled JSON file (`src/content/site.json`) as the seed and offline fallback.

## Tech

- [Next.js 16](https://nextjs.org) (App Router) + React 19, TypeScript
- Tailwind CSS v4
- MongoDB Atlas — content, enquiries, and uploaded images (stored in GridFS)

> **Heads up:** this repo pins Next.js 16, which changed a fair amount from earlier versions. If you're wiring up new routes or server APIs, check `node_modules/next/dist/docs/` rather than going from memory.

## Getting started

You'll need Node 20+ and a MongoDB connection string.

```bash
npm install
# create .env.local (see below)
npm run dev
```

Then open http://localhost:3000. The admin panel lives at http://localhost:3000/admin.

On the very first request, the app seeds the `content` collection from `src/content/site.json`. If the database is unreachable it falls back to that same JSON so the public site still renders — you just can't save changes.

### Environment variables

Create `site/.env.local`:

```bash
# Admin panel login password
ADMIN_PASSWORD=change-me

# Secret used to sign the admin session cookie — use a long random string
ADMIN_SECRET=change-this-to-a-long-random-secret

# MongoDB Atlas connection string. The database name is taken from the URI (…/nordic)
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/nordic?retryWrites=true&w=majority

# Optional — override the DNS resolvers used for the Atlas SRV lookup
# DNS_SERVERS=8.8.8.8,1.1.1.1
```

Both `ADMIN_PASSWORD` and `ADMIN_SECRET` have insecure defaults baked in for local dev — **set real values before deploying.**

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project layout

```
src/
  app/
    page.tsx                     Home page (composes all the sections)
    services/[slug]/page.tsx     Per-service detail page
    admin/                       Login + admin panel pages
    api/
      enquiry/                   Public: submit the contact form
      admin/                     Auth-gated: login, save content, upload, enquiries
      images/[id]/               Serve uploaded images out of GridFS
  components/                    Header, Hero, Services, Programs, AdminEditor, …
  content/site.json              Seed content + offline fallback
  lib/
    content.ts                   Read/write site content (Mongo, JSON fallback)
    enquiries.ts                 Contact-form storage
    images.ts                    Image upload/serve via GridFS
    mongodb.ts                   Shared Mongo client (with an Atlas DNS workaround)
    auth.ts                      Admin session check
```

## How the content model works

`getContent()` reads a single document (`_id: "site"`) from the `content` collection and normalises it — coercing older shapes (e.g. a single-string phone number into an array), filling in default images, and making sure optional service fields exist. That normalisation is why the schema can evolve without breaking existing documents, so keep it in mind if you add new fields.

The admin editor (`AdminEditor.tsx`) posts the whole content object back to `/api/admin/save`, which writes it and revalidates the pages.

## Admin panel

1. Go to `/admin` and log in with `ADMIN_PASSWORD`.
2. Edit any section inline — hero text, services, programs, stories, contact details, and the two main images.
3. Uploaded images go into MongoDB GridFS and are served from `/api/images/[id]`. Max 5 MB; JPEG/PNG/WebP/GIF/AVIF only.
4. The **Enquiries** tab lists contact-form submissions (newest first); you can mark them read or delete them.

## Deployment notes

- Set all env vars in your host, and use strong values for `ADMIN_PASSWORD` / `ADMIN_SECRET`.
- Allow your host's outbound IPs in MongoDB Atlas.
- `metadataBase` in `src/app/layout.tsx` points at `https://nordicceylonians.com` — update it if the production domain changes.

## A note on the `mongodb.ts` DNS workaround

`mongodb+srv://` needs an SRV DNS lookup, and on some Windows setups Node's resolver refuses it (`querySrv ECONNREFUSED`) because of an IPv6 link-local resolver. `mongodb.ts` drops those bad resolvers and points Node at public DNS (`8.8.8.8` / `1.1.1.1`) so Atlas connects. If you hit connection problems, that's the first place to look — override with `DNS_SERVERS` if your network needs specific servers.
