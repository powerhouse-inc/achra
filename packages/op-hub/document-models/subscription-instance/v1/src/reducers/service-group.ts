import type { SubscriptionInstanceServiceGroupOperations } from "document-models/subscription-instance/v1";
import {
  AddServiceToGroupGroupNotFoundError,
  RemoveServiceFromGroupGroupNotFoundError,
  RemoveServiceFromGroupServiceNotFoundError,
  RemoveServiceGroupNotFoundError,
  StructuralChangeNotAllowedAddGroupError,
  StructuralChangeNotAllowedRemoveGroupError,
  SubscriptionNotActiveAddToGroupError,
  SubscriptionNotActiveRemoveFromGroupError,
  UpdateServiceGroupCostNotFoundError,
} from "../../gen/service-group/error.js";
import { appendDebtSlice, calculateProratedCost } from "../utils.js";

export const subscriptionInstanceServiceGroupOperations: SubscriptionInstanceServiceGroupOperations =
  {
    addServiceGroupOperation(state, action) {
      // D-6 revised: PENDING or ACTIVE — groups carry pricing, proration applies
      if (state.status !== "PENDING" && state.status !== "ACTIVE") {
        throw new StructuralChangeNotAllowedAddGroupError(
          `Cannot add service group when status is ${state.status}`,
        );
      }
      state.serviceGroups.push({
        id: action.input.groupId,
        name: action.input.name,
        optional: action.input.optional,
        costType: action.input.costType || null,
        setupCost:
          action.input.setupAmount && action.input.setupCurrency
            ? {
                amount: action.input.setupAmount,
                currency: action.input.setupCurrency,
                paymentDate: null,
              }
            : null,
        recurringCost:
          action.input.recurringAmount &&
          action.input.recurringCurrency &&
          action.input.recurringBillingCycle
            ? {
                amount: action.input.recurringAmount,
                currency: action.input.recurringCurrency,
                billingCycle: action.input.recurringBillingCycle,
                lastPaymentDate: null,
                discount: action.input.recurringDiscount
                  ? {
                      originalAmount:
                        action.input.recurringDiscount.originalAmount,
                      discountType: action.input.recurringDiscount.discountType,
                      discountValue:
                        action.input.recurringDiscount.discountValue,
                      source: action.input.recurringDiscount.source,
                    }
                  : null,
              }
            : null,
        services: [],
      });

      // Slice emission only when ACTIVE — PENDING groups get their slices at
      // activation time. D-1: setup hits in full, recurring is prorated to
      // remaining cycle. Both slices frozen=true (one-shot mid-cycle charges,
      // not active accruals).
      if (state.status === "ACTIVE") {
        const chargedAt = action.input.effectiveDate;
        if (action.input.setupAmount && action.input.setupCurrency) {
          appendDebtSlice(state, {
            id: action.input.setupSliceId,
            origin: "SETUP",
            status: "CHARGED",
            invoiced: false,
            debitAmount: action.input.setupAmount,
            settledAmount: 0,
            currency: action.input.setupCurrency,
            chargedAt,
            invoicedAt: null,
            fullyPaidAt: null,
            sourceServiceId: null,
            sourceMetricId: null,
            sourceGroupId: action.input.groupId,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `Setup fee — group ${action.input.name} (mid-cycle add)`,
          });
        }
        if (
          action.input.recurringAmount &&
          action.input.recurringCurrency &&
          state.currentBillingCycleStart &&
          state.nextBillingDate
        ) {
          const proratedCost = calculateProratedCost(
            action.input.recurringAmount,
            state.currentBillingCycleStart,
            state.nextBillingDate,
            action.input.effectiveDate,
          );
          if (proratedCost > 0) {
            appendDebtSlice(state, {
              id: action.input.recurringSliceId,
              origin: "SUBSCRIPTION_FEE",
              status: "CHARGED",
              invoiced: false,
              debitAmount: proratedCost,
              settledAmount: 0,
              currency: action.input.recurringCurrency,
              chargedAt,
              invoicedAt: null,
              fullyPaidAt: null,
              sourceServiceId: null,
              sourceMetricId: null,
              sourceGroupId: action.input.groupId,
              frozen: true,
              accrualPeriodStart: null,
              invoiceRef: null,
              lastPaymentRef: null,
              description: `Prorated recurring fee — group ${action.input.name} (mid-cycle add)`,
            });
          }
        }
      }
    },
    removeServiceGroupOperation(state, action) {
      // D-6 revised: PENDING or ACTIVE — removal creates prorated credit
      if (state.status !== "PENDING" && state.status !== "ACTIVE") {
        throw new StructuralChangeNotAllowedRemoveGroupError(
          `Cannot remove service group when status is ${state.status}`,
        );
      }
      const index = state.serviceGroups.findIndex(
        (g) => g.id === action.input.groupId,
      );
      if (index === -1) {
        throw new RemoveServiceGroupNotFoundError(
          `Service group with ID ${action.input.groupId} not found`,
        );
      }
      const group = state.serviceGroups[index];

      // D-2: Mid-cycle prorated credit on the GROUP's recurring cost.
      // Modeled as a negative-debit SUBSCRIPTION_FEE slice (not totalCredit
      // increment) — matches CHANGE_PLAN's credit pattern. totalCredit is
      // reserved for actual payments (settledAmount).
      if (
        state.status === "ACTIVE" &&
        group.recurringCost &&
        state.currentBillingCycleStart &&
        state.nextBillingDate
      ) {
        const proratedCredit = calculateProratedCost(
          group.recurringCost.amount,
          state.currentBillingCycleStart,
          state.nextBillingDate,
          action.input.effectiveDate,
        );
        if (proratedCredit > 0) {
          // Credit slice (negative debit): records money owed back to the
          // customer or off-set against future charges. Born FULLY_PAID
          // because no operator workflow applies — the negative debit IS
          // the settlement. settledAmount stays at 0 so the
          // `totalCredit = sum(settledAmount)` invariant holds (credits
          // reduce totalDebt, not increase totalCredit).
          appendDebtSlice(state, {
            id: action.input.creditSliceId,
            origin: "SUBSCRIPTION_FEE",
            status: "FULLY_PAID",
            invoiced: true,
            debitAmount: -proratedCredit,
            settledAmount: 0,
            currency: group.recurringCost.currency,
            chargedAt: action.input.effectiveDate,
            invoicedAt: action.input.effectiveDate,
            fullyPaidAt: action.input.effectiveDate,
            sourceServiceId: null,
            sourceMetricId: null,
            sourceGroupId: action.input.groupId,
            frozen: true,
            accrualPeriodStart: null,
            invoiceRef: null,
            lastPaymentRef: null,
            description: `Prorated credit — group ${group.name} removed mid-cycle`,
          });
        }
      }

      state.serviceGroups.splice(index, 1);
    },
    addServiceToGroupOperation(state, action) {
      // D-6: Status guard — PENDING or ACTIVE only
      if (state.status !== "PENDING" && state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveAddToGroupError(
          `Cannot add service to group when status is ${state.status}`,
        );
      }
      const group = state.serviceGroups.find(
        (g) => g.id === action.input.groupId,
      );
      if (!group) {
        throw new AddServiceToGroupGroupNotFoundError(
          `Service group with ID ${action.input.groupId} not found`,
        );
      }
      group.services.push({
        id: action.input.serviceId,
        name: action.input.name || null,
        description: action.input.description || null,
        customValue: action.input.customValue || null,
        facetSelections: [],
        setupCost:
          action.input.setupAmount && action.input.setupCurrency
            ? {
                amount: action.input.setupAmount,
                currency: action.input.setupCurrency,
                paymentDate: null,
              }
            : null,
        recurringCost:
          action.input.recurringAmount &&
          action.input.recurringCurrency &&
          action.input.recurringBillingCycle
            ? {
                amount: action.input.recurringAmount,
                currency: action.input.recurringCurrency,
                billingCycle: action.input.recurringBillingCycle,
                lastPaymentDate: null,
                discount: null,
              }
            : null,
        metrics: [],
      });
      // No proration here — services don't carry pricing, groups do (D-1 revised)
    },
    removeServiceFromGroupOperation(state, action) {
      // D-6: Status guard — PENDING or ACTIVE only
      if (state.status !== "PENDING" && state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveRemoveFromGroupError(
          `Cannot remove service from group when status is ${state.status}`,
        );
      }
      const group = state.serviceGroups.find(
        (g) => g.id === action.input.groupId,
      );
      if (!group) {
        throw new RemoveServiceFromGroupGroupNotFoundError(
          `Service group with ID ${action.input.groupId} not found`,
        );
      }
      const index = group.services.findIndex(
        (s) => s.id === action.input.serviceId,
      );
      if (index === -1) {
        throw new RemoveServiceFromGroupServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found in group ${action.input.groupId}`,
        );
      }
      // No proration here — services don't carry pricing, groups do (D-2 revised)
      group.services.splice(index, 1);
    },
    updateServiceGroupCostOperation(state, action) {
      // D-6: Cost updates only in PENDING (setup phase)
      if (state.status !== "PENDING") return;
      const group = state.serviceGroups.find(
        (g) => g.id === action.input.groupId,
      );
      if (!group) {
        throw new UpdateServiceGroupCostNotFoundError(
          `Service group with ID ${action.input.groupId} not found`,
        );
      }
      if (action.input.setupAmount && action.input.setupCurrency) {
        group.setupCost = {
          amount: action.input.setupAmount,
          currency: action.input.setupCurrency,
          paymentDate: null,
        };
      } else if (group.setupCost) {
        if (action.input.setupAmount)
          group.setupCost.amount = action.input.setupAmount;
        if (action.input.setupCurrency)
          group.setupCost.currency = action.input.setupCurrency;
      }
      if (
        action.input.recurringAmount &&
        action.input.recurringCurrency &&
        action.input.recurringBillingCycle
      ) {
        group.recurringCost = {
          amount: action.input.recurringAmount,
          currency: action.input.recurringCurrency,
          billingCycle: action.input.recurringBillingCycle,
          lastPaymentDate: group.recurringCost?.lastPaymentDate ?? null,
          discount: group.recurringCost?.discount || null,
        };
      } else if (group.recurringCost) {
        if (action.input.recurringAmount)
          group.recurringCost.amount = action.input.recurringAmount;
        if (action.input.recurringCurrency)
          group.recurringCost.currency = action.input.recurringCurrency;
        if (action.input.recurringBillingCycle)
          group.recurringCost.billingCycle = action.input.recurringBillingCycle;
      }
    },
  };
