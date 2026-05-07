# NeuroFlow AI

Production-ready AI Automation Agency platform built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, MongoDB Atlas, JWT auth, and REST API routes.

## Core Stack

- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion
- MongoDB Atlas + Mongoose
- JWT admin authentication with secure cookies
- REST API routes for leads, contacts, bookings, services, testimonials
- Nodemailer notifications

## Key Features

- Cinematic dark/red premium SaaS UI
- Pages: Home, Services, Pricing, About, Contact, Book Demo, Case Studies
- Lead generation and inquiry collection flows
- Demo booking system with date/time support
- Secure admin login and protected dashboard
- Admin overview analytics, trend charts, activity feed
- Admin CRUD/status workflows for leads, contacts, bookings
- Floating AI chatbot widget, sticky CTA, scroll progress bar
- Route-level SEO metadata + OpenGraph support
- Error boundaries + loading skeleton states

## Admin Credentials

Default seeded admin credentials:

- Email: `29altamashansari@gmail.com`
- Password: `8756@Altu`

These are seeded from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) and stored hashed in MongoDB.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required:

- `MONGODB_URI`
- `MONGODB_DB`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Optional email notifications:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `FROM_EMAIL`
- `ADMIN_NOTIFICATION_EMAIL`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## API Overview

Public APIs:

- `POST /api/leads`
- `POST /api/contacts`
- `POST /api/bookings`
- `GET /api/services`
- `GET /api/testimonials`

Admin auth/session:

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/session`

Admin protected data:

- `GET /api/admin/overview`
- `GET|PATCH|DELETE /api/admin/leads`
- `GET|PATCH|DELETE /api/admin/contacts`
- `GET|PATCH|DELETE /api/admin/bookings`

## Deployment

1. Push code to GitHub.
2. Import repo into Vercel.
3. Add all environment variables in Vercel project settings.
4. Use MongoDB Atlas connection string for `MONGODB_URI`.
5. Deploy.

## Notes

- Middleware protects `/admin/dashboard` and `/api/admin/*` routes.
- Admin account auto-seeding is handled on login initialization.
- Services and testimonials are auto-seeded if collections are empty.
