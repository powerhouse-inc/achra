import { generateMock } from "document-model";
import {
  isResourceTemplateDocument,
  reducer,
  setRecurringServices,
  SetRecurringServicesInputSchema,
  setSetupServices,
  SetSetupServicesInputSchema,
  utils,
} from "document-models/resource-template/v1";
import { describe, expect, it } from "vitest";

describe("ServiceCategoryManagementOperations", () => {
  it("should handle setSetupServices operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSetupServicesInputSchema());

    const updatedDocument = reducer(document, setSetupServices(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_SETUP_SERVICES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setRecurringServices operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetRecurringServicesInputSchema());

    const updatedDocument = reducer(document, setRecurringServices(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_RECURRING_SERVICES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
