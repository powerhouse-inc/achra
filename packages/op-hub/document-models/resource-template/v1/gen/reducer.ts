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
      UpdateTemplateInfoInputSchema().parse(action.input);

      resourceTemplateTemplateManagementOperations.updateTemplateInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TEMPLATE_STATUS": {
      UpdateTemplateStatusInputSchema().parse(action.input);

      resourceTemplateTemplateManagementOperations.updateTemplateStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR": {
      SetOperatorInputSchema().parse(action.input);

      resourceTemplateTemplateManagementOperations.setOperatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_TEMPLATE_ID": {
      SetTemplateIdInputSchema().parse(action.input);

      resourceTemplateTemplateManagementOperations.setTemplateIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_WEIGHT": {
      SetWeightInputSchema().parse(action.input);

      resourceTemplateTemplateManagementOperations.setWeightOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_TARGET_AUDIENCE": {
      AddTargetAudienceInputSchema().parse(action.input);

      resourceTemplateAudienceManagementOperations.addTargetAudienceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_TARGET_AUDIENCE": {
      RemoveTargetAudienceInputSchema().parse(action.input);

      resourceTemplateAudienceManagementOperations.removeTargetAudienceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_FACET_TARGET": {
      SetFacetTargetInputSchema().parse(action.input);

      resourceTemplateFacetTargetingOperations.setFacetTargetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_TARGET": {
      RemoveFacetTargetInputSchema().parse(action.input);

      resourceTemplateFacetTargetingOperations.removeFacetTargetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FACET_OPTION": {
      AddFacetOptionInputSchema().parse(action.input);

      resourceTemplateFacetTargetingOperations.addFacetOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_OPTION": {
      RemoveFacetOptionInputSchema().parse(action.input);

      resourceTemplateFacetTargetingOperations.removeFacetOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_SETUP_SERVICES": {
      SetSetupServicesInputSchema().parse(action.input);

      resourceTemplateServiceCategoryManagementOperations.setSetupServicesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_RECURRING_SERVICES": {
      SetRecurringServicesInputSchema().parse(action.input);

      resourceTemplateServiceCategoryManagementOperations.setRecurringServicesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE": {
      AddServiceInputSchema().parse(action.input);

      resourceTemplateServiceManagementOperations.addServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE": {
      UpdateServiceInputSchema().parse(action.input);

      resourceTemplateServiceManagementOperations.updateServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_SERVICE": {
      DeleteServiceInputSchema().parse(action.input);

      resourceTemplateServiceManagementOperations.deleteServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FACET_BINDING": {
      AddFacetBindingInputSchema().parse(action.input);

      resourceTemplateServiceManagementOperations.addFacetBindingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_BINDING": {
      RemoveFacetBindingInputSchema().parse(action.input);

      resourceTemplateServiceManagementOperations.removeFacetBindingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_OPTION_GROUP": {
      AddOptionGroupInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.addOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_OPTION_GROUP": {
      UpdateOptionGroupInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.updateOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_OPTION_GROUP": {
      DeleteOptionGroupInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.deleteOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FAQ": {
      AddFaqInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.addFaqOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_FAQ": {
      UpdateFaqInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.updateFaqOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_FAQ": {
      DeleteFaqInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.deleteFaqOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_FAQS": {
      ReorderFaqsInputSchema().parse(action.input);

      resourceTemplateOptionGroupManagementOperations.reorderFaqsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_CONTENT_SECTION": {
      AddContentSectionInputSchema().parse(action.input);

      resourceTemplateContentSectionManagementOperations.addContentSectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_CONTENT_SECTION": {
      UpdateContentSectionInputSchema().parse(action.input);

      resourceTemplateContentSectionManagementOperations.updateContentSectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_CONTENT_SECTION": {
      DeleteContentSectionInputSchema().parse(action.input);

      resourceTemplateContentSectionManagementOperations.deleteContentSectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_CONTENT_SECTIONS": {
      ReorderContentSectionsInputSchema().parse(action.input);

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
