# CryptoLogic LLC — Secure Web3 Software Contracting

Landing page built with Next.js (App Router) and TypeScript.

## Scripts

- `npm run dev`: start dev server on http://localhost:3000
- `npm run build`: production build
- `npm run start`: run production server

## Environment

Contact form uses SMTP if configured; otherwise it logs to the server console.
Set the following variables in `.env.local`:

```
CONTACT_TO=contact@placeholder.dev
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=postmaster@example.com
SMTP_PASS=yourpassword
SMTP_SECURE=false
```

## Structure

- `app/page.tsx`: Hero with physics canvas, About carousel, Team, Contact form
- `components/PhysicsHexCanvas.tsx`: Rotating hexagon with bouncing ball
- `app/api/contact/route.ts`: Email (or console log) handler
