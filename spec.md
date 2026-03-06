# FloorVision AI

## Current State

A two-page SaaS design mock — homepage (`/`) and visualizer (`/visualizer`). Uses Cabinet Grotesk display font, Plus Jakarta Sans body, and Instrument Serif italic. Design tokens are already cleaned up (neutral grays, near-black primary, no amber). The last round removed decorative ghost numbers and the amber accent, but the UI still reads as generic:

- Step cards use the same padding/border treatment as feature rows, no visual distinction
- Section labels ("01 — Comparison", "How it works") are inconsistently styled
- The hero trust bar uses a plain checkmark list that feels utilitarian
- The CTA banner is plain black-on-white with no typographic tension
- The dropzone looks like a default form component
- The visualizer sections are stacked uniformly with no breathing room or hierarchy
- Typography scale is conservative — minimal use of size contrast between headings and body
- Buttons lack refinement: pill shape is overused, varying from h-8 to h-12 with no system
- Card borders are all `border-border/60` — feels flat and undifferentiated
- Section alternation (`bg-section-alt`) is barely perceptible — doesn't create rhythm

## Requested Changes (Diff)

### Add
- A refined typographic scale: display headings at `clamp(3rem, 6vw, 5rem)` for hero, `clamp(1.6rem, 3vw, 2.4rem)` for section heads — with tight tracking `-0.04em`
- Generous whitespace: section padding increased to `py-32` minimum
- A single sharp accent color: cool ink blue `oklch(0.38 0.12 250)` used sparingly on interactive highlights and active states only
- Refined button system: one consistent CTA style (44px height, 0px border-radius for primary, full pill for secondary ghost)
- A premium hero layout: full-bleed image with bottom-anchored copy, but increase contrast overlay and refine the type lockup with a thinner weight intro line
- Hairline borders `border-border/30` (even more subtle) to replace most `/60` usages
- A large typographic "wordmark" moment in the footer — company name rendered at display scale in muted tones
- Smooth section transitions using very subtle background gradients at section edges

### Modify
- `index.css` — tighten the base font size from system default to 15px, add `--radius: 0` to flatten cards (sharp corners = more premium), tune `--border` to even subtler, add ink-blue accent token
- `tailwind.config.js` — add `accentBlue` color token, set `borderRadius` lg/md/sm/xl to 0 based on flat aesthetic
- Navbar — reduce height from h-16 to h-14, increase letter-spacing on nav links, use the wordmark logo without drop shadow
- Hero — tighten the tagline copy layout, replace the pill buttons with a sharp rectangular CTA + a text-link secondary; increase overlay darkness to 0.80
- How it Works steps — replace bordered cards with a horizontal rule-separated list layout, numbered with large tabular-nums
- Upload dropzone — redesign as a full editorial panel, very large dashed border on just the inside frame, with the upload icon replaced by a large typographic prompt
- Features section — expand the feature row grid with a small icon or glyph instead of just a number
- Visualizer page header — replace the breadcrumb + title layout with a slim full-width bar that's more editorial
- Section headers — unify: overline label is 10px uppercase tracking-widest, heading is display font at tighter tracking, no more "01 — " prefix mixed with label text
- Comparison section — remove the nested card around the comparison slider, let it breathe
- AI edit section — simplify the suggestion chip row, remove the card wrapper, give the textarea a borderless inset look with only a bottom border
- Multi-angle grid — increase card gap, make the label below each image smaller and dimmer
- Video section — make the play button smaller and more refined, remove the outer card border around controls
- CTA banner — use a full-bleed section with generous padding, left-aligned heading and right-aligned button

### Remove
- `btn-amber` legacy class (unused)
- `shadow-warm`, `shadow-warm-lg`, `shadow-warm-xl` (unused aliases)
- `float` animation keyframe
- Trust bar checkmarks — replace with a slim horizontal text list, no icons
- The `bg-section-alt` heavy alternation — use a single very slight gray for one alt section instead

## Implementation Plan

1. Update `index.css` design tokens: set `--radius: 0`, add `--accent-blue` ink token, set base font to 15px, refine border opacity
2. Update `tailwind.config.js`: add accentBlue, flatten radius scale, add new animation keyframe for subtle fade
3. Rewrite `Navbar.tsx`: h-14 height, refined link spacing, sharper transitions
4. Rewrite `HomePage.tsx`: new hero lockup, typographic upload zone, feature table rows with glyphs, step list with rules, refined CTA
5. Rewrite `VisualizerPage.tsx`: editorial header bar, clean section headers, borderless textarea, refined comparison + angle + video layout
6. Update `Footer.tsx`: add large display wordmark moment
