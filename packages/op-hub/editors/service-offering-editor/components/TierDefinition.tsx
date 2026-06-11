import { memo, useMemo, useState, useCallback } from "react";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  ServiceOfferingDocument,
  ServiceOfferingAction,
  ServiceSubscriptionTier,
  OptionGroup,
  BillingCycle,
} from "document-models/service-offering";
import {
  addTier,
  updateTier,
  deleteTier,
  setAvailableBillingCycles,
  reorderTiers,
} from "../../../document-models/service-offering/v1/gen/creators.js";
import { calculateTierRecurringPrice, formatPrice } from "./pricing-utils.js";
import { InfoIcon } from "./InfoIcon.js";
import { ConfirmDialog } from "./ConfirmDialog.js";

interface TierDefinitionProps {
  document: ServiceOfferingDocument;
  dispatch: DocumentDispatch<ServiceOfferingAction>;
}

const TIER_ACCENTS = [
  {
    color: "var(--chart-1)",
    bg: "color-mix(in oklab, var(--chart-1) 15%, transparent)",
    name: "emerald",
  },
  {
    color: "var(--chart-2)",
    bg: "color-mix(in oklab, var(--chart-2) 15%, transparent)",
    name: "violet",
  },
  {
    color: "var(--chart-3)",
    bg: "color-mix(in oklab, var(--chart-3) 15%, transparent)",
    name: "amber",
  },
  {
    color: "var(--chart-4)",
    bg: "color-mix(in oklab, var(--chart-4) 15%, transparent)",
    name: "sky",
  },
  {
    color: "var(--chart-5)",
    bg: "color-mix(in oklab, var(--chart-5) 15%, transparent)",
    name: "rose",
  },
];

// Tier Presets - Default Effect & Activation Energy Reduction
interface TierPreset {
  name: string;
  description: string;
  icon: string;
  tiers: Array<{
    name: string;
    isCustomPricing: boolean;
  }>;
}

const TIER_PRESETS: TierPreset[] = [
  {
    name: "Standard 3-Tier",
    description: "Basic → Professional → Enterprise",
    icon: "📊",
    tiers: [
      { name: "Basic", isCustomPricing: false },
      { name: "Professional", isCustomPricing: false },
      { name: "Enterprise", isCustomPricing: true },
    ],
  },
  {
    name: "Freemium Model",
    description: "Free → Pro → Business",
    icon: "🚀",
    tiers: [
      { name: "Free", isCustomPricing: false },
      { name: "Pro", isCustomPricing: false },
      { name: "Business", isCustomPricing: false },
    ],
  },
  {
    name: "Simple 2-Tier",
    description: "Starter → Growth",
    icon: "⚡",
    tiers: [
      { name: "Starter", isCustomPricing: false },
      { name: "Growth", isCustomPricing: false },
    ],
  },
  {
    name: "Annual Focus",
    description: "Annual pricing with discounts",
    icon: "📅",
    tiers: [
      { name: "Essential", isCustomPricing: false },
      { name: "Professional", isCustomPricing: false },
      { name: "Enterprise", isCustomPricing: true },
    ],
  },
];

const BILLING_CYCLE_OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
  { value: "SEMI_ANNUAL", label: "Semi-Annual" },
  { value: "ANNUAL", label: "Annual" },
];

const fontSans = "'DM Sans', system-ui, sans-serif";
const fontMono = "'DM Mono', 'SF Mono', monospace";

