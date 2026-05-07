# NeuroFlow AI

Premium AI Automation Agency web app for clinics, doctors, and healthcare businesses.

## Tech Stack

- Next.js (App Router + TypeScript)
- Tailwind CSS
- Framer Motion
- MongoDB + Mongoose
- JWT + cookie-based admin auth
- Nodemailer for lead confirmation emails

## Features

- High-converting dark premium website (`/`, `/services`, `/about`, `/contact`)
- Lead capture API (`POST /api/leads`)
- MongoDB lead storage with status pipeline (`new`, `contacted`, `closed`)
- Admin login + lead management dashboard (`/admin`)
- Search/filter/status update for leads
- Simulated chatbot demo (frontend-only logic)

## Project Structure

```text
neuroflow-ai/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ leads/route.ts
│  │  │  └─ admin/
│  │  │     ├─ login/route.ts
│  │  │     └─ leads/route.ts
│  │  ├─ admin/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ services/page.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ AnimatedSection.tsx
│  │  ├─ ChatbotDemo.tsx
│  │  ├─ Footer.tsx
│  │  └─ Navbar.tsx
│  ├─ lib/
│  │  ├─ auth.ts
│  │  ├─ db.ts
│  │  └─ mailer.ts
│  └─ models/
│     └─ Lead.ts
├─ .env.example
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ next.config.ts
└─ package.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with your MongoDB and SMTP credentials.

4. Start dev server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Admin Login

Use `ADMIN_EMAIL` and `ADMIN_PASSWORD` from env in `/admin`.

For production, use a hashed `ADMIN_PASSWORD` (`bcrypt`) and a strong `JWT_SECRET`.
