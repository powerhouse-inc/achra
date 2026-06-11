import { setSelectedNode } from "@powerhousedao/reactor-browser";
import type { LoadError } from "@stripe/connect-js";
import {
  ConnectAccountManagement,
  ConnectBalances,
  ConnectComponentsProvider,
  ConnectDocuments,
  ConnectNotificationBanner,
  ConnectPayments,
  ConnectPayouts,
} from "@stripe/react-connect-js";
import { usePaymentAccountDocumentsInSelectedDrive } from "document-models/payment-account";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { getStripePublishableKey } from "../../shared/stripe/env.js";
import { getStripeConnectInstance } from "../../shared/stripe/stripe-connect.js";
import { useStripeDisabledComponents } from "../../shared/stripe/use-stripe-disabled-components.js";
import { useStripeThemeSync } from "../../shared/stripe/use-stripe-theme-sync.js";
import { STRIPE_VIEW_IDS, type StripeViewId } from "./FolderTree.js";

const PUBLISHABLE_KEY = getStripePublishableKey();

type EmbedHandlers = {
  onLoaderStart: () => void;
  onLoadError: (loadError: LoadError) => void;
};

/**
 * Wraps a Stripe embedded component with explicit load handling: the iframes
 * render nothing while initializing (and nothing at all when loading fails),
 * so show a skeleton until Stripe starts rendering and an error card with a
 * retry when it doesn't. When the latest account session reports the
 * component as disabled for the platform (`component` is the session
 * component key), say so explicitly — that case produces a blank iframe with
 * no load error.
 */
