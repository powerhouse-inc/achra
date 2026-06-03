/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderProfileGlobalState } from "../types.js";
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

export interface BuilderProfileBuildersOperations {
  updateProfileOperation: (
    state: BuilderProfileGlobalState,
    action: UpdateProfileAction,
    dispatch?: SignalDispatch,
  ) => void;
  addSkillOperation: (
    state: BuilderProfileGlobalState,
    action: AddSkillAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeSkillOperation: (
    state: BuilderProfileGlobalState,
    action: RemoveSkillAction,
    dispatch?: SignalDispatch,
  ) => void;
  addScopeOperation: (
    state: BuilderProfileGlobalState,
    action: AddScopeAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeScopeOperation: (
    state: BuilderProfileGlobalState,
    action: RemoveScopeAction,
    dispatch?: SignalDispatch,
  ) => void;
  addLinkOperation: (
    state: BuilderProfileGlobalState,
    action: AddLinkAction,
    dispatch?: SignalDispatch,
  ) => void;
  editLinkOperation: (
    state: BuilderProfileGlobalState,
    action: EditLinkAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeLinkOperation: (
    state: BuilderProfileGlobalState,
    action: RemoveLinkAction,
    dispatch?: SignalDispatch,
  ) => void;
  addContributorOperation: (
    state: BuilderProfileGlobalState,
    action: AddContributorAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContributorOperation: (
    state: BuilderProfileGlobalState,
    action: RemoveContributorAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOperatorOperation: (
    state: BuilderProfileGlobalState,
    action: SetOperatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOpHubMemberOperation: (
    state: BuilderProfileGlobalState,
    action: SetOpHubMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  setWalletAddressOperation: (
    state: BuilderProfileGlobalState,
    action: SetWalletAddressAction,
    dispatch?: SignalDispatch,
  ) => void;
}
