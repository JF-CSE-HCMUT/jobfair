# CSE Job Fair 2026 Workspace

Monorepo includes:

- `frontend`: React + TypeScript + Vite application.
- `backend`: Express + TypeScript API with PostgreSQL.

Current version for both apps is `0.0.0`.

## Setup

1. Prepare PostgreSQL.
2. Backend:
   - `cd backend`
   - `copy .env.example .env`
   - set `DATABASE_URL`
   - `npm install`
   - `npm run build`
   - `npm run start`
3. Frontend:
   - `cd frontend`
   - `copy .env.example .env`
   - `npm install`
   - `npm run dev`

## Validation Commands

- `cd frontend && npm run lint`
- `cd frontend && npm run build`
- `cd backend && npm run build`

## Frontend Notes

- Main routes: `/` and `/register`
- Frontend is organized by page domain under `frontend/src/pages`
- Shared shell components are in `frontend/src/components/shared`
- Tailwind is removed; styling is plain CSS with colocated files
- Critical above-the-fold images are imported from `frontend/src/assets`

## API Routes

- `POST /api/checkins`
- `GET /api/checkins/summary`
- `GET /api/students`
- `GET /api/students/:studentId`
