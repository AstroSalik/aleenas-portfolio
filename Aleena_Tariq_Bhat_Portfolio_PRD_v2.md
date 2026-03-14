# ALEENA TARIQ BHAT — Official Literary Portfolio
## Product Requirements Document · v2.0
**Prepared for Antigravity Build · March 2026**

> *"Between ink and ilham lies a sacred stillness — a space where human longing meets divine whisper."*

---

## 1. Project Overview

This document defines the full product requirements for Aleena Tariq Bhat's personal literary portfolio — a React-based web experience that goes far beyond a standard author page. The portfolio must feel like a living, breathing literary world: one that carries the soul of Kashmir, the weight of words, and the philosophical depth of a writer who has spent years at the intersection of creativity, education, and meaning.

| Field | Value |
|---|---|
| Product Name | Aleena Tariq Bhat — Official Literary Portfolio |
| Platform | React (Web) — built via Antigravity, deployable to Vercel / Netlify |
| Version | 1.0 — Initial Launch |
| Owner | Aleena Tariq Bhat |
| Total Works | 12 published books/anthologies — full library section required |
| Status | PRD v2.0 Complete · Awaiting Build |

---

## 2. Vision & Design Philosophy

### 2.1 The Core Feeling

When a visitor opens this portfolio, they should feel as if they have just walked into a sunlit room in an old Kashmiri kothi — wooden beams overhead, afternoon light filtering through carved lattice screens, a table covered in handwritten manuscripts, a half-drunk cup of kahwa, and silence that hums with meaning. It is warm. It is serious. It is alive.

**This is not a portfolio that shows off. It is a portfolio that invites you in.**

### 2.2 Design Aesthetic — "Saffron Manuscript"

| Token | Value |
|---|---|
| Background | `#1a0a0e` — deep burgundy-black, like the inside of an aged book |
| Primary Accent | `#e8a830` — liquid saffron-gold, Kashmir in a color |
| Secondary | `#c47a8a` — dusty mauve-rose, for romance without sentimentality |
| Text Color | `#f5ead8` — aged parchment white |
| Surface | `#261016` — slightly lighter than background, for cards and modals |
| Cool Accent | `#2a6b6b` — deep teal, wit of satire, a philosophical breath |
| Texture | CSS noise/grain filter at ~4% opacity on all backgrounds |
| Display Font | Playfair Display — dramatic, Urdu-influenced serif (Google Fonts) |
| Body Font | EB Garamond — warm humanist serif, reads like a real book (Google Fonts) |
| Label Font | Space Mono — cold, factual, a deliberate contrast (Google Fonts) |

### 2.3 Philosophical Direction

Aleena writes about the real world — its love, its absurdities, and its truths. Her portfolio should carry that same philosophical weight. Each section should feel like a chapter in a book: purposeful, sequential, never decorative for decoration's sake.

- **Slowness is a feature.** Animations should breathe, not rush.
- **Every word earns its place.** Copy should be literary, not marketing.
- **Beauty is in restraint.** Dark space is voice.
- **Kashmir is not a backdrop.** It is a character — present in color, metaphor, and texture.
- **Philosophy is not a section.** It is the atmosphere of the entire site.

---

## 3. Technical Specifications

| Spec | Detail |
|---|---|
| Framework | React 18+ with functional components and hooks |
| Styling | Tailwind CSS + custom CSS variables for design tokens |
| Animation | Framer Motion (primary) + CSS keyframes for background/particle effects |
| Fonts | Google Fonts: Playfair Display, EB Garamond, Space Mono |
| Icons | Lucide React — minimal usage only |
| Routing | React Router v6 — SPA with smooth scroll + /admin route |
| Responsiveness | Mobile-first. All sections functional at 375px+ |
| Performance | Lazy load all book cover images. Reduce animation on mobile. |
| Accessibility | ARIA labels on all interactive elements. Visible focus states. |
| Deployment | Static build — Vercel or Netlify compatible |
| Data Persistence | localStorage for admin-edited content (v1). Upgradeable to backend. |
| Content Source | `src/data/books.js` + `src/data/content.js` — all content separated from code |

---

## 4. Site Architecture

Single-page application. Fixed navigation bar (hidden during hero animation). Smooth scroll between sections. Page reads top-to-bottom like a narrative. Hidden admin route at `/admin`.

