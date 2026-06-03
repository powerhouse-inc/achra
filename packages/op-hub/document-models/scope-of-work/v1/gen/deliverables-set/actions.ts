/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddDeliverableInSetInput,
  EditDeliverablesSetInput,
  RemoveDeliverableInSetInput,
} from "../types.js";

export type EditDeliverablesSetAction = Action & {
  type: "EDIT_DELIVERABLES_SET";
  input: EditDeliverablesSetInput;
};
export type AddDeliverableInSetAction = Action & {
  type: "ADD_DELIVERABLE_IN_SET";
  input: AddDeliverableInSetInput;
};
export type RemoveDeliverableInSetAction = Action & {
  type: "REMOVE_DELIVERABLE_IN_SET";
  input: RemoveDeliverableInSetInput;
};

export type ScopeOfWorkDeliverablesSetAction =
  | EditDeliverablesSetAction
  | AddDeliverableInSetAction
  | RemoveDeliverableInSetAction;
