import { generateMock } from "document-model";
import {
  isResourceTemplateDocument,
  reducer,
  setOperator,
  SetOperatorInputSchema,
  setTemplateId,
  SetTemplateIdInputSchema,
  setWeight,
  SetWeightInputSchema,
  updateTemplateInfo,
  UpdateTemplateInfoInputSchema,
  updateTemplateStatus,
  UpdateTemplateStatusInputSchema,
  utils,
} from "document-models/resource-template/v1";
import { describe, expect, it } from "vitest";

describe("TemplateManagementOperations", () => {
  it("should handle updateTemplateInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTemplateInfoInputSchema());

    const updatedDocument = reducer(document, updateTemplateInfo(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TEMPLATE_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTemplateStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTemplateStatusInputSchema());

    const updatedDocument = reducer(document, updateTemplateStatus(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TEMPLATE_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOperator operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOperatorInputSchema());

    const updatedDocument = reducer(document, setOperator(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setTemplateId operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTemplateIdInputSchema());

    const updatedDocument = reducer(document, setTemplateId(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_TEMPLATE_ID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setWeight operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetWeightInputSchema());

    const updatedDocument = reducer(document, setWeight(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_WEIGHT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
