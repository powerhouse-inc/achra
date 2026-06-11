import type { IReactorClient } from "@powerhousedao/reactor";
import { getStripe, getWebhookSecret } from "./lib/stripe-client.js";
import { dispatchStripeWebhookEvent } from "./lib/webhook-handlers.js";
import {
  getPaymentAccountState,
  syncStripeAccountStatus,
} from "./operations.js";

type WithInput<T> = { input: T };

type CreateConnectAccountInput = {
  documentId: string;
  operatorId: string | null;
  email: string | null;
  country: string | null;
};

type CreateConnectAccountSessionInput = {
  stripeAccountId: string;
};

type SyncConnectAccountInput = {
  stripeAccountId: string;
};

type ProcessStripeWebhookEventInput = {
  rawBody: string;
  stripeSignature: string;
};

export const buildStripeMutations = (client: IReactorClient) => ({
  Stripe_createConnectAccount: async (
    _parent: unknown,
    args: WithInput<CreateConnectAccountInput>,
  ) => {
    const input = args.input;
    if (!input.documentId.trim()) {
      throw new Error("documentId is required");
    }

    // Validate against the document BEFORE creating anything on Stripe:
    // the doc must exist, be a payment-account, and not already be
    // connected — otherwise repeated or bogus calls mint orphan Stripe
    // connected accounts that nothing references.
    const state = await getPaymentAccountState(client, input.documentId);
    if (state.stripeAccountId) {
      throw new Error(
        `Payment account ${input.documentId} already has a connected Stripe account`,
      );
    }

    const metadata: Record<string, string> = { documentId: input.documentId };
    if (input.operatorId) {
      metadata.operatorId = input.operatorId;
    }

    const account = await getStripe().accounts.create({
      country: input.country ?? "US",
      email: input.email ?? undefined,
      controller: {
        losses: { payments: "stripe" },
        // The platform absorbs Stripe processing fees out of its
        // application fee so operators keep a flat share of every sale.
        fees: { payer: "application" },
        stripe_dashboard: { type: "none" },
        requirement_collection: "stripe",
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata,
    });

    // The caller (the payment-account editor) dispatches
    // connectStripeAccount on the local doc itself so the editor re-renders
    // without waiting for sync. Doing a duplicate server-side dispatch here
    // would race the browser dispatch and the reducer would throw
    // StripeAccountAlreadyConnectedError on whichever op landed second.
    return { stripeAccountId: account.id };
  },

  Stripe_createConnectAccountSession: async (
    _parent: unknown,
    args: WithInput<CreateConnectAccountSessionInput>,
  ) => {
    const input = args.input;
    if (!input.stripeAccountId.trim()) {
      throw new Error("stripeAccountId is required");
    }

    const session = await getStripe().accountSessions.create({
      account: input.stripeAccountId,
      components: {
        account_onboarding: { enabled: true },
        account_management: { enabled: true },
        notification_banner: { enabled: true },
        payments: { enabled: true },
        payment_details: { enabled: true },
        payouts: { enabled: true },
        payouts_list: { enabled: true },
        balances: { enabled: true },
        documents: { enabled: true },
      },
    });

    // Stripe silently drops a requested component to `enabled: false` if the
    // Connect platform hasn't turned it on in the Dashboard (Settings →
    // Connect → Embedded components). The API call succeeds either way, so
    // log a warning when the returned session disagrees with what we asked
    // for — this surfaces "DataLayerDisabledComponent" runtime errors at
    // their source instead of making us hunt them in the browser.
    const requested = [
      "account_onboarding",
      "account_management",
      "notification_banner",
      "payments",
      "payment_details",
      "payouts",
      "payouts_list",
      "balances",
      "documents",
    ] as const;
    const components = session.components as unknown as Record<
      string,
      { enabled?: boolean } | undefined
    >;
    const disabled = requested.filter((key) => !components[key]?.enabled);
    if (disabled.length > 0) {
      console.warn(
        `[stripe] Account Session for ${input.stripeAccountId} returned with ` +
          `components disabled: ${disabled.join(", ")}. Enable them on your ` +
          `Connect platform at https://dashboard.stripe.com/${process.env.STRIPE_LIVE_MODE === "true" ? "" : "test/"}settings/connect/onboarding/embedded-components`,
      );
    }

    return {
      clientSecret: session.client_secret,
      disabledComponents: disabled,
    };
  },

  Stripe_syncConnectAccount: async (
    _parent: unknown,
    args: WithInput<SyncConnectAccountInput>,
  ) => {
    const input = args.input;
    if (!input.stripeAccountId.trim()) {
      throw new Error("stripeAccountId is required");
    }

    const account = await getStripe().accounts.retrieve(input.stripeAccountId);
    const documentId = account.metadata?.documentId;
    if (!documentId) {
      throw new Error(
        `Account ${input.stripeAccountId} has no metadata.documentId`,
      );
    }

    const flags = {
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
      requirementsCurrentlyDue: account.requirements?.currently_due ?? [],
      disabledReason: (account.requirements?.disabled_reason ?? null) as
        | string
        | null,
    };

    await syncStripeAccountStatus(client, { documentId, ...flags });

    return flags;
  },

  Stripe_processStripeWebhookEvent: async (
    _parent: unknown,
    args: WithInput<ProcessStripeWebhookEventInput>,
  ) => {
    const webhookSecret = getWebhookSecret();
    if (!webhookSecret) {
      throw new Error(
        "STRIPE_WEBHOOK_SECRET is not set in the reactor environment (.env)",
      );
    }
    await dispatchStripeWebhookEvent(
      client,
      args.input.rawBody,
      args.input.stripeSignature,
      webhookSecret,
    );
    return true;
  },
});
