/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetCategoryInputSchema,
  SetDescriptionInputSchema,
  SetDiscordInputSchema,
  SetGithubInputSchema,
  SetIconInputSchema,
  SetLogoBigInputSchema,
  SetLogoInputSchema,
  SetProfileNameInputSchema,
  SetWebsiteInputSchema,
  SetXInputSchema,
  SetYoutubeInputSchema,
} from "../schema/zod.js";
import type {
  SetCategoryInput,
  SetDescriptionInput,
  SetDiscordInput,
  SetGithubInput,
  SetIconInput,
  SetLogoBigInput,
  SetLogoInput,
  SetProfileNameInput,
  SetWebsiteInput,
  SetXInput,
  SetYoutubeInput,
} from "../types.js";
import type {
  SetCategoryAction,
  SetDescriptionAction,
  SetDiscordAction,
  SetGithubAction,
  SetIconAction,
  SetLogoAction,
  SetLogoBigAction,
  SetProfileNameAction,
  SetWebsiteAction,
  SetXAction,
  SetYoutubeAction,
} from "./actions.js";

export const setIcon = (input: SetIconInput) =>
  createAction<SetIconAction>(
    "SET_ICON",
    { ...input },
    undefined,
    SetIconInputSchema,
    "global",
  );

export const setLogo = (input: SetLogoInput) =>
  createAction<SetLogoAction>(
    "SET_LOGO",
    { ...input },
    undefined,
    SetLogoInputSchema,
    "global",
  );

export const setLogoBig = (input: SetLogoBigInput) =>
  createAction<SetLogoBigAction>(
    "SET_LOGO_BIG",
    { ...input },
    undefined,
    SetLogoBigInputSchema,
    "global",
  );

export const setWebsite = (input: SetWebsiteInput) =>
  createAction<SetWebsiteAction>(
    "SET_WEBSITE",
    { ...input },
    undefined,
    SetWebsiteInputSchema,
    "global",
  );

export const setDescription = (input: SetDescriptionInput) =>
  createAction<SetDescriptionAction>(
    "SET_DESCRIPTION",
    { ...input },
    undefined,
    SetDescriptionInputSchema,
    "global",
  );

export const setCategory = (input: SetCategoryInput) =>
  createAction<SetCategoryAction>(
    "SET_CATEGORY",
    { ...input },
    undefined,
    SetCategoryInputSchema,
    "global",
  );

export const setX = (input: SetXInput) =>
  createAction<SetXAction>(
    "SET_X",
    { ...input },
    undefined,
    SetXInputSchema,
    "global",
  );

export const setGithub = (input: SetGithubInput) =>
  createAction<SetGithubAction>(
    "SET_GITHUB",
    { ...input },
    undefined,
    SetGithubInputSchema,
    "global",
  );

export const setDiscord = (input: SetDiscordInput) =>
  createAction<SetDiscordAction>(
    "SET_DISCORD",
    { ...input },
    undefined,
    SetDiscordInputSchema,
    "global",
  );

export const setYoutube = (input: SetYoutubeInput) =>
  createAction<SetYoutubeAction>(
    "SET_YOUTUBE",
    { ...input },
    undefined,
    SetYoutubeInputSchema,
    "global",
  );

export const setProfileName = (input: SetProfileNameInput) =>
  createAction<SetProfileNameAction>(
    "SET_PROFILE_NAME",
    { ...input },
    undefined,
    SetProfileNameInputSchema,
    "global",
  );
