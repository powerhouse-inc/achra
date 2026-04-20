# Achra Design System

A plain-text design reference for AI agents and engineers. Captures the light/dark design tokens, typography, elevation, and component patterns that power the Achra UI.

**Source of truth:** [`app/globals.css`](app/globals.css) (Tailwind v4 CSS-first config) and [`components.json`](components.json) (shadcn/ui `new-york` style, `neutral` base, CSS variables).

**Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · shadcn/ui (new-york) · Radix UI · Lucide · `next-themes` (class strategy).

**Theme toggle:** `.dark` class on any ancestor. Wired through [`RootThemeProvider`](modules/shared/providers/theme-provider/root-theme-provider.tsx) (wraps `next-themes`). Declared in CSS as `@custom-variant dark (&:where(.dark, .dark *))`.

---

## 1. Visual Theme & Atmosphere

Achra is "the marketplace for global coordination" — an operational hub for networks, builders, and service providers running governance, proposals, finances, and roadmaps across borders. The visual language supports that use case.

- **Mood:** operational, data-dense, utilitarian. Calm neutral canvases with a single expressive brand accent.
- **Design philosophy:** shadcn/ui `new-york` conventions (rounded-md corners, 3px focus rings, subtle borders) layered with an Achra-specific **violet primary** (`oklch(0.5553 0.2652 289.49)`) and a set of **status semantics** (progress / success / warning) for workflow states.
- **Light mode:** near-white backgrounds (`oklch(0.9911 0 0)`), cool-tinted slate-gray foreground, soft gray borders. Reads like a clean spreadsheet/ops console.
- **Dark mode:** deep desaturated blue-gray canvas (`#1b1e24`) with slightly lifted card surfaces (`#252a34`). Cockpit aesthetic — high contrast text on a dim operations surface.
- **Accent strategy:** violet primary is the only saturated color used for CTAs, selected states, and branded glows (`--shadow-primary`). All other UI chrome is neutral. Bespoke hues (`purple`, `fusion`, `to-do`, `yellow`) are reserved for categorical/illustrative contexts (charts, avatars, network badges).
- **Density:** Tailwind's `0.25rem` spacing base (4-px grid). Container widths cap at `~75rem` (xl) / `~82rem` (2xl) — wide enough for multi-column operational tables without becoming sparse.

---

## 2. Color Palette & Roles

All colors are defined as CSS custom properties in [`app/globals.css`](app/globals.css) and exposed to Tailwind as `bg-*`, `text-*`, `border-*` utilities via `@theme inline`. Use the **Tailwind utility** column in component code — never hardcode hex/oklch.

### 2.1 Core surface & text

| Token                  | Tailwind utility          | Light                                      | Dark                   | Role                                                     |
| ---------------------- | ------------------------- | ------------------------------------------ | ---------------------- | -------------------------------------------------------- |
| `--background`         | `bg-background`           | `oklch(0.9911 0 0)` (near-white)           | `#1b1e24` (deep slate) | Page canvas. Applied to `<body>` by base layer.          |
| `--foreground`         | `text-foreground`         | `oklch(0.3372 0.0058 214.37)` (cool slate) | `#fcfcfc` (near-white) | Default body text.                                       |
| `--card`               | `bg-card`                 | `oklch(0.9911 0 0)`                        | `#252a34`              | Card surface. Dark mode lifts above `--background`.      |
| `--card-foreground`    | `text-card-foreground`    | `oklch(0.3372 0.0058 214.37)`              | `#f3f5f7`              | Text on cards.                                           |
| `--popover`            | `bg-popover`              | `oklch(1 0 0)` (pure white)                | `#1e222b`              | Menus, dropdowns, tooltips.                              |
| `--popover-foreground` | `text-popover-foreground` | `oklch(0.3372 0.0058 214.37)`              | `#fcfcfc`              | Text on popovers.                                        |
| `--muted`              | `bg-muted`                | `oklch(0.9521 0 0)`                        | `#343839`              | Subtle fills (skeletons, disabled rows, inactive chips). |
| `--muted-foreground`   | `text-muted-foreground`   | `oklch(0.7044 0.0027 228.80)`              | `#6c7275`              | De-emphasized copy (captions, help text).                |

