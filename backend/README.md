# CSE Job Fair 2026 Backend

Express + TypeScript + PostgreSQL API for check-in and lucky draw data.

## Setup

1. `copy .env.example .env`
2. Set `DATABASE_URL` in `.env`
3. `npm install`
4. `npm run build`
5. `npm run start`

## Endpoints

- `GET /api/health`
- `POST /api/checkins`
- `GET /api/checkins/summary`
- `GET /api/students?limit=80`
- `GET /api/students/:studentId`

## Notes

- Counter uses `app_counters` instead of repeated `COUNT(*)`.
- Counter increments transactionally on new check-ins.
- Missing/failed student lookups are written to `failed_student_queries`.
