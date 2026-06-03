import { useState, useMemo, useEffect } from "react";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  ServiceOfferingDocument,
  ServiceOfferingAction,
  Service,
  OptionGroup,
  BillingCycle,
  GroupCostType,
  DiscountType,
} from "document-models/service-offering";
import {
  BILLING_CYCLE_SHORT_LABELS,
  BILLING_CYCLE_MONTHS,
  formatPrice,
  calculateEffectiveSetupPrice,
} from "./pricing-utils.js";
import {
  addService,
  updateService,
  deleteService,
  addOptionGroup,
  updateOptionGroup,
  deleteOptionGroup,
  addServiceLevel,
  removeServiceLevel,
  setOptionGroupStandalonePricing,
  addOptionGroupTierPricing,
  updateOptionGroupTierPricing,
} from "../../../document-models/service-offering/v1/gen/creators.js";
import { InfoIcon } from "./InfoIcon.js";
import { ConfirmDialog } from "./ConfirmDialog.js";

// Service Templates - Common services to reduce friction (Default Effect + Reduced Activation Energy)
interface ServiceTemplate {
  title: string;
  description: string;
  category: "setup" | "recurring" | "addon";
  icon: string;
}

const SERVICE_TEMPLATES: Record<string, ServiceTemplate[]> = {
  "Setup & Formation": [
    {
      title: "Swiss association entity",
      description: "Legal entity formation as a Swiss association",
      category: "setup",
      icon: "🏛️",
    },
    {
      title: "Registered address (Zug)",
      description: "Official registered address in Zug, Switzerland",
      category: "setup",
      icon: "📍",
    },
    {
      title: "Legal document templates",
      description: "Access to standardized legal document templates",
      category: "setup",
      icon: "📋",
    },
  ],
  "Operations & Finance": [
    {
      title: "Invoice management",
      description: "Professional invoice processing and management",
      category: "recurring",
      icon: "📄",
    },
    {
      title: "Annual tax filing",
      description: "Yearly tax preparation and filing services",
      category: "recurring",
      icon: "💰",
    },
    {
      title: "Monthly accounting & close",
      description: "Monthly bookkeeping and financial close",
      category: "recurring",
      icon: "📊",
    },
  ],
  "Contributor & Payments": [
    {
      title: "Contributor operations",
      description: "Management of contributor payments and operations",
      category: "recurring",
      icon: "👥",
    },
    {
      title: "Multi-currency payouts",
      description: "Support for payments in multiple currencies",
      category: "recurring",
      icon: "💱",
    },
    {
      title: "Multiple entities",
      description: "Support for managing multiple legal entities",
      category: "recurring",
      icon: "🏢",
    },
  ],
  "Support & Advisory": [
    {
      title: "Dedicated ops support",
      description: "Dedicated operations support team",
      category: "addon",
      icon: "🎯",
    },
    {
      title: "Dedicated account manager",
      description: "Personal point of contact for all needs",
      category: "addon",
      icon: "👤",
    },
  ],
};
import type { ServiceSubscriptionTier } from "../../../document-models/service-offering/v1/gen/schema/types.js";

const fontSans = { fontFamily: "'DM Sans', system-ui, sans-serif" };
const fontMono = { fontFamily: "'DM Mono', 'SF Mono', monospace" };

interface ServiceCatalogProps {
  document: ServiceOfferingDocument;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
}

