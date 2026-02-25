# Service Purchase Step System

This document describes the requirements, architecture, and behavior of the step-based service purchase flow used in the Achra platform.

## Overview

The service purchase flow is a multi-step wizard that guides users through selecting and configuring a service. The flow is implemented as a tabbed interface with URL-synced state, enabling deep linking and browser navigation (back/forward).

---

## Step Definitions

| Step | Value (URL)          | Label              | Description                                   |
| ---- | -------------------- | ------------------ | --------------------------------------------- |
| 1    | `product-info`       | Product Info       | Initial product overview and description      |
| 2    | `select-operator`    | Select Operator    | Choose an operator for the service            |
| 3    | `configure-services` | Configure Services | Configure tiers, billing, facets, and add-ons |
| 4    | `summary`            | Summary            | Review selection and submit request form      |
| 5    | `confirmation`       | Confirmation       | Post-submission confirmation screen           |

**Source:** `modules/service-purchase/types.ts` (enum), `modules/service-purchase/config/constants.ts` (entries)

---

## Architecture

### Component Hierarchy

```
Page (app/(achra)/services/[serviceSlug]/purchase/page.tsx)
└── PageContent
    └── ServicePurchaseStoreProvider (services data + step state)
        └── StepUrlSync (URL ↔ store sync)
            ├── ServiceHeader (navigation buttons)
            └── ServicePurchaseForm (Tabs)
                ├── StepsTriggersList (step tabs UI)
                └── TabsContent (per step)
                    ├── ProductInfo
                    ├── SelectOperatorStep
                    ├── ConfigureServices
                    ├── SummaryStep
                    └── ConfirmationStep
```

### Key Files

| File                                                                                | Responsibility                                                                   |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `stores/slices/step-slice.ts`                                                       | Step state and actions; `applyStepTransition` helper for shared transition logic |
| `components/step-url-sync/step-url-sync.tsx`                                        | Bidirectional URL ↔ store sync                                                  |
| `providers/service-purchase-store-provider.tsx`                                     | Form/store data (tiers, facets, options), `useServicePurchaseStep` hook          |
| `components/service-purchase-form/service-purchase-form.tsx`                        | Tab container, step content routing                                              |
| `components/service-purchase-form/components/steps-trigger/steps-triggers-list.tsx` | Step tab triggers UI                                                             |
| `components/service-header/service-header.tsx`                                      | Back, Continue buttons                                                           |

---

## URL State

