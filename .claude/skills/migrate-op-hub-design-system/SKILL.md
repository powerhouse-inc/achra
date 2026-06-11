---
name: migrate-op-hub-design-system
description: >-
  Migrate a Powerhouse op-hub editor (packages/op-hub/editors/*) to the Achra
  design system. Swap @powerhousedao/document-engineering primitives for
  @achra/ui, replace hardcoded Tailwind palette colors (gray-*, slate-*,
  stone-*, emerald-*, raw hex) with semantic tokens, and fix light/dark theming
  for the third-party components an editor renders inside Connect
  (document-engineering ObjectSetTable & Sidebar, @uiw/react-md-editor,
  design-system widgets). Use when updating design tokens in an op-hub editor,
  fixing dark-mode contrast (dark-on-dark text, white hover/selection flashes,
  light borders, near-black widget surfaces), or porting an editor's colors to
  semantic tokens. Proven on builder-profile, builder-team-admin (incl. the
  subscriptions dashboard and charts), and service-offering-app.
---

# Migrate an op-hub editor to the Achra design system

Playbook distilled from migrating `builder-profile`, `builder-team-admin` (17 components incl. a chart-heavy dashboard), and `service-offering-app`. The **reference implementations** are those editors plus `packages/op-hub/style.css` — read `style.css` alongside this skill; it is heavily commented and is the living source of truth.

## The mental model (why this is harder than a normal Tailwind app)

An op-hub editor is **not** a standalone app. It renders **inside Connect**, which changes the rules:

1. **Two design systems are present at once.** Connect ships `@powerhousedao/design-system` (slate-based; dark mode = `.dark` on `<html>`). The migration layers `@achra/design-system` + `@achra/ui` on top. Both define tokens. Load order is NOT guaranteed on deployed Connect — value overrides must use `:root.dark` (see Recipe F).
2. **Tailwind v4 does not scan `node_modules`.** Utility classes that only appear in a dependency's source are never generated — and those deps **hardcode light-mode palette classes** (`text-gray-900`, `hover:bg-gray-100`, `bg-blue-50`) usually with no `dark:` variant, producing dark-on-dark text and white hover flashes in dark mode.
3. **You only own *some* of the markup.** Your markup → semantic tokens (Recipe A). Dependency markup → CSS overrides (C/D) or a CSS-var bridge (E).

## ⚠️ Already solved globally — do NOT redo per editor

`packages/op-hub/style.css` already contains global rules. New editors get these **for free** — just use the right tokens and don't fight them:

| Global rule | Effect |
| --- | --- |
| Connect chrome slate remap (`:root.dark { --color-slate-* }`) | App canvas/panels/buttons follow Achra dark tokens |
| **Card lift**: `:root.dark { --card: var(--accent) }` | Every `bg-card` reads as a raised surface (#373e4d) on the canvas |
| Inputs pinned: `.dark [data-slot="input"/"textarea"/"select-trigger"] { background: var(--background) }` (+ `color: var(--foreground)` both modes) | @achra/ui controls read as dark recessed input wells; a `bg-background` className on an Input is now a harmless no-op |
| `.dark .object-set-table { background: var(--background) }` + text/hover/selection/border overrides | Every ObjectSetTable is a themed recessed data well |
| Sidebar: `.dark .sidebar__item*` rows/header + caret rules (`.sidebar__item-caret svg`, both modes, `!important`) | document-engineering Sidebars themed incl. expand arrows |
| document-engineering form controls (`.dark [class*="dark:bg-charcoal-900"]`, `[class*="dark:bg-slate-600"]`, `[cmdk-item]`, `.date-picker__calendar` + `data-today`/`data-selected`, `.date-picker__date-footer`, tooltip `[class*="dark:text-gray-200"]`) | DE Select triggers/panels/options, DatePicker inputs + full calendar (days, today, selected=violet, year/month picker views, footer toggles), text Inputs, sidebar tooltips — all themed. Calendar nav arrows get `z-index` so they're clickable (see traps below) |
| Arbitrary-value safelist (`@source inline("{h-[28px],w-[68px],…}")`) | The date-picker year/month views' layout utilities exist only in node_modules — without the safelist the year grid collapses |
| `@source` for `./editors/**` and `../ui/src/**`; `@source inline(...)` safelists | Utility generation for editor + @achra/ui source |

**The resulting dark hierarchy** every editor should follow: **cards = `bg-card`** (lifts to accent) › **inputs / markdown editors / data tables = `--background`** (recessed) › **`bg-muted`** for in-between grouping boxes. Don't invent per-editor `--card` overrides — the global rule owns it.

**⚠️ The editor ROOT paints NO page background.** Leave the root transparent (builder-profile's `min-h-screen` root has no `bg-*`) so the editor inherits Connect's drive-app canvas and matches it exactly. Painting `bg-background` / `var(--background)` on the root renders visibly DARKER than the host surface (proven mistake on resource-instance-editor). If the editor had a page-tint root (`bg-slate-50/50`), delete it or make it transparent — `--background` is for *recessed elements* (inputs, tables, inset wells), never the page.

**Exception — DRIVE editors sit on a darker host than DOCUMENT editors.** Document editors inherit Connect's document-host surface (slate-800 → `#252a34`); drive editors (whole-drive apps like builder-team-admin) sit directly on the app canvas (slate-900 → `#1b1e24`), so a transparent root reads darker than the document editors. If that mismatch matters, paint the drive shell dark-only with the host surface: `.dark .<editor>-drive-shell { background-color: var(--color-slate-800) }` keyed on a unique class you add to the shell (see `bta-drive-shell`). Scope per editor — don't blanket `ph-drive-explorer-shell`.

**Native `<input type="date|time|...">` pickers**: the BROWSER renders the popup and only themes it dark when the input has `color-scheme: dark` — no page CSS can paint it. Solved globally (`.dark input[type="date"] … { color-scheme: dark }` in style.css).

**Cards must stand out in light mode too**: every card surface = `bg-card` + `border-border` + the Achra elevation scale — `shadow-sm` (Tailwind) or `box-shadow: var(--shadow-sm)` (plain CSS) for resting cards, `--shadow-md` popovers, `--shadow-lg` modals. These tokens are theme-aware (card-lift in light, heavier separation drops in dark) — bridge any editor-local shadow vars to them instead of keeping custom rgba shadows.

## Per-editor workflow

1. **Inventory.** `grep -rhoE "bg-white|(bg|text|border|ring|from|to|via|divide|fill|stroke|hover:bg|hover:text|outline)-(gray|slate|stone|zinc|neutral|emerald|sky|amber|blue|red|green|indigo|violet|purple|yellow|orange|teal|rose)-[0-9]+(/[0-9]+)?|#[0-9a-fA-F]{3,8}" <dir> --include=*.tsx | sort | uniq -c | sort -rn` — plus check for `@powerhousedao/document-engineering` primitive imports and `<svg>`/recharts usage.
2. **Scale the approach.** A handful of files → edit directly (`replace_all` per color class works well when a file maps consistently). A big directory (10+ files, 100+ instances) → fan out a **Workflow**: one agent per file with the mapping below, then **independently grep-verify** (agents self-report 0 leftovers; check anyway) and **audit SVG attributes** (see the trap below — agents reliably get this wrong).
3. **Apply the mapping** (Recipe A) and the structural recipes (B–F) as needed.
4. **Verify**: the inventory grep returns zero; toggle Connect light ↔ dark on every changed view.
5. **Checks**: `bun run tsc` and `bun run lint:fix` in `packages/op-hub` (bun, not npm). Expect prettier wrap errors after class-length changes — `--fix` handles them.

## Recipe A — markup you author: semantic tokens + @achra/ui

**Component swaps:** `TextInput`→`Input` (`@achra/ui/input`), `Textarea`→`Textarea`, native `<select>`+chevron hacks→`Select/SelectTrigger/SelectValue/SelectContent/SelectItem`, `Icon name="X"`→`lucide-react`. Import `cn` from `@achra/ui/lib/utils`. `@achra/ui` is a bundled **devDep** (`pnpm add -D @achra/ui@workspace:*`).

**Neutrals** (the bulk — stone/gray/slate all map the same way):

```
bg-white, bg-stone-50, bg-slate-50/<n>        → bg-card   (card surfaces)
bg-stone-100/200, bg-gray-50/100/200          → bg-muted  (chips, grouping boxes, secondary buttons)
hover:bg-stone-200, hover:bg-gray-100/200     → hover:bg-accent
text-stone-700/800/900, text-gray-700/800/900, text-slate-700/900 → text-foreground
text-stone-400/500/600, text-gray-400/500/600, text-slate-400/500 → text-muted-foreground
border-{stone,gray,slate}-{100,200,300} (and /60 tints)           → border-border
inputs' borders                                → border-input
page-canvas tints (bg-slate-50/50)             → bg-background
dark text hex (#1f2937 #292524 #2d3436 #374151) → text-foreground / var(--foreground)
grey hex (#636e72 #94a3b8 #a8a29e #6b7280)      → muted-foreground (text) or border (lines)
```

**Status & intent** (preserve meaning; tinted bgs at `/20`, destructive at `/15`):

```
emerald/green (active, paid, positive, up)  → status-success
amber + orange (pending, paused, warning)   → status-warning
red + rose (error, overdue, cancelled, down)→ destructive
blue (info, provisioning, in-progress)      → status-progress
violet/indigo (brand fills, CTAs, hovers)   → primary (bg-primary/10 tints, ring-primary/30)
teal on clickable links/actions             → text-primary (it marks interactivity, not success)
categorical tints (avatars, tags)           → chart-1..5 (+ text-primary-foreground on saturated fills)
chart data series (local constants)         → chart-1..8 by appearance order; neutral/inactive series → chart-7/8
chart axes/gridlines → border ; axis/legend labels → muted-foreground
```

Gradients: replace decorative light gradients (`from-violet-50 to-indigo-50`) with `bg-card`, or brand-tint via `from-primary/15 to-primary/5` if a gradient must stay. Pair every `bg-X` with its `text-X-foreground`.

**Hand-rolled `dark:` pairs** (e.g. expense-report): some editors already pair light+dark classes (`bg-white dark:bg-gray-800`). Collapse each pair into ONE semantic token and **delete the `dark:` counterpart** — leaving it re-breaks dark mode. `bg-white dark:bg-gray-800`→`bg-card`, `bg-gray-50 dark:bg-gray-900`→`bg-background`, `text-gray-900 dark:text-white`→`text-foreground`, `border-gray-200 dark:border-gray-700`→`border-border`, `divide-*` pairs→`divide-border`, status pairs likewise (`text-red-600 dark:text-red-400`→`text-destructive`).

**⚠️ Exclude PDF / print templates.** `@react-pdf/renderer` documents (e.g. `ExpenseReportPDF.tsx`) and print stylesheets render to a white-paper artifact, NOT the themed UI — their hex colors are intentional. Don't tokenize them; `var()` doesn't exist in react-pdf's `StyleSheet` anyway. Also skip `background: white` checks there. (Greps for `: white;` matter elsewhere — `white` literals don't show up in hex-only inventories; DebtLedgerPanel hid 3 this way.)

## ⚠️ Recipe A½ — the SVG `var()` trap (charts, gauges, hand-rolled SVG)

**CSS `var()` does not resolve in SVG presentation attributes.** `fill="var(--muted-foreground)"` or `stroke={seg.color}` (where the constant is now `"var(--chart-1)"`) renders black/invisible. Workflow agents reliably make this mistake — audit after any sweep:

```bash
grep -rnoE '(fill|stroke|stopColor)="var\(' <dir> --include=*.tsx        # static — must be zero
grep -nE 'fill=\{|stroke=\{' <chart files>                                # dynamic — check the constants they reference
```

Fix: move to inline style, where `var()` resolves — `style={{ fill: "var(--muted-foreground)" }}`, `style={{ stroke: seg.color }}`. `style={{ backgroundColor: item.color }}` on HTML legend swatches is already fine. Note: series colors that arrive via **data props** from another module are not literals in the chart file — trace and tokenize them at the source.

## Recipe A⅝ — inline `<style>` blocks with raw hex (no var palette)

Some editors (subscription-invoice) put a CSS string in `<style>{...}</style>` with hex values directly in rules — no `--var` palette to bridge. Map each hex to its token by Tailwind-palette identity (`#475569`=slate-600→`var(--foreground)`, `#e2e8f0`=slate-200→`var(--border)`, `#b91c1c`=red-700→`var(--destructive)`, pale tints→`color-mix(...)`) with plain string replacement; swap custom `box-shadow` values for `var(--shadow-*)`. "Paper-document" views (invoices) ARE themed like everything else — they're live editors, not print artifacts; only actual `@react-pdf`/print templates keep their colors.

## Recipe A¾ — editor-private CSS palette: bridge the definitions

Some editors (e.g. `resource-instance-editor`) use no Tailwind color classes at all — a big `<style>` block defines a private hex palette (`--ri-slate-50: #f8fafc; …`) consumed by ~90 plain-CSS rules. **Don't touch the usage sites — remap the definitions** to Achra tokens by ROLE in one block: lightest step → `--background` (inset wells), light fills → `--muted`, 200/300 steps → `--border`, 400/500 → `--muted-foreground`, 600+ → `--foreground`; status scales → `--status-*`/`--destructive` with pale `*-50/*-100` steps as `color-mix(in oklab, var(--token) 12–22%, transparent)` (the plain-CSS `/20`); local shadow vars → `var(--shadow-sm/md/lg)`. Then sweep the literal `white` backgrounds (cards → `--card`, dropdowns → `--popover`, inputs → `--background`, text-on-saturated-fills → `--primary-foreground`). Watch for a blue scale doing double duty: semantic info (dots, pills) stays `--status-progress`, but **accent roles** (primary button, focus borders, active selection, links) move to `--primary`/`--ring`.

**React style-object trap: never mix `background` shorthand with `backgroundImage` longhand** in one `style={{...}}` (e.g. image-or-gradient conditionals). React assigns keys in order and an `undefined` shorthand still CLEARS the longhands — the image silently vanishes. Restructure: paint the placeholder with classes (`bg-background border border-border`), keep `style` only for the image branch (`style={url ? { backgroundImage } : undefined}`).

**Sticky table cells need OPAQUE fills.** Translucent tints (`bg-primary/15`) look right statically but scrolled content ghosts through `position: sticky` cells/bands. Mix the tint over an opaque base instead: `bg-[color-mix(in_oklab,var(--primary)_15%,var(--background))]` — and put readable values in `text-foreground`, keeping only labels on the accent color.

## Recipe B — build config (`@source`)

Already set up in `style.css` (editors + `@achra/ui` source scans; safelists). Only touch it if a class you wrote isn't generating and it's not a specificity issue. Directory `@source` into `node_modules` is unreliable under Vite — point at real monorepo paths; safelist `dark:` classes with `@source inline(...)`.

## Recipe C — `@source inline(...)` safelist

For dependency markup whose **`dark:` classes exist but aren't emitted** (node_modules isn't scanned). Only works for classes that literally exist in the dep's source — otherwise Recipe D.

**Also for LAYOUT, not just color.** A node_modules component using arbitrary-value utilities (`w-[68px]`, `gap-x-[14px]`, `text-[12px]`) gets NO sizing at all → collapsed/squished UI that looks like a functional bug (the date-picker's year grid). Safelist the exact strings: `@source inline("{h-[28px],w-[68px],rounded-[4px],…}")`. When a dependency view renders "too small"/jammed, grep its dist for `\[\d+px\]` classes before debugging anything else.

**CSS-stacking bugs masquerade as broken functionality.** The calendar's ‹ › arrows are `position: absolute` with no z-index; the caption row (positioned, later in DOM) painted over them — they LOOKED fine but clicks hit the caption's box in every view. Fix: `z-index` on the buttons ONLY. Do NOT add `position: relative` to their parent to "help" — that re-anchors absolute children to the wrong box and they render misplaced. If a dep's button ignores clicks, `elementFromPoint(rect center)` in the browser tells you who's actually on top.

## Recipe D — global scoped CSS override on stable selectors

For deps hardcoding **plain light classes with no dark variant** (ObjectSetTable, Sidebar — both already done; see `style.css`). Pattern: find a stable hook (BEM class, `data-slot`/`data-selected` attribute, semantic element under a stable container), restyle under `.dark` with plain CSS. Conventions: white overlays (`rgba(255,255,255,0.06)` hover / `0.1` selected/borders) for surfaces, `var(--foreground)`/`var(--muted-foreground)` for text; scope precisely (`:not([data-selected="true"])`) so you don't clobber sibling states; change only colors, never widths/layout. These selectors are global on purpose — they theme every instance, including Connect's own.

**Escalation:** if a two-class descendant selector doesn't visibly win (utilities ride in from multiple compiled stylesheets), use `!important` scoped tightly to the element — that ended the sidebar-caret cascade fight for good. Verify there's no competing `!important` first (`grep '!important' <dep dist css>`).

## Recipe E — themeable widget: color-mode sync + CSS-var bridge

For widgets with their own theming (`@uiw/react-md-editor`): (1) drive `data-color-mode` from Connect's `.dark` class via a `MutationObserver` on `document.documentElement`; (2) remap the widget's own vars to tokens, scoped to a wrapper class, `!important`, targeting the editor root AND preview pane. Map the widget **canvas to `--background`** (it's an input, not a card): `--color-canvas-default: var(--background)`, `canvas-subtle → muted`, `fg → foreground/muted-foreground`, `border → border`, `accent → primary`. Reference: `builder-profile/components/markdown-editor.tsx` + `MarkdownPreview.tsx`.

## Recipe F — specificity & load order

- Beating a Tailwind utility: any two-class descendant selector wins (utilities are `:where()`-wrapped, ≤(0,1,0)); keep overrides **unlayered**.
- **Redefining a token value** (`--card`, `--color-slate-*`) must survive deployed Connect: use **`:root.dark`** (0,2,0), never plain `.dark` (ties at 0,1,0 → load-order lottery).
- Setting properties on elements avoids the token-cascade trap entirely.

## Sidebar group headers (porting the team-admin look)

The document-engineering Sidebar has no native groups. Pattern (see both FolderTrees): inject label `SidebarNode`s with a `className` (`<editor>-sidebar-group-header`), style via a `<style>` block (uppercase, `0.6875rem/600/0.06em`, color `#94a3b8`, `pointer-events: none`, hide `.sidebar__item-caret`), and short-circuit their ids in `onActiveNodeChange`.

## Verification checklist

- [ ] Inventory grep (step 1) returns **zero** on the migrated directory.
- [ ] SVG attribute audit (Recipe A½) returns zero; chart arcs/labels visible in both modes.
- [ ] Toggle Connect **light ↔ dark** on every changed view. Hunt: dark-on-dark text, white hover/selection flashes, light borders, invisible placeholders, cards blending into the canvas, inputs blending into cards.
- [ ] `bun run tsc` and `bun run lint:fix` clean in `packages/op-hub`.
- [ ] **⚠️ FIRST USE of any new utility class needs a build too.** TSX hot-reloads instantly, but a class never used before (`from-primary`, `to-purple`, `dark:[color-scheme:dark]`) doesn't EXIST in the built CSS until `bun run build` — the element renders unstyled (e.g. a "white avatar with white text" where a gradient should be). If a just-added class has no visible effect, build before debugging.
- [ ] **⚠️ `style.css` changes do NOT hot-reload — the browser loads the BUILT `dist/style.css`.** Editor **TSX** changes hot-reload from source, which makes it LOOK like CSS should too — it doesn't. After editing `style.css`: (1) `bun run build` in `packages/op-hub` to regenerate `dist/style.css`, (2) hard-refresh the browser; if the change still doesn't show, restart the studio (`ph vetra`) — it sometimes serves a startup-cached compile. If a global override "mysteriously doesn't apply" while older ones do, check `ls -la dist/style.css` vs `style.css` mtimes and `grep` dist for the new rule FIRST — hours were lost to cascade-theory debugging when the rule simply never reached the browser.
- [ ] To verify what the browser actually has: the page's `/style.css` route is CONNECT's stylesheet (not op-hub's — op-hub's is injected as an inline `<style>`); probe with playwright (`localStorage.setItem('theme','dark')` + reload, then check computed styles on a replica element) rather than trusting `/@fs/` fetches, which serve any file on disk whether or not the page uses it.

## Don'ts

- Don't fix a dependency widget per-instance in editor TSX (one table column, one cell) — fix it once globally (Recipe D).
- Don't re-add per-editor `--card` overrides or input-bg classNames — the globals own those.
- Don't put `var()` in SVG presentation attributes (Recipe A½).
- Don't use `@source inline(...)` for classes that don't exist in the dep's markup (C vs D).
- Don't redefine token values with plain `.dark` (use `:root.dark`), don't introduce raw hex or a second brand color, don't trust workflow agents' self-reported "0 leftovers" without the grep.