export function ServiceCatalog({ document, dispatch }: ServiceCatalogProps) {
  const { state } = document;
  const services = state.global.services ?? [];
  const optionGroups = state.global.optionGroups ?? [];
  const tiers = state.global.tiers ?? [];

  // Local UI state
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "" });
  const [selectedTierIds, setSelectedTierIds] = useState<Set<string>>(
    new Set(),
  );

  // Edit group modal state
  const [editingGroup, setEditingGroup] = useState<OptionGroup | null>(null);
  const [editGroupName, setEditGroupName] = useState("");
  const [editGroupType, setEditGroupType] = useState<
    "setup" | "recurring" | "addon"
  >("recurring");
  const [editGroupPrice, setEditGroupPrice] = useState("");
  const [editGroupBillingCycles, setEditGroupBillingCycles] = useState<
    BillingCycle[]
  >(["MONTHLY"]);
  const [editGroupPricingMode, setEditGroupPricingMode] = useState<
    "STANDALONE" | "TIER_DEPENDENT" | null
  >(null);
  const [editGroupSetupCost, setEditGroupSetupCost] = useState("");
  const [editGroupBasePrice, setEditGroupBasePrice] = useState("");
  const [editGroupDiscounts, setEditGroupDiscounts] = useState<
    Record<BillingCycle, string>
  >({
    MONTHLY: "",
    QUARTERLY: "",
    SEMI_ANNUAL: "",
    ANNUAL: "",
    ONE_TIME: "",
  });

  // Per-tier pricing state for edit modal
  const [editTierTab, setEditTierTab] = useState<string | null>(null);
  const [editTierPrices, setEditTierPrices] = useState<Record<string, string>>(
    {},
  );
  const [editTierSetupCosts, setEditTierSetupCosts] = useState<
    Record<string, string>
  >({});
  const [editTierDiscounts, setEditTierDiscounts] = useState<
    Record<string, Record<BillingCycle, string>>
  >({});

  // Per-tier setup fee discounts: tierId → billingCycle → { discountType, discountValue }
  const [editSetupTierDiscounts, setEditSetupTierDiscounts] = useState<
    Record<
      string,
      Record<
        BillingCycle,
        { discountType: DiscountType; discountValue: string }
      >
    >
  >({});

  // Service templates quick-add state
  const [showServiceTemplates, setShowServiceTemplates] = useState(false);

  // Destructive action confirmation state
  const [pendingDeleteGroupId, setPendingDeleteGroupId] = useState<
    string | null
  >(null);
  const [pendingDeleteServiceId, setPendingDeleteServiceId] = useState<
    string | null
  >(null);

  // Get services that belong to a specific group (via service.optionGroupId)
  const getServicesForGroup = (groupId: string): Service[] => {
    return services.filter((s) => s.optionGroupId === groupId);
  };

  // Get ungrouped services (services without an optionGroupId)
  const ungroupedServices = useMemo(() => {
    return services.filter((s) => !s.optionGroupId);
  }, [services]);

  // Categorize option groups based on schema costType
  const setupGroups = useMemo(() => {
    return optionGroups.filter((g) => g.costType === "SETUP");
  }, [optionGroups]);

  const regularGroups = useMemo(() => {
    return optionGroups.filter((g) => g.costType !== "SETUP" && !g.isAddOn);
  }, [optionGroups]);

  const addonGroups = useMemo(() => {
    return optionGroups.filter((g) => g.isAddOn);
  }, [optionGroups]);

  const handleAddNewGroup = () => {
    const groupId = generateId();
    const inheritedCycles: BillingCycle[] =
      state.global.availableBillingCycles?.length > 0
        ? [...state.global.availableBillingCycles]
        : ["MONTHLY"];

    dispatch(
      addOptionGroup({
        id: groupId,
        name: "New Group",
        isAddOn: false,
        defaultSelected: true,
        costType: "RECURRING",
        availableBillingCycles: inheritedCycles,
        lastModified: new Date().toISOString(),
      }),
    );

    // Construct minimal group shape to open Edit modal immediately
    // (handleOpenEditGroup reads from the group object, not from state)
    const newGroup = {
      id: groupId,
      name: "New Group",
      isAddOn: false,
      defaultSelected: true,
      costType: "RECURRING",
      availableBillingCycles: inheritedCycles,
      price: null,
      pricingMode: null,
      standalonePricing: null,
      tierDependentPricing: [],
      billingCycleDiscounts: [],
      services: [],
    } as unknown as OptionGroup;

    handleOpenEditGroup(newGroup);
    setSelectedGroupId(groupId);
  };

  const handleDeleteGroup = (groupId: string) => {
    setPendingDeleteGroupId(groupId);
  };

  const confirmDeleteGroup = () => {
    if (!pendingDeleteGroupId) return;
    dispatch(
      deleteOptionGroup({
        id: pendingDeleteGroupId,
        lastModified: new Date().toISOString(),
      }),
    );
    if (selectedGroupId === pendingDeleteGroupId) {
      setSelectedGroupId(null);
    }
    setPendingDeleteGroupId(null);
  };

  const handleOpenEditGroup = (group: OptionGroup) => {
    setEditingGroup(group);
    setEditGroupName(group.name);
    const groupType =
      group.costType === "SETUP"
        ? "setup"
        : group.isAddOn
          ? "addon"
          : "recurring";
    setEditGroupType(groupType);
    setEditGroupPrice(group.price?.toString() || "");

    // Initialize per-tier setup fee discounts from tier-dependent pricing
    const SUBSCRIPTION_CYCLES: BillingCycle[] = [
      "MONTHLY",
      "QUARTERLY",
      "SEMI_ANNUAL",
      "ANNUAL",
    ];
    const setupTierDiscounts: Record<
      string,
      Record<
        BillingCycle,
        { discountType: DiscountType; discountValue: string }
      >
    > = {};
    for (const tier of tiers) {
      const emptyDiscounts = Object.fromEntries(
        SUBSCRIPTION_CYCLES.map((c) => [
          c,
          { discountType: "PERCENTAGE", discountValue: "" },
        ]),
      ) as Record<
        BillingCycle,
        { discountType: DiscountType; discountValue: string }
      >;
      const tierPricingEntry = group.tierDependentPricing?.find(
        (tp) => tp.tierId === tier.id,
      );
      if (tierPricingEntry?.setupCostDiscounts) {
        tierPricingEntry.setupCostDiscounts.forEach((d) => {
          if (d.billingCycle && d.discountRule) {
            emptyDiscounts[d.billingCycle] = {
              discountType: d.discountRule.discountType,
              discountValue: d.discountRule.discountValue?.toString() || "",
            };
          }
        });
      }
      setupTierDiscounts[tier.id] = emptyDiscounts;
    }
    setEditSetupTierDiscounts(setupTierDiscounts);

    setEditGroupBillingCycles(
      group.availableBillingCycles?.length > 0
        ? group.availableBillingCycles
        : ["MONTHLY"],
    );

    // Determine pricing mode: regular groups always per-tier, add-ons use their mode
    const isRegular = groupType === "recurring";
    if (isRegular && tiers.length > 0) {
      setEditGroupPricingMode("TIER_DEPENDENT");
    } else if (group.isAddOn) {
      setEditGroupPricingMode(group.pricingMode || "STANDALONE");
    } else {
      setEditGroupPricingMode("STANDALONE");
    }

    // Initialize standalone pricing (for add-ons in STANDALONE mode or fallback)
    setEditGroupSetupCost(
      group.standalonePricing?.setupCost?.amount?.toString() || "",
    );
    const monthlyPricing = group.standalonePricing?.recurringPricing?.find(
      (p) => p.billingCycle === "MONTHLY",
    );
    setEditGroupBasePrice(monthlyPricing?.amount?.toString() || "");

    // Initialize per-group billing cycle discounts (flat amount only)
    const discounts: Record<BillingCycle, string> = {
      MONTHLY: "",
      QUARTERLY: "",
      SEMI_ANNUAL: "",
      ANNUAL: "",
      ONE_TIME: "",
    };
    group.billingCycleDiscounts?.forEach((d) => {
      if (d.billingCycle && d.discountRule?.discountValue) {
        discounts[d.billingCycle] = d.discountRule.discountValue.toString();
      }
    });
    setEditGroupDiscounts(discounts);

    // Initialize per-tier pricing state
    const tierPrices: Record<string, string> = {};
    const tierSetupCosts: Record<string, string> = {};
    const tierDiscounts: Record<string, Record<BillingCycle, string>> = {};

    for (const tier of tiers) {
      const tierPricingEntry = group.tierDependentPricing?.find(
        (tp) => tp.tierId === tier.id,
      );
      const tierMonthlyPricing = tierPricingEntry?.recurringPricing?.find(
        (p) => p.billingCycle === "MONTHLY",
      );
      // If no tier pricing exists but group has standalone pricing, use standalone as starting point
      if (tierPricingEntry) {
        tierPrices[tier.id] = tierMonthlyPricing?.amount?.toString() || "";
        tierSetupCosts[tier.id] =
          tierPricingEntry.setupCost?.amount?.toString() || "";
      } else if (monthlyPricing) {
        // Pre-fill from standalone as migration aid
        tierPrices[tier.id] = monthlyPricing.amount?.toString() || "";
        tierSetupCosts[tier.id] =
          group.standalonePricing?.setupCost?.amount?.toString() || "";
      } else {
        tierPrices[tier.id] = "";
        tierSetupCosts[tier.id] = "";
      }

      // Per-tier discounts: populate from tierDependentPricing[].recurringPricing[].discount
      const tierDiscountValues: Record<BillingCycle, string> = {
        MONTHLY: "",
        QUARTERLY: "",
        SEMI_ANNUAL: "",
        ANNUAL: "",
        ONE_TIME: "",
      };
      if (tierPricingEntry) {
        tierPricingEntry.recurringPricing?.forEach((rp) => {
          if (rp.discount && rp.discount.discountValue > 0) {
            tierDiscountValues[rp.billingCycle] =
              rp.discount.discountValue.toString();
          }
        });
      }
      tierDiscounts[tier.id] = tierDiscountValues;
    }

    setEditTierPrices(tierPrices);
    setEditTierSetupCosts(tierSetupCosts);
    setEditTierDiscounts(tierDiscounts);
    setEditTierTab(tiers.length > 0 ? tiers[0].id : null);
  };

  const handleSaveGroupEdit = () => {
    if (!editingGroup || !editGroupName.trim()) return;

    const isSetup = editGroupType === "setup";
    const isAddOn = editGroupType === "addon";
    const costType: GroupCostType = isSetup ? "SETUP" : "RECURRING";
    const price = editGroupPrice ? parseFloat(editGroupPrice) : null;

    // Update the option group in the document
    dispatch(
      updateOptionGroup({
        id: editingGroup.id,
        name: editGroupName.trim(),
        isAddOn,
        defaultSelected: !isAddOn,
        costType,
        availableBillingCycles: isSetup ? ["ONE_TIME"] : editGroupBillingCycles,
        price: price ?? undefined,
        currency: price ? "USD" : undefined,
        lastModified: new Date().toISOString(),
      }),
    );

    // Save setup pricing: base cost via standalone, per-tier discounts via tier pricing
    if (isSetup && price && price > 0) {
      const now = new Date().toISOString();
      // Store base setup cost via standalone pricing
      dispatch(
        setOptionGroupStandalonePricing({
          optionGroupId: editingGroup.id,
          setupCost: { amount: price, currency: "USD" },
          recurringPricing: [],
          lastModified: now,
        }),
      );

      // Store per-tier setup fee discounts
      for (const tier of tiers) {
        if (tier.isCustomPricing) continue;
        const tierDiscountEntries = editSetupTierDiscounts[tier.id];
        const setupCostDiscounts = Object.entries(tierDiscountEntries || {})
          .filter(([, d]) => parseFloat(d.discountValue) > 0)
          .map(([cycle, d]) => ({
            billingCycle: cycle as BillingCycle,
            discountRule: {
              discountType: "PERCENTAGE" as const,
              discountValue: parseFloat(d.discountValue),
            },
          }));

        const existingTierPricing = editingGroup.tierDependentPricing?.find(
          (tp) => tp.tierId === tier.id,
        );
        if (existingTierPricing) {
          dispatch(
            updateOptionGroupTierPricing({
              optionGroupId: editingGroup.id,
              tierId: tier.id,
              setupCost: { amount: price, currency: "USD" },
              setupCostDiscounts,
              recurringPricing: [],
              lastModified: now,
            }),
          );
        } else {
          dispatch(
            addOptionGroupTierPricing({
              optionGroupId: editingGroup.id,
              tierPricingId: generateId(),
              tierId: tier.id,
              setupCost: { amount: price, currency: "USD" },
              setupCostDiscounts,
              recurringPricing: [],
              lastModified: now,
            }),
          );
        }
      }
    }

    // Save pricing based on mode
    if (!isSetup && editGroupPricingMode === "TIER_DEPENDENT") {
      // Per-tier pricing: dispatch addOptionGroupTierPricing or updateOptionGroupTierPricing per tier
      const now = new Date().toISOString();
      for (const tier of tiers) {
        if (tier.isCustomPricing) continue; // Skip custom tiers

        const baseMonthly = parseFloat(editTierPrices[tier.id]) || 0;
        const setupCostVal = parseFloat(editTierSetupCosts[tier.id]) || 0;
        const setupCost =
          setupCostVal > 0
            ? { amount: setupCostVal, currency: "USD" as const }
            : undefined;

        const recurringPricing = editGroupBillingCycles
          .filter(() => baseMonthly > 0)
          .map((cycle) => {
            const discountPct =
              parseFloat(editTierDiscounts[tier.id]?.[cycle] || "0") || 0;
            return {
              id: generateId(),
              billingCycle: cycle,
              amount: baseMonthly,
              currency: "USD" as const,
              discount:
                discountPct > 0
                  ? {
                      discountType: "PERCENTAGE" as const,
                      discountValue: discountPct,
                    }
                  : undefined,
            };
          });

        const existingTierPricing = editingGroup.tierDependentPricing?.find(
          (tp) => tp.tierId === tier.id,
        );

        if (existingTierPricing) {
          dispatch(
            updateOptionGroupTierPricing({
              optionGroupId: editingGroup.id,
              tierId: tier.id,
              setupCost,
              recurringPricing,
              lastModified: now,
            }),
          );
        } else {
          dispatch(
            addOptionGroupTierPricing({
              optionGroupId: editingGroup.id,
              tierPricingId: generateId(),
              tierId: tier.id,
              setupCost,
              recurringPricing,
              lastModified: now,
            }),
          );
        }
      }
    } else if (!isSetup && editGroupPricingMode === "STANDALONE") {
      // Standalone pricing (add-ons or groups with no tiers)
      const setupCost =
        editGroupSetupCost && parseFloat(editGroupSetupCost) > 0
          ? {
              amount: parseFloat(editGroupSetupCost),
              currency: "USD" as const,
            }
          : undefined;

      const baseMonthly = parseFloat(editGroupBasePrice) || 0;
      const recurringPricing = editGroupBillingCycles
        .filter(() => baseMonthly > 0)
        .map((cycle) => ({
          id: generateId(),
          billingCycle: cycle,
          amount: baseMonthly,
          currency: "USD" as const,
        }));

      const billingCycleDiscounts = editGroupBillingCycles
        .map((cycle) => {
          const discountPct = parseFloat(editGroupDiscounts[cycle]) || 0;
          return {
            billingCycle: cycle,
            discountRule: {
              discountType: "PERCENTAGE" as const,
              discountValue: discountPct,
            },
          };
        })
        .filter((d) => d.discountRule.discountValue > 0);

      dispatch(
        setOptionGroupStandalonePricing({
          optionGroupId: editingGroup.id,
          setupCost,
          recurringPricing,
          billingCycleDiscounts,
          lastModified: new Date().toISOString(),
        }),
      );
    }

    // Update all services in this group to reflect the new setup status
    const groupServices = getServicesForGroup(editingGroup.id);
    groupServices.forEach((service) => {
      if (service.isSetupFormation !== isSetup) {
        dispatch(
          updateService({
            id: service.id,
            isSetupFormation: isSetup,
            lastModified: new Date().toISOString(),
          }),
        );
      }
    });

    setEditingGroup(null);
  };

  const handleAddService = () => {
    if (!newService.title.trim()) return;

    const serviceId = generateId();
    const now = new Date().toISOString();

    // Determine if this is a setup service based on the selected group's costType
    const isSetupFormation = selectedGroup?.costType === "SETUP";

    // Add the service with optionGroupId directly on the service
    dispatch(
      addService({
        id: serviceId,
        title: newService.title.trim(),
        description: newService.description.trim() || undefined,
        isSetupFormation,
        optionGroupId: selectedGroupId || undefined,
        lastModified: now,
      }),
    );

    // Create ServiceLevelBindings for each selected tier
    selectedTierIds.forEach((tierId) => {
      dispatch(
        addServiceLevel({
          serviceLevelId: generateId(),
          serviceId,
          tierId,
          level: "INCLUDED",
          optionGroupId: selectedGroupId || undefined,
          lastModified: now,
        }),
      );
    });

    setNewService({ title: "", description: "" });
    setSelectedTierIds(new Set());
    setIsAddingService(false);
  };

  // Quick-add service from template (reduces activation energy)
  const handleAddFromTemplate = (template: ServiceTemplate) => {
    if (!selectedGroupId) return;

    const serviceId = generateId();
    const now = new Date().toISOString();

    const isSetupFormation = selectedGroup?.costType === "SETUP";

    dispatch(
      addService({
        id: serviceId,
        title: template.title,
        description: template.description,
        isSetupFormation,
        optionGroupId: selectedGroupId,
        lastModified: now,
      }),
    );

    // Auto-include in all tiers for convenience (can be changed later)
    tiers.forEach((tier) => {
      dispatch(
        addServiceLevel({
          serviceLevelId: generateId(),
          serviceId,
          tierId: tier.id,
          level: "INCLUDED",
          optionGroupId: selectedGroupId,
          lastModified: now,
        }),
      );
    });

    setShowServiceTemplates(false);
  };

  const handleUpdateService = (
    service: Service,
    updates: Partial<
      Pick<
        Service,
        "title" | "description" | "isSetupFormation" | "optionGroupId"
      >
    >,
  ) => {
    dispatch(
      updateService({
        id: service.id,
        ...updates,
        lastModified: new Date().toISOString(),
      }),
    );
  };

  const handleToggleTier = (
    serviceId: string,
    tierId: string,
    isIncluded: boolean,
  ) => {
    const now = new Date().toISOString();
    const tier = tiers.find((t) => t.id === tierId);
    if (!tier) return;

    // Find existing service level binding for this service-tier combo
    const existingBinding = tier.serviceLevels.find(
      (sl) => sl.serviceId === serviceId,
    );

    if (isIncluded) {
      // Add or update service level binding
      if (existingBinding) {
        // Service level exists, might need to update it if level changed
        // (for now we just use INCLUDED)
      } else {
        // Create new service level binding
        const service = services.find((s) => s.id === serviceId);
        dispatch(
          addServiceLevel({
            serviceLevelId: generateId(),
            serviceId,
            tierId,
            level: "INCLUDED",
            optionGroupId: service?.optionGroupId || undefined,
            lastModified: now,
          }),
        );
      }
    } else {
      // Remove service level binding
      if (existingBinding) {
        dispatch(
          removeServiceLevel({
            serviceLevelId: existingBinding.id,
            tierId,
            lastModified: now,
          }),
        );
      }
    }
  };

  const handleDeleteService = (serviceId: string) => {
    setPendingDeleteServiceId(serviceId);
  };

  const confirmDeleteService = () => {
    if (!pendingDeleteServiceId) return;
    dispatch(
      deleteService({
        id: pendingDeleteServiceId,
        lastModified: new Date().toISOString(),
      }),
    );
    setPendingDeleteServiceId(null);
  };

  // Get displayed services based on selection
  const displayedServices = useMemo(() => {
    if (selectedGroupId) {
      return getServicesForGroup(selectedGroupId);
    }
    return ungroupedServices;
  }, [selectedGroupId, services, ungroupedServices]);

  // Get selected group info
  const selectedGroup = selectedGroupId
    ? optionGroups.find((g) => g.id === selectedGroupId)
    : null;

  return (
    <>
      {/* Edit Group Modal */}
      {editingGroup && (
        <div
          className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[1000]"
          style={{ animation: "so-fade-in 150ms ease-out" }}
          onClick={() => setEditingGroup(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-[420px] max-h-[90vh] flex flex-col"
            style={{ animation: "so-scale-in 200ms ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <h3
                className="text-lg font-semibold text-slate-800 m-0 tracking-[-0.01em]"
                style={fontSans}
              >
                Edit Group
                <InfoIcon content="Standalone: same price for all tiers. Tier-Dependent: different price per tier. Choose Tier-Dependent when you want to offer volume discounts at higher tiers." />
              </h3>
              <button
                onClick={() => setEditingGroup(null)}
                className="w-8 h-8 rounded-[10px] bg-transparent border-none text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                  style={fontSans}
                >
                  Group Name
                </label>
                <input
                  type="text"
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md transition-all duration-150 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                  style={fontSans}
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-slate-500"
                  style={fontSans}
                >
                  Category
                </span>
                <div className="flex gap-1.5">
                  {[
                    { type: "setup" as const, label: "Setup", color: "amber" },
                    {
                      type: "recurring" as const,
                      label: "Recurring",
                      color: "emerald",
                    },
                    {
                      type: "addon" as const,
                      label: "Add-on",
                      color: "violet",
                    },
                  ].map(({ type, label, color }) => (
                    <button
                      key={type}
                      onClick={() => setEditGroupType(type)}
                      className={`flex-1 px-2.5 py-2 text-xs font-semibold rounded-md border-[1.5px] cursor-pointer transition-all duration-150 ${
                        editGroupType === type
                          ? color === "amber"
                            ? "border-amber-500 bg-amber-50 text-amber-700"
                            : color === "emerald"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-violet-500 bg-violet-50 text-violet-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                      style={fontSans}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {editGroupType !== "setup" && (
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                    style={fontSans}
                  >
                    Available Billing Cycles
                  </label>
                  <div className="flex flex-col gap-2.5 p-3 bg-slate-50 rounded-[10px]">
                    {(
                      Object.entries(BILLING_CYCLE_SHORT_LABELS) as [
                        BillingCycle,
                        string,
                      ][]
                    )
                      .filter(([value]) => value !== "ONE_TIME")
                      .map(([value, label]) => (
                        <label
                          key={value}
                          className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={editGroupBillingCycles.includes(value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditGroupBillingCycles([
                                  ...editGroupBillingCycles,
                                  value,
                                ]);
                              } else {
                                setEditGroupBillingCycles(
                                  editGroupBillingCycles.filter(
                                    (c) => c !== value,
                                  ),
                                );
                              }
                            }}
                            className="cursor-pointer w-4 h-4"
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                  </div>
                </div>
              )}

              {/* Per-Tier Pricing (regular groups with tiers) */}
              {editGroupType === "recurring" &&
                editGroupPricingMode === "TIER_DEPENDENT" &&
                tiers.length > 0 && (
                  <>
                    {/* Tier Tab Bar */}
                    <div className="flex gap-0 border-b border-slate-200 mb-3 overflow-x-auto sticky top-0 bg-white z-10">
                      {tiers.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setEditTierTab(tier.id)}
                          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-none border-none border-b-2 cursor-pointer whitespace-nowrap transition-all duration-150 ${
                            editTierTab === tier.id
                              ? "text-violet-700 border-b-violet-600 font-semibold"
                              : "text-slate-500 border-b-transparent hover:text-slate-700 hover:bg-slate-50"
                          } ${tier.isCustomPricing ? "italic" : ""}`}
                          style={fontSans}
                        >
                          {tier.name}
                          {tier.isCustomPricing && (
                            <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.04em] text-amber-600 bg-amber-50 px-[5px] py-px rounded-full">
                              Custom
                            </span>
                          )}
                          {!tier.isCustomPricing &&
                            editTierPrices[tier.id] &&
                            parseFloat(editTierPrices[tier.id]) > 0 && (
                              <span
                                className="text-[0.6875rem] text-emerald-600 font-semibold"
                                style={fontMono}
                              >
                                {formatPrice(
                                  parseFloat(editTierPrices[tier.id]),
                                )}
                              </span>
                            )}
                          {!tier.isCustomPricing &&
                            (!editTierPrices[tier.id] ||
                              parseFloat(editTierPrices[tier.id]) <= 0) && (
                              <span
                                className="text-[0.6875rem] text-amber-500 font-medium"
                                style={fontMono}
                              >
                                $0
                              </span>
                            )}
                        </button>
                      ))}
                    </div>

                    {/* Active Tier Tab Content */}
                    {editTierTab &&
                      (() => {
                        const activeTier = tiers.find(
                          (t) => t.id === editTierTab,
                        );
                        if (!activeTier) return null;

                        // Custom tier: no price input
                        if (activeTier.isCustomPricing) {
                          return (
                            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-md text-xs text-slate-500 italic">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                width="16"
                                height="16"
                              >
                                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>
                                Price negotiated per customer. No group-level
                                price input for custom tiers.
                              </span>
                            </div>
                          );
                        }

                        const tierBase =
                          parseFloat(editTierPrices[activeTier.id]) || 0;
                        const tierAmount = activeTier.pricing.amount ?? 0;

                        // Budget: sum of other groups' prices for this tier
                        const otherGroupsTotal = regularGroups
                          .filter(
                            (g) => editingGroup && g.id !== editingGroup.id,
                          )
                          .reduce((sum, g) => {
                            const tp = g.tierDependentPricing?.find(
                              (p) => p.tierId === activeTier.id,
                            );
                            const mp = tp?.recurringPricing?.find(
                              (p) => p.billingCycle === "MONTHLY",
                            );
                            if (mp) return sum + (mp.amount ?? 0);
                            // Fallback to standalone
                            const sp =
                              g.standalonePricing?.recurringPricing?.find(
                                (p) => p.billingCycle === "MONTHLY",
                              );
                            return sum + (sp?.amount ?? 0);
                          }, 0);
                        const projectedTotal = otherGroupsTotal + tierBase;

                        return (
                          <div
                            style={{ animation: "catalog__fade-in 0.15s ease" }}
                          >
                            {/* Recurring Price for this tier */}
                            <div className="flex flex-col gap-1.5">
                              <label
                                className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                                style={fontSans}
                              >
                                Recurring Price ({activeTier.name})
                              </label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">
                                  $
                                </span>
                                <input
                                  type="number"
                                  value={editTierPrices[activeTier.id] || ""}
                                  onChange={(e) =>
                                    setEditTierPrices({
                                      ...editTierPrices,
                                      [activeTier.id]: e.target.value,
                                    })
                                  }
                                  placeholder="0.00"
                                  className="flex-1 px-2.5 py-2 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                                  style={fontSans}
                                  step="0.01"
                                />
                              </div>
                            </div>

                            {/* Budget indicator -- only in MANUAL_OVERRIDE mode (CALCULATED tier has no fixed budget) */}
                            {tierAmount > 0 &&
                              activeTier.pricingMode !== "CALCULATED" && (
                                <div className="mt-2 p-2 px-2.5 bg-slate-50 border border-slate-200 rounded-md">
                                  <span className="block text-[0.6875rem] font-semibold text-slate-700 mb-1.5">
                                    {activeTier.name} budget:{" "}
                                    {formatPrice(projectedTotal)}/mo of{" "}
                                    {formatPrice(tierAmount)}/mo
                                  </span>
                                  <div className="flex items-center gap-1.5 py-[3px]">
                                    <div className="flex-1 h-[5px] bg-slate-200 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full transition-[width] duration-200 ease-linear ${projectedTotal > tierAmount ? "bg-rose-500" : "bg-emerald-500"}`}
                                        style={{
                                          width: `${Math.min((projectedTotal / tierAmount) * 100, 100)}%`,
                                        }}
                                      />
                                    </div>
                                    <span
                                      className={`shrink-0 text-[0.625rem] ${projectedTotal > tierAmount ? "text-rose-600 font-semibold" : "text-slate-600"}`}
                                      style={fontMono}
                                    >
                                      {formatPrice(projectedTotal)} /{" "}
                                      {formatPrice(tierAmount)}
                                      {projectedTotal > tierAmount && (
                                        <span className="text-rose-500 font-bold">
                                          {" "}
                                          +
                                          {formatPrice(
                                            projectedTotal - tierAmount,
                                          )}
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              )}

                            {/* Setup Cost for this tier */}
                            <div className="flex flex-col gap-1.5">
                              <label
                                className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                                style={fontSans}
                              >
                                Setup Cost (one-time)
                              </label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">
                                  $
                                </span>
                                <input
                                  type="number"
                                  value={
                                    editTierSetupCosts[activeTier.id] || ""
                                  }
                                  onChange={(e) =>
                                    setEditTierSetupCosts({
                                      ...editTierSetupCosts,
                                      [activeTier.id]: e.target.value,
                                    })
                                  }
                                  placeholder="0.00"
                                  className="flex-1 px-2.5 py-2 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                                  style={fontSans}
                                  step="0.01"
                                />
                              </div>
                            </div>

                            {/* Billing Cycles & Discounts for this tier */}
                            {editGroupBillingCycles.length > 0 &&
                              tierBase > 0 && (
                                <div className="flex flex-col gap-1.5">
                                  <label
                                    className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                                    style={fontSans}
                                  >
                                    Billing Cycles & Discounts
                                  </label>
                                  <div className="flex flex-col gap-2">
                                    {editGroupBillingCycles.map((cycle) => {
                                      const months =
                                        BILLING_CYCLE_MONTHS[cycle];
                                      const total = tierBase * months;
                                      const isMonthly = cycle === "MONTHLY";
                                      const cycleLabel = {
                                        MONTHLY: "Monthly",
                                        QUARTERLY: "Quarterly",
                                        SEMI_ANNUAL: "Semi-Annual",
                                        ANNUAL: "Annual",
                                        ONE_TIME: "One-Time",
                                      }[cycle];

                                      // Percentage discount from user input (always editable)
                                      const discountPct =
                                        parseFloat(
                                          editTierDiscounts[activeTier.id]?.[
                                            cycle
                                          ] || "0",
                                        ) || 0;

                                      let effective: number | null = null;
                                      let savingsPct = 0;

                                      if (discountPct > 0) {
                                        effective =
                                          total * (1 - discountPct / 100);
                                        savingsPct = Math.round(discountPct);
                                      }

                                      return (
                                        <div
                                          key={cycle}
                                          className="border border-slate-200 rounded-[10px] px-3.5 py-2.5 bg-white"
                                        >
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-sm font-semibold text-slate-700">
                                              {cycleLabel}
                                            </span>
                                            <span
                                              className="text-[0.9375rem] font-bold text-slate-800"
                                              style={fontMono}
                                            >
                                              {formatPrice(total, "USD")}
                                            </span>
                                          </div>
                                          {!isMonthly && (
                                            <div className="flex gap-4 mt-2 pt-2 border-t border-dashed border-slate-200">
                                              <div className="flex-1 flex flex-col gap-0.5">
                                                <span
                                                  className="text-[0.625rem] font-medium uppercase tracking-[0.06em] text-violet-500"
                                                  style={fontMono}
                                                >
                                                  Standard Price
                                                </span>
                                                <span className="text-[0.8125rem] text-slate-600 flex items-baseline gap-1.5">
                                                  ${tierBase} &times; {months}mo
                                                  <span className="font-semibold text-slate-700">
                                                    {formatPrice(total, "USD")}
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="flex-1 flex flex-col gap-0.5">
                                                <span
                                                  className="text-[0.625rem] font-medium uppercase tracking-[0.06em] text-violet-500"
                                                  style={fontMono}
                                                >
                                                  Discount
                                                </span>
                                                <div className="flex items-center border border-slate-200 rounded-[10px] overflow-hidden transition-all duration-150 h-[34px] focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]">
                                                  <input
                                                    type="number"
                                                    value={
                                                      editTierDiscounts[
                                                        activeTier.id
                                                      ]?.[cycle] || ""
                                                    }
                                                    onChange={(e) => {
                                                      const updated = {
                                                        ...editTierDiscounts,
                                                      };
                                                      updated[activeTier.id] = {
                                                        ...updated[
                                                          activeTier.id
                                                        ],
                                                        [cycle]: e.target.value,
                                                      };
                                                      setEditTierDiscounts(
                                                        updated,
                                                      );
                                                    }}
                                                    placeholder="0"
                                                    step="0.1"
                                                    min="0"
                                                    max="100"
                                                    className="flex-1 py-1.5 px-2 pr-1 border-none text-sm text-slate-700 bg-transparent outline-none min-w-0 placeholder:text-slate-400"
                                                    style={fontMono}
                                                  />
                                                  <span className="px-3 py-2.5 pl-2 text-sm font-medium text-slate-400 bg-slate-50 whitespace-nowrap select-none">
                                                    %
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          {effective !== null && (
                                            <div className="flex items-center gap-2 mt-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-md">
                                              <span className="text-[0.8125rem] text-emerald-600">
                                                &rarr;
                                              </span>
                                              <span
                                                className="text-sm font-bold text-emerald-700"
                                                style={fontMono}
                                              >
                                                {formatPrice(effective, "USD")}
                                              </span>
                                              {savingsPct > 0 && (
                                                <span
                                                  className="ml-auto text-[0.6875rem] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full"
                                                  style={fontMono}
                                                >
                                                  {formatPrice(
                                                    total - effective,
                                                    "USD",
                                                  )}{" "}
                                                  off ({savingsPct}%)
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                          </div>
                        );
                      })()}
                  </>
                )}

              {/* Standalone Pricing (add-ons or groups without tiers) */}
              {editGroupType !== "setup" &&
                editGroupPricingMode === "STANDALONE" && (
                  <>
                    {/* Recurring Price (base monthly) */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                        style={fontSans}
                      >
                        Recurring Price
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">$</span>
                        <input
                          type="number"
                          value={editGroupBasePrice}
                          onChange={(e) =>
                            setEditGroupBasePrice(e.target.value)
                          }
                          placeholder="0.00"
                          className="flex-1 px-2.5 py-2 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                          style={fontSans}
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Setup Cost */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                        style={fontSans}
                      >
                        Setup Cost (one-time)
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">$</span>
                        <input
                          type="number"
                          value={editGroupSetupCost}
                          onChange={(e) =>
                            setEditGroupSetupCost(e.target.value)
                          }
                          placeholder="0.00"
                          className="flex-1 px-2.5 py-2 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                          style={fontSans}
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Billing Cycles & Discounts */}
                    {editGroupBillingCycles.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                          style={fontSans}
                        >
                          Billing Cycles & Discounts
                        </label>
                        <div className="flex flex-col gap-2">
                          {editGroupBillingCycles.map((cycle) => {
                            const base = parseFloat(editGroupBasePrice) || 0;
                            const months = BILLING_CYCLE_MONTHS[cycle];
                            const total = base > 0 ? base * months : null;
                            const discountPct =
                              parseFloat(editGroupDiscounts[cycle]) || 0;
                            const effective =
                              total !== null && discountPct > 0
                                ? total * (1 - discountPct / 100)
                                : null;
                            const savingsPct = Math.round(discountPct);
                            const isMonthly = cycle === "MONTHLY";
                            const cycleLabel = {
                              MONTHLY: "Monthly",
                              QUARTERLY: "Quarterly",
                              SEMI_ANNUAL: "Semi-Annual",
                              ANNUAL: "Annual",
                              ONE_TIME: "One-Time",
                            }[cycle];
                            const shortLabel = `${months}mo`;

                            return (
                              <div
                                key={cycle}
                                className={`border border-slate-200 rounded-[10px] px-3.5 py-2.5 transition-[150ms] ${base > 0 ? "bg-white" : "bg-slate-50"}`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-semibold text-slate-700">
                                    {cycleLabel}
                                  </span>
                                  {total !== null ? (
                                    <span
                                      className="text-[0.9375rem] font-bold text-slate-800"
                                      style={fontMono}
                                    >
                                      {formatPrice(total, "USD")}
                                    </span>
                                  ) : (
                                    <span className="text-sm text-slate-400">
                                      --
                                    </span>
                                  )}
                                </div>
                                {base > 0 && (
                                  <div className="flex gap-4 mt-2 pt-2 border-t border-dashed border-slate-200">
                                    {!isMonthly && (
                                      <div className="flex-1 flex flex-col gap-0.5">
                                        <span
                                          className="text-[0.625rem] font-medium uppercase tracking-[0.06em] text-violet-500"
                                          style={fontMono}
                                        >
                                          Standard Price
                                        </span>
                                        <span className="text-[0.8125rem] text-slate-600 flex items-baseline gap-1.5">
                                          ${base} &times; {shortLabel}
                                          <span className="font-semibold text-slate-700">
                                            {formatPrice(total ?? 0, "USD")}
                                          </span>
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex-1 flex flex-col gap-0.5">
                                      <span
                                        className="text-[0.625rem] font-medium uppercase tracking-[0.06em] text-violet-500"
                                        style={fontMono}
                                      >
                                        Discount
                                      </span>
                                      <div className="flex items-center border border-slate-200 rounded-[10px] overflow-hidden transition-all duration-150 h-[34px] focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]">
                                        <input
                                          type="number"
                                          value={editGroupDiscounts[cycle]}
                                          onChange={(e) =>
                                            setEditGroupDiscounts({
                                              ...editGroupDiscounts,
                                              [cycle]: e.target.value,
                                            })
                                          }
                                          placeholder="0"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          className="flex-1 py-1.5 px-2 pr-1 border-none text-sm text-slate-700 bg-transparent outline-none min-w-0 placeholder:text-slate-400"
                                          style={fontMono}
                                        />
                                        <span className="px-3 py-2.5 pl-2 text-sm font-medium text-slate-400 bg-slate-50 whitespace-nowrap select-none">
                                          %
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {effective !== null && discountPct > 0 && (
                                  <div className="flex items-center gap-2 mt-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-md">
                                    <span className="text-[0.8125rem] text-emerald-600">
                                      &rarr;
                                    </span>
                                    <span
                                      className="text-sm font-bold text-emerald-700"
                                      style={fontMono}
                                    >
                                      {formatPrice(effective, "USD")}
                                    </span>
                                    {savingsPct > 0 && (
                                      <span
                                        className="ml-auto text-[0.6875rem] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full"
                                        style={fontMono}
                                      >
                                        {savingsPct}% off
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

              {editGroupType === "setup" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-slate-500">
                      One-time Fee
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">$</span>
                      <input
                        type="number"
                        value={editGroupPrice}
                        onChange={(e) => setEditGroupPrice(e.target.value)}
                        placeholder="0"
                        className="flex-1 px-2.5 py-2 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                        style={fontSans}
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Per-tier setup fee discounts */}
                  {tiers.length > 0 && parseFloat(editGroupPrice) > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-slate-500">
                        Setup Fee Discounts by Tier & Billing Cycle
                      </span>
                      <div className="flex gap-0 border-b border-slate-200 mb-3 overflow-x-auto">
                        {tiers.map((tier) => (
                          <button
                            key={tier.id}
                            onClick={() => setEditTierTab(tier.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-none border-none border-b-2 cursor-pointer whitespace-nowrap transition-all duration-150 ${
                              editTierTab === tier.id
                                ? "text-violet-700 border-b-violet-600 font-semibold"
                                : "text-slate-500 border-b-transparent hover:text-slate-700 hover:bg-slate-50"
                            } ${tier.isCustomPricing ? "italic" : ""}`}
                            style={fontSans}
                          >
                            {tier.name}
                            {tier.excludeFromSetupFee && (
                              <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.04em] text-teal-600 bg-teal-50 px-[5px] py-px rounded-full">
                                No Fee
                              </span>
                            )}
                            {tier.isCustomPricing && (
                              <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.04em] text-amber-600 bg-amber-50 px-[5px] py-px rounded-full">
                                Custom
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {editTierTab &&
                        (() => {
                          const activeTier = tiers.find(
                            (t) => t.id === editTierTab,
                          );
                          if (!activeTier) return null;

                          if (activeTier.excludeFromSetupFee) {
                            return (
                              <div className="flex items-center gap-2 p-3 bg-teal-50 border border-dashed border-teal-300 rounded-md text-xs text-teal-700 italic">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  width="16"
                                  height="16"
                                >
                                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                  No setup fee — this tier is excluded from
                                  setup fees.
                                </span>
                              </div>
                            );
                          }

                          if (activeTier.isCustomPricing) {
                            return (
                              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-md text-xs text-slate-500 italic">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  width="16"
                                  height="16"
                                >
                                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                  Custom pricing tier — discounts negotiated per
                                  customer.
                                </span>
                              </div>
                            );
                          }

                          const baseAmount = parseFloat(editGroupPrice) || 0;
                          const SETUP_CYCLES: BillingCycle[] = [
                            "MONTHLY",
                            "QUARTERLY",
                            "SEMI_ANNUAL",
                            "ANNUAL",
                          ];
                          const cycleLabels: Record<string, string> = {
                            MONTHLY: "Monthly",
                            QUARTERLY: "Quarterly",
                            SEMI_ANNUAL: "Semi-Annual",
                            ANNUAL: "Annual",
                          };

                          return (
                            <div className="flex flex-col gap-1.5">
                              {SETUP_CYCLES.map((cycle) => {
                                const entry =
                                  editSetupTierDiscounts[activeTier.id]?.[
                                    cycle
                                  ];
                                const dType = "PERCENTAGE" as const;
                                const dValue = entry?.discountValue || "";
                                const parsedValue = parseFloat(dValue) || 0;

                                // Compute effective price
                                let effectiveAmount = baseAmount;
                                let savings = 0;
                                let savingsPct = 0;
                                if (parsedValue > 0 && baseAmount > 0) {
                                  const result = calculateEffectiveSetupPrice({
                                    amount: baseAmount,
                                    discount: {
                                      discountType: dType,
                                      discountValue: parsedValue,
                                    },
                                  });
                                  effectiveAmount = result.effectiveAmount;
                                  savings = result.savings;
                                  savingsPct = result.savingsPercent;
                                }

                                return (
                                  <div
                                    key={cycle}
                                    className="flex flex-col gap-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-md"
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs font-semibold text-slate-700">
                                        {cycleLabels[cycle]} subscription
                                      </span>
                                      <span
                                        className="text-xs text-slate-400"
                                        style={fontMono}
                                      >
                                        {formatPrice(baseAmount, "USD")}
                                      </span>
                                    </div>
                                    <div className="flex gap-1.5 items-stretch">
                                      <span className="text-[0.8125rem] font-medium text-slate-500 whitespace-nowrap">
                                        Discount
                                      </span>
                                      <div className="flex-1 flex items-center gap-2">
                                        <input
                                          type="number"
                                          value={dValue}
                                          onChange={(e) => {
                                            const updated = {
                                              ...editSetupTierDiscounts,
                                            };
                                            updated[activeTier.id] = {
                                              ...updated[activeTier.id],
                                              [cycle]: {
                                                ...updated[activeTier.id]?.[
                                                  cycle
                                                ],
                                                discountValue: e.target.value,
                                              },
                                            };
                                            setEditSetupTierDiscounts(updated);
                                          }}
                                          placeholder="0"
                                          className="flex-1 px-2.5 py-2 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                                          style={fontSans}
                                          step="0.01"
                                          min="0"
                                          max="100"
                                        />
                                        <span className="px-3 py-2.5 pl-2 text-sm font-medium text-slate-400 bg-slate-50 whitespace-nowrap select-none">
                                          %
                                        </span>
                                      </div>
                                    </div>
                                    {parsedValue > 0 && baseAmount > 0 && (
                                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-50 border border-emerald-100 rounded-md flex-wrap">
                                        <span className="text-xs text-emerald-500">
                                          &rarr;
                                        </span>
                                        <span
                                          className="text-xs text-slate-400 line-through"
                                          style={fontMono}
                                        >
                                          {formatPrice(baseAmount, "USD")}
                                        </span>
                                        <span
                                          className="text-sm font-bold text-emerald-700"
                                          style={fontMono}
                                        >
                                          {formatPrice(effectiveAmount, "USD")}
                                        </span>
                                        {savingsPct > 0 && (
                                          <span
                                            className="ml-auto text-[0.625rem] font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md"
                                            style={fontMono}
                                          >
                                            save {formatPrice(savings, "USD")} (
                                            {savingsPct}% off)
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex gap-3 px-6 pt-4 pb-5 border-t border-slate-100">
              <button
                onClick={() => setEditingGroup(null)}
                className="flex-1 px-4 py-2.5 text-[0.8125rem] font-semibold rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={fontSans}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGroupEdit}
                disabled={!editGroupName.trim()}
                className="flex-1 px-4 py-2.5 text-[0.8125rem] font-semibold rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 text-white hover:enabled:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  ...fontSans,
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                  boxShadow: "0 2px 6px rgba(124, 58, 237, 0.25)",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6 min-h-[600px]">
        {/* Service Groups Sidebar */}
        <aside
          className="w-80 shrink-0 bg-white rounded-xl shadow-md border border-slate-100 p-5"
          style={{ animation: "so-scale-in 300ms ease-out" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[1.0625rem] font-semibold text-slate-800 m-0 tracking-[-0.01em]">
              Service Groups
              <InfoIcon content="Option Groups bundle related services together. They can be setup fees (one-time), recurring charges, or add-ons that clients select independently." />
            </h2>
            <button
              onClick={handleAddNewGroup}
              className="w-8 h-8 rounded-[10px] bg-slate-100 border-none text-slate-500 cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-violet-100 hover:text-violet-600"
              aria-label="Add group"
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Setup & Formation Groups */}
            {setupGroups.length > 0 && (
              <GroupSection
                title="Setup & Formation"
                color="amber"
                groups={setupGroups}
                selectedGroupId={selectedGroupId}
                getServicesForGroup={getServicesForGroup}
                onSelect={setSelectedGroupId}
                onEdit={handleOpenEditGroup}
                onDelete={handleDeleteGroup}
              />
            )}

            {/* Recurring Services Groups */}
            {regularGroups.length > 0 && (
              <GroupSection
                title="Recurring Services"
                color="emerald"
                groups={regularGroups}
                selectedGroupId={selectedGroupId}
                getServicesForGroup={getServicesForGroup}
                onSelect={setSelectedGroupId}
                onEdit={handleOpenEditGroup}
                onDelete={handleDeleteGroup}
              />
            )}

            {/* Add-on Groups */}
            {addonGroups.length > 0 && (
              <GroupSection
                title="Optional Add-ons"
                color="violet"
                groups={addonGroups}
                selectedGroupId={selectedGroupId}
                getServicesForGroup={getServicesForGroup}
                onSelect={setSelectedGroupId}
                onEdit={handleOpenEditGroup}
                onDelete={handleDeleteGroup}
              />
            )}

            {/* Ungrouped services */}
            {ungroupedServices.length > 0 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedGroupId(null)}
                  className={`w-full px-3.5 py-2.5 bg-transparent border-none border-t border-slate-200 rounded-none cursor-pointer text-left transition-all duration-150 mt-2 pt-[18px] hover:bg-slate-50 ${selectedGroupId === null ? "bg-slate-100 border-l-[3px] border-l-slate-500 rounded-[10px]" : ""}`}
                >
                  <span className="block text-sm font-medium text-slate-700">
                    Ungrouped Services
                  </span>
                  <span className="block text-xs text-slate-400 mt-0.5">
                    {ungroupedServices.length} services
                  </span>
                </button>
              </div>
            )}

            {/* Empty state */}
            {optionGroups.length === 0 && ungroupedServices.length === 0 && (
              <div className="text-center px-4 py-8 text-slate-500">
                <p className="text-sm font-medium m-0 mb-1">
                  No service groups yet
                </p>
                <p className="text-xs m-0 text-slate-400">
                  Click + to create a group
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Services List */}
        <main
          className="flex-1 bg-white rounded-xl shadow-md border border-slate-100 p-6"
          style={{
            animation: "so-scale-in 300ms ease-out",
            animationDelay: "50ms",
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h2 className="text-[1.375rem] font-semibold text-slate-800 m-0 mb-1.5 tracking-[-0.02em]">
                {selectedGroup?.name || "Ungrouped Services"}
              </h2>
              <p className="text-sm text-slate-500 m-0">
                {selectedGroup?.costType === "SETUP" ? (
                  <span className="flex items-center gap-2.5">
                    <span className="inline-flex items-center px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] rounded-full bg-amber-100 text-amber-700">
                      Setup & Formation
                    </span>
                    {selectedGroup.price != null
                      ? `One-time fee: $${selectedGroup.price}`
                      : "Included in tier price"}
                  </span>
                ) : selectedGroup?.isAddOn ? (
                  <span className="flex items-center gap-2.5">
                    Optional add-on group
                    {selectedGroup.availableBillingCycles.map((cycle) => (
                      <span
                        key={cycle}
                        className="inline-flex items-center px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] rounded-full bg-violet-100 text-violet-700"
                        style={{ marginLeft: 8 }}
                      >
                        {BILLING_CYCLE_SHORT_LABELS[cycle]}
                      </span>
                    ))}
                    {selectedGroup.price != null && (
                      <span className="text-amber-600">
                        ${selectedGroup.price}
                      </span>
                    )}
                  </span>
                ) : selectedGroup ? (
                  <span className="flex items-center gap-2.5">
                    Included in subscription
                    {selectedGroup.availableBillingCycles.map((cycle) => (
                      <span
                        key={cycle}
                        className="inline-flex items-center px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] rounded-full bg-emerald-100 text-emerald-700"
                        style={{ marginLeft: 8 }}
                      >
                        {BILLING_CYCLE_SHORT_LABELS[cycle]}
                      </span>
                    ))}
                  </span>
                ) : (
                  "Services not assigned to any group"
                )}
              </p>
            </div>
            {selectedGroupId && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowServiceTemplates(!showServiceTemplates)}
                  className="flex-1 px-4 py-2.5 text-[0.8125rem] font-semibold rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={fontSans}
                  title="Quick-add from templates"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  Templates
                </button>
                <button
                  onClick={() => setIsAddingService(true)}
                  className="flex-1 px-4 py-2.5 text-[0.8125rem] font-semibold rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 text-white hover:enabled:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    ...fontSans,
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                    boxShadow: "0 2px 6px rgba(124, 58, 237, 0.25)",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  Add Service
                </button>
              </div>
            )}
          </div>

          {/* Service Templates Quick-Add Panel */}
          {showServiceTemplates && selectedGroupId && (
            <div
              className="border border-violet-200 rounded-xl p-5 mb-6"
              style={{
                background: "linear-gradient(135deg, #f5f3ff 0%, #f8fafc 100%)",
                animation: "so-scale-in 150ms ease-out",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-slate-800 m-0 flex items-center gap-2">
                  {"⚡"} Quick Add from Templates
                </h3>
                <button
                  onClick={() => setShowServiceTemplates(false)}
                  className="w-7 h-7 rounded-md bg-transparent border-none text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-white hover:text-slate-600"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[0.8125rem] text-slate-500 m-0 mb-4">
                Click any template to instantly add it to this group. Services
                will be included in all tiers by default.
              </p>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                {Object.entries(SERVICE_TEMPLATES).map(
                  ([category, templates]) => (
                    <div key={category} className="flex flex-col gap-2">
                      <h4 className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-slate-500 m-0 pl-1">
                        {category}
                      </h4>
                      <div className="flex flex-col gap-1">
                        {templates.map((template, idx) => {
                          // Check if service already exists
                          const alreadyExists = services.some(
                            (s) =>
                              s.title.toLowerCase() ===
                              template.title.toLowerCase(),
                          );
                          return (
                            <button
                              key={idx}
                              onClick={() =>
                                !alreadyExists &&
                                handleAddFromTemplate(template)
                              }
                              disabled={alreadyExists}
                              className={`flex items-center gap-2.5 px-3 py-2.5 bg-white border border-slate-200 rounded-[10px] cursor-pointer text-left transition-all duration-150 hover:enabled:border-violet-300 hover:enabled:bg-white hover:enabled:shadow-[0_2px_8px_rgba(124,58,237,0.1)] hover:enabled:translate-x-0.5 active:enabled:translate-x-0 ${alreadyExists ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                              <span className="text-xl shrink-0">
                                {template.icon}
                              </span>
                              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                <span className="text-[0.8125rem] font-medium text-slate-800">
                                  {template.title}
                                </span>
                                <span className="text-[0.6875rem] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
                                  {template.description}
                                </span>
                              </div>
                              {alreadyExists && (
                                <span className="px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.04em] bg-emerald-100 text-emerald-700 rounded shrink-0">
                                  Added
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {!selectedGroupId && (
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-5 bg-sky-50 border border-sky-200 text-sky-700">
              <svg
                className="w-5 h-5 shrink-0 mt-px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
              <p className="text-[0.8125rem] m-0 leading-relaxed">
                Select a service group from the sidebar to add services.
                Services must belong to a group to be properly managed.
              </p>
            </div>
          )}

          {isAddingService && selectedGroupId && (
            <div
              className="bg-slate-50 rounded-[10px] border border-slate-200 p-5 mb-6 flex flex-col gap-4"
              style={{ animation: "so-scale-in 150ms ease-out" }}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                  style={fontSans}
                >
                  Service Name
                </label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                  placeholder="Enter service name..."
                  className="w-full px-3 py-2.5 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md transition-all duration-150 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                  style={fontSans}
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                  style={fontSans}
                >
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description..."
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md resize-none transition-all duration-150 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
                  style={fontSans}
                />
              </div>

              {/* Tier Selection */}
              {tiers.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                    style={fontSans}
                  >
                    Include in Tiers
                  </label>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
                    {tiers.map((tier) => {
                      const isSelected = selectedTierIds.has(tier.id);
                      return (
                        <label
                          key={tier.id}
                          className={`flex items-center gap-2.5 px-3.5 py-3 bg-white border-[1.5px] rounded-[10px] cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-50 hover:border-emerald-600"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const newSet = new Set(selectedTierIds);
                              if (e.target.checked) {
                                newSet.add(tier.id);
                              } else {
                                newSet.delete(tier.id);
                              }
                              setSelectedTierIds(newSet);
                            }}
                            className="w-[18px] h-[18px] shrink-0 accent-emerald-600 cursor-pointer"
                          />
                          <span
                            className={`flex-1 text-sm font-medium ${isSelected ? "text-emerald-800" : "text-slate-800"}`}
                          >
                            {tier.name}
                          </span>
                          {tier.pricing.amount !== null && (
                            <span
                              className={`text-xs font-medium whitespace-nowrap ${isSelected ? "text-emerald-600" : "text-slate-500"}`}
                            >
                              ${tier.pricing.amount}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {selectedTierIds.size === 0 && (
                    <p className="text-xs text-slate-500 mt-2 m-0 italic">
                      Select at least one tier to include this service
                    </p>
                  )}
                </div>
              )}

              {tiers.length === 0 && (
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-5 bg-amber-50 border border-amber-200 text-amber-700">
                  <svg
                    className="w-5 h-5 shrink-0 mt-px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-[0.8125rem] m-0 leading-relaxed">
                    No tiers defined yet. Define tiers in the Tier Definition
                    tab first to specify which tiers include this service.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleAddService}
                  disabled={!newService.title.trim()}
                  className="flex-1 px-4 py-2.5 text-[0.8125rem] font-semibold rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 text-white hover:enabled:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    ...fontSans,
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                    boxShadow: "0 2px 6px rgba(124, 58, 237, 0.25)",
                  }}
                >
                  Add Service
                </button>
                <button
                  onClick={() => {
                    setIsAddingService(false);
                    setNewService({ title: "", description: "" });
                    setSelectedTierIds(new Set());
                  }}
                  className="flex-1 px-4 py-2.5 text-[0.8125rem] font-semibold rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={fontSans}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {displayedServices.length === 0 ? (
            <div className="text-center px-6 py-[60px]">
              <div className="w-14 h-14 mx-auto mb-4 text-slate-300">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-[1.0625rem] font-semibold text-slate-700 m-0 mb-1.5">
                No services in this group
              </h3>
              <p className="text-sm text-slate-500 m-0">
                {selectedGroupId
                  ? 'Click "Add Service" to create a new service.'
                  : "Select a group to manage its services."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {displayedServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  tiers={tiers}
                  optionGroups={optionGroups}
                  onUpdate={handleUpdateService}
                  onDelete={() => handleDeleteService(service.id)}
                  onToggleTier={handleToggleTier}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {pendingDeleteGroupId && (
        <ConfirmDialog
          title="Delete this group?"
          message="Services in this group will become ungrouped. This action cannot be undone."
          confirmLabel="Delete Group"
          variant="danger"
          onConfirm={confirmDeleteGroup}
          onCancel={() => setPendingDeleteGroupId(null)}
        />
      )}

      {pendingDeleteServiceId && (
        <ConfirmDialog
          title="Delete this service?"
          message="This will remove the service and any associated tier bindings. This action cannot be undone."
          confirmLabel="Delete Service"
          variant="danger"
          onConfirm={confirmDeleteService}
          onCancel={() => setPendingDeleteServiceId(null)}
        />
      )}
    </>
  );
}

interface GroupSectionProps {
  title: string;
  color: string;
  groups: OptionGroup[];
  selectedGroupId: string | null;
  getServicesForGroup: (groupId: string) => Service[];
  onSelect: (groupId: string) => void;
  onEdit: (group: OptionGroup) => void;
  onDelete: (groupId: string) => void;
}

function GroupSection({
  title,
  color,
  groups,
  selectedGroupId,
  getServicesForGroup,
  onSelect,
  onEdit,
  onDelete,
}: GroupSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            color === "amber"
              ? "bg-amber-500"
              : color === "emerald"
                ? "bg-emerald-500"
                : "bg-violet-500"
          }`}
        />
        <span className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-slate-500">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {groups.map((group) => (
          <GroupButton
            key={group.id}
            group={group}
            serviceCount={getServicesForGroup(group.id).length}
            isSelected={selectedGroupId === group.id}
            onSelect={() => onSelect(group.id)}
            onEdit={() => onEdit(group)}
            onDelete={() => onDelete(group.id)}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}

interface GroupButtonProps {
  group: OptionGroup;
  serviceCount: number;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  color: string;
}

function GroupButton({
  group,
  serviceCount,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  color,
}: GroupButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isSetup = group.costType === "SETUP";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onSelect}
        className={`w-full px-3.5 py-2.5 bg-transparent border-none rounded-[10px] cursor-pointer text-left transition-all duration-150 hover:bg-slate-50 ${
          isSelected
            ? `border-l-[3px] border-l-solid ${
                color === "amber"
                  ? "bg-amber-50 border-l-amber-500"
                  : color === "emerald"
                    ? "bg-emerald-50 border-l-emerald-500"
                    : "bg-violet-50 border-l-violet-500"
              }`
            : ""
        }`}
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-slate-800">
            {group.name}
          </span>
          {isSetup && (
            <span className="px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.04em] rounded bg-amber-100 text-amber-700">
              SETUP
            </span>
          )}
          {group.isAddOn && (
            <span className="px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.04em] rounded bg-violet-100 text-violet-700">
              OPTIONAL
            </span>
          )}
          {group.availableBillingCycles.length > 0 && !isSetup && (
            <span className="px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.04em] rounded bg-emerald-100 text-emerald-700">
              {group.availableBillingCycles
                .map((c) => BILLING_CYCLE_SHORT_LABELS[c])
                .join(", ")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
          <span>
            {serviceCount} services
            {serviceCount === 0 && (
              <span className="text-[0.6875rem] text-amber-600">
                {" "}
                — add services
              </span>
            )}
          </span>
          {group.costType === "SETUP" && group.price != null && (
            <span className="text-amber-600">
              {formatPrice(group.price, "USD")}
            </span>
          )}
          {group.isAddOn && group.price != null && (
            <span className="text-amber-600">
              {formatPrice(group.price, "USD")}
            </span>
          )}
          {!isSetup &&
            !group.isAddOn &&
            (() => {
              const monthlyPrice =
                group.tierDependentPricing?.[0]?.recurringPricing?.find(
                  (p) => p.billingCycle === "MONTHLY",
                )?.amount ??
                group.standalonePricing?.recurringPricing?.find(
                  (p) => p.billingCycle === "MONTHLY",
                )?.amount;
              return monthlyPrice != null && monthlyPrice > 0 ? (
                <span className="text-amber-600">
                  {formatPrice(monthlyPrice, "USD")}/mo
                </span>
              ) : null;
            })()}
        </div>
      </button>
      {isHovered && (
        <div
          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-0.5"
          style={{ animation: "so-fade-in 150ms ease-out" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-7 h-7 rounded-[10px] bg-white border border-slate-200 text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:scale-105 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] active:scale-95 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600"
            aria-label="Edit group"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-7 h-7 rounded-[10px] bg-white border border-slate-200 text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:scale-105 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] active:scale-95 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600"
            aria-label="Delete group"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  tiers: ServiceSubscriptionTier[];
  optionGroups: OptionGroup[];
  onUpdate: (
    service: Service,
    updates: Partial<
      Pick<
        Service,
        "title" | "description" | "isSetupFormation" | "optionGroupId"
      >
    >,
  ) => void;
  onDelete: () => void;
  onToggleTier: (
    serviceId: string,
    tierId: string,
    isIncluded: boolean,
  ) => void;
}

function ServiceCard({
  service,
  tiers,
  optionGroups,
  onUpdate,
  onDelete,
  onToggleTier,
}: ServiceCardProps) {
  const [localTitle, setLocalTitle] = useState(service.title);
  const [localDescription, setLocalDescription] = useState(
    service.description || "",
  );
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync local state when service changes
  useEffect(() => {
    setLocalTitle(service.title);
    setLocalDescription(service.description || "");
  }, [service.title, service.description]);

  // Get tiers this service is included in
  const includedTierIds = useMemo(() => {
    const ids = new Set<string>();
    tiers.forEach((tier) => {
      const hasService = tier.serviceLevels.some(
        (sl) => sl.serviceId === service.id && sl.level === "INCLUDED",
      );
      if (hasService) {
        ids.add(tier.id);
      }
    });
    return ids;
  }, [tiers, service.id]);

  return (
    <div
      className={`flex flex-col gap-4 p-[18px] bg-white border-[1.5px] rounded-[10px] transition-all duration-150 hover:border-slate-300 hover:shadow-sm ${
        service.isSetupFormation
          ? "bg-amber-50 border-amber-200 hover:border-amber-300"
          : isExpanded
            ? "border-violet-300"
            : "border-slate-200"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <input
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={() => {
                if (localTitle !== service.title && localTitle.trim()) {
                  onUpdate(service, { title: localTitle.trim() });
                }
              }}
              className="flex-1 text-base font-medium text-slate-800 bg-transparent border-none border-b-[1.5px] border-b-transparent px-0 pb-0.5 transition-all duration-150 hover:border-b-slate-300 focus:outline-none focus:border-b-violet-500"
              style={fontSans}
            />
            {service.isSetupFormation && (
              <span className="inline-flex items-center px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] rounded-full bg-amber-100 text-amber-700">
                Setup Service
              </span>
            )}
          </div>
          <textarea
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            onBlur={() => {
              if (localDescription !== (service.description || "")) {
                onUpdate(service, { description: localDescription });
              }
            }}
            placeholder="Add a description..."
            rows={2}
            className="w-full px-3 py-2.5 text-[0.8125rem] text-slate-600 bg-slate-50 border border-slate-200 rounded-md resize-none transition-all duration-150 hover:bg-white hover:border-slate-300 focus:outline-none focus:bg-white focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
            style={fontSans}
          />

          {/* Tier badges - quick view */}
          {tiers.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {tiers.map((tier) => (
                <span
                  key={tier.id}
                  className={`px-2 py-[3px] text-[0.625rem] font-semibold uppercase tracking-[0.04em] rounded ${
                    includedTierIds.has(tier.id)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {tier.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-9 h-9 rounded-[10px] bg-slate-100 border-none text-slate-500 cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-violet-100 hover:text-violet-600"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              className="w-[18px] h-[18px] transition-transform duration-150"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="w-9 h-9 shrink-0 rounded-[10px] bg-transparent border-none text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-rose-100 hover:text-rose-600"
            aria-label="Delete service"
          >
            <svg
              className="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded section for editing group and tier inclusion */}
      {isExpanded && (
        <div
          className="border-t border-slate-200 mt-4 pt-4 flex flex-col gap-4"
          style={{ animation: "so-fade-in 150ms ease-out" }}
        >
          {/* Group assignment */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
              style={fontSans}
            >
              Assign to Group
            </label>
            <select
              value={service.optionGroupId || ""}
              onChange={(e) => {
                const newGroupId = e.target.value || null;
                const targetGroup = newGroupId
                  ? optionGroups.find((g) => g.id === newGroupId)
                  : null;
                const isSetupGroup = targetGroup?.costType === "SETUP";

                onUpdate(service, {
                  optionGroupId: newGroupId,
                  isSetupFormation: isSetupGroup,
                });
              }}
              className="w-full px-3 py-2.5 text-sm text-slate-800 bg-white border-[1.5px] border-slate-200 rounded-md cursor-pointer transition-all duration-150 hover:border-slate-300 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_0_2px_rgb(237,233,254)]"
              style={fontSans}
            >
              <option value="">No group (ungrouped)</option>
              {optionGroups.map((group) => {
                const label =
                  group.costType === "SETUP"
                    ? `${group.name} (Setup)`
                    : group.isAddOn
                      ? `${group.name} (Add-on)`
                      : `${group.name} (Recurring)`;
                return (
                  <option key={group.id} value={group.id}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Tier inclusion */}
          {tiers.length > 0 && (
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-[0.05em] text-slate-500"
                style={fontSans}
              >
                Include in Tiers
              </label>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
                {tiers.map((tier) => {
                  const isIncluded = includedTierIds.has(tier.id);
                  return (
                    <label
                      key={tier.id}
                      className={`flex items-center gap-2.5 px-3 py-2.5 bg-white border-[1.5px] rounded-[10px] cursor-pointer transition-all duration-150 ${
                        isIncluded
                          ? "border-emerald-500 bg-emerald-50 hover:border-emerald-600"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isIncluded}
                        onChange={(e) => {
                          onToggleTier(service.id, tier.id, e.target.checked);
                        }}
                        className="w-[18px] h-[18px] shrink-0 accent-emerald-600 cursor-pointer"
                      />
                      <span
                        className={`flex-1 text-sm font-medium ${isIncluded ? "text-emerald-800" : "text-slate-800"}`}
                      >
                        {tier.name}
                      </span>
                      {tier.pricing.amount !== null && (
                        <span
                          className={`text-xs font-medium whitespace-nowrap ${isIncluded ? "text-emerald-600" : "text-slate-500"}`}
                        >
                          ${tier.pricing.amount}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
