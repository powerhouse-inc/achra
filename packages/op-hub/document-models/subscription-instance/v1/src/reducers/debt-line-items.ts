import type { SubscriptionInstanceDebtLineItemsOperations } from "document-models/subscription-instance/v1";
import {
  ApplyCreditAmountExceedsRemainingError,
  ApplyCreditInvalidAmountError,
  ApplyCreditLineItemNotFoundError,
  ApplyCreditNoDebtError,
  ConfirmLineItemInvalidStatusTransitionError,
  ConfirmLineItemNotFoundError,
  DynamicSliceNotYetChargeableError,
  InvalidPaymentAmountError,
  MarkLineItemInvalidStatusTransitionError,
  MarkLineItemNotFoundError,
  OverPaymentError,
  ReportPaymentInvalidAmountError,
  ReportPaymentNoDebtError,
} from "../../gen/debt-line-items/error.js";
import type {
  DebtLineItem,
  SubscriptionInstanceState,
} from "../../gen/schema/types.js";

// FIFO-within-priority allocation for bulk payments + credits.
// BA Q4 Option (a): Setup beats Subscription beats Dynamic, then ascending
// chargedAt within each class. Setup recovers first because it's a one-shot
// committed cost; Subscription next because it's the cycle's promise;
// Dynamic last because it's variable usage. Within each class, oldest
// outstanding wins.
const ORIGIN_PRIORITY: Record<string, number> = {
  SETUP: 0,
  SUBSCRIPTION_FEE: 1,
  DYNAMIC: 2,
  ESTIMATED_USAGE: 3,
  RECONCILIATION: 4,
};

function outstandingSlicesByPriority(
  slices: readonly DebtLineItem[],
): DebtLineItem[] {
  return slices
    .filter(
      (s) =>
        s.status !== "FULLY_PAID" &&
        s.debitAmount - s.settledAmount > 0 &&
        // Per 2026-05-07: live (unfrozen) DYNAMIC slices represent ongoing
        // overage display, not collectible debt. They become collectible
        // only when the accrual cycle closes and the slice is frozen.
        (s.origin !== "DYNAMIC" || s.frozen),
    )
    .slice()
    .sort((a, b) => {
      const ap = ORIGIN_PRIORITY[a.origin] ?? 99;
      const bp = ORIGIN_PRIORITY[b.origin] ?? 99;
      if (ap !== bp) return ap - bp;
      return a.chargedAt < b.chargedAt ? -1 : 1;
    });
}

// Allocate `amount` across outstanding slices via FIFO+priority, mutating
// each slice's settledAmount and status. Auto-flips CHARGED → INVOICED on
// any slice receiving a partial settlement (payment implies invoice in
// MVP, since invoices/payments are operator-tracked). Caller is
// responsible for incrementing `state.totalCredit`. Returns the unspent
// remainder (typically 0 unless payment exceeds outstanding).
//
// `isCreditAllocation` distinguishes credit-driven allocation (from
// APPLY_CREDIT) from cash payments (from REPORT_PAYMENT). When true,
// each receiving slice's `creditApplied` is incremented by the same
// amount added to `settledAmount`, so the row UI can show "credit
// applied $X" alongside the cash settlement total.
function allocateAcrossSlices(
  state: SubscriptionInstanceState,
  amount: number,
  date: string,
  paymentRef: string | null,
  isCreditAllocation = false,
): number {
  let remaining = amount;
  const queue = outstandingSlicesByPriority(state.debtLineItems);
  for (const ref of queue) {
    if (remaining <= 0) break;
    // Re-find by id since `queue` holds references that may be stale
    // depending on whether mutative wrap is in effect; safer to re-look-up.
    const slice = state.debtLineItems.find((s) => s.id === ref.id);
    if (!slice) continue;
    const owed = slice.debitAmount - slice.settledAmount;
    if (owed <= 0) continue;
    const apply = Math.min(remaining, owed);
    slice.settledAmount += apply;
    if (isCreditAllocation) {
      slice.creditApplied = (slice.creditApplied ?? 0) + apply;
    }
    remaining -= apply;
    // Auto-invoice CHARGED slices receiving payment — this is the moment
    // operator effectively acknowledges the invoice when bulk-applying.
    if (slice.status === "CHARGED") {
      slice.status = "INVOICED";
      slice.invoiced = true;
      slice.invoicedAt = date;
    }
    if (slice.settledAmount >= slice.debitAmount) {
      // Enforce the slice-level invariant: status FULLY_PAID ⇒ settled === debit.
      // Floating-point math during multi-allocation can leave settled slightly
      // above debit; clamp to debit so audit reads cleanly.
      slice.settledAmount = slice.debitAmount;
      slice.status = "FULLY_PAID";
      slice.fullyPaidAt = date;
    } else {
      slice.status = "PARTIALLY_PAID";
    }
    if (paymentRef) {
      slice.lastPaymentRef = paymentRef;
    }
  }
  return remaining;
}

