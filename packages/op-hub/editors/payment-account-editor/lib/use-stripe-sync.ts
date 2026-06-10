import { useState } from "react";
import {
  callStripeMutation,
  SYNC_CONNECT_ACCOUNT_MUTATION,
} from "./stripe-graphql.js";

/**
 * Pulls the latest account status from Stripe via the stripe subgraph, which
 * dispatches `SYNC_STRIPE_ACCOUNT_STATUS` onto the document server-side; the
 * editor state refreshes through drive sync.
 */
export function useStripeSync(accountId: string | null | undefined) {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sync(): Promise<void> {
    if (!accountId) return;
    setChecking(true);
    setError(null);
    try {
      await callStripeMutation(SYNC_CONNECT_ACCOUNT_MUTATION, {
        input: { stripeAccountId: accountId },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Status refresh failed");
    } finally {
      setChecking(false);
    }
  }

  return { sync, checking, error };
}
