import { generateMock } from "document-model";
import {
  isNetworkProfileDocument,
  reducer,
  setCategory,
  SetCategoryInputSchema,
  setDescription,
  SetDescriptionInputSchema,
  setDiscord,
  SetDiscordInputSchema,
  setGithub,
  SetGithubInputSchema,
  setIcon,
  SetIconInputSchema,
  setLogo,
  setLogoBig,
  SetLogoBigInputSchema,
  SetLogoInputSchema,
  setProfileName,
  SetProfileNameInputSchema,
  setWebsite,
  SetWebsiteInputSchema,
  setX,
  SetXInputSchema,
  setYoutube,
  SetYoutubeInputSchema,
  utils,
} from "document-models/network-profile/v1";
import { describe, expect, it } from "vitest";

describe("NetworkProfileManagementOperations", () => {
  it("should handle setIcon operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetIconInputSchema());

    const updatedDocument = reducer(document, setIcon(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_ICON");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setLogo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetLogoInputSchema());

    const updatedDocument = reducer(document, setLogo(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_LOGO");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setLogoBig operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetLogoBigInputSchema());

    const updatedDocument = reducer(document, setLogoBig(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_LOGO_BIG",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setWebsite operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetWebsiteInputSchema());

    const updatedDocument = reducer(document, setWebsite(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_WEBSITE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setDescription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetDescriptionInputSchema());

    const updatedDocument = reducer(document, setDescription(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DESCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setCategory operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetCategoryInputSchema());

    const updatedDocument = reducer(document, setCategory(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_CATEGORY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setX operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetXInputSchema());

    const updatedDocument = reducer(document, setX(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_X");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setGithub operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetGithubInputSchema());

    const updatedDocument = reducer(document, setGithub(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_GITHUB");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setDiscord operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetDiscordInputSchema());

    const updatedDocument = reducer(document, setDiscord(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DISCORD",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setYoutube operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetYoutubeInputSchema());

    const updatedDocument = reducer(document, setYoutube(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_YOUTUBE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setProfileName operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetProfileNameInputSchema());

    const updatedDocument = reducer(document, setProfileName(input));

    expect(isNetworkProfileDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROFILE_NAME",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
