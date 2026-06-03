import { useMemo, useState } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import type {
  DebtLineItem,
  Service,
  ServiceGroup,
} from "../../../document-models/subscription-instance/v1/gen/schema/types.js";
import {
  markLineItemInvoiced,
  confirmLineItemPayment,
  applyCredit,
} from "../../../document-models/subscription-instance/v1/gen/debt-line-items/creators.js";
import { formatCurrency } from "./billing-utils.js";
import { useNowISO } from "./SimulatedClock.js";

interface DebtLedgerPanelProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
}

// ─── Cycle bucketing ───────────────────────────────────────
// Group slices by year-month of `chargedAt`. Imperfect for non-monthly
// billing cycles (a quarterly cycle's slices straddle months) but good
// enough for the common case and gives a Stripe-like billing history view.

function monthKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(key: string): string {
  const [year, month] = key.split("-");
  const d = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
  return d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ─── Source-name resolver ───────────────────────────────────
// Slices carry sourceGroupId / sourceServiceId / sourceMetricId. Build a
// lookup once per render so each row can show a human-readable source.

function buildSourceNameMap(
  groups: readonly ServiceGroup[],
  services: readonly Service[],
): Map<string, string> {
  const map = new Map<string, string>();
  for (const g of groups) {
    map.set(g.id, g.name);
    for (const svc of g.services) {
      map.set(svc.id, svc.name ?? "Service");
      for (const m of svc.metrics) {
        map.set(m.id, m.name);
      }
    }
  }
  for (const svc of services) {
    map.set(svc.id, svc.name ?? "Service");
    for (const m of svc.metrics) {
      map.set(m.id, m.name);
    }
  }
  return map;
}

// Try to extract a human name from the slice's description as a fallback
// when the source entity has been deleted from state. Reducers emit
// descriptions like "Recurring fee — group Premium Support (cycle renewal)"
// or "Overage — metric Database Size (settlement)" — both safe to parse
// for "group X" / "service X" / "metric X" patterns.
function nameFromDescription(desc: string | null | undefined): string | null {
  if (!desc) return null;
  // Match "group <Name>", "service <Name>", or "metric <Name>" up to a
  // delimiter (parenthesis, comma, em-dash, end-of-string).
  const m = desc.match(
    /(?:group|service|metric)\s+([^,—()]+?)(?:\s*\(|\s*—|$)/i,
  );
  return m ? m[1].trim() : null;
}

function sliceSourceLabel(
  slice: DebtLineItem,
  nameMap: Map<string, string>,
): string {
  const id =
    slice.sourceMetricId ?? slice.sourceServiceId ?? slice.sourceGroupId;
  // Prefer live state lookup, then description-derived fallback (handles
  // slices pointing to entities that have since been removed), then a
  // truncated ID as a last resort.
  if (id) {
    const live = nameMap.get(id);
    if (live) return live;
  }
  const fromDesc = nameFromDescription(slice.description);
  if (fromDesc) return fromDesc;
  if (id) return id.slice(0, 8);
  return "—";
}

// ─── Status badge ───────────────────────────────────────────
// Reuses the editor's `.si-badge` pill system so badges sit at the same
// visual weight as badges elsewhere. Color mapping follows finance UX
// conventions: CHARGED is neutral (just exists), INVOICED draws operator
// attention (action required from customer), payment progresses through
// emerald shades.

function StatusBadge({ status }: { status: DebtLineItem["status"] }) {
  // Color mapping follows Stripe/Slack billing convention: open/awaiting-action
  // states are amber, in-flight is sky, payment progress is violet, done is
  // emerald. CHARGED is the state where the operator must invoice — that's
  // the most actionable, so it gets the warmest color.
  const styles: Record<DebtLineItem["status"], string> = {
    CHARGED: "si-badge si-badge--sm si-badge--amber",
    INVOICED: "si-badge si-badge--sm si-badge--sky",
    PARTIALLY_PAID: "si-badge si-badge--sm si-badge--violet",
    FULLY_PAID: "si-badge si-badge--sm si-badge--emerald",
  };
  const labels: Record<DebtLineItem["status"], string> = {
    CHARGED: "Charged",
    INVOICED: "Invoiced",
    PARTIALLY_PAID: "Partial",
    FULLY_PAID: "Paid",
  };
  return <span className={styles[status]}>{labels[status]}</span>;
}

function OriginBadge({ origin }: { origin: DebtLineItem["origin"] }) {
  const labels: Record<DebtLineItem["origin"], string> = {
    SETUP: "Setup",
    SUBSCRIPTION_FEE: "Recurring",
    DYNAMIC: "Usage",
    ESTIMATED_USAGE: "Estimated",
    RECONCILIATION: "Adjustment",
  };
  return (
    <span className="si-badge si-badge--sm si-badge--slate">
      {labels[origin]}
    </span>
  );
}

// ─── Payment modal ──────────────────────────────────────────

function PaymentModal({
  slice,
  onClose,
  onConfirm,
}: {
  slice: DebtLineItem;
  onClose: () => void;
  onConfirm: (amount: number, paymentRef: string | null) => void;
}) {
  const remaining = slice.debitAmount - slice.settledAmount;
  const [amountStr, setAmountStr] = useState(remaining.toFixed(2));
  const [paymentRef, setPaymentRef] = useState("");

  const amount = parseFloat(amountStr);
  const valid = !isNaN(amount) && amount > 0 && amount <= remaining;

  return (
    <div className="si-modal-overlay" onClick={onClose}>
      <div className="si-modal" onClick={(e) => e.stopPropagation()}>
        <div className="si-modal__header">
          <h3 className="si-modal__title">Confirm payment</h3>
        </div>
        <div className="si-modal__body">
          <p className="si-modal__message">
            Slice {slice.id.slice(0, 8)}… · remaining{" "}
            {formatCurrency(remaining, slice.currency)}
          </p>
          <label className="si-debt-modal__label">
            Amount
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={remaining.toString()}
              className="si-input"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <label className="si-debt-modal__label">
            Payment reference (optional)
            <input
              type="text"
              className="si-input"
              placeholder="phid:payment:…"
              value={paymentRef}
              onChange={(e) => setPaymentRef(e.target.value)}
            />
          </label>
        </div>
        <div className="si-modal__footer">
          <button
            type="button"
            className="si-btn si-btn--ghost"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="si-btn si-btn--success"
            disabled={!valid}
            onClick={() => onConfirm(amount, paymentRef.trim() || null)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
// Targeted (per-row) or bulk (FIFO+priority) credit application modal.
// Same component, different mode. Targeted caps amount at slice remaining;
// bulk caps at min(creditBalance, outstandingTotal).
function CreditModal({
  slice,
  creditBalance,
  outstandingTotal,
  currency,
  mode,
  onClose,
  onConfirm,
}: {
  slice: DebtLineItem | null;
  creditBalance: number;
  outstandingTotal?: number;
  currency?: string;
  mode: "targeted" | "bulk";
  onClose: () => void;
  onConfirm: (amount: number, reason: string) => void;
}) {
  const ledgerCurrency = slice?.currency ?? currency ?? "USD";
  const cap =
    mode === "targeted" && slice
      ? Math.min(creditBalance, slice.debitAmount - slice.settledAmount)
      : Math.min(creditBalance, outstandingTotal ?? creditBalance);
  const [amountStr, setAmountStr] = useState(cap.toFixed(2));
  const [reason, setReason] = useState(
    mode === "targeted"
      ? "Operator-applied credit (per line item)"
      : "Operator-applied credit (FIFO+priority)",
  );

  const amount = parseFloat(amountStr);
  const valid = !isNaN(amount) && amount > 0 && amount <= cap;

  return (
    <div className="si-modal-overlay" onClick={onClose}>
      <div className="si-modal" onClick={(e) => e.stopPropagation()}>
        <div className="si-modal__header">
          <h3 className="si-modal__title">
            {mode === "targeted"
              ? "Apply credit to line item"
              : "Apply credit (FIFO+priority)"}
          </h3>
        </div>
        <div className="si-modal__body">
          {mode === "targeted" && slice ? (
            <p className="si-modal__message">
              Slice {slice.id.slice(0, 8)}… · remaining{" "}
              {formatCurrency(
                slice.debitAmount - slice.settledAmount,
                slice.currency,
              )}{" "}
              · standing credit {formatCurrency(creditBalance, slice.currency)}
            </p>
          ) : (
            <p className="si-modal__message">
              Standing credit {formatCurrency(creditBalance, ledgerCurrency)}{" "}
              will be allocated across outstanding charges in priority order
              (Setup → Subscription → Dynamic), oldest first.
            </p>
          )}
          <label className="si-debt-modal__label">
            Amount
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={cap.toString()}
              className="si-input"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <label className="si-debt-modal__label">
            Reason
            <input
              type="text"
              className="si-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
        </div>
        <div className="si-modal__footer">
          <button
            type="button"
            className="si-btn si-btn--ghost"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="si-btn si-btn--primary"
            disabled={!valid || !reason.trim()}
            onClick={() => onConfirm(amount, reason.trim())}
          >
            Apply credit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main panel ─────────────────────────────────────────────

export function DebtLedgerPanel({ document, dispatch }: DebtLedgerPanelProps) {
  const state = document.state.global;
  const nowISO = useNowISO();
  // Default-expanded: in operator mode this panel is the primary financial
  // canvas. The activate/settle/pay flow all converge here, so collapsing
  // it by default forced a click before any work could happen.
  const [expanded, setExpanded] = useState(true);
  const [paymentTarget, setPaymentTarget] = useState<DebtLineItem | null>(null);
  // Targeted credit application: when set, a modal prompts the operator
  // for an amount up to the slice's remaining balance. Null = no modal.
  const [creditTarget, setCreditTarget] = useState<DebtLineItem | null>(null);
  // Bulk credit application: separate flag because the bulk modal has no
  // per-slice cap — it allocates against the full outstanding via FIFO.
  const [bulkCreditOpen, setBulkCreditOpen] = useState(false);

  const nameMap = useMemo(
    () => buildSourceNameMap(state.serviceGroups, state.services),
    [state.serviceGroups, state.services],
  );

  // Cycle-grouped view: setups split off (one-time charges, not cycle-bound),
  // everything else bucketed by year-month of `chargedAt`. Stripe-style
  // billing history — one section per invoice period, newest at top.
  const cycleStartKey = useMemo(() => {
    if (!state.currentBillingCycleStart) return null;
    return monthKey(state.currentBillingCycleStart);
  }, [state.currentBillingCycleStart]);

  const { setupSlices, cycleGroups } = useMemo(() => {
    const setupArr: DebtLineItem[] = [];
    const byCycle = new Map<string, DebtLineItem[]>();
    for (const s of state.debtLineItems) {
      if (s.origin === "SETUP") {
        setupArr.push(s);
        continue;
      }
      const key = monthKey(s.chargedAt);
      const arr = byCycle.get(key) ?? [];
      arr.push(s);
      byCycle.set(key, arr);
    }
    setupArr.sort((a, b) => (a.chargedAt < b.chargedAt ? 1 : -1));
    // Sort each cycle's slices by origin (recurring first, then usage),
    // then by chargedAt. Sort the cycle list newest first.
    const groups = Array.from(byCycle.entries()).map(([key, slices]) => {
      slices.sort((a, b) => {
        const originRank: Record<string, number> = {
          SUBSCRIPTION_FEE: 0,
          DYNAMIC: 1,
          ESTIMATED_USAGE: 2,
          RECONCILIATION: 3,
          SETUP: 4,
        };
        const ar = originRank[a.origin] ?? 99;
        const br = originRank[b.origin] ?? 99;
        if (ar !== br) return ar - br;
        return a.chargedAt < b.chargedAt ? -1 : 1;
      });
      return { key, slices };
    });
    groups.sort((a, b) => (a.key < b.key ? 1 : -1));
    return { setupSlices: setupArr, cycleGroups: groups };
  }, [state.debtLineItems]);

  const totalSlices = state.debtLineItems.length;
  // Open count excludes credit slices (debitAmount <= 0) and unfrozen
  // DYNAMIC slices (per 2026-05-07: live overage display, not collectible
  // until accrual cycle close).
  const unpaidCount = state.debtLineItems.filter(
    (s) =>
      (s.status === "CHARGED" || s.status === "INVOICED") &&
      s.debitAmount > 0 &&
      (s.origin !== "DYNAMIC" || s.frozen),
  ).length;
  // Outstanding = sum of (debit - settled) for non-FULLY_PAID slices.
  // Excludes unfrozen DYNAMIC slices for the same reason — they're a
  // forecast surface, not an obligation. The "This Period" panel shows
  // them as projected overage instead.
  const outstandingTotal = state.debtLineItems.reduce((sum, s) => {
    if (s.status === "FULLY_PAID") return sum;
    if (s.origin === "DYNAMIC" && !s.frozen) return sum;
    return sum + Math.max(0, s.debitAmount - s.settledAmount);
  }, 0);
  // Applicable credit = sum of untapped credit-slice remainders. This is
  // the entitlement view (what credit is still usable), not the cash-flow
  // view (have you overpaid in aggregate). A removed add-on group emits
  // a credit slice; the customer should be able to apply it against any
  // other charge immediately, regardless of whether their setup/recurring
  // is still unpaid. See `getApplicableCreditBalance` in the reducer.
  const creditBalance = state.debtLineItems.reduce((sum, s) => {
    if (s.debitAmount >= 0) return sum;
    const untapped = s.settledAmount - s.debitAmount;
    return untapped > 0 ? sum + untapped : sum;
  }, 0);
  const ledgerCurrency = state.globalCurrency || "USD";

  if (totalSlices === 0) {
    return (
      <div className="si-panel">
        <style>{debtLedgerStyles}</style>
        <div className="si-debt-ledger__header si-debt-ledger__header--empty">
          <span className="si-debt-ledger__header-left">
            <h3 className="si-panel__title">Debt Ledger</h3>
            <span className="si-debt-ledger__count">No charges yet</span>
          </span>
        </div>
        <div className="si-debt-ledger__empty">
          Charges appear here once the subscription is activated. Each setup
          fee, recurring fee, and overage becomes a line item with its own
          invoicing and payment status.
        </div>
      </div>
    );
  }

  function handleMarkInvoiced(slice: DebtLineItem) {
    dispatch(
      markLineItemInvoiced({
        lineItemId: slice.id,
        invoicedAt: nowISO(),
      }),
    );
  }

  function handleConfirmPayment(amount: number, paymentRef: string | null) {
    if (!paymentTarget) return;
    dispatch(
      confirmLineItemPayment({
        lineItemId: paymentTarget.id,
        amount,
        paymentDate: nowISO(),
        paymentRef: paymentRef ?? undefined,
      }),
    );
    setPaymentTarget(null);
  }

  function handleApplyCreditTargeted(amount: number, reason: string) {
    if (!creditTarget) return;
    dispatch(
      applyCredit({
        amount,
        creditDate: nowISO(),
        reason,
        lineItemId: creditTarget.id,
      }),
    );
    setCreditTarget(null);
  }

  function handleApplyCreditBulk(amount: number, reason: string) {
    dispatch(
      applyCredit({
        amount,
        creditDate: nowISO(),
        reason,
      }),
    );
    setBulkCreditOpen(false);
  }

  return (
    <div
      className={`si-panel${
        outstandingTotal > 0 ? " si-debt-ledger__panel--alert" : ""
      }`}
    >
      <style>{debtLedgerStyles}</style>
      <button
        type="button"
        className="si-debt-ledger__header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="si-debt-ledger__header-left">
          <svg
            className="si-debt-ledger__chevron"
            data-expanded={expanded}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="si-debt-ledger__title-block">
            <h3 className="si-panel__title">Debt Ledger</h3>
            <span className="si-debt-ledger__count">
              {totalSlices} charge{totalSlices !== 1 ? "s" : ""}
              {unpaidCount > 0 && (
                <>
                  {" · "}
                  <span className="si-debt-ledger__unpaid">
                    {unpaidCount} open
                  </span>
                </>
              )}
            </span>
          </span>
        </span>
        <span className="si-debt-ledger__header-right">
          {/* Outstanding (owed) and credit balance (entitlement) can
              co-exist. Show outstanding as the primary number; surface
              credit as a secondary line when present. */}
          {outstandingTotal > 0 ? (
            <>
              <span className="si-debt-ledger__outstanding-label">
                Outstanding
              </span>
              <span className="si-debt-ledger__outstanding-value si-debt-ledger__outstanding-value--owed">
                {formatCurrency(outstandingTotal, ledgerCurrency)}
              </span>
              {creditBalance > 0 && (
                <span className="si-debt-ledger__credit-secondary">
                  Credit available{" "}
                  {formatCurrency(creditBalance, ledgerCurrency)}
                </span>
              )}
            </>
          ) : creditBalance > 0 ? (
            <>
              <span className="si-debt-ledger__outstanding-label">
                Credit balance
              </span>
              <span className="si-debt-ledger__outstanding-value si-debt-ledger__outstanding-value--credit">
                {formatCurrency(creditBalance, ledgerCurrency)}
              </span>
            </>
          ) : (
            <>
              <span className="si-debt-ledger__outstanding-label">
                Outstanding
              </span>
              <span className="si-debt-ledger__outstanding-value">Paid up</span>
            </>
          )}
        </span>
      </button>

      {expanded && (
        <>
          <p className="si-debt-ledger__legend">
            Charges flow: <strong>Charged</strong> → mark invoiced →{" "}
            <strong>Invoiced</strong> → confirm payment → <strong>Paid</strong>
          </p>
          {creditBalance > 0 && outstandingTotal > 0 && (
            <div className="si-debt-ledger__credit-toolbar">
              <span className="si-debt-ledger__credit-toolbar-text">
                Standing credit balance{" "}
                <strong>{formatCurrency(creditBalance, ledgerCurrency)}</strong>{" "}
                available — apply against outstanding charges.
              </span>
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--primary"
                onClick={() => setBulkCreditOpen(true)}
              >
                Apply credit (FIFO)
              </button>
            </div>
          )}
          <div
            className={`si-debt-ledger__body${
              totalSlices > 10 ? " si-debt-ledger__body--scrollable" : ""
            }`}
          >
            {cycleGroups.map((group, idx) => (
              <CycleSection
                key={group.key}
                cycleKey={group.key}
                slices={group.slices}
                nameMap={nameMap}
                currency={ledgerCurrency}
                isCurrent={group.key === cycleStartKey}
                defaultExpanded={idx === 0}
                onMarkInvoiced={handleMarkInvoiced}
                onPay={(slice) => setPaymentTarget(slice)}
                onApplyCredit={(slice) => setCreditTarget(slice)}
                creditBalance={creditBalance}
              />
            ))}
            {setupSlices.length > 0 && (
              <SetupSection
                slices={setupSlices}
                nameMap={nameMap}
                currency={ledgerCurrency}
                onMarkInvoiced={handleMarkInvoiced}
                onPay={(slice) => setPaymentTarget(slice)}
                onApplyCredit={(slice) => setCreditTarget(slice)}
                creditBalance={creditBalance}
              />
            )}
          </div>
        </>
      )}

      {paymentTarget && (
        <PaymentModal
          slice={paymentTarget}
          onClose={() => setPaymentTarget(null)}
          onConfirm={handleConfirmPayment}
        />
      )}

      {creditTarget && (
        <CreditModal
          slice={creditTarget}
          creditBalance={creditBalance}
          mode="targeted"
          onClose={() => setCreditTarget(null)}
          onConfirm={handleApplyCreditTargeted}
        />
      )}

      {bulkCreditOpen && (
        <CreditModal
          slice={null}
          creditBalance={creditBalance}
          outstandingTotal={outstandingTotal}
          currency={ledgerCurrency}
          mode="bulk"
          onClose={() => setBulkCreditOpen(false)}
          onConfirm={handleApplyCreditBulk}
        />
      )}
    </div>
  );
}

function sliceTotals(slices: DebtLineItem[]): {
  charged: number;
  outstanding: number;
  openCount: number;
} {
  let charged = 0;
  let outstanding = 0;
  let openCount = 0;
  for (const s of slices) {
    charged += s.debitAmount;
    if (s.status !== "FULLY_PAID") {
      // Live (unfrozen) DYNAMIC slices are not collectible — they are a
      // forecast surface, not a debt obligation. They do not contribute
      // to outstanding or open count for the per-cycle summary.
      if (s.origin === "DYNAMIC" && !s.frozen) continue;
      outstanding += Math.max(0, s.debitAmount - s.settledAmount);
      // Credit slices (debit <= 0) shouldn't count as "open" — no operator
      // action applies even when status is CHARGED/INVOICED.
      if (
        (s.status === "CHARGED" || s.status === "INVOICED") &&
        s.debitAmount > 0
      ) {
        openCount += 1;
      }
    }
  }
  return { charged, outstanding, openCount };
}

function CycleSection({
  cycleKey,
  slices,
  nameMap,
  currency,
  isCurrent,
  defaultExpanded,
  onMarkInvoiced,
  onPay,
  onApplyCredit,
  creditBalance,
}: {
  cycleKey: string;
  slices: DebtLineItem[];
  nameMap: Map<string, string>;
  currency: string;
  isCurrent: boolean;
  defaultExpanded: boolean;
  onMarkInvoiced: (slice: DebtLineItem) => void;
  onPay: (slice: DebtLineItem) => void;
  onApplyCredit: (slice: DebtLineItem) => void;
  creditBalance: number;
}) {
  const [open, setOpen] = useState(defaultExpanded);
  const totals = sliceTotals(slices);
  const allPaid = totals.outstanding === 0;
  return (
    <div className="si-debt-cycle">
      <button
        type="button"
        className="si-debt-cycle__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="si-debt-cycle__header-left">
          <svg
            className="si-debt-cycle__chevron"
            data-expanded={open}
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
          <span className="si-debt-cycle__title">
            {formatMonthLabel(cycleKey)}
          </span>
          {isCurrent && (
            <span className="si-badge si-badge--sm si-badge--sky">Current</span>
          )}
          {allPaid && (
            <span className="si-badge si-badge--sm si-badge--emerald">
              Paid in full
            </span>
          )}
          {!allPaid && totals.openCount > 0 && (
            <span className="si-badge si-badge--sm si-badge--amber">
              {totals.openCount} open
            </span>
          )}
        </span>
        <span className="si-debt-cycle__totals">
          <span className="si-debt-cycle__charged">
            {formatCurrency(totals.charged, currency)}
          </span>
          {!allPaid && (
            <span className="si-debt-cycle__outstanding">
              {formatCurrency(totals.outstanding, currency)} due
            </span>
          )}
        </span>
      </button>
      {open && (
        <div className="si-debt-cycle__body">
          {slices.map((slice) => (
            <DebtRow
              key={slice.id}
              slice={slice}
              nameMap={nameMap}
              onMarkInvoiced={onMarkInvoiced}
              onPay={onPay}
              onApplyCredit={onApplyCredit}
              creditBalance={creditBalance}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SetupSection({
  slices,
  nameMap,
  currency,
  onMarkInvoiced,
  onPay,
  onApplyCredit,
  creditBalance,
}: {
  slices: DebtLineItem[];
  nameMap: Map<string, string>;
  currency: string;
  onMarkInvoiced: (slice: DebtLineItem) => void;
  onPay: (slice: DebtLineItem) => void;
  onApplyCredit: (slice: DebtLineItem) => void;
  creditBalance: number;
}) {
  const [open, setOpen] = useState(false);
  const totals = sliceTotals(slices);
  const allPaid = totals.outstanding === 0;
  return (
    <div className="si-debt-cycle si-debt-cycle--setup">
      <button
        type="button"
        className="si-debt-cycle__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="si-debt-cycle__header-left">
          <svg
            className="si-debt-cycle__chevron"
            data-expanded={open}
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
          <span className="si-debt-cycle__title">Setup charges</span>
          <span className="si-debt-cycle__subtitle">one-time</span>
          {allPaid && (
            <span className="si-badge si-badge--sm si-badge--emerald">
              Paid in full
            </span>
          )}
          {!allPaid && totals.openCount > 0 && (
            <span className="si-badge si-badge--sm si-badge--amber">
              {totals.openCount} open
            </span>
          )}
        </span>
        <span className="si-debt-cycle__totals">
          <span className="si-debt-cycle__charged">
            {formatCurrency(totals.charged, currency)}
          </span>
          {!allPaid && (
            <span className="si-debt-cycle__outstanding">
              {formatCurrency(totals.outstanding, currency)} due
            </span>
          )}
        </span>
      </button>
      {open && (
        <div className="si-debt-cycle__body">
          {slices.map((slice) => (
            <DebtRow
              key={slice.id}
              slice={slice}
              nameMap={nameMap}
              onMarkInvoiced={onMarkInvoiced}
              onPay={onPay}
              onApplyCredit={onApplyCredit}
              creditBalance={creditBalance}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DebtRow({
  slice,
  nameMap,
  onMarkInvoiced,
  onPay,
  onApplyCredit,
  creditBalance,
}: {
  slice: DebtLineItem;
  nameMap: Map<string, string>;
  onMarkInvoiced: (slice: DebtLineItem) => void;
  onPay: (slice: DebtLineItem) => void;
  onApplyCredit: (slice: DebtLineItem) => void;
  creditBalance: number;
}) {
  const sourceName = sliceSourceLabel(slice, nameMap);
  const remaining = slice.debitAmount - slice.settledAmount;
  // Credit slices (debit <= 0) never expose action buttons. They're
  // settled-by-construction at emission; the negative debitAmount IS the
  // settlement. No invoicing or payment-confirmation flow applies.
  const isCreditSlice = slice.debitAmount <= 0;
  // Per 2026-05-07: live (unfrozen) DYNAMIC slices are pending — they
  // become collectible only when the accrual cycle closes (frozen=true).
  // Hide all status-action buttons until then; row remains visible for
  // operator situational awareness.
  const isLiveDynamic = slice.origin === "DYNAMIC" && !slice.frozen;
  const canInvoice =
    !isCreditSlice && !isLiveDynamic && slice.status === "CHARGED";
  const canPay =
    !isCreditSlice &&
    !isLiveDynamic &&
    (slice.status === "INVOICED" || slice.status === "PARTIALLY_PAID");
  // Per-row credit application is offered when this slice has remaining
  // outstanding AND the customer has a standing credit balance. Operator
  // chooses to retire this specific charge from credit.
  const canApplyCredit =
    !isCreditSlice && !isLiveDynamic && remaining > 0 && creditBalance > 0;
  const actionable = canInvoice || canPay || canApplyCredit;

  return (
    <div
      className="si-debt-row"
      data-actionable={actionable ? "true" : undefined}
    >
      <div className="si-debt-row__main">
        <div className="si-debt-row__top">
          <OriginBadge origin={slice.origin} />
          <span className="si-debt-row__source">{sourceName}</span>
          <StatusBadge status={slice.status} />
          {slice.frozen && slice.origin === "DYNAMIC" && (
            <span
              className="si-badge si-badge--sm si-badge--slate"
              title="Frozen — accrual period closed; amount locked"
            >
              Frozen
            </span>
          )}
        </div>
        <div className="si-debt-row__desc">{slice.description ?? ""}</div>
        {/* DYNAMIC slices represent a specific accrual period. Without
            showing the period, two slices for the same metric can look
            identical (both "Charged 8/7") even though one closed July
            and the other is mid-August. Period end is the slice's
            `chargedAt` if frozen, "live" if still mutating. */}
        {slice.origin === "DYNAMIC" && slice.accrualPeriodStart && (
          <div className="si-debt-row__meta">
            Period {new Date(slice.accrualPeriodStart).toLocaleDateString()}
            {" → "}
            {slice.frozen
              ? new Date(slice.chargedAt).toLocaleDateString()
              : "live"}
          </div>
        )}
        <div className="si-debt-row__meta">
          Charged {new Date(slice.chargedAt).toLocaleDateString()}
          {slice.invoicedAt && (
            <>
              {" · "}Invoiced {new Date(slice.invoicedAt).toLocaleDateString()}
            </>
          )}
          {slice.fullyPaidAt && (
            <>
              {" · "}Paid {new Date(slice.fullyPaidAt).toLocaleDateString()}
            </>
          )}
        </div>
      </div>
      <div className="si-debt-row__amounts">
        <div className="si-debt-row__debit">
          {formatCurrency(slice.debitAmount, slice.currency)}
        </div>
        {slice.settledAmount > 0 && (
          <div className="si-debt-row__settled">
            settled {formatCurrency(slice.settledAmount, slice.currency)}
          </div>
        )}
        {(slice.creditApplied ?? 0) > 0 && (
          <div
            className="si-debt-row__credit-applied"
            title="Portion of this charge that was retired from a credit balance (e.g. mid-cycle group removal refund)"
          >
            credit applied{" "}
            {formatCurrency(slice.creditApplied ?? 0, slice.currency)}
          </div>
        )}
        {remaining > 0 && slice.status !== "CHARGED" && (
          <div className="si-debt-row__remaining">
            remaining {formatCurrency(remaining, slice.currency)}
          </div>
        )}
      </div>
      <div className="si-debt-row__actions">
        {isLiveDynamic && (
          <span
            className="si-debt-row__pending"
            title="Overage accrues live; charge is settled at end of accrual cycle"
          >
            Pending
          </span>
        )}
        {canInvoice && (
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--primary"
            onClick={() => onMarkInvoiced(slice)}
          >
            Mark Invoiced
          </button>
        )}
        {canPay && (
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--success"
            onClick={() => onPay(slice)}
          >
            Confirm Payment
          </button>
        )}
        {canApplyCredit && (
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--ghost"
            onClick={() => onApplyCredit(slice)}
            title="Retire this charge from standing credit balance"
          >
            Apply credit
          </button>
        )}
        {!actionable && !isLiveDynamic && (
          <span className="si-debt-row__no-action" aria-hidden="true">
            —
          </span>
        )}
      </div>
    </div>
  );
}

const debtLedgerStyles = `
.si-debt-ledger__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background: white;
  border: none;
  cursor: pointer;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}
.si-debt-ledger__header:hover {
  background: var(--si-slate-50);
}
.si-debt-ledger__header--empty {
  cursor: default;
  position: static;
}
.si-debt-ledger__header--empty:hover {
  background: none;
}
.si-debt-ledger__header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.si-debt-ledger__title-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.si-debt-ledger__chevron {
  width: 18px;
  height: 18px;
  transition: transform 0.15s;
  color: var(--si-slate-500);
  flex-shrink: 0;
}
.si-debt-ledger__chevron[data-expanded="true"] {
  transform: rotate(90deg);
}
.si-debt-ledger__count {
  font-size: 0.8rem;
  color: var(--si-slate-500);
  font-variant-numeric: tabular-nums;
}
.si-debt-ledger__unpaid {
  color: var(--si-amber-600);
  font-weight: 500;
}
.si-debt-ledger__header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
}
.si-debt-ledger__outstanding-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--si-slate-500);
  font-weight: 600;
}
.si-debt-ledger__outstanding-value {
  font-size: 1.625rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--si-emerald-600);
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.si-debt-ledger__outstanding-value--owed {
  color: var(--si-rose-600);
}
.si-debt-ledger__outstanding-value--credit {
  color: var(--si-emerald-600);
}
.si-debt-ledger__panel--alert {
  border-left: 4px solid var(--si-rose-500);
}
.si-debt-ledger__legend {
  margin: 0 20px 12px;
  padding: 8px 12px;
  font-size: 0.75rem;
  color: var(--si-slate-600);
  background: var(--si-slate-50);
  border-radius: var(--si-radius-sm);
  border-left: 3px solid var(--si-slate-300);
  line-height: 1.5;
}
.si-debt-ledger__legend strong {
  color: var(--si-slate-800);
  font-weight: 600;
}
.si-debt-ledger__empty {
  padding: 0 20px 20px;
  font-size: 0.85rem;
  color: var(--si-slate-500);
  line-height: 1.5;
  max-width: 60ch;
}
.si-debt-ledger__body {
  padding: 0 20px 20px;
}
.si-debt-ledger__body--scrollable {
  max-height: 540px;
  overflow-y: auto;
}
.si-debt-cycle {
  margin-top: 12px;
  border: 1px solid var(--si-slate-200);
  border-radius: 8px;
  background: white;
  overflow: hidden;
}
.si-debt-cycle--setup {
  border-style: dashed;
}
.si-debt-cycle__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 14px;
  background: var(--si-slate-50);
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}
.si-debt-cycle__header:hover {
  background: var(--si-slate-100);
}
.si-debt-cycle__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.si-debt-cycle__chevron {
  width: 14px;
  height: 14px;
  color: var(--si-slate-500);
  transition: transform 0.15s;
  flex-shrink: 0;
}
.si-debt-cycle__chevron[data-expanded="true"] {
  transform: rotate(90deg);
}
.si-debt-cycle__title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--si-slate-800);
}
.si-debt-cycle__subtitle {
  font-size: 0.75rem;
  color: var(--si-slate-500);
  font-weight: 400;
}
.si-debt-cycle__totals {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  font-variant-numeric: tabular-nums;
}
.si-debt-cycle__charged {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--si-slate-700);
}
.si-debt-cycle__outstanding {
  font-size: 0.75rem;
  color: var(--si-rose-600);
  font-weight: 500;
}
.si-debt-cycle__body {
  padding: 10px 14px 12px;
}
.si-debt-row {
  display: grid;
  grid-template-columns: 1fr 140px auto;
  gap: 16px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--si-slate-200);
  border-radius: 6px;
  margin-bottom: 6px;
  background: white;
  transition: background 0.15s, border-color 0.15s;
}
.si-debt-row[data-actionable="true"] {
  background: var(--si-amber-50);
  border-color: var(--si-amber-100);
}
.si-debt-row__top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.si-debt-row__source {
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--si-slate-800);
}
.si-debt-row__desc {
  font-size: 0.8rem;
  color: var(--si-slate-600);
  margin-top: 4px;
}
.si-debt-row__meta {
  font-size: 0.7rem;
  color: var(--si-slate-500);
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
}
.si-debt-row__amounts {
  text-align: right;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}
.si-debt-row__debit {
  font-weight: 600;
  color: var(--si-slate-800);
}
.si-debt-row__settled,
.si-debt-row__remaining {
  font-size: 0.7rem;
  color: var(--si-slate-500);
}
.si-debt-row__credit-applied {
  font-size: 0.7rem;
  color: var(--si-emerald-700);
  font-weight: 500;
}
.si-debt-row__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 130px;
  justify-content: flex-end;
}
.si-debt-row__no-action {
  color: var(--si-slate-300);
  font-size: 0.85rem;
}
.si-debt-row__pending {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--si-amber-50);
  color: var(--si-amber-700);
  border: 1px solid var(--si-amber-100);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.si-debt-ledger__credit-secondary {
  display: block;
  font-size: 0.78rem;
  color: var(--si-emerald-700);
  margin-top: 2px;
  text-align: right;
}
.si-debt-ledger__credit-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  margin: 0 0 10px;
  border: 1px solid var(--si-emerald-100);
  background: var(--si-emerald-50);
  border-radius: var(--si-radius-md);
  color: var(--si-emerald-700);
}
.si-debt-ledger__credit-toolbar-text {
  font-size: 0.85rem;
  line-height: 1.4;
}
.si-debt-ledger__credit-toolbar-text strong {
  color: var(--si-emerald-700);
  font-weight: 600;
}
.si-debt-modal__label {
  display: block;
  margin-top: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--si-slate-700);
}
.si-debt-modal__label .si-input {
  display: block;
  margin-top: 4px;
  width: 100%;
}
`;
