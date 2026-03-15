# CSE Job Fair 2026 Frontend

React + TypeScript + Vite frontend for check-in and lucky draw experiences.

Version: `0.0.0`.

## Commands

- `npm run lint`
- `npm run build`

## Environment

- Copy `.env.example` to `.env`.
- Set `VITE_API_BASE_URL` when API is not `http://localhost:4000/api`.

## Features

- Check-in submits to `POST /api/checkins`.
- Counter syncs from `GET /api/checkins/summary`.
- Lucky draw candidates load from `GET /api/students`.

## Main Folders

- `src/app/checkin`
- `src/app/checkin/components`
- `src/app/luckydraw`
- `src/app/services`
- `src/assets`
