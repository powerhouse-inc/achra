import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { generateId } from "document-model/core";
import {
  type DocumentDispatch,
  usePHToast,
} from "@powerhousedao/reactor-browser";
import {
  type ServiceOfferingDocument,
  type ServiceOfferingAction,
  type Service,
  type ServiceSubscriptionTier,
  type ServiceLevel,
  type ServiceLevelBinding,
  type OptionGroup,
  type ServiceUsageLimit,
  type BillingCycle,
  type AccrualCycle,
  type MetricType,
} from "document-models/service-offering";
import {
  BILLING_CYCLE_SHORT_LABELS,
  BILLING_CYCLE_LABELS,
  BILLING_CYCLE_MONTHS,
  RECURRING_BILLING_CYCLES,
  formatPrice,
  detectMajorityCycle,
} from "./pricing-utils.js";
import {
  addServiceLevel,
  updateServiceLevel,
  addUsageLimit,
  updateUsageLimit,
  removeUsageLimit,
  addService,
  updateService,
} from "../../../document-models/service-offering/v1/gen/creators.js";
import {
  getUserSelectionPriceBreakdown,
  type PriceBreakdown,
  type OptionGroupBreakdown,
  type AddOnBreakdown,
} from "../../../document-models/service-offering/v1/index.js";
import { InfoIcon } from "./InfoIcon.js";
import { ConfirmDialog } from "./ConfirmDialog.js";

interface TheMatrixProps {
  document: ServiceOfferingDocument;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
}

const SERVICE_LEVELS: {
  value: ServiceLevel;
  label: string;
  shortLabel: string;
  color: string;
}[] = [
  {
    value: "INCLUDED",
    label: "Included",
    shortLabel: "✓",
    color: "#059669",
  },
  {
    value: "OPTIONAL",
    label: "Optional",
    shortLabel: "Optional",
    color: "#0284c7",
  },
  {
    value: "NOT_INCLUDED",
    label: "Not Included",
    shortLabel: "—",
    color: "#94a3b8",
  },
  {
    value: "NOT_APPLICABLE",
    label: "Not Applicable",
    shortLabel: "/",
    color: "#cbd5e1",
  },
  {
    value: "CUSTOM",
    label: "Custom",
    shortLabel: "Custom",
    color: "#d97706",
  },
  {
    value: "VARIABLE",
    label: "Variable",
    shortLabel: "#",
    color: "#7c3aed",
  },
];

const UNGROUPED_ID = "__ungrouped__";

