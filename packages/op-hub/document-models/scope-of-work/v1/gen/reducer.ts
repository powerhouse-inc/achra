/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { ScopeOfWorkPHState } from "document-models/scope-of-work/v1";

import { scopeOfWorkContributorsOperations } from "../src/reducers/contributors.js";
import { scopeOfWorkDeliverablesSetOperations } from "../src/reducers/deliverables-set.js";
import { scopeOfWorkDeliverablesOperations } from "../src/reducers/deliverables.js";
import { scopeOfWorkMilestonesOperations } from "../src/reducers/milestones.js";
import { scopeOfWorkProjectsOperations } from "../src/reducers/projects.js";
import { scopeOfWorkRoadmapsOperations } from "../src/reducers/roadmaps.js";
import { scopeOfWorkScopeOfWorkOperations } from "../src/reducers/scope-of-work.js";

import {
  AddAgentInputSchema,
  AddCoordinatorInputSchema,
  AddDeliverableInputSchema,
  AddDeliverableInSetInputSchema,
  AddKeyResultInputSchema,
  AddMilestoneDeliverableInputSchema,
  AddMilestoneInputSchema,
  AddProjectDeliverableInputSchema,
  AddProjectInputSchema,
  AddRoadmapInputSchema,
  EditAgentInputSchema,
  EditDeliverableInputSchema,
  EditDeliverablesSetInputSchema,
  EditKeyResultInputSchema,
  EditMilestoneInputSchema,
  EditRoadmapInputSchema,
  EditScopeOfWorkInputSchema,
  RemoveAgentInputSchema,
  RemoveCoordinatorInputSchema,
  RemoveDeliverableInputSchema,
  RemoveDeliverableInSetInputSchema,
  RemoveKeyResultInputSchema,
  RemoveMilestoneDeliverableInputSchema,
  RemoveMilestoneInputSchema,
  RemoveProjectDeliverableInputSchema,
  RemoveProjectInputSchema,
  RemoveRoadmapInputSchema,
  SetDeliverableBudgetAnchorProjectInputSchema,
  SetDeliverableProgressInputSchema,
  SetProjectMarginInputSchema,
  SetProjectTotalBudgetInputSchema,
  UpdateProjectInputSchema,
  UpdateProjectOwnerInputSchema,
} from "./schema/zod.js";

const schemaMemo = new Map<() => unknown, unknown>();

function memoizedSchema<T>(makeSchema: () => T): T {
  let schema = schemaMemo.get(makeSchema) as T | undefined;
  if (schema === undefined) {
    schema = makeSchema();
    schemaMemo.set(makeSchema, schema);
  }
  return schema;
}

const stateReducer: StateReducer<ScopeOfWorkPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "EDIT_SCOPE_OF_WORK": {
      memoizedSchema(EditScopeOfWorkInputSchema).parse(action.input);

      scopeOfWorkScopeOfWorkOperations.editScopeOfWorkOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_DELIVERABLE": {
      memoizedSchema(AddDeliverableInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.addDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_DELIVERABLE": {
      memoizedSchema(RemoveDeliverableInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.removeDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_DELIVERABLE": {
      memoizedSchema(EditDeliverableInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.editDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_DELIVERABLE_PROGRESS": {
      memoizedSchema(SetDeliverableProgressInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.setDeliverableProgressOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_KEY_RESULT": {
      memoizedSchema(AddKeyResultInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.addKeyResultOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_KEY_RESULT": {
      memoizedSchema(RemoveKeyResultInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.removeKeyResultOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_KEY_RESULT": {
      memoizedSchema(EditKeyResultInputSchema).parse(action.input);

      scopeOfWorkDeliverablesOperations.editKeyResultOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT": {
      memoizedSchema(SetDeliverableBudgetAnchorProjectInputSchema).parse(
        action.input,
      );

      scopeOfWorkDeliverablesOperations.setDeliverableBudgetAnchorProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_ROADMAP": {
      memoizedSchema(AddRoadmapInputSchema).parse(action.input);

      scopeOfWorkRoadmapsOperations.addRoadmapOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_ROADMAP": {
      memoizedSchema(RemoveRoadmapInputSchema).parse(action.input);

      scopeOfWorkRoadmapsOperations.removeRoadmapOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_ROADMAP": {
      memoizedSchema(EditRoadmapInputSchema).parse(action.input);

      scopeOfWorkRoadmapsOperations.editRoadmapOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_MILESTONE": {
      memoizedSchema(AddMilestoneInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.addMilestoneOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_MILESTONE": {
      memoizedSchema(RemoveMilestoneInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.removeMilestoneOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_MILESTONE": {
      memoizedSchema(EditMilestoneInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.editMilestoneOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_COORDINATOR": {
      memoizedSchema(AddCoordinatorInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.addCoordinatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_COORDINATOR": {
      memoizedSchema(RemoveCoordinatorInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.removeCoordinatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_MILESTONE_DELIVERABLE": {
      memoizedSchema(AddMilestoneDeliverableInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.addMilestoneDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_MILESTONE_DELIVERABLE": {
      memoizedSchema(RemoveMilestoneDeliverableInputSchema).parse(action.input);

      scopeOfWorkMilestonesOperations.removeMilestoneDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_DELIVERABLES_SET": {
      memoizedSchema(EditDeliverablesSetInputSchema).parse(action.input);

      scopeOfWorkDeliverablesSetOperations.editDeliverablesSetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_DELIVERABLE_IN_SET": {
      memoizedSchema(AddDeliverableInSetInputSchema).parse(action.input);

      scopeOfWorkDeliverablesSetOperations.addDeliverableInSetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_DELIVERABLE_IN_SET": {
      memoizedSchema(RemoveDeliverableInSetInputSchema).parse(action.input);

      scopeOfWorkDeliverablesSetOperations.removeDeliverableInSetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_AGENT": {
      memoizedSchema(AddAgentInputSchema).parse(action.input);

      scopeOfWorkContributorsOperations.addAgentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_AGENT": {
      memoizedSchema(RemoveAgentInputSchema).parse(action.input);

      scopeOfWorkContributorsOperations.removeAgentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_AGENT": {
      memoizedSchema(EditAgentInputSchema).parse(action.input);

      scopeOfWorkContributorsOperations.editAgentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_PROJECT": {
      memoizedSchema(AddProjectInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.addProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_PROJECT": {
      memoizedSchema(UpdateProjectInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.updateProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_PROJECT_OWNER": {
      memoizedSchema(UpdateProjectOwnerInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.updateProjectOwnerOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_PROJECT": {
      memoizedSchema(RemoveProjectInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.removeProjectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PROJECT_MARGIN": {
      memoizedSchema(SetProjectMarginInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.setProjectMarginOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_PROJECT_TOTAL_BUDGET": {
      memoizedSchema(SetProjectTotalBudgetInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.setProjectTotalBudgetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_PROJECT_DELIVERABLE": {
      memoizedSchema(AddProjectDeliverableInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.addProjectDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_PROJECT_DELIVERABLE": {
      memoizedSchema(RemoveProjectDeliverableInputSchema).parse(action.input);

      scopeOfWorkProjectsOperations.removeProjectDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<ScopeOfWorkPHState> = createReducer(stateReducer);
