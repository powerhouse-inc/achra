/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  resourceTemplateAudienceManagementActions,
  resourceTemplateContentSectionManagementActions,
  resourceTemplateFacetTargetingActions,
  resourceTemplateOptionGroupManagementActions,
  resourceTemplateServiceCategoryManagementActions,
  resourceTemplateServiceManagementActions,
  resourceTemplateTemplateManagementActions,
} from "./gen/creators.js";

/** Actions for the ResourceTemplate document model */

export const actions = {
  ...baseActions,
  ...resourceTemplateTemplateManagementActions,
  ...resourceTemplateAudienceManagementActions,
  ...resourceTemplateFacetTargetingActions,
  ...resourceTemplateServiceCategoryManagementActions,
  ...resourceTemplateServiceManagementActions,
  ...resourceTemplateOptionGroupManagementActions,
  ...resourceTemplateContentSectionManagementActions,
};