function StripeEmbed({
  label,
  accountId,
  component,
  clipBottomBorder = false,
  children,
}: {
  label: string;
  accountId: string;
  /** Account-session component key (e.g. "payments", "payouts_list"). */
  component: string;
  /**
   * Stripe's list components draw a stray rule at the very bottom of the
   * iframe (the table's bottom border) that can't be styled away from
   * outside — paint a card-colored strip over it. An overlay (not clipping):
   * overflow/negative-margin tricks break the iframe's auto-sizing and
   * collapse the component.
   */
  clipBottomBorder?: boolean;
  children: (handlers: EmbedHandlers) => ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<LoadError["error"] | null>(null);
  const disabledComponents = useStripeDisabledComponents(accountId);

  if (disabledComponents.includes(component)) {
    return (
      <StripeAlert title={`${label} is not enabled for this platform`}>
        <p>
          Stripe returned the &quot;{component}&quot; embedded component as
          disabled for this account session, so there is nothing to show here.
        </p>
        <p className="mt-2 text-xs">
          Enable it in the Stripe Dashboard → Settings → Connect → Embedded
          components, then reload this page.
        </p>
      </StripeAlert>
    );
  }

  if (error) {
    return (
      <StripeAlert title={`${label} could not be loaded`}>
        <p>{error.message ?? `Stripe returned a "${error.type}" error.`}</p>
        <p className="mt-2 text-xs">
          If this keeps happening, the corresponding embedded component may not
          be enabled for the platform (Stripe Dashboard → Settings → Connect →
          Embedded components).
        </p>
        <button
          type="button"
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
          className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Try again
        </button>
      </StripeAlert>
    );
  }

  // Card container around the embed: the Stripe iframes render edge-to-edge
  // with a background close to the page canvas (especially in dark mode), so
  // give them the same card treatment as the KYC editor's embedded form.
  // Inline style (not arbitrary-value Tailwind classes) for the clip — novel
  // single-use classes don't reliably generate in op-hub's build.
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      {loading && (
        <div className="space-y-3">
          <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      )}
      <div style={{ position: "relative" }}>
        {children({
          onLoaderStart: () => setLoading(false),
          onLoadError: (loadError) => setError(loadError.error),
        })}
        {clipBottomBorder && (
          <div
            aria-hidden
            className="bg-card"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 3,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}

const PANELS: Record<
  StripeViewId,
  { title: string; render: (accountId: string) => ReactNode }
> = {
  "stripe-payments": {
    title: "Payments",
    render: (accountId) => (
      <StripeEmbed
        label="Payments"
        accountId={accountId}
        component="payments"
        clipBottomBorder
      >
        {(handlers) => <ConnectPayments {...handlers} />}
      </StripeEmbed>
    ),
  },
  "stripe-payouts": {
    title: "Payouts & balance",
    render: (accountId) => (
      <div className="space-y-6">
        <StripeEmbed label="Balance" accountId={accountId} component="balances">
          {(handlers) => <ConnectBalances {...handlers} />}
        </StripeEmbed>
        <StripeEmbed
          label="Payout settings"
          accountId={accountId}
          component="payouts"
          clipBottomBorder
        >
          {(handlers) => <ConnectPayouts {...handlers} />}
        </StripeEmbed>
      </div>
    ),
  },
  "stripe-documents": {
    title: "Documents",
    render: (accountId) => (
      <StripeEmbed
        label="Documents"
        accountId={accountId}
        component="documents"
      >
        {(handlers) => <ConnectDocuments {...handlers} />}
      </StripeEmbed>
    ),
  },
  "stripe-account": {
    title: "Account",
    render: (accountId) => (
      <StripeEmbed
        label="Account management"
        accountId={accountId}
        component="account_management"
      >
        {(handlers) => <ConnectAccountManagement {...handlers} />}
      </StripeEmbed>
    ),
  },
};

function StripeViewShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      {children}
    </div>
  );
}

function StripeAlert({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-card-foreground">{title}</p>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

type Props = {
  /** The Stripe view selected in the sidebar. */
  view: StripeViewId;
};

/**
 * The Stripe embedded views of the "Payment documents" sidebar section:
 * payments, payouts & balance, documents and account management.
 * Until KYC is complete each view prompts for verification instead. Panels
 * mount on first visit and then stay mounted but hidden, so the Stripe
 * iframes don't reload when switching sidebar items (same pattern as the
 * payment-account editor's forceMount tabs).
 */
export function StripeViews({ view }: Props) {
  const paymentAccount = usePaymentAccountDocumentsInSelectedDrive()?.at(0);
  const state = paymentAccount?.state.global;
  const accountId = state?.stripeAccountId;
  const kycComplete = Boolean(
    state?.stripeAccountId && state.stripeChargesEnabled,
  );

  // Lazy accumulation: a panel joins the render list on its first visit and
  // never leaves. Mutating during render is safe — adding to a Set is
  // idempotent, so StrictMode double-renders are harmless.
  const visitedViews = useRef(new Set<StripeViewId>());
  visitedViews.current.add(view);

  // Don't initialize Stripe (which fetches an account session) until KYC is
  // complete — pre-KYC every view renders the verification prompt instead.
  const connectInstance = useMemo(() => {
    if (!accountId || !PUBLISHABLE_KEY || !kycComplete) return null;
    return getStripeConnectInstance(accountId, PUBLISHABLE_KEY);
  }, [accountId, kycComplete]);

  useStripeThemeSync();

  if (!PUBLISHABLE_KEY) {
    return (
      <StripeViewShell title={PANELS[view].title}>
        <StripeAlert title="Payments are not configured">
          PH_CONNECT_STRIPE_PUBLISHABLE_KEY is missing from the Connect studio
          environment (.env).
        </StripeAlert>
      </StripeViewShell>
    );
  }

  if (!paymentAccount) {
    return (
      <StripeViewShell title={PANELS[view].title}>
        <StripeAlert title="No payment account in this drive">
          This drive has no payment account document yet, so Stripe data cannot
          be shown.
        </StripeAlert>
      </StripeViewShell>
    );
  }

  if (!accountId || !kycComplete || !connectInstance) {
    return (
      <StripeViewShell title={PANELS[view].title}>
        <StripeAlert title="Complete payment verification first">
          <p>
            {accountId
              ? "Your account verification is still in progress. Finish it to unlock payments, payouts and the other Stripe views."
              : "Payment onboarding has not started yet. Set up your payment account to unlock payments, payouts and the other Stripe views."}
          </p>
          <button
            type="button"
            onClick={() => setSelectedNode(paymentAccount.header.id)}
            className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {accountId ? "Continue verification" : "Start verification"}
          </button>
        </StripeAlert>
      </StripeViewShell>
    );
  }

  return (
    <ConnectComponentsProvider connectInstance={connectInstance}>
      <div className="mx-auto max-w-5xl space-y-4">
        <ConnectNotificationBanner />
        {STRIPE_VIEW_IDS.filter((id) => visitedViews.current.has(id)).map(
          (id) => (
            <div key={id} className={id === view ? "" : "hidden"}>
              <h1 className="mb-4 text-xl font-semibold text-foreground">
                {PANELS[id].title}
              </h1>
              {PANELS[id].render(accountId)}
            </div>
          ),
        )}
      </div>
    </ConnectComponentsProvider>
  );
}
