# IGCSE Smart School — Website (MERN Stack)

A full MERN implementation of the IGCSE Smart School marketing & admissions website, built from the
Website Requirements Document and homepage content brief.

- **M**ongoDB — Mongoose models for Programs, FAQs, Admissions, Contact, Careers, Feedback, Subscribers, Users
- **E**xpress — REST API with JWT auth, role-based access control, file uploads, rate limiting
- **R**eact — Vite + React Router + Tailwind CSS frontend, all pages from the sitemap
- **N**ode — runtime for the Express API

## Project Structure

```
igcse-smart-school/
├── backend/          Express + MongoDB REST API
│   ├── config/        DB connection
│   ├── controllers/    Route handlers
│   ├── middleware/     Auth (JWT/RBAC), file upload, error handler
│   ├── models/         Mongoose schemas
│   ├── routes/         API route definitions
│   ├── utils/           Email + reCAPTCHA helpers
│   ├── seed.js          Creates first Super Admin + sample Programs/FAQs
│   └── server.js        App entry point
└── frontend/          React (Vite) client
    └── src/
        ├── api/          Axios instance
        ├── components/   Navbar, Footer, Hero, forms, cards, etc.
        └── pages/        One file per sitemap page
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — local (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## 2. Backend Setup

```bash
cd backend
cp .env.example .env      # then fill in MONGO_URI, JWT_SECRET, SMTP creds, etc.
npm install
npm run seed               # creates the first Super Admin + sample Programs/FAQs
npm run dev                # starts the API on http://localhost:5000
```

Default seeded Super Admin login (change these in `.env` before seeding):
- Email: `admin@igcsesmartschool.com`
- Password: `ChangeMe123!`

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev                # starts the site on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` requests to `http://localhost:5000`, so no extra
frontend env config is needed in development.

## 4. What's Implemented

**Public site (matches the Sitemap in Section 3 of the requirements doc):**
Home, About Us, Programs (+ dynamic `/programs/:slug` detail template), Admissions, Support, FAQs
(accordion, grouped by category), Feedback, Careers (listings + CV upload), Contact Us, Privacy Policy,
Terms & Conditions, and a custom 404 page. Sticky nav with a Support mega-menu, mobile hamburger menu,
and an "Apply Now" CTA always visible.

**Forms & data capture (Section 6), all live against the API:**
- Admission Application (all fields from Section 6.1) → `POST /api/admissions`
- Contact form → `POST /api/contact`
- Careers / CV submission (multipart file upload, PDF/DOC/DOCX, 5MB limit) → `POST /api/careers/applications`
- Feedback form → `POST /api/feedback`
- Newsletter / WhatsApp subscribe (homepage + footer + "Register Interest" on Launching Soon programs) →
  `POST /api/subscribers`

**Admin/CMS-lite API (Section 7), role-gated with JWT (Section 5 roles):**
- `super_admin`, `content_editor`, `admissions_officer`, `hr_manager`
- CRUD on Programs and FAQs (toggle "Launching Soon", publish/unpublish)
- View + update status on Admission applications, Contact messages, Career applications, Feedback,
  Subscribers
- Manage Job Listings

**Security/quality touches (Sections 9, 11):** rate limiting on public form routes, server-side
validation via Mongoose schemas, bcrypt-hashed passwords, JWT auth, file-type/size restrictions on CV
uploads, reCAPTCHA v3 verification hook (`utils/verifyRecaptcha.js` — no-ops if unconfigured, so local
dev works without a key), and accessible focus states / reduced-motion support in the frontend CSS.

## 5. Admin Dashboard

The React app now includes a full admin panel at **`/admin`**, separate from the public site (its own
layout — no public navbar/footer). Log in at `/admin/login` with the Super Admin account created by
`npm run seed`.

**Structure:** `frontend/src/admin/`
- `AuthContext.jsx` — holds the logged-in user/token, exposes `login()`/`logout()`
- `ProtectedRoute.jsx` — redirects to `/admin/login` if unauthenticated, or shows an "Access restricted"
  message if the user's role isn't allowed on that route
- `AdminLayout.jsx` — sidebar navigation that only lists the sections the current role can access
- `DataTable.jsx` — shared table component (loading/empty states, pagination, one-click CSV export)
- `pages/` — one screen per module

**Screens, mapped to the roles in Section 5 of the requirements doc:**

| Screen | Route | Roles | What it does |
| --- | --- | --- | --- |
| Dashboard | `/admin` | all | Summary counts per module, linking to each table |
| Admissions | `/admin/admissions` | super_admin, admissions_officer | Filter by status/program, change status (New → Under Review → Interview Scheduled → Enrolled/Rejected), export CSV |
| Contact Messages | `/admin/contact` | super_admin, content_editor | Filter resolved/unresolved, toggle resolved, export CSV |
| Careers | `/admin/careers` | super_admin, hr_manager | Tabs: CV Applications (status pipeline, CV download links, export CSV) and Job Listings (add/close/remove) |
| Feedback | `/admin/feedback` | super_admin, content_editor | Read-only table, export CSV |
| Subscribers | `/admin/subscribers` | super_admin, content_editor | Newsletter/WhatsApp leads list, export CSV |
| Programs | `/admin/programs` | super_admin, content_editor | Full CRUD — add/edit/remove, toggle "Launching Soon" and Published, reorder |
| FAQs | `/admin/faqs` | super_admin, content_editor | Full CRUD, grouped by category, toggle Published |
| Staff Users | `/admin/users` | super_admin only | Create staff accounts with a role, enable/disable accounts |

This required two small backend additions beyond what was already built: `GET /api/auth/users` and
`PATCH /api/auth/users/:id` (both `super_admin`-only), so the dashboard can list and manage staff
accounts. Everything else in the dashboard runs on the API endpoints already documented above.

## 6. Not Included (Out of Scope for Phase 1, per Section 2.2)

The Student/Parent LMS portal, online payment gateway, multi-language support, and native mobile apps —
all explicitly deferred to a future phase in the requirements doc.

## 7. Suggested Next Steps

1. Wire the real Google reCAPTCHA v3 site key into the public frontend forms (currently sending a dev placeholder token).
2. Swap in real brand assets (logo, photography) and connect analytics/cookie-consent (Section 8).
3. Deploy: e.g. MongoDB Atlas + Render/Railway for the API, Vercel/Netlify for the frontend.
4. Consider adding password-reset and 2FA for Super Admin, as recommended in Section 11.
