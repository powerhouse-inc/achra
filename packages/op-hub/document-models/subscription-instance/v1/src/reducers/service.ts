import type { SubscriptionInstanceServiceOperations } from "document-models/subscription-instance/v1";
import {
  AddServiceFacetSelectionServiceNotFoundError,
  RemoveServiceFacetSelectionServiceNotFoundError,
  RemoveServiceNotFoundError,
  ReportOveragePaymentExceedsDebtError,
  ReportOveragePaymentInvalidAmountError,
  ReportRecurringPaymentAlreadyPaidThisCycleError,
  ReportRecurringPaymentNoCostError,
  ReportRecurringPaymentNothingOwedError,
  ReportRecurringPaymentServiceNotFoundError,
  ReportSetupPaymentAlreadyPaidError,
  ReportSetupPaymentNoCostError,
  ReportSetupPaymentNothingOwedError,
  ReportSetupPaymentServiceNotFoundError,
  SubscriptionNotActiveAddServiceError,
  SubscriptionNotActiveRemoveServiceError,
  UpdateServiceInfoNotFoundError,
  UpdateServiceRecurringCostNotFoundError,
  UpdateServiceSetupCostNotFoundError,
} from "../../gen/service/error.js";

export const subscriptionInstanceServiceOperations: SubscriptionInstanceServiceOperations =
  {
    addServiceOperation(state, action) {
      // D-6: Status guard — PENDING or ACTIVE only
      if (state.status !== "PENDING" && state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveAddServiceError(
          `Cannot add service when status is ${state.status}`,
        );
      }
      const service = {
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
        metrics: [],
      };
      state.services.push(service);
      // No proration — standalone services don't carry pricing at this level.
      // Proration applies at the service GROUP level (D-1 revised).
    },
    removeServiceOperation(state, action) {
      // D-6: Status guard — PENDING or ACTIVE only
      if (state.status !== "PENDING" && state.status !== "ACTIVE") {
        throw new SubscriptionNotActiveRemoveServiceError(
          `Cannot remove service when status is ${state.status}`,
        );
      }
      const index = state.services.findIndex(
        (s) => s.id === action.input.serviceId,
      );
      if (index === -1) {
        throw new RemoveServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      // No proration — standalone services don't carry pricing.
      // Proration applies at the service GROUP level (D-2 revised).
      state.services.splice(index, 1);
    },
    updateServiceSetupCostOperation(state, action) {
      // D-6: Cost updates only in PENDING (setup phase)
      if (state.status !== "PENDING") return;
      const svc = state.services.find((s) => s.id === action.input.serviceId);
      if (!svc) {
        throw new UpdateServiceSetupCostNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      if (action.input.amount && action.input.currency) {
        svc.setupCost = {
          amount: action.input.amount,
          currency: action.input.currency,
          paymentDate: svc.setupCost?.paymentDate ?? null,
        };
      } else if (svc.setupCost) {
        if (action.input.amount) svc.setupCost.amount = action.input.amount;
        if (action.input.currency)
          svc.setupCost.currency = action.input.currency;
      }
    },
    updateServiceRecurringCostOperation(state, action) {
      // D-6: Cost updates only in PENDING (setup phase)
      if (state.status !== "PENDING") return;
      const svc = state.services.find((s) => s.id === action.input.serviceId);
      if (!svc) {
        throw new UpdateServiceRecurringCostNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      if (
        action.input.amount &&
        action.input.currency &&
        action.input.billingCycle
      ) {
        svc.recurringCost = {
          amount: action.input.amount,
          currency: action.input.currency,
          billingCycle: action.input.billingCycle,
          lastPaymentDate: svc.recurringCost?.lastPaymentDate ?? null,
          discount: svc.recurringCost?.discount || null,
        };
      } else if (svc.recurringCost) {
        if (action.input.amount) svc.recurringCost.amount = action.input.amount;
        if (action.input.currency)
          svc.recurringCost.currency = action.input.currency;
        if (action.input.billingCycle)
          svc.recurringCost.billingCycle = action.input.billingCycle;
      }
    },
    updateServiceInfoOperation(state, action) {
      const svc = state.services.find((s) => s.id === action.input.serviceId);
      if (!svc) {
        throw new UpdateServiceInfoNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      if (action.input.name !== undefined) svc.name = action.input.name || null;
      if (action.input.description !== undefined)
        svc.description = action.input.description || null;
      if (action.input.customValue !== undefined)
        svc.customValue = action.input.customValue || null;
    },
    addServiceFacetSelectionOperation(state, action) {
      const svc = state.services.find((s) => s.id === action.input.serviceId);
      if (!svc) {
        throw new AddServiceFacetSelectionServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      svc.facetSelections.push({
        id: action.input.facetSelectionId,
        facetName: action.input.facetName,
        selectedOption: action.input.selectedOption,
      });
    },
    removeServiceFacetSelectionOperation(state, action) {
      const svc = state.services.find((s) => s.id === action.input.serviceId);
      if (!svc) {
        throw new RemoveServiceFacetSelectionServiceNotFoundError(
          `Service with ID ${action.input.serviceId} not found`,
        );
      }
      const index = svc.facetSelections.findIndex(
        (fs) => fs.id === action.input.facetSelectionId,
      );
      if (index !== -1) {
        svc.facetSelections.splice(index, 1);
      }
    },
    reportSetupPaymentOperation(state, action) {
      const currentOwed = (state.totalDebt ?? 0) - (state.totalCredit ?? 0);
      if (currentOwed <= 0) {
        throw new ReportSetupPaymentNothingOwedError(
          "Cannot report payment when nothing is owed",
        );
      }
      function findSvc(serviceId: string) {
        const flat = state.services.find((s) => s.id === serviceId);
        if (flat) return flat;
        for (const group of state.serviceGroups) {
          const grouped = group.services.find((s) => s.id === serviceId);
          if (grouped) return grouped;
        }
        return undefined;
      }
      const svc = findSvc(action.input.serviceId);
      const directGroup = state.serviceGroups.find(
        (g) => g.id === action.input.serviceId,
      );
      if (!svc && !directGroup) {
        throw new ReportSetupPaymentServiceNotFoundError(
          `Service or group with ID ${action.input.serviceId} not found`,
        );
      }
      function findGroup(serviceId: string) {
        for (const group of state.serviceGroups) {
          if (group.services.some((s) => s.id === serviceId)) return group;
        }
        return undefined;
      }
      const targetGroup = directGroup ?? findGroup(action.input.serviceId);
      const setupEntity =
        (svc?.setupCost ? svc : null) ||
        (targetGroup?.setupCost ? targetGroup : null);
      if (!setupEntity || !setupEntity.setupCost) {
        throw new ReportSetupPaymentNoCostError(
          `No setup cost found for ID ${action.input.serviceId}`,
        );
      }
      if (setupEntity.setupCost.paymentDate) {
        throw new ReportSetupPaymentAlreadyPaidError(
          `Setup cost for ID ${action.input.serviceId} is already paid`,
        );
      }
      setupEntity.setupCost.paymentDate = action.input.paymentDate;
      state.totalCredit =
        (state.totalCredit ?? 0) + setupEntity.setupCost.amount;
    },
    reportRecurringPaymentOperation(state, action) {
      const currentOwed = (state.totalDebt ?? 0) - (state.totalCredit ?? 0);
      if (currentOwed <= 0) {
        throw new ReportRecurringPaymentNothingOwedError(
          "Cannot report payment when nothing is owed",
        );
      }
      function findSvc(serviceId: string) {
        const flat = state.services.find((s) => s.id === serviceId);
        if (flat) return flat;
        for (const group of state.serviceGroups) {
          const grouped = group.services.find((s) => s.id === serviceId);
          if (grouped) return grouped;
        }
        return undefined;
      }
      const svc = findSvc(action.input.serviceId);
      const directGroup = state.serviceGroups.find(
        (g) => g.id === action.input.serviceId,
      );
      if (!svc && !directGroup) {
        throw new ReportRecurringPaymentServiceNotFoundError(
          `Service or group with ID ${action.input.serviceId} not found`,
        );
      }
      function findGroup(serviceId: string) {
        for (const group of state.serviceGroups) {
          if (group.services.some((s) => s.id === serviceId)) return group;
        }
        return undefined;
      }
      const targetGroup = directGroup ?? findGroup(action.input.serviceId);
      const recurringEntity =
        (svc?.recurringCost ? svc : null) ||
        (targetGroup?.recurringCost ? targetGroup : null);
      if (!recurringEntity || !recurringEntity.recurringCost) {
        throw new ReportRecurringPaymentNoCostError(
          `No recurring cost found for ID ${action.input.serviceId}`,
        );
      }
      if (
        recurringEntity.recurringCost.lastPaymentDate &&
        state.currentBillingCycleStart &&
        recurringEntity.recurringCost.lastPaymentDate >=
          state.currentBillingCycleStart
      ) {
        throw new ReportRecurringPaymentAlreadyPaidThisCycleError(
          `Recurring cost for ID ${action.input.serviceId} already paid this cycle`,
        );
      }
      recurringEntity.recurringCost.lastPaymentDate = action.input.paymentDate;
      state.totalCredit =
        (state.totalCredit ?? 0) + recurringEntity.recurringCost.amount;
    },
    reportOveragePaymentOperation(state, action) {
      if (action.input.amount <= 0) {
        throw new ReportOveragePaymentInvalidAmountError(
          "Payment amount must be greater than zero",
        );
      }
      const currentOwed = (state.totalDebt ?? 0) - (state.totalCredit ?? 0);
      if (action.input.amount > currentOwed) {
        throw new ReportOveragePaymentExceedsDebtError(
          `Payment amount ${action.input.amount} exceeds outstanding balance ${currentOwed}`,
        );
      }
      state.totalCredit = (state.totalCredit ?? 0) + action.input.amount;
    },
  };