// Compute the customer's standing credit balance from current aggregates.
// This is the surplus payment carried in (totalCredit > totalDebt). Used
// by SETTLE_BILLING_CYCLE for carry-over consumption against next-cycle
// debt. Caller must capture this BEFORE next-cycle slices are emitted,
// otherwise the new debt erases the surplus.
export function getCustomerCreditBalance(
  state: SubscriptionInstanceState,
): number {
  return Math.max(0, (state.totalCredit ?? 0) - (state.totalDebt ?? 0));
}

// Compute the customer's *applicable* credit — the sum of unsettled
// credit-slice remainders (every negative-debit slice still has
// settledAmount > debitAmount in absolute value, i.e. credit not yet
// drawn down).
//
// This is the **entitlement view**, distinct from the cash-flow view
// above:
//   - Cash-flow (getCustomerCreditBalance): "have you paid more than you
//     owe?" Useful for end-of-cycle carry-over.
//   - Entitlement (this fn): "what credit is still untapped?" — even when
//     the customer also has unpaid debt elsewhere. This matches the
//     intuitive UX: removing AML mid-cycle gives you a $458 credit, and
//     you should be able to apply it to the $1,500 usage overage *now*,
//     regardless of whether your $5,400 setup+recurring is still unpaid.
//
// Sum is positive (e.g. an unsettled −$458 credit slice contributes
// +$458 here).
export function getApplicableCreditBalance(
  state: SubscriptionInstanceState,
): number {
  let total = 0;
  for (const s of state.debtLineItems) {
    if (s.debitAmount >= 0) continue;
    // Untapped portion = settledAmount − debitAmount (both negative; the
    // less-negative settledAmount means credit hasn't been drawn down).
    // Settled toward debit means consumed.
    const untapped = s.settledAmount - s.debitAmount;
    if (untapped > 0) total += untapped;
  }
  return total;
}

