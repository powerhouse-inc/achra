import type { AccountTransactionsBudgetsOperations } from "document-models/account-transactions/v1";

export const accountTransactionsBudgetsOperations: AccountTransactionsBudgetsOperations =
  {
    addBudgetOperation(state, action) {
      state.budgets.push({
        id: action.input.id,
        name: action.input.name || null,
      });
    },
    updateBudgetOperation(state, action) {
      const budget = state.budgets.find(
        (budget) => budget.id === action.input.id,
      );
      if (!budget) {
        throw new Error(`Budget with id ${action.input.id} not found`);
      }
      if (action.input.name !== undefined && action.input.name !== null) {
        budget.name = action.input.name;
      }
    },
    deleteBudgetOperation(state, action) {
      state.budgets = state.budgets.filter(
        (budget) => budget.id !== action.input.id,
      );
    },
  };