### 2.2 Brand & intent

| Token                      | Tailwind utility                      | Light                                  | Dark                                      | Role                                                                |
| -------------------------- | ------------------------------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| `--primary`                | `bg-primary`                          | `oklch(0.5553 0.2652 289.49)`          | `oklch(0.5553 0.2652 289.49)` (identical) | Brand accent (violet). Primary CTAs, selected tabs, active filters. |
| `--primary-foreground`     | `text-primary-foreground`             | `oklch(0.9692 0.0034 247.86)`          | `oklch(0.9692 0.0034 247.86)`             | Text/icons on primary surfaces.                                     |
| `--secondary`              | `bg-secondary`                        | `oklch(0.9672 0 0)` (light gray)       | `#4f596f` (slate-500)                     | Secondary buttons, chips, neutral fills.                            |
| `--secondary-foreground`   | `text-secondary-foreground`           | `oklch(0.3372 0.0058 214.37)`          | `#a6b1c7`                                 | Text on secondary.                                                  |
| `--accent`                 | `bg-accent`                           | `oklch(0.9692 0.0034 247.86)`          | `#373e4d`                                 | Hover fills for ghost/outline buttons, selected rows.               |
| `--accent-foreground`      | `text-accent-foreground`              | `oklch(0 0 0)` (pure black)            | `#f3f5f7`                                 | Text on accent surfaces.                                            |
| `--destructive`            | `bg-destructive` / `text-destructive` | `oklch(0.6257 0.2058 29.08)` (red-500) | `oklch(0.704 0.191 22.22)`                | Delete, error, validation failure.                                  |
| `--destructive-foreground` | `text-destructive-foreground`         | `oklch(0.9911 0 0)`                    | `oklch(0.985 0 0)`                        | Text on destructive surfaces.                                       |

### 2.3 Lines & focus

| Token      | Tailwind utility | Light                         | Dark      | Role                                                                                                  |
| ---------- | ---------------- | ----------------------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `--border` | `border-border`  | `oklch(0.8817 0.0018 247.84)` | `#485265` | Default border for cards, inputs, dividers. Applied via `@layer base { * { @apply border-border } }`. |
| `--input`  | `border-input`   | `oklch(0.922 0 0)`            | `#485265` | Input border.                                                                                         |
| `--ring`   | `ring-ring`      | `oklch(0.3372 0.0058 214.37)` | `#f3f5f7` | Focus ring color (outline + 3px ring, applied by shadcn components).                                  |

### 2.4 Sidebar scale

Dedicated tokens for the sidebar so it can diverge from main surfaces (e.g., darker panel in light mode, inverted panel in dark mode).

| Token                          | Tailwind utility                  | Light              | Dark                        | Role                       |
| ------------------------------ | --------------------------------- | ------------------ | --------------------------- | -------------------------- |
| `--sidebar`                    | `bg-sidebar`                      | `oklch(0.985 0 0)` | `oklch(0.205 0 0)`          | Sidebar surface.           |
| `--sidebar-foreground`         | `text-sidebar-foreground`         | `oklch(0.145 0 0)` | `oklch(0.985 0 0)`          | Sidebar text.              |
| `--sidebar-primary`            | `bg-sidebar-primary`              | `oklch(0.205 0 0)` | `oklch(0.488 0.243 264.38)` | Active nav item.           |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)`          | Text on active nav item.   |
| `--sidebar-accent`             | `bg-sidebar-accent`               | `oklch(0.97 0 0)`  | `oklch(0.269 0 0)`          | Hover nav item.            |
| `--sidebar-accent-foreground`  | `text-sidebar-accent-foreground`  | `oklch(0.205 0 0)` | `oklch(0.985 0 0)`          | Text on hover nav item.    |
| `--sidebar-border`             | `border-sidebar-border`           | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)`        | Sidebar dividers.          |
| `--sidebar-ring`               | `ring-sidebar-ring`               | `oklch(0.708 0 0)` | `oklch(0.439 0 0)`          | Focus ring inside sidebar. |

