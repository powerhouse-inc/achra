/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { ScopeOfWorkContributorsAction } from "./contributors/actions.js";
import type { ScopeOfWorkDeliverablesSetAction } from "./deliverables-set/actions.js";
import type { ScopeOfWorkDeliverablesAction } from "./deliverables/actions.js";
import type { ScopeOfWorkMilestonesAction } from "./milestones/actions.js";
import type { ScopeOfWorkProjectsAction } from "./projects/actions.js";
import type { ScopeOfWorkRoadmapsAction } from "./roadmaps/actions.js";
import type { ScopeOfWorkScopeOfWorkAction } from "./scope-of-work/actions.js";

export * from "./contributors/actions.js";
export * from "./deliverables-set/actions.js";
export * from "./deliverables/actions.js";
export * from "./milestones/actions.js";
export * from "./projects/actions.js";
export * from "./roadmaps/actions.js";
export * from "./scope-of-work/actions.js";

export type ScopeOfWorkAction =
  | ScopeOfWorkScopeOfWorkAction
  | ScopeOfWorkDeliverablesAction
  | ScopeOfWorkRoadmapsAction
  | ScopeOfWorkMilestonesAction
  | ScopeOfWorkDeliverablesSetAction
  | ScopeOfWorkContributorsAction
  | ScopeOfWorkProjectsAction;
