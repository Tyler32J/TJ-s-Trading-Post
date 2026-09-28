# TJ's Trading Post

A personal storefront for reselling collectibles and one-of-a-kind handmade wood/metal work. Built as a single owner-run shop rather than a multi-seller marketplace — listings are managed through an owner-only gate, and visitors browse, view details, and reach out to buy, trade, or request items.

## Features

- Browse listings by category, condition, and type (for sale, for trade, or wanted)
- Detailed item view with photos, pricing, and condition
- Owner-gated listing management (PIN-protected) to add new items
- Light/dark theme support

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) for dev server and builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Available Scripts

- `npm run dev` — start the local dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Status

Listings currently live in `src/data.js` as sample/seed data. A backing database for persistent listings is planned but not yet implemented.
