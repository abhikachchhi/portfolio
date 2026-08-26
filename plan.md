## Build plan

### 01 — Foundation + design system

First Codex task.

Build:

- React project
- TypeScript
- responsive architecture
- desktop + mobile breakpoints
- global layout
- Practa typography integration
- body/UI font
- color system
- liquid-glass material system
- buttons
- chips
- glass panels
- navigation primitives
- spacing/radius/motion tokens
- temporary component showcase page

**No final homepage yet.**

This gives us something visual to iterate on immediately.

---

### 02 — Navigation + site shell

Once the UI language feels right:

- desktop navigation
- mobile navigation
- logo/name treatment
- page transitions
- global background
- custom cursor if we decide to use one
- responsive behaviour
- accessibility/reduced-motion behaviour

Likely routes:

`/`  
`/work`  
`/work/:slug`  
`/about`  
`/playground` eventually

---

### 03 — First-launch animation

Build the RCA-inspired arrival experience.

Something like:

**black → Practa typography / object reveal → transformation → portfolio**

Requirements:

- first-visit behaviour
- replay mechanism for development
- skip button
- reduced-motion fallback
- mobile-safe
- performant
- no giant video asset
- animation should transition naturally into the hero

We’ll design this more precisely when we reach it.

---

### 04 — Interactive hero / 3D identity

This is probably the most important design milestone.

Create the central interactive object/game-like experience using something such as:

- Three.js
- React Three Fiber
- Drei

It needs to work with:

**mouse → desktop**  
**touch → mobile**

And have graceful fallback for weak devices.

We should prototype several ideas rather than immediately committing to one.

---

### 05 — Homepage content

Only once the identity works:

Hero  
Selected Work  
small About introduction  
contact/footer

Minimal text.

The 3D interaction stays the dominant visual.

---

### 06 — Project system

Create reusable project content architecture.

Each project can eventually contain:

- title
- year
- description
- role
- technologies
- hero media
- screenshots
- problem
- approach
- technical decisions
- outcome
- GitHub
- live URL

Then adding a project should mostly mean adding content rather than writing another custom page.

---

### 07 — About / experience / contact

Build the remaining actual portfolio content.

Keep it editorial and minimal rather than résumé-template-like.

---

### 08 — Playground

Later.

This is where small:

- WebGL experiments
- games
- visual experiments
- weird interfaces
- shaders

can live without being treated as flagship projects.

---

### 09 — Final polish

Only at the end:

- responsive QA
- Safari/iOS testing
- Chrome
- Firefox
- performance
- Lighthouse
- loading strategy
- WebGL optimization
- accessibility
- SEO
- OpenGraph
- favicon
- deployment
- animation polish

And **AI stays completely outside this project for now.**

---

## Technology direction

I would start with:

**React + TypeScript + Vite**

and use:

**Tailwind CSS** — layout/utility styling  
**Motion** — normal UI/page animations  
**React Three Fiber + Drei** — later for 3D  
**Lucide** — only where icons are actually needed

I don't want to install every animation/3D dependency in milestone 01 just because we might need it later. Keep the initial repo light.

For typography:

**Practa** — display/identity  
**Geist** — UI/body

And our main palette remains approximately:

`#0A0A0D` — background  
`#111317` — surface  
`#1A1D24` — raised surface  
`#8B7CFF` — violet  
`#64E0FF` — cyan  
`#F5F6F8` — primary text

With accent usage kept very restrained.
