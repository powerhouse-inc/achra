import { useBudgetStatementsQuery } from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Gets the budget statements for a network
 * NOTE: This service is currently not used as the data fetching was moved to the client component
 * using useBudgetStatementsQuery hook directly. Kept for potential future server-side use.
 *
 * @param networkSlug The slug of the network
 *
 * @returns The budget statements or empty array if not found
 */
export async function getBudgetStatements(networkSlug: string) {
  const data = await useBudgetStatementsQuery.fetcher({
    filter: {
      networkSlug,
    },
  })()

  return data.budgetStatements
}
