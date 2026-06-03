import { generateMock } from "document-model";
import {
  addContentSection,
  AddContentSectionInputSchema,
  deleteContentSection,
  DeleteContentSectionInputSchema,
  isResourceTemplateDocument,
  reducer,
  reorderContentSections,
  ReorderContentSectionsInputSchema,
  updateContentSection,
  UpdateContentSectionInputSchema,
  utils,
} from "document-models/resource-template/v1";
import { describe, expect, it } from "vitest";

describe("ContentSectionManagementOperations", () => {
  it("should handle addContentSection operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddContentSectionInputSchema());

    const updatedDocument = reducer(document, addContentSection(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_CONTENT_SECTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateContentSection operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateContentSectionInputSchema());

    const updatedDocument = reducer(document, updateContentSection(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_CONTENT_SECTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteContentSection operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteContentSectionInputSchema());

    const updatedDocument = reducer(document, deleteContentSection(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_CONTENT_SECTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reorderContentSections operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReorderContentSectionsInputSchema());

    const updatedDocument = reducer(document, reorderContentSections(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REORDER_CONTENT_SECTIONS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
