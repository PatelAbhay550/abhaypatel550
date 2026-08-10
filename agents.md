# agents.md — Project Guide for AI Agents

This file gives agents the context they need to work safely and idiomatically in this repository. Read it before making changes.

## What this project is

**Abhay Patel's personal portfolio website** (live at https://abhaypatel550.vercel.app). A single-page portfolio for Abhay Patel, a full-stack/frontend web developer in Lucknow, India, with ~5 years of experience in Next.js and React.

Beyond a standard portfolio, the site has personality:

- **Interactive sparrow** sitting on a log above an animated wave — clicking it plays a sparrow chirp (`/sparrow.mp3`) and tips the bird. (Sparrow conservation nod; sound credit is a Pixabay user, see the FAQ.)
- **Draggable "window" modals** (project details + FAQs) styled like desktop app windows on desktop, bottom-sheets on mobile.
- **A CLI-resumé easter egg**: curling the site returns a plain-text, ANSI-colored resumé instead of HTML (see `proxy.ts` + `app/api/cli/route.ts`).
- **A ⌘K command palette** (terminal-styled): global ⌘K/Ctrl+K opens it; try `help`, `resume`, `theme dark`, `projects`.
- **A terminal-styled 404 page** ("404 — command not found") matching the CLI easter egg.
- **Dark mode** (class-based `.dark` on `<html>`, persisted, system-preference fallback) with a navbar toggle.
- **Scroll-reveal animations** via IntersectionObserver (disabled for reduced-motion users).
- **Tech-stack page** with a mouse-tracking "spotlight" card grid.

## Tech stack

- **Next.js 16** (App Router), **React 19**, **TypeScript** (with some `.jsx` components)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, `@import "tailwindcss"` in `app/globals.css`)
- **Bun** as package manager (`bun.lock`)
- Key libraries: `howler` (sound), `react-wavify` (animated wave), `react-draggable` (modals), `react-icons`
- Hosted on **Vercel** (see `next.config.ts` and the og:image URL)

## Scripts (package.json)

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build (`next build`) |
| `bun run start` | Serve the production build (`next start`) |

## Project structure

```
app/
  layout.tsx          # Root layout: theme-init script (FOUC prevention), <Navbar/>, <CommandPalette/>, Geist fonts, metadata
  page.tsx            # Home page — renders <FullHome/> + <BackgroundWave/> (server component)
  globals.css         # Tailwind import, dark variant, .main-btn, scrollbar, terminal cursor, reduced-motion
  favicon.ico
  not-found.tsx       # Terminal-themed 404 ("command not found")
  api/cli/route.ts    # GET → plain-text ANSI resumé (ASCII art border, projects, skills, contact)
  tech-stack/page.jsx # /tech-stack page: title + <SpotlightCard/>
  components/
    Navbar.jsx        # Sticky glass navbar: nav links, scroll progress bar, theme + sound toggles, ⌘K button
    CommandPalette.jsx# ⌘K terminal-style command palette (global; commands: help, resume, theme, sound, projects…)
    Reveal.jsx        # Scroll-reveal wrapper (IntersectionObserver; no-op for reduced motion)
    Button.jsx        # GitHub link button; plays click sound on click
    FullHome.jsx      # "use client" — hero section + profile card + project explorer + sparrow
    ImagCard.jsx      # Profile image card; swaps image/data on hover of a project
    FourumCard.jsx    # "Projects & Works" explorer: folder-icon grid → opens modals; FAQ entry
    ProjectModal.jsx  # Project detail modal (draggable on desktop, bottom-sheet on mobile)
    FaqModal.jsx      # FAQ modal (same window/bottom-sheet pattern, 4 Q&As)
    Spotlight.tsx     # "use client" — spotlight grid of tech logos (Next.js, Tailwind, TS, Vercel, Firebase, Framer Motion)
    Wave.jsx          # "use client" — fixed-bottom animated wave; pauses on reduced motion / hidden tab
proxy.ts              # Middleware: rewrites curl/wget/httpie/powershell user-agents to /api/cli
utils/
  sounds.js           # Howler instances + global persisted mute (isSoundMuted / setSoundMuted → Howler.mute)
  theme.js            # applyTheme / getInitialTheme / getCurrentTheme (class-based dark mode, persisted)
  palette.js          # openPalette() — dispatches a window event to open the ⌘K palette from anywhere
  useModalA11y.js     # Shared modal hook: mount flag, Esc-to-close, scroll lock, focus trap + restore
public/
  click.wav, sparrow.mp3, file.svg, globe.svg, next.svg, vercel.svg, window.svg
```

