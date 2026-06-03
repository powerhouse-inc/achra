import { useState } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import type { ViewMode } from "../types.js";
import {
  formatCurrency,
  formatDate,
  formatBillingCycleSuffix,
  formatDiscountBadge,
  computeBillingBreakdown,
  type GroupBillingBreakdown,
  type MetricOverage,
} from "./billing-utils.js";

interface BillingPanelProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  mode: ViewMode;
}

// Netted estimate row: a metric's projection minus what's already been
// crystallised in the current cycle's slices. Only metrics with positive
// `additional` make it into the displayed breakdown so the rows always
// sum exactly to the estimate total.
interface EstimateSource {
  metricId: string;
  name: string;
  groupName: string | null;
  currentUsage: number;
  freeLimit: number;
  unitName: string;
  unitCostAmount: number;
  excess: number;
  additional: number;
}

// "This Period" — projection-only view of what the next invoice will look
// like at cycle close, given current usage. Outstanding balance, setup
// charges, and per-slice payment status all live in DebtLedgerPanel —
// this panel does not show historical money owed.

export function BillingPanel({ document }: BillingPanelProps) {
  const state = document.state.global;
  const breakdown = computeBillingBreakdown(state);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const hasAnyData =
    state.nextBillingDate ||
    breakdown.groupBreakdowns.length > 0 ||
    state.services.length > 0;

  if (!hasAnyData) {
    return (
      <div className="si-panel">
        <div className="si-panel__header">
          <h3 className="si-panel__title">This Period</h3>
        </div>
        <div className="si-empty">
          <p className="si-empty__text">No billing data yet</p>
        </div>
      </div>
    );
  }

  const currency = breakdown.currency;
  const cycleStart = state.currentBillingCycleStart;

  // Slice-driven "Usage so far": sum of unsettled DYNAMIC slices in the
  // current cycle. `(debit - settled)` already nets out paid amounts —
  // FULLY_PAID slices contribute zero, which is what we want.
  // Per-metric crystallised dollars (frozen + active, paid + unpaid)
  // accumulate so we can net the estimate against them: if the customer
  // has already been billed for the overage, don't re-estimate the same
  // dollars at the next accrual boundary.
  //
  // Per 2026-05-07 stakeholder call: live (unfrozen) DYNAMIC slices
  // cannot be invoiced or paid mid-cycle. Charge happens at accrual
  // close. The "Issue invoice" affordance that previously surfaced an
  // active CHARGED slice is removed — overage is informational here
  // until the slice freezes.
  let liveUsageTotal = 0;
  const crystallisedByMetric = new Map<string, number>();
  for (const s of state.debtLineItems) {
    if (s.origin !== "DYNAMIC") continue;
    if (cycleStart && s.chargedAt < cycleStart) continue;
    liveUsageTotal += s.debitAmount - s.settledAmount;
    if (s.sourceMetricId) {
      const prior = crystallisedByMetric.get(s.sourceMetricId) ?? 0;
      crystallisedByMetric.set(s.sourceMetricId, prior + s.debitAmount);
    }
  }

  // Estimated *additional* overage: what current usage would crystallise at
  // the next accrual boundary, MINUS what's already been billed in this
  // cycle (Model A — cycle-quota). For each metric, `projection -
  // alreadyCrystallised` gives the marginal new charge. Floored at 0.
  // Collect contributing metrics with group context so the breakdown can
  // render the same set the estimate sums to.
  const contributingMetrics: EstimateSource[] = [];
  let estimatedAdditionalOverage = 0;
  function pushIfPositive(o: MetricOverage, groupName: string | null) {
    const alreadyBilled = crystallisedByMetric.get(o.metricId) ?? 0;
    const additional = Math.max(0, o.projectedCost - alreadyBilled);
    if (additional <= 0) return;
    estimatedAdditionalOverage += additional;
    contributingMetrics.push({
      metricId: o.metricId,
      name: o.metricName,
      groupName,
      currentUsage: o.currentUsage,
      freeLimit: o.freeLimit,
      unitName: o.unitName,
      unitCostAmount: o.unitCostAmount,
      excess: o.excess,
      additional,
    });
  }
  for (const g of breakdown.groupBreakdowns) {
    for (const o of g.metricOverages) pushIfPositive(o, g.groupName);
  }
  for (const o of breakdown.standaloneOverages) pushIfPositive(o, null);

  // Show the estimate only when there's no unsettled live tally to confuse
  // it with AND the netted additional > 0.
  const showEstimate = liveUsageTotal === 0 && estimatedAdditionalOverage > 0;

  const singleSource =
    contributingMetrics.length === 1 ? contributingMetrics[0] : null;

  // Recurring (next invoice): is it already paid? Read SUBSCRIPTION_FEE
  // slices for the current cycle and check their statuses.
  let recurringSlicesInCycle = 0;
  let recurringSlicesPaid = 0;
  for (const s of state.debtLineItems) {
    if (s.origin !== "SUBSCRIPTION_FEE") continue;
    if (cycleStart && s.chargedAt < cycleStart) continue;
    recurringSlicesInCycle += 1;
    if (s.status === "FULLY_PAID") recurringSlicesPaid += 1;
  }
  const recurringPaidThisCycle =
    recurringSlicesInCycle > 0 &&
    recurringSlicesPaid === recurringSlicesInCycle;

  // Sum *untapped* credit slices in the current cycle. A credit slice
  // emitted in this cycle (REMOVE_SERVICE_GROUP, CHANGE_PLAN, or
  // CANCEL_SUBSCRIPTION refund) has its untapped portion = settledAmount
  // − debitAmount. When the operator applies credit (APPLY_CREDIT),
  // settledAmount is moved toward debitAmount, draining the untapped
  // portion. Once fully consumed, the slice contributes 0 here — it's
  // already done its job and shouldn't keep showing up in the projection.
  let cycleCreditTotal = 0;
  for (const s of state.debtLineItems) {
    if (cycleStart && s.chargedAt < cycleStart) continue;
    if (s.debitAmount >= 0) continue;
    const untapped = s.settledAmount - s.debitAmount;
    if (untapped > 0) cycleCreditTotal += untapped;
  }

  // Existing customer credit balance — surplus carried in from prior cycles
  // (totalCredit > totalDebt). This is money the customer has already paid
  // that hasn't yet been absorbed by a new charge. The FIFO+priority
  // allocator will absorb this against the next invoice. Projected at
  // cycle close shows the customer's NET obligation, so we subtract it.
  const netPosition = (state.totalDebt ?? 0) - (state.totalCredit ?? 0);
  const customerCreditBalance = netPosition < 0 ? -netPosition : 0;
  // Avoid double-counting: if a credit slice was emitted this cycle and
  // hasn't been absorbed yet, it shows up in BOTH cycleCreditTotal AND
  // customerCreditBalance. The "carry-over" portion is whatever remains
  // after this cycle's fresh credits are accounted for.
  const carryOverCredit = Math.max(0, customerCreditBalance - cycleCreditTotal);

  const fixedTotal = breakdown.fixedTotal;
  const projectedTotal = Math.max(
    0,
    fixedTotal +
      liveUsageTotal +
      estimatedAdditionalOverage -
      cycleCreditTotal -
      carryOverCredit,
  );
  const hasFixedDetails =
    fixedTotal > 0 || state.services.some((svc) => svc.recurringCost != null);
  const hasDetails = hasFixedDetails || showEstimate;

  return (
    <div className="si-panel">
      <div className="si-panel__header">
        <h3 className="si-panel__title">This Period</h3>
        {cycleStart && state.nextBillingDate && (
          <span className="si-panel__subtitle">
            {formatDate(cycleStart)} — {formatDate(state.nextBillingDate)}
            {breakdown.billingCycle && (
              <>
                {" · "}
                {breakdown.billingCycle.charAt(0) +
                  breakdown.billingCycle.slice(1).toLowerCase()}
              </>
            )}
          </span>
        )}
      </div>

      <div className="si-this-period">
        <div className="si-this-period__row">
          <span className="si-this-period__label">
            Recurring (next invoice)
          </span>
          <span className="si-this-period__right">
            {recurringPaidThisCycle && (
              <span className="si-badge si-badge--sm si-badge--emerald">
                Paid for this cycle
              </span>
            )}
            <span className="si-this-period__value">
              {formatCurrency(fixedTotal, currency)}
            </span>
          </span>
        </div>

        {(liveUsageTotal > 0 || showEstimate) && (
          <div className="si-this-period__row">
            <span className="si-this-period__label">
              {liveUsageTotal > 0 ? "Usage so far" : "Will accrue next"}
              {showEstimate && state.nextBillingDate && (
                <span className="si-this-period__source">
                  {" — at "}
                  {formatDate(state.nextBillingDate)}
                </span>
              )}
              {showEstimate && singleSource && (
                <span className="si-this-period__source">
                  {" · "}
                  {singleSource.name}{" "}
                  {singleSource.currentUsage.toLocaleString()}/
                  {singleSource.freeLimit.toLocaleString()}{" "}
                  {singleSource.unitName}
                </span>
              )}
              {showEstimate &&
                !singleSource &&
                contributingMetrics.length > 1 && (
                  <span className="si-this-period__source">
                    {" · "}
                    {contributingMetrics.length} metrics over free limit
                  </span>
                )}
            </span>
            <span className="si-this-period__right">
              <span
                className={`si-this-period__value${
                  liveUsageTotal > 0
                    ? " si-this-period__value--accent"
                    : " si-this-period__value--estimate"
                }`}
              >
                {liveUsageTotal > 0
                  ? formatCurrency(liveUsageTotal, currency)
                  : `~ ${formatCurrency(estimatedAdditionalOverage, currency)}`}
              </span>
            </span>
          </div>
        )}

        {cycleCreditTotal > 0 && (
          <div className="si-this-period__row">
            <span className="si-this-period__label">
              Credit applied this cycle
              <span className="si-this-period__source">
                {" — refunds & mid-cycle removals"}
              </span>
            </span>
            <span className="si-this-period__right">
              <span className="si-this-period__value si-this-period__value--credit">
                −{formatCurrency(cycleCreditTotal, currency)}
              </span>
            </span>
          </div>
        )}

        {carryOverCredit > 0 && (
          <div className="si-this-period__row">
            <span className="si-this-period__label">
              Credit on account
              <span className="si-this-period__source">
                {" — carried forward from prior cycle"}
              </span>
            </span>
            <span className="si-this-period__right">
              <span className="si-this-period__value si-this-period__value--credit">
                −{formatCurrency(carryOverCredit, currency)}
              </span>
            </span>
          </div>
        )}

        <div className="si-this-period__row si-this-period__row--total">
          <span className="si-this-period__label">
            Projected at cycle close
          </span>
          <span className="si-this-period__value si-this-period__value--total">
            {formatCurrency(projectedTotal, currency)}
            {breakdown.billingCycle && (
              <span className="si-this-period__cycle">
                {formatBillingCycleSuffix(breakdown.billingCycle)}
              </span>
            )}
          </span>
        </div>
      </div>

      {(liveUsageTotal > 0 || showEstimate) && (
        <p className="si-billing-disclaimer">
          {liveUsageTotal > 0
            ? "Live usage tally for the current cycle. Frozen at cycle close."
            : recurringPaidThisCycle
              ? "Forecast — separate from this cycle's invoice (paid in full). Charged at the next accrual boundary if usage stays put."
              : "Forecast — not yet billed. Becomes a real charge at the next accrual boundary if usage stays put."}
        </p>
      )}

      {hasDetails && (
        <button
          type="button"
          className="si-this-period__toggle"
          onClick={() => setDetailsExpanded(!detailsExpanded)}
          aria-expanded={detailsExpanded}
        >
          <svg
            className="si-this-period__chevron"
            data-expanded={detailsExpanded}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {detailsExpanded ? "Hide breakdown" : "See per-service breakdown"}
        </button>
      )}

      {detailsExpanded && hasDetails && (
        <div className="si-this-period__details">
          {fixedTotal > 0 && (
            <div className="si-billing-section">
              <div className="si-billing-section-label">
                <span className="si-billing-section-label__text">
                  Recurring fees
                </span>
              </div>
              <div className="si-billing-section__lines">
                {breakdown.groupBreakdowns
                  .filter(
                    (g) => g.recurringAmount != null && g.recurringAmount > 0,
                  )
                  .map((group) => (
                    <GroupFixedCostRow
                      key={group.groupId}
                      group={group}
                      currency={currency}
                    />
                  ))}
                {state.services
                  .filter((svc) => svc.recurringCost)
                  .map((svc) => (
                    <div key={svc.id} className="si-billing-line">
                      <span className="si-billing-line__name">
                        {svc.name || "Service"}
                        {svc.recurringCost?.billingCycle && (
                          <span className="si-billing-line__cycle">
                            {formatBillingCycleSuffix(
                              svc.recurringCost.billingCycle,
                            )}
                          </span>
                        )}
                      </span>
                      <span className="si-billing-line__amount">
                        {formatCurrency(svc.recurringCost!.amount, currency)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {showEstimate && (
            <div className="si-billing-section">
              <div className="si-billing-section-label">
                <span className="si-billing-section-label__text">
                  Estimated next charges *
                </span>
              </div>
              <div className="si-billing-section__lines">
                {(() => {
                  // Group netted metrics by groupName so the breakdown
                  // mirrors the rest of the layout. Only metrics with
                  // additional > 0 made it into contributingMetrics; the
                  // rows shown here sum exactly to the estimate total.
                  const grouped = new Map<string, EstimateSource[]>();
                  for (const m of contributingMetrics) {
                    const key = m.groupName ?? "__standalone__";
                    const arr = grouped.get(key) ?? [];
                    arr.push(m);
                    grouped.set(key, arr);
                  }
                  return Array.from(grouped.entries()).map(([key, metrics]) => (
                    <div key={key} className="si-billing-group-metrics">
                      {key !== "__standalone__" && (
                        <div className="si-billing-group-metrics__header">
                          {key}
                        </div>
                      )}
                      {metrics.map((m) => (
                        <EstimateMetricRow
                          key={m.metricId}
                          metric={m}
                          currency={currency}
                        />
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────

function GroupFixedCostRow({
  group,
  currency,
}: {
  group: GroupBillingBreakdown;
  currency: string;
}) {
  return (
    <div className="si-billing-group">
      <div className="si-billing-group__row">
        <span className="si-billing-group__name">
          {group.groupName}
          {group.optional && (
            <span
              className="si-badge si-badge--violet si-badge--sm"
              style={{ marginLeft: 8 }}
            >
              Add-on
            </span>
          )}
          {group.recurringCycle && (
            <span className="si-billing-line__cycle">
              {formatBillingCycleSuffix(group.recurringCycle)}
            </span>
          )}
        </span>
        <span className="si-billing-group__amount-block">
          {group.discount && (
            <>
              <span className="si-billing-group__original">
                {formatCurrency(group.discount.originalAmount, currency)}
              </span>
              <span className="si-billing-group__discount-badge">
                {formatDiscountBadge(group.discount)}
              </span>
            </>
          )}
          <span className="si-billing-group__amount">
            {formatCurrency(
              group.recurringAmount ?? 0,
              group.recurringCurrency,
            )}
          </span>
        </span>
      </div>
    </div>
  );
}

function EstimateMetricRow({
  metric,
  currency,
}: {
  metric: EstimateSource;
  currency: string;
}) {
  return (
    <div className="si-billing-metric">
      <div className="si-billing-metric__info">
        <span className="si-billing-metric__name">{metric.name}</span>
        <span className="si-billing-metric__usage">
          {metric.currentUsage.toLocaleString()}/
          {metric.freeLimit.toLocaleString()} free
        </span>
      </div>
      <div className="si-billing-metric__right">
        <span className="si-billing-metric__calc">
          {metric.excess.toLocaleString()} ×{" "}
          {formatCurrency(metric.unitCostAmount, currency)}
        </span>
        <span className="si-billing-metric__projection">
          ~ {formatCurrency(metric.additional, currency)}
        </span>
      </div>
    </div>
  );
}
