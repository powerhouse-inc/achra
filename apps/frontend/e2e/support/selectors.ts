/**
 * Centralized data-testid constants. Add an entry here ONLY when role-based
 * selection is genuinely ambiguous — e.g. two identical "Continue" buttons in
 * a stepper, or a chart canvas where the role is `img`. Each addition must
 * be paired with a `data-testid` on the rendered element in the source code,
 * justified in the PR commit body.
 *
 * Imported by POMs as: `import { TID } from '@/../e2e/support/selectors'`.
 */
export const TID = {
  // Reserved for future use. Empty in v1.
} as const

export type TestId = (typeof TID)[keyof typeof TID]