The step system uses [nuqs](https://nuqs.47ng.com/) for type-safe URL query state.

### Query Parameters

| Parameter    | Type                                                                                       | Default        | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------ |
| `step`       | `product-info` \| `select-operator` \| `configure-services` \| `summary` \| `confirmation` | `product-info` | Current step                                                                               |
| `operatorId` | `string`                                                                                   | `''`           | Pre-selected operator (e.g. from external link); triggers navigation to Configure Services |

### Example URLs

- `/services/my-service/purchase` → step defaults to `product-info`
- `/services/my-service/purchase?step=configure-services` → opens Configure Services
- `/services/my-service/purchase?operatorId=op-123` → syncs operator and navigates to Configure Services

### Implementation

Step state lives in the Zustand store. `StepUrlSync` keeps the URL and store in sync:

- **Store → URL:** When `activeStep` changes (user navigation or hydration), the URL is updated.
- **URL → Store:** When the URL changes (browser back, direct link), the store is updated.
- **Restoration:** When the URL has no `step` param, the persisted `activeStep` from localStorage is pushed to the URL.

---

## Step State

### Store Values and Hook API

| Property                  | Type                  | Description                                           |
| ------------------------- | --------------------- | ----------------------------------------------------- |
| `activeStep`              | `ServicePurchaseStep` | Current step (synced with URL)                        |
| `hasVisitedStep`          | `(step) => boolean`   | O(1) check if a step has been visited                 |
| `isStepDisabled`          | `(step) => boolean`   | O(1) check if a step is disabled                      |
| `goToStep`                | `(step) => void`      | Navigate to a step (updates store, then URL via sync) |
| `goBack`                  | `() => void`          | Go to previous step                                   |
| `resetPostConfigureSteps` | `() => void`          | Disable Summary and Confirmation, remove from visited |

The store internally maintains `visitedSteps` and `disabledSteps`; these are exposed via `hasVisitedStep` and `isStepDisabled` only.

### Initial State

- **activeStep:** `product-info` (from URL, persisted state, or default)
- **visitedSteps:** All steps up to and including `activeStep`
- **disabledSteps:** `[summary, confirmation]` — these are unlocked only when reached via the flow

### Persistence

When `ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE` is enabled, `activeStep`, `visitedSteps`, and `disabledSteps` are persisted in localStorage (keyed by service). On load:

- **URL has `?step=`:** URL takes precedence; store is updated.
- **URL has no step:** Persisted state is restored; URL is updated to match.

---

## Enabling and Disabling Steps

### How Steps Get Enabled

1. **Product Info, Select Operator, Configure Services** — Always enabled (never in `disabledSteps`).
2. **Summary** — Enabled when the user clicks "Continue" on the Configure Services step. That action calls `goToStep(ServicePurchaseStep.Summary)`, which removes `summary` from `disabledSteps`.
3. **Confirmation** — Enabled when the Summary form is submitted successfully. The `SubmitRequestForm` effect calls `goToStep(ServicePurchaseStep.Confirmation)` on success, which removes `confirmation` from `disabledSteps`.

### How Steps Get Disabled

- **Summary** and **Confirmation** are re-disabled via `resetPostConfigureSteps()` when:
  - The user has previously visited Summary or Confirmation, and
  - The user selects a different operator on the Select Operator step.

This keeps the flow consistent when the operator (and thus configuration) changes.

### `goToStep` Behavior

When `goToStep(step)` is called:

1. Updates `activeStep` (and URL) if different from current.
2. Adds the target step and all steps before it to `visitedSteps`.
3. Removes the target step from `disabledSteps` (enables it for future clicks).

---

## Navigation Flows

### Forward Navigation

| From               | To                 | Trigger                     |
| ------------------ | ------------------ | --------------------------- |
| Product Info       | Select Operator    | "Select an operator" button |
| Select Operator    | Configure Services | Selecting an operator card  |
| Configure Services | Summary            | "Continue" button           |
| Summary            | Confirmation       | Successful form submit      |

### Backward Navigation

| Trigger                       | Behavior                                     |
| ----------------------------- | -------------------------------------------- |
| "Back" button (ServiceHeader) | `goBack()` → previous step in order          |
| Step tab click                | `goToStep(step)` (only if step not disabled) |
| Browser back                  | URL changes → StepUrlSync updates store      |

### Special Cases

1. **`operatorId` in URL**  
   If `?operatorId=...` is present (e.g. from another page), the form syncs it and navigates to Configure Services. The param is then cleared.

2. **Operator change after Summary/Confirmation**  
   If the user goes back to Select Operator and picks a different operator, `resetPostConfigureSteps()` is called so Summary and Confirmation are disabled again.

3. **Tab navigation**  
   If no operator is selected and the user switches tabs, the default operator is set before navigating.

---

## UI Behavior

### StepsTriggersList

- Renders a tab trigger for each step.
- **Disabled:** Triggers for steps in `disabledSteps` are not clickable.
- **Active:** Current step uses active styling.
- **Visited:** Previously visited steps use a distinct style (e.g. primary/70 border).
- **Separator:** The separator before a step is highlighted when that step has been visited.

### ServiceHeader

- **Product Info:** Shows "Select an operator" button.
- **Other steps:** Shows "Back" button (hidden on Product Info).
- **Configure Services:** Shows "Continue" button to go to Summary.
- **ServiceInfo:** Uses lighter styling when not on Product Info.

---

## Data Dependencies

- **ServicePurchaseStoreProvider** wraps the flow; it supplies services, tiers, facets, option groups, and step state.
- **StepUrlSync** must be inside the store provider; it syncs the URL with the step slice.
- **Resource template** and **operator** are fetched server-side and passed into the page.
- Step state and StepUrlSync are client-only (`'use client'`) because they use `useQueryState` and the store.

---

## Usage

### Consuming the Step State

```ts
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'

function MyComponent() {
  const { activeStep, hasVisitedStep, isStepDisabled, goToStep, goBack, resetPostConfigureSteps } =
    useServicePurchaseStep()

  // Navigate to a step
  goToStep(ServicePurchaseStep.Summary)

  // Navigate sequentially
  goBack()

  // Check step state (O(1))
  if (hasVisitedStep(ServicePurchaseStep.Summary)) {
    /* ... */
  }
  if (isStepDisabled(ServicePurchaseStep.Confirmation)) {
    /* ... */
  }
}
```

### Adding a New Step

1. Add the step to `ServicePurchaseStep` enum in `types.ts`.
2. Add an entry to `SERVICE_PURCHASE_STEPS_ENTRIES` in `config/constants.ts`.
3. Add the step content in `ServicePurchaseForm` (TabsContent).
4. Add an icon in `StepsTriggersList` if needed.
5. If the step should start disabled, include it in the initial `disabledSteps` in `stores/slices/step-slice.ts`.
