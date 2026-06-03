import { generateMock } from "document-model";
import {
  isPaymentTermsDocument,
  reducer,
  setBasicTerms,
  SetBasicTermsInputSchema,
  setCostAndMaterials,
  SetCostAndMaterialsInputSchema,
  setEscrowDetails,
  SetEscrowDetailsInputSchema,
  setEvaluationTerms,
  SetEvaluationTermsInputSchema,
  setRetainerDetails,
  SetRetainerDetailsInputSchema,
  updateStatus,
  UpdateStatusInputSchema,
  utils,
} from "document-models/payment-terms/v1";
import { describe, expect, it } from "vitest";

describe("TermsOperations", () => {
  it("should handle setBasicTerms operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetBasicTermsInputSchema());

    const updatedDocument = reducer(document, setBasicTerms(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_BASIC_TERMS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateStatusInputSchema());

    const updatedDocument = reducer(document, updateStatus(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setCostAndMaterials operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetCostAndMaterialsInputSchema());

    const updatedDocument = reducer(document, setCostAndMaterials(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_COST_AND_MATERIALS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setEscrowDetails operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetEscrowDetailsInputSchema());

    const updatedDocument = reducer(document, setEscrowDetails(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_ESCROW_DETAILS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setEvaluationTerms operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetEvaluationTermsInputSchema());

    const updatedDocument = reducer(document, setEvaluationTerms(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_EVALUATION_TERMS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setRetainerDetails operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetRetainerDetailsInputSchema());

    const updatedDocument = reducer(document, setRetainerDetails(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_RETAINER_DETAILS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
