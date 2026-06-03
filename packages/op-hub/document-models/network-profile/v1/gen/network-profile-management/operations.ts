/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { NetworkProfileGlobalState } from "../types.js";
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

export interface NetworkProfileNetworkProfileManagementOperations {
  setIconOperation: (
    state: NetworkProfileGlobalState,
    action: SetIconAction,
    dispatch?: SignalDispatch,
  ) => void;
  setLogoOperation: (
    state: NetworkProfileGlobalState,
    action: SetLogoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setLogoBigOperation: (
    state: NetworkProfileGlobalState,
    action: SetLogoBigAction,
    dispatch?: SignalDispatch,
  ) => void;
  setWebsiteOperation: (
    state: NetworkProfileGlobalState,
    action: SetWebsiteAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDescriptionOperation: (
    state: NetworkProfileGlobalState,
    action: SetDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setCategoryOperation: (
    state: NetworkProfileGlobalState,
    action: SetCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
  setXOperation: (
    state: NetworkProfileGlobalState,
    action: SetXAction,
    dispatch?: SignalDispatch,
  ) => void;
  setGithubOperation: (
    state: NetworkProfileGlobalState,
    action: SetGithubAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDiscordOperation: (
    state: NetworkProfileGlobalState,
    action: SetDiscordAction,
    dispatch?: SignalDispatch,
  ) => void;
  setYoutubeOperation: (
    state: NetworkProfileGlobalState,
    action: SetYoutubeAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProfileNameOperation: (
    state: NetworkProfileGlobalState,
    action: SetProfileNameAction,
    dispatch?: SignalDispatch,
  ) => void;
}
