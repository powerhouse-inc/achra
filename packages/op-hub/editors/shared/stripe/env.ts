/**
 * Typed accessor for the Connect studio's vite env (`PH_CONNECT_` prefix).
 * op-hub's tsconfig doesn't include `vite/client` types, so `import.meta`
 * is cast locally here instead of polluting the global ImportMeta type.
 */
export function getStripePublishableKey(): string | undefined {
  const env = (
    import.meta as unknown as {
      env?: Record<string, string | undefined>;
    }
  ).env;
  return env?.PH_CONNECT_STRIPE_PUBLISHABLE_KEY;
}