### 2.5 Chart scale

Sequential palette for data viz. Use in numeric order unless a semantic mapping applies. Tokens `chart-7` and `chart-8` are identical in both modes (neutral greys, used for "other"/"inactive" series).

| Token       | Tailwind utility              | Light                        | Dark                        | Intent             |
| ----------- | ----------------------------- | ---------------------------- | --------------------------- | ------------------ |
| `--chart-1` | `bg-chart-1` / `text-chart-1` | `oklch(0.81 0.1 252)`        | `oklch(0.488 0.243 264.38)` | Series 1           |
| `--chart-2` | `bg-chart-2`                  | `oklch(0.62 0.19 260)`       | `oklch(0.696 0.17 162.48)`  | Series 2           |
| `--chart-3` | `bg-chart-3`                  | `oklch(0.55 0.22 263)`       | `oklch(0.769 0.188 70.08)`  | Series 3           |
| `--chart-4` | `bg-chart-4`                  | `oklch(0.49 0.22 264)`       | `oklch(0.627 0.265 303.9)`  | Series 4           |
| `--chart-5` | `bg-chart-5`                  | `oklch(0.42 0.18 266)`       | `oklch(0.645 0.246 16.44)`  | Series 5           |
| `--chart-6` | `bg-chart-6`                  | `oklch(78.92% 0.1 24.86)`    | `oklch(0.742 0.141 24.53)`  | Series 6           |
| `--chart-7` | `bg-chart-7`                  | `oklch(72.42% 0.029 265.38)` | (same)                      | Neutral / "other"  |
| `--chart-8` | `bg-chart-8`                  | `oklch(86.57% 0.014 262.38)` | (same)                      | Muted / "inactive" |

> **Note:** Light and dark chart scales are hue-independent. Light mode reads as a near-monochromatic sequence in a single hue region; dark mode is categorical across multiple hue regions. Don't assume `chart-N` is the "same color" across modes — address series by role/index, not by expected hue.

### 2.6 Achra custom (status + categorical)

Application-specific tokens beyond the shadcn baseline. Same values in light and dark (tuned to work on both canvases).

| Token               | Tailwind utility                              | Value                                 | Role                                                                                                                 |
| ------------------- | --------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--status-progress` | `bg-status-progress` / `text-status-progress` | `oklch(0.684 0.1727 250.59)` (blue)   | "In progress" state on workstreams, proposals, purchases.                                                            |
| `--status-success`  | `bg-status-success` / `text-status-success`   | `oklch(0.7432 0.1665 149.27)` (green) | Completed / approved / paid states. Also backs `success` badge variant (`bg-status-success/30 text-status-success`). |
| `--status-warning`  | `bg-status-warning` / `text-status-warning`   | `oklch(0.7873 0.1608 64.84)` (amber)  | Attention required, pending review.                                                                                  |
| `--purple`          | `bg-purple`                                   | `oklch(59.01% 0.214 296.91)`          | Categorical (network/tag illustration).                                                                              |
| `--fusion`          | `bg-fusion`                                   | `oklch(75.53% 0.154 5.76)` (pink)     | Categorical.                                                                                                         |
| `--to-do`           | `bg-to-do`                                    | `oklch(78.73% 0.161 64.84)`           | "To do" state.                                                                                                       |
| `--yellow`          | `bg-yellow`                                   | `oklch(0.8447 0.1726 88.48)`          | Categorical highlight.                                                                                               |

---

## 3. Typography Rules

Fonts are loaded in [`app/layout.tsx`](app/layout.tsx) and exposed via `@theme inline` as Tailwind font-family utilities.

### 3.1 Font families

| Token                   | Tailwind utility      | Source                                                                                                                                                                                                                          | Usage                                                                                           |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--font-inter`          | `font-inter`          | `next/font/google` (Inter, Latin subset, CSS var `--font-inter`)                                                                                                                                                                | **Primary UI font.** Applied to `<body>` as `className`. Variable-weight. Default for all text. |
| `--font-sans-condensed` | `font-sans-condensed` | Local (`/public/fonts/OpenSansCondensed/`): Light 300, Bold 700, Light Italic 300i                                                                                                                                              | Display / marketing headlines and condensed-label usage. Variable `--font-open-sans-condensed`. |
| `--font-sans`           | `font-sans`           | System stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` | Fallback.                                                                                       |
| `--font-serif`          | `font-serif`          | `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`                                                                                                                                                                   | Reserved (rarely used).                                                                         |
| `--font-mono`           | `font-mono`           | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`                                                                                                                            | Code, addresses, hashes, technical values.                                                      |

