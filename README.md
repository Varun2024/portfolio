# Varun Shukla Portfolio

Personal portfolio built with React + Vite, featuring interactive UI, 3D sections, project case studies, testimonials, and contact flow.

## Live

- Production: <https://varunxbuilds.web.app/>

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion / Motion
- React Three Fiber + Drei + Three.js
- Firebase Hosting

## Run Locally

```bash
npm install
npm run dev
```

## Firebase Setup (Testimonials)

1. Copy `.env.example` to `.env`.
2. Add your Firebase web app config values.
3. Ensure Firebase Realtime Database is enabled.
4. Use `testimonials` as the database node for feedback entries.

## Build

```bash
npm run build
npm run preview
```

## Release Notes

### v1.1.0 (2026-02-27)

- Improved mobile UX across Experience, Projects, and Testimonials sections.
- Refined project and experience copy to be concise and scan-friendly.
- Added themed loading fallback matching site design.
- Added lazy-loaded section code-splitting in app shell for better initial load behavior.
- Applied technical SEO updates:
  - canonical URL and stronger robots directives
  - improved Open Graph and Twitter metadata
  - structured data (`Person` + `WebSite` schema)
  - sitemap cleanup for SPA-safe indexing
  - manifest metadata and icon path fixes

## SEO Notes

- Primary SEO metadata is managed in `index.html`.
- Sitemap and robots are in `public/sitemap.xml` and `public/robots.txt`.
- Structured data is embedded via JSON-LD in `index.html`.

## Scripts

- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run preview` — preview production build locally

## Deployment

- Hosted on Firebase.
- Standard deploy flow:

```bash
firebase deploy
```
