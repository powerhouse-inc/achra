/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { ResourceTemplateAudienceManagementAction } from "./audience-management/actions.js";
import type { ResourceTemplateContentSectionManagementAction } from "./content-section-management/actions.js";
import type { ResourceTemplateFacetTargetingAction } from "./facet-targeting/actions.js";
import type { ResourceTemplateOptionGroupManagementAction } from "./option-group-management/actions.js";
import type { ResourceTemplateServiceCategoryManagementAction } from "./service-category-management/actions.js";
import type { ResourceTemplateServiceManagementAction } from "./service-management/actions.js";
import type { ResourceTemplateTemplateManagementAction } from "./template-management/actions.js";

export * from "./audience-management/actions.js";
export * from "./content-section-management/actions.js";
export * from "./facet-targeting/actions.js";
export * from "./option-group-management/actions.js";
export * from "./service-category-management/actions.js";
export * from "./service-management/actions.js";
export * from "./template-management/actions.js";

export type ResourceTemplateAction =
  | ResourceTemplateTemplateManagementAction
  | ResourceTemplateAudienceManagementAction
  | ResourceTemplateFacetTargetingAction
  | ResourceTemplateServiceCategoryManagementAction
  | ResourceTemplateServiceManagementAction
  | ResourceTemplateOptionGroupManagementAction
  | ResourceTemplateContentSectionManagementAction;