`--tracking-normal` is set to `0em` (no default letter-spacing adjustment).

### 3.2 Type scale

Uses Tailwind 4 defaults (not overridden). Scale is `rem`-based, paired with the default `line-height` for each step.

| Utility     | Size (rem / px) | Line height | Typical use                               |
| ----------- | --------------- | ----------- | ----------------------------------------- |
| `text-xs`   | 0.75 / 12       | 1rem        | Captions, badges, table meta.             |
| `text-sm`   | 0.875 / 14      | 1.25rem     | Secondary body, dense lists, form labels. |
| `text-base` | 1 / 16          | 1.5rem      | Body copy.                                |
| `text-lg`   | 1.125 / 18      | 1.75rem     | Card titles, emphasized body.             |
| `text-xl`   | 1.25 / 20       | 1.75rem     | Section headers.                          |
| `text-2xl`  | 1.5 / 24        | 2rem        | Page sub-headings.                        |
| `text-3xl`  | 1.875 / 30      | 2.25rem     | Page titles.                              |
| `text-4xl`  | 2.25 / 36       | 2.5rem      | Marketing / hero.                         |
| `text-5xl`+ | ≥3 / 48         | 1           | Hero / landing.                           |

Weights: use `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700). shadcn components standardize on `font-medium` for buttons/badges.

---

## 4. Component Stylings

Built on shadcn/ui `new-york` style (see [`components.json`](components.json)). All components live under [`modules/shared/components/ui/`](modules/shared/components/ui). Variants are declared with `class-variance-authority` (CVA). Semantic tokens — never raw colors — drive all variants.

### 4.1 Common traits (applied across shadcn components)

- **Border radius:** `rounded-md` is the house default on interactive elements (buttons, inputs, badges, cards). `rounded-lg` for larger cards / dialogs. `rounded-full` for avatars, pills.
- **Focus state:** `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`. 3-px halo at 50 % opacity on the `ring` token.
- **Invalid state:** `aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`.
- **Disabled state:** `disabled:pointer-events-none disabled:opacity-50`.
- **Transitions:** `transition-all` on interactive surfaces; `transition-[color,box-shadow]` on state-only surfaces (badges).
- **Icons:** Lucide. Default size `size-4` inside buttons, `size-3` inside badges. Non-interactive (`[&_svg]:pointer-events-none`).

### 4.2 Button

Source: [`modules/shared/components/ui/button.tsx`](modules/shared/components/ui/button.tsx)

**Variants:**

| Variant       | Fill                                                         | Hover                                                                            | Usage                                                                                 |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `default`     | `bg-primary text-primary-foreground`                         | `hover:bg-primary/90`                                                            | Primary CTA. One per viewport where possible.                                         |
| `destructive` | `bg-destructive text-white` (dark: `dark:bg-destructive/60`) | `hover:bg-destructive/90`                                                        | Delete, irreversible actions. Uses `focus-visible:ring-destructive/20` (dark: `/40`). |
| `outline`     | `bg-popover` + `border` (dark: `dark:border-input`)          | `hover:bg-accent hover:text-accent-foreground` (dark: `dark:hover:bg-input/50`)  | Secondary action, equal-weight alternative.                                           |
| `secondary`   | `bg-secondary text-secondary-foreground`                     | `hover:bg-secondary/80`                                                          | Neutral companion action.                                                             |
| `ghost`       | transparent                                                  | `hover:bg-accent hover:text-accent-foreground` (dark: `dark:hover:bg-accent/50`) | Tertiary action, icon buttons in toolbars.                                            |
| `link`        | `text-primary`                                               | `hover:underline` (`underline-offset-4`)                                         | Inline text-level action.                                                             |
| `icon`        | `text-accent-foreground/30`                                  | `hover:text-accent-foreground`                                                   | De-emphasized icon-only control (e.g., dismiss "×").                                  |

**Sizes:**

| Size      | Dimensions                               |
| --------- | ---------------------------------------- |
| `default` | `h-9 px-4 py-2` (`has-[>svg]:px-3`)      |
| `sm`      | `h-8 px-3 gap-1.5` (`has-[>svg]:px-2.5`) |
| `lg`      | `h-10 px-6` (`has-[>svg]:px-4`)          |
| `icon`    | `size-9`                                 |
| `iconSm`  | `size-6`                                 |
| `iconXsm` | `size-4`                                 |
| `iconXxs` | `size-3`                                 |

Common base: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer`.

