import { generateMock } from "document-model";
import {
  addSubteam,
  AddSubteamInputSchema,
  isOperationalHubProfileDocument,
  reducer,
  removeSubteam,
  RemoveSubteamInputSchema,
  setOperationalHubName,
  SetOperationalHubNameInputSchema,
  setOperatorTeam,
  SetOperatorTeamInputSchema,
  utils,
} from "document-models/operational-hub-profile/v1";
import { describe, expect, it } from "vitest";

describe("ConfigurationOperations", () => {
  it("should handle setOperationalHubName operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOperationalHubNameInputSchema());

    const updatedDocument = reducer(document, setOperationalHubName(input));

    expect(isOperationalHubProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATIONAL_HUB_NAME",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOperatorTeam operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOperatorTeamInputSchema());

    const updatedDocument = reducer(document, setOperatorTeam(input));

    expect(isOperationalHubProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATOR_TEAM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addSubteam operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSubteamInputSchema());

    const updatedDocument = reducer(document, addSubteam(input));

    expect(isOperationalHubProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SUBTEAM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeSubteam operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveSubteamInputSchema());

    const updatedDocument = reducer(document, removeSubteam(input));

    expect(isOperationalHubProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SUBTEAM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