| Route/Section | Purpose |
|---|---|
| `#hero` | Ink Drop Hero — full-screen cinematic opening |
| `#about` | About Aleena — split layout, portrait + bio |
| `#voice` | Literary Voice — genres, philosophy quote, influence whispers |
| `#library` | The Library — 12-book grid with full purchase journey |
| `#recognition` | Awards & Honors — Beacon of Hope seal + timeline |
| `#classroom` | The Classroom — mentorship and workshops |
| `#contact` | Reach Out — minimal, final contact section |
| `/admin` | Admin Portal — password-protected content management (see §9) |

---

## 5. Section-by-Section Specifications

### 5.1 Hero Section — "The Ink Drop"

The most important section. The entire personality of the portfolio is established in the first 5 seconds. **This is a theatrical opening, not a banner.**

#### Animation Sequence (on page load):

1. Screen begins completely dark — `#1a0a0e` — 400ms of silence.
2. A single ink drop SVG falls from top-center, hits the viewport and bleeds outward in a circular CSS/SVG animation — saffron-gold bleeding into deep mauve.
3. As ink spreads to ~60% of viewport, her name fades in through it — as if always written there, revealed by the ink.
4. Name: **"Aleena Tariq Bhat"** — massive Playfair Display, `#f5ead8`.
5. After 600ms: tagline types itself letter by letter: *"Words from the Valley. Stories for the World."*
6. Genre tags float up gently: `[ Realism ]  [ Romance ]  [ Satire ]`
7. Scroll indicator pulses at the bottom. Nav bar appears only after hero clears viewport.
8. Continuous background: faint ink-dust particles drift upward — sparse, like dust motes in a dim library. Never distracting.

#### Portrait Integration — CRITICAL:

Her photo (`src/assets/aleena-portrait.jpg`) must be **cinematically blended** into the RIGHT HALF of the hero — not placed as a box or card on top of the background. Implementation:

- `mix-blend-mode: luminosity` on the portrait image
- Warm saffron color overlay gradient on top of the photo
- Vignetted mask that dissolves ALL edges of the photo into the dark background — no hard borders, no frame
- She **EMERGES from the page** — like ink finding its shape in water
- A crescent/arched SVG light trace (animated, saffron glow, drawn-on effect) traces the silhouette outline of her face — subtle, poetic, like a halo of ink
- Reference aesthetic: ALTRARUIM-style portrait treatment — but **literary and warm**, not cold fashion editorial
- On mobile: portrait fades to subtle background layer behind text

| Field | Value |
|---|---|
| Name | Aleena Tariq Bhat |
| Tagline | Words from the Valley. Stories for the World. |
| Sub-tagline | Poet · Writer · Educator · Kashmir |
| Genre Tags | Realism \| Romance \| Satire |
| CTA | Scroll to explore ↓ |
| Portrait File | `src/assets/aleena-portrait.jpg` (placeholder — to be uploaded) |

---

### 5.2 About Section — "The Writer"

Split-screen layout. Left: large arched portrait frame (Mughal miniature border aesthetic, SVG gold border, soft inner glow). Right: bio text. Mobile: stacks vertically — portrait on top.

#### Bio Text (use exactly as written):

> *Aleena Tariq Bhat is a Kashmir-born writer and educator whose work reflects a thoughtful blend of creativity, reflection, and intellectual curiosity. From an early age, she balanced academic excellence with a deep passion for literature, art, and creative expression, gradually developing a distinctive literary voice.*
>
> *Alongside her writing, she mentors students through workshops and discussions that encourage authentic expression and critical thinking. She is a co-author of several collaborative literary works and an international anthology, and was honored as the "Beacon of Hope – Year 2025 Awardee."*
>
> *Poet, writer, and educator — exploring the intersection of creativity, learning, and expression.*

#### Design Details:

- Bio text: `line-height: 1.9` — it should breathe like poetry
- Calligraphic flourish SVG divider between bio and stats
- Stat row (animated count-up on scroll): `[ 12 Works Published ]  [ 1 International Anthology ]  [ Beacon of Hope 2025 ]`

---

### 5.3 Literary Voice Section — "The Craft"

The philosophical soul of the site. Visitors must understand not just WHAT Aleena writes, but WHY and HOW.

#### A) Genre Pillars — Three cards:

| Genre | Definition |
|---|---|
| Realism | The world as it is — unadorned, honest, accountable to truth. |
| Romance | Not sentiment, but longing. The space between two people and what lives there. |
| Satire | The sharpest form of love — to mock what you wish were better. |

Hover state: left gold border expands full height + saffron glow + title color shifts to `#e8a830`.