### 4.3 Badge

Source: [`modules/shared/components/ui/badge.tsx`](modules/shared/components/ui/badge.tsx)

`rounded-md border px-2 py-0.5 text-xs font-medium`. Variants: `default` (primary), `secondary`, `destructive`, `outline`, `success` (`bg-status-success/30 text-status-success leading-4.5 border-none` — Achra custom).

### 4.4 Input / Textarea / Field

Source: [`modules/shared/components/ui/input.tsx`](modules/shared/components/ui/input.tsx)

Base: `h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow]` (plus `md:text-sm`). Dark mode layers a subtle tint via `dark:bg-input/30`. Placeholder uses `placeholder:text-muted-foreground`; text selection uses `selection:bg-primary selection:text-primary-foreground`. Focus / invalid follow the common pattern in §4.1.

### 4.5 Card / Dialog / Popover / Sheet

- **Card** — source [`card.tsx`](modules/shared/components/ui/card.tsx). Container: `bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm`. Horizontal padding is not on `<Card>` — subparts (`CardHeader`, `CardContent`, `CardFooter`) own their own `px-6`. Note the radius is `rounded-xl`, not `rounded-md`.
- **Dialog** — source [`dialog.tsx`](modules/shared/components/ui/dialog.tsx). Overlay: `fixed inset-0 z-170 bg-black/50`. Content: `bg-background fixed top-[50%] left-[50%] z-180 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg`. Note the surface token is `--background`, not `--popover`.
- **Sheet** — source [`sheet.tsx`](modules/shared/components/ui/sheet.tsx). Overlay: `bg-black/50`. Content: `bg-background flex flex-col gap-4 shadow-lg` with a side-specific border (`border-l`, `border-r`, `border-b`, or `border-t`) depending on `side` prop (default `right`, `w-3/4 sm:max-w-sm`).
- **Popover / Dropdown / Hover card** — source [`popover.tsx`](modules/shared/components/ui/popover.tsx). `bg-popover text-popover-foreground rounded-md border p-4 shadow-md outline-hidden` (popover width `w-72`).

### 4.6 Navigation

- **Sidebar** — uses the dedicated `--sidebar-*` scale (§2.4). Items use `bg-sidebar-accent` on hover and `bg-sidebar-primary` when active.
- **Tabs, breadcrumb, menubar, navigation-menu** — neutral surfaces with `bg-muted` rails and `bg-background` active indicators.

### 4.7 Chart

Source: [`modules/shared/components/ui/chart.tsx`](modules/shared/components/ui/chart.tsx). Consumes the 8-step `--chart-*` scale via a CSS-var bridge so series colors adapt to light/dark.

---

## 5. Layout Principles

### 5.1 Spacing scale

Base unit: `--spacing: 0.25rem` (4 px). Tailwind utilities (`p-*`, `m-*`, `gap-*`, `size-*`) multiply this. No custom overrides.

