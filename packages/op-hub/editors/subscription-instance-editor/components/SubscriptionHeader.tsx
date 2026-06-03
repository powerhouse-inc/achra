import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import type { ViewMode } from "../types.js";
import { StatusBadge } from "./StatusBadge.js";
import { SubscriptionActions } from "./SubscriptionActions.js";
import { useNowISO } from "./SimulatedClock.js";

function DueCountdown({
  date,
  label,
  paidUp,
}: {
  date: string;
  label: string;
  paidUp?: boolean;
}) {
  // Use the editor-wide simulated clock so the countdown reflects the
  // operator's vantage point in the cycle, not wall time. Without this,
  // an operator who advanced the simulated clock to mid-cycle sees the
  // header showing days-from-real-now instead of days-from-simulated-now,
  // which contradicts every other panel.
  const nowISO = useNowISO();
  const now = new Date(nowISO());
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const daysAway = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // When the cycle has been paid up but settlement hasn't been triggered,
  // the situation isn't "alarming" — it's an operator action ready to fire.
  // Switch the color to neutral/positive and the label to action-oriented.
  const getCountdownColor = () => {
    if (daysAway <= 0) {
      return paidUp ? "var(--si-emerald-600)" : "var(--si-rose-600)";
    }
    if (daysAway <= 7) return "var(--si-rose-600)";
    if (daysAway <= 14) return "var(--si-amber-600)";
    return undefined;
  };

  const getCountdownLabel = () => {
    if (daysAway <= 0) return paidUp ? "Ready to settle" : "Due for settlement";
    if (daysAway === 1) return "Tomorrow";
    return `${daysAway} days`;
  };

  return (
    <div className="si-header__stat">
      <span className="si-header__stat-value">{formatDate(date)}</span>
      <span className="si-header__stat-label">
        {label}
        <span
          className="si-header__stat-countdown"
          style={
            getCountdownColor() ? { color: getCountdownColor() } : undefined
          }
        >
          {" "}
          ({getCountdownLabel()})
        </span>
      </span>
    </div>
  );
}

interface SubscriptionHeaderProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  mode: ViewMode;
}

export function SubscriptionHeader({
  document,
  dispatch,
  mode,
}: SubscriptionHeaderProps) {
  const state = document.state.global;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="si-header">
      <div className="si-header__main">
        <div className="si-header__title-row">
          <div className="si-header__info">
            {state.resource?.thumbnailUrl && (
              <img
                src={state.resource.thumbnailUrl}
                alt=""
                className="si-header__thumbnail"
              />
            )}
            <div>
              <h1 className="si-header__title">
                {state.resource?.label || state.tierName || "Subscription"}
              </h1>
              {state.tierName && state.resource?.label && (
                <p className="si-header__subtitle">{state.tierName} Tier</p>
              )}
            </div>
          </div>
          <StatusBadge status={state.status} />
        </div>

        <div className="si-header__meta">
          {mode === "operator" && state.customerName && (
            <div className="si-header__meta-item">
              <span className="si-header__meta-label">Customer</span>
              <span className="si-header__meta-value">
                {state.customerName}
              </span>
            </div>
          )}
          {state.createdAt && (
            <div className="si-header__meta-item">
              <span className="si-header__meta-label">Created</span>
              <span className="si-header__meta-value">
                {formatDate(state.createdAt)}
              </span>
            </div>
          )}
          {state.activatedSince && (
            <div className="si-header__meta-item">
              <span className="si-header__meta-label">Active Since</span>
              <span className="si-header__meta-value">
                {formatDate(state.activatedSince)}
              </span>
            </div>
          )}
          <div className="si-header__meta-item">
            <span className="si-header__meta-label">Auto-Renew</span>
            <span
              className="si-header__meta-value"
              style={{
                color: state.autoRenew
                  ? "var(--si-emerald-600)"
                  : "var(--si-slate-400)",
              }}
            >
              {state.autoRenew ? "Enabled" : "Disabled"}
            </span>
          </div>
          {state.pausedSince && state.status === "PAUSED" && (
            <div className="si-header__meta-item">
              <span className="si-header__meta-label">Paused Since</span>
              <span
                className="si-header__meta-value"
                style={{ color: "var(--si-amber-600)" }}
              >
                {formatDate(state.pausedSince)}
              </span>
            </div>
          )}
          {state.expiringSince && state.status === "EXPIRING" && (
            <div className="si-header__meta-item">
              <span className="si-header__meta-label">Expiring Since</span>
              <span
                className="si-header__meta-value"
                style={{ color: "var(--si-orange-600)" }}
              >
                {formatDate(state.expiringSince)}
              </span>
            </div>
          )}
          {state.cancelledSince && state.status === "CANCELLED" && (
            <div className="si-header__meta-item">
              <span className="si-header__meta-label">Cancelled</span>
              <span
                className="si-header__meta-value"
                style={{ color: "var(--si-rose-600)" }}
              >
                {formatDate(state.cancelledSince)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="si-header__stats">
        <div className="si-header__stat">
          <span className="si-header__stat-value">
            {/* Count groups + standalone services as "billable items" —
                groups are billable units in their own right (carry pricing,
                proration, slices). Counting only nested services would
                under-report when a subscription consists entirely of
                group-level pricing (the common case). */}
            {state.services.length + state.serviceGroups.length}
          </span>
          <span className="si-header__stat-label">
            {state.services.length + state.serviceGroups.length === 1
              ? "Service"
              : "Services"}
          </span>
        </div>
        {/* Outstanding balance moved to Debt Ledger — header focuses on
            subscription identity, not financial state. */}
        {state.nextBillingDate && (
          <DueCountdown
            date={state.nextBillingDate}
            label="Next Invoice"
            paidUp={(() => {
              // When all current-cycle slices are FULLY_PAID, treat the
              // settle prompt as a neutral operator action ("Ready to
              // settle") rather than an alarm ("Due for settlement").
              const cycleStart = state.currentBillingCycleStart;
              if (!cycleStart) return false;
              const cycleSlices = state.debtLineItems.filter(
                (s) => s.chargedAt >= cycleStart,
              );
              if (cycleSlices.length === 0) return false;
              return cycleSlices.every((s) => s.status === "FULLY_PAID");
            })()}
          />
        )}
      </div>

      {/* Actions Section */}
      <div className="si-header__actions-section">
        <SubscriptionActions
          document={document}
          dispatch={dispatch}
          mode={mode}
        />
      </div>
    </div>
  );
}
