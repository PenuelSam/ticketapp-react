# TicketApp React

TicketApp React is a lightweight customer support dashboard that lets small teams create, triage, and resolve
support tickets without leaving the browser. It demonstrates a complete authentication flow, protected routes,
and a ticket management experience powered by localStorage.


 **Live URL:** https://ticketapp-react-ten.vercel.app/  
 **GitHub Repository:** https://github.com/PenuelSam/ticketapp-react
## Tech stack

- [React](https://react.dev/) with [Vite](https://vitejs.dev/) for a fast TypeScript-first DX
- [React Router](https://reactrouter.com/) for declarative routing and guard logic
- [Zustand](https://github.com/pmndrs/zustand) for global ticket state persisted in localStorage
- [Sonner](https://sonner.emilkowal.ski/) for accessible toast notifications
- [classnames](https://github.com/JedWatson/classnames) for ergonomic class composition

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:5173](http://localhost:5173) by default.

## Available routes

| Route | Description |
| --- | --- |
| `/` | Landing page with product hero and marketing CTA |
| `/auth/login` | Email/password sign-in (simulated) |
| `/auth/signup` | Account creation (simulated) |
| `/dashboard` | Authenticated overview with ticket metrics |
| `/tickets` | Ticket list with create/delete actions |
| `/tickets/:id` | Ticket edit form |

> All dashboard and ticket routes are wrapped in a protected route. When a session is missing or expired the
> user is signed out, shown a toast, and redirected to the login screen.

## Authentication flow

Both **Log in** and **Sign up** forms accept any email/password combination. A mock session is saved to
`localStorage` under the `ticketapp_session` key with an eight-hour expiry. When the session expires it is
cleared automatically and the user is redirected to `/auth/login`.

Example credentials:

- Email: `demo@ticketflow.app`
- Password: `demo123`

## Accessibility notes

- All interactive elements (buttons, links, forms) are reachable via keyboard navigation.
- Focus styles rely on the browser defaults for maximum visibility.
- Decorative SVG circles are hidden from assistive technology using empty `alt` attributes and `aria-hidden`.
- Color tokens meet contrast ratios of at least 4.5:1 against the background.

## Known issues

- Because state is stored in `localStorage`, tickets do not sync across browsers or devices.
- The mock authentication is not secure and should be replaced before production use.

## Project scripts

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build |

