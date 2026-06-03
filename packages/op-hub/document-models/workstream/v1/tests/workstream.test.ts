import { generateMock } from "document-model";
import {
  addPaymentRequest,
  AddPaymentRequestInputSchema,
  editClientInfo,
  EditClientInfoInputSchema,
  editWorkstream,
  EditWorkstreamInputSchema,
  isWorkstreamDocument,
  reducer,
  removePaymentRequest,
  RemovePaymentRequestInputSchema,
  setRequestForProposal,
  SetRequestForProposalInputSchema,
  utils,
} from "document-models/workstream/v1";
import { describe, expect, it } from "vitest";

describe("WorkstreamOperations", () => {
  it("should handle editWorkstream operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditWorkstreamInputSchema());

    const updatedDocument = reducer(document, editWorkstream(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_WORKSTREAM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editClientInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditClientInfoInputSchema());

    const updatedDocument = reducer(document, editClientInfo(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_CLIENT_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setRequestForProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetRequestForProposalInputSchema());

    const updatedDocument = reducer(document, setRequestForProposal(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_REQUEST_FOR_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addPaymentRequest operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddPaymentRequestInputSchema());

    const updatedDocument = reducer(document, addPaymentRequest(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PAYMENT_REQUEST",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removePaymentRequest operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemovePaymentRequestInputSchema());

    const updatedDocument = reducer(document, removePaymentRequest(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PAYMENT_REQUEST",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
