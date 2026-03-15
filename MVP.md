# MVP — Guitar Center Tabs

## What

### Core Features (MVP)
- Teacher registers with a **username + 4-digit PIN** — no email required
- Create a tab sheet with a title, artist, type (tab / chords / lyrics), and a plain text editor with a sticky quick-tap toolbar for mobile
- Each sheet gets a unique shareable link (no login required to view)
- Teacher's tab library lives at `/u/username` — all their tabs in one place
- Mobile-friendly viewer — clean, readable tab display on any device
- Print-friendly layout for the viewer page

### What It Is NOT (MVP scope)
- Not a WYSIWYG or visual tab builder
- Not a searchable public library / discovery feed
- Not a real-time collaborative editor
- Not a tab *player* (no audio, no playback)
- Not a Guitar Pro / .gp file importer
- Not a student account system — students only need the link, no login

---

## Why

### The Problem
Guitar teachers hand out paper tab sheets to students. Over time:
- Students accumulate piles of paper and lose sheets
- Teachers re-make the same tabs repeatedly
- Sharing with new students requires reprinting
- There's no easy way to go back and reference old material

### Who It's For
- **Primary creator:** Guitar teacher — creates on **phone**, **during lessons**, under time pressure. Needs a fast, low-friction mobile experience above all else.
- **Primary viewer:** Guitar student — receives a link (via message), views on phone, may print at home

### Why Existing Solutions Fall Short
- **Ultimate Guitar** — massive library but you can't easily create/share your own private tabs; tab editor is complex
- **Guitar Pro** — powerful but expensive, desktop-heavy, not shareable via link
- **Google Docs** — generic, monospace tab formatting is a pain, not guitar-specific UX
- **Photos of paper** — lossy, hard to read on small screens, can't be printed cleanly

---

## How

### Technical Approach
Teacher registers once with username + PIN. They get a personal library page and can create, edit, and share tabs from any device. Students only ever need a link — no account.

- Teacher authenticates with username + PIN (hashed, stored in DB)
- Tabs are owned by a user account and get a unique shareable slug like `/tab/abc123`
- Anyone with the tab link can view and print — no login required
- Teacher can manage all their tabs from `/u/username`

### Mobile Editor (A+ Design)
The editor is a plain text area with a **sticky quick-tap toolbar** pinned above the mobile keyboard:

```
┌─────────────────────────────────────────┐
│  Song: [Wonderwall________] Artist: [__] │
│  Type: [ Tab ] [ Chords ] [ Lyrics ]     │
│ ┌─────────────────────────────────────┐ │
│ │ e|--0--2--3--                       │ │
│ │ B|--1--3--3--                       │ │
│ │ [cursor]                            │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [e][B][G][D][A][E]  [|][-][0][1]...[9] │  ← sticky toolbar
├─────────────────────────────────────────┤
│        📱 native keyboard               │
└─────────────────────────────────────────┘
```

One tap inserts the character at cursor — no digging through symbol keyboards for `|` or `-`.

### Tech Stack
- **Frontend + Backend:** SvelteKit
- **Database:** Vercel Postgres or PlanetScale (simple schema, low write volume)
- **Hosting:** Vercel
- **Auth:** Username + 4-digit PIN (PIN stored as bcrypt hash); session via signed cookie
- **Styling:** Tailwind CSS (mobile-first)
- **Font:** Monospace font (e.g. `JetBrains Mono`) for tab display

### Data Model

```
User {
  id          String
  username    String   (unique, e.g. "guitarteacher")
  pin_hash    String   (bcrypt hash of 4-digit PIN)
  created_at  DateTime
}

Tab {
  id          String   (unique slug, e.g. "abc123")
  user_id     String   (FK → User)
  title       String
  artist      String?
  type        Enum     (TAB | CHORDS | LYRICS)
  content     Text     (raw plain text — the tab body)
  created_at  DateTime
  updated_at  DateTime
}
```

### Architecture

```
  [Teacher's Phone]              [Student's Phone]
        │                               │
        │ POST /api/auth/login          │ GET /tab/[id]
        │ POST /api/tab (create/edit)   │ (no auth required)
        ▼                               ▼
  ┌─────────────────────────────────────────────┐
  │              SvelteKit App                  │  ◄─── Vercel Edge
  │         (SSR + API routes)                  │
  └──────────────────┬──────────────────────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │      Database       │  (Vercel Postgres / PlanetScale)
          │  users + tabs       │
          └─────────────────────┘
```

---

## Competition

| Tool | What it does | Gap vs. this project |
|---|---|---|
| Ultimate Guitar | Huge tab library, tab editor | Complex editor, no private/personal tabs, requires full account |
| Guitar Pro | Professional tab software | Desktop app, paid, no simple shareable links |
| TuxGuitar | Free Guitar Pro alternative | Desktop only, no sharing |
| Google Docs | Generic text doc sharing | No guitar-specific formatting or UX |
| Noteflight / MuseScore | Sheet music editors | Overkill, not tab-focused, steep learning curve |

**The gap:** A dead-simple, mobile-first tool for a teacher to write a tab in plain text and hand a link to a student. Minimal auth (username + PIN), no complexity for the viewer.

---

## MVP Milestones

1. **Static tab viewer** — Hard-code a tab and render it nicely on mobile with monospace font and print support
2. **Auth** — Username + PIN registration and login; session cookie; `/u/username` library page (empty state)
3. **Create tab** — Logged-in teacher can create a tab with the A+ mobile editor → saved to DB under their account → returns shareable link
4. **View tab page** — `/tab/[id]` renders the tab cleanly on mobile and desktop, publicly accessible
5. **Edit + delete** — Teacher can edit or delete their own tabs from their library
6. **Polish + deploy** — Tailwind styling pass, favicon, og:image for link previews, print stylesheet QA on iOS + Android, deploy to Vercel

---

## Open Questions

- [x] What device does the teacher use to create tabs? → **Phone**
- [x] Does creation happen during lessons or in advance? → **During lessons (time pressure)** — drives the A+ mobile editor design
- [x] How does the student access the tab? → **Link** (shared via message thread)
- [x] How does monospace tab text render on mobile? → Mostly fine; print support is the higher priority
- [x] If the teacher loses access (new phone, cleared browser)? → **Username + PIN** — log in from any device
- [x] Rate limiting? → **No** — keep it simple for MVP
- [x] Tab expiry / auto-delete? → **No** — tabs persist until the teacher explicitly deletes them
- [x] URL slug style? → **Random** (e.g. `abc123`)
- [x] Can a teacher make a tab private? → **No — `/u/username` is public**, all tabs are listed and discoverable
