import type { IReactorClient } from "@powerhousedao/reactor";
import type { PaymentAccountState } from "document-models/payment-account";
import { actions } from "document-models/payment-account";

export const PAYMENT_ACCOUNT_TYPE = "powerhouse/payment-account";

/**
 * Permanent lookup failure — the document doesn't exist or isn't a
 * payment-account. Lets callers distinguish "will never succeed" from
 * transient reactor errors (which should propagate so Stripe retries).
 */
export class PaymentAccountNotFoundError extends Error {}

/**
 * Loads a payment-account document's global state, throwing
 * {@link PaymentAccountNotFoundError} for permanent failures.
 */
export async function getPaymentAccountState(
  client: IReactorClient,
  documentId: string,
): Promise<PaymentAccountState> {
  let doc: Awaited<ReturnType<IReactorClient["get"]>>;
  try {
    doc = await client.get(documentId);
  } catch (error) {
    // The reactor reports missing documents as "Document not found: <id>".
    if (error instanceof Error && /not found/i.test(error.message)) {
      throw new PaymentAccountNotFoundError(
        `Payment account ${documentId} not found`,
      );
    }
    throw error;
  }
  if (doc.header.documentType !== PAYMENT_ACCOUNT_TYPE) {
    throw new PaymentAccountNotFoundError(
      `Payment account ${documentId} not found`,
    );
  }
  return (doc.state as unknown as { global: PaymentAccountState }).global;
}

export interface SyncStripeAccountStatusInput {
  documentId: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  requirementsCurrentlyDue: string[];
  disabledReason: string | null;
}

/**
 * Dispatches `SYNC_STRIPE_ACCOUNT_STATUS` onto the given payment-account doc
 * so the editor reflects onboarding progress and charge capability.
 */
export async function syncStripeAccountStatus(
  client: IReactorClient,
  input: SyncStripeAccountStatusInput,
): Promise<void> {
  const { documentId, ...status } = input;
  await getPaymentAccountState(client, documentId);
  const job = await client.executeAsync(documentId, "main", [
    actions.syncStripeAccountStatus({
      ...status,
      lastModified: new Date().toISOString(),
    }),
  ]);
  await client.waitForJob(job);
}
