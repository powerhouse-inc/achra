# Achra

Achra is the marketplace for global coordination. It connects organizations, builders, and operators to scale networks across borders through structured workflows for governance, proposals, services, and execution.

The product is designed as an operational hub for modern distributed teams, bringing network objectives, contributors, roadmaps, payments, and support services into one connected platform.

## Tech Stack

- Next.js 16 App Router with typed routes, React Compiler, and cache components
- React 19 and TypeScript
- Tailwind CSS 4, shadcn/ui, Radix UI, Lucide icons
- GraphQL + GraphQL Code Generator + TanStack Query
- Storybook 10, Chromatic, MSW, Vitest, and Playwright
- Vercel Analytics and Speed Insights

## Getting Started

This repository uses `pnpm`.

1. Install dependencies:

```bash
pnpm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Start from `.env.example`. The most important variables are:

| Variable                                                | Required    | Purpose                                                       |
| ------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SWITCHBOARD_URL`                           | Yes         | GraphQL endpoint used by the app and GraphQL code generation. |
| `NEXT_PUBLIC_ETH_MAINNET_RPC`                           | Yes         | Ethereum mainnet RPC used for on-chain reads.                 |
| `NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY`                    | Optional    | Enables the whitelist overlay. Defaults to `false`.           |
| `NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED`                  | Optional    | Controls the leave-page guard in service purchase flows.      |
| `NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE` | Optional    | Controls local persistence for service purchase state.        |
| `MAILCHIMP_API_KEY`                                     | Conditional | Required when the whitelist overlay is enabled.               |
| `MAILCHIMP_AUDIENCE_ID`                                 | Conditional | Required when the whitelist overlay is enabled.               |
| `MAILCHIMP_SERVER_LOCATION`                             | Conditional | Required when the whitelist overlay is enabled.               |
| `MAILCHIMP_TAG`                                         | Optional    | Tag applied to Mailchimp whitelist submissions.               |

## Available Scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `pnpm dev`             | Start the Next.js development server.           |
| `pnpm build`           | Build the production app.                       |
| `pnpm start`           | Run the production server.                      |
| `pnpm lint`            | Run ESLint.                                     |
| `pnpm lint:fix`        | Run ESLint and apply auto-fixes.                |
| `pnpm format`          | Format the repository with Prettier.            |
| `pnpm format:check`    | Check formatting without writing changes.       |
| `pnpm codegen`         | Regenerate GraphQL types and React Query hooks. |
| `pnpm storybook`       | Run Storybook locally on port `6006`.           |
| `pnpm build-storybook` | Build the static Storybook site.                |

## Project Structure

Achra follows a module-based architecture. Business and feature code lives in `modules/`, while route definitions live in `app/`.

```text
app/
  (achra)/                    Global platform routes
  network/[slug]/             Network-scoped routes
  api/                        Route handlers

modules/
  shared/                     Shared UI, providers, hooks, utilities, feature flags
  networks/                   Network listing and governance/forum integrations
  builders/                   Builder lists and related UI
  builder-profile/            Builder profile views
  workstream/                 Workstream pages, proposals, and project details
  finances/                   Financial summaries, charts, and statements
  expense-reports/            Expense reporting flows and UI
  roadmap/                    Roadmaps and milestones
  services/                   Services catalog
  service-profile/            Service profile pages
  service-purchase/           Multi-step service purchase flow
  operator-profile/           Operator profile pages
  project/                    Project and deliverable UI
  whitelist/                  Whitelist overlay and related logic
  __generated__/graphql/      Generated GraphQL types and hooks
```

Use `modules/shared/` for code shared across multiple domains or app-level layouts. Domain-specific code should stay within its own module.

## Routing Model

- Global routes live under `app/(achra)`, including the app home at `/`, plus areas such as `/networks`, `/workstreams`, and `/services`.
- Network-specific routes live under `app/network/[slug]` and cover builders, finances, roadmaps, workstreams, and related details.
- The root layout in `app/layout.tsx` wires global providers, theme support, analytics, query state, toaster notifications, footer rendering, and the optional whitelist overlay.

## Data Layer

Achra uses GraphQL as its primary data layer.

- GraphQL operations are colocated in `modules/**/*.graphql` and relevant `tsx` or `ts` files.
- Code generation is configured in `codegen.ts`.
- Generated types and TanStack Query hooks are written to `modules/__generated__/graphql/switchboard-generated.ts`.
- The generated hooks use the custom fetcher at `modules/shared/lib/fetcher.ts`.

Run `pnpm codegen` after adding or changing GraphQL operations.

## Storybook And UI Development

Storybook is configured with `@storybook/nextjs-vite` and scans stories from both `modules/` and `app/`. The project uses:

- MSW for mocked API responses
- Accessibility checks via Storybook addons
- Shared decorators from `modules/shared/lib/decorators`
- Global styles from `app/globals.css`

Launch it locally with:

```bash
pnpm storybook
```

## Notes For Contributors

- Path aliases are configured in `tsconfig.json`: `@/*` points to the repo root and `@/shared/*` points to `modules/shared/*`.
- shadcn/ui components are configured to live under `modules/shared/components`.
- Feature availability can differ by environment. Check `modules/shared/lib/feature-flags` before assuming a section should always render.
