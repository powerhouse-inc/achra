# Design System: Achra

**Brand:** Achra by Powerhouse
**Tagline:** The Marketplace for Global Coordination
**Primary color:** Signature Purple (#7A3AFF)

---

## 1. Visual Theme & Atmosphere

Clean, modern, and professional. High contrast with generous whitespace. The interface balances a premium editorial feel with functional density for dashboard views. Purple is the signature accent used sparingly for CTAs and interactive highlights. Surfaces are layered using subtle shadows and neutral backgrounds. Typography is tight and precise with Inter as the workhorse font.

**Design principles:**

- Content-first: large readable text, clear hierarchy, ample breathing room
- Consistent: every component follows the same spacing, radius, and color token system
- Accessible: dark mode is a first-class citizen, not an afterthought
- Component-driven: Radix UI primitives + Tailwind CSS + CVA variants

---

## 2. Color Palette & Roles

Colors are defined as CSS custom properties using OKLCh color space (light mode) and hex (dark mode). Tailwind classes map directly via the `@theme inline` block in `globals.css`.

### Core semantic tokens

| Token                      | Tailwind class                | Light (hex) | Dark (hex) | Role                                         |
| -------------------------- | ----------------------------- | ----------- | ---------- | -------------------------------------------- |
| `--primary`                | `bg-primary`, `text-primary`  | #7A3AFF     | #7A3AFF    | Brand purple. CTAs, active states, links     |
| `--primary-foreground`     | `text-primary-foreground`     | #F3F5F7     | #F3F5F7    | Text on primary backgrounds                  |
| `--background`             | `bg-background`               | #FCFCFC     | #1B1E24    | Page background                              |
| `--foreground`             | `text-foreground`             | #343839     | #FCFCFC    | Default body text                            |
| `--card`                   | `bg-card`                     | #FCFCFC     | #252A34    | Card surfaces                                |
| `--card-foreground`        | `text-card-foreground`        | #343839     | #F3F5F7    | Text on cards                                |
| `--popover`                | `bg-popover`                  | #FFFFFF     | #1E222B    | Dropdown/popover surfaces                    |
| `--popover-foreground`     | `text-popover-foreground`     | #343839     | #FCFCFC    | Text in popovers                             |
| `--secondary`              | `bg-secondary`                | #F5F5F7     | #4F596F    | Secondary buttons, subtle backgrounds        |
| `--secondary-foreground`   | `text-secondary-foreground`   | #343839     | #A6B1C7    | Text on secondary                            |
| `--muted`                  | `bg-muted`                    | #EFEFEF     | #343839    | Disabled backgrounds, subtle fills           |
| `--muted-foreground`       | `text-muted-foreground`       | #9EA0A1     | #6C7275    | Placeholder text, captions, secondary labels |
| `--accent`                 | `bg-accent`                   | #F3F5F7     | #373E4D    | Hover states, striped rows                   |
| `--accent-foreground`      | `text-accent-foreground`      | #000000     | #F3F5F7    | Text on accent                               |
| `--destructive`            | `bg-destructive`              | #EA4335     | #FF6467    | Error, delete, danger actions                |
| `--destructive-foreground` | `text-destructive-foreground` | #FCFCFC     | #FCFCFC    | Text on destructive                          |
| `--border`                 | `border-border`               | #D7D8D9     | #485265    | Default borders                              |
| `--input`                  | `border-input`                | #E8E8E8     | #485265    | Input field borders                          |
| `--ring`                   | `ring-ring`                   | #343839     | #F3F5F7    | Focus ring color                             |

### Status & accent colors

| Token               | Tailwind class                               | Hex     | Role                               |
| ------------------- | -------------------------------------------- | ------- | ---------------------------------- |
| `--status-progress` | `text-status-progress`, `bg-status-progress` | #329DFF | In-progress states, loading        |
| `--status-success`  | `text-status-success`, `bg-status-success`   | #4FC86F | Success, completed, approved       |
| `--status-warning`  | `text-status-warning`, `bg-status-warning`   | #FFA132 | Warning, needs attention           |
| `--destructive`     | `text-destructive`, `bg-destructive`         | #EA4335 | Error, failed, rejected            |
| `--yellow`          | `text-yellow`, `bg-yellow`                   | #FAC400 | Highlight, starred, premium        |
| `--purple`          | `text-purple`, `bg-purple`                   | #8E55EA | Secondary purple, tags, categories |
| `--fusion`          | `text-fusion`, `bg-fusion`                   | #FF82A1 | Fusion sub-brand accent            |
| `--to-do`           | `text-to-do`, `bg-to-do`                     | #FFA132 | To-do/pending items                |

### Status badge pattern

Use fractional opacity for status backgrounds:

```tsx
// Success badge
className = 'bg-status-success/30 text-status-success'

// Progress badge
className = 'bg-status-progress/30 text-status-progress'

// Warning badge
className = 'bg-status-warning/30 text-status-warning'

// Error badge
className = 'bg-destructive/30 text-destructive'
```

### Chart colors

Eight chart colors are defined (`chart-1` through `chart-8`) for data visualizations. Use `bg-chart-1`, `text-chart-1`, etc.

### Sidebar colors

Sidebar has its own token set for independent theming: `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring`.

---

## 3. Typography Rules

**Primary font:** Inter (Google Font, variable `--font-inter`)
**Secondary font:** Open Sans Condensed (local, variable `--font-sans-condensed`)
**Monospace:** System monospace stack (`font-mono`)

Inter is the default body font applied via the root layout className. Open Sans Condensed is used for specialized display text (condensed headings, hero accents).

### Type scale

Design spec sizes and their closest Tailwind equivalents. Tailwind sizes are approximate (e.g. `text-6xl` = 60px, not 64px). In practice, headings use responsive scaling rather than fixed sizes.

| Role         | Design spec | Weight | Line height | Tailwind (closest)                              |
| ------------ | ----------- | ------ | ----------- | ----------------------------------------------- |
| Display / H1 | 64px        | 700    | 1.2         | `text-5xl lg:text-6xl font-bold tracking-tight` |
| H2           | 40px        | 700    | 1.2         | `text-3xl sm:text-4xl font-bold tracking-tight` |
| H3           | 32px        | 700    | 1.2         | `text-2xl sm:text-3xl font-bold`                |
| H4           | 24px        | 700    | 1.2         | `text-2xl font-bold`                            |
| H5           | 20px        | 700    | 1.2         | `text-xl font-bold`                             |
| H6           | 18px        | 700    | 1.2         | `text-lg font-bold`                             |
| Subtitle 1   | 16px        | 600    | 1.4         | `text-base font-semibold`                       |
| Subtitle 2   | 14px        | 600    | 1.4         | `text-sm font-semibold`                         |
| Body         | 16px        | 400    | 1.5         | `text-base`                                     |
| Small        | 14px        | 400    | 1.5         | `text-sm`                                       |
| Caption      | 12px        | 500    | 1.4         | `text-xs font-medium`                           |

> **Note:** `text-3xl` = 30px, `text-4xl` = 36px, `text-5xl` = 48px, `text-6xl` = 60px. These are close-enough Tailwind equivalents. Use `text-[64px]` only if pixel-perfect spec match is required.

### Responsive text scaling

Headings scale down on smaller screens:

```tsx
// Hero heading
className = 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight'

// Section heading
className = 'text-2xl sm:text-3xl font-semibold tracking-tight'

// Use text-balance for multi-line headings
className = 'text-3xl font-bold tracking-tight text-balance'
```

### Font variable usage

```tsx
// Primary font (Inter) - applied by default via body className
className = 'font-inter'

// Secondary font (Open Sans Condensed) - for specialized display text
className = 'font-sans-condensed'
```

---

## 4. Component Stylings

All UI components live in `modules/shared/components/ui/`. They use **CVA** (class-variance-authority) for variants, **Radix UI** for accessibility primitives, and **data-slot** attributes for styling hooks. Use the `cn()` utility from `modules/shared/lib/utils` for merging classNames.

### Buttons

Defined in `modules/shared/components/ui/button.tsx`. Import from `@/modules/shared/components/ui/button`.

**Variants:**

| Variant       | Classes                                                                    | Usage                     |
| ------------- | -------------------------------------------------------------------------- | ------------------------- |
| `default`     | `bg-primary text-primary-foreground shadow-xs hover:bg-primary/90`         | Primary CTA               |
| `destructive` | `bg-destructive text-white shadow-xs hover:bg-destructive/90`              | Delete, remove            |
| `outline`     | `border bg-popover shadow-xs hover:bg-accent hover:text-accent-foreground` | Secondary actions         |
| `secondary`   | `bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80`   | Tertiary actions          |
| `ghost`       | `hover:bg-accent hover:text-accent-foreground`                             | Minimal/inline actions    |
| `link`        | `text-primary underline-offset-4 hover:underline`                          | Inline text links         |
| `icon`        | `size-9 rounded-full`                                                      | Icon-only circular button |

**Sizes:**

| Size      | Classes                                         | Usage              |
| --------- | ----------------------------------------------- | ------------------ |
| `default` | `h-9 px-4 py-2 has-[>svg]:px-3`                 | Standard           |
| `sm`      | `h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5` | Compact            |
| `lg`      | `h-10 rounded-md px-6 has-[>svg]:px-4`          | Prominent          |
| `icon`    | `size-9`                                        | Square icon button |
| `iconSm`  | `size-6`                                        | Small icon button  |
| `iconXsm` | `size-4`                                        | Extra-small icon   |
| `iconXxs` | `size-3`                                        | Tiny icon          |

**Usage:**

```tsx
import { Button } from '@/modules/shared/components/ui/button';

<Button variant="default" size="default">Save changes</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline" size="lg">Cancel</Button>
<Button variant="ghost" size="icon"><Icon /></Button>

// As a link (renders <a> instead of <button>)
<Button asChild variant="link"><Link href="/path">View</Link></Button>
```

**Design-system reference:** padding 10px 24px, border-radius 8px, font-size 14px, font-weight 600.

### Cards

Defined in `modules/shared/components/ui/card.tsx`. Compound component pattern.

**Base card:**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/modules/shared/components/ui/card'
;<Card>
  {' '}
  {/* bg-card text-card-foreground rounded-xl border py-6 shadow-sm */}
  <CardHeader>
    {' '}
    {/* px-6 gap-1.5 */}
    <CardTitle>Title</CardTitle> {/* font-semibold leading-none */}
    <CardDescription>Subtitle</CardDescription> {/* text-muted-foreground text-sm */}
    <CardAction>
      <Button variant="ghost" />
    </CardAction>
  </CardHeader>
  <CardContent>
    {' '}
    {/* px-6 */}
    Content here
  </CardContent>
  <CardFooter>
    {' '}
    {/* px-6 flex items-center */}
    Footer
  </CardFooter>
</Card>
```

**Key styles:** `rounded-xl`, `border`, `py-6`, `shadow-sm`. Uses `@container/card-header` for container queries.

### Inputs

Defined in `modules/shared/components/ui/input.tsx`.

```tsx
import { Input } from '@/modules/shared/components/ui/input'
;<Input type="text" placeholder="Enter value" />
```

**Key styles:**

- Base: `h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs`
- Dark: `dark:bg-input/30`
- Focus: `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- Error: `aria-invalid:ring-destructive/20 aria-invalid:border-destructive`
- Selection: `selection:bg-primary selection:text-primary-foreground`

### Textarea

Base: `min-h-16 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs`. Same focus and error states as Input. Uses `field-sizing: content` for auto-sizing. Resize disabled.

### Badges

Defined in `modules/shared/components/ui/badge.tsx`.

| Variant       | Classes                                                       |
| ------------- | ------------------------------------------------------------- |
| `default`     | `bg-primary text-primary-foreground border-transparent`       |
| `secondary`   | `bg-secondary text-secondary-foreground border-transparent`   |
| `destructive` | `bg-destructive/30 text-destructive border-transparent`       |
| `outline`     | `text-foreground` (border only)                               |
| `success`     | `bg-status-success/30 text-status-success border-transparent` |

Base: `rounded-md border px-2 py-0.5 text-xs font-medium w-fit`.

### Tables

Two variants in `modules/shared/components/ui/table.tsx`:

- **default:** Standard table with `hover:bg-muted/50` rows
- **pills:** Modern card-style rows with `border-separate border-spacing-y-2`, rounded first/last cells (`rounded-s-xl`, `rounded-e-xl`), `shadow-xs` on hover

### Dialogs/Modals

- Overlay: `fixed inset-0 z-170 bg-black/50`
- Content: `fixed top-[50%] left-[50%] z-180 max-w-[calc(100%-2rem)] sm:max-w-lg`
- Animations: `data-[state=open]:zoom-in-95`, `data-[state=closed]:zoom-out-95`
- Footer: `flex-col-reverse gap-2 sm:flex-row sm:justify-end`

### Sheet (Drawer)

- Side positions: right, left, top, bottom
- Max width: `max-w-sm`
- Animations: `slide-in-from-right`, `slide-out-to-right`
- Close button: `absolute top-4 right-4`

---

## 5. Layout Principles

### Spacing system

Base unit: `--spacing: 0.25rem` (4px). All Tailwind spacing values are multiples of this.

| Tailwind          | Value | Usage                                   |
| ----------------- | ----- | --------------------------------------- |
| `gap-1`, `p-1`    | 4px   | Tight inline spacing (icon-to-label)    |
| `gap-2`, `p-2`    | 8px   | Default inline/element spacing          |
| `gap-3`, `p-3`    | 12px  | Form field gaps                         |
| `gap-4`, `p-4`    | 16px  | Card padding (compact), section gaps    |
| `gap-6`, `p-6`    | 24px  | Card padding (standard), between groups |
| `gap-8`, `p-8`    | 32px  | Section padding                         |
| `gap-12`          | 48px  | Major section dividers                  |
| `gap-16`, `py-16` | 64px  | Page-level section spacing              |
| `py-20`           | 80px  | Large section spacing (tablet)          |
| `py-24`           | 96px  | Large section spacing (desktop)         |

### Container

Custom `container` utility defined in `globals.css`:

| Breakpoint       | Behavior                                      |
| ---------------- | --------------------------------------------- |
| Default (mobile) | `width: 100%; padding-inline: 16px`           |
| `sm` (640px)     | `padding-inline: 24px`                        |
| `md` (768px)     | `padding-inline: 32px`                        |
| `xl` (1280px)    | `max-width: 1200px; margin: auto; padding: 0` |
| `2xl` (1536px)   | `max-width: 1312px`                           |

Usage: apply the `container` class directly. Do NOT use Tailwind's default container -- this project overrides it.

```tsx
<section className="w-full py-16 sm:py-20 lg:py-24">
  <div className="container">{/* Section content */}</div>
</section>
```

### Grid patterns

```tsx
// 3-column responsive grid (most common)
className = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'

// 2-column responsive grid
className = 'grid grid-cols-1 gap-6 md:grid-cols-2'

// 4-column grid
className = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
```

### Section structure

```tsx
<section className="w-full py-16 sm:py-20 lg:py-24">
  <div className="container">
    <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
      <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Section Title
      </h2>
      <p className="text-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
        Section description
      </p>
    </header>
    {/* Content grid or children */}
  </div>
</section>
```

---

## 6. Depth & Elevation

### Shadow scale

Shadows adapt between light and dark modes automatically via CSS variables.

| Token              | Tailwind         | Light mode                                                           | Usage                           |
| ------------------ | ---------------- | -------------------------------------------------------------------- | ------------------------------- |
| `--shadow-2xs`     | `shadow-2xs`     | `0 1px 3px 0 hsl(0 0% 0% / 0.05)`                                    | Subtle lift                     |
| `--shadow-xs`      | `shadow-xs`      | `0 2px 12px 0 rgba(52,56,57, 0.1)`                                   | Inputs, small cards             |
| `--shadow-sm`      | `shadow-sm`      | `0 2px 7px 0 rgba(52,56,57, 0.25)`                                   | Cards, badges                   |
| `--shadow`         | `shadow`         | `0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)`  | Default elevation               |
| `--shadow-md`      | `shadow-md`      | `2px 4px 7px 0 rgba(52,56,57, 0.25)`                                 | Raised elements                 |
| `--shadow-lg`      | `shadow-lg`      | `1px 4px 15px 0 rgba(52,56,57, 0.25)`                                | Dropdowns, popovers             |
| `--shadow-xl`      | `shadow-xl`      | `0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1)` | Modals                          |
| `--shadow-2xl`     | `shadow-2xl`     | `0 1px 3px 0 hsl(0 0% 0% / 0.25)`                                    | Maximum depth                   |
| `--shadow-primary` | `shadow-primary` | `0 2px 10px 2px rgba(122,58,255, 0.2)`                               | Purple glow on primary elements |

### Surface hierarchy (bottom to top)

1. `bg-background` -- Page canvas
2. `bg-card` / `bg-secondary` -- Cards, sidebars
3. `bg-popover` -- Dropdowns, menus
4. `bg-accent` -- Hover states, striped rows
5. Dialogs (`z-170` overlay, `z-180` content)

### Z-index layers

| Layer           | Z-index | Usage                         |
| --------------- | ------- | ----------------------------- |
| Base content    | `z-0`   | Default stacking              |
| Sticky elements | `z-10`  | Sticky headers within content |
| Navbar          | `z-150` | Fixed top navigation          |
| Overlay         | `z-170` | Modal/dialog backdrop         |
| Dialog content  | `z-180` | Modal/dialog panel            |

---

## 7. Do's and Don'ts

### Do

- Use Tailwind utility classes from this design system -- never write raw CSS unless extending `globals.css`
- Use the `cn()` utility for conditional classNames: `cn("base-class", condition && "conditional-class")`
- Use `data-slot` attributes on all component root elements for styling hooks
- Use semantic color tokens (`bg-primary`, `text-muted-foreground`) not raw hex/oklch values
- Use the `container` class for page-width sections
- Use fractional opacity for status backgrounds: `bg-status-success/30 text-status-success`
- Use `text-balance` on multi-line headings for better line breaks
- Use Radix UI primitives as the base for new interactive components
- Use `asChild` pattern (Radix Slot) when a component needs to render as a different element
- Support both light and dark mode in every component
- Use `lucide-react` for all icons
- Use Next.js `<Image>` with explicit `sizes` prop for responsive images

### Don't

- Don't use `color:` or `background:` inline styles -- always use Tailwind color tokens
- Don't create new CSS custom properties -- use existing tokens from `globals.css`
- Don't use Tailwind's default container -- the project has a custom `container` utility
- Don't hardcode dark mode styles -- use the `dark:` variant which maps to `.dark` class
- Don't import fonts manually -- Inter and Open Sans Condensed are set up in `app/layout.tsx`
- Don't use `z-index` values above 180 or below 0 without justification
- Don't apply gradients to body text
- Don't use more than 2 font weights on a single component
- Don't put multiple primary (default variant) buttons in the same view area
- Don't use `shadow-primary` on non-primary-colored elements
- Don't use `rounded-lg` for cards -- use `rounded-xl` (cards) or `rounded-md` (inputs, small elements)
- Don't create new component files outside `modules/shared/components/ui/` for shared UI primitives

---

## 8. Responsive Behavior

### Breakpoints

| Name        | Width   | Tailwind prefix |
| ----------- | ------- | --------------- |
| Mobile      | < 640px | (default)       |
| Small       | 640px   | `sm:`           |
| Medium      | 768px   | `md:`           |
| Large       | 1024px  | `lg:`           |
| Extra large | 1280px  | `xl:`           |
| 2x large    | 1536px  | `2xl:`          |

### Responsive patterns

**Navigation:**

- Mobile: hamburger menu with Sheet (right-side drawer)
- Desktop (`lg:`): horizontal nav bar with full links
- Navbar height: `h-18` mobile, `h-27.5` (110px) desktop

**Content stacking:**

```tsx
// Cards stack on mobile, side-by-side on tablet, 3-column on desktop
'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'

// Two-column layout
'flex flex-col gap-6 md:flex-row'

// Hide on mobile, show on desktop
'hidden lg:flex'
'lg:hidden' // mobile only
```

**Touch targets:** Minimum `h-9` (36px) for interactive elements. Icon buttons: minimum `size-6` (24px).

**Scroll margins:** `scroll-mt-22 sm:scroll-mt-28` for anchor navigation to account for fixed navbar.

**Container queries:** Components use `@container` for internal responsiveness independent of viewport. Example: `@container/card-header`, `@container/field-group`.

### Image sizing

```tsx
<Image
  src={src}
  alt={alt}
  fill
  quality={75}
  loading="lazy"
  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
/>
```

---

## 9. Agent Quick Reference

### Imports

```tsx
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Label } from '@/modules/shared/components/ui/label'
```

### Icons

```tsx
import { IconName } from 'lucide-react';

// Standard icon size in buttons
<Button variant="ghost" size="icon"><Settings className="size-4" /></Button>

// Inline icon
<span className="flex items-center gap-2"><Check className="size-4" /> Done</span>
```

### Theme switching

Theme is managed by `next-themes` with `attribute: 'class'`. Default theme is `'light'`. Dark mode activates by adding `class="dark"` to `<html>`. Marketing/home pages force light theme.

```tsx
import { useTheme } from 'next-themes'
const { theme, setTheme } = useTheme() // 'light' | 'dark' | 'system'
```

### Color quick reference

| What you want        | Tailwind class                                |
| -------------------- | --------------------------------------------- |
| Page background      | `bg-background`                               |
| Body text            | `text-foreground`                             |
| Muted/secondary text | `text-muted-foreground`                       |
| Card surface         | `bg-card`                                     |
| Primary purple       | `bg-primary` / `text-primary`                 |
| White text on purple | `text-primary-foreground`                     |
| Subtle background    | `bg-secondary` / `bg-muted`                   |
| Input border         | `border-input`                                |
| Default border       | `border-border`                               |
| Focus ring           | `ring-ring`                                   |
| Error/danger         | `text-destructive` / `bg-destructive`         |
| Success              | `text-status-success` / `bg-status-success`   |
| In progress          | `text-status-progress` / `bg-status-progress` |
| Warning              | `text-status-warning` / `bg-status-warning`   |
| Purple glow shadow   | `shadow-primary`                              |
| Hover background     | `bg-accent`                                   |

### File locations

| What                   | Path                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| Global CSS & tokens    | `app/globals.css`                                                 |
| Root layout & fonts    | `app/layout.tsx`                                                  |
| Shared UI components   | `modules/shared/components/ui/`                                   |
| Utility functions (cn) | `modules/shared/lib/utils.ts`                                     |
| Theme provider         | `modules/shared/providers/theme-provider/root-theme-provider.tsx` |
| Storybook config       | `.storybook/preview.ts`                                           |

### Tech stack summary

- **Framework:** Next.js (App Router, React Compiler, typed routes)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@theme inline`)
- **Components:** Radix UI primitives + CVA variants
- **Icons:** lucide-react
- **Theme:** next-themes (class-based, `attribute: 'class'`)
- **Utilities:** `cn()` = `twMerge(clsx(...))`
- **SVG:** @svgr/webpack via Turbopack
- **Fonts:** Inter (Google, primary), Open Sans Condensed (local, secondary)