## Conventions & patterns to follow

- **Sounds on interactions**: `utils/sounds.js` exports `playClick` and `playSparrow` (Howler). Buttons/modals call `playClick.play()`. Guard with `if (playClick)` before calling. There is a **global mute** — use `setSoundMuted(true/false)` to toggle (persisted in localStorage, mutes all Howler instances); don't add per-component mute logic.
- **Dark mode**: class-based via `.dark` on `<html>`; the Tailwind v4 `@custom-variant dark` in `globals.css` enables `dark:` utilities. Theme is persisted and initialized pre-paint by the inline script in `layout.tsx`. **Any new UI must include sensible `dark:` classes.** Toggle from `Navbar` or the palette (`theme dark` / `theme light`).
- **⌘K command palette**: global listener in `CommandPalette.jsx`; open programmatically via `openPalette()` from `utils/palette.js`. New commands are added to the `COMMANDS` array + `run()` switch. Keep it terminal-flavored.
- **Modal pattern** (`ProjectModal.jsx` / `FaqModal.jsx` / `CommandPalette.jsx`): `createPortal` to `document.body` and **use the shared `useModalA11y(open, onClose)` hook** (mount flag, Esc-to-close, body scroll lock, focus trap). `createPortal` + hooks must be client-side — the hook returns `mounted`; render nothing until it's true. Desktop = `Draggable` window with `.modal-header` handle + macOS traffic-light dots; mobile = full-width bottom sheet. **Important hook rule** (documented in the code): all hooks must run before any early `return null`.
- **Scroll-reveal**: wrap sections in `<Reveal delay={...}>`; it disables itself for `prefers-reduced-motion` users.
- **Reduced motion**: `globals.css` kills animations/transitions globally for `prefers-reduced-motion`; the wave also pauses. Don't re-enable motion unconditionally in new components.
- **Styling**: Tailwind utility classes; global one-off classes like `.main-btn` live in `app/globals.css`. Common palette: blues (`#1059b9`, `#1277b0`, blue-600), white/60 + `backdrop-blur-md` glassmorphism (dark: `dark:bg-gray-900/85` etc.), gray borders, rounded-3xl cards.
- **Images**: Always via `next/image` (`Image`); remote hostnames must be allowlisted in `next.config.ts` → `images.remotePatterns` (currently: `*.fna.fbcdn.net`, `examrankcheck.vercel.app`, `i.ibb.co`, `images.unsplash.com`, `png.pngtree.com`, `pics.clipartpng.com`). Add any new external image host there.
- **Server/client split**: pages are server components; anything interactive uses `"use client"` (e.g., `FullHome.jsx`, `Spotlight.tsx`, `Navbar.jsx`).
- **Components are mixed TS/JSX**: `.jsx` files are plain JavaScript with no types. Keep them JSX unless migrating deliberately.
- **experimental.typedRoutes** is enabled in `next.config.ts` — keep route strings valid.

## Quirks / gotchas

- **`proxy.ts` is middleware, not the app** — it's a Next.js middleware (matcher excludes `api`, `_next/*`, `favicon.ico`) that rewrites CLI user-agents to `/api/cli`. Don't rename it to something Next won't recognize, and don't delete it without removing the easter egg.
- **No env vars required** — the project uses no environment variables; all images are remote URLs and sounds are static files in `public/`.
- **`app/page.tsx`** defines `abhayData` / `abhayData2` objects that are currently **unused** (only `FullHome` + `BackgroundWave` are rendered). Harmless leftover data.
- Home data actually lives in **`FullHome.jsx`** (`mainProfile`, `projects` array) — edit project names/links/images there, not in `page.tsx`.
- `FAQ` answers use `dangerouslySetInnerHTML` (one answer contains an HTML link) — keep the link markup valid if editing.
- **Navbar + CommandPalette render in the root layout** (present on every page, including 404). The `⌘K` palette's Esc handling comes from `useModalA11y`; don't add a second Escape listener that would double-close.
- Dark-mode flash is prevented by an inline `<script>` at the top of the body in `layout.tsx` — keep it in sync with `utils/theme.js` (storage key: `theme`).

## Contact info (from the CLI resumé)

- GitHub: https://github.com/PatelAbhay550
- Email: patelabhay550@gmail.com
- Projects: ExamRankCheck (examrankcheck.in), CricketDen (cricketden.live), IndiaElects (indiaelects.vercel.app)
