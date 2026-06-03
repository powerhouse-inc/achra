import { generateMock } from "document-model";
import {
  editRfp,
  EditRfpInputSchema,
  isRequestForProposalsDocument,
  reducer,
  utils,
} from "document-models/request-for-proposals/v1";
import { describe, expect, it } from "vitest";

describe("RfpStateOperations", () => {
  it("should handle editRfp operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditRfpInputSchema());

    const updatedDocument = reducer(document, editRfp(input));

    expect(isRequestForProposalsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_RFP");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