Typical rhythm:

- **2** (`gap-2` / `p-2`) — tight chips, dense toolbars.
- **3–4** (`gap-3` / `p-4`) — standard card padding, form field gaps.
- **6–8** (`py-6`, `gap-8`) — section padding.
- **12–16** (`py-12`, `py-16`) — landing / marketing sections.

### 5.2 Container

Declared as `@utility container` in [`app/globals.css`](app/globals.css:225-247). Fluid up to `xl`, then capped:

| Breakpoint      | Width                                               | Horizontal padding                 |
| --------------- | --------------------------------------------------- | ---------------------------------- |
| < 640 px        | 100 %                                               | `calc(var(--spacing) * 4)` (16 px) |
| ≥ 640 px (sm)   | 100 %                                               | `calc(var(--spacing) * 6)` (24 px) |
| ≥ 768 px (md)   | 100 %                                               | `calc(var(--spacing) * 8)` (32 px) |
| ≥ 1280 px (xl)  | `calc(var(--spacing) * 300)` ≈ **75 rem / 1200 px** | `0` (centered)                     |
| ≥ 1536 px (2xl) | `calc(var(--spacing) * 328)` ≈ **82 rem / 1312 px** | `0` (centered)                     |

Apply as `<div class="container">`.

### 5.3 Border radius

No `--radius` token defined; uses Tailwind 4 defaults (`sm` 0.25rem · `md` 0.375rem · `lg` 0.5rem · `xl` 0.75rem · `2xl` 1rem · `full`). House conventions observed in the shipped shadcn components:

- `rounded-md` — buttons, inputs, badges, popovers, small controls.
- `rounded-lg` — dialogs (confirmed in [`dialog.tsx`](modules/shared/components/ui/dialog.tsx)).
- `rounded-xl` — cards (confirmed in [`card.tsx`](modules/shared/components/ui/card.tsx)).
- `rounded-full` — avatars, circular pills, swiper pagination bullets.

### 5.4 Global base layer

From `@layer base` in [`app/globals.css`](app/globals.css:215-223):

- `* { @apply border-border outline-ring/50 }` — every element inherits the semantic border and a 50 % ring color for non-focus-visible outlines.
- `body { @apply bg-background text-foreground }` — page canvas and default text.

---

## 6. Depth & Elevation

### 6.1 Shadow scale

Two-track system. Light mode uses subtle `hsl(0 0% 0% / …)` layers; dark mode uses heavier opaque `rgba(r g b / …)` drops with a slate-green tint that reads as separation on the dark canvas.

| Token              | Tailwind utility | Light                                                                | Dark                                  | Use                                                                             |
| ------------------ | ---------------- | -------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------- |
| `--shadow-2xs`     | `shadow-2xs`     | `0 1px 3px 0 hsl(0 0% 0% / 0.05)`                                    | `0 1px 3px 0 hsl(0 0% 0% / 0.05)`     | Hairline press / separator.                                                     |
| `--shadow-xs`      | `shadow-xs`      | `0 2px 12px 0 rgba(52,56,57,0.1)`                                    | `0 2px 12px 1px rgba(0,0,0,0.2)`      | Subtle card lift.                                                               |
| `--shadow-sm`      | `shadow-sm`      | `0 2px 7px 0 rgba(52,56,57,0.25)`                                    | `0 2px 7px 1px rgba(9,13,14,0.6)`     | Default card, input rest.                                                       |
| `--shadow`         | `shadow`         | `0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)`  | (same)                                | Generic raised surface.                                                         |
| `--shadow-md`      | `shadow-md`      | `2px 4px 7px 0 rgba(52,56,57,0.25)`                                  | `2px 4px 7px 1px rgba(7,8,8,0.4)`     | Popover, dropdown.                                                              |
| `--shadow-lg`      | `shadow-lg`      | `1px 4px 15px 0 rgba(52,56,57,0.25)`                                 | `1px 2px 15px 3px rgba(2,1,11,0.5)`   | Dialog, sheet.                                                                  |
| `--shadow-xl`      | `shadow-xl`      | `0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1)` | (same)                                | Large overlay.                                                                  |
| `--shadow-2xl`     | `shadow-2xl`     | `0 1px 3px 0 hsl(0 0% 0% / 0.25)`                                    | (same)                                | Reserved for rare max-elevation surfaces.                                       |
| `--shadow-primary` | `shadow-primary` | `0 2px 10px 2px rgba(122,58,255,0.2)`                                | `0 2px 13px 2px rgba(122,58,255,0.3)` | **Branded glow.** Use sparingly on primary CTAs to reinforce the violet accent. |

