# MarketFolk — Project Context

## Vision

A LinkedIn-style platform specifically for the farmers market ecosystem. The goal is to be **the single place** where vendors find verified help and workers find booth jobs. No such platform exists today — discovery and hiring is entirely word-of-mouth.

## The Problem

- Vendors can't find reliable, trustworthy people to run their booths
- Some workers take money and leave — there's no accountability
- Workers have no place to signal they're trustworthy
- There's no directory of who operates at which market

## Target Users

Two sides of the marketplace:

**Workers** — people looking for booth shifts at farmers markets
**Vendors** — small businesses that operate at farmers markets and need help

> Note: Do NOT touch the market approval/assignment process (how vendors get accepted into markets). Each market organizer handles this differently. That is out of scope.

---

## MVP (Ship by end of week — demo to potential vendors)

### Goal

A demo-ready frontend with hardcoded/mocked data to show vendors the vision. Collect email signups. No real auth or backend needed yet.

### Four pages to build:

1. **Browse page** — grid of verified worker profiles (hardcoded)
2. **Worker profile page** — photo, name, availability, markets worked, verified badge
3. **Vendor profile page** — business name, products, markets they operate at, owner contact
4. **Email capture** — waitlist form, separate for workers and vendors

### Key UI element:

A visible **"ID Verified" badge** (green checkmark) on worker profiles. This is the core trust signal.

### Demo pitch to vendors:

> "Right now there's no single place to find reliable, verified help for your booth. This is that place."

---

## Business Model

- **Workers pay** for their own ID verification (signals commitment, like the Experteer/EasyEater model)
- **Vendors pay** for platform access (subscription or per-listing — TBD)
- Background checks are **deprioritized** for now — ID upload alone is the trust signal for v1

---

## Tech Stack

### MVP (this week)

- **Next.js** — frontend framework
- **Tailwind CSS** — styling
- **Vercel** — deployment (push to GitHub → live URL instantly, shareable on any device)
- **Supabase** — just one table for email capture (`waitlist_emails`)

### Full backend (future)

- **Supabase** — Postgres database + Auth + file storage (for license uploads)
- **Next.js API routes** — business logic
- **Stripe** — vendor subscriptions + worker verification payments
- **Checkr API** — background checks (add later, optional)
- **Supabase Storage** — license image uploads (S3-equivalent)

---

## Database Schema

### `users`

| Column     | Type      | Notes                |
| ---------- | --------- | -------------------- |
| id         | uuid PK   |                      |
| email      | text      |                      |
| role       | enum      | `worker` or `vendor` |
| created_at | timestamp |                      |

### `worker_profiles`

| Column         | Type            | Notes                            |
| -------------- | --------------- | -------------------------------- |
| id             | uuid PK         |                                  |
| user_id        | uuid FK → users |                                  |
| full_name      | text            |                                  |
| bio            | text            |                                  |
| availability   | JSON            | e.g. "weekends", "Saturday only" |
| markets_worked | text[]          | list of markets they've worked   |

### `vendor_profiles`

| Column         | Type            | Notes                           |
| -------------- | --------------- | ------------------------------- |
| id             | uuid PK         |                                 |
| user_id        | uuid FK → users |                                 |
| business_name  | text            |                                 |
| products_sold  | text            |                                 |
| markets_active | JSON            | can operate at multiple markets |
| owner_email    | text            | the decision-maker contact      |

### `id_verifications`

| Column            | Type                      | Notes                             |
| ----------------- | ------------------------- | --------------------------------- |
| id                | uuid PK                   |                                   |
| worker_id         | uuid FK → worker_profiles |                                   |
| license_image_url | text                      | stored in Supabase Storage        |
| status            | enum                      | `pending`, `approved`, `rejected` |
| reviewed_at       | timestamp                 | manual review by admin (you)      |

### `waitlist_emails`

| Column       | Type      | Notes                |
| ------------ | --------- | -------------------- |
| id           | uuid PK   |                      |
| email        | text      |                      |
| role         | enum      | `worker` or `vendor` |
| signed_up_at | timestamp |                      |

---

## Worker Verification Flow (post-MVP)

1. Worker signs up
2. Uploads driver's license image
3. Admin (you) manually reviews in a simple admin view
4. Status flipped to `approved` → green "ID Verified" badge appears on profile
5. Eventually: add Checkr background check as an optional paid upgrade

---

## Future Features (not in MVP)