// Consume a standing credit balance against outstanding debt. Used by
// SETTLE_BILLING_CYCLE so a credit accrued in cycle N (e.g. mid-cycle
// service-group removal credit, or overpayment surplus) is drawn down
// against cycle N+1's freshly-emitted recurring slices instead of
// floating forward indefinitely.
//
// IMPORTANT: caller must capture `creditBalance` via getCustomerCreditBalance()
// BEFORE the new-cycle debt is appended. By the time the new cycle's debit
// slices are in state.debtLineItems, totalDebt has grown and the live
// `max(0, totalCredit - totalDebt)` would read 0 — there'd be nothing to
// consume even though the surplus is still real. Callers that compute the
// balance after emission will silently no-op.
//
// Mechanics:
//  1. Settle each unsettled credit slice (debitAmount < 0, settledAmount > debitAmount)
//     by moving settledAmount toward debitAmount. The slice status stays
//     FULLY_PAID — credit slices were never "owed" — but we mark the
//     credit as consumed via settledAmount so it stops contributing to
//     `customerCreditBalance = max(0, totalCredit - totalDebt)` reads.
//  2. Allocate the consumed amount across outstanding debit slices via
//     the same FIFO+priority allocator used by reportPayment / applyCredit.
//
// totalDebt and totalCredit aggregates are NOT touched: the credit was
// already in totalCredit, the debt was already in totalDebt, and the
// FIFO allocator only mutates settledAmount on the receiving debit slices.
// Net effect on (totalCredit - totalDebt) is zero — credit is consumed
// dollar-for-dollar against debt.
export function consumeCarryOverCredit(
  state: SubscriptionInstanceState,
  date: string,
  creditBalance: number,
): void {
  if (creditBalance <= 0) return;
  let remaining = creditBalance;

  // Step 1: draw down unsettled credit slices. settledAmount on a credit
  // slice is normally 0 with debitAmount negative; consuming the credit
  // means moving settledAmount toward debitAmount (also negative).
  for (const slice of state.debtLineItems) {
    if (remaining <= 0) break;
    if (slice.debitAmount >= 0) continue;
    const remainingCredit = slice.debitAmount - slice.settledAmount; // negative
    if (remainingCredit >= 0) continue; // already drawn down
    const consume = Math.max(remainingCredit, -remaining); // negative
    slice.settledAmount += consume;
    remaining += consume; // consume is negative
  }

  // Step 2: apply the consumed credit against outstanding debit slices
  // via the existing FIFO+priority allocator. The amount drawn down in
  // step 1 equals what we now allocate forward. isCreditAllocation=true
  // tracks the credit on each receiving slice's `creditApplied`.
  const consumed = creditBalance - remaining;
  if (consumed > 0) {
    allocateAcrossSlices(state, consumed, date, null, true);
  }
}

