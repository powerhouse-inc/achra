---
name: migrate-op-hub-design-system
description: >-
  Migrate a Powerhouse op-hub editor (packages/op-hub/editors/*) to the Achra
  design system. Swap @powerhousedao/document-engineering primitives for
  @achra/ui, replace hardcoded Tailwind palette colors (gray-*, slate-*,
  emerald-*, raw hex) with semantic tokens, and fix light/dark theming for the
  third-party components an editor renders inside Connect (document-engineering
  ObjectSetTable & Sidebar, @uiw/react-md-editor, design-system widgets). Use
  when updating design tokens in an op-hub editor, fixing dark-mode contrast
  (dark-on-dark text, white hover/selection flashes, light borders, near-black
  widget surfaces), or porting an editor's colors to semantic tokens. Captures
  the patterns proven on the builder-profile editor.
---

# Migrate an op-hub editor to the Achra design system

This is the playbook distilled from migrating `packages/op-hub/editors/builder-profile/`. Use it to migrate the remaining op-hub editors. The **reference implementation** is that editor plus `packages/op-hub/style.css` — read both alongside this skill; they are the living source of truth and are heavily commented.

## The mental model (why this is harder than a normal Tailwind app)

An op-hub editor is **not** a standalone app. It is a package rendered **inside Connect**, and that changes the rules:

1. **Two design systems are present at once.** Connect ships `@powerhousedao/design-system` (a slate-based dark theme; dark mode = `.dark` on `<html>`). The migration adds `@achra/design-system` + `@achra/ui` on top. Both define tokens (`--foreground`, `--border`, …). In the local dev build `@achra` loads last (it wins), but **on deployed Connect the load order is NOT guaranteed** — the hosted app can inject its design-system `:root`/`.dark` after our package CSS.
2. **Tailwind v4 does not scan `node_modules`.** Utility classes that only appear in a dependency's source are never generated. And the libs Connect renders (document-engineering, design-system) **hardcode light-mode palette classes** (`text-gray-900`, `hover:bg-gray-100`, `bg-blue-50`, `border-gray-300`) — usually with **no `dark:` variant at all** — so in dark mode they paint dark-on-dark text, white hover/selection flashes, and light borders.
3. **You only own *some* of the markup.** Components you author → fix with semantic tokens. Components a dependency renders → fix with CSS overrides or a CSS-var bridge. The technique depends on who owns the DOM.

Everything below follows from these three facts.

## Per-editor workflow

1. **Read the editor's components.** List the files under `editors/<name>/` (the editor + its `components/`).
2. **Inventory the offenders.** In each file, grep for: raw hex (`#[0-9a-f]{3,8}`), Tailwind palette classes (`(text|bg|border|ring|from|to|via|divide)-(gray|slate|zinc|neutral|stone|emerald|sky|amber|blue|red|green)-[0-9]`), inline `style={{ color/background }}`, and `@powerhousedao/document-engineering` primitive imports (`TextInput`, `Textarea`, `Icon`, native `<select>`).
3. **Classify each offender** with the decision tree below and apply the matching recipe.
4. **Add `@achra/ui` if you used it** — `pnpm add -D @achra/ui@workspace:*` in `packages/op-hub` (it's a bundled devDep; see the op-hub publishing model). Confirm `style.css` already `@source`s `../ui/src/**/*` (it does).
5. **Verify in both themes** (see checklist). Toggle Connect's theme; don't trust one mode.
6. **Run `bun run tsc` and `bun run lint:fix`** in `packages/op-hub` (use bun, not npm). CSS isn't typechecked — visual verification is the real gate.

## Decision tree — pick the technique by who owns the markup

```
Is the element rendered by markup YOU author in the editor?
├─ YES → Recipe A: semantic tokens + @achra/ui components.
└─ NO (a dependency renders it):
   ├─ Does the dep's source contain `dark:` classes you just aren't generating?
   │     → Recipe C: @source inline(...) safelist (force-emit those dark: utilities).
   ├─ Does the dep hardcode PLAIN light classes with NO dark: variant?
   │     → Recipe D: global scoped `.dark <stable-selector>` CSS override.
   └─ Is the dep a themeable WIDGET (its own CSS vars + a color-mode prop)?
         → Recipe E: MutationObserver color-mode sync + remap its CSS vars to tokens.

Plus Recipe B (build config / @source) is a prerequisite whenever Recipe A's
utilities or @achra/ui's utilities aren't generating.
```

> **Key distinction (C vs D):** `@source inline(...)` can only force-emit classes that **literally exist** in the dependency's markup. If the dep wrote `dark:text-gray-50`, inline can generate it. If the dep only wrote `text-gray-900` (no dark variant), inline is useless — you must override the rendered element directly (Recipe D). The ObjectSetTable is the canonical Recipe-D case; the Sidebar mixes both.

---

## Recipe A — markup you author: semantic tokens + @achra/ui

Swap document-engineering primitives for `@achra/ui`, and replace every palette color with a semantic token.

**Component swaps** (proven in builder-profile):

| document-engineering | → @achra/ui | notes |
| --- | --- | --- |
| `TextInput` | `Input` (`@achra/ui/input`) | inside a card, add `bg-background` so the field reads as inset |
| `Textarea` | `Textarea` (`@achra/ui/textarea`) | |
| native `<select>` + custom arrow SVG/CSS | `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem` (`@achra/ui/select`) | deletes the hand-rolled dropdown chevron and `appearance-none` hacks |
| `Icon name="X"` | `lucide-react` (`X`, `Image as ImageIcon`, …) | |

Import shadcn primitives as `@achra/ui/<name>` (e.g. `@achra/ui/input`), the `cn` helper as `@achra/ui/lib/utils`.

**Token replacements** — never hardcode; map to the role (full catalog in `DESIGN.md` §9.1):

```
text-slate-600 / #475569 / #1e293b   → text-foreground
muted captions                        → text-muted-foreground
bg-white / surfaces                   → bg-background  (cards: bg-card)
borders (#ddd, gray-300)              → border-border / border-input
focus rings                           → focus-visible:ring-ring focus-visible:ring-[3px]
links / accents (#4f46e5)            → text-primary / bg-primary
secondary fills                       → bg-secondary text-secondary-foreground
hover fills                           → hover:bg-accent
```

**Categorical / status colors** map to the Achra status + custom scale, not raw palette:

```
bg-emerald-500 (success/active)   → bg-status-success
bg-amber-500   (pending/on-hold)  → bg-status-warning
bg-sky-500     (in-progress)      → bg-status-progress
bg-slate-400   (inactive/neutral) → bg-muted-foreground  (faded: bg-muted-foreground/60)
```

Rule: **pair every `bg-X` with its `text-X-foreground`** so contrast holds in dark mode. The editor must include `<DocumentToolbar />` from `@powerhousedao/design-system/connect` at the top (project requirement).

---

## Recipe B — build config so utilities actually generate

Lives at the top of `packages/op-hub/style.css`. You rarely change this, but understand it:

- `@source "./editors/**/*.{ts,tsx}";` — scans op-hub's own editor source so your `bg-*`/`text-*` utilities are emitted (Tailwind v4 doesn't reliably auto-detect a package's source across op-hub's build roots).
- `@source "../ui/src/**/*.{ts,tsx}";` — scans the **workspace** `@achra/ui` source (its real monorepo path, **not** `node_modules` — directory `@source` into node_modules is unreliable under Vite) so shadcn primitives' utilities (`bg-popover`, `border-input`, `ring-ring`, …) generate.
- Import order matters: `@achra/design-system` is imported **last** so it wins locally — but see Recipe F for why value overrides still need `:root.dark`.

If a class you wrote isn't applying and it's not a specificity issue, it's almost always a missing `@source`.

---

## Recipe C — `@source inline(...)` safelist for a dep's dark: classes

When a dependency's markup **contains `dark:` variants** that Tailwind isn't emitting (because it's in node_modules), force-emit them. This is the v4 safelist. Example already in `style.css` for the document-engineering Sidebar / design-system FileItem:

```css
@source inline("{dark:text-gray-{50,200,300,400,500,700,900},dark:text-slate-{...}}");
@source inline("{dark:bg-gray-{600,800,900},dark:bg-slate-{...}}");
```

Add the specific `dark:` classes the new editor's deps reference. **Only works if the class exists in the dep's source** — otherwise use Recipe D.

---

## Recipe D — global scoped `.dark` override on stable selectors

For deps that hardcode **plain light classes with no dark variant** (the ObjectSetTable, parts of the Sidebar). You can't generate a dark variant that doesn't exist, so restyle the **rendered element** directly with plain CSS, scoped under `.dark`, hung off a **stable selector** the library guarantees.

**Find a stable hook** (in this priority): a BEM class (`.sidebar__item`), a `data-*` attribute (`[data-slot="input"]`, `[data-selected="true"]`), or a semantic element under a stable container class (`.object-set-table tbody tr`). Avoid generated/hashed classes.

**The ObjectSetTable block** (the reference Recipe-D fix; full version in `style.css`):

```css
/* Body text → semantic foreground; descendant cell colors still win. */
.dark .object-set-table tbody { color: var(--foreground); }
/* Row hover → subtle lift instead of bg-gray-100's white flash. */
.dark .object-set-table tbody tr:hover { background-color: rgba(255,255,255,0.06); }
/* Selected row → stronger lift, replacing light bg-blue-50/-100. */
.dark .object-set-table tbody tr[data-selected="true"],
.dark .object-set-table tbody tr[data-selected="true"]:hover { background-color: rgba(255,255,255,0.1); }
/* Grid lines → faint hairlines; :not([data-selected]) preserves blue selection edges. */
.dark :has(> table.object-set-table),
.dark .object-set-table thead tr,
.dark .object-set-table tbody tr:not([data-selected="true"]),
.dark .object-set-table tbody td:first-child { border-color: rgba(255,255,255,0.1); }
```

**Form-control text** uses the same idea, keyed on the `data-slot` attrs `@achra/ui` stamps — shadcn inherits its text color, which resolves to a dark value inside Connect's dark host, so pin it:

```css
[data-slot="input"], [data-slot="textarea"],
[data-slot="select-trigger"]:not([data-placeholder]) { color: var(--foreground); }
```

**Conventions for these overrides:**
- For dark backgrounds/borders prefer **explicit white overlays** (`rgba(255,255,255,0.06)` hover, `0.1` selected/borders) — they're value-explicit, so the cross-design-system token-cascade can't break them, and they match the sidebar/card overlays already in the file. Use `var(--foreground)`/`var(--muted-foreground)` for **text** (proven to resolve here).
- **Scope precisely** so you don't clobber sibling states — e.g. `:not([data-selected="true"])` to leave selection-edge borders alone. Only change `border-color`/`background-color`, never `border-width`/`style`.
- These selectors are **global on purpose** — they theme every instance of that widget on the page (the editor's + Connect's), which is desired.

---

## Recipe E — themeable widget: color-mode sync + CSS-var bridge

For a third-party widget that has **its own theming system** (a `data-color-mode` prop and internal CSS vars) — e.g. `@uiw/react-md-editor` / `react-markdown-preview`. Two moves:

**1. Drive the widget's color-mode from Connect's `.dark` class** with a `MutationObserver`:

```tsx
const [isDark, setIsDark] = useState(false);
useEffect(() => {
  const root = document.documentElement;
  const sync = () => setIsDark(root.classList.contains("dark"));
  sync();
  const observer = new MutationObserver(sync);
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}, []);
// …
<div data-color-mode={isDark ? "dark" : "light"} className="op-md-editor">
```

**2. Remap the widget's own CSS vars to Achra tokens**, scoped to a wrapper class so it can't bleed into other widgets. The `@uiw` editor uses GitHub-style vars:

```css
.op-md-editor .w-md-editor, .op-md-editor .wmde-markdown {
  --color-canvas-default: var(--card) !important;
  --color-fg-default: var(--foreground) !important;
  --color-border-default: var(--border) !important;
  --color-accent-fg: var(--primary) !important;
  /* …canvas-subtle→muted, fg-muted→muted-foreground, etc. */
}
```

Why `!important` + targeting both the root **and** the preview pane: the widget sets its dark vars via `[data-color-mode*=dark] .wmde-markdown-var` (specificity 0,2,0) and the live-preview pane holds its own copy of the var. Remap only **chrome** vars; leave the `prettylights` syntax-highlight colors following `data-color-mode`. For the lighter-weight preview renderer, force its surface `transparent` and set `color: var(--foreground)` so it blends with the surrounding card.

> The `@uiw/react-md-editor` CSS must be bundled into op-hub's `dist/style.css` (it's `@import`ed in `style.css`) because the library's lazy-loaded CSS chunk isn't served in deployed Connect.

---

## Recipe F — specificity & load-order rules (so fixes survive deployed Connect)

- **Beating a Tailwind utility:** Tailwind v4 wraps utilities in `:where()`, so a utility is ≤ (0,1,0). Any **two-class** descendant selector (`.dark .object-set-table tbody` = (0,2,1)) wins regardless of import/generation order. This is why Recipe D is robust.
- **Redefining a token *value*** (e.g. retinting the dark palette) is different: a plain `.dark { --x }` ties with the design-system's `.dark`/`:root` and comes down to **load order**, which isn't guaranteed on deployed Connect. Use **`:root.dark`** (0,2,0) instead — `.dark` lives on `<html>` which is `:root`, so it out-specifies and wins everywhere. See the `:root.dark { --color-slate-* }` palette retint in `style.css`.
- **Setting a property on an element** (Recipe D) avoids the value-redefinition trap entirely — you're not redefining a token, just out-specifying a utility.
- Keep these overrides **unlayered** (outside `@layer`) so they beat Connect's prebuilt element rules.

---

## Verification checklist

- [ ] Toggle Connect **light ↔ dark** and inspect every changed surface. The bug class is mode-specific.
- [ ] Dark-mode hunt list: dark-on-dark text, **white hover/selection flashes**, light/gray borders on dark, near-black widget surfaces, invisible placeholder text.
- [ ] Light mode unchanged (these fixes should be dark-scoped; don't regress light).
- [ ] `bun run tsc` and `bun run lint:fix` clean in `packages/op-hub`.
- [ ] Dev (`ph-cli connect` / `ph vetra`) serves the **source** `style.css` via the package's `development` export condition → Vite **HMR** picks up CSS edits live. `ph-cli build` regenerates `dist/style.css` for deployed/published Connect, so a source fix carries through automatically — no manual dist edit.

## Don'ts

- Don't fix a dependency-rendered widget per-instance in the editor TSX (e.g. adding `text-foreground` to one table column). It only patches one spot, misses sibling columns/chrome, and doesn't scale — fix it once globally (Recipe D).
- Don't use `@source inline(...)` for classes that don't exist in the dep's markup (Recipe C vs D).
- Don't introduce a second brand color or raw hex; route saturation through `--primary`, the `--status-*` scale, or the categorical tokens.
- Don't redefine a token value with plain `.dark` when it must survive deployed Connect — use `:root.dark`.
