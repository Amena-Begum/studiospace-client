# Mohalla: Social Development Events Platform

**Live site:** https://studiospace-client-psi.vercel.app

Mohalla is a community-driven event platform where neighbours create, join and track social service events in their local area, from winter clothes drives in Mirpur to river cleanups in Old Dhaka.

## Features

- Create events with a title, description, event type, thumbnail, location and a date that must be in the future (checked in the form and again on the server).
- Upcoming Events page lists every event that is still ahead; events whose date has passed never appear. The home page shows the six soonest, fetched live from MongoDB with `.limit(6)`.
- Public event details page with a working Join Event button: joining stores the event and user data in MongoDB, requires login and can't be done twice.
- Joined Events page shows everything you have signed up for, sorted by event date.
- Manage Events page lets creators update or delete their own events only; the server answers `403` for anyone else.
- Email and password registration with server-enforced password rules, plus GitHub sign-in; session kept in an HTTPOnly JWT cookie so private routes survive a reload.
- Light and dark theme toggle, loading skeletons, custom toasts and modals (no browser alerts), and profile update (name and photo).

## Tech stack

| Layer | Technology |
| --- | --- |
| Client | Next.js (App Router), TypeScript, Tailwind CSS, Sonner, next-themes |
| Server | Express, TypeScript, MongoDB (official driver), JWT in HTTPOnly cookies, bcrypt |
| Hosting | Vercel for both apps, MongoDB Atlas for data |

Server repository: https://github.com/Amena-Begum/studiospace-server (live API: https://studiospace-server-virid.vercel.app)

## Local setup

1. Clone and start the server (see its README): `npm install`, copy `.env.example` to `.env`, set `MONGODB_URI`, `JWT_SECRET` and `SEED_PASSWORD`, then `npm run seed` and `npm run dev` (runs on port 5000).
2. In this repo: `npm install`, copy `.env.example` to `.env.local`, then `npm run dev` and open http://localhost:3000.
3. The browser only calls `/api/*` on the client origin; `next.config.ts` forwards that to `API_URL`, which keeps the session cookie first-party.

## Examiner test accounts

| Role | Email | Password |
| --- | --- | --- |
| Organiser | amina.organiser@mohalla.app | Brass-Lantern-4721! |
| Organiser | rafi.organiser@mohalla.app | Brass-Lantern-4721! |
| Volunteer | tasnim.volunteer@mohalla.app | Brass-Lantern-4721! |

Tip: log in as the volunteer, join an event, then open Joined Events; log in as an organiser to update or delete their own events.

## Photo credits

Event photographs come from Wikimedia Commons (public domain or CC BY-SA 4.0). Titles, authors and licences are listed in `src/data/credits.json` and in the site footer under "Photo credits".
