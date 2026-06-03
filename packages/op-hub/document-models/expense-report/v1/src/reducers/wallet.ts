import type { ExpenseReportWalletOperations } from "document-models/expense-report/v1";

type GroupTotalsDelta = {
  totalBudget: number;
  totalForecast: number;
  totalActuals: number;
  totalPayments: number;
};

function getLineItemTotals(lineItem: {
  budget?: number | null;
  actuals?: number | null;
  forecast?: number | null;
  payments?: number | null;
}): GroupTotalsDelta {
  return {
    totalBudget: lineItem.budget ?? 0,
    totalForecast: lineItem.forecast ?? 0,
    totalActuals: lineItem.actuals ?? 0,
    totalPayments: lineItem.payments ?? 0,
  };
}

function applyTotalsDelta(
  wallet: {
    totals?: Array<
      | {
          group?: string | null;
          totalBudget?: number | null;
          totalForecast?: number | null;
          totalActuals?: number | null;
          totalPayments?: number | null;
        }
      | null
      | undefined
    > | null;
  },
  groupId: string | null | undefined,
  delta: GroupTotalsDelta,
) {
  if (!groupId) {
    return;
  }
  if (!wallet.totals) {
    wallet.totals = [];
  }
  const existing = wallet.totals.find((t) => t && t.group === groupId) || null;
  if (existing) {
    existing.totalBudget = (existing.totalBudget ?? 0) + delta.totalBudget;
    existing.totalForecast =
      (existing.totalForecast ?? 0) + delta.totalForecast;
    existing.totalActuals = (existing.totalActuals ?? 0) + delta.totalActuals;
    existing.totalPayments =
      (existing.totalPayments ?? 0) + delta.totalPayments;
  } else {
    wallet.totals.push({
      group: groupId,
      totalBudget: delta.totalBudget,
      totalForecast: delta.totalForecast,
      totalActuals: delta.totalActuals,
      totalPayments: delta.totalPayments,
    });
  }
}

