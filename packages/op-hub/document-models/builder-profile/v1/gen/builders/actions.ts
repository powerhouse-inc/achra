/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddContributorInput,
  AddLinkInput,
  AddScopeInput,
  AddSkillInput,
  EditLinkInput,
  RemoveContributorInput,
  RemoveLinkInput,
  RemoveScopeInput,
  RemoveSkillInput,
  SetOperatorInput,
  SetOpHubMemberInput,
  SetWalletAddressInput,
  UpdateProfileInput,
} from "../types.js";

export type UpdateProfileAction = Action & {
  type: "UPDATE_PROFILE";
  input: UpdateProfileInput;
};
export type AddSkillAction = Action & {
  type: "ADD_SKILL";
  input: AddSkillInput;
};
export type RemoveSkillAction = Action & {
  type: "REMOVE_SKILL";
  input: RemoveSkillInput;
};
export type AddScopeAction = Action & {
  type: "ADD_SCOPE";
  input: AddScopeInput;
};
export type RemoveScopeAction = Action & {
  type: "REMOVE_SCOPE";
  input: RemoveScopeInput;
};
export type AddLinkAction = Action & { type: "ADD_LINK"; input: AddLinkInput };
export type EditLinkAction = Action & {
  type: "EDIT_LINK";
  input: EditLinkInput;
};
export type RemoveLinkAction = Action & {
  type: "REMOVE_LINK";
  input: RemoveLinkInput;
};
export type AddContributorAction = Action & {
  type: "ADD_CONTRIBUTOR";
  input: AddContributorInput;
};
export type RemoveContributorAction = Action & {
  type: "REMOVE_CONTRIBUTOR";
  input: RemoveContributorInput;
};
export type SetOperatorAction = Action & {
  type: "SET_OPERATOR";
  input: SetOperatorInput;
};
export type SetOpHubMemberAction = Action & {
  type: "SET_OP_HUB_MEMBER";
  input: SetOpHubMemberInput;
};
export type SetWalletAddressAction = Action & {
  type: "SET_WALLET_ADDRESS";
  input: SetWalletAddressInput;
};

export type BuilderProfileBuildersAction =
  | UpdateProfileAction
  | AddSkillAction
  | RemoveSkillAction
  | AddScopeAction
  | RemoveScopeAction
  | AddLinkAction
  | EditLinkAction
  | RemoveLinkAction
  | AddContributorAction
  | RemoveContributorAction
  | SetOperatorAction
  | SetOpHubMemberAction
  | SetWalletAddressAction;
