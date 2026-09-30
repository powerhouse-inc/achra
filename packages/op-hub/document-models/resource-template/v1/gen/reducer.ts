/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { ResourceTemplatePHState } from "document-models/resource-template/v1";

import { resourceTemplateAudienceManagementOperations } from "../src/reducers/audience-management.js";
import { resourceTemplateContentSectionManagementOperations } from "../src/reducers/content-section-management.js";
import { resourceTemplateFacetTargetingOperations } from "../src/reducers/facet-targeting.js";
import { resourceTemplateOptionGroupManagementOperations } from "../src/reducers/option-group-management.js";
import { resourceTemplateServiceCategoryManagementOperations } from "../src/reducers/service-category-management.js";
import { resourceTemplateServiceManagementOperations } from "../src/reducers/service-management.js";
import { resourceTemplateTemplateManagementOperations } from "../src/reducers/template-management.js";

import {
  AddContentSectionInputSchema,
  AddFacetBindingInputSchema,
  AddFacetOptionInputSchema,
  AddFaqInputSchema,
  AddOptionGroupInputSchema,
  AddServiceInputSchema,
  AddTargetAudienceInputSchema,
  DeleteContentSectionInputSchema,
  DeleteFaqInputSchema,
  DeleteOptionGroupInputSchema,
  DeleteServiceInputSchema,
  RemoveFacetBindingInputSchema,
  RemoveFacetOptionInputSchema,
  RemoveFacetTargetInputSchema,
  RemoveTargetAudienceInputSchema,
  ReorderContentSectionsInputSchema,
  ReorderFaqsInputSchema,
  SetFacetTargetInputSchema,
  SetOperatorInputSchema,
  SetRecurringServicesInputSchema,
  SetSetupServicesInputSchema,
  SetTemplateIdInputSchema,
  SetWeightInputSchema,
  UpdateContentSectionInputSchema,
  UpdateFaqInputSchema,
  UpdateOptionGroupInputSchema,
  UpdateServiceInputSchema,
  UpdateTemplateInfoInputSchema,
  UpdateTemplateStatusInputSchema,
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

const stateReducer: StateReducer<ResourceTemplatePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "UPDATE_TEMPLATE_INFO": {
      memoizedSchema(UpdateTemplateInfoInputSchema).parse(action.input);

      resourceTemplateTemplateManagementOperations.updateTemplateInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TEMPLATE_STATUS": {
      memoizedSchema(UpdateTemplateStatusInputSchema).parse(action.input);

      resourceTemplateTemplateManagementOperations.updateTemplateStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR": {
      memoizedSchema(SetOperatorInputSchema).parse(action.input);

      resourceTemplateTemplateManagementOperations.setOperatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_TEMPLATE_ID": {
      memoizedSchema(SetTemplateIdInputSchema).parse(action.input);

      resourceTemplateTemplateManagementOperations.setTemplateIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_WEIGHT": {
      memoizedSchema(SetWeightInputSchema).parse(action.input);

      resourceTemplateTemplateManagementOperations.setWeightOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_TARGET_AUDIENCE": {
      memoizedSchema(AddTargetAudienceInputSchema).parse(action.input);

      resourceTemplateAudienceManagementOperations.addTargetAudienceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_TARGET_AUDIENCE": {
      memoizedSchema(RemoveTargetAudienceInputSchema).parse(action.input);

      resourceTemplateAudienceManagementOperations.removeTargetAudienceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_FACET_TARGET": {
      memoizedSchema(SetFacetTargetInputSchema).parse(action.input);

      resourceTemplateFacetTargetingOperations.setFacetTargetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_TARGET": {
      memoizedSchema(RemoveFacetTargetInputSchema).parse(action.input);

      resourceTemplateFacetTargetingOperations.removeFacetTargetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FACET_OPTION": {
      memoizedSchema(AddFacetOptionInputSchema).parse(action.input);

      resourceTemplateFacetTargetingOperations.addFacetOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_OPTION": {
      memoizedSchema(RemoveFacetOptionInputSchema).parse(action.input);

      resourceTemplateFacetTargetingOperations.removeFacetOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_SETUP_SERVICES": {
      memoizedSchema(SetSetupServicesInputSchema).parse(action.input);

      resourceTemplateServiceCategoryManagementOperations.setSetupServicesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_RECURRING_SERVICES": {
      memoizedSchema(SetRecurringServicesInputSchema).parse(action.input);

      resourceTemplateServiceCategoryManagementOperations.setRecurringServicesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE": {
      memoizedSchema(AddServiceInputSchema).parse(action.input);

      resourceTemplateServiceManagementOperations.addServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE": {
      memoizedSchema(UpdateServiceInputSchema).parse(action.input);

      resourceTemplateServiceManagementOperations.updateServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_SERVICE": {
      memoizedSchema(DeleteServiceInputSchema).parse(action.input);

      resourceTemplateServiceManagementOperations.deleteServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FACET_BINDING": {
      memoizedSchema(AddFacetBindingInputSchema).parse(action.input);

      resourceTemplateServiceManagementOperations.addFacetBindingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_BINDING": {
      memoizedSchema(RemoveFacetBindingInputSchema).parse(action.input);

      resourceTemplateServiceManagementOperations.removeFacetBindingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_OPTION_GROUP": {
      memoizedSchema(AddOptionGroupInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.addOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_OPTION_GROUP": {
      memoizedSchema(UpdateOptionGroupInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.updateOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_OPTION_GROUP": {
      memoizedSchema(DeleteOptionGroupInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.deleteOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FAQ": {
      memoizedSchema(AddFaqInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.addFaqOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_FAQ": {
      memoizedSchema(UpdateFaqInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.updateFaqOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_FAQ": {
      memoizedSchema(DeleteFaqInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.deleteFaqOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_FAQS": {
      memoizedSchema(ReorderFaqsInputSchema).parse(action.input);

      resourceTemplateOptionGroupManagementOperations.reorderFaqsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_CONTENT_SECTION": {
      memoizedSchema(AddContentSectionInputSchema).parse(action.input);

      resourceTemplateContentSectionManagementOperations.addContentSectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_CONTENT_SECTION": {
      memoizedSchema(UpdateContentSectionInputSchema).parse(action.input);

      resourceTemplateContentSectionManagementOperations.updateContentSectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_CONTENT_SECTION": {
      memoizedSchema(DeleteContentSectionInputSchema).parse(action.input);

      resourceTemplateContentSectionManagementOperations.deleteContentSectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_CONTENT_SECTIONS": {
      memoizedSchema(ReorderContentSectionsInputSchema).parse(action.input);

      resourceTemplateContentSectionManagementOperations.reorderContentSectionsOperation(
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

export const reducer: Reducer<ResourceTemplatePHState> =
  createReducer(stateReducer);