- Real auth (Supabase Auth — email/password or magic link)
- Worker and vendor account creation
- Admin dashboard to review license uploads
- Stripe payments (vendor subscription, worker verification fee)
- Worker reviews/ratings by vendors
- Market-specific filtering
- AI worker-vendor matching based on schedule and experience (LangGraph opportunity)
- Background check integration via Checkr API

---

## Context About the Founder

- Based in Fort Collins, CO
- Previously had a store at the Fort Collins farmers market (Saffron Scoops n Bites)
- Has personal relationships with vendors at local markets — can seed both sides of the marketplace
- Can build the full stack himself
- Has experience with LangGraph and agent systems (relevant for future AI features)

---

## Roadmap

### Phase 1 — MVP (Demo)

The goal is a shareable URL to show potential vendors. No real backend, no auth, no payments. Just the vision made tangible.

- [ ] Browse page — hardcoded grid of verified worker profiles
- [ ] Worker profile page — photo, name, availability, markets, verified badge
- [ ] Vendor profile page — business name, products, markets, owner contact
- [ ] Email waitlist capture — separate signup for workers and vendors
- [ ] Deploy to Vercel — live shareable URL

**Exit criteria:** A vendor can look at it on their phone and say "I get it."

---

### Phase 2 — Real Accounts

Turn the demo into a working product. Real signups, real profiles, real data.

- [ ] Supabase Auth — email/password and magic link
- [ ] Worker onboarding flow — create profile, set availability, list market experience
- [ ] Vendor onboarding flow — create business profile, list markets, add owner contact
- [ ] Browse page pulls from real database
- [ ] Profile pages are dynamic (real routes, not hardcoded)
- [ ] Basic admin view — see all signups, manage users

---

### Phase 3 — Verification

The core trust layer. This is what makes MarketFolk different from a generic job board.

- [ ] Worker license upload — photo of government-issued ID via Supabase Storage
- [ ] Admin review queue — approve or reject submissions
- [ ] Verified badge appears on profile once approved
- [ ] Email notification to worker when verified
- [ ] Pending state shown while under review

---

### Phase 4 — Monetization

Start charging once there's real value on both sides.

- [ ] Vendor subscription via Stripe — access to verified worker profiles
- [ ] Worker verification fee via Stripe — one-time payment to unlock ID upload
- [ ] Vendor can see worker contact info only after subscribing
- [ ] Basic billing dashboard for vendors

---

### Phase 5 — Trust & Reputation

Make the platform stickier and more valuable over time.

- [ ] Vendors can leave reviews on workers after a shift
- [ ] Workers build a reputation score over time
- [ ] Workers can list specific markets and availability publicly
- [ ] Vendors can post "we're hiring" status on their profile
- [ ] Market-specific filtering on browse page (e.g. "show workers near Fort Collins Winter Market")

---

### Phase 6 — Intelligence (LangGraph opportunity)

Use the founder's AI experience to add automation and matching.

- [ ] AI pre-screening — flag inconsistencies between uploaded ID and profile info
- [ ] Smart matching — suggest workers to vendors based on availability, experience, and market overlap
- [ ] Optional: Checkr background check integration as a premium add-on
- [ ] Automated nudges — remind vendors when new verified workers join their market area

---

## Brand & Design System

### Name

**MarketFolk** — warm, community-driven, speaks to the people of the farmers market world.

### Color Scheme — Fresh & Earthy

| Role       | Name              | Hex       |
| ---------- | ----------------- | --------- |
| Primary    | Deep forest green | `#2D6A4F` |
| Accent     | Warm amber        | `#F4A228` |
| Background | Off-white cream   | `#FAFAF7` |
| Text       | Near-black        | `#1A1A1A` |

### Design Principles

- Earthy, fresh, local — not generic tech
- The amber accent is used for the **verified badge**, CTAs, and highlights
- Green is the primary brand color — buttons, links, nav
- Cream background keeps it warm and approachable
- Avoid anything that looks like a typical SaaS product

### Tailwind Config

Add these to `tailwind.config.js`:

```js
colors: {
  brand: {
    green: '#2D6A4F',
    amber: '#F4A228',
    cream: '#FAFAF7',
    dark:  '#1A1A1A',
  }
}
```

---

## Key Decisions Already Made

- Workers pay for their own verification (not vendors)
- Vendors pay for platform access
- Background checks are out of scope for v1
- Manual license review is fine for MVP (low volume)
- Start local (Fort Collins) but don't artificially limit the platform
- Do not touch market approval/assignment processes — each market handles this differently
