import { useState } from "react";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import type {
  DebtLineItem,
  Service,
  ServiceMetric,
} from "../../../document-models/subscription-instance/v1/gen/schema/types.js";
import type { ViewMode } from "../types.js";
import { MetricActions } from "./MetricActions.js";
import {
  formatCurrency as fmtCurrency,
  formatBillingCycleSuffix,
  formatDiscountBadge,
} from "./billing-utils.js";
import {
  removeServiceFromGroup,
  addServiceGroup,
  removeServiceGroup,
} from "../../../document-models/subscription-instance/v1/gen/service-group/creators.js";
import { useServiceOfferingAddons } from "../hooks/useServiceOfferingAddons.js";
import { useNowISO } from "./SimulatedClock.js";

interface ServicesPanelProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  mode: ViewMode;
}

function UsageBar({
  serviceId,
  metric,
  dispatch,
  isOperator,
  customerName,
  debtLineItems,
}: {
  serviceId: string;
  metric: ServiceMetric;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  isOperator: boolean;
  customerName?: string | null;
  debtLineItems: readonly DebtLineItem[];
}) {
  const freeLimit = metric.freeLimit ?? 0;
  const paidLimit = metric.paidLimit ?? null;
  const displayLimit = paidLimit ?? freeLimit;

  const percentage =
    displayLimit > 0
      ? Math.min(100, (metric.currentUsage / displayLimit) * 100)
      : 0;

  const freePortion =
    displayLimit > 0 ? Math.min(100, (freeLimit / displayLimit) * 100) : 0;

  // Find the most recent DYNAMIC slice for this metric. NON_CUMULATIVE
  // meters keep showing real-state usage after payment (the meter doesn't
  // reset), so the visual treatment for "is this metric currently paid"
  // can't depend on whether the slice is frozen — it must look at
  // payment status of whichever slice covered the latest billed period.
  const latestDynamicSlice = debtLineItems
    .filter((s) => s.origin === "DYNAMIC" && s.sourceMetricId === metric.id)
    .reduce<(typeof debtLineItems)[number] | null>((latest, s) => {
      if (!latest || s.chargedAt > latest.chargedAt) return s;
      return latest;
    }, null);
  const latestSlicePaid = latestDynamicSlice?.status === "FULLY_PAID";
  const latestSliceOpen =
    latestDynamicSlice != null && latestDynamicSlice.status !== "FULLY_PAID";

  const getBarColor = () => {
    // Latest overage paid → emerald. Operator has resolved the financial
    // side; the meter is honest about real usage but no money is owed for
    // what's shown.
    if (latestSlicePaid) return "si-usage-bar__fill--paid";
    if (percentage >= 90) return "si-usage-bar__fill--danger";
    if (percentage >= 75) return "si-usage-bar__fill--warning";
    return "si-usage-bar__fill--normal";
  };

  const isOverFree = metric.currentUsage > freeLimit && freeLimit > 0;

  // Per-metric badge logic uses the LATEST DYNAMIC slice (computed above
  // for bar color), regardless of frozen state:
  //
  // - latest paid (frozen or not) → "Paid" success badge — operator has
  //   collected for the most recent overage period; the meter still shows
  //   real usage because NON_CUMULATIVE doesn't reset on payment
  // - latest open (CHARGED/INVOICED/PARTIALLY_PAID) → "X over free limit"
  //   warning badge — operator action needed
  // - no slice → no badge (within free or no overage yet)

  return (
    <div className="si-metric">
      <div className="si-metric__header">
        <span className="si-metric__name">{metric.name}</span>
        <span className="si-metric__value">
          {metric.currentUsage.toLocaleString()}
          {displayLimit > 0 && ` / ${displayLimit.toLocaleString()}`}
          <span className="si-metric__unit"> {metric.unitName}</span>
        </span>
      </div>
      <div className="si-metric__body">
        {displayLimit > 0 && (
          <div className="si-usage-bar">
            {/* Free portion marker */}
            {paidLimit != null && freeLimit > 0 && freeLimit < paidLimit && (
              <div
                className="si-usage-bar__free-marker"
                style={{ left: `${freePortion}%` }}
                title={`${freeLimit.toLocaleString()} free`}
              />
            )}
            <div
              className={`si-usage-bar__fill ${getBarColor()}`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={metric.currentUsage}
              aria-valuemin={0}
              aria-valuemax={displayLimit}
            />
          </div>
        )}
        <MetricActions
          serviceId={serviceId}
          metric={metric}
          dispatch={dispatch}
          isOperator={isOperator}
          customerName={customerName}
        />
      </div>
      {/* Free/Paid limit info */}
      {paidLimit != null && freeLimit > 0 && freeLimit !== paidLimit && (
        <p className="si-metric__paid-limit">
          {freeLimit.toLocaleString()} free · {paidLimit.toLocaleString()} max
          {metric.unitCost && (
            <span>
              {" · "}overage:{" "}
              {fmtCurrency(metric.unitCost.amount, metric.unitCost.currency)}/
              {metric.unitName}
            </span>
          )}
        </p>
      )}
      {/* Overage indicator — shown when the LATEST overage slice is still
          open (CHARGED/INVOICED/PARTIALLY_PAID). Once that slice settles
          or freezes-then-pays, this hides and the paid indicator shows. */}
      {isOverFree && metric.unitCost && latestSliceOpen && (
        <div className="si-metric__overage">
          <strong>{(metric.currentUsage - freeLimit).toLocaleString()}</strong>{" "}
          {metric.unitName} over free limit
        </div>
      )}
      {/* Paid indicator — latest overage slice is FULLY_PAID. The meter
          still shows real-state usage (NON_CUMULATIVE doesn't reset on
          payment) but the financial side is settled. */}
      {isOverFree && metric.unitCost && latestSlicePaid && (
        <div className="si-metric__overage si-metric__overage--paid">
          Paid through current usage
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --
         Schema says these are non-nullable but legacy documents created before
         the metric-type refactor may have them undefined at runtime. */}
      {metric.accrualCycle && metric.metricType && (
        <p className="si-metric__reset">
          <span className="si-metric__reset-period">
            {metric.accrualCycle.charAt(0) +
              metric.accrualCycle.slice(1).toLowerCase()}{" "}
            accrual ·{" "}
            {metric.metricType === "CUMULATIVE"
              ? "cumulative"
              : "non-cumulative"}
          </span>
        </p>
      )}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  mode: ViewMode;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  customerName?: string | null;
  groupId?: string;
  subscriptionStatus?: string;
  debtLineItems: readonly DebtLineItem[];
}

function ServiceCard({
  service,
  mode,
  dispatch,
  customerName,
  groupId,
  subscriptionStatus,
  debtLineItems,
}: ServiceCardProps) {
  return (
    <div className="si-service-card">
      <div className="si-service-card__header">
        <h4 className="si-service-card__name">{service.name || "Service"}</h4>
        {service.customValue && (
          <span className="si-service-card__custom-value">
            {service.customValue}
          </span>
        )}
      </div>

      {service.description && (
        <p className="si-service-card__desc">{service.description}</p>
      )}

      {/* Metrics / Usage */}
      {service.metrics.length > 0 && (
        <div className="si-service-card__metrics">
          {service.metrics.map((metric) => (
            <UsageBar
              key={metric.id}
              serviceId={service.id}
              metric={metric}
              dispatch={dispatch}
              isOperator={mode === "operator"}
              customerName={customerName}
              debtLineItems={debtLineItems}
            />
          ))}
        </div>
      )}

      {/* Remove service from group (operator, ACTIVE/PENDING) */}
      {mode === "operator" &&
        groupId &&
        (subscriptionStatus === "ACTIVE" ||
          subscriptionStatus === "PENDING") && (
          <div className="si-service-card__actions">
            <button
              type="button"
              className="si-btn si-btn--xs si-btn--danger-ghost"
              onClick={() => {
                dispatch(
                  removeServiceFromGroup({
                    groupId,
                    serviceId: service.id,
                  }),
                );
              }}
            >
              Remove
            </button>
          </div>
        )}
    </div>
  );
}

function AddServiceGroupButton({
  dispatch,
  subscriptionStatus,
  serviceOfferingId,
  existingGroupNames,
  globalCurrency,
  billingCycle,
}: {
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  subscriptionStatus: string;
  serviceOfferingId: string | null | undefined;
  existingGroupNames: string[];
  globalCurrency: string;
  billingCycle: string | null;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddonId, setSelectedAddonId] = useState<string>("");
  const nowISO = useNowISO();
  const { availableAddons, loading, hasOffering } = useServiceOfferingAddons(
    serviceOfferingId,
    existingGroupNames,
  );

  const canAdd =
    subscriptionStatus === "PENDING" || subscriptionStatus === "ACTIVE";
  if (!canAdd) return null;

  const selectedAddon = availableAddons.find(
    (a) => a.optionGroupId === selectedAddonId,
  );

  const handleAdd = () => {
    if (!selectedAddon) return;
    const amount = selectedAddon.recurringAmount ?? undefined;
    const currency =
      selectedAddon.recurringCurrency ?? globalCurrency ?? undefined;
    const cycle = selectedAddon.recurringBillingCycle ?? billingCycle;
    dispatch(
      addServiceGroup({
        groupId: generateId(),
        name: selectedAddon.name,
        optional: true,
        recurringAmount: amount,
        recurringCurrency: currency,
        recurringBillingCycle: cycle
          ? (cycle as
              | "MONTHLY"
              | "QUARTERLY"
              | "SEMI_ANNUAL"
              | "ANNUAL"
              | "ONE_TIME")
          : undefined,
        setupAmount: selectedAddon.setupAmount ?? undefined,
        setupCurrency: selectedAddon.setupCurrency ?? currency,
        effectiveDate: nowISO(),
        setupSliceId: generateId(),
        recurringSliceId: generateId(),
      }),
    );
    setShowModal(false);
    setSelectedAddonId("");
  };

  return (
    <>
      <button
        type="button"
        className="si-btn si-btn--sm si-btn--ghost"
        style={{ marginTop: 12 }}
        onClick={() => setShowModal(true)}
        disabled={loading}
      >
        + Add Service Group
      </button>
      {showModal && (
        <div
          className="si-modal-overlay"
          onClick={() => {
            setShowModal(false);
            setSelectedAddonId("");
          }}
        >
          <div
            className="si-modal si-modal--md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="si-modal__header">
              <h3 className="si-modal__title">Add Service Group</h3>
              {subscriptionStatus === "ACTIVE" && (
                <span className="si-modal__subtitle">
                  Prorated cost will be charged for the remaining cycle
                </span>
              )}
            </div>
            <div className="si-modal__body">
              {!hasOffering && (
                <p className="si-modal__message">
                  Service offering not found. Cannot load available add-ons.
                </p>
              )}
              {hasOffering && availableAddons.length === 0 && (
                <p className="si-modal__message">
                  No additional add-on groups available from the service
                  offering.
                </p>
              )}
              {availableAddons.length > 0 && (
                <div className="si-tier-options">
                  {availableAddons.map((addon) => (
                    <div
                      key={addon.optionGroupId}
                      className={`si-tier-option${selectedAddonId === addon.optionGroupId ? " si-tier-option--selected" : ""}`}
                      onClick={() => setSelectedAddonId(addon.optionGroupId)}
                    >
                      <input
                        type="radio"
                        className="si-tier-option__radio"
                        checked={selectedAddonId === addon.optionGroupId}
                        onChange={() => setSelectedAddonId(addon.optionGroupId)}
                      />
                      <div className="si-tier-option__content">
                        <span className="si-tier-option__name">
                          {addon.name}
                        </span>
                        {addon.description && (
                          <span className="si-tier-option__desc">
                            {addon.description}
                          </span>
                        )}
                        <span className="si-tier-option__meta">
                          {addon.recurringAmount != null
                            ? `${fmtCurrency(addon.recurringAmount, addon.recurringCurrency || globalCurrency)} / ${(addon.recurringBillingCycle || billingCycle || "cycle").toLowerCase()}`
                            : "No recurring cost"}
                          {addon.setupAmount != null &&
                            ` + ${fmtCurrency(addon.setupAmount, addon.setupCurrency || globalCurrency)} setup`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="si-modal__footer">
              <button
                type="button"
                className="si-btn si-btn--ghost"
                onClick={() => {
                  setShowModal(false);
                  setSelectedAddonId("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="si-btn si-btn--primary"
                onClick={handleAdd}
                disabled={!selectedAddon}
              >
                Add Group
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ServicesPanel({
  document,
  dispatch,
  mode,
}: ServicesPanelProps) {
  const state = document.state.global;
  const nowISO = useNowISO();

  // Split groups into recurring (non-optional) and add-ons (optional)
  const recurringGroups = state.serviceGroups.filter((g) => !g.optional);
  const addonGroups = state.serviceGroups.filter((g) => g.optional);

  const hasRecurring = state.services.length > 0 || recurringGroups.length > 0;
  const hasAddons = addonGroups.length > 0;

  const recurringServiceCount =
    state.services.length +
    recurringGroups.reduce((acc, g) => acc + g.services.length, 0);

  const addonServiceCount = addonGroups.reduce(
    (acc, g) => acc + g.services.length,
    0,
  );

  if (!hasRecurring && !hasAddons) {
    return (
      <div className="si-panel">
        <div className="si-panel__header">
          <h3 className="si-panel__title">Services</h3>
        </div>
        <div className="si-empty">
          <svg
            className="si-empty__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p className="si-empty__text">No services configured</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Recurring Services */}
      {hasRecurring && (
        <div className="si-panel">
          <div className="si-panel__header">
            <h3 className="si-panel__title">Recurring Services</h3>
            <span className="si-panel__count">
              {recurringServiceCount} services
            </span>
          </div>

          {/* Standalone Services */}
          {state.services.length > 0 && (
            <div className="si-services-grid">
              {state.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  mode={mode}
                  dispatch={dispatch}
                  customerName={state.customerName}
                  debtLineItems={state.debtLineItems}
                />
              ))}
            </div>
          )}

          {/* Non-optional Service Groups */}
          {recurringGroups.map((group) => (
            <div key={group.id} className="si-service-group">
              <div className="si-service-group__header">
                <h4 className="si-service-group__name">{group.name}</h4>
                {group.recurringCost && (
                  <span className="si-service-group__price">
                    {group.recurringCost.discount && (
                      <>
                        <span className="si-service-group__original-price">
                          {fmtCurrency(
                            group.recurringCost.discount.originalAmount,
                            group.recurringCost.currency,
                          )}
                        </span>
                        <span className="si-service-group__discount-badge">
                          {formatDiscountBadge(group.recurringCost.discount)}
                        </span>
                      </>
                    )}
                    {fmtCurrency(
                      group.recurringCost.amount,
                      group.recurringCost.currency,
                    )}
                    {formatBillingCycleSuffix(group.recurringCost.billingCycle)}
                  </span>
                )}
              </div>
              <div className="si-services-grid">
                {group.services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    mode={mode}
                    dispatch={dispatch}
                    customerName={state.customerName}
                    groupId={group.id}
                    subscriptionStatus={state.status}
                    debtLineItems={state.debtLineItems}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Add Service Group button — at panel level, not per group */}
          {mode === "operator" && (
            <AddServiceGroupButton
              dispatch={dispatch}
              subscriptionStatus={state.status}
              serviceOfferingId={state.serviceOfferingId}
              existingGroupNames={state.serviceGroups.map((g) => g.name)}
              globalCurrency={state.globalCurrency || "USD"}
              billingCycle={state.selectedBillingCycle || null}
            />
          )}
        </div>
      )}

      {/* Add-ons */}
      {hasAddons && (
        <div className="si-panel">
          <div className="si-panel__header">
            <h3 className="si-panel__title">Add-ons</h3>
            <span className="si-panel__count">
              {addonGroups.length} groups, {addonServiceCount} services
            </span>
          </div>

          {addonGroups.map((group) => (
            <div key={group.id} className="si-service-group">
              <div className="si-service-group__header">
                <h4 className="si-service-group__name">{group.name}</h4>
                <span className="si-badge si-badge--violet si-badge--sm">
                  Optional
                </span>
                {group.recurringCost && (
                  <span className="si-service-group__price">
                    {group.recurringCost.discount && (
                      <>
                        <span className="si-service-group__original-price">
                          {fmtCurrency(
                            group.recurringCost.discount.originalAmount,
                            group.recurringCost.currency,
                          )}
                        </span>
                        <span className="si-service-group__discount-badge">
                          {formatDiscountBadge(group.recurringCost.discount)}
                        </span>
                      </>
                    )}
                    {fmtCurrency(
                      group.recurringCost.amount,
                      group.recurringCost.currency,
                    )}
                    {formatBillingCycleSuffix(group.recurringCost.billingCycle)}
                  </span>
                )}
                {mode === "operator" &&
                  (state.status === "ACTIVE" || state.status === "PENDING") && (
                    <button
                      type="button"
                      className="si-btn si-btn--xs si-btn--danger-ghost"
                      style={{ marginLeft: "auto" }}
                      onClick={() =>
                        dispatch(
                          removeServiceGroup({
                            groupId: group.id,
                            effectiveDate: nowISO(),
                            creditSliceId: generateId(),
                          }),
                        )
                      }
                      title="Remove this service group (D-2: prorated credit if active)"
                    >
                      Remove Group
                    </button>
                  )}
              </div>
              <div className="si-services-grid">
                {group.services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    mode={mode}
                    dispatch={dispatch}
                    customerName={state.customerName}
                    groupId={group.id}
                    subscriptionStatus={state.status}
                    debtLineItems={state.debtLineItems}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