### 6.2 Elevation hierarchy

```
background (page)                           ← --background
  └─ card / input (rest)                    ← --card / --popover  + shadow-sm
      └─ popover / dropdown                 ← --popover + shadow-md
          └─ dialog / sheet                 ← --popover + shadow-lg
              └─ toast (sonner)             ← --popover + shadow-xl
```

---

## 7. Do's and Don'ts

### Do

- **Use semantic tokens.** Reach for `bg-background`, `text-foreground`, `bg-primary`, `border-border`, etc. These auto-resolve to the right light/dark value.
- **Pair each surface with its `-foreground`.** Every bg token has a matching foreground token (`bg-card` → `text-card-foreground`). Mixing them breaks contrast in dark mode.
- **Ship new statuses through `status-progress / status-success / status-warning`.** Extend this scale before adding raw hex.
- **Reserve `bg-primary` for the single most important action on screen.** If everything is primary, nothing is.
- **Use `ring-ring` / `focus-visible:ring-[3px]`** to stay on the shadcn focus pattern. Accessibility-critical.
- **Apply `shadow-primary`** on hero / marketing CTAs for brand emphasis — not on repeat interactive elements.
- **Use `font-inter` implicitly** (inherited from body). Only call out a family when you need `font-sans-condensed` or `font-mono`.
- **Respect the `.dark` class strategy.** Test every new component in both themes via Storybook before merging.

### Don't

- **Don't hardcode hex or oklch** in component code. If a needed value isn't a token, add it to `app/globals.css` (both `:root` and `.dark` blocks) and the `@theme inline` map.
- **Don't use Tailwind's built-in palettes** (`bg-gray-500`, `text-slate-600`, `border-zinc-200`, etc.) in shared components. They don't switch with theme.
- **Don't introduce a second brand color.** Violet `--primary` is the only saturated accent. Additional saturation should go through `--chart-*` (data viz) or the Achra custom tokens (categorical).
- **Don't set `ring-offset-*` manually** — shadcn components already encode the 3-px `ring-[3px]` pattern. Adding offset often breaks it.
- **Don't assume `--chart-N` is hue-stable across themes.** Light mode is monochromatic blue; dark mode is categorical. Use the token by role, not by expected color.
- **Don't invent per-component radii.** Stay on the house scale: `rounded-md` for controls/badges, `rounded-xl` for cards, `rounded-lg` for dialogs, `rounded-full` for avatars/pills. Inconsistent rounding reads as visual noise in a data-dense UI.
- **Don't stack shadows.** Pick one `--shadow-*` per surface.
- **Don't toggle dark mode outside `RootThemeProvider`.** Use `useTheme()` from `next-themes`.

---

## 8. Responsive Behavior

### 8.1 Breakpoints

