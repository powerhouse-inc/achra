import { generateMock } from "document-model";
import {
  addAlternativeProposal,
  AddAlternativeProposalInputSchema,
  editAlternativeProposal,
  EditAlternativeProposalInputSchema,
  editInitialProposal,
  EditInitialProposalInputSchema,
  isWorkstreamDocument,
  reducer,
  removeAlternativeProposal,
  RemoveAlternativeProposalInputSchema,
  utils,
} from "document-models/workstream/v1";
import { describe, expect, it } from "vitest";

describe("ProposalsOperations", () => {
  it("should handle editInitialProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditInitialProposalInputSchema());

    const updatedDocument = reducer(document, editInitialProposal(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_INITIAL_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addAlternativeProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddAlternativeProposalInputSchema());

    const updatedDocument = reducer(document, addAlternativeProposal(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_ALTERNATIVE_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editAlternativeProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditAlternativeProposalInputSchema());

    const updatedDocument = reducer(document, editAlternativeProposal(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_ALTERNATIVE_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeAlternativeProposal operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveAlternativeProposalInputSchema());

    const updatedDocument = reducer(document, removeAlternativeProposal(input));

    expect(isWorkstreamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_ALTERNATIVE_PROPOSAL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
