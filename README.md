# CSE Job Fair 2026 Workspace

Monorepo includes:

- `frontend`: React + TypeScript + Vite application.
- `backend`: Express + TypeScript health check API.

Current version for both apps is `0.0.0`.

## Setup

1. Backend:
   - `cd backend`
   - `npm install`
   - `npm run build`
   - `npm run start`
2. Frontend:
   - `cd frontend`
   - `copy .env.example .env`
   - `npm install`
   - `npm run dev`

## Validation Commands

- `cd frontend && npm run lint`
- `cd frontend && npm run build`
- `cd backend && npm run build`

## Frontend Notes

- Main routes: `/`, `/register`, and `/brand-assets`
- Frontend is organized by page domain under `frontend/src/pages`
- Shared shell components are in `frontend/src/components/shared`
- Tailwind is removed; styling is plain CSS with colocated files
- Critical above-the-fold images are imported from `frontend/src/assets`

## API Routes

- `GET /api/health`