#### B) Writer's Philosophy — Full-width quote block:

Dark background. Large italic Playfair Display quote. Saffron accent bar to the left. Quote animates in left-to-right as if being written. Placeholder (Aleena to replace with her own words via admin):

> *"I write because silence has too many words in it."*

#### C) Influence Whispers — Horizontal scroll, ghost text:

`Urdu Poetry · Kashmiri Oral Tradition · Contemporary South Asian Fiction · Realist Prose · Romantic Verse · Philosophical Essay · Satirical Voice`

---

### 5.4 The Library — 12 Works & Publications

This section is a **psychological purchase journey**, not a catalog. The visitor must be drawn in before they ever see an Amazon link. The section should feel like a real literary library — browsable, beautiful, and deeply personal.

#### Layout:

- Section header: **"The Library"** — sub-label: *"A shelf of collaborative worlds"*
- 2-column grid (desktop) / 1-column (mobile)
- Filter row: `[ All ] [ 2025 ] [ 2026 ]` — filters by year, animated transition
- Each card: cover image, title (Playfair Display), year + role badge, 2-line teaser, mood tags, **"Open Book"** button
- Card hover: `translateY(-8px)` + warm saffron box-shadow glow

#### Book Experience Modal — The 7-Step Purchase Journey:

When a visitor clicks "Open Book", a full-screen overlay opens. This is a choreographed experience designed to create **emotional connection BEFORE the purchase link appears**:

1. **Cover Reveal** — Book cover zooms in slowly from center, dramatic warm lighting.
2. **Atmosphere Line** — The book's tagline fades in beneath the cover in large italic type.
3. **The World of This Book** — 3–4 sentence immersive description. Written like back-cover copy, not a product description.
4. **Pull Quote** — One magnetic sentence from or about the book. Large, italic, gold accent bar.
5. **Who This Book Is For** — 3 short poetic lines. E.g.: *"For those who have loved and not said it. / For those who have been to Kashmir in their dreams. / For those who believe words carry weight."*
6. **Aleena's Note** — A warm, personal 2-line note from the author about this book. Editable via admin.
7. **The Button** — Only NOW does the Amazon button appear. Styled as **"Carry This Book Home →"** — saffron, glowing, magnetic. Links directly to the Amazon purchase page.

#### Book Data Schema (all 12 books follow this structure):

```js
{
  id: string,
  title: string,
  year: number,
  role: string,               // "Co-Author" | "Contributor" | etc.
  coverImage: string,         // path to cover image
  tagline: string,            // short atmospheric line
  description: string,        // 3-4 sentence immersive description
  moodTags: string[],         // e.g. ["longing", "divine", "stillness"]
  pullQuote: string,          // single magnetic sentence
  whoIsItFor: string[3],      // exactly 3 poetic lines
  authorNote: string,         // Aleena's personal note (editable via admin)
  purchaseLink: string,       // Amazon URL
  published: boolean          // false = draft, hidden from public
}
```

#### Confirmed Books (2 of 12 — remaining 10 populated via Admin Portal):

**Book 1:**

| Field | Value |
|---|---|
| ID | `kashaf` |
| Title | KASHAF: Between Ink and Ilham |
| Year | 2025 |
| Role | Co-Author |
| Tagline | Between ink and ilham lies a sacred stillness |
| Description | A space where human longing meets divine whisper. Born from pens that write not just with ink, but with intention. |
| Mood Tags | `longing · divine · stillness` |
| Pull Quote | "Between ink and ilham lies a sacred stillness — a space where human longing meets divine whisper." |
| Who Is It For | For those who write in silence / For those who have felt the sacred in the ordinary / For those who know that words are prayers |
| Author Note | *(Aleena to fill via admin)* |
| Purchase Link | https://amzn.in/d/08JP9BPw |

**Book 2:**

| Field | Value |
|---|---|
| ID | `under-new-stars` |
| Title | Under the New Stars |
| Year | 2026 |
| Role | Co-Author |
| Tagline | For the ones who are chasing new beginnings |
| Description | An anthology where emerging voices shine, where stories find their first home, and readers discover what it means to start again. |
| Mood Tags | `beginnings · hope · emergence` |
| Pull Quote | "A space where emerging voices shine, where stories find their first home." |
| Who Is It For | For those chasing new beginnings / For those who believe in first chapters / For those who look up when lost |
| Author Note | *(Aleena to fill via admin)* |
| Purchase Link | https://amzn.in/d/07tHJ0EI |

