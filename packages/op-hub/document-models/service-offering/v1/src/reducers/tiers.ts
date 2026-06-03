import type { ServiceOfferingTiersOperations } from "document-models/service-offering/v1";
import {
  AddServiceLevelTierNotFoundError,
  AddUsageLimitTierNotFoundError,
  DeleteTierNotFoundError,
  DuplicateTierIdError,
  RemoveServiceLevelTierNotFoundError,
  RemoveUsageLimitTierNotFoundError,
  SetTierBillingCycleDiscountsTierNotFoundError,
  SetTierDefaultBillingCycleTierNotFoundError,
  SetTierPricingModeTierNotFoundError,
  TierIdsMismatchError,
  UpdateServiceLevelNotFoundError,
  UpdateServiceLevelTierNotFoundError,
  UpdateTierNotFoundError,
  UpdateTierPricingNotFoundError,
  UpdateUsageLimitNotFoundError,
  UpdateUsageLimitTierNotFoundError,
} from "../../gen/tiers/error.js";

export const serviceOfferingTiersOperations: ServiceOfferingTiersOperations = {
  addTierOperation(state, action) {
    state.tiers.push({
      id: action.input.id,
      name: action.input.name,
      description: action.input.description || null,
      isCustomPricing: action.input.isCustomPricing || false,
      pricingMode: null,
      pricing: {
        amount: action.input.amount || null,
        currency: action.input.currency,
      },
      defaultBillingCycle: null,
      mostPopular: false,
      billingCycleDiscounts: [],
      serviceLevels: [],
      usageLimits: [],
      excludeFromSetupFee: action.input.excludeFromSetupFee || false,
    });
    state.lastModified = action.input.lastModified;
  },
  updateTierOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.id);
    if (!tier) {
      throw new UpdateTierNotFoundError(
        `Tier with ID ${action.input.id} not found`,
      );
    }
    if (action.input.name) tier.name = action.input.name;
    if (action.input.description !== undefined)
      tier.description = action.input.description || null;
    if (
      action.input.isCustomPricing !== undefined &&
      action.input.isCustomPricing !== null
    )
      tier.isCustomPricing = action.input.isCustomPricing;
    if (
      action.input.excludeFromSetupFee !== undefined &&
      action.input.excludeFromSetupFee !== null
    )
      tier.excludeFromSetupFee = action.input.excludeFromSetupFee;
    state.lastModified = action.input.lastModified;
    if (
      action.input.mostPopular !== undefined &&
      action.input.mostPopular !== null
    ) {
      if (action.input.mostPopular) {
        for (const t of state.tiers) {
          t.mostPopular = false;
        }
      }
      tier.mostPopular = action.input.mostPopular;
    }
  },
  updateTierPricingOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new UpdateTierPricingNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    if (action.input.amount !== undefined)
      tier.pricing.amount = action.input.amount || null;
    if (action.input.currency) tier.pricing.currency = action.input.currency;
    state.lastModified = action.input.lastModified;
  },
  deleteTierOperation(state, action) {
    const index = state.tiers.findIndex((t) => t.id === action.input.id);
    if (index === -1) {
      throw new DeleteTierNotFoundError(
        `Tier with ID ${action.input.id} not found`,
      );
    }
    state.tiers.splice(index, 1);
    state.lastModified = action.input.lastModified;
  },
  addServiceLevelOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new AddServiceLevelTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    tier.serviceLevels.push({
      id: action.input.serviceLevelId,
      serviceId: action.input.serviceId,
      level: action.input.level,
      customValue: action.input.customValue || null,
      optionGroupId: action.input.optionGroupId || null,
    });
    state.lastModified = action.input.lastModified;
  },
  updateServiceLevelOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new UpdateServiceLevelTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    const sl = tier.serviceLevels.find(
      (s) => s.id === action.input.serviceLevelId,
    );
    if (!sl) {
      throw new UpdateServiceLevelNotFoundError(
        `Service level with ID ${action.input.serviceLevelId} not found`,
      );
    }
    if (action.input.level) sl.level = action.input.level;
    if (action.input.customValue !== undefined)
      sl.customValue = action.input.customValue || null;
    if (action.input.optionGroupId !== undefined)
      sl.optionGroupId = action.input.optionGroupId || null;
    state.lastModified = action.input.lastModified;
  },
  removeServiceLevelOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new RemoveServiceLevelTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    const index = tier.serviceLevels.findIndex(
      (s) => s.id === action.input.serviceLevelId,
    );
    if (index !== -1) {
      tier.serviceLevels.splice(index, 1);
    }
    state.lastModified = action.input.lastModified;
  },
  addUsageLimitOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new AddUsageLimitTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    tier.usageLimits.push({
      id: action.input.limitId,
      serviceId: action.input.serviceId,
      metric: action.input.metric,
      unitName: action.input.unitName || null,
      freeLimit: action.input.freeLimit || null,
      paidLimit: action.input.paidLimit || null,
      metricType: action.input.metricType,
      accrualCycle: action.input.accrualCycle,
      notes: action.input.notes || null,
      unitPrice: action.input.unitPrice || null,
      unitPriceCurrency: action.input.unitPriceCurrency || null,
    });
    state.lastModified = action.input.lastModified;
  },
  updateUsageLimitOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new UpdateUsageLimitTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    const ul = tier.usageLimits.find((u) => u.id === action.input.limitId);
    if (!ul) {
      throw new UpdateUsageLimitNotFoundError(
        `Usage limit with ID ${action.input.limitId} not found`,
      );
    }
    if (action.input.metric) ul.metric = action.input.metric;
    if (action.input.unitName !== undefined)
      ul.unitName = action.input.unitName || null;
    if (action.input.freeLimit !== undefined)
      ul.freeLimit = action.input.freeLimit || null;
    if (action.input.paidLimit !== undefined)
      ul.paidLimit = action.input.paidLimit || null;
    if (action.input.metricType) ul.metricType = action.input.metricType;
    if (action.input.accrualCycle) ul.accrualCycle = action.input.accrualCycle;
    if (action.input.notes !== undefined) ul.notes = action.input.notes || null;
    if (action.input.unitPrice !== undefined)
      ul.unitPrice = action.input.unitPrice || null;
    if (action.input.unitPriceCurrency !== undefined)
      ul.unitPriceCurrency = action.input.unitPriceCurrency || null;
    state.lastModified = action.input.lastModified;
  },
  removeUsageLimitOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new RemoveUsageLimitTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    const index = tier.usageLimits.findIndex(
      (u) => u.id === action.input.limitId,
    );
    if (index !== -1) {
      tier.usageLimits.splice(index, 1);
    }
    state.lastModified = action.input.lastModified;
  },
  setTierDefaultBillingCycleOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new SetTierDefaultBillingCycleTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    tier.defaultBillingCycle = action.input.defaultBillingCycle;
    state.lastModified = action.input.lastModified;
  },
  setTierBillingCycleDiscountsOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new SetTierBillingCycleDiscountsTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    tier.billingCycleDiscounts = action.input.discounts.map((d) => ({
      billingCycle: d.billingCycle,
      discountRule: {
        discountType: d.discountRule.discountType,
        discountValue: d.discountRule.discountValue,
      },
    }));
    state.lastModified = action.input.lastModified;
  },
  setTierPricingModeOperation(state, action) {
    const tier = state.tiers.find((t) => t.id === action.input.tierId);
    if (!tier) {
      throw new SetTierPricingModeTierNotFoundError(
        `Tier with ID ${action.input.tierId} not found`,
      );
    }
    tier.pricingMode = action.input.pricingMode;
    state.lastModified = action.input.lastModified;
  },
  reorderTiersOperation(state, action) {
    const currentIds = state.tiers.map((t) => t.id);
    const inputIds = action.input.tierIds;
    if (inputIds.length !== currentIds.length) {
      throw new TierIdsMismatchError(
        "Input tier IDs count does not match existing tiers count",
      );
    }
    const inputSet = new Set(inputIds);
    if (inputSet.size !== inputIds.length) {
      throw new DuplicateTierIdError("Input contains duplicate tier IDs");
    }
    for (const id of currentIds) {
      if (!inputSet.has(id)) {
        throw new TierIdsMismatchError(
          `Tier ID ${id} exists but was not included in reorder input`,
        );
      }
    }
    const tierMap = new Map(state.tiers.map((t) => [t.id, t]));
    state.tiers = inputIds.map((id) => tierMap.get(id)!);
    state.lastModified = action.input.lastModified;
  },
};
