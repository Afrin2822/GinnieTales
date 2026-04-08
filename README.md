# GinnieTales

GinnieTales is a Next.js 14 platform for turning ideas into illustrated stories—built with the App Router, TypeScript, Tailwind CSS, Prisma, NextAuth, and integrations for AI, payments, email, and media.

## Prerequisites

- Node.js 20+ (recommended: match or exceed the versions required by this repo’s dependencies)
- npm (or your preferred package manager)
- PostgreSQL (or compatible database supported by Prisma) when you connect `DATABASE_URL`

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.local` and fill in each value (never commit real secrets). At minimum you will need `DATABASE_URL`, auth secrets, and any service keys you use (Cloudinary, Stripe, Razorpay, Resend, etc.).

3. **Prisma**

   After `DATABASE_URL` is set:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

   Use `db:push` for quick prototyping without migration files.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the development server                     |
| `npm run build`   | Production build                                 |
| `npm run start`   | Start the production server                      |
| `npm run lint`    | Run ESLint                                       |
| `npm run db:generate` | Generate Prisma Client                     |
| `npm run db:push` | Push schema changes (prototyping)                |
| `npm run db:migrate` | Create and apply migrations               |

## Project structure

- `src/app` — App Router pages and layouts
- `src/app/api` — Route handlers (backend API)
- `src/components` — Reusable UI; `src/components/ui` — primitives (buttons, inputs, cards)
- `src/lib` — Utilities, clients, helpers; `src/lib/ai`, `src/lib/payments`, `src/lib/email`
- `src/hooks` — Custom React hooks
- `src/store` — Zustand stores
- `src/types` — Shared TypeScript types
- `src/prisma` — Prisma schema
- `public/fonts`, `public/images`, `public/icons` — Static assets

## Design system

Fonts: **Nunito** (headings) and **Quicksand** (body), loaded via `next/font/google` in `src/app/layout.tsx`. Brand colors and animations (`float`, `shimmer`, `sparkle`) are defined in `tailwind.config.ts` and `src/app/globals.css`.
