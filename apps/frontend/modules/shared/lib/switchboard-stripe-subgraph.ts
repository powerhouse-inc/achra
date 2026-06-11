import 'server-only'

/**
 * Resolves the stripe subgraph endpoint (`<switchboard>/graphql/stripe`)
 * from NEXT_PUBLIC_SWITCHBOARD_URL (validated as present by the env
 * schema). The URL may or may not include the trailing `/graphql` segment,
 * so it is normalized away first.
 */
function stripeSubgraphUrl(): string {
  const base = process.env.NEXT_PUBLIC_SWITCHBOARD_URL
  const origin = base.replace(/\/$/, '').replace(/\/graphql$/, '')
  return `${origin}/graphql/stripe`
}

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Calls the stripe subgraph on the Switchboard and throws on transport or
 * GraphQL errors so callers (e.g. the webhook forwarder) can surface them.
 */
export async function callStripeSubgraph<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(stripeSubgraphUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  let body: GraphQLResponse<T>
  try {
    body = (await response.json()) as GraphQLResponse<T>
  } catch {
    // Non-JSON response (proxy error page, switchboard down) — report the
    // HTTP status instead of a confusing JSON parse error.
    throw new Error(`Switchboard HTTP ${response.status}`)
  }
  if (body.errors?.length) {
    throw new Error(body.errors.map((e) => e.message).join('; '))
  }
  if (!response.ok || !body.data) {
    throw new Error(`Switchboard HTTP ${response.status}`)
  }
  return body.data
}