Tailwind 4 defaults (not overridden in `@theme`). Use prefixes `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

| Prefix | Min width         |
| ------ | ----------------- |
| `sm`   | `40rem` / 640 px  |
| `md`   | `48rem` / 768 px  |
| `lg`   | `64rem` / 1024 px |
| `xl`   | `80rem` / 1280 px |
| `2xl`  | `96rem` / 1536 px |

Mobile-first: default styles target the smallest viewport, then layer up.

### 8.2 Layout collapsing

- **Container padding** — widens `16 → 24 → 32 px` across `< sm → sm → md`, then becomes `0` at `xl` / `2xl` (fixed max-width).
- **Sidebar** — collapses to a drawer / off-canvas at mobile breakpoints (see [`modules/shared/components/ui/sidebar.tsx`](modules/shared/components/ui/sidebar.tsx)).
- **Navigation** — top-level nav consolidates into a sheet/drawer at `< md`.
- **Data tables** — consider horizontal scroll (`scroll-area`) at `< md` rather than reflowing rows.
- **Custom CSS media query** at 640 px: bumps Swiper navigation size (`--swiper-navigation-size: 10 → 14 px`, sides offset `4 → 6 px`). Lives in [`app/globals.css`](app/globals.css:74-79).

### 8.3 Touch targets

Minimum hit target: 36 × 36 (`size-9` / `h-9`). The `icon` button size hits this; `iconSm` (`size-6`) and below are reserved for non-primary / secondary-interaction contexts where the parent is the hit target.

### 8.4 Motion & scroll

- `html { scroll-behavior: smooth }` on the root (see [`app/layout.tsx`](app/layout.tsx)).
- `:root { scrollbar-gutter: stable }` prevents layout shift when scrollbars appear/disappear.
- `body[data-scroll-locked]` safely neutralizes scroll-lock libs that try to add right margin.

---

## 9. Agent Prompt Guide

Ready-to-use directives for prompting an AI coding agent against the Achra system.

### 9.1 Semantic token cheat sheet

```
Surface        bg-background        text-foreground
Card           bg-card              text-card-foreground
Popover/Menu   bg-popover           text-popover-foreground
Muted fill     bg-muted             text-muted-foreground
Brand CTA      bg-primary           text-primary-foreground
Neutral CTA    bg-secondary         text-secondary-foreground
Hover fill     bg-accent            text-accent-foreground
Destructive    bg-destructive       text-destructive-foreground
Border         border-border
Focus ring     ring-ring            (focus-visible:ring-[3px])
Success state  bg-status-success/30 text-status-success
In-progress    text-status-progress
Warning        text-status-warning
```

### 9.2 Copy-paste prompt fragments

- **"Use semantic tokens only"** — "Only use shadcn semantic Tailwind utilities (`bg-*`, `text-*`, `border-*` mapped to CSS vars in `app/globals.css`). Do not use `gray-*`, `slate-*`, or raw hex."
- **"Pair bg with foreground"** — "Whenever you apply a `bg-X`, apply the matching `text-X-foreground` on child text, or ensure inherited text color already resolves to that pair."
- **"Primary is scarce"** — "`bg-primary` is reserved for the single most important action per screen. Use `bg-secondary` or `variant=outline` for companion actions."
- **"Dark mode by class"** — "Dark mode is toggled via the `.dark` class on the root. Don't gate on `prefers-color-scheme`; use `useTheme()` from `next-themes`."
- **"Use CVA for component variants"** — "Define component variants with `class-variance-authority`, following the pattern in `modules/shared/components/ui/button.tsx`: a shared base class string, a `variants` map keyed by semantic names, `defaultVariants` explicit."
- **"Focus ring pattern"** — "Interactive elements use `outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`. Invalid adds `aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`."
- **"Elevation"** — "Pick one `shadow-*` per surface. Card rest uses `shadow-sm`, popovers `shadow-md`, dialogs `shadow-lg`, hero CTAs can use `shadow-primary`."

### 9.3 When extending the system

1. **New color:** add to both `:root` and `.dark` in [`app/globals.css`](app/globals.css), then map under `@theme inline` as `--color-<name>: var(--<name>)`. Document the role here.
2. **New component:** place under [`modules/shared/components/ui/`](modules/shared/components/ui), use CVA, export `{ Component, componentVariants }`, add Storybook story alongside.
3. **New font:** load in [`app/layout.tsx`](app/layout.tsx) with `next/font`, expose as a CSS variable, register under `@theme inline` as `--font-<name>: var(--font-<name>)`.
4. **Visual verification:** Storybook is configured at `pnpm storybook` (see [`README.md`](README.md)) — a convenient place to check a component in both `.dark` and default themes before it lands.
