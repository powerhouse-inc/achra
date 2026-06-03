/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  scopeOfWorkContributorsActions,
  scopeOfWorkDeliverablesActions,
  scopeOfWorkDeliverablesSetActions,
  scopeOfWorkMilestonesActions,
  scopeOfWorkProjectsActions,
  scopeOfWorkRoadmapsActions,
  scopeOfWorkScopeOfWorkActions,
} from "./gen/creators.js";

/** Actions for the ScopeOfWork document model */

export const actions = {
  ...baseActions,
  ...scopeOfWorkScopeOfWorkActions,
  ...scopeOfWorkDeliverablesActions,
  ...scopeOfWorkRoadmapsActions,
  ...scopeOfWorkMilestonesActions,
  ...scopeOfWorkDeliverablesSetActions,
  ...scopeOfWorkContributorsActions,
  ...scopeOfWorkProjectsActions,
};
