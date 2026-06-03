/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { ServiceOfferingPHState } from "document-models/service-offering/v1";

import { serviceOfferingOfferingOperations } from "../src/reducers/offering.js";
import { serviceOfferingOptionGroupsOperations } from "../src/reducers/option-groups.js";
import { serviceOfferingServicesOperations } from "../src/reducers/services.js";
import { serviceOfferingTiersOperations } from "../src/reducers/tiers.js";

import {
  AddFacetOptionInputSchema,
  AddOptionGroupInputSchema,
  AddOptionGroupTierPricingInputSchema,
  AddServiceInputSchema,
  AddServiceLevelInputSchema,
  AddTierInputSchema,
  AddUsageLimitInputSchema,
  ChangeResourceTemplateInputSchema,
  DeleteOptionGroupInputSchema,
  DeleteServiceInputSchema,
  DeleteTierInputSchema,
  RemoveFacetOptionInputSchema,
  RemoveFacetTargetInputSchema,
  RemoveOptionGroupTierPricingInputSchema,
  RemoveServiceLevelInputSchema,
  RemoveUsageLimitInputSchema,
  ReorderTiersInputSchema,
  SelectResourceTemplateInputSchema,
  SetAvailableBillingCyclesInputSchema,
  SetFacetTargetInputSchema,
  SetOfferingIdInputSchema,
  SetOperatorInputSchema,
  SetOptionGroupDiscountModeInputSchema,
  SetOptionGroupStandalonePricingInputSchema,
  SetTierBillingCycleDiscountsInputSchema,
  SetTierDefaultBillingCycleInputSchema,
  SetTierPricingModeInputSchema,
  UpdateOfferingInfoInputSchema,
  UpdateOfferingStatusInputSchema,
  UpdateOptionGroupInputSchema,
  UpdateOptionGroupTierPricingInputSchema,
  UpdateServiceInputSchema,
  UpdateServiceLevelInputSchema,
  UpdateTierInputSchema,
  UpdateTierPricingInputSchema,
  UpdateUsageLimitInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ServiceOfferingPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "UPDATE_OFFERING_INFO": {
      UpdateOfferingInfoInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.updateOfferingInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_OFFERING_STATUS": {
      UpdateOfferingStatusInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.updateOfferingStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR": {
      SetOperatorInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.setOperatorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OFFERING_ID": {
      SetOfferingIdInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.setOfferingIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_FACET_TARGET": {
      SetFacetTargetInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.setFacetTargetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_TARGET": {
      RemoveFacetTargetInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.removeFacetTargetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_FACET_OPTION": {
      AddFacetOptionInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.addFacetOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_FACET_OPTION": {
      RemoveFacetOptionInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.removeFacetOptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SELECT_RESOURCE_TEMPLATE": {
      SelectResourceTemplateInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.selectResourceTemplateOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CHANGE_RESOURCE_TEMPLATE": {
      ChangeResourceTemplateInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.changeResourceTemplateOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_AVAILABLE_BILLING_CYCLES": {
      SetAvailableBillingCyclesInputSchema().parse(action.input);

      serviceOfferingOfferingOperations.setAvailableBillingCyclesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE": {
      AddServiceInputSchema().parse(action.input);

      serviceOfferingServicesOperations.addServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE": {
      UpdateServiceInputSchema().parse(action.input);

      serviceOfferingServicesOperations.updateServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_SERVICE": {
      DeleteServiceInputSchema().parse(action.input);

      serviceOfferingServicesOperations.deleteServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_TIER": {
      AddTierInputSchema().parse(action.input);

      serviceOfferingTiersOperations.addTierOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TIER": {
      UpdateTierInputSchema().parse(action.input);

      serviceOfferingTiersOperations.updateTierOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TIER_PRICING": {
      UpdateTierPricingInputSchema().parse(action.input);

      serviceOfferingTiersOperations.updateTierPricingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_TIER": {
      DeleteTierInputSchema().parse(action.input);

      serviceOfferingTiersOperations.deleteTierOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_LEVEL": {
      AddServiceLevelInputSchema().parse(action.input);

      serviceOfferingTiersOperations.addServiceLevelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_LEVEL": {
      UpdateServiceLevelInputSchema().parse(action.input);

      serviceOfferingTiersOperations.updateServiceLevelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_LEVEL": {
      RemoveServiceLevelInputSchema().parse(action.input);

      serviceOfferingTiersOperations.removeServiceLevelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_USAGE_LIMIT": {
      AddUsageLimitInputSchema().parse(action.input);

      serviceOfferingTiersOperations.addUsageLimitOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_USAGE_LIMIT": {
      UpdateUsageLimitInputSchema().parse(action.input);

      serviceOfferingTiersOperations.updateUsageLimitOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_USAGE_LIMIT": {
      RemoveUsageLimitInputSchema().parse(action.input);

      serviceOfferingTiersOperations.removeUsageLimitOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_TIER_DEFAULT_BILLING_CYCLE": {
      SetTierDefaultBillingCycleInputSchema().parse(action.input);

      serviceOfferingTiersOperations.setTierDefaultBillingCycleOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_TIER_BILLING_CYCLE_DISCOUNTS": {
      SetTierBillingCycleDiscountsInputSchema().parse(action.input);

      serviceOfferingTiersOperations.setTierBillingCycleDiscountsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_TIER_PRICING_MODE": {
      SetTierPricingModeInputSchema().parse(action.input);

      serviceOfferingTiersOperations.setTierPricingModeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_TIERS": {
      ReorderTiersInputSchema().parse(action.input);

      serviceOfferingTiersOperations.reorderTiersOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_OPTION_GROUP": {
      AddOptionGroupInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.addOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_OPTION_GROUP": {
      UpdateOptionGroupInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.updateOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_OPTION_GROUP": {
      DeleteOptionGroupInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.deleteOptionGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPTION_GROUP_STANDALONE_PRICING": {
      SetOptionGroupStandalonePricingInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.setOptionGroupStandalonePricingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_OPTION_GROUP_TIER_PRICING": {
      AddOptionGroupTierPricingInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.addOptionGroupTierPricingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_OPTION_GROUP_TIER_PRICING": {
      UpdateOptionGroupTierPricingInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.updateOptionGroupTierPricingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_OPTION_GROUP_TIER_PRICING": {
      RemoveOptionGroupTierPricingInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.removeOptionGroupTierPricingOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPTION_GROUP_DISCOUNT_MODE": {
      SetOptionGroupDiscountModeInputSchema().parse(action.input);

      serviceOfferingOptionGroupsOperations.setOptionGroupDiscountModeOperation(
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

export const reducer: Reducer<ServiceOfferingPHState> =
  createReducer(stateReducer);
