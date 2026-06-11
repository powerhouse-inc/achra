/**
 * GraphQL client for the stripe subgraph (served at /graphql/stripe).
 * Unlike the shared graphql-client, errors are thrown rather than
 * swallowed so the editor can surface them to the operator.
 */
import { getSubgraphUrl } from "../graphql.js";

export const CREATE_CONNECT_ACCOUNT_MUTATION = /* GraphQL */ `
  mutation CreateConnectAccount($input: Stripe_CreateConnectAccountInput!) {
    Stripe_createConnectAccount(input: $input) {
      stripeAccountId
    }
  }
`;

export const CREATE_CONNECT_ACCOUNT_SESSION_MUTATION = /* GraphQL */ `
  mutation CreateConnectAccountSession(
    $input: Stripe_CreateConnectAccountSessionInput!
  ) {
    Stripe_createConnectAccountSession(input: $input) {
      clientSecret
      disabledComponents
    }
  }
`;

export const SYNC_CONNECT_ACCOUNT_MUTATION = /* GraphQL */ `
  mutation SyncConnectAccount($input: Stripe_SyncConnectAccountInput!) {
    Stripe_syncConnectAccount(input: $input) {
      chargesEnabled
      payoutsEnabled
      detailsSubmitted
      requirementsCurrentlyDue
      disabledReason
    }
  }
`;

type GraphQLError = { message: string };

export async function callStripeMutation<TData>(
  query: string,
  variables: Record<string, unknown>,
): Promise<TData> {
  const response = await fetch(getSubgraphUrl("stripe"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  let body: { data?: TData; errors?: GraphQLError[] };
  try {
    body = (await response.json()) as {
      data?: TData;
      errors?: GraphQLError[];
    };
  } catch {
    // Non-JSON response (proxy error page, reactor down) — report the HTTP
    // status instead of a confusing JSON parse error.
    throw new Error(`Switchboard HTTP ${response.status}`);
  }
  if (body.errors?.length) {
    throw new Error(body.errors.map((e) => e.message).join("; "));
  }
  if (!response.ok || !body.data) {
    throw new Error(`Switchboard HTTP ${response.status}`);
  }
  return body.data;
}
