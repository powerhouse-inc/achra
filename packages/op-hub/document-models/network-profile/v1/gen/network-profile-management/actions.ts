/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
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

export type SetIconAction = Action & { type: "SET_ICON"; input: SetIconInput };
export type SetLogoAction = Action & { type: "SET_LOGO"; input: SetLogoInput };
export type SetLogoBigAction = Action & {
  type: "SET_LOGO_BIG";
  input: SetLogoBigInput;
};
export type SetWebsiteAction = Action & {
  type: "SET_WEBSITE";
  input: SetWebsiteInput;
};
export type SetDescriptionAction = Action & {
  type: "SET_DESCRIPTION";
  input: SetDescriptionInput;
};
export type SetCategoryAction = Action & {
  type: "SET_CATEGORY";
  input: SetCategoryInput;
};
export type SetXAction = Action & { type: "SET_X"; input: SetXInput };
export type SetGithubAction = Action & {
  type: "SET_GITHUB";
  input: SetGithubInput;
};
export type SetDiscordAction = Action & {
  type: "SET_DISCORD";
  input: SetDiscordInput;
};
export type SetYoutubeAction = Action & {
  type: "SET_YOUTUBE";
  input: SetYoutubeInput;
};
export type SetProfileNameAction = Action & {
  type: "SET_PROFILE_NAME";
  input: SetProfileNameInput;
};

export type NetworkProfileNetworkProfileManagementAction =
  | SetIconAction
  | SetLogoAction
  | SetLogoBigAction
  | SetWebsiteAction
  | SetDescriptionAction
  | SetCategoryAction
  | SetXAction
  | SetGithubAction
  | SetDiscordAction
  | SetYoutubeAction
  | SetProfileNameAction;