export function TierDefinition({ document, dispatch }: TierDefinitionProps) {
  const { state } = document;
  const tiers = state.global.tiers ?? [];
  const optionGroups = state.global.optionGroups ?? [];

  const regularGroups = useMemo(
    () => optionGroups.filter((g) => g.costType !== "SETUP" && !g.isAddOn),
    [optionGroups],
  );

  const [isAddingTier, setIsAddingTier] = useState(false);
  const [pendingDeleteTierId, setPendingDeleteTierId] = useState<string | null>(
    null,
  );
  const [newTier, setNewTier] = useState({
    name: "",
    currency: "USD",
    isCustomPricing: false,
  });

  const handleAddTier = () => {
    if (!newTier.name.trim()) return;

    dispatch(
      addTier({
        id: generateId(),
        name: newTier.name.trim(),
        currency: newTier.currency,
        isCustomPricing: newTier.isCustomPricing,
        lastModified: new Date().toISOString(),
      }),
    );

    setNewTier({
      name: "",
      currency: "USD",
      isCustomPricing: false,
    });
    setIsAddingTier(false);
  };

  const handleDeleteTier = useCallback((tierId: string) => {
    setPendingDeleteTierId(tierId);
  }, []);

  const confirmDeleteTier = useCallback(() => {
    if (!pendingDeleteTierId) return;
    dispatch(
      deleteTier({
        id: pendingDeleteTierId,
        lastModified: new Date().toISOString(),
      }),
    );
    setPendingDeleteTierId(null);
  }, [pendingDeleteTierId, dispatch]);

  // Apply a preset tier configuration - Default Effect
  const handleApplyPreset = (preset: TierPreset) => {
    const now = new Date().toISOString();
    preset.tiers.forEach((tierConfig) => {
      dispatch(
        addTier({
          id: generateId(),
          name: tierConfig.name,
          currency: "USD",
          isCustomPricing: tierConfig.isCustomPricing,
          lastModified: now,
        }),
      );
    });
  };

  const handleMoveTier = useCallback(
    (tierIndex: number, direction: "left" | "right") => {
      const newIndex = direction === "left" ? tierIndex - 1 : tierIndex + 1;
      if (newIndex < 0 || newIndex >= tiers.length) return;
      const reordered = tiers.map((t) => t.id);
      [reordered[tierIndex], reordered[newIndex]] = [
        reordered[newIndex],
        reordered[tierIndex],
      ];
      dispatch(
        reorderTiers({
          tierIds: reordered,
          lastModified: new Date().toISOString(),
        }),
      );
    },
    [tiers, dispatch],
  );

  const getTierAccent = (index: number) =>
    TIER_ACCENTS[index % TIER_ACCENTS.length];

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Tier Presets - Show when no tiers exist (Default Effect) */}
        {tiers.length === 0 && (
          <div
            className="rounded-xl p-6 mb-6 border border-primary/40"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--primary) 15%, transparent) 0%, color-mix(in oklab, var(--primary) 5%, transparent) 100%)",
            }}
          >
            <div className="mb-5">
              <h3
                className="text-lg font-bold text-foreground m-0 mb-1.5 flex items-center gap-2"
                style={{ fontFamily: fontSans }}
              >
                <span>{"⚡"}</span>
                Quick Start with a Template
                <InfoIcon content="Quick-start templates for common tier structures. You can customize everything after selecting a preset." />
              </h3>
              <p className="text-sm text-muted-foreground m-0">
                Choose a pricing structure to get started quickly, or create
                custom tiers below
              </p>
            </div>
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              }}
            >
              {TIER_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className="group flex flex-col gap-3 p-5 bg-card border-2 border-border rounded-[10px] cursor-pointer transition-all duration-150 text-left hover:border-primary hover:-translate-y-0.5"
                  style={{ boxShadow: undefined }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <div className="flex-1">
                    <h4
                      className="text-base font-semibold text-foreground m-0 mb-1"
                      style={{ fontFamily: fontSans }}
                    >
                      {preset.name}
                    </h4>
                    <p className="text-[0.8125rem] text-muted-foreground m-0">
                      {preset.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                    {preset.tiers.map((t, i) => (
                      <span
                        key={i}
                        className="text-[0.6875rem] py-1 px-2 bg-muted text-muted-foreground rounded-md group-hover:bg-primary/10 group-hover:text-primary"
                        style={{ fontFamily: fontMono }}
                      >
                        {t.name}
                        {t.isCustomPricing ? " (Custom)" : ""}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Billing Cycle Selector */}
        <div className="bg-card border border-border rounded-xl py-5 px-6 flex items-center gap-4">
          <span className="text-[0.8rem] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
            Billing Cycles:
            <InfoIcon content="Select which payment frequencies you want to offer. These will be available for pricing across all tiers." />
          </span>
          <div className="flex gap-2 flex-wrap">
            {BILLING_CYCLE_OPTIONS.map((opt) => {
              const isActive = (
                state.global.availableBillingCycles ?? []
              ).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  className={`py-2 px-4 rounded-lg text-[0.85rem] font-medium cursor-pointer transition-all duration-150 ${
                    isActive
                      ? "bg-primary border-[1.5px] border-primary text-primary-foreground hover:bg-primary/90 hover:border-primary/90"
                      : "bg-card border-[1.5px] border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                  onClick={() => {
                    const current = state.global.availableBillingCycles ?? [];
                    let updated: BillingCycle[];
                    if (isActive) {
                      updated = current.filter((c) => c !== opt.value);
                      if (updated.length === 0) return;
                    } else {
                      updated = [...current, opt.value];
                    }
                    dispatch(
                      setAvailableBillingCycles({
                        billingCycles: updated,
                        lastModified: new Date().toISOString(),
                      }),
                    );
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {(state.global.availableBillingCycles ?? []).length === 0 && (
            <div className="text-[0.6875rem] text-destructive py-1.5 px-2.5 bg-destructive/15 rounded-md mt-2">
              Select at least one billing cycle to enable pricing
            </div>
          )}
        </div>

        <div
          className="so-scrollbar-h flex flex-nowrap gap-6 overflow-x-auto overflow-y-visible pb-4"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {tiers.map((tier, index) => (
            <TierCard
              key={tier.id}
              tier={tier}
              accent={getTierAccent(index)}
              dispatch={dispatch}
              onDelete={() => handleDeleteTier(tier.id)}
              isRecommended={tier.mostPopular}
              regularGroups={regularGroups}
              onMoveLeft={() => handleMoveTier(index, "left")}
              onMoveRight={() => handleMoveTier(index, "right")}
              isFirst={index === 0}
              isLast={index === tiers.length - 1}
            />
          ))}

          {isAddingTier ? (
            <div
              className="w-80 bg-card border-2 border-primary/40 rounded-xl p-6"
              style={{ animation: "tier-slide-up 0.2s ease-out" }}
            >
              <h3
                className="text-base font-bold text-foreground mb-5"
                style={{ fontFamily: fontSans }}
              >
                New Subscription Tier
              </h3>

              <div className="mb-4">
                <label
                  className="block text-[0.625rem] font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
                  style={{ fontFamily: fontMono }}
                >
                  Tier Name
                </label>
                <input
                  type="text"
                  value={newTier.name}
                  onChange={(e) =>
                    setNewTier({ ...newTier, name: e.target.value })
                  }
                  placeholder="e.g., Basic, Professional"
                  className="w-full text-base font-semibold text-foreground bg-background border border-input rounded-[10px] py-2.5 px-3.5 outline-none transition-all duration-150 focus:border-ring focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_30%,transparent)] placeholder:font-normal placeholder:text-muted-foreground"
                  style={{ fontFamily: fontSans }}
                  autoFocus
                />
              </div>

              <label className="flex items-center gap-2.5 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newTier.isCustomPricing}
                  onChange={(e) =>
                    setNewTier({
                      ...newTier,
                      isCustomPricing: e.target.checked,
                    })
                  }
                  className="w-[1.125rem] h-[1.125rem] cursor-pointer"
                  style={{ accentColor: "var(--status-warning)" }}
                />
                <span className="text-[0.8125rem] text-muted-foreground">
                  Custom Pricing (price varies per client)
                </span>
              </label>

              <div className="flex gap-2.5 mt-5">
                <button
                  onClick={handleAddTier}
                  disabled={!newTier.name.trim()}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-primary text-primary-foreground border-none hover:enabled:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                  style={{ fontFamily: fontSans }}
                >
                  Create Tier
                </button>
                <button
                  onClick={() => {
                    setIsAddingTier(false);
                    setNewTier({
                      name: "",
                      currency: "USD",
                      isCustomPricing: false,
                    });
                  }}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-150 bg-muted text-foreground border-none hover:bg-accent"
                  style={{ fontFamily: fontSans }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingTier(true)}
              className="group w-80 min-h-[280px] bg-card border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:bg-primary/10"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center transition-all duration-200 group-hover:bg-primary/10">
                <svg
                  className="w-6 h-6 text-muted-foreground transition-all duration-150 group-hover:text-primary"
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
              </div>
              <span
                className="text-[0.9375rem] font-semibold text-muted-foreground transition-all duration-150 group-hover:text-primary"
                style={{ fontFamily: fontSans }}
              >
                Add Subscription Tier
              </span>
            </button>
          )}
        </div>

        <div className="flex items-start gap-3.5 p-4 px-5 bg-status-warning/10 border border-status-warning/40 rounded-xl">
          <svg
            className="shrink-0 w-5 h-5 text-status-warning mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <p
              className="text-sm font-semibold text-status-warning mb-1"
              style={{ fontFamily: fontSans }}
            >
              Pricing is managed at the option group level
            </p>
            <p className="text-[0.8125rem] text-status-warning leading-relaxed">
              Billing cycles and pricing are configured per option group in the
              Service Catalog. Setup fees, recurring prices, and billing cycles
              apply to all tiers within each group.
            </p>
          </div>
        </div>
      </div>

      {pendingDeleteTierId && (
        <ConfirmDialog
          title="Delete this tier?"
          message="This will remove the tier and all its pricing configuration. This action cannot be undone."
          confirmLabel="Delete Tier"
          variant="danger"
          onConfirm={confirmDeleteTier}
          onCancel={() => setPendingDeleteTierId(null)}
        />
      )}
    </>
  );
}

interface TierCardProps {
  tier: ServiceSubscriptionTier;
  accent: { color: string; bg: string; name: string };
  dispatch: DocumentDispatch<ServiceOfferingAction>;
  onDelete: () => void;
  isRecommended?: boolean;
  regularGroups: OptionGroup[];
  onMoveLeft: () => void;
  onMoveRight: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const TierCard = memo(function TierCard({
  tier,
  accent,
  dispatch,
  onDelete,
  isRecommended,
  regularGroups,
  onMoveLeft,
  onMoveRight,
  isFirst,
  isLast,
}: TierCardProps) {
  const [localName, setLocalName] = useState(tier.name);
  const [localDescription, setLocalDescription] = useState(
    tier.description || "",
  );
  const isCustomPricing = tier.isCustomPricing ?? false;

  const calculatedPrice = useMemo(
    () => calculateTierRecurringPrice(regularGroups, "MONTHLY", tier.id),
    [regularGroups, tier.id],
  );

  const handleNameBlur = () => {
    if (localName !== tier.name && localName.trim()) {
      dispatch(
        updateTier({
          id: tier.id,
          name: localName.trim(),
          lastModified: new Date().toISOString(),
        }),
      );
    }
  };

  const handleDescriptionBlur = () => {
    if (localDescription !== (tier.description || "")) {
      dispatch(
        updateTier({
          id: tier.id,
          description: localDescription,
          lastModified: new Date().toISOString(),
        }),
      );
    }
  };

  return (
    <div
      className={`w-80 bg-card rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-200 relative hover:shadow-lg hover:-translate-y-0.5 ${
        isRecommended
          ? "border-2 border-primary scale-[1.02] z-[1] hover:scale-[1.02] hover:-translate-y-0.5"
          : ""
      }`}
      style={{
        maxHeight: "85vh",
        animation: "tier-slide-up 0.3s ease-out",
      }}
    >
      {/* Most Popular Badge or Set Button — positioned top-right */}
      {isRecommended ? (
        <button
          className="absolute top-[-1px] right-4 flex items-center gap-1 py-1 px-3.5 text-primary-foreground text-[0.6875rem] font-semibold uppercase tracking-wide rounded-b-lg z-[2] border-none cursor-pointer transition-opacity duration-150 hover:opacity-80"
          style={{
            background: "var(--primary)",
            boxShadow: "var(--shadow-primary)",
          }}
          title="Click to remove Most Popular"
          onClick={() => {
            dispatch(
              updateTier({
                id: tier.id,
                mostPopular: false,
                lastModified: new Date().toISOString(),
              }),
            );
          }}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Most Popular
        </button>
      ) : (
        <button
          className="absolute top-2 right-3 flex items-center gap-1 py-1 px-3 text-muted-foreground text-[0.625rem] font-medium uppercase tracking-wide rounded-full z-[2] bg-transparent border border-transparent cursor-pointer transition-all duration-150 hover:border-primary/40 hover:text-primary hover:bg-primary/10"
          onClick={() => {
            dispatch(
              updateTier({
                id: tier.id,
                mostPopular: true,
                lastModified: new Date().toISOString(),
              }),
            );
          }}
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Set as Popular
        </button>
      )}
      <div className="h-1 w-full" style={{ background: accent.color }} />

      <div className="so-scrollbar-v p-6 overflow-y-auto flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <span
              className="block text-[0.625rem] font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
              style={{ fontFamily: fontMono }}
            >
              Tier Name
            </span>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onBlur={handleNameBlur}
              className="w-full text-[1.375rem] font-bold text-foreground bg-transparent border-none border-b-2 border-b-transparent pb-1 pl-0 transition-all duration-150 outline-none hover:border-b-border focus:border-b-ring"
              style={{ fontFamily: fontSans }}
            />
          </div>
          <button
            onClick={onDelete}
            className="p-1.5 text-muted-foreground bg-transparent border-none rounded-md cursor-pointer transition-all duration-150 hover:text-destructive hover:bg-destructive/15"
          >
            <svg
              width="20"
              height="20"
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

        {isCustomPricing && (
          <div className="flex items-center gap-2 py-3 px-4 bg-status-warning/10 border border-status-warning/40 rounded-[10px] mb-4">
            <svg
              className="w-5 h-5 text-status-warning"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <span className="block text-[0.8125rem] font-semibold text-status-warning">
                Custom Pricing
              </span>
              <span className="text-[0.6875rem] text-status-warning">
                Price varies per client
              </span>
            </div>
          </div>
        )}

        <label className="flex items-center gap-2.5 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={tier.excludeFromSetupFee ?? false}
            onChange={(e) => {
              dispatch(
                updateTier({
                  id: tier.id,
                  excludeFromSetupFee: e.target.checked,
                  lastModified: new Date().toISOString(),
                }),
              );
            }}
            className="w-[1.125rem] h-[1.125rem] cursor-pointer"
            style={{ accentColor: "var(--primary)" }}
          />
          <span className="text-[0.8125rem] text-muted-foreground">
            Exclude from setup fee
          </span>
        </label>

        {!isCustomPricing && (
          <div className="mb-4">
            <div className="mb-1.5">
              <span
                className="block text-[0.625rem] font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
                style={{ fontFamily: fontMono }}
              >
                Recurring Price
                <InfoIcon content="This price is automatically calculated from the services and pricing configured in the Service Catalog. It is read-only — to change it, adjust pricing in your option groups." />
              </span>
            </div>

            <div className="flex items-center gap-2 py-3.5 px-4 bg-background rounded-[10px] border border-input">
              <span>$</span>
              <span
                className="text-[1.375rem] font-semibold text-status-success"
                style={{ fontFamily: fontMono }}
              >
                {formatPrice(calculatedPrice.monthlyTotal).replace("$", "")}
              </span>
              <span className="text-sm text-status-success font-medium">
                /mo
              </span>
            </div>

            {calculatedPrice.groupBreakdown.length > 0 && (
              <div className="mt-2 py-2 px-2.5 bg-background rounded-md border border-input">
                <span className="block text-[0.625rem] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                  Sum of {calculatedPrice.groupBreakdown.length} service group
                  {calculatedPrice.groupBreakdown.length !== 1 ? "s" : ""}
                </span>
                {calculatedPrice.groupBreakdown.map((g) => (
                  <div
                    key={g.groupId}
                    className="flex items-center justify-between py-[0.1875rem]"
                  >
                    <span
                      className={`flex items-center gap-1 text-xs ${g.hasPrice ? "text-muted-foreground" : "text-status-warning"}`}
                    >
                      {!g.hasPrice && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3 text-status-warning"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      )}
                      {g.groupName}
                    </span>
                    <span
                      className={`text-xs font-medium ${g.hasPrice ? "text-foreground" : "text-status-warning italic"}`}
                      style={{ fontFamily: fontMono }}
                    >
                      {g.hasPrice ? formatPrice(g.monthlyAmount) : "$0"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {calculatedPrice.missingPriceGroups.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2 py-1.5 px-2 text-[0.6875rem] text-status-warning bg-status-warning/10 border border-status-warning/40 rounded-md">
                <svg
                  className="shrink-0 w-3.5 h-3.5 text-status-warning"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  {calculatedPrice.missingPriceGroups.length} group
                  {calculatedPrice.missingPriceGroups.length !== 1
                    ? "s"
                    : ""}{" "}
                  without pricing (counted as $0)
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <span
            className="block text-[0.625rem] font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
            style={{ fontFamily: fontMono }}
          >
            Description
          </span>
          <textarea
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            placeholder="Add a description..."
            rows={2}
            className="w-full text-[0.8125rem] text-foreground bg-background border border-input rounded-[10px] p-3 resize-none outline-none transition-all duration-150 focus:border-ring focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_30%,transparent)] placeholder:text-muted-foreground"
            style={{ fontFamily: fontSans }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-3 px-6 bg-muted border-t border-border">
        <div className="flex items-center gap-1">
          <button
            onClick={onMoveLeft}
            disabled={isFirst}
            className="p-1.5 rounded-md border-none cursor-pointer transition-all duration-150 bg-transparent text-muted-foreground hover:enabled:text-primary hover:enabled:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move left"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={onMoveRight}
            disabled={isLast}
            className="p-1.5 rounded-md border-none cursor-pointer transition-all duration-150 bg-transparent text-muted-foreground hover:enabled:text-primary hover:enabled:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move right"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <span className="text-[0.6875rem] text-muted-foreground">
          Matrix view for service levels
        </span>
      </div>
    </div>
  );
});
