# CSE Job Fair 2026 Frontend

React + TypeScript + Vite frontend for CSE Job Fair pages.

## Commands

- `npm install`
- `npm run lint`
- `npm run build`
- `npm run dev`

## Environment

- Copy `.env.example` to `.env`.
- Configure `VITE_API_BASE_URL` if backend is not `http://localhost:4000/api`.

## Routes

- `/` Home page
- `/register` Register split page

## Structure

- `src/app/App.tsx` route setup
- `src/pages/home` Home page and page-owned sections
- `src/pages/register` Register page
- `src/components/shared` shared shell components (Navbar, Footer)
- `src/app/services` API client functions
- `src/assets` critical above-the-fold images imported by pages
- `public` non-critical static assets (logos, map model)

## Styling

- Tailwind has been removed.
- Global base styles and tokens are in `src/index.css`.
- Each page/component keeps colocated CSS with prefixed selectors.

## Naming Rules

- Components: PascalCase
- Variables/functions: camelCase
- Asset filenames: kebab-case
