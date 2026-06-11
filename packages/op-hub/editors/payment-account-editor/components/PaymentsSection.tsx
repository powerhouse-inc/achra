import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  PaymentAccountAction,
  PaymentAccountState,
} from "document-models/payment-account";
import { actions } from "document-models/payment-account";
import { useState } from "react";
import { getStripePublishableKey } from "../../shared/stripe/env.js";
import {
  callStripeMutation,
  CREATE_CONNECT_ACCOUNT_MUTATION,
} from "../../shared/stripe/stripe-graphql.js";
import {
  describeDisabledReason,
  humanizeRequirements,
} from "../lib/stripe-requirements.js";
import { useStripeSync } from "../../shared/stripe/use-stripe-sync.js";
import { Alert, SectionCard, StatusRow } from "./ui.js";

const PUBLISHABLE_KEY = getStripePublishableKey();

type Props = {
  state: PaymentAccountState;
  dispatch: DocumentDispatch<PaymentAccountAction>;
  documentId: string;
  /** Switches the editor to the Verification tab (the embedded Stripe form). */
  onOpenVerification: () => void;
};

/**
 * Overview of the payment KYC: status flags, what Stripe still needs, and
 * the entry points (start onboarding / open the verification form / sync).
 * The embedded Stripe form itself lives in the Verification tab so it is
 * only loaded when the operator goes there.
 */
export function PaymentsSection({
  state,
  dispatch,
  documentId,
  onOpenVerification,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const accountId = state.stripeAccountId;
  const ready = state.stripeChargesEnabled;
  const { sync, checking, error: syncError } = useStripeSync(accountId);
  const error = startError ?? syncError;

  async function handleStartOnboarding() {
    setBusy(true);
    setStartError(null);
    try {
      const data = await callStripeMutation<{
        Stripe_createConnectAccount: { stripeAccountId: string };
      }>(CREATE_CONNECT_ACCOUNT_MUTATION, {
        input: {
          documentId,
          operatorId: state.operatorId,
        },
      });
      dispatch(
        actions.connectStripeAccount({
          stripeAccountId: data.Stripe_createConnectAccount.stripeAccountId,
          lastModified: new Date().toISOString(),
        }),
      );
      onOpenVerification();
    } catch (e) {
      setStartError(
        e instanceof Error ? e.message : "Failed to start onboarding",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <SectionCard
      title="Payment KYC"
      description="Verify your identity and add a payout account with Stripe. This unlocks publishing your service offerings, accepting card payments, and receiving payouts."
    >
      {!PUBLISHABLE_KEY && (
        <Alert variant="destructive" title="Payment KYC is not configured">
          PH_CONNECT_STRIPE_PUBLISHABLE_KEY is missing from the Connect studio
          environment (.env).
        </Alert>
      )}

      {!accountId ? (
        <Alert variant="info" title="Payment KYC not started">
          <div className="flex items-center justify-between gap-4">
            <span>
              It only takes a few minutes — once approved, you can start
              publishing services.
            </span>
            <button
              type="button"
              onClick={() => void handleStartOnboarding()}
              disabled={busy || !PUBLISHABLE_KEY || !state.operatorId}
              className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Starting…" : "Start onboarding"}
            </button>
          </div>
          {!state.operatorId && (
            <p className="mt-2 text-xs">
              Waiting for an operator profile link — onboarding can start once
              this payment account is linked to your profile.
            </p>
          )}
        </Alert>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-accent px-4">
            <StatusRow
              label="Details submitted"
              description="You've completed the verification form and sent it to Stripe."
              ok={state.stripeDetailsSubmitted}
              okLabel="Submitted"
            />
            <StatusRow
              label="Charges enabled"
              description="Customers can purchase your services and pay by card."
              ok={state.stripeChargesEnabled}
            />
            <StatusRow
              label="Payouts enabled"
              description="Your earnings are transferred to your bank account."
              ok={state.stripePayoutsEnabled}
            />
          </div>

          {ready ? (
            <Alert variant="success" title="Payment KYC complete">
              Payments are enabled — you can now publish your service offerings
              and get paid.
            </Alert>
          ) : !state.stripeDetailsSubmitted ? (
            // Before the form is submitted, Stripe reports every field as
            // "due" and flags the account as past due — that's just "not
            // finished yet", so a single pointer to the form is the only
            // message worth showing.
            <Alert variant="info" title="Finish your verification">
              Fill out the verification form — Stripe uses it to confirm your
              identity and set up payouts. Your progress is saved as you go.
            </Alert>
          ) : (
            <>
              {state.stripeRequirementsCurrentlyDue.length > 0 && (
                <Alert
                  variant="warning"
                  title="Stripe needs a bit more information"
                >
                  <ul className="ml-4 mt-1 list-disc">
                    {humanizeRequirements(
                      state.stripeRequirementsCurrentlyDue,
                    ).map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs">
                    You can provide these in the verification form.
                  </p>
                </Alert>
              )}

              {state.stripeRequirementsDisabledReason &&
                (() => {
                  const info = describeDisabledReason(
                    state.stripeRequirementsDisabledReason,
                  );
                  return (
                    <Alert variant={info.variant} title={info.title}>
                      {info.message}
                    </Alert>
                  );
                })()}
            </>
          )}

          <div className="flex justify-end gap-2">
            {!ready && (
              <button
                type="button"
                onClick={onOpenVerification}
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Open verification form
              </button>
            )}
            <button
              type="button"
              onClick={() => void sync()}
              disabled={checking}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              {checking ? "Syncing…" : "Sync status"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <Alert
          variant="destructive"
          title="Something went wrong"
          className="mt-4"
        >
          {error}
        </Alert>
      )}
    </SectionCard>
  );
}
