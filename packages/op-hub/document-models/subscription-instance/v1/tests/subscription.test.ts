import { generateMock } from "document-model";
import {
  activateSubscription,
  ActivateSubscriptionInputSchema,
  cancelSubscription,
  CancelSubscriptionInputSchema,
  changePlan,
  ChangePlanInputSchema,
  generateInvoice,
  GenerateInvoiceInputSchema,
  initializeSubscription,
  InitializeSubscriptionInputSchema,
  isSubscriptionInstanceDocument,
  pauseSubscription,
  PauseSubscriptionInputSchema,
  reducer,
  renewExpiringSubscription,
  RenewExpiringSubscriptionInputSchema,
  resumeSubscription,
  ResumeSubscriptionInputSchema,
  setAutoRenew,
  SetAutoRenewInputSchema,
  setExpiring,
  SetExpiringInputSchema,
  setOperatorNotes,
  SetOperatorNotesInputSchema,
  setResourceDocument,
  SetResourceDocumentInputSchema,
  updateCustomerInfo,
  UpdateCustomerInfoInputSchema,
  updateTierInfo,
  UpdateTierInfoInputSchema,
  utils,
} from "document-models/subscription-instance/v1";
import { describe, expect, it } from "vitest";

describe("SubscriptionOperations", () => {
  it("should handle initializeSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(InitializeSubscriptionInputSchema());

    const updatedDocument = reducer(document, initializeSubscription(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "INITIALIZE_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setResourceDocument operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetResourceDocumentInputSchema());

    const updatedDocument = reducer(document, setResourceDocument(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_RESOURCE_DOCUMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle activateSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ActivateSubscriptionInputSchema());

    const updatedDocument = reducer(document, activateSubscription(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ACTIVATE_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle pauseSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(PauseSubscriptionInputSchema());

    const updatedDocument = reducer(document, pauseSubscription(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "PAUSE_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setExpiring operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetExpiringInputSchema());

    const updatedDocument = reducer(document, setExpiring(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_EXPIRING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle cancelSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(CancelSubscriptionInputSchema());

    const updatedDocument = reducer(document, cancelSubscription(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CANCEL_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle resumeSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ResumeSubscriptionInputSchema());

    const updatedDocument = reducer(document, resumeSubscription(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "RESUME_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle renewExpiringSubscription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RenewExpiringSubscriptionInputSchema());

    const updatedDocument = reducer(document, renewExpiringSubscription(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "RENEW_EXPIRING_SUBSCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateCustomerInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateCustomerInfoInputSchema());

    const updatedDocument = reducer(document, updateCustomerInfo(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_CUSTOMER_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTierInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTierInfoInputSchema());

    const updatedDocument = reducer(document, updateTierInfo(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TIER_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOperatorNotes operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOperatorNotesInputSchema());

    const updatedDocument = reducer(document, setOperatorNotes(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATOR_NOTES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setAutoRenew operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetAutoRenewInputSchema());

    const updatedDocument = reducer(document, setAutoRenew(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_AUTO_RENEW",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle generateInvoice operation", () => {
    const document = utils.createDocument();
    const input = generateMock(GenerateInvoiceInputSchema());

    const updatedDocument = reducer(document, generateInvoice(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "GENERATE_INVOICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle changePlan operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ChangePlanInputSchema());

    const updatedDocument = reducer(document, changePlan(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CHANGE_PLAN",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
