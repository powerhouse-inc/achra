import { generateMock } from "document-model";
import {
  connectStripeAccount,
  ConnectStripeAccountInputSchema,
  isPaymentAccountDocument,
  reducer,
  setOperator,
  SetOperatorInputSchema,
  syncStripeAccountStatus,
  SyncStripeAccountStatusInputSchema,
  utils,
} from "document-models/payment-account/v1";
import { describe, expect, it } from "vitest";

describe("StripeOperations", () => {
  it("should handle setOperator operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOperatorInputSchema());

    const updatedDocument = reducer(document, setOperator(input));

    expect(isPaymentAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.operatorId).toBe(
      input.operatorId.trim(),
    );
    expect(updatedDocument.state.global.lastModified).toBe(input.lastModified);
  });

  it("should handle the full onboarding flow (connect then sync)", () => {
    let document = utils.createDocument();

    document = reducer(
      document,
      setOperator({
        operatorId: "operator-phid-1",
        lastModified: "2026-06-10T10:00:00.000Z",
      }),
    );
    document = reducer(
      document,
      connectStripeAccount({
        stripeAccountId: " acct_123 ",
        lastModified: "2026-06-10T10:01:00.000Z",
      }),
    );

    expect(document.operations.global).toHaveLength(2);
    expect(document.operations.global[1].action.type).toBe(
      "CONNECT_STRIPE_ACCOUNT",
    );
    expect(document.operations.global[1].error).toBeUndefined();
    expect(document.state.global.stripeAccountId).toBe("acct_123");
    expect(document.state.global.stripeChargesEnabled).toBe(false);

    document = reducer(
      document,
      syncStripeAccountStatus({
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: true,
        requirementsCurrentlyDue: ["individual.id_number"],
        disabledReason: "requirements.pending_verification",
        lastModified: "2026-06-10T10:02:00.000Z",
      }),
    );

    expect(document.operations.global[2].action.type).toBe(
      "SYNC_STRIPE_ACCOUNT_STATUS",
    );
    expect(document.operations.global[2].error).toBeUndefined();
    expect(document.state.global.stripeDetailsSubmitted).toBe(true);
    expect(document.state.global.stripeRequirementsCurrentlyDue).toStrictEqual([
      "individual.id_number",
    ]);
    expect(document.state.global.stripeRequirementsDisabledReason).toBe(
      "requirements.pending_verification",
    );

    document = reducer(
      document,
      syncStripeAccountStatus({
        chargesEnabled: true,
        payoutsEnabled: true,
        detailsSubmitted: true,
        requirementsCurrentlyDue: [],
        lastModified: "2026-06-10T10:03:00.000Z",
      }),
    );

    expect(document.operations.global[3].error).toBeUndefined();
    expect(document.state.global.stripeChargesEnabled).toBe(true);
    expect(document.state.global.stripePayoutsEnabled).toBe(true);
    expect(document.state.global.stripeRequirementsCurrentlyDue).toStrictEqual(
      [],
    );
    expect(document.state.global.stripeRequirementsDisabledReason).toBeNull();
    expect(document.state.global.lastModified).toBe("2026-06-10T10:03:00.000Z");
  });

  it("should reject an empty operator id", () => {
    const document = utils.createDocument();

    const updatedDocument = reducer(
      document,
      setOperator({
        operatorId: "",
        lastModified: "2026-06-10T10:00:00.000Z",
      }),
    );

    expect(updatedDocument.operations.global[0].error).toBe(
      "Operator id cannot be empty",
    );
    expect(updatedDocument.state.global.operatorId).toBeNull();
  });

  it("should reject a whitespace-only operator id", () => {
    const document = utils.createDocument();

    const updatedDocument = reducer(
      document,
      setOperator({
        operatorId: "   ",
        lastModified: "2026-06-10T10:00:00.000Z",
      }),
    );

    expect(updatedDocument.operations.global[0].error).toBe(
      "Operator id cannot be empty",
    );
    expect(updatedDocument.state.global.operatorId).toBeNull();
  });

  it("should handle connectStripeAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ConnectStripeAccountInputSchema());

    const updatedDocument = reducer(document, connectStripeAccount(input));

    expect(isPaymentAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CONNECT_STRIPE_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
    expect(updatedDocument.state.global.stripeAccountId).toBe(
      input.stripeAccountId.trim(),
    );
  });

  it("should reject an empty stripe account id", () => {
    const document = utils.createDocument();

    const updatedDocument = reducer(
      document,
      connectStripeAccount({
        stripeAccountId: "",
        lastModified: "2026-06-10T10:00:00.000Z",
      }),
    );

    expect(updatedDocument.operations.global[0].error).toBe(
      "Stripe account ID cannot be empty",
    );
    expect(updatedDocument.state.global.stripeAccountId).toBeNull();
  });

  it("should reject a whitespace-only stripe account id", () => {
    const document = utils.createDocument();

    const updatedDocument = reducer(
      document,
      connectStripeAccount({
        stripeAccountId: "   ",
        lastModified: "2026-06-10T10:00:00.000Z",
      }),
    );

    expect(updatedDocument.operations.global[0].error).toBe(
      "Stripe account ID cannot be empty",
    );
    expect(updatedDocument.state.global.stripeAccountId).toBeNull();
  });

  it("should reject connecting a second stripe account", () => {
    let document = utils.createDocument();

    document = reducer(
      document,
      connectStripeAccount({
        stripeAccountId: "acct_123",
        lastModified: "2026-06-10T10:00:00.000Z",
      }),
    );
    document = reducer(
      document,
      connectStripeAccount({
        stripeAccountId: "acct_456",
        lastModified: "2026-06-10T10:01:00.000Z",
      }),
    );

    expect(document.operations.global[1].error).toBe(
      "A Stripe account is already connected",
    );
    expect(document.state.global.stripeAccountId).toBe("acct_123");
  });

  it("should reject syncing status before a stripe account is connected", () => {
    const document = utils.createDocument();
    const input = generateMock(SyncStripeAccountStatusInputSchema());

    const updatedDocument = reducer(document, syncStripeAccountStatus(input));

    expect(updatedDocument.operations.global[0].error).toBe(
      "Cannot sync status: no Stripe account connected",
    );
    expect(updatedDocument.state.global.stripeChargesEnabled).toBe(false);
    expect(updatedDocument.state.global.stripePayoutsEnabled).toBe(false);
    expect(updatedDocument.state.global.stripeDetailsSubmitted).toBe(false);
  });
});
