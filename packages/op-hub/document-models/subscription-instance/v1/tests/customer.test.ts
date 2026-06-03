import { generateMock } from "document-model";
import {
  isSubscriptionInstanceDocument,
  reducer,
  setCustomerType,
  SetCustomerTypeInputSchema,
  updateTeamMemberCount,
  UpdateTeamMemberCountInputSchema,
  utils,
} from "document-models/subscription-instance/v1";
import { describe, expect, it } from "vitest";

describe("CustomerOperations", () => {
  it("should handle setCustomerType operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetCustomerTypeInputSchema());

    const updatedDocument = reducer(document, setCustomerType(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_CUSTOMER_TYPE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTeamMemberCount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTeamMemberCountInputSchema());

    const updatedDocument = reducer(document, updateTeamMemberCount(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TEAM_MEMBER_COUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
