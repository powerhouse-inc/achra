import type { ServiceOfferingOptionGroupsOperations } from "document-models/service-offering/v1";
import {
  AddOptionGroupTierPricingNotFoundError,
  DeleteOptionGroupNotFoundError,
  RemoveOptionGroupTierPricingNotFoundError,
  SetOptionGroupDiscountModeNotFoundError,
  SetOptionGroupStandalonePricingNotFoundError,
  UpdateOptionGroupNotFoundError,
  UpdateOptionGroupTierPricingNotFoundError,
} from "../../gen/option-groups/error.js";

export const serviceOfferingOptionGroupsOperations: ServiceOfferingOptionGroupsOperations =
  {
    addOptionGroupOperation(state, action) {
      state.optionGroups.push({
        id: action.input.id,
        name: action.input.name,
        description: action.input.description || null,
        isAddOn: action.input.isAddOn,
        defaultSelected: action.input.defaultSelected,
        pricingMode: null,
        standalonePricing: null,
        tierDependentPricing: null,
        costType: action.input.costType || null,
        availableBillingCycles: action.input.availableBillingCycles || [],
        billingCycleDiscounts: [],
        discountMode: null,
        price: action.input.price || null,
        currency: action.input.currency || null,
      });
      state.lastModified = action.input.lastModified;
    },
    updateOptionGroupOperation(state, action) {
      const og = state.optionGroups.find((g) => g.id === action.input.id);
      if (!og) {
        throw new UpdateOptionGroupNotFoundError(
          `Option group with ID ${action.input.id} not found`,
        );
      }
      if (action.input.name) og.name = action.input.name;
      if (action.input.description !== undefined)
        og.description = action.input.description || null;
      if (action.input.isAddOn !== undefined && action.input.isAddOn !== null)
        og.isAddOn = action.input.isAddOn;
      if (
        action.input.defaultSelected !== undefined &&
        action.input.defaultSelected !== null
      )
        og.defaultSelected = action.input.defaultSelected;
      if (action.input.costType !== undefined)
        og.costType = action.input.costType || null;
      if (action.input.availableBillingCycles)
        og.availableBillingCycles = action.input.availableBillingCycles;
      if (action.input.price !== undefined)
        og.price = action.input.price || null;
      if (action.input.currency !== undefined)
        og.currency = action.input.currency || null;
      state.lastModified = action.input.lastModified;
    },
    deleteOptionGroupOperation(state, action) {
      const index = state.optionGroups.findIndex(
        (g) => g.id === action.input.id,
      );
      if (index === -1) {
        throw new DeleteOptionGroupNotFoundError(
          `Option group with ID ${action.input.id} not found`,
        );
      }
      state.optionGroups.splice(index, 1);
      state.lastModified = action.input.lastModified;
    },
    setOptionGroupStandalonePricingOperation(state, action) {
      const og = state.optionGroups.find(
        (g) => g.id === action.input.optionGroupId,
      );
      if (!og) {
        throw new SetOptionGroupStandalonePricingNotFoundError(
          `Option group with ID ${action.input.optionGroupId} not found`,
        );
      }
      og.pricingMode = "STANDALONE";
      og.standalonePricing = {
        setupCost: action.input.setupCost
          ? {
              amount: action.input.setupCost.amount,
              currency: action.input.setupCost.currency,
              discount: action.input.setupCost.discount
                ? {
                    discountType: action.input.setupCost.discount.discountType,
                    discountValue:
                      action.input.setupCost.discount.discountValue,
                  }
                : null,
            }
          : null,
        recurringPricing: action.input.recurringPricing.map((rp) => ({
          id: rp.id,
          billingCycle: rp.billingCycle,
          amount: rp.amount,
          currency: rp.currency,
          discount: rp.discount
            ? {
                discountType: rp.discount.discountType,
                discountValue: rp.discount.discountValue,
              }
            : null,
        })),
      };
      if (action.input.billingCycleDiscounts) {
        og.billingCycleDiscounts = action.input.billingCycleDiscounts.map(
          (d) => ({
            billingCycle: d.billingCycle,
            discountRule: {
              discountType: d.discountRule.discountType,
              discountValue: d.discountRule.discountValue,
            },
          }),
        );
      }
      state.lastModified = action.input.lastModified;
    },
    addOptionGroupTierPricingOperation(state, action) {
      const og = state.optionGroups.find(
        (g) => g.id === action.input.optionGroupId,
      );
      if (!og) {
        throw new AddOptionGroupTierPricingNotFoundError(
          `Option group with ID ${action.input.optionGroupId} not found`,
        );
      }
      og.pricingMode = "TIER_DEPENDENT";
      if (!og.tierDependentPricing) {
        og.tierDependentPricing = [];
      }
      og.tierDependentPricing.push({
        id: action.input.tierPricingId,
        tierId: action.input.tierId,
        setupCost: action.input.setupCost
          ? {
              amount: action.input.setupCost.amount,
              currency: action.input.setupCost.currency,
              discount: action.input.setupCost.discount
                ? {
                    discountType: action.input.setupCost.discount.discountType,
                    discountValue:
                      action.input.setupCost.discount.discountValue,
                  }
                : null,
            }
          : null,
        setupCostDiscounts: (action.input.setupCostDiscounts || []).map(
          (d) => ({
            billingCycle: d.billingCycle,
            discountRule: {
              discountType: d.discountRule.discountType,
              discountValue: d.discountRule.discountValue,
            },
          }),
        ),
        recurringPricing: action.input.recurringPricing.map((rp) => ({
          id: rp.id,
          billingCycle: rp.billingCycle,
          amount: rp.amount,
          currency: rp.currency,
          discount: rp.discount
            ? {
                discountType: rp.discount.discountType,
                discountValue: rp.discount.discountValue,
              }
            : null,
        })),
      });
      state.lastModified = action.input.lastModified;
    },
    updateOptionGroupTierPricingOperation(state, action) {
      const og = state.optionGroups.find(
        (g) => g.id === action.input.optionGroupId,
      );
      if (!og) {
        throw new UpdateOptionGroupTierPricingNotFoundError(
          `Option group with ID ${action.input.optionGroupId} not found`,
        );
      }
      const tp = og.tierDependentPricing?.find(
        (t) => t.tierId === action.input.tierId,
      );
      if (tp) {
        if (action.input.setupCost !== undefined) {
          tp.setupCost = action.input.setupCost
            ? {
                amount: action.input.setupCost.amount,
                currency: action.input.setupCost.currency,
                discount: action.input.setupCost.discount
                  ? {
                      discountType:
                        action.input.setupCost.discount.discountType,
                      discountValue:
                        action.input.setupCost.discount.discountValue,
                    }
                  : null,
              }
            : null;
        }
        if (
          action.input.setupCostDiscounts !== undefined &&
          action.input.setupCostDiscounts !== null
        ) {
          tp.setupCostDiscounts = action.input.setupCostDiscounts.map((d) => ({
            billingCycle: d.billingCycle,
            discountRule: {
              discountType: d.discountRule.discountType,
              discountValue: d.discountRule.discountValue,
            },
          }));
        }
        if (action.input.recurringPricing) {
          tp.recurringPricing = action.input.recurringPricing.map((rp) => ({
            id: rp.id,
            billingCycle: rp.billingCycle,
            amount: rp.amount,
            currency: rp.currency,
            discount: rp.discount
              ? {
                  discountType: rp.discount.discountType,
                  discountValue: rp.discount.discountValue,
                }
              : null,
          }));
        }
      }
      state.lastModified = action.input.lastModified;
    },
    removeOptionGroupTierPricingOperation(state, action) {
      const og = state.optionGroups.find(
        (g) => g.id === action.input.optionGroupId,
      );
      if (!og) {
        throw new RemoveOptionGroupTierPricingNotFoundError(
          `Option group with ID ${action.input.optionGroupId} not found`,
        );
      }
      if (og.tierDependentPricing) {
        const index = og.tierDependentPricing.findIndex(
          (t) => t.tierId === action.input.tierId,
        );
        if (index !== -1) {
          og.tierDependentPricing.splice(index, 1);
        }
      }
      state.lastModified = action.input.lastModified;
    },
    setOptionGroupDiscountModeOperation(state, action) {
      const og = state.optionGroups.find(
        (g) => g.id === action.input.optionGroupId,
      );
      if (!og) {
        throw new SetOptionGroupDiscountModeNotFoundError(
          `Option group with ID ${action.input.optionGroupId} not found`,
        );
      }
      og.discountMode = action.input.discountMode;
      state.lastModified = action.input.lastModified;
    },
  };
