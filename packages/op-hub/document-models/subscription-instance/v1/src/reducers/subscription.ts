import type { SubscriptionInstanceSubscriptionOperations } from "document-models/subscription-instance/v1";
import {
  ActivateMissingSliceIdError,
  ActivateNotPendingError,
  BillingCycleSwapNotYetSupportedError,
  CancelAlreadyCancelledError,
  CancelMissingSliceIdError,
  ChangePlanInvalidEffectiveDateError,
  ChangePlanMissingTierPricingError,
  ChangePlanNotActiveError,
  NoBillingCycleActiveError,
  NoInvoiceableLineItemsError,
  PauseNotActiveError,
  RenewMissingSliceIdError,
  RenewNotExpiringError,
  ResumeNotPausedError,
  SetExpiringNotActiveError,
  SettlementDateBeforeCycleStartError,
  SettleMissingSliceIdError,
} from "../../gen/subscription/error.js";
import {
  appendDebtSlice,
  calculateNextBillingDate,
  calculateOverageCost,
  freezeDynamicSlice,
} from "../utils.js";
import {
  consumeCarryOverCredit,
  getCustomerCreditBalance,
} from "./debt-line-items.js";

export const subscriptionInstanceSubscriptionOperations: SubscriptionInstanceSubscriptionOperations =
  {
    initializeSubscriptionOperation(state, action) {
      state.customerId = action.input.customerId || null;
      state.customerName = action.input.customerName || null;
      state.customerEmail = action.input.customerEmail || null;
      state.serviceOfferingId = action.input.serviceOfferingId || null;
      state.tierName = action.input.tierName || null;
      state.tierPricingOptionId = action.input.tierPricingOptionId || null;
      state.tierPrice = action.input.tierPrice || null;
      state.tierCurrency = action.input.tierCurrency || null;
      state.tierPricingMode = action.input.tierPricingMode || null;
      state.selectedBillingCycle = action.input.selectedBillingCycle || null;
      state.globalCurrency = action.input.globalCurrency || null;
      if (action.input.resourceId) {
        state.resource = {
          id: action.input.resourceId,
          label: action.input.resourceLabel || null,
          thumbnailUrl: action.input.resourceThumbnailUrl || null,
        };
      }
      state.autoRenew = action.input.autoRenew || false;
      state.createdAt = action.input.createdAt;
      state.status = "PENDING";
      state.services = (action.input.services || []).map((s) => ({
        id: s.id,
        name: s.name || null,
        description: s.description || null,
        customValue: s.customValue || null,
        facetSelections: (s.facetSelections || []).map((fs) => ({
          id: fs.id,
          facetName: fs.facetName,
          selectedOption: fs.selectedOption,
        })),
        setupCost:
          s.setupAmount && s.setupCurrency
            ? {
                amount: s.setupAmount,
                currency: s.setupCurrency,
                paymentDate: null,
              }
            : null,
        recurringCost:
          s.recurringAmount && s.recurringCurrency && s.recurringBillingCycle
            ? {
                amount: s.recurringAmount,
                currency: s.recurringCurrency,
                billingCycle: s.recurringBillingCycle,
                lastPaymentDate: null,
                discount: s.recurringDiscount
                  ? {
                      originalAmount: s.recurringDiscount.originalAmount,
                      discountType: s.recurringDiscount.discountType,
                      discountValue: s.recurringDiscount.discountValue,
                      source: s.recurringDiscount.source,
                    }
                  : null,
              }
            : null,
        metrics: (s.metrics || []).map((m) => ({
          id: m.id,
          name: m.name,
          unitName: m.unitName,
          freeLimit: m.freeLimit || null,
          paidLimit: m.paidLimit || null,
          unitCost:
            m.unitCostAmount && m.unitCostCurrency && m.unitCostBillingCycle
              ? {
                  amount: m.unitCostAmount,
                  currency: m.unitCostCurrency,
                  billingCycle: m.unitCostBillingCycle,
                  lastPaymentDate: null,
                  discount: null,
                }
              : null,
          currentUsage: m.currentUsage,
          metricType: m.metricType,
          accrualCycle: m.accrualCycle,
          lastAccrualDate: m.lastAccrualDate || null,
        })),
      }));
      state.serviceGroups = (action.input.serviceGroups || []).map((sg) => ({
        id: sg.id,
        name: sg.name,
        optional: sg.optional,
        costType: sg.costType || null,
        setupCost:
          sg.setupAmount && sg.setupCurrency
            ? {
                amount: sg.setupAmount,
                currency: sg.setupCurrency,
                paymentDate: null,
              }
            : null,
        recurringCost:
          sg.recurringAmount && sg.recurringCurrency && sg.recurringBillingCycle
            ? {
                amount: sg.recurringAmount,
                currency: sg.recurringCurrency,
                billingCycle: sg.recurringBillingCycle,
                lastPaymentDate: null,
                discount: sg.recurringDiscount
                  ? {
                      originalAmount: sg.recurringDiscount.originalAmount,
                      discountType: sg.recurringDiscount.discountType,
                      discountValue: sg.recurringDiscount.discountValue,
                      source: sg.recurringDiscount.source,
                    }
                  : null,
              }
            : null,
        services: (sg.services || []).map((s) => ({
          id: s.id,
          name: s.name || null,
          description: s.description || null,
          customValue: s.customValue || null,
          facetSelections: (s.facetSelections || []).map((fs) => ({
            id: fs.id,
            facetName: fs.facetName,
            selectedOption: fs.selectedOption,
          })),
          setupCost:
            s.setupAmount && s.setupCurrency
              ? {
                  amount: s.setupAmount,
                  currency: s.setupCurrency,
                  paymentDate: null,
                }
              : null,
          recurringCost:
            s.recurringAmount && s.recurringCurrency && s.recurringBillingCycle
              ? {
                  amount: s.recurringAmount,
                  currency: s.recurringCurrency,
                  billingCycle: s.recurringBillingCycle,
                  lastPaymentDate: null,
                  discount: s.recurringDiscount
                    ? {
                        originalAmount: s.recurringDiscount.originalAmount,
                        discountType: s.recurringDiscount.discountType,
                        discountValue: s.recurringDiscount.discountValue,
                        source: s.recurringDiscount.source,
                      }
                    : null,
                }
              : null,
          metrics: (s.metrics || []).map((m) => ({
            id: m.id,
            name: m.name,
            unitName: m.unitName,
            freeLimit: m.freeLimit || null,
            paidLimit: m.paidLimit || null,
            unitCost:
              m.unitCostAmount && m.unitCostCurrency && m.unitCostBillingCycle
                ? {
                    amount: m.unitCostAmount,
                    currency: m.unitCostCurrency,
                    billingCycle: m.unitCostBillingCycle,
                    lastPaymentDate: null,
                    discount: null,
                  }
                : null,
            currentUsage: m.currentUsage,
            metricType: m.metricType,
            accrualCycle: m.accrualCycle,
            lastAccrualDate: m.lastAccrualDate || null,
          })),
        })),
      }));
    },
    setResourceDocumentOperation(state, action) {
      state.resource = {
        id: action.input.resourceId,
        label: action.input.resourceLabel || null,
        thumbnailUrl: action.input.resourceThumbnailUrl || null,
      };
    },
    activateSubscriptionOperation(state, action) {
      if (state.status !== "PENDING") {
        throw new ActivateNotPendingError(
          `Cannot activate subscription with status ${state.status}`,
        );
      }
      state.status = "ACTIVE";
      state.activatedSince = action.input.activatedSince;

      // Anchor every metric's accrual clock to the activation moment.
      // Without this, the first ACCRUE_METRIC_USAGE call would have to seed
      // `lastAccrualDate` itself, masking the real "first period boundary."
      for (const svc of state.services) {
        for (const metric of svc.metrics) {
          if (!metric.lastAccrualDate) {
            metric.lastAccrualDate = action.input.activatedSince;
          }
        }
      }
      for (const group of state.serviceGroups) {
        for (const svc of group.services) {
          for (const metric of svc.metrics) {
            if (!metric.lastAccrualDate) {
              metric.lastAccrualDate = action.input.activatedSince;
            }
          }
        }
      }

      // D-4, BA-5: Initialize billing state on activation
      state.currentBillingCycleStart = action.input.activatedSince;
      if (state.selectedBillingCycle) {
        state.nextBillingDate = calculateNextBillingDate(
          action.input.activatedSince,
          state.selectedBillingCycle,
        );
      }

      // Aggregates start at zero; appendDebtSlice maintains them per slice.
      state.totalDebt = 0;
      state.totalCredit = 0;
      state.currentCycleOverage = 0;

      // Pre-generated slice IDs are looked up by sourceId. The dispatcher is
      // expected to provide one ID per chargeable source; a missing entry is
      // a dispatcher bug and we fail loudly rather than silently dropping
      // the charge.
      const setupIdMap = new Map<string, string>();
      for (const m of action.input.setupSliceIds) {
        setupIdMap.set(m.sourceId, m.sliceId);
      }
      const recurringIdMap = new Map<string, string>();
      for (const m of action.input.recurringSliceIds) {
        recurringIdMap.set(m.sourceId, m.sliceId);
      }

      function takeSetupId(sourceId: string): string {
        const id = setupIdMap.get(sourceId);
        if (!id) {
          throw new ActivateMissingSliceIdError(
            `No setup slice ID provided for source ${sourceId}`,
          );
        }
        return id;
      }
      function takeRecurringId(sourceId: string): string {
        const id = recurringIdMap.get(sourceId);
        if (!id) {
          throw new ActivateMissingSliceIdError(
            `No recurring slice ID provided for source ${sourceId}`,
          );
        }
        return id;
      }

      const chargedAt = action.input.activatedSince;

      // Groups (setup + recurring), then their nested services, then
      // top-level services. SETUP and SUBSCRIPTION_FEE slices are frozen at
      // creation — they represent a one-time or full-cycle charge with no
      // active accrual semantic.
      for (const group of state.serviceGroups) {
        if (group.setupCost) {
          appendDebtSlice(state, {
            id: takeSetupId(group.id),
            origin: "SETUP",
            status: "CHARGED",
            invoiced: false,
            debitAmount: group.setupCost.amount,
            settledAmount: 0,
            currency: group.setupCost.currency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: null,
            sourceMetricId: null,
            sourceGroupId: group.id,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `Setup fee — group ${group.name}`,
          });
        }
        if (group.recurringCost) {
          appendDebtSlice(state, {
            id: takeRecurringId(group.id),
            origin: "SUBSCRIPTION_FEE",
            status: "CHARGED",
            invoiced: false,
            debitAmount: group.recurringCost.amount,
            settledAmount: 0,
            currency: group.recurringCost.currency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: null,
            sourceMetricId: null,
            sourceGroupId: group.id,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `First-cycle recurring fee — group ${group.name}`,
          });
        }
        for (const svc of group.services) {
          if (svc.setupCost) {
            appendDebtSlice(state, {
              id: takeSetupId(svc.id),
              origin: "SETUP",
              status: "CHARGED",
              invoiced: false,
              debitAmount: svc.setupCost.amount,
              settledAmount: 0,
              currency: svc.setupCost.currency,
              chargedAt,
              invoicedAt: null,
              fullyPaidAt: null,
              sourceServiceId: svc.id,
              sourceMetricId: null,
              sourceGroupId: group.id,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Setup fee — service ${svc.name ?? svc.id}`,
            });
          }
          if (svc.recurringCost) {
            appendDebtSlice(state, {
              id: takeRecurringId(svc.id),
              origin: "SUBSCRIPTION_FEE",
              status: "CHARGED",
              invoiced: false,
              debitAmount: svc.recurringCost.amount,
              settledAmount: 0,
              currency: svc.recurringCost.currency,
              chargedAt,
              invoicedAt: null,
              fullyPaidAt: null,
              sourceServiceId: svc.id,
              sourceMetricId: null,
              sourceGroupId: group.id,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `First-cycle recurring fee — service ${svc.name ?? svc.id}`,
            });
          }
        }
      }
      for (const svc of state.services) {
        if (svc.setupCost) {
          appendDebtSlice(state, {
            id: takeSetupId(svc.id),
            origin: "SETUP",
            status: "CHARGED",
            invoiced: false,
            debitAmount: svc.setupCost.amount,
            settledAmount: 0,
            currency: svc.setupCost.currency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: svc.id,
            sourceMetricId: null,
            sourceGroupId: null,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `Setup fee — service ${svc.name ?? svc.id}`,
          });
        }
        if (svc.recurringCost) {
          appendDebtSlice(state, {
            id: takeRecurringId(svc.id),
            origin: "SUBSCRIPTION_FEE",
            status: "CHARGED",
            invoiced: false,
            debitAmount: svc.recurringCost.amount,
            settledAmount: 0,
            currency: svc.recurringCost.currency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: svc.id,
            sourceMetricId: null,
            sourceGroupId: null,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `First-cycle recurring fee — service ${svc.name ?? svc.id}`,
          });
        }
      }
    },
    pauseSubscriptionOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new PauseNotActiveError(
          `Cannot pause subscription with status ${state.status}`,
        );
      }
      state.status = "PAUSED";
      state.pausedSince = action.input.pausedSince;
    },
    setExpiringOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new SetExpiringNotActiveError(
          `Cannot set expiring on subscription with status ${state.status}`,
        );
      }
      state.status = "EXPIRING";
      state.expiringSince = action.input.expiringSince;
    },
    cancelSubscriptionOperation(state, action) {
      if (state.status === "CANCELLED") {
        throw new CancelAlreadyCancelledError(
          "Subscription is already cancelled",
        );
      }

      // Cancellation refund slice (Q16, resolved 2026-05-05): when an ACTIVE
      // subscription is cancelled mid-cycle, emit one prorated credit slice
      // per chargeable group/standalone-service. Mirror of CHANGE_PLAN's
      // old-tier credit slice. Born FULLY_PAID at emission (credit slices
      // are settled-by-construction). Setup costs are NOT refunded — one-
      // time binary work per spec M-03. DYNAMIC slices not touched —
      // overage debt isn't waived by cancellation; operator handles it
      // through the normal payment flow.
      const wasActive = state.status === "ACTIVE";
      const cycleStart = state.currentBillingCycleStart;
      const cycleEnd = state.nextBillingDate;
      if (
        wasActive &&
        cycleStart &&
        cycleEnd &&
        action.input.cancelledSince > cycleStart &&
        action.input.cancelledSince < cycleEnd
      ) {
        const cycleMs =
          new Date(cycleEnd).getTime() - new Date(cycleStart).getTime();
        const remainingMs =
          new Date(cycleEnd).getTime() -
          new Date(action.input.cancelledSince).getTime();
        const prorataFactor = remainingMs / cycleMs;

        const refundIdMap = new Map<string, string>();
        for (const m of action.input.refundSliceIds) {
          refundIdMap.set(m.sourceId, m.sliceId);
        }
        function takeRefundId(sourceId: string): string {
          const id = refundIdMap.get(sourceId);
          if (!id) {
            throw new CancelMissingSliceIdError(
              `No refund slice ID provided for source ${sourceId}`,
            );
          }
          return id;
        }

        for (const group of state.serviceGroups) {
          if (group.recurringCost) {
            const refundAmount =
              -1 * prorataFactor * group.recurringCost.amount;
            appendDebtSlice(state, {
              id: takeRefundId(group.id),
              origin: "SUBSCRIPTION_FEE",
              status: "FULLY_PAID",
              invoiced: true,
              debitAmount: refundAmount,
              settledAmount: refundAmount,
              currency: group.recurringCost.currency,
              chargedAt: action.input.cancelledSince,
              invoicedAt: action.input.cancelledSince,
              fullyPaidAt: action.input.cancelledSince,
              sourceServiceId: null,
              sourceMetricId: null,
              sourceGroupId: group.id,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Refund — group ${group.name} (cancellation, ${Math.round(prorataFactor * 100)}% unused)`,
            });
          }
        }
        for (const svc of state.services) {
          if (svc.recurringCost) {
            const refundAmount = -1 * prorataFactor * svc.recurringCost.amount;
            appendDebtSlice(state, {
              id: takeRefundId(svc.id),
              origin: "SUBSCRIPTION_FEE",
              status: "FULLY_PAID",
              invoiced: true,
              debitAmount: refundAmount,
              settledAmount: refundAmount,
              currency: svc.recurringCost.currency,
              chargedAt: action.input.cancelledSince,
              invoicedAt: action.input.cancelledSince,
              fullyPaidAt: action.input.cancelledSince,
              sourceServiceId: svc.id,
              sourceMetricId: null,
              sourceGroupId: null,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Refund — service ${svc.name ?? svc.id} (cancellation, ${Math.round(prorataFactor * 100)}% unused)`,
            });
          }
        }
      }

      state.status = "CANCELLED";
      state.cancelledSince = action.input.cancelledSince;
      state.cancellationReason = action.input.cancellationReason || null;
    },
    resumeSubscriptionOperation(state, action) {
      if (state.status !== "PAUSED") {
        throw new ResumeNotPausedError(
          `Cannot resume subscription with status ${state.status}`,
        );
      }
      // D-5: paused days don't accrue. Shift each metric's lastAccrualDate
      // forward by the pause duration so post-resume accruals align with
      // billed time, not wall time.
      const pausedSince = state.pausedSince;
      const resumeAt = action.input.timestamp;
      if (pausedSince && resumeAt > pausedSince) {
        const pauseMs =
          new Date(resumeAt).getTime() - new Date(pausedSince).getTime();
        function shiftMetrics(metrics: (typeof state.services)[0]["metrics"]) {
          for (const metric of metrics) {
            if (metric.lastAccrualDate) {
              const shifted = new Date(
                new Date(metric.lastAccrualDate).getTime() + pauseMs,
              );
              metric.lastAccrualDate = shifted.toISOString();
            }
          }
        }
        for (const svc of state.services) {
          shiftMetrics(svc.metrics);
        }
        for (const group of state.serviceGroups) {
          for (const svc of group.services) {
            shiftMetrics(svc.metrics);
          }
        }
      }
      state.status = "ACTIVE";
      state.pausedSince = null;
    },
    renewExpiringSubscriptionOperation(state, action) {
      if (state.status !== "EXPIRING") {
        throw new RenewNotExpiringError(
          `Cannot renew subscription with status ${state.status}`,
        );
      }
      state.status = "ACTIVE";
      state.expiringSince = null;

      // D-9: Initialize billing state for new cycle.
      // Cycle starts from nextBillingDate (fixed boundaries per D-4).
      const newCycleStart = state.nextBillingDate;
      state.currentBillingCycleStart = state.nextBillingDate;
      if (state.nextBillingDate && state.selectedBillingCycle) {
        state.nextBillingDate = calculateNextBillingDate(
          state.nextBillingDate,
          state.selectedBillingCycle,
        );
      }

      // Per-source SUBSCRIPTION_FEE slices for the new cycle, frozen=true.
      const recurringIdMap = new Map<string, string>();
      for (const m of action.input.recurringSliceIds) {
        recurringIdMap.set(m.sourceId, m.sliceId);
      }
      function takeRecurringId(sourceId: string): string {
        const id = recurringIdMap.get(sourceId);
        if (!id) {
          throw new RenewMissingSliceIdError(
            `No recurring slice ID provided for source ${sourceId}`,
          );
        }
        return id;
      }

      const chargedAt = newCycleStart ?? action.input.timestamp;

      // T-05 (parity with SETTLE_BILLING_CYCLE): manual renewal is also a
      // billing-cycle close. Sweep prior CHARGED slices to INVOICED before
      // emitting the new cycle's recurring fees, so the just-emitted slices
      // aren't accidentally caught by the sweep.
      const renewalCutoff = chargedAt;
      for (const slice of state.debtLineItems) {
        if (slice.status !== "CHARGED") continue;
        if (slice.chargedAt >= renewalCutoff) continue;
        slice.status = "INVOICED";
        slice.invoiced = true;
        slice.invoicedAt = action.input.timestamp;
      }

      for (const group of state.serviceGroups) {
        if (group.recurringCost) {
          appendDebtSlice(state, {
            id: takeRecurringId(group.id),
            origin: "SUBSCRIPTION_FEE",
            status: "CHARGED",
            invoiced: false,
            debitAmount: group.recurringCost.amount,
            settledAmount: 0,
            currency: group.recurringCost.currency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: null,
            sourceMetricId: null,
            sourceGroupId: group.id,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `Recurring fee — group ${group.name} (manual renewal)`,
          });
        }
      }
      for (const svc of state.services) {
        if (svc.recurringCost) {
          appendDebtSlice(state, {
            id: takeRecurringId(svc.id),
            origin: "SUBSCRIPTION_FEE",
            status: "CHARGED",
            invoiced: false,
            debitAmount: svc.recurringCost.amount,
            settledAmount: 0,
            currency: svc.recurringCost.currency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: svc.id,
            sourceMetricId: null,
            sourceGroupId: null,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `Recurring fee — service ${svc.name ?? svc.id} (manual renewal)`,
          });
        }
      }

      // Reset the running tally — preserved through EXPIRING is now closed.
      state.currentCycleOverage = 0;
    },
    updateCustomerInfoOperation(state, action) {
      if (action.input.customerId !== undefined)
        state.customerId = action.input.customerId || null;
      if (action.input.customerName !== undefined)
        state.customerName = action.input.customerName || null;
      if (action.input.customerEmail !== undefined)
        state.customerEmail = action.input.customerEmail || null;
    },
    updateTierInfoOperation(state, action) {
      if (action.input.tierName !== undefined)
        state.tierName = action.input.tierName || null;
      if (action.input.tierPricingOptionId !== undefined)
        state.tierPricingOptionId = action.input.tierPricingOptionId || null;
      if (action.input.tierPrice !== undefined)
        state.tierPrice = action.input.tierPrice || null;
      if (action.input.tierCurrency !== undefined)
        state.tierCurrency = action.input.tierCurrency || null;
      if (action.input.tierPricingMode !== undefined)
        state.tierPricingMode = action.input.tierPricingMode || null;
    },
    setOperatorNotesOperation(state, action) {
      state.operatorNotes = action.input.operatorNotes || null;
    },
    setAutoRenewOperation(state, action) {
      state.autoRenew = action.input.autoRenew;
    },
    generateInvoiceOperation(state, action) {
      // GENERATE_INVOICE replaces SETTLE_BILLING_CYCLE per 2026-05-07
      // stakeholder call. Single operator action that:
      //   1. Force-accrues every metric (closes any open accrual cycle).
      //   2. Sweeps every CHARGED slice to INVOICED, stamping `invoiceRef`
      //      with the operator-provided invoiceId. This is the slice-set
      //      that constitutes "this invoice" — Yasiel's invoice document
      //      model can pull these by filtering `invoiceRef === invoiceId`.
      //   3. If `advanceCycleIfDue` is true AND simulated/actual time has
      //      passed `nextBillingDate` AND `autoRenew` is on: advances the
      //      billing cycle (next-cycle slice emission, carry-over credit
      //      consumption, boundary advance). Otherwise mid-cycle invoice.
      //   4. Throws NoInvoiceableLineItemsError if no slice ended up
      //      stamped with the new invoiceRef (nothing to invoice).
      if (state.status !== "ACTIVE") {
        throw new NoBillingCycleActiveError(
          `Cannot generate invoice when status is ${state.status}`,
        );
      }
      if (
        state.currentBillingCycleStart &&
        action.input.generatedAt < state.currentBillingCycleStart
      ) {
        throw new SettlementDateBeforeCycleStartError(
          "Invoice generation date is before the current billing cycle start",
        );
      }

      // Force-accrue every metric on every invoice run.
      // D-4 late-settlement cap: if generation runs *after* the cycle
      // boundary, overage window does NOT extend past `nextBillingDate`.
      const billingCycle = state.selectedBillingCycle || "MONTHLY";
      const generatedAt = action.input.generatedAt;
      const invoiceId = action.input.invoiceId;
      const pastBillingBoundary =
        state.nextBillingDate != null && generatedAt >= state.nextBillingDate;
      const shouldAdvanceCycle =
        action.input.advanceCycleIfDue === true &&
        pastBillingBoundary &&
        state.autoRenew;
      const effectiveAccrualDate =
        state.nextBillingDate && generatedAt > state.nextBillingDate
          ? state.nextBillingDate
          : generatedAt;

      // Pre-generated metric-freeze slice IDs (used only when no active
      // slice exists for a metric and overage > 0 at force-accrue time).
      const metricFreezeIdMap = new Map<string, string>();
      for (const m of action.input.metricFreezeSliceIds) {
        metricFreezeIdMap.set(m.sourceId, m.sliceId);
      }
      function takeMetricFreezeId(metricId: string): string {
        const id = metricFreezeIdMap.get(metricId);
        if (!id) {
          throw new SettleMissingSliceIdError(
            `No metric-freeze slice ID provided for metric ${metricId}`,
          );
        }
        return id;
      }

      function forceAccrue(metrics: (typeof state.services)[0]["metrics"]) {
        for (const metric of metrics) {
          // Idempotency guard: if ACCRUE_METRIC_USAGE already crystallised
          // this metric at or past the cycle boundary, skip the charge.
          const alreadyAccrued =
            metric.lastAccrualDate != null &&
            metric.lastAccrualDate >= effectiveAccrualDate;
          if (!alreadyAccrued) {
            // Discriminate by accrualPeriodStart, not by "is slice live".
            // A FULLY_PAID slice for this period means the operator already
            // collected for this overage — emitting a fresh frozen slice
            // would double-charge. The right question at force-accrue is:
            // "does ANY slice already represent this period's overage?"
            const periodStart = metric.lastAccrualDate;
            const sliceForPeriod = state.debtLineItems.find(
              (s) =>
                s.origin === "DYNAMIC" &&
                s.sourceMetricId === metric.id &&
                s.accrualPeriodStart === (periodStart ?? null),
            );
            if (sliceForPeriod) {
              // Period already accounted for. If the slice is still live,
              // freeze it so the period is closed cleanly. Otherwise no-op
              // (frozen, paid, partially paid — all already crystallised).
              if (!sliceForPeriod.frozen) {
                freezeDynamicSlice(state, sliceForPeriod);
              }
            } else {
              // No slice for this period yet — emit a fresh frozen slice
              // if the metric has overage to crystallise.
              const cost = calculateOverageCost(metric);
              if (cost > 0) {
                appendDebtSlice(state, {
                  id: takeMetricFreezeId(metric.id),
                  origin: "DYNAMIC",
                  status: "CHARGED",
                  invoiced: false,
                  debitAmount: cost,
                  settledAmount: 0,
                  currency:
                    metric.unitCost?.currency ?? state.globalCurrency ?? "USD",
                  chargedAt: effectiveAccrualDate,
                  invoicedAt: null,
                  fullyPaidAt: null,
                  sourceServiceId: null,
                  sourceMetricId: metric.id,
                  sourceGroupId: null,
                  frozen: true,
                  accrualPeriodStart: metric.lastAccrualDate ?? null,
                  invoiceRef: null,
                  lastPaymentRef: null,
                  description: `Overage — metric ${metric.name} (settlement)`,
                });
              }
            }
            if (metric.metricType === "CUMULATIVE") {
              metric.currentUsage = 0;
            }
          }
          metric.lastAccrualDate = effectiveAccrualDate;
        }
      }

      for (const svc of state.services) {
        forceAccrue(svc.metrics);
      }
      for (const group of state.serviceGroups) {
        for (const svc of group.services) {
          forceAccrue(svc.metrics);
        }
      }

      // T-05: bulk-flip every CHARGED slice from the just-closed cycle to
      // INVOICED, stamping `invoiceRef = invoiceId`. This is what Wouter
      // described at 00:49:05 — "all the depth slices that don't have the
      // flag built yet get flagged as now built."
      //
      // Also stamp invoiceRef on already-INVOICED-but-unstamped slices
      // (e.g. mid-cycle Apply credit auto-flipped CHARGED→INVOICED but
      // didn't have an invoiceId at the time). PARTIALLY_PAID slices that
      // were never associated with a prior invoice ALSO get stamped here
      // so Yasiel's invoice generator sees them as belonging to this run.
      // FULLY_PAID slices are skipped — they're closed business.
      let invoicedCount = 0;
      for (const slice of state.debtLineItems) {
        if (slice.status === "FULLY_PAID") continue;
        if (slice.chargedAt > effectiveAccrualDate) continue;
        if (slice.invoiceRef) continue; // already on a prior invoice
        if (slice.status === "CHARGED") {
          slice.status = "INVOICED";
          slice.invoiced = true;
          slice.invoicedAt = generatedAt;
        }
        slice.invoiceRef = invoiceId;
        invoicedCount += 1;
      }

      if (invoicedCount === 0) {
        throw new NoInvoiceableLineItemsError(
          "No outstanding line items to invoice — every slice is either FULLY_PAID or already on a prior invoice",
        );
      }

      if (shouldAdvanceCycle) {
        // Next-cycle SUBSCRIPTION_FEE slices, frozen=true. Pre-generated IDs
        // keyed by source (group or service) ID.
        const recurringIdMap = new Map<string, string>();
        for (const m of action.input.nextCycleRecurringSliceIds) {
          recurringIdMap.set(m.sourceId, m.sliceId);
        }
        function takeRecurringId(sourceId: string): string {
          const id = recurringIdMap.get(sourceId);
          if (!id) {
            throw new SettleMissingSliceIdError(
              `No next-cycle recurring slice ID for source ${sourceId}`,
            );
          }
          return id;
        }

        // Snapshot the customer's standing credit balance BEFORE we emit
        // next-cycle debt. After emission, totalDebt grows by $2,400+ and
        // any credit surplus would be erased from the live aggregate read.
        // We carry the snapshot forward to consumeCarryOverCredit so the
        // surplus is correctly applied against the new debt.
        const carryOverCreditBalance = getCustomerCreditBalance(state);

        // Cycle boundaries advance per D-4 *before* slice emission, so the
        // chargedAt timestamp is the new cycle start.
        const newCycleStart = state.nextBillingDate ?? generatedAt;
        for (const group of state.serviceGroups) {
          if (group.recurringCost) {
            appendDebtSlice(state, {
              id: takeRecurringId(group.id),
              origin: "SUBSCRIPTION_FEE",
              status: "CHARGED",
              invoiced: false,
              debitAmount: group.recurringCost.amount,
              settledAmount: 0,
              currency: group.recurringCost.currency,
              chargedAt: newCycleStart,
              invoicedAt: null,
              fullyPaidAt: null,
              sourceServiceId: null,
              sourceMetricId: null,
              sourceGroupId: group.id,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Recurring fee — group ${group.name} (cycle renewal)`,
            });
          }
        }
        for (const svc of state.services) {
          if (svc.recurringCost) {
            appendDebtSlice(state, {
              id: takeRecurringId(svc.id),
              origin: "SUBSCRIPTION_FEE",
              status: "CHARGED",
              invoiced: false,
              debitAmount: svc.recurringCost.amount,
              settledAmount: 0,
              currency: svc.recurringCost.currency,
              chargedAt: newCycleStart,
              invoicedAt: null,
              fullyPaidAt: null,
              sourceServiceId: svc.id,
              sourceMetricId: null,
              sourceGroupId: null,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Recurring fee — service ${svc.name ?? svc.id} (cycle renewal)`,
            });
          }
        }
        // Carry-over credit consumption: any standing credit balance
        // (max(0, totalCredit - totalDebt)) gets drawn down against the
        // freshly-emitted next-cycle recurring slices via the FIFO+priority
        // allocator. This is what closes the "credit floats forever" loop —
        // a $290 credit from a mid-cycle group removal is consumed against
        // next year's recurring fee, leaving customerCreditBalance = 0
        // when the new cycle opens.
        consumeCarryOverCredit(state, newCycleStart, carryOverCreditBalance);

        // Advance cycle boundaries (D-4: fixed boundaries)
        state.currentBillingCycleStart = state.nextBillingDate;
        if (state.nextBillingDate) {
          state.nextBillingDate = calculateNextBillingDate(
            state.nextBillingDate,
            billingCycle,
          );
        }
        // Reset running tally — last cycle's dynamic charges are now part
        // of the settled invoice. New cycle starts at zero.
        state.currentCycleOverage = 0;
      } else if (
        action.input.advanceCycleIfDue === true &&
        pastBillingBoundary &&
        !state.autoRenew
      ) {
        // Past the boundary but autoRenew=false: subscription expires on
        // this final invoice. Preserve currentCycleOverage so the operator
        // can still see what's owed for the final cycle.
        state.status = "EXPIRING";
        state.expiringSince = generatedAt;
      }
      // else: mid-cycle invoice generation — no cycle changes, just the
      // sweep + stamp above. Operator can call GENERATE_INVOICE again at
      // a later point with a different invoiceId.
    },
    changePlanOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new ChangePlanNotActiveError(
          `Cannot change plan on subscription with status ${state.status}`,
        );
      }
      if (
        action.input.newBillingCycle &&
        action.input.newBillingCycle !== state.selectedBillingCycle
      ) {
        throw new BillingCycleSwapNotYetSupportedError(
          `Billing-cycle swap from ${state.selectedBillingCycle} to ${action.input.newBillingCycle} not supported in MVP`,
        );
      }
      if (!state.currentBillingCycleStart || !state.nextBillingDate) {
        throw new ChangePlanInvalidEffectiveDateError(
          "Subscription has no current billing cycle window",
        );
      }
      if (
        action.input.effectiveDate < state.currentBillingCycleStart ||
        action.input.effectiveDate > state.nextBillingDate
      ) {
        throw new ChangePlanInvalidEffectiveDateError(
          `effectiveDate ${action.input.effectiveDate} must be within current cycle [${state.currentBillingCycleStart}, ${state.nextBillingDate}]`,
        );
      }
      if (state.tierPrice == null || state.tierPrice <= 0) {
        throw new ChangePlanMissingTierPricingError(
          "Cannot compute proration: state.tierPrice is missing or zero",
        );
      }

      // Proration math.
      const totalDays =
        (new Date(state.nextBillingDate).getTime() -
          new Date(state.currentBillingCycleStart).getTime()) /
        (1000 * 60 * 60 * 24);
      const remainingDays =
        (new Date(state.nextBillingDate).getTime() -
          new Date(action.input.effectiveDate).getTime()) /
        (1000 * 60 * 60 * 24);
      const prorataFactor = totalDays > 0 ? remainingDays / totalDays : 0;
      const oldTierAmount = state.tierPrice;
      const newTierAmount = action.input.newTierPrice;
      const creditAmount = -1 * prorataFactor * oldTierAmount;
      const debitAmount = prorataFactor * newTierAmount;
      const oldTierLabel = state.tierName || "previous tier";
      const newTierLabel = action.input.newTierName || "new tier";
      const defaultCurrency =
        state.tierCurrency || state.globalCurrency || "USD";

      // Emit credit slice (old tier). Credit slices are born FULLY_PAID:
      // the negative debitAmount IS the settlement, no operator workflow
      // applies. See removeServiceGroup for the same pattern.
      state.debtLineItems.push({
        id: action.input.creditLineItemId,
        origin: "SUBSCRIPTION_FEE",
        status: "FULLY_PAID",
        invoiced: true,
        debitAmount: creditAmount,
        settledAmount: 0,
        creditApplied: 0,
        currency: defaultCurrency,
        chargedAt: action.input.effectiveDate,
        invoicedAt: action.input.effectiveDate,
        fullyPaidAt: action.input.effectiveDate,
        sourceServiceId: null,
        sourceMetricId: null,
        sourceGroupId: null,
        frozen: true,
        accrualPeriodStart: null,
        invoiceRef: null,
        lastPaymentRef: null,
        description: `Plan change credit — unused portion of ${oldTierLabel}`,
      });
      state.totalDebt = (state.totalDebt ?? 0) + creditAmount;

      // Emit debit slice (new tier).
      state.debtLineItems.push({
        id: action.input.debitLineItemId,
        origin: "SUBSCRIPTION_FEE",
        status: "CHARGED",
        invoiced: false,
        debitAmount: debitAmount,
        settledAmount: 0,
        creditApplied: 0,
        currency: action.input.newTierCurrency,
        chargedAt: action.input.effectiveDate,
        invoicedAt: null,
        fullyPaidAt: null,
        sourceServiceId: null,
        sourceMetricId: null,
        sourceGroupId: null,
        frozen: true,
        accrualPeriodStart: null,
        invoiceRef: null,
        lastPaymentRef: null,
        description: `Plan change debit — prorated ${newTierLabel}`,
      });
      state.totalDebt = state.totalDebt + debitAmount;

      // Freeze any active (unfrozen) DYNAMIC slices — PC-03.
      for (const slice of state.debtLineItems) {
        if (slice.origin === "DYNAMIC" && !slice.frozen) {
          slice.frozen = true;
          if (
            state.currentBillingCycleStart &&
            slice.chargedAt >= state.currentBillingCycleStart
          ) {
            state.currentCycleOverage =
              (state.currentCycleOverage ?? 0) - slice.debitAmount;
          }
        }
      }

      // Update tier-level state.
      state.tierPricingOptionId = action.input.newTierPricingOptionId;
      state.tierPrice = action.input.newTierPrice;
      state.tierCurrency = action.input.newTierCurrency;
      if (action.input.newTierName) {
        state.tierName = action.input.newTierName;
      }
      // Cycle anchors UNCHANGED per PC-04.
    },
  };