export const subscriptionInstanceDebtLineItemsOperations: SubscriptionInstanceDebtLineItemsOperations =
  {
    markLineItemInvoicedOperation(state, action) {
      const slice = state.debtLineItems.find(
        (s) => s.id === action.input.lineItemId,
      );
      if (!slice) {
        throw new MarkLineItemNotFoundError(
          `No debt line item with id ${action.input.lineItemId}`,
        );
      }
      // Per 2026-05-07 stakeholder call: DYNAMIC overage slices are not
      // chargeable until the accrual cycle closes (i.e. they're frozen).
      // Live tracking of usage stays for display, but the slice can't be
      // invoiced or paid until ACCRUE_METRIC_USAGE flips frozen=true.
      if (slice.origin === "DYNAMIC" && !slice.frozen) {
        throw new DynamicSliceNotYetChargeableError(
          "Overage charges are settled at the end of the accrual cycle",
        );
      }
      if (slice.status !== "CHARGED") {
        throw new MarkLineItemInvalidStatusTransitionError(
          `Cannot invoice slice in status ${slice.status}; expected CHARGED`,
        );
      }
      slice.status = "INVOICED";
      slice.invoiced = true;
      slice.invoicedAt = action.input.invoicedAt;
      if (action.input.invoiceRef) {
        slice.invoiceRef = action.input.invoiceRef;
      }
      // No aggregate change — debitAmount/settledAmount unchanged.
    },
    confirmLineItemPaymentOperation(state, action) {
      const slice = state.debtLineItems.find(
        (s) => s.id === action.input.lineItemId,
      );
      if (!slice) {
        throw new ConfirmLineItemNotFoundError(
          `No debt line item with id ${action.input.lineItemId}`,
        );
      }
      if (action.input.amount <= 0) {
        throw new InvalidPaymentAmountError(
          "Payment amount must be greater than zero",
        );
      }
      // Per 2026-05-07 stakeholder call: DYNAMIC overage slices are not
      // collectible until the accrual cycle closes (frozen=true). Live
      // overage display stays informational; payment action is gated.
      if (slice.origin === "DYNAMIC" && !slice.frozen) {
        throw new DynamicSliceNotYetChargeableError(
          "Overage charges are settled at the end of the accrual cycle",
        );
      }
      if (slice.status === "CHARGED") {
        throw new ConfirmLineItemInvalidStatusTransitionError(
          "Slice must be INVOICED before payment can be confirmed",
        );
      }
      if (slice.status === "FULLY_PAID") {
        throw new ConfirmLineItemInvalidStatusTransitionError(
          "Slice is already fully paid",
        );
      }
      if (slice.settledAmount + action.input.amount > slice.debitAmount) {
        throw new OverPaymentError(
          `Payment of ${action.input.amount} would exceed remaining ${slice.debitAmount - slice.settledAmount}`,
        );
      }
      slice.settledAmount = slice.settledAmount + action.input.amount;
      state.totalCredit = (state.totalCredit ?? 0) + action.input.amount;
      // Tolerance-based comparison handles floating-point drift on
      // partial-pay sequences. Without this, a slice with debit
      // 840.8623423547541 paid in chunks of 840.86 would never round-trip
      // to settled === debit and stay in PARTIALLY_PAID forever.
      const EPS = 0.005;
      if (slice.settledAmount >= slice.debitAmount - EPS) {
        slice.settledAmount = slice.debitAmount;
        slice.status = "FULLY_PAID";
        slice.fullyPaidAt = action.input.paymentDate;
      } else {
        slice.status = "PARTIALLY_PAID";
      }
      if (action.input.paymentRef) {
        slice.lastPaymentRef = action.input.paymentRef;
      }
    },
    reportPaymentOperation(state, action) {
      if (action.input.amount <= 0) {
        throw new ReportPaymentInvalidAmountError(
          "Payment amount must be greater than zero",
        );
      }
      // Outstanding for collection purposes — excludes unfrozen DYNAMIC
      // slices (they represent live overage display, not collectible debt
      // until accrual cycle close).
      const outstanding = state.debtLineItems.reduce((sum, s) => {
        if (s.status === "FULLY_PAID") return sum;
        if (s.origin === "DYNAMIC" && !s.frozen) return sum;
        return sum + Math.max(0, s.debitAmount - s.settledAmount);
      }, 0);
      if (outstanding <= 0) {
        throw new ReportPaymentNoDebtError(
          "No outstanding debt to allocate payment against",
        );
      }
      // Allocate via FIFO+priority. Payment that exceeds outstanding lands
      // as a credit surplus on totalCredit per D-7 (negative balance carries
      // forward). No silent capping.
      const remainder = allocateAcrossSlices(
        state,
        action.input.amount,
        action.input.paymentDate,
        action.input.paymentRef ?? null,
      );
      state.totalCredit = (state.totalCredit ?? 0) + action.input.amount;
      // remainder > 0 means we paid more than the customer owed. The slice
      // ledger is now fully settled; the surplus shows up as
      // (totalCredit - totalDebt) > 0 — a credit surplus.
      void remainder;
    },
    applyCreditOperation(state, action) {
      if (action.input.amount <= 0) {
        throw new ApplyCreditInvalidAmountError(
          "Credit amount must be greater than zero",
        );
      }
      // APPLY_CREDIT redistributes existing credit (from credit slices
      // emitted by mid-cycle removals, plan changes, or overpayments)
      // against debit slices. It does NOT bring in new money — neither
      // totalDebt nor totalCredit changes net. Two phases:
      //   1. Source: draw down credit slices' untapped balance by `amount`.
      //   2. Sink: allocate `amount` to debit slices (targeted or FIFO).
      //
      // Pre-flight: amount must not exceed total applicable credit.
      let applicableCredit = 0;
      for (const s of state.debtLineItems) {
        if (s.debitAmount >= 0) continue;
        const untapped = s.settledAmount - s.debitAmount;
        if (untapped > 0) applicableCredit += untapped;
      }
      if (applicableCredit <= 0) {
        throw new ApplyCreditNoDebtError(
          "No applicable credit available to apply",
        );
      }
      if (action.input.amount > applicableCredit + 0.005) {
        throw new ApplyCreditAmountExceedsRemainingError(
          `Credit of ${action.input.amount} exceeds applicable credit ${applicableCredit}`,
        );
      }

      // SINK phase first — validate that the destination can absorb the
      // amount. (Doing source first would draw down credit slices even
      // if the targeted slice rejects the amount.)
      if (action.input.lineItemId) {
        const slice = state.debtLineItems.find(
          (s) => s.id === action.input.lineItemId,
        );
        if (!slice) {
          throw new ApplyCreditLineItemNotFoundError(
            `No debt line item with id ${action.input.lineItemId}`,
          );
        }
        // A live (unfrozen) DYNAMIC slice can't receive credit either —
        // same rule as payment: not collectible until accrual close.
        if (slice.origin === "DYNAMIC" && !slice.frozen) {
          throw new DynamicSliceNotYetChargeableError(
            "Overage charges are settled at the end of the accrual cycle",
          );
        }
        const remaining = slice.debitAmount - slice.settledAmount;
        if (remaining <= 0) {
          throw new ApplyCreditNoDebtError(
            "Targeted line item has no outstanding amount",
          );
        }
        if (action.input.amount > remaining + 0.005) {
          throw new ApplyCreditAmountExceedsRemainingError(
            `Credit of ${action.input.amount} exceeds remaining ${remaining} on line item ${slice.id}`,
          );
        }
        // Source phase: draw down credit slices.
        let toSource = action.input.amount;
        for (const s of state.debtLineItems) {
          if (toSource <= 0) break;
          if (s.debitAmount >= 0) continue;
          const untapped = s.settledAmount - s.debitAmount;
          if (untapped <= 0) continue;
          const consume = Math.min(untapped, toSource);
          s.settledAmount -= consume;
          toSource -= consume;
        }
        // Sink phase: settle on the targeted slice.
        slice.settledAmount += action.input.amount;
        slice.creditApplied = (slice.creditApplied ?? 0) + action.input.amount;
        if (slice.status === "CHARGED") {
          slice.status = "INVOICED";
          slice.invoiced = true;
          slice.invoicedAt = action.input.creditDate;
        }
        const EPS = 0.005;
        if (slice.settledAmount >= slice.debitAmount - EPS) {
          slice.settledAmount = slice.debitAmount;
          slice.status = "FULLY_PAID";
          slice.fullyPaidAt = action.input.creditDate;
        } else {
          slice.status = "PARTIALLY_PAID";
        }
      } else {
        // Untargeted: FIFO+priority across collectible outstanding slices.
        const outstanding = state.debtLineItems.reduce((sum, s) => {
          if (s.status === "FULLY_PAID") return sum;
          if (s.origin === "DYNAMIC" && !s.frozen) return sum;
          return sum + Math.max(0, s.debitAmount - s.settledAmount);
        }, 0);
        if (outstanding <= 0) {
          throw new ApplyCreditNoDebtError(
            "No outstanding debt to allocate credit against",
          );
        }
        if (action.input.amount > outstanding + 0.005) {
          throw new ApplyCreditAmountExceedsRemainingError(
            `Credit of ${action.input.amount} exceeds total outstanding ${outstanding}`,
          );
        }
        // Source phase: draw down credit slices.
        let toSource = action.input.amount;
        for (const s of state.debtLineItems) {
          if (toSource <= 0) break;
          if (s.debitAmount >= 0) continue;
          const untapped = s.settledAmount - s.debitAmount;
          if (untapped <= 0) continue;
          const consume = Math.min(untapped, toSource);
          s.settledAmount -= consume;
          toSource -= consume;
        }
        // Sink phase: FIFO+priority allocator. isCreditAllocation=true
        // tracks the credit on each receiving slice's `creditApplied`.
        allocateAcrossSlices(
          state,
          action.input.amount,
          action.input.creditDate,
          null,
          true,
        );
      }
      // Net effect on (totalCredit, totalDebt): zero. Credit is moved
      // from credit-slice untapped balances to debit-slice settled
      // balances. Aggregates stay constant. `reason` is captured by the
      // action input; auditable via the operation log.
      void action.input.reason;
    },
  };
