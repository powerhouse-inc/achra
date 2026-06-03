import { generateMock } from "document-model";
import {
  addProposal,
  AddProposalInputSchema,
  changeProposalStatus,
  ChangeProposalStatusInputSchema,
  isRequestForProposalsDocument,
  reducer,
  removeProposal,
  RemoveProposalInputSchema,
  utils,
} from "document-models/request-for-proposals/v1";
import { describe, expect, it } from "vitest";

describe("ProposalsOperations", () => {
  it("should handle addProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddProposalInputSchema());

    const updatedDocument = reducer(document, addProposal(input));

    expect(isRequestForProposalsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle changeProposalStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ChangeProposalStatusInputSchema());

    const updatedDocument = reducer(document, changeProposalStatus(input));

    expect(isRequestForProposalsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CHANGE_PROPOSAL_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveProposalInputSchema());

    const updatedDocument = reducer(document, removeProposal(input));

    expect(isRequestForProposalsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
