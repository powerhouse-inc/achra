import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
  ConnectNotificationBanner,
} from "@stripe/react-connect-js";
import type { PaymentAccountState } from "document-models/payment-account";
import { useEffect, useMemo } from "react";
import { getStripePublishableKey } from "../env.js";
import {
  getStripeConnectInstance,
  refreshStripeAppearance,
} from "../lib/stripe-connect.js";
import { useStripeSync } from "../lib/use-stripe-sync.js";
import { Alert, SectionCard } from "./ui.js";

const PUBLISHABLE_KEY = getStripePublishableKey();

type Props = {
  state: PaymentAccountState;
};

/**
 * The Stripe embedded verification form. Rendered only while the
 * Verification tab is active, so the Stripe SDK and its iframes are not
 * loaded every time the document opens.
 */
export function VerificationSection({ state }: Props) {
  const accountId = state.stripeAccountId;
  const { sync, checking, error } = useStripeSync(accountId);

  const connectInstance = useMemo(() => {
    if (!accountId || !PUBLISHABLE_KEY) return null;
    return getStripeConnectInstance(accountId, PUBLISHABLE_KEY);
  }, [accountId]);

  // The embedded form's appearance is baked from the design tokens at init;
  // when Connect toggles the `.dark` class on <html>, push the re-derived
  // tokens to the live Stripe instance so the form restyles in place.
  useEffect(() => {
    const root = window.document.documentElement;
    let wasDark = root.classList.contains("dark");
    // The cached instance may carry an appearance from a previous theme
    // (e.g. the theme flipped while this pane was unmounted) — re-sync once.
    refreshStripeAppearance();
    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains("dark");
      if (isDark !== wasDark) {
        wasDark = isDark;
        refreshStripeAppearance();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!PUBLISHABLE_KEY) {
    return (
      <Alert variant="destructive" title="Payment KYC is not configured">
        PH_CONNECT_STRIPE_PUBLISHABLE_KEY is missing from the Connect studio
        environment (.env).
      </Alert>
    );
  }

  if (!accountId || !connectInstance) {
    return (
      <Alert variant="info" title="Onboarding not started">
        Start the payment KYC from the Overview tab first — the verification
        form becomes available right after.
      </Alert>
    );
  }

  return (
    <SectionCard
      title="Verification"
      description="Your information goes directly to Stripe — it is never stored in this document. Progress is saved as you go."
    >
      <ConnectComponentsProvider connectInstance={connectInstance}>
        <div className="space-y-4">
          <ConnectNotificationBanner />

          {state.stripeChargesEnabled && (
            <Alert variant="success" title="Payment KYC complete">
              Payments are enabled — you can review or update your details
              below.
            </Alert>
          )}

          <div className="rounded-lg border border-border bg-card p-4">
            <ConnectAccountOnboarding onExit={() => void sync()} />
          </div>

          {checking && (
            <p className="text-xs text-muted-foreground">
              Refreshing KYC status…
            </p>
          )}

          {error && (
            <Alert variant="destructive" title="Something went wrong">
              {error}
            </Alert>
          )}
        </div>
      </ConnectComponentsProvider>
    </SectionCard>
  );
}