export const expenseReportWalletOperations: ExpenseReportWalletOperations = {
  addWalletOperation(state, action) {
    const newWallet = {
      name: action.input.name ?? null,
      wallet: action.input.wallet,
      totals: [],
      billingStatements: [],
      lineItems: [],
      accountDocumentId: null,
      accountTransactionsDocumentId: null,
    };
    state.wallets.push(newWallet);
  },

  removeWalletOperation(state, action) {
    const index = state.wallets.findIndex(
      (w) => w.wallet === action.input.wallet,
    );
    if (index !== -1) {
      state.wallets.splice(index, 1);
    }
  },

  addBillingStatementOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet) {
      if (!wallet.billingStatements) {
        wallet.billingStatements = [];
      }
      wallet.billingStatements.push(action.input.billingStatementId);
    }
  },

  removeBillingStatementOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.billingStatements) {
      const index = wallet.billingStatements.indexOf(
        action.input.billingStatementId,
      );
      if (index !== -1) {
        wallet.billingStatements.splice(index, 1);
      }
    }
  },

  addLineItemOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet) {
      if (!wallet.lineItems) {
        wallet.lineItems = [];
      }
      const lineItem = {
        id: action.input.lineItem.id,
        label: action.input.lineItem.label ?? null,
        group: action.input.lineItem.group ?? null,
        budget: action.input.lineItem.budget ?? null,
        actuals: action.input.lineItem.actuals ?? null,
        forecast: action.input.lineItem.forecast ?? null,
        payments: action.input.lineItem.payments ?? null,
        comments: action.input.lineItem.comments ?? null,
      };
      wallet.lineItems.push(lineItem);
      applyTotalsDelta(wallet, lineItem.group, getLineItemTotals(lineItem));
    }
  },

  updateLineItemOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.lineItems) {
      const lineItem = wallet.lineItems.find(
        (item) => item && item.id === action.input.lineItemId,
      );
      if (lineItem) {
        const previousGroup = lineItem.group ?? null;
        const previousTotals = getLineItemTotals(lineItem);
        let nextGroup = previousGroup;
        const nextTotals = { ...previousTotals };
        if (action.input.label !== undefined && action.input.label !== null) {
          lineItem.label = action.input.label;
        }
        if (action.input.group !== undefined && action.input.group !== null) {
          lineItem.group = action.input.group;
          nextGroup = action.input.group;
        }
        if (action.input.budget !== undefined && action.input.budget !== null) {
          lineItem.budget = action.input.budget;
          nextTotals.totalBudget = action.input.budget;
        }
        if (
          action.input.actuals !== undefined &&
          action.input.actuals !== null
        ) {
          lineItem.actuals = action.input.actuals;
          nextTotals.totalActuals = action.input.actuals;
        }
        if (
          action.input.forecast !== undefined &&
          action.input.forecast !== null
        ) {
          lineItem.forecast = action.input.forecast;
          nextTotals.totalForecast = action.input.forecast;
        }
        if (action.input.payments !== undefined) {
          lineItem.payments = action.input.payments ?? null;
          nextTotals.totalPayments = action.input.payments ?? 0;
        }
        if (
          action.input.comments !== undefined &&
          action.input.comments !== null
        ) {
          lineItem.comments = action.input.comments;
        }
        if (previousGroup === nextGroup) {
          applyTotalsDelta(wallet, nextGroup, {
            totalBudget: nextTotals.totalBudget - previousTotals.totalBudget,
            totalForecast:
              nextTotals.totalForecast - previousTotals.totalForecast,
            totalActuals: nextTotals.totalActuals - previousTotals.totalActuals,
            totalPayments:
              nextTotals.totalPayments - previousTotals.totalPayments,
          });
        } else {
          applyTotalsDelta(wallet, previousGroup, {
            totalBudget: -previousTotals.totalBudget,
            totalForecast: -previousTotals.totalForecast,
            totalActuals: -previousTotals.totalActuals,
            totalPayments: -previousTotals.totalPayments,
          });
          applyTotalsDelta(wallet, nextGroup, nextTotals);
        }
      }
    }
  },

  removeLineItemOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.lineItems) {
      const index = wallet.lineItems.findIndex(
        (item) => item && item.id === action.input.lineItemId,
      );
      if (index !== -1) {
        wallet.lineItems.splice(index, 1);
      }
    }
  },

  addLineItemGroupOperation(state, action) {
    const newGroup = {
      id: action.input.id,
      label: action.input.label || null,
      parentId: action.input.parentId || null,
    };
    state.groups.push(newGroup);
  },

  updateLineItemGroupOperation(state, action) {
    const group = state.groups.find((g) => g.id === action.input.id);
    if (group) {
      if (action.input.label !== undefined && action.input.label !== null) {
        group.label = action.input.label;
      }
      if (
        action.input.parentId !== undefined &&
        action.input.parentId !== null
      ) {
        group.parentId = action.input.parentId;
      }
    }
  },

  removeLineItemGroupOperation(state, action) {
    const index = state.groups.findIndex((g) => g.id === action.input.id);
    if (index !== -1) {
      state.groups.splice(index, 1);
    }
  },

  setGroupTotalsOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet) {
      if (!wallet.totals) {
        wallet.totals = [];
      }

      const existingIndex = wallet.totals.findIndex(
        (t) => t && t.group === action.input.groupTotals.group,
      );

      const totals = {
        group: action.input.groupTotals.group,
        totalBudget: action.input.groupTotals.totalBudget || null,
        totalForecast: action.input.groupTotals.totalForecast || null,
        totalActuals: action.input.groupTotals.totalActuals || null,
        totalPayments: action.input.groupTotals.totalPayments || null,
      };

      if (existingIndex !== -1) {
        wallet.totals[existingIndex] = totals;
      } else {
        wallet.totals.push(totals);
      }
    }
  },

  removeGroupTotalsOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.wallet);
    if (wallet && wallet.totals) {
      const index = wallet.totals.findIndex(
        (t) => t && t.group === action.input.groupId,
      );
      if (index !== -1) {
        wallet.totals.splice(index, 1);
      }
    }
  },

  setPeriodStartOperation(state, action) {
    state.periodStart = action.input.periodStart;
  },

  setPeriodEndOperation(state, action) {
    state.periodEnd = action.input.periodEnd;
  },

  updateWalletOperation(state, action) {
    const wallet = state.wallets.find((w) => w.wallet === action.input.address);
    if (wallet) {
      if (action.input.name !== undefined && action.input.name !== null) {
        wallet.name = action.input.name;
      }
      if (
        action.input.accountDocumentId !== undefined &&
        action.input.accountDocumentId !== null
      ) {
        wallet.accountDocumentId = action.input.accountDocumentId;
      }
      if (
        action.input.accountTransactionsDocumentId !== undefined &&
        action.input.accountTransactionsDocumentId !== null
      ) {
        wallet.accountTransactionsDocumentId =
          action.input.accountTransactionsDocumentId;
      }
    }
  },

  setOwnerIdOperation(state, action) {
    state.ownerId = action.input.ownerId;
  },

  setStatusOperation(state, action) {
    state.status = action.input.status;
  },

  setPeriodOperation(state, action) {
    if (
      action.input.startDate !== undefined &&
      action.input.startDate !== null
    ) {
      state.startDate = action.input.startDate;
    }
    if (action.input.endDate !== undefined && action.input.endDate !== null) {
      state.endDate = action.input.endDate;
    }
  },
};
