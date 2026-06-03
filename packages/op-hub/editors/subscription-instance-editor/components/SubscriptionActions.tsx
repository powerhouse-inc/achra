import { useState, useCallback, useMemo } from "react";
import { generateId } from "document-model";
import {
  addDocument,
  addFolder,
  useSelectedDriveId,
  useFolderNodesInSelectedDrive,
  usePHToast,
} from "@powerhousedao/reactor-browser";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import type { ViewMode } from "../types.js";
import {
  activateSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  renewExpiringSubscription,
  generateInvoice,
  setAutoRenew,
  changePlan,
} from "../../../document-models/subscription-instance/v1/gen/subscription/creators.js";
import {
  calculateNextBillingDate,
  calculateOverageCost,
} from "../../../document-models/subscription-instance/v1/src/utils.js";
import {
  utils as subscriptionInvoiceUtils,
  type SubscriptionInvoiceGlobalState,
} from "document-models/subscription-invoice";
import { useNowISO } from "./SimulatedClock.js";
import { formatCurrency } from "./billing-utils.js";

interface SubscriptionActionsProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  mode: ViewMode;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmVariant?: "danger" | "warning" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
  showReasonInput?: boolean;
  reason?: string;
  onReasonChange?: (reason: string) => void;
}

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  confirmVariant = "primary",
  onConfirm,
  onCancel,
  showReasonInput,
  reason,
  onReasonChange,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const buttonClass =
    confirmVariant === "danger"
      ? "si-btn si-btn--danger"
      : confirmVariant === "warning"
        ? "si-btn si-btn--warning"
        : "si-btn si-btn--primary";

  return (
    <div className="si-modal-overlay" onClick={onCancel}>
      <div className="si-modal" onClick={(e) => e.stopPropagation()}>
        <div className="si-modal__header">
          <h3 className="si-modal__title">{title}</h3>
        </div>
        <div className="si-modal__body">
          <p className="si-modal__message">{message}</p>
          {showReasonInput && (
            <textarea
              className="si-input si-input--textarea"
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => onReasonChange?.(e.target.value)}
            />
          )}
        </div>
        <div className="si-modal__footer">
          <button
            type="button"
            className="si-btn si-btn--ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="button" className={buttonClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SubscriptionActions({
  document,
  dispatch,
  mode,
}: SubscriptionActionsProps) {
  const state = document.state.global;
  const [confirmAction, setConfirmAction] = useState<
    "pause" | "cancel" | "resume" | "renew" | "settle" | "changePlan" | null
  >(null);
  // Change-plan modal form state. Operator enters tier metadata manually
  // here — a real tier picker that pulls from service-offering will come
  // later. For MVP, this is enough to drive `CHANGE_PLAN` end-to-end.
  const [changePlanForm, setChangePlanForm] = useState({
    newTierPricingOptionId: "",
    newTierName: "",
    newTierPrice: "",
    newTierCurrency: "USD",
    effectiveDate: "",
  });
  const [reason, setReason] = useState("");
  const [settlementDate, setSettlementDate] = useState("");
  const nowISO = useNowISO();
  // Drive ID is needed to spawn the Invoice document on the same drive
  // when GENERATE_INVOICE fires. The folder list lets us find-or-create
  // a per-subscription invoice folder, so generated invoices nest under
  // the subscription rather than landing at the drive root.
  const driveId = useSelectedDriveId();
  const folderNodes = useFolderNodesInSelectedDrive();
  const toast = usePHToast();

  // Cancellation refund preview — mirror of the reducer's prorata math so
  // the operator sees what credit slices will be emitted before clicking
  // Cancel. Only shown when status is ACTIVE and cancellation falls within
  // the current cycle (which is the only path that emits refund slices —
  // see cancelSubscriptionOperation in the subscription reducer).
  const cancellationRefundPreview = useMemo(() => {
    const cycleStart = state.currentBillingCycleStart;
    const cycleEnd = state.nextBillingDate;
    const currency = state.globalCurrency || "USD";
    if (state.status !== "ACTIVE" || !cycleStart || !cycleEnd) {
      return { applicable: false as const, currency };
    }
    const now = new Date(nowISO()).getTime();
    const start = new Date(cycleStart).getTime();
    const end = new Date(cycleEnd).getTime();
    if (now <= start || now >= end) {
      return { applicable: false as const, currency };
    }
    const prorataFactor = (end - now) / (end - start);
    const refunds: { name: string; amount: number }[] = [];
    let totalRefund = 0;
    for (const g of state.serviceGroups) {
      if (g.recurringCost) {
        const refund = prorataFactor * g.recurringCost.amount;
        refunds.push({ name: g.name, amount: refund });
        totalRefund += refund;
      }
    }
    for (const svc of state.services) {
      if (svc.recurringCost) {
        const refund = prorataFactor * svc.recurringCost.amount;
        refunds.push({ name: svc.name ?? "Service", amount: refund });
        totalRefund += refund;
      }
    }
    return {
      applicable: true as const,
      prorataFactor,
      refunds,
      totalRefund,
      currency,
    };
  }, [
    state.status,
    state.currentBillingCycleStart,
    state.nextBillingDate,
    state.globalCurrency,
    state.serviceGroups,
    state.services,
    nowISO,
  ]);

  // Change-plan preview — mirrors the reducer's prorata math so the
  // operator sees both the credit (old tier unused portion) and the debit
  // (new tier prorated remainder) before confirming. Cross-reference:
  // subscription.ts changePlanOperation.
  const changePlanPreview = useMemo(() => {
    const cycleStart = state.currentBillingCycleStart;
    const cycleEnd = state.nextBillingDate;
    const currency = state.globalCurrency || "USD";
    const oldTierPrice = state.tierPrice ?? 0;
    const newTierPrice = parseFloat(changePlanForm.newTierPrice);
    if (
      state.status !== "ACTIVE" ||
      !cycleStart ||
      !cycleEnd ||
      isNaN(newTierPrice)
    ) {
      return { applicable: false as const, currency };
    }
    const effective = changePlanForm.effectiveDate
      ? new Date(changePlanForm.effectiveDate).getTime()
      : new Date(nowISO()).getTime();
    const start = new Date(cycleStart).getTime();
    const end = new Date(cycleEnd).getTime();
    if (effective <= start || effective >= end) {
      return { applicable: false as const, currency };
    }
    const prorataFactor = (end - effective) / (end - start);
    const oldCredit = prorataFactor * oldTierPrice;
    const newDebit = prorataFactor * newTierPrice;
    return {
      applicable: true as const,
      prorataFactor,
      oldCredit,
      newDebit,
      net: newDebit - oldCredit,
      currency,
    };
  }, [
    state.status,
    state.currentBillingCycleStart,
    state.nextBillingDate,
    state.globalCurrency,
    state.tierPrice,
    changePlanForm.effectiveDate,
    changePlanForm.newTierPrice,
    nowISO,
  ]);

  // Settlement preview — walks the same logic the reducer will run so the
  // operator sees exactly what's about to happen before clicking Settle.
  // Cross-reference: document-models/subscription-instance/v1/src/reducers/
  // subscription.ts settleBillingCycleOperation.
  const settlementPreview = useMemo(() => {
    const cycleStart = state.currentBillingCycleStart;
    const nextBilling = state.nextBillingDate;
    const currency = state.globalCurrency || "USD";

    // T-05 sweep preview: count CHARGED slices that will flip to INVOICED.
    let toBeInvoicedCount = 0;
    let toBeInvoicedAmount = 0;
    if (cycleStart) {
      for (const s of state.debtLineItems) {
        if (s.status !== "CHARGED") continue;
        if (nextBilling && s.chargedAt > nextBilling) continue;
        toBeInvoicedCount += 1;
        toBeInvoicedAmount += s.debitAmount;
      }
    }

    // Force-accrue preview: walk every metric and figure out what the
    // reducer will actually do at this metric's period boundary. Mirrors
    // the discriminator-by-accrualPeriodStart logic in `forceAccrue`:
    // if there's already a DYNAMIC slice for the metric's current period
    // (paid, unpaid, frozen, or live), no new charge is emitted. Only
    // metrics with NO slice for their current period contribute to the
    // accrual preview total.
    const accruals: { metricName: string; cost: number }[] = [];
    let totalAccrual = 0;
    function walk(metrics: (typeof state.services)[number]["metrics"]) {
      for (const m of metrics) {
        const periodStart = m.lastAccrualDate ?? null;
        const sliceForPeriod = state.debtLineItems.find(
          (s) =>
            s.origin === "DYNAMIC" &&
            s.sourceMetricId === m.id &&
            s.accrualPeriodStart === periodStart,
        );
        if (sliceForPeriod) continue;
        const cost = calculateOverageCost(m);
        if (cost > 0) {
          accruals.push({ metricName: m.name, cost });
          totalAccrual += cost;
        }
      }
    }
    for (const svc of state.services) walk(svc.metrics);
    for (const g of state.serviceGroups) {
      for (const svc of g.services) walk(svc.metrics);
    }

    // Next-cycle recurring preview.
    let nextCycleRecurring = 0;
    const recurringSources: { name: string; amount: number }[] = [];
    if (state.autoRenew) {
      for (const g of state.serviceGroups) {
        if (g.recurringCost) {
          nextCycleRecurring += g.recurringCost.amount;
          recurringSources.push({
            name: g.name,
            amount: g.recurringCost.amount,
          });
        }
      }
      for (const svc of state.services) {
        if (svc.recurringCost) {
          nextCycleRecurring += svc.recurringCost.amount;
          recurringSources.push({
            name: svc.name ?? "Service",
            amount: svc.recurringCost.amount,
          });
        }
      }
    }

    // Compute the new cycle dates the reducer will produce.
    const billingCycle = state.selectedBillingCycle || "MONTHLY";
    const newCycleStart = nextBilling ?? null;
    const newNextBilling =
      nextBilling && state.autoRenew
        ? calculateNextBillingDate(nextBilling, billingCycle)
        : null;

    // Carry-over credit: when the customer is in surplus (totalCredit
    // exceeds totalDebt), that surplus carries into the new cycle and
    // will be absorbed by the FIFO+priority allocator on the next
    // payment. Surfacing this in the Settle preview gives the operator
    // an accurate picture of the customer's net obligation for the new
    // cycle. Reference: same `netPosition < 0` math as DebtLedgerPanel.
    const netPosition = (state.totalDebt ?? 0) - (state.totalCredit ?? 0);
    const carryOverCredit = netPosition < 0 ? -netPosition : 0;
    // Net new charge after the credit balance is absorbed.
    const netNewCharge = Math.max(0, nextCycleRecurring - carryOverCredit);

    return {
      currency,
      toBeInvoicedCount,
      toBeInvoicedAmount,
      accruals,
      totalAccrual,
      recurringSources,
      nextCycleRecurring,
      carryOverCredit,
      netNewCharge,
      newCycleStart,
      newNextBilling,
    };
  }, [
    state.currentBillingCycleStart,
    state.nextBillingDate,
    state.globalCurrency,
    state.debtLineItems,
    state.services,
    state.serviceGroups,
    state.autoRenew,
    state.selectedBillingCycle,
    state.totalDebt,
    state.totalCredit,
  ]);

  // Operator direct actions
  const handleActivate = useCallback(() => {
    // Pre-generate one slice ID per chargeable source so the reducer stays
    // pure. Walk groups (setup + recurring), nested services, then top-level
    // services. The reducer keys lookups by sourceId. sourceName is
    // informational — purely for the operation log so the operator can
    // read "{sliceId} → Core Operations" instead of opaque OIDs.
    const setupSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    const recurringSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    for (const group of state.serviceGroups) {
      if (group.setupCost) {
        setupSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
      if (group.recurringCost) {
        recurringSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
      for (const svc of group.services) {
        if (svc.setupCost) {
          setupSliceIds.push({
            sourceId: svc.id,
            sliceId: generateId(),
            sourceName: svc.name ?? "Service",
          });
        }
        if (svc.recurringCost) {
          recurringSliceIds.push({
            sourceId: svc.id,
            sliceId: generateId(),
            sourceName: svc.name ?? "Service",
          });
        }
      }
    }
    for (const svc of state.services) {
      if (svc.setupCost) {
        setupSliceIds.push({
          sourceId: svc.id,
          sliceId: generateId(),
          sourceName: svc.name ?? "Service",
        });
      }
      if (svc.recurringCost) {
        recurringSliceIds.push({
          sourceId: svc.id,
          sliceId: generateId(),
          sourceName: svc.name ?? "Service",
        });
      }
    }
    dispatch(
      activateSubscription({
        activatedSince: nowISO(),
        setupSliceIds,
        recurringSliceIds,
      }),
    );
  }, [dispatch, nowISO, state.serviceGroups, state.services]);

  const handleOperatorPause = useCallback(() => {
    dispatch(
      pauseSubscription({
        pausedSince: nowISO(),
      }),
    );
    setConfirmAction(null);
  }, [dispatch, nowISO]);

  const handleOperatorResume = useCallback(() => {
    dispatch(
      resumeSubscription({
        timestamp: nowISO(),
      }),
    );
    setConfirmAction(null);
  }, [dispatch, nowISO]);

  const handleOperatorCancel = useCallback(() => {
    // Pre-generate one refund slice ID per chargeable source (groups +
    // standalone services with recurringCost). Reducer only emits refund
    // slices when status was ACTIVE and cancelledSince is mid-cycle, but
    // we always supply IDs so the action shape stays uniform. sourceName
    // is informational for the operation log.
    const refundSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    for (const group of state.serviceGroups) {
      if (group.recurringCost) {
        refundSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
    }
    for (const svc of state.services) {
      if (svc.recurringCost) {
        refundSliceIds.push({
          sourceId: svc.id,
          sliceId: generateId(),
          sourceName: svc.name ?? "Service",
        });
      }
    }
    dispatch(
      cancelSubscription({
        cancelledSince: nowISO(),
        cancellationReason: reason || null,
        refundSliceIds,
      }),
    );
    setConfirmAction(null);
    setReason("");
  }, [dispatch, nowISO, reason, state.serviceGroups, state.services]);

  const handleOperatorRenew = useCallback(() => {
    const recurringSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    for (const group of state.serviceGroups) {
      if (group.recurringCost) {
        recurringSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
    }
    for (const svc of state.services) {
      if (svc.recurringCost) {
        recurringSliceIds.push({
          sourceId: svc.id,
          sliceId: generateId(),
          sourceName: svc.name ?? "Service",
        });
      }
    }
    dispatch(
      renewExpiringSubscription({
        timestamp: nowISO(),
        recurringSliceIds,
      }),
    );
    setConfirmAction(null);
  }, [dispatch, nowISO, state.serviceGroups, state.services]);

  const handleGenerateInvoice = useCallback(async () => {
    const date = settlementDate
      ? new Date(settlementDate).toISOString()
      : nowISO();
    const invoiceId = generateId();
    // Pre-generate one ID per metric (force-accrue may emit a frozen slice
    // if no active one exists) and one per chargeable source for next-cycle
    // recurring fees if cycle advances. Unused IDs are harmless. sourceName
    // is informational for the operation log — metric name for freezes,
    // group/service name for recurring.
    const metricFreezeSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    const nextCycleRecurringSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    for (const svc of state.services) {
      for (const m of svc.metrics) {
        metricFreezeSliceIds.push({
          sourceId: m.id,
          sliceId: generateId(),
          sourceName: m.name,
        });
      }
      if (svc.recurringCost) {
        nextCycleRecurringSliceIds.push({
          sourceId: svc.id,
          sliceId: generateId(),
          sourceName: svc.name ?? "Service",
        });
      }
    }
    for (const group of state.serviceGroups) {
      if (group.recurringCost) {
        nextCycleRecurringSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
      for (const svc of group.services) {
        for (const m of svc.metrics) {
          metricFreezeSliceIds.push({
            sourceId: m.id,
            sliceId: generateId(),
            sourceName: m.name,
          });
        }
      }
    }

    // Compute which slices will land on this invoice. GENERATE_INVOICE
    // sweeps every CHARGED/INVOICED/PARTIALLY_PAID slice that has no
    // prior invoiceRef and stamps it with our invoiceId. We mirror that
    // logic here to build the invoice document's line items snapshot.
    // Live (unfrozen) DYNAMIC slices are excluded — they aren't
    // chargeable until the accrual cycle closes.
    const invoiceableSlices = state.debtLineItems.filter((s) => {
      if (s.status === "FULLY_PAID") return false;
      if (s.invoiceRef) return false;
      if (s.origin === "DYNAMIC" && !s.frozen) return false;
      return true;
    });

    // Nothing to invoice: the reducer would throw NoInvoiceableLineItemsError
    // and the operation would silently fail. Surface that to the operator
    // and skip the dispatch + Invoice-document creation.
    if (invoiceableSlices.length === 0) {
      toast?.(
        "Nothing to invoice — every slice is either fully paid or already on a prior invoice.",
        { type: "warning" },
      );
      setConfirmAction(null);
      setSettlementDate("");
      return;
    }

    // Dispatch the actual GENERATE_INVOICE op on the subscription doc.
    dispatch(
      generateInvoice({
        invoiceId,
        generatedAt: date,
        // When the operator clicks Generate Invoice, we want the cycle to
        // advance if the date is past nextBillingDate. Per Wouter
        // (00:52:11): "it ends the accrual cycle and the billing cycle if
        // it expired". The reducer gates on autoRenew + pastBoundary.
        advanceCycleIfDue: true,
        metricFreezeSliceIds,
        nextCycleRecurringSliceIds,
      }),
    );
    setConfirmAction(null);
    setSettlementDate("");

    // Spawn the sibling Invoice document on the same drive and populate
    // it with the snapshot. addDocument is async; we don't block the UI
    // on it, but we await for clean error handling.
    if (!driveId) return;
    const ledgerCurrency = state.globalCurrency || "USD";
    const subtotal = invoiceableSlices.reduce(
      (sum, s) => sum + Math.max(0, s.debitAmount),
      0,
    );
    const totalCreditApplied = invoiceableSlices.reduce(
      (sum, s) => sum + (s.creditApplied ?? 0),
      0,
    );
    const totalDue = invoiceableSlices.reduce(
      (sum, s) => sum + Math.max(0, s.debitAmount - s.settledAmount),
      0,
    );
    const totalPaid = invoiceableSlices.reduce(
      (sum, s) => sum + Math.max(0, s.settledAmount - (s.creditApplied ?? 0)),
      0,
    );

    // Resolve human-readable source names from the live model. Slices
    // carry sourceGroupId / sourceServiceId / sourceMetricId; we walk
    // groups → services → metrics to build the lookup.
    const nameMap = new Map<string, string>();
    for (const g of state.serviceGroups) {
      nameMap.set(g.id, g.name);
      for (const svc of g.services) {
        nameMap.set(svc.id, svc.name ?? "Service");
        for (const m of svc.metrics) nameMap.set(m.id, m.name);
      }
    }
    for (const svc of state.services) {
      nameMap.set(svc.id, svc.name ?? "Service");
      for (const m of svc.metrics) nameMap.set(m.id, m.name);
    }

    const lineItems = invoiceableSlices.map((s) => {
      const sourceId =
        s.sourceMetricId ?? s.sourceServiceId ?? s.sourceGroupId ?? null;
      return {
        id: generateId(),
        sliceId: s.id,
        origin: s.origin,
        description: s.description ?? "",
        sourceName: sourceId ? (nameMap.get(sourceId) ?? null) : null,
        chargedAt: s.chargedAt,
        debitAmount: s.debitAmount,
        settledAmount: s.settledAmount,
        creditApplied: s.creditApplied ?? 0,
        amountDue: Math.max(0, s.debitAmount - s.settledAmount),
        currency: s.currency,
      };
    });

    // Sequential invoice numbers like INV-2026-04-001 are nice but
    // require knowing how many prior invoices exist on this subscription.
    // We don't have that here without a subgraph query — for now derive
    // a short readable label from the invoice ID and the date.
    const dateObj = new Date(date);
    const yy = dateObj.getUTCFullYear();
    const mm = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const invoiceNumber = `INV-${yy}-${mm}-${invoiceId.slice(0, 6).toUpperCase()}`;

    // Net 14 days for now. Real product would derive from terms.
    const dueDate = new Date(
      dateObj.getTime() + 14 * 24 * 60 * 60 * 1000,
    ).toISOString();

    try {
      // Per-subscription invoice folder: find-or-create a folder named
      // `<subscription-name> - Invoices` and place the invoice doc inside
      // it. This nests the invoices under the subscription in the drive
      // tree so they're discoverable from the subscription, not floating
      // at the drive root. Folder name is derived from subscription name
      // (and falls back to id-prefix if name is empty). The drive reducer
      // restricts node names to `[a-zA-Z0-9-_.\s()]+`, so we stick to ASCII.
      const folderName = `${
        document.header.name || document.header.id.slice(0, 8)
      } - Invoices`;
      console.info("[GenerateInvoice] creating invoice doc", {
        invoiceNumber,
        folderName,
        driveId,
        lineItemCount: lineItems.length,
      });
      let invoiceFolderId =
        folderNodes?.find(
          (f) => f.name === folderName && f.parentFolder == null,
        )?.id ?? null;
      if (!invoiceFolderId) {
        const folderNode = await addFolder(driveId, folderName);
        invoiceFolderId = folderNode.id;
        console.info("[GenerateInvoice] created folder", invoiceFolderId);
      }
      // Build a fully-populated Invoice document via the model's utils,
      // then pass it to addDocument as the `document` parameter. This
      // creates + initializes atomically — no separate dispatchActions
      // step (which had been failing silently here, leaving stamped
      // subscription slices but no invoice doc).
      const invoiceGlobal: SubscriptionInvoiceGlobalState = {
        invoiceNumber,
        issuedAt: null,
        dueDate,
        status: "DRAFT",
        customerId: state.customerId ?? null,
        customerName: state.customerName ?? null,
        customerEmail: state.customerEmail ?? null,
        sourceSubscriptionId: document.header.id,
        sourceSubscriptionName: document.header.name,
        cycleStart: state.currentBillingCycleStart ?? null,
        cycleEnd: state.nextBillingDate ?? null,
        billingCycle: state.selectedBillingCycle ?? null,
        lineItems,
        currency: ledgerCurrency,
        subtotal,
        creditApplied: totalCreditApplied,
        totalDue,
        totalPaid,
        stripeInvoiceId: null,
        notes: null,
      };
      const invoiceDoc = subscriptionInvoiceUtils.createDocument({
        global: invoiceGlobal,
        local: {},
      });
      const node = await addDocument(
        driveId,
        invoiceNumber,
        "powerhouse/subscription-invoice",
        invoiceFolderId ?? undefined,
        invoiceDoc,
      );
      console.info("[GenerateInvoice] created + populated invoice", node.id);
    } catch (err) {
      // Surface to console; the subscription's GENERATE_INVOICE op
      // already succeeded, so the slices are stamped. The invoice
      // document just isn't created. Operator can retry later if needed.
      console.error("[GenerateInvoice] Failed to create invoice doc:", err);
    }
  }, [
    dispatch,
    nowISO,
    settlementDate,
    state.services,
    state.serviceGroups,
    state.debtLineItems,
    state.customerId,
    state.customerName,
    state.customerEmail,
    state.currentBillingCycleStart,
    state.nextBillingDate,
    state.selectedBillingCycle,
    state.globalCurrency,
    document.header.id,
    document.header.name,
    driveId,
    folderNodes,
  ]);

  const handleOperatorChangePlan = useCallback(() => {
    const effectiveDate = changePlanForm.effectiveDate
      ? new Date(changePlanForm.effectiveDate).toISOString()
      : nowISO();
    const newTierPrice = parseFloat(changePlanForm.newTierPrice);
    if (isNaN(newTierPrice) || newTierPrice <= 0) return;
    if (!changePlanForm.newTierPricingOptionId) return;

    dispatch(
      changePlan({
        newTierPricingOptionId: changePlanForm.newTierPricingOptionId,
        effectiveDate,
        newBillingCycle: null,
        creditLineItemId: generateId(),
        debitLineItemId: generateId(),
        newTierName: changePlanForm.newTierName || null,
        newTierPrice,
        newTierCurrency: changePlanForm.newTierCurrency,
      }),
    );
    setConfirmAction(null);
    setChangePlanForm({
      newTierPricingOptionId: "",
      newTierName: "",
      newTierPrice: "",
      newTierCurrency: "USD",
      effectiveDate: "",
    });
  }, [dispatch, nowISO, changePlanForm]);

  const handleConfirm = useCallback(() => {
    switch (confirmAction) {
      case "pause":
        handleOperatorPause();
        break;
      case "resume":
        handleOperatorResume();
        break;
      case "cancel":
        handleOperatorCancel();
        break;
      case "renew":
        handleOperatorRenew();
        break;
      case "settle":
        // Async — fires GENERATE_INVOICE then creates the sibling Invoice
        // document. We don't await here; failures inside log to console.
        void handleGenerateInvoice();
        break;
      case "changePlan":
        handleOperatorChangePlan();
        break;
    }
  }, [
    confirmAction,
    handleOperatorPause,
    handleOperatorResume,
    handleOperatorCancel,
    handleOperatorRenew,
    handleOperatorChangePlan,
    handleGenerateInvoice,
  ]);

  const isPending = state.status === "PENDING";
  const isActive = state.status === "ACTIVE";
  const isPaused = state.status === "PAUSED";
  const isExpiring = state.status === "EXPIRING";
  const isCancelled = state.status === "CANCELLED";

  return (
    <>
      <div className="si-actions">
        {/* Auto-Renew Toggle */}
        {mode === "operator" && (isActive || isPaused || isExpiring) && (
          <div className="si-actions__row">
            <span className="si-actions__label">Auto-Renew</span>
            <button
              type="button"
              className={`si-toggle ${state.autoRenew ? "si-toggle--active" : ""}`}
              onClick={() =>
                dispatch(setAutoRenew({ autoRenew: !state.autoRenew }))
              }
              title={
                state.autoRenew
                  ? "Auto-renew is ON — subscription will renew at cycle end"
                  : "Auto-renew is OFF — subscription will expire at cycle end"
              }
            >
              <span className="si-toggle__track">
                <span className="si-toggle__thumb" />
              </span>
            </button>
          </div>
        )}

        {/* Status Actions - contextual based on current status */}
        {mode === "operator" && (
          <div className="si-actions__buttons">
            {isPending && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--success"
                onClick={handleActivate}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Activate
              </button>
            )}

            {isActive && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--primary"
                onClick={() => setConfirmAction("settle")}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Generate Invoice
              </button>
            )}

            {isActive && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--secondary"
                onClick={() => setConfirmAction("changePlan")}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Change Plan
              </button>
            )}

            {isActive && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--warning"
                onClick={() => setConfirmAction("pause")}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Pause
              </button>
            )}

            {isPaused && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--success"
                onClick={() => setConfirmAction("resume")}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Resume
              </button>
            )}

            {isExpiring && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--primary"
                onClick={() => setConfirmAction("renew")}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Renew
              </button>
            )}

            {!isCancelled && (
              <button
                type="button"
                className="si-btn si-btn--sm si-btn--danger-ghost"
                onClick={() => setConfirmAction("cancel")}
              >
                <svg
                  className="si-btn__icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modals - operator only */}
      <ConfirmModal
        isOpen={confirmAction === "pause"}
        title="Pause Subscription"
        message="Are you sure you want to pause this subscription? Services will be temporarily suspended."
        confirmLabel="Pause Subscription"
        confirmVariant="warning"
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmAction(null);
          setReason("");
        }}
      />

      <ConfirmModal
        isOpen={confirmAction === "resume"}
        title="Resume Subscription"
        message="Are you sure you want to resume this subscription? Services will be reactivated."
        confirmLabel="Resume Subscription"
        confirmVariant="primary"
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmAction(null);
          setReason("");
        }}
      />

      {confirmAction === "cancel" && (
        <div
          className="si-modal-overlay"
          onClick={() => {
            setConfirmAction(null);
            setReason("");
          }}
        >
          <div
            className="si-modal si-modal--md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="si-modal__header">
              <h3 className="si-modal__title">Cancel Subscription</h3>
            </div>
            <div className="si-modal__body">
              <p className="si-modal__message">
                This action cannot be undone. Status will flip to CANCELLED.
              </p>

              {cancellationRefundPreview.applicable ? (
                <div className="si-settle-preview__section">
                  <div className="si-settle-preview__step">
                    <span className="si-settle-preview__step-num">↺</span>
                    <span className="si-settle-preview__step-label">
                      Refund credit slices
                    </span>
                  </div>
                  <p className="si-settle-preview__detail">
                    Cancelling{" "}
                    {Math.round(cancellationRefundPreview.prorataFactor * 100)}%
                    into this cycle. The unused portion of recurring fees will
                    become credit slices on the ledger:
                  </p>
                  <ul className="si-settle-preview__list">
                    {cancellationRefundPreview.refunds.map((r) => (
                      <li key={r.name} className="si-settle-preview__list-item">
                        <span>{r.name}</span>
                        <span className="si-settle-preview__amount">
                          −
                          {formatCurrency(
                            r.amount,
                            cancellationRefundPreview.currency,
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="si-settle-preview__detail">
                    Total refund:{" "}
                    <strong>
                      −
                      {formatCurrency(
                        cancellationRefundPreview.totalRefund,
                        cancellationRefundPreview.currency,
                      )}
                    </strong>
                    . Setup fees and overage charges are NOT refunded.
                  </p>
                </div>
              ) : (
                <p className="si-settle-preview__detail si-settle-preview__detail--empty">
                  No prorated refund applies (subscription not active or outside
                  the current billing cycle).
                </p>
              )}

              <textarea
                className="si-input si-input--textarea"
                placeholder="Cancellation reason (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ marginTop: 12 }}
              />
            </div>
            <div className="si-modal__footer">
              <button
                type="button"
                className="si-btn si-btn--ghost"
                onClick={() => {
                  setConfirmAction(null);
                  setReason("");
                }}
              >
                Keep Subscription
              </button>
              <button
                type="button"
                className="si-btn si-btn--danger"
                onClick={handleConfirm}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmAction === "renew"}
        title="Renew Subscription"
        message="This will renew the expiring subscription and set it back to active status."
        confirmLabel="Renew Subscription"
        confirmVariant="primary"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />

      {confirmAction === "settle" && (
        <div
          className="si-modal-overlay"
          onClick={() => {
            setConfirmAction(null);
            setSettlementDate("");
          }}
        >
          <div
            className="si-modal si-modal--md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="si-modal__header">
              <h3 className="si-modal__title">Generate Invoice</h3>
              <span className="si-modal__subtitle">
                Current cycle:{" "}
                {state.currentBillingCycleStart
                  ? new Date(
                      state.currentBillingCycleStart,
                    ).toLocaleDateString()
                  : "—"}{" "}
                →{" "}
                {state.nextBillingDate
                  ? new Date(state.nextBillingDate).toLocaleDateString()
                  : "—"}
              </span>
            </div>
            <div className="si-modal__body">
              <p className="si-modal__message">
                Review what will happen at this settlement before confirming.
              </p>

              {/* Step 1: T-05 invoice sweep preview */}
              <div className="si-settle-preview__section">
                <div className="si-settle-preview__step">
                  <span className="si-settle-preview__step-num">1</span>
                  <span className="si-settle-preview__step-label">
                    Sweep open charges to Invoiced
                  </span>
                </div>
                {settlementPreview.toBeInvoicedCount > 0 ? (
                  <p className="si-settle-preview__detail">
                    {settlementPreview.toBeInvoicedCount} charge
                    {settlementPreview.toBeInvoicedCount === 1 ? "" : "s"} (
                    {formatCurrency(
                      settlementPreview.toBeInvoicedAmount,
                      settlementPreview.currency,
                    )}
                    ) currently CHARGED will flip to INVOICED.
                  </p>
                ) : (
                  <p className="si-settle-preview__detail si-settle-preview__detail--empty">
                    No outstanding CHARGED slices — nothing to sweep.
                  </p>
                )}
              </div>

              {/* Step 2: force-accrue preview */}
              <div className="si-settle-preview__section">
                <div className="si-settle-preview__step">
                  <span className="si-settle-preview__step-num">2</span>
                  <span className="si-settle-preview__step-label">
                    Force-accrue overage
                  </span>
                </div>
                {settlementPreview.accruals.length > 0 ? (
                  <>
                    <ul className="si-settle-preview__list">
                      {settlementPreview.accruals.map((a) => (
                        <li
                          key={a.metricName}
                          className="si-settle-preview__list-item"
                        >
                          <span>{a.metricName}</span>
                          <span className="si-settle-preview__amount">
                            {formatCurrency(a.cost, settlementPreview.currency)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="si-settle-preview__detail">
                      Total overage to crystallise:{" "}
                      <strong>
                        {formatCurrency(
                          settlementPreview.totalAccrual,
                          settlementPreview.currency,
                        )}
                      </strong>
                    </p>
                  </>
                ) : (
                  <p className="si-settle-preview__detail si-settle-preview__detail--empty">
                    No metrics over free limit — no overage to accrue.
                  </p>
                )}
              </div>

              {/* Step 3: next-cycle recurring preview */}
              <div className="si-settle-preview__section">
                <div className="si-settle-preview__step">
                  <span className="si-settle-preview__step-num">3</span>
                  <span className="si-settle-preview__step-label">
                    {state.autoRenew
                      ? "Emit next-cycle recurring fees"
                      : "Auto-renew off — subscription will EXPIRE"}
                  </span>
                </div>
                {state.autoRenew ? (
                  settlementPreview.recurringSources.length > 0 ? (
                    <>
                      <ul className="si-settle-preview__list">
                        {settlementPreview.recurringSources.map((s) => (
                          <li
                            key={s.name}
                            className="si-settle-preview__list-item"
                          >
                            <span>{s.name}</span>
                            <span className="si-settle-preview__amount">
                              {formatCurrency(
                                s.amount,
                                settlementPreview.currency,
                              )}
                            </span>
                          </li>
                        ))}
                        {settlementPreview.carryOverCredit > 0 && (
                          <>
                            <li className="si-settle-preview__list-item si-settle-preview__list-item--subtotal">
                              <span>Recurring total</span>
                              <span className="si-settle-preview__amount">
                                {formatCurrency(
                                  settlementPreview.nextCycleRecurring,
                                  settlementPreview.currency,
                                )}
                              </span>
                            </li>
                            <li className="si-settle-preview__list-item si-settle-preview__list-item--credit">
                              <span>
                                Less carry-over credit
                                <span
                                  style={{
                                    fontSize: "0.7rem",
                                    color: "var(--si-slate-500)",
                                    marginLeft: 4,
                                  }}
                                >
                                  (existing customer surplus)
                                </span>
                              </span>
                              <span className="si-settle-preview__amount">
                                −
                                {formatCurrency(
                                  settlementPreview.carryOverCredit,
                                  settlementPreview.currency,
                                )}
                              </span>
                            </li>
                            <li className="si-settle-preview__list-item si-settle-preview__list-item--total">
                              <span>Net new charge to customer</span>
                              <span className="si-settle-preview__amount">
                                {formatCurrency(
                                  settlementPreview.netNewCharge,
                                  settlementPreview.currency,
                                )}
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                      <p className="si-settle-preview__detail">
                        New cycle starts:{" "}
                        <strong>
                          {settlementPreview.newCycleStart
                            ? new Date(
                                settlementPreview.newCycleStart,
                              ).toLocaleDateString()
                            : "—"}
                        </strong>
                        {settlementPreview.newNextBilling && (
                          <>
                            {" "}
                            → next billing{" "}
                            <strong>
                              {new Date(
                                settlementPreview.newNextBilling,
                              ).toLocaleDateString()}
                            </strong>
                          </>
                        )}
                        {settlementPreview.carryOverCredit === 0 && (
                          <>
                            . Recurring total{" "}
                            <strong>
                              {formatCurrency(
                                settlementPreview.nextCycleRecurring,
                                settlementPreview.currency,
                              )}
                            </strong>
                            .
                          </>
                        )}
                        {settlementPreview.carryOverCredit > 0 && (
                          <>
                            {". "}The customer's existing $
                            {settlementPreview.carryOverCredit.toFixed(2)}{" "}
                            credit balance carries forward and is absorbed by
                            the FIFO+priority allocator on next payment.
                          </>
                        )}
                      </p>
                    </>
                  ) : (
                    <p className="si-settle-preview__detail si-settle-preview__detail--empty">
                      No recurring fees to emit.
                    </p>
                  )
                ) : (
                  <p className="si-settle-preview__detail si-settle-preview__warning">
                    Status will flip to EXPIRING. Manual renewal required to
                    continue billing.
                  </p>
                )}
              </div>

              <div className="si-form-group">
                <label className="si-form-label">Settlement Date</label>
                <input
                  type="date"
                  className="si-input"
                  value={settlementDate}
                  onChange={(e) => setSettlementDate(e.target.value)}
                  min={
                    state.currentBillingCycleStart
                      ? state.currentBillingCycleStart.split("T")[0]
                      : undefined
                  }
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--si-slate-500)",
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  Leave empty for today. Use a future date to simulate billing
                  cycles.
                </span>
              </div>
            </div>
            <div className="si-modal__footer">
              <button
                type="button"
                className="si-btn si-btn--ghost"
                onClick={() => {
                  setConfirmAction(null);
                  setSettlementDate("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="si-btn si-btn--primary"
                onClick={handleConfirm}
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmAction === "changePlan" && (
        <div
          className="si-modal-overlay"
          onClick={() => {
            setConfirmAction(null);
          }}
        >
          <div
            className="si-modal si-modal--md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="si-modal__header">
              <h3 className="si-modal__title">Change Plan</h3>
              <span className="si-modal__subtitle">
                Current tier: {state.tierName ?? "—"}
                {state.tierPrice
                  ? ` · ${formatCurrency(state.tierPrice, state.tierCurrency || "USD")}`
                  : ""}
              </span>
            </div>
            <div className="si-modal__body">
              <p className="si-modal__message">
                Mid-cycle tier swap. Emits two SUBSCRIPTION_FEE slices: a credit
                for the unused portion of the current tier and a debit for the
                prorated remainder of the new tier.
              </p>

              <div className="si-form-group">
                <label className="si-form-label">New Tier Name</label>
                <input
                  type="text"
                  className="si-input"
                  placeholder="e.g. Custom"
                  value={changePlanForm.newTierName}
                  onChange={(e) =>
                    setChangePlanForm({
                      ...changePlanForm,
                      newTierName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="si-form-group">
                <label className="si-form-label">
                  New Tier Pricing Option ID
                </label>
                <input
                  type="text"
                  className="si-input"
                  placeholder="OID for the new tier-pricing option"
                  value={changePlanForm.newTierPricingOptionId}
                  onChange={(e) =>
                    setChangePlanForm({
                      ...changePlanForm,
                      newTierPricingOptionId: e.target.value,
                    })
                  }
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--si-slate-500)",
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  Required. Look up the OID in the source service-offering
                  document.
                </span>
              </div>

              <div className="si-form-group">
                <label className="si-form-label">New Tier Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="si-input"
                  placeholder="0.00"
                  value={changePlanForm.newTierPrice}
                  onChange={(e) =>
                    setChangePlanForm({
                      ...changePlanForm,
                      newTierPrice: e.target.value,
                    })
                  }
                />
              </div>

              <div className="si-form-group">
                <label className="si-form-label">New Tier Currency</label>
                <input
                  type="text"
                  className="si-input"
                  value={changePlanForm.newTierCurrency}
                  onChange={(e) =>
                    setChangePlanForm({
                      ...changePlanForm,
                      newTierCurrency: e.target.value,
                    })
                  }
                />
              </div>

              <div className="si-form-group">
                <label className="si-form-label">Effective Date</label>
                <input
                  type="date"
                  className="si-input"
                  value={changePlanForm.effectiveDate}
                  onChange={(e) =>
                    setChangePlanForm({
                      ...changePlanForm,
                      effectiveDate: e.target.value,
                    })
                  }
                  min={
                    state.currentBillingCycleStart
                      ? state.currentBillingCycleStart.split("T")[0]
                      : undefined
                  }
                  max={
                    state.nextBillingDate
                      ? state.nextBillingDate.split("T")[0]
                      : undefined
                  }
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--si-slate-500)",
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  Leave empty for today. Must be within the current cycle.
                </span>
              </div>

              {changePlanPreview.applicable && (
                <div className="si-settle-preview__section">
                  <div className="si-settle-preview__step">
                    <span className="si-settle-preview__step-num">↺</span>
                    <span className="si-settle-preview__step-label">
                      Prorata preview
                    </span>
                  </div>
                  <p className="si-settle-preview__detail">
                    {Math.round(changePlanPreview.prorataFactor * 100)}% of
                    cycle remaining at effective date.
                  </p>
                  <ul className="si-settle-preview__list">
                    <li className="si-settle-preview__list-item">
                      <span>Credit (unused portion of current tier)</span>
                      <span className="si-settle-preview__amount">
                        −
                        {formatCurrency(
                          changePlanPreview.oldCredit,
                          changePlanPreview.currency,
                        )}
                      </span>
                    </li>
                    <li className="si-settle-preview__list-item">
                      <span>Debit (prorated new tier)</span>
                      <span className="si-settle-preview__amount">
                        +
                        {formatCurrency(
                          changePlanPreview.newDebit,
                          changePlanPreview.currency,
                        )}
                      </span>
                    </li>
                  </ul>
                  <p className="si-settle-preview__detail">
                    Net effect on debt:{" "}
                    <strong>
                      {changePlanPreview.net >= 0 ? "+" : ""}
                      {formatCurrency(
                        changePlanPreview.net,
                        changePlanPreview.currency,
                      )}
                    </strong>
                    . Active DYNAMIC slices will be frozen. Cycle anchors
                    unchanged.
                  </p>
                </div>
              )}
            </div>
            <div className="si-modal__footer">
              <button
                type="button"
                className="si-btn si-btn--ghost"
                onClick={() => {
                  setConfirmAction(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="si-btn si-btn--primary"
                disabled={
                  !changePlanForm.newTierPricingOptionId ||
                  !changePlanForm.newTierPrice ||
                  parseFloat(changePlanForm.newTierPrice) <= 0
                }
                onClick={handleConfirm}
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
