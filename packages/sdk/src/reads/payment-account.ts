import type { ClientContext } from '../context'

/** Stripe KYC state of an operator's payment account (read-only view). */
export interface OperatorPaymentAccount {
  id: string
  operatorId: string | null
  stripeAccountId: string | null
  stripeChargesEnabled: boolean
  stripePayoutsEnabled: boolean
  stripeDetailsSubmitted: boolean
  stripeRequirementsCurrentlyDue: string[]
  stripeRequirementsDisabledReason: string | null
}

const FIND_PAYMENT_ACCOUNTS = /* GraphQL */ `
  query FindPaymentAccounts($parentId: String!) {
    findDocuments(search: { type: "powerhouse/payment-account", parentId: $parentId }) {
      items {
        id
        state
      }
    }
  }
`

interface FindPaymentAccountsResult {
  findDocuments: {
    items: Array<{
      id: string
      state: { global?: Record<string, unknown> }
    }>
  }
}

/**
 * The payment-account document inside an operator's service-offering drive,
 * if any. The drive is provisioned with exactly one (see
 * `createOperatorOfferingDrive`); if duplicates were created manually, the
 * first one is returned — the same one the drive app's Payments section opens.
 */
export async function getOperatorPaymentAccount(
  ctx: ClientContext,
  opts: { driveId: string },
): Promise<OperatorPaymentAccount | null> {
  if (!opts.driveId) return null
  const data = await ctx.graphql<FindPaymentAccountsResult>(FIND_PAYMENT_ACCOUNTS, {
    parentId: opts.driveId,
  })
  const item = data.findDocuments.items[0]
  if (!item) return null
  const global = item.state.global ?? {}
  return {
    id: item.id,
    operatorId: (global.operatorId as string | null | undefined) ?? null,
    stripeAccountId: (global.stripeAccountId as string | null | undefined) ?? null,
    stripeChargesEnabled: Boolean(global.stripeChargesEnabled),
    stripePayoutsEnabled: Boolean(global.stripePayoutsEnabled),
    stripeDetailsSubmitted: Boolean(global.stripeDetailsSubmitted),
    stripeRequirementsCurrentlyDue: (global.stripeRequirementsCurrentlyDue as string[]) ?? [],
    stripeRequirementsDisabledReason:
      (global.stripeRequirementsDisabledReason as string | null | undefined) ?? null,
  }
}
