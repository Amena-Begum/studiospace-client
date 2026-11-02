# StudioSpace

**Live site:** https://LIVE-URL-PENDING

StudioSpace is a peer-to-peer marketplace where creators book photo studios, film stages, podcast lounges, music suites and art workshops by the hour, and hosts list their own spaces.

## Features

- Hero slider (Swiper) with three scenes, six featured studios pulled live from MongoDB, and category cards that open Explore with the category pre-selected.
- Email and password registration with server-enforced password rules, login with an HTTPOnly JWT cookie, and Google sign-in.
- Full studio CRUD: add, update and delete listings, with an image upload to imgbb and confirmation modals before deleting.
- Booking flow with double-booking prevention: a slot that overlaps a confirmed booking is rejected, and the check runs again when the host confirms.
- Hosts can confirm, cancel or complete bookings; guests see status badges, can cancel pending bookings and download a PDF receipt.
- Light and dark themes, skeleton loaders, empty states, Sonner toasts and custom modals (no browser alerts), and a custom 404 page.

## Tech stack

| Layer | Technology |
| --- | --- |
| Client | Next.js (App Router), TypeScript, Tailwind CSS, Swiper, Sonner, next-themes, jsPDF |
| Server | Express, TypeScript, MongoDB (official driver), JWT in HTTPOnly cookies, bcrypt |
| Hosting | Vercel for both apps, MongoDB Atlas for data |

Server repository: https://github.com/Amena-Begum/studiospace-server

## Local setup

1. Clone and start the server (see its README): `npm install`, copy `.env.example` to `.env`, set `MONGODB_URI`, `JWT_SECRET` and `SEED_PASSWORD`, then `npm run seed` and `npm run dev` (runs on port 5000).
2. In this repo: `npm install`, copy `.env.example` to `.env.local`, then `npm run dev` and open http://localhost:3000.
3. The browser only calls `/api/*` on the client origin; `next.config.ts` forwards that to `API_URL`, which keeps the session cookie first-party.

## Examiner test accounts

| Role | Email | Password |
| --- | --- | --- |
| Guest (books studios) | jun.guest@studiospace.app | Brass-Lantern-4721! |
| Host (owns demo listings) | mira.host@studiospace.app | Brass-Lantern-4721! |
| Second host | teo.host@studiospace.app | Brass-Lantern-4721! |

Tip: log in as the guest, request a booking, then log in as the host to confirm it.

## Photo credits

Studio photographs come from Wikimedia Commons under the licences shown. The same list opens from the site footer.

- [2018-Pulitzer-Prizes-photo-studio.jpg](https://commons.wikimedia.org/wiki/File:2018-Pulitzer-Prizes-photo-studio.jpg) by Fuzheado, CC0
- [Ease Studio's "South Side Park", a decor for photoshoots 3.jpg](https://commons.wikimedia.org/wiki/File:Ease_Studio%27s_%22South_Side_Park%22,_a_decor_for_photoshoots_3.jpg) by Syced, CC0
- [Ease Studio's "South Side Park", a decor for photoshoots 6.jpg](https://commons.wikimedia.org/wiki/File:Ease_Studio%27s_%22South_Side_Park%22,_a_decor_for_photoshoots_6.jpg) by Syced, CC0
- [Channel ATV Green Screen Studio.jpg](https://commons.wikimedia.org/wiki/File:Channel_ATV_Green_Screen_Studio.jpg) by Allen Harriet Media, CC BY-SA 4.0
- [MedienwerkstattGreenbox.JPG](https://commons.wikimedia.org/wiki/File:MedienwerkstattGreenbox.JPG) by Sandra Becker, CC BY-SA 4.0
- [SPNN Podcast room.jpg](https://commons.wikimedia.org/wiki/File:SPNN_Podcast_room.jpg) by Myotus, CC BY 4.0
- [Podcast Studio.jpg](https://commons.wikimedia.org/wiki/File:Podcast_Studio.jpg) by Ajcosta, CC BY-SA 4.0
- [ARC Studio Control Room (rear view).jpg](https://commons.wikimedia.org/wiki/File:ARC_Studio_Control_Room_(rear_view).jpg) by Marco Tucconi, CC BY-SA 4.0
- [MUSIC FOR MUSIC STUDIO.jpg](https://commons.wikimedia.org/wiki/File:MUSIC_FOR_MUSIC_STUDIO.jpg) by Mfmbackoffice, CC BY 4.0
- [Ann Gollifer's studio.jpg](https://commons.wikimedia.org/wiki/File:Ann_Gollifer%27s_studio.jpg) by Ann Gollifer, CC BY-SA 4.0
