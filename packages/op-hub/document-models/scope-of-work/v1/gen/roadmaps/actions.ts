/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddRoadmapInput,
  EditRoadmapInput,
  RemoveRoadmapInput,
} from "../types.js";

export type AddRoadmapAction = Action & {
  type: "ADD_ROADMAP";
  input: AddRoadmapInput;
};
export type RemoveRoadmapAction = Action & {
  type: "REMOVE_ROADMAP";
  input: RemoveRoadmapInput;
};
export type EditRoadmapAction = Action & {
  type: "EDIT_ROADMAP";
  input: EditRoadmapInput;
};

export type ScopeOfWorkRoadmapsAction =
  | AddRoadmapAction
  | RemoveRoadmapAction
  | EditRoadmapAction;
