import { generateMock } from "document-model";
import {
  addContributor,
  AddContributorInputSchema,
  addLink,
  AddLinkInputSchema,
  addScope,
  AddScopeInputSchema,
  addSkill,
  AddSkillInputSchema,
  editLink,
  EditLinkInputSchema,
  isBuilderProfileDocument,
  reducer,
  removeContributor,
  RemoveContributorInputSchema,
  removeLink,
  RemoveLinkInputSchema,
  removeScope,
  RemoveScopeInputSchema,
  removeSkill,
  RemoveSkillInputSchema,
  setOperator,
  SetOperatorInputSchema,
  setOpHubMember,
  SetOpHubMemberInputSchema,
  setWalletAddress,
  SetWalletAddressInputSchema,
  updateProfile,
  UpdateProfileInputSchema,
  utils,
} from "document-models/builder-profile/v1";
import { describe, expect, it } from "vitest";

describe("BuildersOperations", () => {
  it("should handle updateProfile operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateProfileInputSchema());

    const updatedDocument = reducer(document, updateProfile(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PROFILE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addSkill operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSkillInputSchema());

    const updatedDocument = reducer(document, addSkill(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_SKILL");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeSkill operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveSkillInputSchema());

    const updatedDocument = reducer(document, removeSkill(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SKILL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addScope operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddScopeInputSchema());

    const updatedDocument = reducer(document, addScope(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_SCOPE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeScope operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveScopeInputSchema());

    const updatedDocument = reducer(document, removeScope(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SCOPE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addLink operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddLinkInputSchema());

    const updatedDocument = reducer(document, addLink(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_LINK");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editLink operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditLinkInputSchema());

    const updatedDocument = reducer(document, editLink(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_LINK");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeLink operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveLinkInputSchema());

    const updatedDocument = reducer(document, removeLink(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_LINK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addContributor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddContributorInputSchema());

    const updatedDocument = reducer(document, addContributor(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_CONTRIBUTOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeContributor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveContributorInputSchema());

    const updatedDocument = reducer(document, removeContributor(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_CONTRIBUTOR",
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

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOpHubMember operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOpHubMemberInputSchema());

    const updatedDocument = reducer(document, setOpHubMember(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OP_HUB_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setWalletAddress operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetWalletAddressInputSchema());

    const updatedDocument = reducer(document, setWalletAddress(input));

    expect(isBuilderProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_WALLET_ADDRESS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
