import {
  loadConnectAndInitialize,
  type StripeConnectInstance,
} from "@stripe/connect-js";
import { buildStripeAppearance } from "./stripe-appearance.js";
import {
  callStripeMutation,
  CREATE_CONNECT_ACCOUNT_SESSION_MUTATION,
} from "./stripe-graphql.js";

// Module-scoped cache keyed by stripeAccountId. `loadConnectAndInitialize`
// loads the Stripe Connect SDK and creates a registry of embedded iframes
// keyed on the resulting instance — calling it more than once per account
// (e.g. on StrictMode remount or tab switches) creates parallel registries
// that race for the same iframes, producing canceled `ui_layer_*.html`
// requests in DevTools. Caching at module scope survives any number of
// component mount/unmount cycles.
const connectInstanceCache = new Map<string, StripeConnectInstance>();

export function getStripeConnectInstance(
  accountId: string,
  publishableKey: string,
): StripeConnectInstance {
  const cached = connectInstanceCache.get(accountId);
  if (cached) return cached;
  const created = loadConnectAndInitialize({
    publishableKey,
    appearance: buildStripeAppearance(),
    fetchClientSecret: async () => {
      const data = await callStripeMutation<{
        Stripe_createConnectAccountSession: { clientSecret: string };
      }>(CREATE_CONNECT_ACCOUNT_SESSION_MUTATION, {
        input: { stripeAccountId: accountId },
      });
      return data.Stripe_createConnectAccountSession.clientSecret;
    },
  });
  connectInstanceCache.set(accountId, created);
  return created;
}

/**
 * Re-derives the appearance from the design tokens (which flip with the
 * `.dark` class) and pushes it to every live Connect instance. Call when the
 * theme changes so already-loaded embedded forms restyle in place.
 */
export function refreshStripeAppearance(): void {
  if (connectInstanceCache.size === 0) return;
  const appearance = buildStripeAppearance();
  for (const instance of connectInstanceCache.values()) {
    instance.update({ appearance });
  }
}
