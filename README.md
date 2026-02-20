# VANITY — Startup Onboarding & Activation Engine

Config-driven onboarding engine with React + TypeScript frontend and Node + Express + MongoDB backend.

## Monorepo structure

- `frontend/` — app shell + onboarding UI renderer
- `backend/` — auth, profile, flow, progress, activation, analytics APIs

## Quick start

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Engine behavior

1. User signs up and logs in (JWT auth).
2. User submits role + goal profile.
3. Segment is resolved from profile and a flow is assigned.
4. Engine dynamically renders step types: info, form, action, checklist.
5. Progress persists in database and resumes after reload/login.
6. Activation is detected by configured activation step.
7. On completion, user is redirected to product view and analytics are updated.
