/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddContributorInputSchema,
  AddLinkInputSchema,
  AddScopeInputSchema,
  AddSkillInputSchema,
  EditLinkInputSchema,
  RemoveContributorInputSchema,
  RemoveLinkInputSchema,
  RemoveScopeInputSchema,
  RemoveSkillInputSchema,
  SetOperatorInputSchema,
  SetOpHubMemberInputSchema,
  SetWalletAddressInputSchema,
  UpdateProfileInputSchema,
} from "../schema/zod.js";
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
import type {
  AddContributorAction,
  AddLinkAction,
  AddScopeAction,
  AddSkillAction,
  EditLinkAction,
  RemoveContributorAction,
  RemoveLinkAction,
  RemoveScopeAction,
  RemoveSkillAction,
  SetOperatorAction,
  SetOpHubMemberAction,
  SetWalletAddressAction,
  UpdateProfileAction,
} from "./actions.js";

export const updateProfile = (input: UpdateProfileInput) =>
  createAction<UpdateProfileAction>(
    "UPDATE_PROFILE",
    { ...input },
    undefined,
    UpdateProfileInputSchema,
    "global",
  );

export const addSkill = (input: AddSkillInput) =>
  createAction<AddSkillAction>(
    "ADD_SKILL",
    { ...input },
    undefined,
    AddSkillInputSchema,
    "global",
  );

export const removeSkill = (input: RemoveSkillInput) =>
  createAction<RemoveSkillAction>(
    "REMOVE_SKILL",
    { ...input },
    undefined,
    RemoveSkillInputSchema,
    "global",
  );

export const addScope = (input: AddScopeInput) =>
  createAction<AddScopeAction>(
    "ADD_SCOPE",
    { ...input },
    undefined,
    AddScopeInputSchema,
    "global",
  );

export const removeScope = (input: RemoveScopeInput) =>
  createAction<RemoveScopeAction>(
    "REMOVE_SCOPE",
    { ...input },
    undefined,
    RemoveScopeInputSchema,
    "global",
  );

export const addLink = (input: AddLinkInput) =>
  createAction<AddLinkAction>(
    "ADD_LINK",
    { ...input },
    undefined,
    AddLinkInputSchema,
    "global",
  );

export const editLink = (input: EditLinkInput) =>
  createAction<EditLinkAction>(
    "EDIT_LINK",
    { ...input },
    undefined,
    EditLinkInputSchema,
    "global",
  );

export const removeLink = (input: RemoveLinkInput) =>
  createAction<RemoveLinkAction>(
    "REMOVE_LINK",
    { ...input },
    undefined,
    RemoveLinkInputSchema,
    "global",
  );

export const addContributor = (input: AddContributorInput) =>
  createAction<AddContributorAction>(
    "ADD_CONTRIBUTOR",
    { ...input },
    undefined,
    AddContributorInputSchema,
    "global",
  );

export const removeContributor = (input: RemoveContributorInput) =>
  createAction<RemoveContributorAction>(
    "REMOVE_CONTRIBUTOR",
    { ...input },
    undefined,
    RemoveContributorInputSchema,
    "global",
  );

export const setOperator = (input: SetOperatorInput) =>
  createAction<SetOperatorAction>(
    "SET_OPERATOR",
    { ...input },
    undefined,
    SetOperatorInputSchema,
    "global",
  );

export const setOpHubMember = (input: SetOpHubMemberInput) =>
  createAction<SetOpHubMemberAction>(
    "SET_OP_HUB_MEMBER",
    { ...input },
    undefined,
    SetOpHubMemberInputSchema,
    "global",
  );

export const setWalletAddress = (input: SetWalletAddressInput) =>
  createAction<SetWalletAddressAction>(
    "SET_WALLET_ADDRESS",
    { ...input },
    undefined,
    SetWalletAddressInputSchema,
    "global",
  );