**Books 3–12:** All slots initialized as empty objects with `published: false`. Populated fully via the Admin Portal (§9).

---

### 5.5 Recognition & Awards

Feels like the wall of a study — understated, earned, not boastful.

| Field | Value |
|---|---|
| Featured Award | Beacon of Hope — Year 2025 Awardee |
| Category | Poet / Writer |
| Year | 2025 |
| Display Style | Circular award seal — gold SVG border, outer ring slow rotation (40s infinite), serif display type at center |
| Supporting Copy | "Recognized for her contribution to literary expression and the nurturing of emerging voices." |

- Additional awards listed below in horizontal timeline — addable via admin
- International anthology participation noted here

---

### 5.6 The Classroom — Mentorship & Education

Warm, purposeful, human. Honors Aleena's role as an educator who shapes other voices.

- Header: **"The Classroom"** — sub-label: *"Where words find their first wings"*
- Teaching philosophy paragraph (editable via admin). Placeholder: *"Aleena believes that every student carries a story worth telling. Her workshops create space for authentic expression, honest reflection, and the courage to write the first true sentence."*
- 3 workshop highlight cards: Creative Writing Workshops / Poetry & Reflection / Critical Thinking Through Literature
- Student quote placeholder — Aleena to fill via admin
- CTA: **"Invite Aleena to your institution →"** — smooth scroll to `#contact`

---

### 5.7 Contact Section

Minimal. Quiet. Like the last page of a very good book.

- Heading: **"Let's Begin a Conversation"**
- Sub-copy: *"For collaborations, workshops, speaking invitations, or simply to share what you thought of a story."*
- Email display (placeholder — Aleena to supply via admin)
- Social icons: Instagram, LinkedIn, Goodreads — minimal, icon-only
- Footer: *"© 2026 Aleena Tariq Bhat · Written in Kashmir · Read Everywhere"*

---

## 6. Navigation

Fixed top nav bar. **Hidden during hero animation** — appears only after user scrolls past hero so the ink drop sequence is uninterrupted.

| Element | Detail |
|---|---|
| Logo | "ATB" monogram — Playfair Display, saffron-gold on dark |
| Nav Links | About · Voice · Library · Recognition · Classroom · Contact |
| Mobile | Hamburger menu — slides in from right, dark overlay backdrop |
| Active State | Current section link highlighted as user scrolls |
| Appearance | Backdrop blur + semi-transparent `#1a0a0e` — not fully opaque |

---

## 7. Animation & Motion Specifications

All animations must feel **deliberate and literary** — like turning a page, not clicking a button. Use Framer Motion for React. CSS keyframes for particles and background effects.

| Element | Behavior |
|---|---|
| Page Load | Full ink-drop hero sequence (§5.1) |
| Section Enter | Fade up + opacity increase as sections enter viewport — staggered children |
| Book Cards | Hover: `translateY(-8px)` + saffron box-shadow glow (20% opacity) |
| Book Modal Open | Cover zooms in from center, content staggers in below with delays |
| Genre Cards | Hover: left border expands full height (saffron), title shifts to gold |
| Quote Block | Fades left-to-right as if being handwritten |
| Nav Links | Underline draws in from left on hover |
| Ink Particles | Continuous upward drift, randomized speed + opacity, CSS keyframes |
| Award Seal | Outer ring slow rotation, 360deg, 40s, infinite — inner text static |
| Portrait Trace | SVG crescent light arc draws itself on load, 1.5s, saffron glow |
| Mobile | All complex animations reduced to simple fades — performance first |

---

## 8. Content Data Structure

All content lives in two files in `src/data/`. This allows Aleena to manage everything via the Admin Portal without touching component code.

**`src/data/books.js` — Book Schema:**
```js
{ id, title, year, role, coverImage, tagline, description, moodTags[], pullQuote, whoIsItFor[3], authorNote, purchaseLink, published: boolean }
```

**`src/data/content.js` — Site Content Schema:**
```js
{
  hero: { tagline, subTagline },
  about: { bio, stats[] },
  voice: { philosophyQuote, influences[] },
  classroom: { philosophy, workshopCards[], studentQuote },
  contact: { email, socials[] },
  footer: { text },
  awards: [{ id, title, category, year, description, featured }]
}
```

All data modified through the Admin Portal persists to `localStorage` (v1). Both files serve as the initial seed data. Admin changes override seed data at runtime.

---

## 9. Admin Portal — /admin (GOAT-tier CMS)