export function TheMatrix({ document, dispatch }: TheMatrixProps) {
  const { state } = document;
  const services = state.global.services ?? [];
  const tiers = state.global.tiers ?? [];
  const optionGroups = state.global.optionGroups ?? [];
  const toast = usePHToast();

  // Get selected facets from the offering document's facetTargets
  const offeringFacetTargets = state.global.facetTargets ?? [];

  // Build facet categories from the SERVICE OFFERING's selected facet targets
  // This ensures only the options selected in the offering's facet targeting appear in the Matrix
  const facetCategories = useMemo(() => {
    const categories: Record<
      string,
      { label: string; options: { id: string; label: string }[] }
    > = {};

    offeringFacetTargets.forEach((facet) => {
      categories[facet.categoryKey] = {
        label: facet.categoryLabel,
        options: facet.selectedOptions.map((option) => ({
          id: option.toLowerCase().replace(/\s+/g, "-"),
          label: option,
        })),
      };
    });

    return categories;
  }, [offeringFacetTargets]);

  const [enabledOptionalGroups, setEnabledOptionalGroups] = useState<
    Set<string>
  >(() => {
    return new Set(
      optionGroups.filter((g) => g.defaultSelected).map((g) => g.id),
    );
  });

  const [selectedCell, setSelectedCell] = useState<{
    serviceId: string;
    tierId: string;
  } | null>(null);

  const [addServiceModal, setAddServiceModal] = useState<{
    groupId: string;
    isSetupFormation: boolean;
  } | null>(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [newServiceSelectedTiers, setNewServiceSelectedTiers] = useState<
    Set<string>
  >(new Set());

  // Edit service modal state
  const [editServiceModal, setEditServiceModal] = useState<Service | null>(
    null,
  );
  const [editServiceName, setEditServiceName] = useState("");
  const [editServiceDescription, setEditServiceDescription] = useState("");
  const [editServiceSelectedTiers, setEditServiceSelectedTiers] = useState<
    Set<string>
  >(new Set());

  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(0);

  // Global billing cycle view - lets users see prices/discounts for different cycles
  const [activeBillingCycle, setActiveBillingCycle] =
    useState<BillingCycle>("MONTHLY");

  // Per-addon billing cycle state (add-ons have independent cycle selection)
  const [addonBillingCycles, setAddonBillingCycles] = useState<
    Record<string, BillingCycle>
  >({});

  // Per-group billing cycle state (non-addon service groups can select their own cycle)
  const [groupBillingCycles, setGroupBillingCycles] = useState<
    Record<string, BillingCycle>
  >({});

  // Detect CUSTOM billing mode: any non-addon group has a cycle different from global
  const isCustomBillingMode = useMemo(() => {
    const overrides = Object.values(groupBillingCycles);
    if (overrides.length === 0) return false;
    return overrides.some((cycle) => cycle !== activeBillingCycle);
  }, [groupBillingCycles, activeBillingCycle]);

  // Billing cycle majority detection (state only — memo goes after regularGroups is defined)
  const [majorityDismissed, setMajorityDismissed] = useState(false);

  // Handle group cycle override with majority-based auto-remerge
  const handleGroupCycleChange = useCallback(
    (groupId: string, newCycle: BillingCycle) => {
      setGroupBillingCycles((prev) => {
        const updated = { ...prev, [groupId]: newCycle };
        // Count total regular (non-setup, non-addon) groups
        const totalRegular = optionGroups.filter(
          (g) => g.costType !== "SETUP" && !g.isAddOn,
        ).length;
        if (totalRegular === 0) {
          return updated;
        }
        // Compute effective cycle for each regular group
        const cycleCounts = new Map<BillingCycle, number>();
        for (const g of optionGroups) {
          if (g.costType === "SETUP" || g.isAddOn) continue;
          const effective = updated[g.id] || activeBillingCycle;
          cycleCounts.set(effective, (cycleCounts.get(effective) || 0) + 1);
        }
        // Check for majority (>50%) on a NEW cycle different from the global
        for (const [cycle, count] of cycleCounts) {
          if (count > totalRegular / 2 && cycle !== activeBillingCycle) {
            // New majority found — adopt as global and clear overrides
            setTimeout(() => {
              setActiveBillingCycle(cycle);
              setGroupBillingCycles({});
            }, 0);
            return prev;
          }
        }
        return updated;
      });
    },
    [activeBillingCycle, optionGroups],
  );

  // When switching to a global cycle, reset all group overrides (exit Custom mode)
  const handleGlobalCycleChange = useCallback((cycle: BillingCycle) => {
    setActiveBillingCycle(cycle);
    setGroupBillingCycles({});
  }, []);

  // All non-addon group IDs (always included) + user-toggled addon IDs
  const allSelectedGroupIds = useMemo(() => {
    const nonAddonIds = optionGroups.filter((g) => !g.isAddOn).map((g) => g.id);
    const addonIds = [...enabledOptionalGroups].filter((id) =>
      optionGroups.some((g) => g.id === id && g.isAddOn),
    );
    return [...nonAddonIds, ...addonIds];
  }, [optionGroups, enabledOptionalGroups]);

  // Copy current UserSelectionInput to clipboard for mutation testing
  const handleCopyUserSelection = useCallback(() => {
    const selectedTier = tiers[selectedTierIdx];
    if (!selectedTier) return;

    const groupOverrides = Object.entries(groupBillingCycles)
      .filter(([, cycle]) => cycle !== activeBillingCycle)
      .map(([groupId, billingCycle]) => ({ groupId, billingCycle }));

    const addonOverrides = Object.entries(addonBillingCycles)
      .filter(([groupId]) => enabledOptionalGroups.has(groupId))
      .filter(([, cycle]) => cycle !== activeBillingCycle)
      .map(([groupId, billingCycle]) => ({ groupId, billingCycle }));

    const userSelection = {
      tierId: selectedTier.id,
      billingCycle: activeBillingCycle,
      optionGroupIds: allSelectedGroupIds,
      ...(groupOverrides.length > 0 && {
        groupBillingCycleOverrides: groupOverrides,
      }),
      ...(addonOverrides.length > 0 && {
        addonBillingCycleOverrides: addonOverrides,
      }),
    };

    const mutationPayload = JSON.stringify(userSelection, null, 2);
    navigator.clipboard.writeText(mutationPayload).then(
      () =>
        toast?.("UserSelectionInput copied to clipboard!", { type: "success" }),
      () => toast?.("Failed to copy to clipboard", { type: "error" }),
    );
  }, [
    tiers,
    selectedTierIdx,
    activeBillingCycle,
    allSelectedGroupIds,
    groupBillingCycles,
    addonBillingCycles,
    toast,
  ]);

  // Initialize selected facets from offering's facet targets
  const [selectedFacets, setSelectedFacets] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      offeringFacetTargets.forEach((facet) => {
        if (facet.selectedOptions.length > 0) {
          initial[facet.categoryKey] = facet.selectedOptions[0]
            .toLowerCase()
            .replace(/\s+/g, "-");
        }
      });
      return initial;
    },
  );

  // Metric editing modal state
  const [metricModal, setMetricModal] = useState<{
    serviceId: string;
    metric: string | null; // null means adding new metric
  } | null>(null);
  const [metricName, setMetricName] = useState("");
  const [metricLimits, setMetricLimits] = useState<Record<string, string>>({});
  const [metricEnabledTiers, setMetricEnabledTiers] = useState<Set<string>>(
    new Set(),
  );
  // Per-tier overage pricing for metric modal
  const [metricOveragePrices, setMetricOveragePrices] = useState<
    Record<string, string>
  >({});
  // Unit name for the metric (e.g., "entity", "user", "API call")
  const [metricUnitName, setMetricUnitName] = useState("");
  // Per-tier paid limits for the metric modal (dual limits: freeLimit + paidLimit)
  const [metricPaidLimits, setMetricPaidLimits] = useState<
    Record<string, string>
  >({});
  // Reset cycle for the metric (shared across tiers)
  const [metricResetCycle, setMetricResetCycle] =
    useState<AccrualCycle>("MONTHLY");
  // Metric type — drives whether usage resets on settle (CUMULATIVE) or carries (NON_CUMULATIVE)
  const [metricTypeChoice, setMetricTypeChoice] =
    useState<MetricType>("NON_CUMULATIVE");

  // Destructive action confirmation state
  const [pendingRemoveMetric, setPendingRemoveMetric] = useState<{
    serviceId: string;
    metric: string;
  } | null>(null);

  const getServiceGroup = (service: Service): string | null => {
    // Services now have optionGroupId directly on them
    return service.optionGroupId || null;
  };

  const groupedServices = useMemo(() => {
    const groups: Map<string, Service[]> = new Map();
    optionGroups.forEach((g) => groups.set(g.id, []));
    groups.set(UNGROUPED_ID, []);

    services.forEach((service) => {
      const groupId = getServiceGroup(service) || UNGROUPED_ID;
      const groupServices = groups.get(groupId) || [];
      groupServices.push(service);
      groups.set(groupId, groupServices);
    });

    // Sort services within each group by displayOrder
    groups.forEach((groupServices, _groupId) => {
      groupServices.sort((a, b) => {
        const orderA = a.displayOrder ?? 999;
        const orderB = b.displayOrder ?? 999;
        return orderA - orderB;
      });
    });

    return groups;
  }, [services, tiers, optionGroups]);

  const setupGroups = useMemo(() => {
    return optionGroups.filter((g) => g.costType === "SETUP");
  }, [optionGroups]);

  const regularGroups = useMemo(() => {
    return optionGroups.filter((g) => g.costType !== "SETUP" && !g.isAddOn);
  }, [optionGroups]);

  // Billing cycle majority suggestion: suggest switching when >50% of groups share a different cycle
  const majorityResult = useMemo(
    () =>
      detectMajorityCycle(
        regularGroups,
        activeBillingCycle,
        groupBillingCycles,
      ),
    [regularGroups, activeBillingCycle, groupBillingCycles],
  );

  // Global billing cycle bar: driven by the offering's availableBillingCycles
  const availableCyclesForSelectedTier = useMemo(() => {
    const globalCycles = state.global.availableBillingCycles ?? [];
    if (globalCycles.length === 0) {
      return RECURRING_BILLING_CYCLES;
    }
    return RECURRING_BILLING_CYCLES.filter((c) => globalCycles.includes(c));
  }, [state.global.availableBillingCycles]);

  const addonGroups = useMemo(() => {
    return optionGroups.filter((g) => g.isAddOn);
  }, [optionGroups]);

  // Precompute price breakdowns for all tiers using the centralized utility
  const tierBreakdowns = useMemo((): PriceBreakdown[] => {
    return tiers.map((tier) =>
      getUserSelectionPriceBreakdown(state, {
        tierId: tier.id,
        billingCycle: activeBillingCycle,
        optionGroupIds: allSelectedGroupIds,
        groupBillingCycleOverrides: groupBillingCycles,
        addonBillingCycleOverrides: addonBillingCycles,
      }),
    );
  }, [
    tiers,
    optionGroups,
    activeBillingCycle,
    allSelectedGroupIds,
    groupBillingCycles,
    addonBillingCycles,
  ]);

  const ungroupedSetupServices = useMemo(() => {
    return (groupedServices.get(UNGROUPED_ID) || []).filter(
      (s) => s.isSetupFormation,
    );
  }, [groupedServices]);

  const ungroupedRegularServices = useMemo(() => {
    return (groupedServices.get(UNGROUPED_ID) || []).filter(
      (s) => !s.isSetupFormation,
    );
  }, [groupedServices]);

  const getServiceLevelForTier = (
    serviceId: string,
    tier: ServiceSubscriptionTier,
  ) => {
    return tier.serviceLevels.find((sl) => sl.serviceId === serviceId);
  };

  const getUniqueMetricsForService = (serviceId: string): string[] => {
    const metricsSet = new Set<string>();
    tiers.forEach((tier) => {
      tier.usageLimits
        .filter((ul) => ul.serviceId === serviceId)
        .forEach((ul) => metricsSet.add(ul.metric));
    });
    return Array.from(metricsSet);
  };

  // Incomplete services detection - services not assigned to any tier
  const incompleteServices = useMemo(() => {
    if (tiers.length === 0) return [];

    return services.filter((service) => {
      // Check if service is included in at least one tier
      const isIncludedAnywhere = tiers.some((tier) =>
        tier.serviceLevels.some(
          (sl) => sl.serviceId === service.id && sl.level === "INCLUDED",
        ),
      );
      return !isIncludedAnywhere;
    });
  }, [services, tiers]);

  const getUsageLimitForMetric = (
    serviceId: string,
    metric: string,
    tier: ServiceSubscriptionTier,
  ): ServiceUsageLimit | undefined => {
    return tier.usageLimits.find(
      (ul) => ul.serviceId === serviceId && ul.metric === metric,
    );
  };

  // Derive tier display pricing from precomputed breakdown
  const getTierDisplayPrice = (
    tierIdx: number,
  ): {
    amount: number;
    monthlyEquivalent: number;
    billedTotal: number;
    hasDiscount: boolean;
    savingsPercent: number;
    discountLabel: string;
  } => {
    const breakdown = tierBreakdowns[tierIdx];
    const months = BILLING_CYCLE_MONTHS[activeBillingCycle];
    const undiscountedTotal =
      breakdown.tierCycleTotal +
      breakdown.addOnBreakdowns.reduce((s, a) => s + a.cycleAmount, 0);
    const discountedTotal = breakdown.totals.grandRecurringTotal;
    const monthlyEq =
      months > 0
        ? Math.round((discountedTotal / months) * 100) / 100
        : discountedTotal;
    const savingsPercent =
      undiscountedTotal > 0
        ? Math.round(
            ((undiscountedTotal - discountedTotal) / undiscountedTotal) * 100,
          )
        : 0;
    return {
      amount: discountedTotal,
      monthlyEquivalent: monthlyEq,
      billedTotal: discountedTotal,
      hasDiscount: savingsPercent > 0,
      savingsPercent,
      discountLabel: savingsPercent > 0 ? `SAVE ${savingsPercent}%` : "",
    };
  };

  const handleSetServiceLevel = (
    serviceId: string,
    tierId: string,
    level: ServiceLevel,
    existingLevelId?: string,
    optionGroupId?: string,
  ) => {
    if (existingLevelId) {
      dispatch(
        updateServiceLevel({
          tierId,
          serviceLevelId: existingLevelId,
          level,
          lastModified: new Date().toISOString(),
        }),
      );
    } else {
      dispatch(
        addServiceLevel({
          tierId,
          serviceLevelId: generateId(),
          serviceId,
          level,
          optionGroupId,
          lastModified: new Date().toISOString(),
        }),
      );
    }
  };

  const toggleOptionalGroup = (groupId: string) => {
    setEnabledOptionalGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const handleAddService = () => {
    if (!addServiceModal || !newServiceName.trim()) return;

    const newServiceId = generateId();
    const now = new Date().toISOString();

    // Add the service with optionGroupId directly on the service
    dispatch(
      addService({
        id: newServiceId,
        title: newServiceName.trim(),
        description: newServiceDescription.trim() || null,
        isSetupFormation: addServiceModal.isSetupFormation,
        optionGroupId:
          addServiceModal.groupId !== UNGROUPED_ID
            ? addServiceModal.groupId
            : undefined,
        lastModified: now,
      }),
    );

    // Create ServiceLevelBindings for each selected tier
    newServiceSelectedTiers.forEach((tierId) => {
      dispatch(
        addServiceLevel({
          tierId,
          serviceLevelId: generateId(),
          serviceId: newServiceId,
          level: "INCLUDED",
          optionGroupId:
            addServiceModal.groupId !== UNGROUPED_ID
              ? addServiceModal.groupId
              : undefined,
          lastModified: now,
        }),
      );
    });

    setNewServiceName("");
    setNewServiceDescription("");
    setNewServiceSelectedTiers(new Set());
    setAddServiceModal(null);
  };

  const openAddServiceModal = (groupId: string, isSetupFormation: boolean) => {
    setAddServiceModal({ groupId, isSetupFormation });
    setNewServiceName("");
    setNewServiceDescription("");
    setNewServiceSelectedTiers(new Set());
  };

  const openEditServiceModal = (service: Service) => {
    setEditServiceModal(service);
    setEditServiceName(service.title);
    setEditServiceDescription(service.description || "");
    // Initialize selected tiers based on current service levels
    const includedTiers = new Set<string>();
    tiers.forEach((tier) => {
      const serviceLevel = tier.serviceLevels.find(
        (sl) => sl.serviceId === service.id,
      );
      if (serviceLevel && serviceLevel.level === "INCLUDED") {
        includedTiers.add(tier.id);
      }
    });
    setEditServiceSelectedTiers(includedTiers);
  };

  const handleSaveEditService = () => {
    if (!editServiceModal || !editServiceName.trim()) return;
    const now = new Date().toISOString();

    // Update service name/description
    dispatch(
      updateService({
        id: editServiceModal.id,
        title: editServiceName.trim(),
        description: editServiceDescription.trim() || null,
        lastModified: now,
      }),
    );

    // Update tier assignments
    tiers.forEach((tier) => {
      const existingLevel = tier.serviceLevels.find(
        (sl) => sl.serviceId === editServiceModal.id,
      );
      const shouldBeIncluded = editServiceSelectedTiers.has(tier.id);

      if (shouldBeIncluded && !existingLevel) {
        // Add to tier
        dispatch(
          addServiceLevel({
            tierId: tier.id,
            serviceLevelId: generateId(),
            serviceId: editServiceModal.id,
            level: "INCLUDED",
            optionGroupId: editServiceModal.optionGroupId || undefined,
            lastModified: now,
          }),
        );
      } else if (
        shouldBeIncluded &&
        existingLevel &&
        existingLevel.level !== "INCLUDED"
      ) {
        // Update to included
        dispatch(
          updateServiceLevel({
            tierId: tier.id,
            serviceLevelId: existingLevel.id,
            level: "INCLUDED",
            lastModified: now,
          }),
        );
      } else if (
        !shouldBeIncluded &&
        existingLevel &&
        existingLevel.level === "INCLUDED"
      ) {
        // Remove from tier (set to NOT_INCLUDED)
        dispatch(
          updateServiceLevel({
            tierId: tier.id,
            serviceLevelId: existingLevel.id,
            level: "NOT_INCLUDED",
            lastModified: now,
          }),
        );
      }
    });

    setEditServiceModal(null);
    setEditServiceName("");
    setEditServiceDescription("");
    setEditServiceSelectedTiers(new Set());
  };

  // Metric modal handlers
  const handleAddMetric = (serviceId: string) => {
    setMetricModal({ serviceId, metric: null });
    setMetricName("");
    // Initialize limits for all tiers to empty string
    const initialLimits: Record<string, string> = {};
    const initialPaidLimits: Record<string, string> = {};
    const initialOveragePrices: Record<string, string> = {};
    // Only enable tiers where the service is INCLUDED
    const includedTierIds = new Set<string>();
    tiers.forEach((tier) => {
      initialLimits[tier.id] = "";
      initialPaidLimits[tier.id] = "";
      initialOveragePrices[tier.id] = "";
      const binding = tier.serviceLevels.find(
        (sl) => sl.serviceId === serviceId,
      );
      if (binding && binding.level === "INCLUDED") {
        includedTierIds.add(tier.id);
      }
    });
    setMetricLimits(initialLimits);
    setMetricPaidLimits(initialPaidLimits);
    setMetricEnabledTiers(includedTierIds);
    // Reset per-tier overage pricing and unit name
    setMetricOveragePrices(initialOveragePrices);
    setMetricUnitName("");
    // Default to MONTHLY accrual cycle (AccrualCycle has no NONE)
    setMetricResetCycle("MONTHLY");
    setMetricTypeChoice("NON_CUMULATIVE");
  };

  const handleEditMetric = (serviceId: string, metric: string) => {
    setMetricModal({ serviceId, metric });
    setMetricName(metric);
    // Initialize limits with existing values and track which tiers have this metric
    const existingLimits: Record<string, string> = {};
    const existingPaidLimits: Record<string, string> = {};
    const existingOveragePrices: Record<string, string> = {};
    const enabledTiers = new Set<string>();
    let existingUnitName = "";
    let existingResetCycle: AccrualCycle = "MONTHLY";
    let existingMetricType: MetricType = "NON_CUMULATIVE";
    tiers.forEach((tier) => {
      const usageLimit = tier.usageLimits.find(
        (ul) => ul.serviceId === serviceId && ul.metric === metric,
      );
      // Load value from either limit (numeric) or notes (string)
      existingLimits[tier.id] =
        usageLimit?.freeLimit?.toString() || usageLimit?.notes || "";
      existingPaidLimits[tier.id] = usageLimit?.paidLimit?.toString() || "";
      // Load per-tier overage pricing
      existingOveragePrices[tier.id] = usageLimit?.unitPrice?.toString() || "";
      if (usageLimit) {
        enabledTiers.add(tier.id);
        // Get unit name from first tier that has it
        if (!existingUnitName && usageLimit.unitName) {
          existingUnitName = usageLimit.unitName;
        }
        // Get accrual cycle from first tier that has it
        // (tolerate legacy `resetCycle` field, skip legacy "NONE")
        const legacyReset = (usageLimit as { resetCycle?: string | null })
          .resetCycle;
        if (usageLimit.accrualCycle) {
          existingResetCycle = usageLimit.accrualCycle;
        } else if (legacyReset && legacyReset !== "NONE") {
          existingResetCycle = legacyReset as AccrualCycle;
        }
        if (usageLimit.metricType) {
          existingMetricType = usageLimit.metricType;
        }
      }
    });
    setMetricLimits(existingLimits);
    setMetricPaidLimits(existingPaidLimits);
    setMetricEnabledTiers(enabledTiers);
    setMetricOveragePrices(existingOveragePrices);
    setMetricUnitName(existingUnitName);
    setMetricResetCycle(existingResetCycle);
    setMetricTypeChoice(existingMetricType);
  };

  const handleRemoveMetric = (serviceId: string, metric: string) => {
    setPendingRemoveMetric({ serviceId, metric });
  };

  const confirmRemoveMetric = () => {
    if (!pendingRemoveMetric) return;
    const { serviceId, metric } = pendingRemoveMetric;
    // Remove this metric from all tiers
    tiers.forEach((tier) => {
      const usageLimit = tier.usageLimits.find(
        (ul) => ul.serviceId === serviceId && ul.metric === metric,
      );
      if (usageLimit) {
        dispatch(
          removeUsageLimit({
            tierId: tier.id,
            limitId: usageLimit.id,
            lastModified: new Date().toISOString(),
          }),
        );
      }
    });
    setPendingRemoveMetric(null);
  };

  // Arrow button handler for service reordering
  const handleReorderService = (
    serviceId: string,
    direction: "up" | "down",
    groupServices: Service[],
  ) => {
    // Sort services by displayOrder for consistent ordering
    const sortedServices = [...groupServices].sort((a, b) => {
      const orderA = a.displayOrder ?? 999;
      const orderB = b.displayOrder ?? 999;
      return orderA - orderB;
    });

    const currentIndex = sortedServices.findIndex((s) => s.id === serviceId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Check bounds
    if (newIndex < 0 || newIndex >= sortedServices.length) return;

    const now = new Date().toISOString();

    // Swap the two services
    const currentService = sortedServices[currentIndex];
    const swapService = sortedServices[newIndex];

    dispatch(
      updateService({
        id: currentService.id,
        displayOrder: newIndex,
        lastModified: now,
      }),
    );

    dispatch(
      updateService({
        id: swapService.id,
        displayOrder: currentIndex,
        lastModified: now,
      }),
    );
  };

  const handleSaveMetric = () => {
    if (!metricModal || !metricName.trim()) return;

    const { serviceId, metric: originalMetric } = metricModal;
    const now = new Date().toISOString();

    tiers.forEach((tier) => {
      const isEnabled = metricEnabledTiers.has(tier.id);
      const limitValue = metricLimits[tier.id];
      const existingLimit = originalMetric
        ? tier.usageLimits.find(
            (ul) => ul.serviceId === serviceId && ul.metric === originalMetric,
          )
        : null;

      // Check if value is numeric or string
      const parsedLimit = limitValue ? parseInt(limitValue, 10) : null;
      const isNumeric = parsedLimit !== null && !isNaN(parsedLimit);

      // Parse paid limit
      const paidLimitValue = metricPaidLimits[tier.id];
      const parsedPaidLimit = paidLimitValue
        ? parseInt(paidLimitValue, 10)
        : null;
      const isPaidNumeric = parsedPaidLimit !== null && !isNaN(parsedPaidLimit);

      // Get per-tier overage pricing
      const tierOveragePrice = metricOveragePrices[tier.id];
      const parsedOveragePrice = tierOveragePrice
        ? parseFloat(tierOveragePrice)
        : null;
      const hasOveragePricing =
        parsedOveragePrice !== null && !isNaN(parsedOveragePrice);

      if (existingLimit && !isEnabled) {
        // Remove limit - tier was disabled
        dispatch(
          removeUsageLimit({
            tierId: tier.id,
            limitId: existingLimit.id,
            lastModified: now,
          }),
        );
      } else if (existingLimit && isEnabled) {
        // Update existing limit - use limit for numeric values, notes for strings
        dispatch(
          updateUsageLimit({
            tierId: tier.id,
            limitId: existingLimit.id,
            metric: metricName.trim(),
            unitName: metricUnitName.trim() || undefined,
            freeLimit: isNumeric ? parsedLimit : null,
            paidLimit: isPaidNumeric ? parsedPaidLimit : null,
            notes: !isNumeric && limitValue ? limitValue.trim() : null,
            metricType: metricTypeChoice,
            accrualCycle: metricResetCycle,
            unitPrice: hasOveragePricing ? parsedOveragePrice : null,
            unitPriceCurrency: hasOveragePricing ? "USD" : undefined,
            lastModified: now,
          }),
        );
      } else if (!existingLimit && isEnabled) {
        // Add new limit - use limit for numeric values, notes for strings
        dispatch(
          addUsageLimit({
            tierId: tier.id,
            limitId: generateId(),
            serviceId,
            metric: metricName.trim(),
            unitName: metricUnitName.trim() || undefined,
            freeLimit: isNumeric ? parsedLimit : null,
            paidLimit: isPaidNumeric ? parsedPaidLimit : null,
            notes: !isNumeric && limitValue ? limitValue.trim() : null,
            metricType: metricTypeChoice,
            accrualCycle: metricResetCycle,
            unitPrice: hasOveragePricing ? parsedOveragePrice : undefined,
            unitPriceCurrency: hasOveragePricing ? "USD" : undefined,
            lastModified: now,
          }),
        );
      }
    });

    setMetricModal(null);
    setMetricName("");
    setMetricLimits({});
    setMetricPaidLimits({});
    setMetricEnabledTiers(new Set());
    setMetricOveragePrices({});
    setMetricUnitName("");
    setMetricResetCycle("MONTHLY");
    setMetricTypeChoice("NON_CUMULATIVE");
  };

  const getLevelDisplay = (
    serviceLevel: ServiceLevelBinding | undefined,
  ): { label: string; color: string } => {
    if (!serviceLevel) return { label: "—", color: "#cbd5e1" };

    const level = serviceLevel.level;
    const config = SERVICE_LEVELS.find((l) => l.value === level);

    if (level === "CUSTOM" && serviceLevel.customValue) {
      return {
        label: serviceLevel.customValue,
        color: config?.color || "#d97706",
      };
    }

    return {
      label: config?.shortLabel || level,
      color: config?.color || "#475569",
    };
  };

  if (services.length === 0 || tiers.length === 0) {
    return (
      <>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="py-16 px-8 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3
              className="text-lg font-semibold text-slate-900 mb-2"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              Matrix Not Ready
            </h3>
            <p className="text-sm text-slate-500 max-w-[28rem] mx-auto">
              {services.length === 0 && tiers.length === 0
                ? "Add services in the Service Catalog and tiers in Tier Definition to configure the matrix."
                : services.length === 0
                  ? "Add services in the Service Catalog to configure the matrix."
                  : "Add tiers in Tier Definition to configure the matrix."}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Facet Selector - Dynamic from Resource Template */}
        {Object.keys(facetCategories).length > 0 && (
          <div
            className="px-6 py-5 border-b border-slate-200"
            style={{
              background: "linear-gradient(to bottom, #f8fafc, #ffffff)",
            }}
          >
            <div className="flex flex-wrap items-end gap-6">
              {Object.entries(facetCategories).map(([key, category]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <span
                    className="text-[0.625rem] font-medium uppercase tracking-[0.08em] text-slate-500"
                    style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
                  >
                    {category.label}
                  </span>
                  {category.options.length <= 3 ? (
                    <div className="flex bg-white border border-slate-200 rounded-[10px] overflow-hidden">
                      {category.options.map((option, optIdx) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            setSelectedFacets((prev) => ({
                              ...prev,
                              [key]: option.id,
                            }))
                          }
                          className={`px-3.5 py-2 text-[0.8125rem] font-medium border-none cursor-pointer transition-all duration-150 ${optIdx > 0 ? "border-l border-slate-200" : ""} ${
                            selectedFacets[key] === option.id
                              ? "bg-violet-100 text-violet-700"
                              : "bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            ...(optIdx > 0
                              ? { borderLeft: "1px solid #e2e8f0" }
                              : {}),
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <select
                      value={
                        selectedFacets[key] || category.options[0]?.id || ""
                      }
                      onChange={(e) =>
                        setSelectedFacets((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="text-[0.8125rem] text-slate-700 bg-white border border-slate-200 rounded-[10px] py-2 pl-3 pr-8 cursor-pointer outline-none transition-all duration-150 appearance-none hover:border-slate-300 focus:border-violet-400 focus:shadow-[0_0_0_3px_#ede9fe]"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1rem",
                      }}
                    >
                      {category.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incomplete Services Warning */}
        {incompleteServices.length > 0 && (
          <div
            className="flex items-start gap-3.5 p-4 px-5 mb-4 bg-amber-50 border border-amber-200 rounded-[10px]"
            style={{
              animation: "matrix-warning-pulse 2s ease-in-out infinite",
            }}
          >
            <div className="shrink-0 w-6 h-6 text-amber-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-full h-full"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-amber-800">
                {incompleteServices.length} service
                {incompleteServices.length !== 1 ? "s" : ""} not configured
              </span>
              <span className="text-[0.8125rem] text-amber-700 leading-6">
                The following services are not included in any tier:{" "}
                <strong className="font-semibold text-amber-900">
                  {incompleteServices
                    .slice(0, 3)
                    .map((s) => s.title)
                    .join(", ")}
                </strong>
                {incompleteServices.length > 3 &&
                  ` and ${incompleteServices.length - 3} more`}
              </span>
            </div>
          </div>
        )}

        {/* Billing Cycle Selector */}
        <div className="flex items-center gap-4 py-3 px-5 bg-slate-50 border border-slate-200 rounded-xl mb-4">
          <span
            className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-slate-500 whitespace-nowrap"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Set Subscription Plan & Billing Cycle:
          </span>
          <div className="flex gap-1.5">
            {availableCyclesForSelectedTier.map((cycle) => (
              <button
                key={cycle}
                onClick={() => handleGlobalCycleChange(cycle)}
                className={`py-1.5 px-3.5 text-[0.8125rem] font-medium rounded-[10px] cursor-pointer transition-all duration-150 ${!isCustomBillingMode && activeBillingCycle === cycle ? "bg-violet-600 border-violet-600 text-white hover:bg-violet-700 hover:border-violet-700" : "text-slate-600 bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {BILLING_CYCLE_SHORT_LABELS[cycle]}
              </button>
            ))}
            {isCustomBillingMode && (
              <span
                className="py-1.5 px-3.5 text-[0.8125rem] font-medium rounded-[10px] bg-amber-500 border border-amber-500 text-white cursor-default italic"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Custom
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCopyUserSelection}
            className="inline-flex items-center gap-1.5 ml-auto py-1.5 px-3 text-[0.6875rem] font-medium text-slate-500 bg-white border border-slate-200 rounded-[10px] cursor-pointer transition-all duration-150 whitespace-nowrap hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50"
            title="Copy current UserSelectionInput as JSON for mutation testing"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Selection
          </button>
        </div>

        {majorityResult && !majorityDismissed && (
          <div className="flex items-center gap-2 py-2 px-3 mb-2 bg-sky-50 border border-sky-200 rounded-[10px] text-xs text-sky-800">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0 w-4 h-4 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="flex-1">
              {majorityResult.count} of {majorityResult.total} service groups
              use{" "}
              <strong>
                {BILLING_CYCLE_SHORT_LABELS[majorityResult.majorityCycle]}
              </strong>{" "}
              billing.
            </span>
            <button
              type="button"
              className="py-1 px-2 text-[0.6875rem] font-medium rounded-md cursor-pointer border border-transparent transition-all duration-150 bg-sky-600 text-white hover:bg-sky-700"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              onClick={() => {
                handleGlobalCycleChange(majorityResult.majorityCycle);
                setMajorityDismissed(true);
              }}
            >
              Switch to{" "}
              {BILLING_CYCLE_SHORT_LABELS[majorityResult.majorityCycle]}
            </button>
            <button
              type="button"
              className="py-1 px-2 text-[0.6875rem] font-medium rounded-md cursor-pointer transition-all duration-150 bg-transparent text-sky-600 border border-sky-300 hover:bg-sky-100"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              onClick={() => setMajorityDismissed(true)}
            >
              Keep current
            </button>
          </div>
        )}

        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-220px)] so-scrollbar-h so-scrollbar-v">
          <table className="w-full border-collapse text-[0.8125rem]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white p-4 text-left font-normal text-slate-500 border-b border-slate-200 min-w-[260px]">
                  <InfoIcon
                    content="INCLUDED: part of the tier. OPTIONAL: available as add-on. NOT_INCLUDED: not available in this tier. CUSTOM/VARIABLE: negotiated pricing."
                    side="right"
                  />
                </th>
                {tiers.map((tier, idx) => {
                  const cyclePrice = tier.isCustomPricing
                    ? null
                    : getTierDisplayPrice(idx);
                  const isSelected = idx === selectedTierIdx;

                  return (
                    <th
                      key={tier.id}
                      onClick={() => {
                        setSelectedTierIdx(idx);
                      }}
                      className={`p-4 text-center border-b border-slate-200 min-w-[140px] cursor-pointer transition-all duration-150 ${
                        isSelected ? "text-white relative" : "bg-white"
                      }`}
                      style={
                        isSelected
                          ? {
                              background:
                                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                              boxShadow:
                                "0 4px 12px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                            }
                          : undefined
                      }
                      onMouseEnter={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.background =
                            "linear-gradient(180deg, #f8fafc 0%, #f5f3ff 100%)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = "";
                      }}
                    >
                      {isSelected && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 50%)",
                          }}
                        />
                      )}
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-4 h-4 rounded-full transition-all duration-150"
                          style={
                            isSelected
                              ? {
                                  borderColor: "rgba(255, 255, 255, 0.9)",
                                  background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                  boxShadow:
                                    "inset 0 0 0 3px #ffffff, 0 2px 4px rgba(0, 0, 0, 0.15)",
                                  border: "2px solid rgba(255,255,255,0.9)",
                                }
                              : { border: "2px solid #cbd5e1" }
                          }
                        />
                        <span
                          className={`font-semibold ${isSelected ? "text-white" : "text-slate-900"}`}
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                          }}
                        >
                          {tier.name}
                        </span>
                        {tier.isCustomPricing ? (
                          <span
                            className={`text-[0.6875rem] ${isSelected ? "text-white/85" : "text-slate-500"}`}
                          >
                            Custom
                          </span>
                        ) : cyclePrice ? (
                          <>
                            <span
                              className={`text-xl font-bold leading-tight ${isSelected ? "text-white" : "text-slate-900"}`}
                            >
                              {formatPrice(
                                cyclePrice.monthlyEquivalent,
                                tierBreakdowns[idx].tierCurrency,
                              )}
                              <span
                                className={`text-xs font-normal ${isSelected ? "text-white/70" : "text-slate-500"}`}
                              >
                                /mo
                              </span>
                            </span>
                            {!isCustomBillingMode &&
                              activeBillingCycle !== "MONTHLY" && (
                                <span
                                  className={`text-[0.6875rem] ${isSelected ? "text-white/65" : "text-slate-400"}`}
                                >
                                  Billed{" "}
                                  {formatPrice(
                                    cyclePrice.billedTotal,
                                    tierBreakdowns[idx].tierCurrency,
                                  )}{" "}
                                  {BILLING_CYCLE_LABELS[activeBillingCycle]}
                                </span>
                              )}
                            {!isCustomBillingMode &&
                              cyclePrice.hasDiscount &&
                              cyclePrice.savingsPercent > 0 && (
                                <span
                                  className="inline-block mt-1 py-0.5 px-2 text-[0.625rem] font-semibold text-emerald-700 bg-emerald-100 rounded-md"
                                  style={{
                                    fontFamily:
                                      "'DM Mono', 'SF Mono', monospace",
                                  }}
                                >
                                  SAVE {cyclePrice.savingsPercent}%
                                </span>
                              )}
                          </>
                        ) : (
                          <span
                            className={`text-[0.6875rem] ${isSelected ? "text-white/85" : "text-slate-500"}`}
                          >
                            —
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan={tiers.length + 1}
                  className="bg-slate-100 py-2.5 px-4 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-600 border-b border-slate-200"
                  style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
                >
                  Service Catalog
                </td>
              </tr>

              {/* Setup & Formation category header */}
              {(setupGroups.length > 0 ||
                ungroupedSetupServices.length > 0) && (
                <tr>
                  <td
                    colSpan={tiers.length + 1}
                    className="bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-700 border-b border-slate-200 flex items-center gap-2"
                  >
                    <span className="flex items-center justify-center w-5 h-5 text-slate-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        className="w-full h-full"
                      >
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                        <path d="M9 21v-6h6v6" />
                        <path d="M9 7h.01M9 11h.01M15 7h.01M15 11h.01" />
                      </svg>
                    </span>
                    Setup & Formation
                  </td>
                </tr>
              )}

              {setupGroups.map((group) => (
                <ServiceGroupSection
                  key={group.id}
                  group={group}
                  services={groupedServices.get(group.id) || []}
                  tiers={tiers}
                  isSetupFormation={true}
                  isOptional={false}
                  isEnabled={true}
                  onToggle={() => {}}
                  getServiceLevelForTier={getServiceLevelForTier}
                  getUniqueMetricsForService={getUniqueMetricsForService}
                  getUsageLimitForMetric={getUsageLimitForMetric}
                  getLevelDisplay={getLevelDisplay}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  handleSetServiceLevel={handleSetServiceLevel}
                  dispatch={dispatch}
                  onAddService={openAddServiceModal}
                  selectedTierIdx={selectedTierIdx}
                  onAddMetric={handleAddMetric}
                  onEditMetric={handleEditMetric}
                  onRemoveMetric={handleRemoveMetric}
                  onEditService={openEditServiceModal}
                  onReorderService={handleReorderService}
                  activeBillingCycle={activeBillingCycle}
                />
              ))}

              {ungroupedSetupServices.length > 0 && (
                <ServiceGroupSection
                  key="ungrouped-setup"
                  group={{
                    id: UNGROUPED_ID,
                    name: "Setup & Formation",
                    description: null,
                    isAddOn: false,
                    defaultSelected: true,
                    availableBillingCycles: [],
                    billingCycleDiscounts: [],
                    costType: null,
                    currency: null,
                    price: null,
                    pricingMode: null,
                    standalonePricing: null,
                    tierDependentPricing: null,
                    discountMode: null,
                  }}
                  services={ungroupedSetupServices}
                  tiers={tiers}
                  isSetupFormation={true}
                  isOptional={false}
                  isEnabled={true}
                  onToggle={() => {}}
                  getServiceLevelForTier={getServiceLevelForTier}
                  getUniqueMetricsForService={getUniqueMetricsForService}
                  getUsageLimitForMetric={getUsageLimitForMetric}
                  getLevelDisplay={getLevelDisplay}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  handleSetServiceLevel={handleSetServiceLevel}
                  dispatch={dispatch}
                  selectedTierIdx={selectedTierIdx}
                  onAddMetric={handleAddMetric}
                  onEditMetric={handleEditMetric}
                  onRemoveMetric={handleRemoveMetric}
                  onEditService={openEditServiceModal}
                  onReorderService={handleReorderService}
                  activeBillingCycle={activeBillingCycle}
                />
              )}

              {/* Recurring Services category header */}
              {(regularGroups.length > 0 ||
                ungroupedRegularServices.length > 0) && (
                <tr>
                  <td
                    colSpan={tiers.length + 1}
                    className="bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-700 border-b border-slate-200 flex items-center gap-2"
                  >
                    <span className="flex items-center justify-center w-5 h-5 text-slate-500">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        className="w-full h-full"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    </span>
                    Recurring Services
                  </td>
                </tr>
              )}

              {regularGroups.map((group) => (
                <ServiceGroupSection
                  key={group.id}
                  group={group}
                  services={groupedServices.get(group.id) || []}
                  tiers={tiers}
                  isSetupFormation={false}
                  isOptional={false}
                  isEnabled={true}
                  onToggle={() => {}}
                  getServiceLevelForTier={getServiceLevelForTier}
                  getUniqueMetricsForService={getUniqueMetricsForService}
                  getUsageLimitForMetric={getUsageLimitForMetric}
                  getLevelDisplay={getLevelDisplay}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  handleSetServiceLevel={handleSetServiceLevel}
                  onAddService={openAddServiceModal}
                  selectedTierIdx={selectedTierIdx}
                  dispatch={dispatch}
                  onAddMetric={handleAddMetric}
                  onEditMetric={handleEditMetric}
                  onRemoveMetric={handleRemoveMetric}
                  onEditService={openEditServiceModal}
                  onReorderService={handleReorderService}
                  activeBillingCycle={activeBillingCycle}
                  groupActiveCycle={groupBillingCycles[group.id]}
                  onGroupCycleChange={(cycle) =>
                    handleGroupCycleChange(group.id, cycle)
                  }
                  groupBreakdown={tierBreakdowns[
                    selectedTierIdx
                  ]?.optionGroupBreakdowns.find(
                    (b) => b.optionGroupId === group.id,
                  )}
                />
              ))}

              {ungroupedRegularServices.length > 0 && (
                <ServiceGroupSection
                  key="ungrouped-regular"
                  group={{
                    id: UNGROUPED_ID,
                    name: "Recurring Services",
                    description: null,
                    isAddOn: false,
                    defaultSelected: true,
                    availableBillingCycles: [],
                    billingCycleDiscounts: [],
                    costType: null,
                    currency: null,
                    price: null,
                    pricingMode: null,
                    standalonePricing: null,
                    tierDependentPricing: null,
                    discountMode: null,
                  }}
                  services={ungroupedRegularServices}
                  tiers={tiers}
                  isSetupFormation={false}
                  isOptional={false}
                  isEnabled={true}
                  onToggle={() => {}}
                  getServiceLevelForTier={getServiceLevelForTier}
                  getUniqueMetricsForService={getUniqueMetricsForService}
                  getUsageLimitForMetric={getUsageLimitForMetric}
                  getLevelDisplay={getLevelDisplay}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  handleSetServiceLevel={handleSetServiceLevel}
                  dispatch={dispatch}
                  selectedTierIdx={selectedTierIdx}
                  onAddMetric={handleAddMetric}
                  onEditMetric={handleEditMetric}
                  onRemoveMetric={handleRemoveMetric}
                  onEditService={openEditServiceModal}
                  onReorderService={handleReorderService}
                  activeBillingCycle={activeBillingCycle}
                />
              )}

              <tr className="bg-slate-100 [&>td]:py-2.5 [&>td]:px-4 [&>td]:font-semibold [&>td]:text-slate-700 [&>td]:border-b [&>td]:border-slate-300 [&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:first-child]:bg-slate-100">
                <td>SUBTOTAL</td>
                {tiers.map((tier, idx) => {
                  if (tier.isCustomPricing) {
                    return (
                      <td key={tier.id} style={{ textAlign: "center" }}>
                        Custom
                      </td>
                    );
                  }
                  const groupSum = tierBreakdowns[idx].tierMonthlyBase;
                  const tierPrice = tier.pricing.amount ?? 0;
                  const isCalculated = tier.pricingMode === "CALCULATED";
                  const currency = tier.pricing.currency || "USD";
                  const isOver =
                    !isCalculated && tierPrice > 0 && groupSum > tierPrice;

                  return (
                    <td key={tier.id} style={{ textAlign: "center" }}>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold">
                          {formatPrice(
                            isCalculated ? groupSum : tierPrice,
                            currency,
                          )}
                        </span>
                        {isCalculated && (
                          <span
                            className="inline-block ml-1 px-1 text-[0.5rem] font-semibold text-emerald-700 bg-emerald-100 rounded-md align-middle uppercase"
                            title="Calculated from service groups"
                            style={{
                              fontFamily: "'DM Mono', 'SF Mono', monospace",
                            }}
                          >
                            calc
                          </span>
                        )}
                        {!isCalculated &&
                          groupSum > 0 &&
                          tierPrice > 0 &&
                          groupSum !== tierPrice && (
                            <span
                              className={`text-[0.5625rem] py-px px-1.5 rounded-md ${isOver ? "text-rose-700 bg-rose-100 font-semibold" : "text-slate-500 bg-slate-100"}`}
                              style={{
                                fontFamily: "'DM Mono', 'SF Mono', monospace",
                              }}
                            >
                              {isOver
                                ? `Groups: ${formatPrice(groupSum, currency)} (+${formatPrice(groupSum - tierPrice, currency)})`
                                : `Groups: ${formatPrice(groupSum, currency)}`}
                            </span>
                          )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {addonGroups.map((group) => (
                <ServiceGroupSection
                  key={group.id}
                  group={group}
                  services={groupedServices.get(group.id) || []}
                  tiers={tiers}
                  isSetupFormation={false}
                  isOptional={true}
                  isEnabled={enabledOptionalGroups.has(group.id)}
                  onToggle={() => toggleOptionalGroup(group.id)}
                  getServiceLevelForTier={getServiceLevelForTier}
                  getUniqueMetricsForService={getUniqueMetricsForService}
                  getUsageLimitForMetric={getUsageLimitForMetric}
                  getLevelDisplay={getLevelDisplay}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  handleSetServiceLevel={handleSetServiceLevel}
                  dispatch={dispatch}
                  onAddService={openAddServiceModal}
                  selectedTierIdx={selectedTierIdx}
                  onAddMetric={handleAddMetric}
                  onEditMetric={handleEditMetric}
                  onRemoveMetric={handleRemoveMetric}
                  onEditService={openEditServiceModal}
                  onReorderService={handleReorderService}
                  activeBillingCycle={activeBillingCycle}
                  addonActiveCycle={addonBillingCycles[group.id] || "MONTHLY"}
                  onAddonCycleChange={(cycle) => {
                    setAddonBillingCycles((prev) => ({
                      ...prev,
                      [group.id]: cycle,
                    }));
                  }}
                  groupBreakdown={tierBreakdowns[
                    selectedTierIdx
                  ]?.addOnBreakdowns.find((b) => b.optionGroupId === group.id)}
                />
              ))}
            </tbody>
          </table>

          {/* Grand Total - Sticky at bottom of scroll container */}
          <div
            className="sticky bottom-0 z-[15] border-t-[3px] border-violet-400"
            style={{ boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.12)" }}
          >
            <table className="w-full border-collapse text-[0.8125rem] m-0">
              <tbody>
                {/* 1. Recurring Tier Price — global mode: single row; custom mode: per-group rows */}
                {!isCustomBillingMode ? (
                  <tr className="bg-violet-100 [&>td]:py-3.5 [&>td]:px-4 [&>td]:font-bold [&>td]:text-violet-900 [&>td]:border-t-2 [&>td]:border-violet-300 [&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:first-child]:bg-violet-100">
                    <td>
                      Recurring Tier Price
                      <InfoIcon content="Shows the calculated total for a client selecting this tier with the current billing cycle. Includes base price + included services + optional add-ons." />
                      <span className="font-normal text-[0.6875rem] text-slate-400 ml-1">
                        /
                        {BILLING_CYCLE_SHORT_LABELS[
                          activeBillingCycle
                        ].toLowerCase()}
                      </span>
                    </td>
                    {tiers.map((tier, idx) => {
                      const breakdown = tierBreakdowns[idx];
                      const discountedTotal =
                        breakdown.totals.grandRecurringTotal;
                      const undiscountedTotal =
                        breakdown.tierCycleTotal +
                        breakdown.addOnBreakdowns.reduce(
                          (s, a) => s + a.cycleAmount,
                          0,
                        );
                      const savingsPct =
                        undiscountedTotal > 0
                          ? Math.round(
                              ((undiscountedTotal - discountedTotal) /
                                undiscountedTotal) *
                                100,
                            )
                          : 0;
                      return (
                        <td
                          key={tier.id}
                          className={
                            idx === selectedTierIdx ? "text-white relative" : ""
                          }
                          style={{
                            textAlign: "center",
                            ...(idx === selectedTierIdx
                              ? {
                                  background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                                }
                              : {}),
                          }}
                        >
                          {idx === selectedTierIdx ? (
                            tier.isCustomPricing ? (
                              "Custom"
                            ) : (
                              <>
                                {formatPrice(
                                  discountedTotal,
                                  breakdown.tierCurrency,
                                )}
                                {savingsPct > 0 && (
                                  <span
                                    className="inline-block ml-1.5 py-px px-1.5 text-[0.5625rem] font-semibold text-emerald-700 bg-emerald-100 rounded-md align-middle"
                                    style={{
                                      fontFamily:
                                        "'DM Mono', 'SF Mono', monospace",
                                    }}
                                  >
                                    SAVE {savingsPct}%
                                  </span>
                                )}
                              </>
                            )
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ) : (
                  /* Custom billing mode: itemized per-group rows from breakdown */
                  tierBreakdowns[selectedTierIdx]?.optionGroupBreakdowns.map(
                    (ogb) => (
                      <tr
                        key={`group-${ogb.optionGroupId}`}
                        className="bg-violet-100 [&>td]:py-3.5 [&>td]:px-4 [&>td]:font-bold [&>td]:text-violet-900 [&>td]:border-t-2 [&>td]:border-violet-300 [&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:first-child]:bg-violet-100"
                      >
                        <td>
                          {ogb.optionGroupName}
                          <span className="font-normal text-[0.6875rem] text-slate-400 ml-1">
                            /
                            {BILLING_CYCLE_SHORT_LABELS[
                              ogb.effectiveBillingCycle
                            ].toLowerCase()}
                          </span>
                        </td>
                        {tiers.map((tier, idx) => (
                          <td
                            key={tier.id}
                            className={
                              idx === selectedTierIdx
                                ? "text-white relative"
                                : ""
                            }
                            style={{
                              textAlign: "center",
                              ...(idx === selectedTierIdx
                                ? {
                                    background:
                                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                                    boxShadow:
                                      "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                                  }
                                : {}),
                            }}
                          >
                            {idx === selectedTierIdx ? (
                              tier.isCustomPricing ? (
                                "Custom"
                              ) : ogb.monthlyBase > 0 ? (
                                <>
                                  {formatPrice(
                                    ogb.recurringAmount,
                                    ogb.currency,
                                  )}
                                  {ogb.discount &&
                                    ogb.discount.discountValue > 0 && (
                                      <span
                                        className="inline-block ml-1.5 py-px px-1.5 text-[0.5625rem] font-semibold text-emerald-700 bg-emerald-100 rounded-md align-middle"
                                        style={{
                                          fontFamily:
                                            "'DM Mono', 'SF Mono', monospace",
                                        }}
                                      >
                                        SAVE{" "}
                                        {Math.round(
                                          ogb.discount.discountType ===
                                            "PERCENTAGE"
                                            ? ogb.discount.discountValue
                                            : ogb.cycleAmount > 0
                                              ? ((ogb.cycleAmount -
                                                  ogb.recurringAmount) /
                                                  ogb.cycleAmount) *
                                                100
                                              : 0,
                                        )}
                                        %
                                      </span>
                                    )}
                                </>
                              ) : (
                                "—"
                              )
                            ) : null}
                          </td>
                        ))}
                      </tr>
                    ),
                  )
                )}

                {/* 2. Recurring Add-on Prices from breakdown */}
                {tierBreakdowns[selectedTierIdx]?.addOnBreakdowns
                  .filter((ab) => ab.monthlyBase > 0)
                  .map((ab) => (
                    <tr
                      key={`addon-recurring-${ab.optionGroupId}`}
                      className="bg-violet-50 [&>td]:border-t [&>td]:border-dashed [&>td]:border-violet-200 [&>td]:font-semibold [&>td]:text-[0.8125rem] [&>td]:text-violet-700 [&>td]:py-2 [&>td]:px-4 [&>td:first-child]:bg-violet-50"
                    >
                      <td>
                        + {ab.optionGroupName}
                        <span className="font-normal text-[0.6875rem] text-slate-400 ml-1">
                          /
                          {BILLING_CYCLE_SHORT_LABELS[
                            ab.selectedBillingCycle
                          ].toLowerCase()}
                        </span>
                      </td>
                      {tiers.map((tier, idx) => (
                        <td
                          key={tier.id}
                          className={
                            idx === selectedTierIdx ? "text-white relative" : ""
                          }
                          style={{
                            textAlign: "center",
                            ...(idx === selectedTierIdx
                              ? {
                                  background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                                }
                              : {}),
                          }}
                        >
                          {idx === selectedTierIdx ? (
                            <>
                              +{formatPrice(ab.recurringAmount, ab.currency)}
                              {ab.discount && ab.discount.discountValue > 0 && (
                                <span
                                  className="inline-block ml-1.5 py-px px-1.5 text-[0.5625rem] font-semibold text-emerald-700 bg-emerald-100 rounded-md align-middle"
                                  style={{
                                    fontFamily:
                                      "'DM Mono', 'SF Mono', monospace",
                                  }}
                                >
                                  SAVE{" "}
                                  {Math.round(
                                    ab.discount.discountType === "PERCENTAGE"
                                      ? ab.discount.discountValue
                                      : ab.cycleAmount > 0
                                        ? ((ab.cycleAmount -
                                            ab.recurringAmount) /
                                            ab.cycleAmount) *
                                          100
                                        : 0,
                                  )}
                                  %
                                </span>
                              )}
                            </>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* 3. Add-on Setup Costs from breakdown */}
                {tierBreakdowns[selectedTierIdx]?.addOnBreakdowns
                  .filter((ab) => ab.setupCost !== null && ab.setupCost > 0)
                  .map((ab) => (
                    <tr
                      key={`addon-setup-${ab.optionGroupId}`}
                      className="bg-violet-50 [&>td]:border-t [&>td]:border-dashed [&>td]:border-violet-200 [&>td]:font-semibold [&>td]:text-[0.8125rem] [&>td]:text-violet-700 [&>td]:py-2 [&>td]:px-4 [&>td:first-child]:bg-violet-50"
                    >
                      <td>
                        + {ab.optionGroupName}{" "}
                        <span className="font-normal text-[0.6875rem] text-slate-400 ml-1">
                          (one-time setup)
                        </span>
                      </td>
                      {tiers.map((tier, idx) => (
                        <td
                          key={tier.id}
                          className={
                            idx === selectedTierIdx ? "text-white relative" : ""
                          }
                          style={{
                            textAlign: "center",
                            ...(idx === selectedTierIdx
                              ? {
                                  background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                                }
                              : {}),
                          }}
                        >
                          {idx === selectedTierIdx
                            ? tier.excludeFromSetupFee
                              ? "No setup fee"
                              : `${formatPrice(
                                  ab.setupCost!,
                                  ab.setupCostCurrency || "USD",
                                )} one-time`
                            : null}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* 4. Setup & Formation Fees from breakdown */}
                {(() => {
                  const setupBds =
                    tierBreakdowns[selectedTierIdx]?.setupGroupBreakdowns ?? [];
                  const totalSetupBase = setupBds.reduce(
                    (sum, s) =>
                      sum +
                      (s.setupCostDiscount?.originalAmount ?? s.setupCost ?? 0),
                    0,
                  );
                  const totalSetupEffective = setupBds.reduce(
                    (sum, s) => sum + (s.setupCost ?? 0),
                    0,
                  );
                  if (totalSetupBase === 0) return null;
                  const hasDiscount = totalSetupEffective !== totalSetupBase;
                  return (
                    <tr className="bg-violet-50 [&>td]:border-t [&>td]:border-dashed [&>td]:border-violet-200 [&>td]:font-semibold [&>td]:text-[0.8125rem] [&>td]:text-violet-700 [&>td]:py-2 [&>td]:px-4 [&>td:first-child]:bg-violet-50">
                      <td>+ Setup & Formation Fees</td>
                      {tiers.map((tier, idx) => (
                        <td
                          key={tier.id}
                          className={
                            idx === selectedTierIdx ? "text-white relative" : ""
                          }
                          style={{
                            textAlign: "center",
                            ...(idx === selectedTierIdx
                              ? {
                                  background:
                                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                                }
                              : {}),
                          }}
                        >
                          {idx === selectedTierIdx
                            ? tier.excludeFromSetupFee
                              ? "No setup fee"
                              : hasDiscount
                                ? `${formatPrice(totalSetupEffective, "USD")} one-time`
                                : `${formatPrice(totalSetupBase, "USD")} one-time`
                            : null}
                        </td>
                      ))}
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCell && (
          <ServiceLevelDetailPanel
            serviceId={selectedCell.serviceId}
            tierId={selectedCell.tierId}
            services={services}
            tiers={tiers}
            optionGroups={optionGroups}
            dispatch={dispatch}
            onClose={() => setSelectedCell(null)}
          />
        )}

        {addServiceModal && (
          <div
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center z-[100]"
            style={{ animation: "modal-backdrop 0.2s ease-out" }}
          >
            <div
              className="bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto"
              style={{
                width: "min(32rem, calc(100vw - 2rem))",
                maxWidth: "32rem",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
                animation: "modal-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <h3
                className="text-xl font-bold text-slate-900 mb-5 tracking-tight"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Add New Service
              </h3>

              {/* Service Name */}
              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Service Name
                </label>
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Enter service name"
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Description (optional)
                </label>
                <textarea
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows={2}
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 resize-y min-h-[80px] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                />
              </div>

              {/* Tier Selection */}
              {tiers.length > 0 && (
                <div className="mb-5">
                  <label
                    className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    Include in Tiers
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {tiers.map((tier) => {
                      const isSelected = newServiceSelectedTiers.has(tier.id);
                      return (
                        <label
                          key={tier.id}
                          className={`relative flex items-center gap-2 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all duration-150 min-w-0 overflow-hidden ${isSelected ? "border-violet-500 bg-violet-50 shadow-[0_0_0_3px_rgba(139,92,246,0.15)] hover:border-violet-600" : "border-slate-300 hover:border-violet-400 hover:bg-violet-50"}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const newSet = new Set(newServiceSelectedTiers);
                              if (e.target.checked) {
                                newSet.add(tier.id);
                              } else {
                                newSet.delete(tier.id);
                              }
                              setNewServiceSelectedTiers(newSet);
                            }}
                            className="relative w-5 h-5 shrink-0 appearance-none bg-white border-2 border-slate-400 rounded-md cursor-pointer transition-all duration-150 checked:bg-violet-600 checked:border-violet-600"
                          />
                          <span className="flex-1 text-sm font-semibold text-slate-800 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                            {tier.name}
                          </span>
                          {tier.pricing.amount !== null && (
                            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0">
                              ${tier.pricing.amount}/mo
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {newServiceSelectedTiers.size === 0 && (
                    <p className="text-[0.8125rem] text-slate-500 mt-3 italic">
                      Select at least one tier to include this service
                    </p>
                  )}
                </div>
              )}

              <p className="text-[0.8125rem] text-slate-600 mb-5 leading-6">
                This service will be added to{" "}
                <strong>
                  {addServiceModal.groupId !== UNGROUPED_ID
                    ? optionGroups.find((g) => g.id === addServiceModal.groupId)
                        ?.name || "Unknown Group"
                    : "Ungrouped Services"}
                </strong>{" "}
                as a{" "}
                {addServiceModal.isSetupFormation
                  ? "Setup/Formation"
                  : "Recurring"}{" "}
                service.
              </p>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => {
                    setAddServiceModal(null);
                    setNewServiceName("");
                    setNewServiceDescription("");
                    setNewServiceSelectedTiers(new Set());
                  }}
                  className="py-2.5 px-5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-slate-200 text-slate-600 border-none hover:bg-slate-300 hover:text-slate-800"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddService}
                  disabled={
                    !newServiceName.trim() || newServiceSelectedTiers.size === 0
                  }
                  className="py-2.5 px-5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-violet-600 text-white border-none shadow-[0_2px_4px_rgba(124,58,237,0.3)] hover:enabled:bg-violet-700 hover:enabled:shadow-[0_4px_8px_rgba(124,58,237,0.4)] hover:enabled:-translate-y-px active:enabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Service Modal */}
        {editServiceModal && (
          <div
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center z-[100]"
            style={{ animation: "modal-backdrop 0.2s ease-out" }}
          >
            <div
              className="bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto"
              style={{
                width: "min(32rem, calc(100vw - 2rem))",
                maxWidth: "32rem",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
                animation: "modal-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <h3
                className="text-xl font-bold text-slate-900 mb-5 tracking-tight"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Edit Service
              </h3>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Service Name
                </label>
                <input
                  type="text"
                  value={editServiceName}
                  onChange={(e) => setEditServiceName(e.target.value)}
                  placeholder="Enter service name"
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  autoFocus
                />
              </div>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Description (optional)
                </label>
                <textarea
                  value={editServiceDescription}
                  onChange={(e) => setEditServiceDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows={2}
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 resize-y min-h-[80px] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                />
              </div>

              {/* Tier Selection */}
              {tiers.length > 0 && (
                <div className="mb-5">
                  <label
                    className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    Include in Tiers
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {tiers.map((tier) => {
                      const isSelected = editServiceSelectedTiers.has(tier.id);
                      return (
                        <label
                          key={tier.id}
                          className={`relative flex items-center gap-2 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all duration-150 min-w-0 overflow-hidden ${isSelected ? "border-violet-500 bg-violet-50 shadow-[0_0_0_3px_rgba(139,92,246,0.15)] hover:border-violet-600" : "border-slate-300 hover:border-violet-400 hover:bg-violet-50"}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const newSet = new Set(editServiceSelectedTiers);
                              if (e.target.checked) {
                                newSet.add(tier.id);
                              } else {
                                newSet.delete(tier.id);
                              }
                              setEditServiceSelectedTiers(newSet);
                            }}
                            className="relative w-5 h-5 shrink-0 appearance-none bg-white border-2 border-slate-400 rounded-md cursor-pointer transition-all duration-150 checked:bg-violet-600 checked:border-violet-600"
                          />
                          <span className="flex-1 text-sm font-semibold text-slate-800 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                            {tier.name}
                          </span>
                          {tier.pricing.amount !== null && (
                            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0">
                              ${tier.pricing.amount}/mo
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => {
                    setEditServiceModal(null);
                    setEditServiceName("");
                    setEditServiceDescription("");
                    setEditServiceSelectedTiers(new Set());
                  }}
                  className="py-2.5 px-5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-slate-200 text-slate-600 border-none hover:bg-slate-300 hover:text-slate-800"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditService}
                  disabled={!editServiceName.trim()}
                  className="py-2.5 px-5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-violet-600 text-white border-none shadow-[0_2px_4px_rgba(124,58,237,0.3)] hover:enabled:bg-violet-700 hover:enabled:shadow-[0_4px_8px_rgba(124,58,237,0.4)] hover:enabled:-translate-y-px active:enabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Metric Edit Modal */}
        {metricModal && (
          <div
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center z-[100]"
            style={{ animation: "modal-backdrop 0.2s ease-out" }}
          >
            <div
              className="bg-white rounded-xl p-6 max-h-[85vh] overflow-y-auto"
              style={{
                width: "min(32rem, calc(100vw - 2rem))",
                maxWidth: "32rem",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
                animation: "modal-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <h3
                className="text-xl font-bold text-slate-900 mb-5 tracking-tight"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {metricModal.metric ? "Edit Metric" : "Add Metric"}
              </h3>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Metric Name
                </label>
                <input
                  type="text"
                  value={metricName}
                  onChange={(e) => setMetricName(e.target.value)}
                  placeholder="e.g., Number of Entities, API Calls, Storage"
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  autoFocus
                />
              </div>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Unit Name (Optional)
                </label>
                <input
                  type="text"
                  value={metricUnitName}
                  onChange={(e) => setMetricUnitName(e.target.value)}
                  placeholder="e.g., entity, user, API call, GB"
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                />
                <p
                  className="text-[0.8125rem] text-slate-600 mb-5 leading-6"
                  style={{ marginTop: "0.375rem" }}
                >
                  Used for overage pricing (e.g., "$50/entity above free limit")
                </p>
              </div>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Accrual Cycle
                </label>
                <select
                  value={metricResetCycle}
                  onChange={(e) =>
                    setMetricResetCycle(e.target.value as AccrualCycle)
                  }
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="SEMI_ANNUAL">Semi-annual</option>
                  <option value="ANNUAL">Annual</option>
                </select>
                <p
                  className="text-[0.8125rem] text-slate-600 mb-5 leading-6"
                  style={{ marginTop: "0.375rem" }}
                >
                  How often usage accrues (when overage is crystallized into
                  debt and usage potentially resets).
                </p>
              </div>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Metric Type
                </label>
                <select
                  value={metricTypeChoice}
                  onChange={(e) =>
                    setMetricTypeChoice(e.target.value as MetricType)
                  }
                  className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  <option value="NON_CUMULATIVE">
                    Cumulative (running count, persists)
                  </option>
                  <option value="CUMULATIVE">
                    Non-cumulative (resets to 0 on settle)
                  </option>
                </select>
                <p
                  className="text-[0.8125rem] text-slate-600 mb-5 leading-6"
                  style={{ marginTop: "0.375rem" }}
                >
                  Non-cumulative metrics reset to zero each billing cycle (e.g.
                  monthly invoices). Cumulative metrics keep their value (e.g.
                  number of contributors).
                </p>
              </div>

              <div className="mb-5">
                <label
                  className="block text-[0.8125rem] font-semibold text-slate-700 mb-2"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Pricing Tiers & Values
                </label>
                <p
                  className="text-[0.8125rem] text-slate-600 mb-5 leading-6"
                  style={{ marginBottom: "0.75rem" }}
                >
                  Enable the metric for each tier and set values.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {tiers.map((tier) => {
                    const isEnabled = metricEnabledTiers.has(tier.id);
                    const tierOveragePrice = metricOveragePrices[tier.id] || "";
                    return (
                      <div
                        key={tier.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          background: isEnabled
                            ? "rgba(124, 58, 237, 0.05)"
                            : "#f8fafc",
                          border: isEnabled
                            ? "1px solid rgba(124, 58, 237, 0.2)"
                            : "1px solid #e2e8f0",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              cursor: "pointer",
                              minWidth: "120px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={(e) => {
                                setMetricEnabledTiers((prev) => {
                                  const next = new Set(prev);
                                  if (e.target.checked) {
                                    next.add(tier.id);
                                  } else {
                                    next.delete(tier.id);
                                  }
                                  return next;
                                });
                              }}
                              style={{
                                width: "16px",
                                height: "16px",
                                accentColor: "#7c3aed",
                                cursor: "pointer",
                              }}
                            />
                            <span
                              style={{
                                fontWeight: 600,
                                color: isEnabled ? "#334155" : "#94a3b8",
                                fontSize: "0.875rem",
                              }}
                            >
                              {tier.name}
                            </span>
                          </label>
                          <input
                            type="text"
                            value={metricLimits[tier.id] || ""}
                            onChange={(e) =>
                              setMetricLimits((prev) => ({
                                ...prev,
                                [tier.id]: e.target.value,
                              }))
                            }
                            placeholder={isEnabled ? "Free limit" : "—"}
                            className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                            disabled={!isEnabled}
                            style={{
                              fontFamily: "'DM Sans', system-ui, sans-serif",
                              flex: 1,
                              opacity: isEnabled ? 1 : 0.5,
                              cursor: isEnabled ? "text" : "not-allowed",
                            }}
                          />
                          <input
                            type="text"
                            value={metricPaidLimits[tier.id] || ""}
                            onChange={(e) =>
                              setMetricPaidLimits((prev) => ({
                                ...prev,
                                [tier.id]: e.target.value,
                              }))
                            }
                            placeholder={isEnabled ? "Paid limit" : "—"}
                            className="w-full text-sm text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-3 px-4 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] placeholder:text-slate-400"
                            disabled={!isEnabled}
                            style={{
                              fontFamily: "'DM Sans', system-ui, sans-serif",
                              flex: 1,
                              opacity: isEnabled ? 1 : 0.5,
                              cursor: isEnabled ? "text" : "not-allowed",
                            }}
                          />
                        </div>
                        {/* Per-tier overage pricing */}
                        {isEnabled && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginLeft: "1.75rem",
                              padding: "0.5rem 0.75rem",
                              background: "rgba(255,255,255,0.6)",
                              borderRadius: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: "#64748b",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Overage price:
                            </span>
                            <span
                              style={{
                                fontFamily: "'DM Mono', 'SF Mono', monospace",
                                fontSize: "0.8125rem",
                                color: "#64748b",
                              }}
                            >
                              $
                            </span>
                            <input
                              type="number"
                              value={tierOveragePrice}
                              onChange={(e) =>
                                setMetricOveragePrices((prev) => ({
                                  ...prev,
                                  [tier.id]: e.target.value,
                                }))
                              }
                              placeholder="0.00"
                              step="0.01"
                              style={{
                                width: "4rem",
                                fontFamily: "'DM Mono', 'SF Mono', monospace",
                                fontSize: "0.8125rem",
                                fontWeight: 500,
                                color: "#0f172a",
                                background: "#ffffff",
                                border: "1px solid #cbd5e1",
                                borderRadius: "4px",
                                padding: "0.25rem 0.375rem",
                                outline: "none",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                color: "#64748b",
                              }}
                            >
                              per {metricUnitName || "unit"} above free limit
                              {metricResetCycle
                                ? ` / ${metricResetCycle.toLowerCase()}`
                                : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => {
                    setMetricModal(null);
                    setMetricName("");
                    setMetricUnitName("");
                    setMetricLimits({});
                    setMetricPaidLimits({});
                    setMetricEnabledTiers(new Set());
                    setMetricOveragePrices({});
                    setMetricResetCycle("MONTHLY");
                    setMetricTypeChoice("NON_CUMULATIVE");
                  }}
                  className="py-2.5 px-5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-slate-200 text-slate-600 border-none hover:bg-slate-300 hover:text-slate-800"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMetric}
                  disabled={!metricName.trim() || metricEnabledTiers.size === 0}
                  className="py-2.5 px-5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-violet-600 text-white border-none shadow-[0_2px_4px_rgba(124,58,237,0.3)] hover:enabled:bg-violet-700 hover:enabled:shadow-[0_4px_8px_rgba(124,58,237,0.4)] hover:enabled:-translate-y-px active:enabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                >
                  {metricModal.metric ? "Save Changes" : "Add Metric"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {pendingRemoveMetric && (
        <ConfirmDialog
          title="Remove this metric?"
          message="This will delete the usage metric and its limits from all tiers. This action cannot be undone."
          confirmLabel="Remove Metric"
          variant="danger"
          onConfirm={confirmRemoveMetric}
          onCancel={() => setPendingRemoveMetric(null)}
        />
      )}
    </>
  );
}

interface ServiceGroupSectionProps {
  group: OptionGroup;
  services: Service[];
  tiers: ServiceSubscriptionTier[];
  isSetupFormation: boolean;
  isOptional: boolean;
  isEnabled: boolean;
  onToggle: () => void;
  getServiceLevelForTier: (
    serviceId: string,
    tier: ServiceSubscriptionTier,
  ) => ServiceLevelBinding | undefined;
  getUniqueMetricsForService: (serviceId: string) => string[];
  getUsageLimitForMetric: (
    serviceId: string,
    metric: string,
    tier: ServiceSubscriptionTier,
  ) => ServiceUsageLimit | undefined;
  getLevelDisplay: (serviceLevel: ServiceLevelBinding | undefined) => {
    label: string;
    color: string;
  };
  selectedCell: { serviceId: string; tierId: string } | null;
  setSelectedCell: (cell: { serviceId: string; tierId: string } | null) => void;
  handleSetServiceLevel: (
    serviceId: string,
    tierId: string,
    level: ServiceLevel,
    existingLevelId?: string,
    optionGroupId?: string,
  ) => void;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
  onAddService?: (groupId: string, isSetupFormation: boolean) => void;
  selectedTierIdx: number;
  onAddMetric: (serviceId: string) => void;
  onEditMetric: (serviceId: string, metric: string) => void;
  onRemoveMetric: (serviceId: string, metric: string) => void;
  onEditService: (service: Service) => void;
  onReorderService: (
    serviceId: string,
    direction: "up" | "down",
    groupServices: Service[],
  ) => void;
  activeBillingCycle: BillingCycle;
  addonActiveCycle?: BillingCycle;
  onAddonCycleChange?: (cycle: BillingCycle) => void;
  groupActiveCycle?: BillingCycle;
  onGroupCycleChange?: (cycle: BillingCycle) => void;
  groupBreakdown?: OptionGroupBreakdown | AddOnBreakdown | null;
}

function ServiceGroupSection({
  group,
  services,
  tiers,
  isSetupFormation,
  isOptional,
  isEnabled,
  onToggle,
  getServiceLevelForTier,
  getUniqueMetricsForService,
  getUsageLimitForMetric,
  getLevelDisplay,
  selectedCell,
  setSelectedCell,
  onAddService,
  selectedTierIdx,
  onAddMetric,
  onEditMetric,
  onRemoveMetric,
  onEditService,
  onReorderService,
  activeBillingCycle,
  addonActiveCycle,
  onAddonCycleChange: _onAddonCycleChange,
  groupActiveCycle,
  onGroupCycleChange: _onGroupCycleChange,
  groupBreakdown,
}: ServiceGroupSectionProps) {
  const showGroup = services.length > 0 || onAddService;
  if (!showGroup) return null;

  // Add-ons follow the global billing cycle (no independent cycle tabs);
  // regular groups can have a per-group override in custom billing mode.
  const effectiveBillingCycle = group.isAddOn
    ? activeBillingCycle
    : groupActiveCycle || activeBillingCycle;

  const headerClass = isSetupFormation
    ? "bg-amber-100"
    : isOptional
      ? "bg-sky-100"
      : "bg-slate-100";

  const rowClass = isSetupFormation
    ? "bg-amber-50"
    : isOptional
      ? "bg-sky-50"
      : "bg-slate-50";

  return (
    <>
      <tr className={`py-3 px-4 border-b border-slate-200 ${headerClass}`}>
        <td
          className={`sticky left-0 z-10 py-3 px-4 border-b border-slate-200 ${headerClass}`}
        >
          <div className="flex items-center gap-3">
            {isOptional && (
              <button
                onClick={onToggle}
                className={`relative w-10 h-5 rounded-full border-none cursor-pointer transition-all duration-200 ${isEnabled ? "bg-violet-600" : "bg-slate-300"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-150 ${isEnabled ? "left-[calc(100%-1.125rem)]" : "left-0.5"}`}
                />
              </button>
            )}
            <div className="flex flex-col gap-0.5">
              <span
                className="font-semibold text-slate-800"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {group.name}
              </span>
              {group.isAddOn && (
                <span className="text-[0.625rem] font-semibold uppercase tracking-[0.05em] text-slate-400">
                  Optional Add-on
                </span>
              )}
            </div>
            {/* Group pricing: price + billing cycle tabs + discount + setup cost */}
            {!isSetupFormation &&
              (() => {
                if (!groupBreakdown) return null;
                const { monthlyBase, recurringAmount, discount, currency } =
                  groupBreakdown;
                if (monthlyBase <= 0 && !group.standalonePricing?.setupCost)
                  return null;
                const setupCost = group.standalonePricing?.setupCost;
                const months = BILLING_CYCLE_MONTHS[effectiveBillingCycle];
                const monthlyEq =
                  months > 0
                    ? Math.round((recurringAmount / months) * 100) / 100
                    : recurringAmount;
                const savingsPct =
                  discount && discount.originalAmount > 0
                    ? Math.round(
                        ((discount.originalAmount - discount.discountedAmount) /
                          discount.originalAmount) *
                          100,
                      )
                    : 0;
                return (
                  <div className="flex items-center gap-3 ml-auto">
                    {monthlyBase > 0 && (
                      <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
                        {formatPrice(
                          effectiveBillingCycle === "MONTHLY"
                            ? monthlyBase
                            : monthlyEq,
                          currency,
                        )}
                        /mo
                      </span>
                    )}
                    {effectiveBillingCycle !== "MONTHLY" && monthlyBase > 0 && (
                      <span className="text-[0.6875rem] font-medium text-slate-500 whitespace-nowrap">
                        Billed {formatPrice(recurringAmount, currency)}{" "}
                        {BILLING_CYCLE_LABELS[effectiveBillingCycle]}
                      </span>
                    )}
                    {savingsPct > 0 && (
                      <span className="text-[0.6875rem] font-semibold text-emerald-600 whitespace-nowrap">
                        SAVE {Math.round(savingsPct)}%
                      </span>
                    )}
                    {setupCost && setupCost.amount > 0 && (
                      <span className="text-[0.6875rem] font-medium text-slate-500 whitespace-nowrap">
                        +{" "}
                        {formatPrice(
                          setupCost.amount,
                          setupCost.currency || "USD",
                        )}{" "}
                        Setup
                      </span>
                    )}
                  </div>
                );
              })()}
          </div>
        </td>
        <td
          colSpan={tiers.length}
          className={headerClass}
          style={{ textAlign: "center" }}
        >
          <span
            className={`inline-block py-1 px-2.5 rounded-md text-[0.625rem] font-semibold uppercase tracking-[0.04em] ${
              isSetupFormation || !isOptional
                ? "bg-emerald-100 text-emerald-700"
                : "bg-sky-200 text-sky-700"
            }`}
          >
            {isSetupFormation
              ? "INCLUDED"
              : isOptional
                ? "OPTIONAL"
                : "INCLUDED"}
          </span>
        </td>
      </tr>

      {services.map((service) => {
        const metrics = getUniqueMetricsForService(service.id);

        return (
          <ServiceRowWithMetrics
            key={service.id}
            service={service}
            metrics={metrics}
            tiers={tiers}
            rowClass={rowClass}
            getServiceLevelForTier={getServiceLevelForTier}
            getUsageLimitForMetric={getUsageLimitForMetric}
            getLevelDisplay={getLevelDisplay}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            selectedTierIdx={selectedTierIdx}
            onAddMetric={onAddMetric}
            onEditMetric={onEditMetric}
            onRemoveMetric={onRemoveMetric}
            onEditService={onEditService}
            onReorderService={onReorderService}
            groupServices={services}
            serviceIndex={services.indexOf(service)}
          />
        );
      })}

      {onAddService && group.id !== "__ungrouped__" && (
        <tr
          className={`[&>td]:py-2 [&>td]:px-4 [&>td]:pl-8 [&>td]:border-b [&>td]:border-slate-100 ${rowClass}`}
        >
          <td className={rowClass}>
            <button
              onClick={() => onAddService(group.id, isSetupFormation)}
              className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-violet-600 bg-transparent border-none cursor-pointer transition-all duration-150 hover:text-violet-700"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add a Service
            </button>
          </td>
          <td colSpan={tiers.length} className={rowClass} />
        </tr>
      )}

      {isSetupFormation &&
        (() => {
          const basePrice = group.price ?? 0;
          if (basePrice === 0) {
            return (
              <tr className="bg-slate-50 [&>td]:py-2.5 [&>td]:px-4 [&>td]:font-semibold [&>td]:text-slate-700 [&>td]:border-b [&>td]:border-slate-200 [&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:first-child]:bg-slate-50">
                <td>TOTAL SETUP FEE</td>
                <td colSpan={tiers.length} style={{ textAlign: "center" }}>
                  No setup fee configured
                </td>
              </tr>
            );
          }
          const selectedTier = tiers[selectedTierIdx] ?? null;
          const tierPricing = selectedTier
            ? group.tierDependentPricing?.find(
                (tp) => tp.tierId === selectedTier.id,
              )
            : null;
          const cycleDiscount = tierPricing?.setupCostDiscounts?.find(
            (d) => d.billingCycle === activeBillingCycle,
          );
          const genericDiscount = tierPricing?.setupCost?.discount;
          const discount = cycleDiscount?.discountRule ?? genericDiscount;
          let effectivePrice = basePrice;
          if (discount && discount.discountValue > 0) {
            if (discount.discountType === "PERCENTAGE") {
              effectivePrice = basePrice * (1 - discount.discountValue / 100);
            } else {
              effectivePrice = Math.max(0, basePrice - discount.discountValue);
            }
            effectivePrice = Math.round(effectivePrice * 100) / 100;
          }
          const curr = group.currency || "USD";
          const hasDiscount = effectivePrice !== basePrice;
          return (
            <tr className="bg-slate-50 [&>td]:py-2.5 [&>td]:px-4 [&>td]:font-semibold [&>td]:text-slate-700 [&>td]:border-b [&>td]:border-slate-200 [&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:first-child]:bg-slate-50">
              <td>TOTAL SETUP FEE</td>
              <td colSpan={tiers.length} style={{ textAlign: "center" }}>
                {selectedTier?.excludeFromSetupFee ? (
                  <span className="text-slate-400 italic">
                    No setup fee for this tier
                  </span>
                ) : hasDiscount ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        opacity: 0.5,
                        marginRight: 6,
                      }}
                    >
                      {formatPrice(basePrice, curr)}
                    </span>
                    {formatPrice(effectivePrice, curr)} flat fee
                    {discount?.discountType === "PERCENTAGE"
                      ? ` (${discount.discountValue}% off)`
                      : ` (${formatPrice(discount?.discountValue ?? 0, curr)} off)`}
                  </>
                ) : (
                  `${formatPrice(basePrice, curr)} flat fee (applied to all ${
                    tiers.some((t) => {
                      const tp = group.tierDependentPricing?.find(
                        (p) => p.tierId === t.id,
                      );
                      const monthlyAmt = tp?.recurringPricing?.find(
                        (r) => r.billingCycle === "MONTHLY",
                      )?.amount;
                      return !monthlyAmt || monthlyAmt === 0;
                    })
                      ? "priced "
                      : ""
                  }tiers)`
                )}
              </td>
            </tr>
          );
        })()}

      {isOptional &&
        (() => {
          const baseMonthly = isEnabled
            ? (groupBreakdown?.monthlyBase ?? 0)
            : 0;
          const adjustedTotal = isEnabled
            ? (groupBreakdown?.recurringAmount ?? 0)
            : 0;
          const setupCost = isEnabled
            ? (group.standalonePricing?.setupCost?.amount ?? 0)
            : 0;
          const billingLabel = `/${BILLING_CYCLE_SHORT_LABELS[effectiveBillingCycle].toLowerCase()}`;
          const currency = groupBreakdown?.currency || group.currency || "USD";

          return (
            <tr
              className={`[&>td]:py-2.5 [&>td]:px-4 [&>td]:font-semibold [&>td]:text-slate-700 [&>td]:border-b [&>td]:border-slate-300 [&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 ${headerClass}`}
            >
              <td className={headerClass}>SUBTOTAL</td>
              <td colSpan={tiers.length} style={{ textAlign: "center" }}>
                {isEnabled && (baseMonthly > 0 || setupCost > 0) ? (
                  <>
                    {baseMonthly > 0 &&
                      `+${formatPrice(adjustedTotal, currency)}${billingLabel}`}
                    {baseMonthly > 0 && setupCost > 0 && " + "}
                    {setupCost > 0 &&
                      `${formatPrice(setupCost, currency)} setup`}
                  </>
                ) : isEnabled ? (
                  "Included"
                ) : (
                  "—"
                )}
              </td>
            </tr>
          );
        })()}
    </>
  );
}

interface ServiceRowWithMetricsProps {
  service: Service;
  metrics: string[];
  tiers: ServiceSubscriptionTier[];
  rowClass: string;
  getServiceLevelForTier: (
    serviceId: string,
    tier: ServiceSubscriptionTier,
  ) => ServiceLevelBinding | undefined;
  getUsageLimitForMetric: (
    serviceId: string,
    metric: string,
    tier: ServiceSubscriptionTier,
  ) => ServiceUsageLimit | undefined;
  getLevelDisplay: (serviceLevel: ServiceLevelBinding | undefined) => {
    label: string;
    color: string;
  };
  selectedCell: { serviceId: string; tierId: string } | null;
  setSelectedCell: (cell: { serviceId: string; tierId: string } | null) => void;
  selectedTierIdx: number;
  onAddMetric: (serviceId: string) => void;
  onEditMetric: (serviceId: string, metric: string) => void;
  onRemoveMetric: (serviceId: string, metric: string) => void;
  onEditService: (service: Service) => void;
  onReorderService: (
    serviceId: string,
    direction: "up" | "down",
    groupServices: Service[],
  ) => void;
  groupServices: Service[];
  serviceIndex: number;
}

function ServiceRowWithMetrics({
  service,
  metrics,
  tiers,
  rowClass,
  getServiceLevelForTier,
  getUsageLimitForMetric,
  getLevelDisplay,
  selectedCell,
  setSelectedCell,
  selectedTierIdx,
  onAddMetric,
  onEditMetric,
  onRemoveMetric,
  onEditService,
  onReorderService,
  groupServices,
  serviceIndex,
}: ServiceRowWithMetricsProps) {
  const isFirst = serviceIndex === 0;
  const isLast = serviceIndex === groupServices.length - 1;

  return (
    <>
      <tr
        className={`group/servicerow transition-all duration-150 hover:brightness-[0.98] ${rowClass}`}
      >
        <td
          className={`py-2.5 px-4 pl-8 border-b border-slate-100 sticky left-0 z-10 ${rowClass}`}
        >
          <div className="flex items-center justify-start gap-2">
            {/* Reorder arrows */}
            <div className="flex flex-col gap-px mr-2 opacity-0 group-hover/servicerow:opacity-100 transition-opacity duration-150">
              <button
                className="flex items-center justify-center w-[18px] h-[14px] p-0 border-none bg-transparent text-slate-400 cursor-pointer rounded-sm transition-all duration-150 hover:enabled:bg-violet-100 hover:enabled:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed [&>svg]:w-3 [&>svg]:h-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onReorderService(service.id, "up", groupServices);
                }}
                disabled={isFirst}
                title="Move up"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-[18px] h-[14px] p-0 border-none bg-transparent text-slate-400 cursor-pointer rounded-sm transition-all duration-150 hover:enabled:bg-violet-100 hover:enabled:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed [&>svg]:w-3 [&>svg]:h-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onReorderService(service.id, "down", groupServices);
                }}
                disabled={isLast}
                title="Move down"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            <button
              className="text-[0.8125rem] text-slate-700 bg-none border-none py-1 px-2 -m-1 rounded cursor-pointer transition-all duration-150 text-left hover:bg-slate-100 hover:text-violet-700"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              onClick={(e) => {
                e.stopPropagation();
                onEditService(service);
              }}
              title="Click to edit service"
            >
              {service.title}
            </button>
            {service.isSetupFormation && (
              <span className="inline-block py-px px-1.5 ml-1.5 text-[0.5625rem] font-bold uppercase tracking-[0.04em] rounded-md bg-amber-100 text-amber-700 align-middle">
                Setup
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddMetric(service.id);
              }}
              className="opacity-60 group-hover/servicerow:opacity-100 text-[0.6875rem] font-medium text-violet-600 bg-transparent border-none cursor-pointer py-0.5 px-1.5 rounded-md transition-all duration-150 whitespace-nowrap hover:bg-violet-100 hover:text-violet-700"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              title="Add metric to this service"
            >
              + Metric
            </button>
          </div>
        </td>
        {tiers.map((tier, tierIdx) => {
          const serviceLevel = getServiceLevelForTier(service.id, tier);
          const display = getLevelDisplay(serviceLevel);
          const isSelected =
            selectedCell?.serviceId === service.id &&
            selectedCell?.tierId === tier.id;
          const isNotIncluded =
            !serviceLevel || serviceLevel.level === "NOT_INCLUDED";

          // Find next tier that has this service included (for upgrade hint)
          const nextTierWithService = isNotIncluded
            ? tiers.slice(tierIdx + 1).find((t) => {
                const sl = getServiceLevelForTier(service.id, t);
                return sl && sl.level === "INCLUDED";
              })
            : null;

          return (
            <td
              key={tier.id}
              className={`py-2.5 px-4 text-center border-b border-slate-100 cursor-pointer transition-all duration-150 hover:bg-white/50 ${
                isSelected
                  ? "shadow-[inset_0_0_0_2px_#8b5cf6] bg-violet-500/[0.08]"
                  : ""
              } ${tierIdx === selectedTierIdx ? "" : ""} ${
                isNotIncluded ? "relative" : ""
              }`}
              style={
                tierIdx === selectedTierIdx
                  ? {
                      background: isSelected
                        ? "rgba(139, 92, 246, 0.08)"
                        : "linear-gradient(180deg, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0.12) 100%)",
                    }
                  : isNotIncluded
                    ? {
                        background:
                          "repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(148, 163, 184, 0.08) 8px, rgba(148, 163, 184, 0.08) 16px)",
                      }
                    : undefined
              }
              onClick={() =>
                setSelectedCell(
                  isSelected
                    ? null
                    : { serviceId: service.id, tierId: tier.id },
                )
              }
            >
              <span
                className={`font-medium ${isNotIncluded ? "opacity-60" : ""}`}
                style={{
                  color: display.color,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                {display.label}
              </span>
              {/* Loss Aversion: Show upgrade hint for NOT_INCLUDED */}
              {isNotIncluded && nextTierWithService && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 translate-y-1 text-[0.5625rem] font-medium text-violet-600 whitespace-nowrap opacity-0 transition-all duration-150 pointer-events-none group-hover/servicerow:opacity-0"
                  style={{ opacity: 0 }}
                >
                  In {nextTierWithService.name} →
                </span>
              )}
            </td>
          );
        })}
      </tr>

      {metrics.map((metric) => (
        <tr
          key={`${service.id}-${metric}`}
          className={`group/metricrow bg-inherit cursor-pointer transition-all duration-150 hover:bg-violet-500/[0.08] ${rowClass}`}
          onClick={() => onEditMetric(service.id, metric)}
        >
          <td
            className={`py-2 px-4 pl-28 border-b border-slate-100 sticky left-0 z-10 align-middle ${rowClass}`}
          >
            <div className="flex items-center gap-2 relative h-full">
              <span
                className="text-xs italic text-slate-500"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {metric}
              </span>
              <div className="flex gap-1 opacity-0 group-hover/metricrow:opacity-100 transition-all duration-150">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditMetric(service.id, metric);
                  }}
                  className="p-0.5 bg-transparent border-none text-slate-400 cursor-pointer rounded-md transition-all duration-150 flex items-center justify-center hover:bg-slate-200 hover:text-violet-600"
                  title="Edit metric"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveMetric(service.id, metric);
                  }}
                  className="p-0.5 bg-transparent border-none text-slate-400 cursor-pointer rounded-md transition-all duration-150 flex items-center justify-center hover:bg-slate-200 hover:text-rose-600"
                  title="Remove metric"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </td>
          {tiers.map((tier, tierIdx) => {
            const usageLimit = getUsageLimitForMetric(service.id, metric, tier);

            return (
              <td
                key={tier.id}
                className="py-1.5 px-3 text-center border-b border-slate-100 align-middle"
                style={
                  tierIdx === selectedTierIdx
                    ? {
                        background:
                          "linear-gradient(180deg, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0.12) 100%)",
                      }
                    : undefined
                }
              >
                <div className="inline-flex flex-col border border-slate-200 rounded-[10px] overflow-hidden min-w-[10rem]">
                  {usageLimit ? (
                    <>
                      <div className="flex justify-between items-center py-1.5 px-3 gap-4">
                        <span className="text-[0.6875rem] text-slate-500 whitespace-nowrap">
                          Included
                        </span>
                        <span className="text-xs text-slate-700 text-right whitespace-nowrap">
                          {usageLimit.freeLimit != null ? (
                            <>
                              <strong>
                                {usageLimit.freeLimit}
                                {usageLimit.unitName
                                  ? ` ${usageLimit.unitName}`
                                  : ""}
                              </strong>
                              {usageLimit.accrualCycle && (
                                <span className="text-[0.625rem] font-normal text-slate-400">
                                  {" "}
                                  / {usageLimit.accrualCycle.toLowerCase()}
                                </span>
                              )}
                            </>
                          ) : (
                            <strong>{usageLimit.notes || "Unlimited"}</strong>
                          )}
                        </span>
                      </div>
                      {usageLimit.unitPrice != null && (
                        <div className="flex justify-between items-center py-1.5 px-3 gap-4 border-t border-slate-100">
                          <span className="text-[0.6875rem] text-slate-500 whitespace-nowrap">
                            Overage
                          </span>
                          <span className="text-xs text-emerald-600 font-medium text-right whitespace-nowrap">
                            {formatPrice(
                              usageLimit.unitPrice,
                              usageLimit.unitPriceCurrency || "USD",
                            )}
                            <span className="text-[0.625rem] font-normal text-slate-400">
                              {" "}
                              / extra
                            </span>
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

interface ServiceLevelDetailPanelProps {
  serviceId: string;
  tierId: string;
  services: Service[];
  tiers: ServiceSubscriptionTier[];
  optionGroups: OptionGroup[];
  dispatch: DocumentDispatch<ServiceOfferingAction>;
  onClose: () => void;
}

function ServiceLevelDetailPanel({
  serviceId,
  tierId,
  services,
  tiers,
  optionGroups: _optionGroups,
  dispatch,
  onClose,
}: ServiceLevelDetailPanelProps) {
  const service = services.find((s) => s.id === serviceId);
  const tier = tiers.find((t) => t.id === tierId);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Scroll lock when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus trap - keep focus inside the panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, []);

  // Click outside to close
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  const serviceLevel = service
    ? tier?.serviceLevels.find((sl) => sl.serviceId === serviceId)
    : undefined;
  const usageLimits = service
    ? tier?.usageLimits.filter((ul) => ul.serviceId === serviceId) || []
    : [];

  const [isAddingMetric, setIsAddingMetric] = useState(false);
  const [newMetric, setNewMetric] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [customValue, setCustomValue] = useState(
    serviceLevel?.customValue || "",
  );

  if (!service || !tier) return null;

  const handleAddLimit = () => {
    if (!newMetric.trim()) return;
    const parsedLimit = newLimit ? parseInt(newLimit, 10) : null;
    const isNumeric = parsedLimit !== null && !isNaN(parsedLimit);
    dispatch(
      addUsageLimit({
        tierId: tier.id,
        limitId: generateId(),
        serviceId: service.id,
        metric: newMetric.trim(),
        freeLimit: isNumeric ? parsedLimit : undefined,
        notes: !isNumeric && newLimit ? newLimit.trim() : undefined,
        metricType: "NON_CUMULATIVE" satisfies MetricType,
        accrualCycle: "MONTHLY" satisfies AccrualCycle,
        lastModified: new Date().toISOString(),
      }),
    );
    setNewMetric("");
    setNewLimit("");
    setIsAddingMetric(false);
  };

  const handleRemoveLimit = (limitId: string) => {
    dispatch(
      removeUsageLimit({
        tierId: tier.id,
        limitId,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-end z-50"
      style={{ animation: "panel-overlay-fade 0.2s ease-out" }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      <div
        ref={panelRef}
        className="w-96 h-full bg-white overflow-y-auto"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          animation: "panel-slide-in 0.2s ease-out",
        }}
      >
        <div className="bg-violet-600 text-white p-4">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[0.6875rem] uppercase tracking-[0.08em] opacity-80"
              style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
            >
              {tier.name} Tier
            </span>
            <button
              onClick={onClose}
              className="p-1 bg-transparent border-none text-white cursor-pointer rounded-md transition-all duration-150 hover:bg-white/20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h3
            id="panel-title"
            className="text-lg font-semibold"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            {service.title}
          </h3>
        </div>

        <div className="p-4 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label
                className="block text-[0.8125rem] font-semibold text-slate-700 mb-0"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Metrics
              </label>
              <button
                onClick={() => setIsAddingMetric(true)}
                className="text-[0.8125rem] font-semibold text-violet-600 bg-transparent border-none cursor-pointer transition-all duration-150 hover:text-violet-700"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                + Add Metric
              </button>
            </div>

            {usageLimits.map((limit) => (
              <MetricLimitItem
                key={limit.id}
                limit={limit}
                tierId={tier.id}
                dispatch={dispatch}
                onRemove={() => handleRemoveLimit(limit.id)}
              />
            ))}

            {usageLimits.length === 0 && !isAddingMetric && (
              <p className="text-[0.8125rem] italic text-slate-500">
                No metrics added yet. Metrics will appear as nested rows under
                this service in the matrix.
              </p>
            )}

            {isAddingMetric && (
              <div className="p-3 bg-violet-50 rounded-[10px] mb-3 [&>div]:mb-2.5 [&>div:last-child]:mb-0">
                <div>
                  <label
                    className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
                    style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
                  >
                    Metric Name
                  </label>
                  <input
                    type="text"
                    value={newMetric}
                    onChange={(e) => setNewMetric(e.target.value)}
                    placeholder="e.g., API Calls, Storage, Users"
                    className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                    autoFocus
                  />
                </div>
                <div>
                  <label
                    className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
                    style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
                  >
                    Value
                  </label>
                  <input
                    type="text"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    placeholder="e.g., 100, Unlimited, Custom"
                    className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  />
                  <p className="text-[0.6875rem] text-slate-400 mt-1">
                    Enter a value or leave empty
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddLimit}
                    disabled={!newMetric.trim()}
                    className="flex-1 py-2 px-3 text-[0.8125rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-violet-600 text-white border-none hover:enabled:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    Add Metric
                  </button>
                  <button
                    onClick={() => {
                      setNewMetric("");
                      setNewLimit("");
                      setIsAddingMetric(false);
                    }}
                    className="flex-1 py-2 px-3 text-[0.8125rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-slate-200 text-slate-700 border-none hover:bg-slate-300"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-sm font-semibold bg-violet-600 text-white border-none rounded-[10px] cursor-pointer transition-all duration-150 hover:bg-violet-700"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

interface MetricLimitItemProps {
  limit: ServiceUsageLimit;
  tierId: string;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
  onRemove: () => void;
}

function MetricLimitItem({
  limit,
  tierId,
  dispatch,
  onRemove,
}: MetricLimitItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMetric, setEditMetric] = useState(limit.metric);
  const [editUnitName, setEditUnitName] = useState(limit.unitName || "");
  const [editLimit, setEditLimit] = useState(
    limit.freeLimit?.toString() || limit.notes || "",
  );
  const [editPaidLimit, setEditPaidLimit] = useState(
    limit.paidLimit?.toString() || "",
  );
  const [editResetCycle, setEditResetCycle] = useState<AccrualCycle>(
    limit.accrualCycle || "MONTHLY",
  );
  const [editMetricType, setEditMetricType] = useState<MetricType>(
    limit.metricType || "NON_CUMULATIVE",
  );
  // Overage pricing state
  const [editUnitPrice, setEditUnitPrice] = useState(
    limit.unitPrice?.toString() || "",
  );
  const [editUnitPriceCurrency] = useState(limit.unitPriceCurrency || "USD");

  const handleSave = () => {
    const parsedLimit = editLimit ? parseInt(editLimit, 10) : null;
    const isNumeric = parsedLimit !== null && !isNaN(parsedLimit);
    const parsedPaidLimit = editPaidLimit ? parseInt(editPaidLimit, 10) : null;
    const isPaidNumeric = parsedPaidLimit !== null && !isNaN(parsedPaidLimit);
    const parsedUnitPrice = editUnitPrice ? parseFloat(editUnitPrice) : null;
    dispatch(
      updateUsageLimit({
        tierId,
        limitId: limit.id,
        metric: editMetric.trim() || limit.metric,
        unitName: editUnitName.trim() || undefined,
        freeLimit: isNumeric ? parsedLimit : undefined,
        paidLimit: isPaidNumeric ? parsedPaidLimit : undefined,
        notes: !isNumeric && editLimit ? editLimit.trim() : undefined,
        metricType: editMetricType,
        accrualCycle: editResetCycle,
        unitPrice: parsedUnitPrice,
        unitPriceCurrency: parsedUnitPrice ? editUnitPriceCurrency : undefined,
        lastModified: new Date().toISOString(),
      }),
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMetric(limit.metric);
    setEditUnitName(limit.unitName || "");
    setEditLimit(limit.freeLimit?.toString() || limit.notes || "");
    setEditPaidLimit(limit.paidLimit?.toString() || "");
    setEditResetCycle(limit.accrualCycle || "MONTHLY");
    setEditMetricType(limit.metricType || "NON_CUMULATIVE");
    setEditUnitPrice(limit.unitPrice?.toString() || "");
    setIsEditing(false);
  };

  // Format overage display string
  const getOverageDisplay = () => {
    if (!limit.unitPrice) return null;
    const unitLabel = limit.unitName || "unit";
    return `+${formatPrice(limit.unitPrice, limit.unitPriceCurrency || "USD")} per ${unitLabel}`;
  };

  const overageDisplay = getOverageDisplay();

  if (isEditing) {
    return (
      <div className="p-3 bg-violet-50 rounded-[10px] mb-3 [&>div]:mb-2.5 [&>div:last-child]:mb-0">
        <div>
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Metric Name
          </label>
          <input
            type="text"
            value={editMetric}
            onChange={(e) => setEditMetric(e.target.value)}
            placeholder="e.g., Number of Entities"
            className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            autoFocus
          />
        </div>
        <div>
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Unit Name
          </label>
          <input
            type="text"
            value={editUnitName}
            onChange={(e) => setEditUnitName(e.target.value)}
            placeholder="e.g., entity, credit card, contractor"
            className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          />
          <p className="text-[0.6875rem] text-slate-400 mt-1">
            Used for overage pricing display (e.g., "$50 per entity")
          </p>
        </div>
        <div>
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Free Limit
          </label>
          <input
            type="text"
            value={editLimit}
            onChange={(e) => setEditLimit(e.target.value)}
            placeholder="e.g., 100, Unlimited, Custom"
            className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          />
          <p className="text-[0.6875rem] text-slate-400 mt-1">
            Included free limit for this tier
          </p>
        </div>
        <div>
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Paid Limit
          </label>
          <input
            type="text"
            value={editPaidLimit}
            onChange={(e) => setEditPaidLimit(e.target.value)}
            placeholder="e.g., 500, 1000"
            className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          />
          <p className="text-[0.6875rem] text-slate-400 mt-1">
            Maximum paid usage beyond the free limit (optional)
          </p>
        </div>
        <div>
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Accrual Cycle
          </label>
          <select
            value={editResetCycle}
            onChange={(e) => setEditResetCycle(e.target.value as AccrualCycle)}
            className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] cursor-pointer"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="QUARTERLY">Quarterly</option>
            <option value="SEMI_ANNUAL">Semi-annual</option>
            <option value="ANNUAL">Annual</option>
          </select>
        </div>
        <div>
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Metric Type
          </label>
          <select
            value={editMetricType}
            onChange={(e) => setEditMetricType(e.target.value as MetricType)}
            className="w-full text-[0.8125rem] text-slate-900 bg-white border-[1.5px] border-slate-300 rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] cursor-pointer"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            <option value="NON_CUMULATIVE">Non-cumulative (persists)</option>
            <option value="CUMULATIVE">Cumulative (resets on settle)</option>
          </select>
        </div>
        <div className="mt-2 pt-3 border-t border-dashed border-slate-300">
          <label
            className="block text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-1"
            style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
          >
            Overage Pricing (Optional)
          </label>
          <p
            className="text-[0.6875rem] text-slate-400 mt-1"
            style={{ marginBottom: "0.5rem" }}
          >
            Set a price for usage beyond the included limit
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1">
              <span
                className="text-sm text-slate-500"
                style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
              >
                $
              </span>
              <input
                type="number"
                value={editUnitPrice}
                onChange={(e) => setEditUnitPrice(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-[4.5rem] text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-md py-1.5 px-2 outline-none transition-colors duration-150 focus:border-violet-600"
                style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
              />
            </div>
            <span className="text-xs text-slate-500">
              per {editUnitName || "unit"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-3 text-[0.8125rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-violet-600 text-white border-none hover:enabled:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 py-2 px-3 text-[0.8125rem] font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-slate-200 text-slate-700 border-none hover:bg-slate-300"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group/limititem flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-[10px] mb-3">
      <div
        className="flex-1 cursor-pointer p-1 -m-1 rounded-md transition-all duration-150 hover:bg-slate-200"
        onClick={() => setIsEditing(true)}
      >
        <div
          className="text-sm font-semibold text-slate-900"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
          {limit.metric}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[0.8125rem] text-slate-500">
            {limit.freeLimit != null
              ? `Free: ${limit.freeLimit}${limit.paidLimit != null ? ` / Paid: ${limit.paidLimit}` : ""}`
              : (limit.notes ?? "—")}
          </div>
          {limit.accrualCycle && (
            <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>
              Accrues {limit.accrualCycle.toLowerCase()}
              {limit.metricType
                ? ` · ${limit.metricType === "CUMULATIVE" ? "cumulative" : "non-cumulative"}`
                : ""}
            </div>
          )}
          {overageDisplay && (
            <div
              className="text-[0.6875rem] text-emerald-600 font-medium"
              style={{ fontFamily: "'DM Mono', 'SF Mono', monospace" }}
            >
              {overageDisplay}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover/limititem:opacity-100 transition-all duration-150">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 bg-transparent border-none text-slate-400 cursor-pointer rounded-md transition-all duration-150 hover:bg-slate-200 hover:text-violet-600"
          title="Edit metric"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          onClick={onRemove}
          className="p-1 bg-transparent border-none text-slate-400 cursor-pointer rounded-md transition-all duration-150 hover:bg-slate-200 hover:text-rose-600"
          title="Remove metric"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
