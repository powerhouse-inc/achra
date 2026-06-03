/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { ResourceInstanceConfigurationManagementAction } from "./configuration-management/actions.js";
import type { ResourceInstanceInstanceManagementAction } from "./instance-management/actions.js";

export * from "./configuration-management/actions.js";
export * from "./instance-management/actions.js";

export type ResourceInstanceAction =
  | ResourceInstanceInstanceManagementAction
  | ResourceInstanceConfigurationManagementAction;
