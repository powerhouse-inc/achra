import type { IReactorClient } from "@powerhousedao/reactor";
import type Stripe from "stripe";
import {
  PaymentAccountNotFoundError,
  syncStripeAccountStatus,
} from "../operations.js";
import { getStripe } from "./stripe-client.js";

export async function handleAccountUpdated(
  client: IReactorClient,
  account: Stripe.Account,
): Promise<void> {
  const documentId = account.metadata?.documentId;
  if (!documentId) {
    console.warn(
      `[stripe] account.updated for ${account.id} has no metadata.documentId — skipping sync`,
    );
    return;
  }

  try {
    await syncStripeAccountStatus(client, {
      documentId,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
      requirementsCurrentlyDue: account.requirements?.currently_due ?? [],
      disabledReason: account.requirements?.disabled_reason ?? null,
    });
  } catch (error) {
    // A missing/deleted document can never succeed — acknowledge the event
    // instead of erroring, or Stripe redelivers it for days. Transient
    // reactor failures still propagate so Stripe retries those.
    if (error instanceof PaymentAccountNotFoundError) {
      console.warn(
        `[stripe] account.updated for ${account.id}: ${error.message} — skipping sync`,
      );
      return;
    }
    throw error;
  }
}

/**
 * Top-level dispatcher. Verifies the signature against the webhook secret
 * and routes the event to the right handler. Throws on verification or
 * handler failure so the GraphQL layer surfaces the error and Stripe
 * retries the delivery.
 */
export async function dispatchStripeWebhookEvent(
  client: IReactorClient,
  rawBody: string,
  stripeSignature: string,
  webhookSecret: string,
): Promise<void> {
  const event = getStripe().webhooks.constructEvent(
    rawBody,
    stripeSignature,
    webhookSecret,
  );

  switch (event.type) {
    case "account.updated":
      await handleAccountUpdated(client, event.data.object);
      break;

    default:
      // Acknowledge unhandled event types so Stripe doesn't retry them.
      break;
  }
}