A password-protected route at `/admin`. Dark themed, matching the site aesthetic. This is a **fully-featured content management system** so Aleena can maintain every aspect of her portfolio without touching code.

### Access & Security:
- Simple password gate on the `/admin` route (hardcoded in v1, upgradeable to real auth later)
- Session persists in `localStorage` — no need to re-enter password on same device
- Admin UI inherits the Saffron Manuscript aesthetic — dark, gold accents, Playfair Display headings

### Dashboard (Home Screen):
- Stats overview: Total books published, Total books drafted, Latest book title + year, Award count, Last content update timestamp
- Quick action buttons: **Add New Book** / **Edit Hero** / **Preview Site**

### Books Manager — Full CRUD:
- List all 12 books with published/draft badge, cover thumbnail, title, year
- **Drag-to-reorder** books (changes display order on public site)
- Add new book: full form with all schema fields
- Edit any book: **rich text editor** for description fields (not plain textarea)
- Cover image upload with live preview
- Mood tags editor: add and remove chips inline
- "Who Is It For" editor: 3 individually editable poetic lines
- Author note per book: personal note field
- Amazon link field with **live link validator** (checks URL format)
- **Publish / Draft toggle** per book — draft books hidden from public
- Delete book with confirmation dialog
- **Bulk export**: download all book data as JSON file

### Site Content Editor:
- Edit hero tagline and sub-tagline
- Edit full bio text (rich text)
- Edit philosophy quote (the full-width quote block)
- Edit all section headings and sub-labels
- Edit workshop card titles and descriptions
- Edit student quote
- Edit contact email and social links
- Edit footer text

### Awards Manager:
- Add, edit, and remove awards
- Featured toggle — marks which award gets the large seal treatment
- Year, title, category, description fields per award

### Preview & Export:
- **"Preview Site"** button opens the public portfolio in a new tab
- **"Export All Content"** downloads a full JSON snapshot of all content
- **"Reset to Defaults"** option (with double-confirmation) restores seed data

All admin changes apply immediately to the public site (same `localStorage`). No build step required for content updates.

---

## 10. File Structure

```
src/
  assets/
    aleena-portrait.jpg           (placeholder — upload before launch)
  covers/
    kashaf.jpg
    under-new-stars.jpg
    [10 more covers]
  components/
    Hero.jsx                      Ink drop hero + portrait blend
    About.jsx                     Split layout bio section
    LiteraryVoice.jsx             Genre cards + philosophy quote + influences
    Library.jsx                   Book grid + filter row
    BookModal.jsx                 Full-screen 7-step purchase journey
    Recognition.jsx               Award seal + timeline
    Classroom.jsx                 Teaching section
    Contact.jsx                   Contact + footer
    Nav.jsx                       Fixed navigation
    admin/
      AdminPortal.jsx             Main admin shell + routing
      Dashboard.jsx               Stats + quick actions
      BooksManager.jsx            Full CRUD for books
      ContentEditor.jsx           Site copy editing
      AwardsManager.jsx           Awards CRUD
  data/
    books.js                      12-book array (seed data)
    content.js                    All site copy (seed data)
  hooks/
    useAdmin.js                   Admin state + localStorage sync
    useScrollAnimation.js         Viewport-triggered animations
  App.jsx
  index.css                       CSS variables, grain texture, global styles
```

---

## 11. Out of Scope (Version 1.0)

- Blog or writing samples section *(v1.1)*
- Real backend / database *(localStorage in v1, upgradeable)*
- Newsletter signup or mailing list
- E-commerce or direct purchasing *(Amazon links only)*
- Multi-language support — Urdu/Kashmiri version *(future)*
- Dark/light mode toggle *(dark mode only — it is the aesthetic)*

---

## 12. Success Criteria

This portfolio succeeds when:

- ✦ Aleena sees it and says — **boom.** Out of happiness and excitement.
- ✦ A first-time visitor understands within 10 seconds who Aleena is, what she writes, and why it matters.
- ✦ The portfolio **feels like literature** — not a website about literature.
- ✦ All 12 books are discoverable with full cover, description, and purchase journey.
- ✦ A visitor completes the book modal journey and clicks "Carry This Book Home" **without feeling sold to.**
- ✦ The site loads in under 3 seconds and is fully responsive at 375px+.
- ✦ Aleena can update any content herself via the Admin Portal without touching code.
- ✦ Any publisher, reader, or institution who visits wants to reach out.

---

*— End of PRD v2.0 —*

*Prepared with care. Built for the Valley.*
