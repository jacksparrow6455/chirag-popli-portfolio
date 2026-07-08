# Chirag Popli — Portfolio

Personal portfolio website for Chirag Popli, a Senior Data Consultant. Built with Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui.

**Live site**: [https://chiragpopli.work.gd](https://chiragpopli.work.gd) (custom domain)  
**GitHub Pages fallback**: [https://jacksparrow6455.github.io/chirag-popli-portfolio/](https://jacksparrow6455.github.io/chirag-popli-portfolio/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite 8 + React 19 |
| Language | TypeScript ~6.0 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| UI Library | shadcn/ui (copy-paste components) |
| Animation | framer-motion (scroll entrances, page transitions, stagger) |
| Charts | Recharts (BarChart, AreaChart, RadarChart, PieChart) |
| Icons | lucide-react |
| Deployment | GitHub Pages via `gh-pages` npm package |
| Linting | oxlint |

## Project Structure

```
portfolio/
├── public/
│   └── CNAME              # Custom domain config
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui components (button, card, badge, avatar, progress)
│   │   ├── animated-grid.tsx   # Fixed background with grid pattern + glow orbs
│   │   ├── bento-grid.tsx      # Flexible grid layout (ready for use)
│   │   ├── contact-tab.tsx     # Contact section with cards
│   │   ├── education-tab.tsx   # Education timeline + certifications
│   │   ├── experience-tab.tsx  # Work experience with 3D cards
│   │   ├── header.tsx          # Sticky top nav bar
│   │   ├── overview-tab.tsx    # Landing section with charts
│   │   ├── projects-tab.tsx    # Project cards with tech filters
│   │   ├── sidebar.tsx         # Fixed left nav with avatar + sections
│   │   ├── skills-tab.tsx      # Skill groups with progress bars
│   │   ├── smooth-scroll.tsx   # Passthrough wrapper (Lenis removed)
│   │   └── spotlight-card.tsx  # Mouse-follow spotlight effect on cards
│   ├── lib/
│   │   ├── data.ts        # All resume content (skills, experience, projects, etc.)
│   │   └── utils.ts       # shadcn/ui utility (cn function)
│   ├── App.tsx            # Root app with section routing + sidebar layout
│   ├── index.css          # Tailwind imports, CSS variables, custom animations
│   └── main.tsx           # React entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── components.json       # shadcn/ui config
└── .oxlintrc.json        # Linter config
```

## Components & Features

### Custom Components (not from shadcn/ui)

| Component | Description |
|---|---|
| `SpotlightCard` | Wrapper that adds a mouse-following radial gradient spotlight on hover |
| `AnimatedGrid` | Fixed full-screen background with subtle grid pattern + animated glow orbs |
| `BentoGrid` | Flexible 3-column grid layout for dashboard-like sections |

### shadcn/ui Components

- `Button` — with variants (default, outline, ghost)
- `Card` / `CardHeader` / `CardContent` / `CardTitle`
- `Badge` — for tech tags
- `Avatar` / `AvatarFallback` — profile image
- `Progress` — skill level bars

### Layout

- **Sidebar**: Fixed left nav (256px), hidden on mobile with hamburger toggle, shows avatar + name + section links
- **Header**: Sticky top bar with terminal-style path indicator + contact button
- **Main**: Content area with `md:pl-64` padding for sidebar offset. Uses `AnimatePresence` for page transitions.

### Tab Sections

| Tab | Content |
|---|---|
| Overview | Hero, Marquee (removed — was causing overflow), metrics grid, BarChart (skills), AreaChart (career), RadarChart (skill distribution), PieChart (domain impact), summary card |
| Experience | Timeline-style cards with 3D tilt on hover, achievements with staggered animations, tech badges |
| Skills | 2-column grid of skill groups with animated progress bars |
| Projects | Filterable cards with 3D tilt, tech filter buttons, impact badges |
| Education | Timeline layout for degrees + grid of certifications with award icon |
| Contact | 4 contact cards (email, LinkedIn, GitHub, location) with click actions + 3D tilt |

## Charts (Recharts)

- **BarChart**: Horizontal bar chart showing top 10 skills proficiency
- **AreaChart**: Career growth timeline with dots labeled by company name
- **RadarChart**: Average skill level by category
- **PieChart**: Impact distribution by domain (donut chart with legend)

## Animations

- **framer-motion**: Scroll-triggered `useInView` entrances, stagger children, AnimatePresence page transitions
- **3D card tilt**: CSS perspective transforms on mouse move (projects, experience, contact)
- **CSS animations**: Float, pulse-glow, scanline, grid-bg (defined in `index.css`)

## Custom Domain

Domain: `chiragpopli.work.gd` (from freedomain.one)

DNS records:
- A record: `chiragpopli.work.gd` → `185.199.108.153`
- CNAME: `www.chiragpopli.work.gd` → `jacksparrow6455.github.io`

The CNAME file in `public/CNAME` is picked up by GitHub Pages to auto-configure the custom domain.

## Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Build + deploy to GitHub Pages
npm run deploy
```

## Path Aliases

`@/` maps to `./src/*` (configured in `vite.config.ts` and `tsconfig.app.json`).

## Resume Data

All portfolio content (name, skills, experience, education, projects, certifications, metrics) is in `src/lib/data.ts`. Edit this file to update the portfolio content.
