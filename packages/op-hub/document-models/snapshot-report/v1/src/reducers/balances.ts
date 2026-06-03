import type { SnapshotReportBalancesOperations } from "document-models/snapshot-report/v1";
import {
  RemoveEndingBalanceNotFoundError,
  RemoveStartingBalanceNotFoundError,
  SetEndingBalanceAccountNotFoundError,
  SetStartingBalanceAccountNotFoundError,
} from "../../gen/balances/error.js";

export const snapshotReportBalancesOperations: SnapshotReportBalancesOperations =
  {
    setStartingBalanceOperation(state, action) {
      const account = state.snapshotAccounts.find(
        (a) => a.id === action.input.accountId,
      );
      if (!account) {
        throw new SetStartingBalanceAccountNotFoundError(
          `Account with ID ${action.input.accountId} not found`,
        );
      }

      const existingBalance = account.startingBalances.find(
        (b) => b.id === action.input.balanceId,
      );
      if (existingBalance) {
        existingBalance.token = action.input.token;
        existingBalance.amount = action.input.amount;
      } else {
        account.startingBalances.push({
          id: action.input.balanceId,
          token: action.input.token,
          amount: action.input.amount,
        });
      }
    },
    setEndingBalanceOperation(state, action) {
      const account = state.snapshotAccounts.find(
        (a) => a.id === action.input.accountId,
      );
      if (!account) {
        throw new SetEndingBalanceAccountNotFoundError(
          `Account with ID ${action.input.accountId} not found`,
        );
      }

      const existingBalance = account.endingBalances.find(
        (b) => b.id === action.input.balanceId,
      );
      if (existingBalance) {
        existingBalance.token = action.input.token;
        existingBalance.amount = action.input.amount;
      } else {
        account.endingBalances.push({
          id: action.input.balanceId,
          token: action.input.token,
          amount: action.input.amount,
        });
      }
    },
    removeStartingBalanceOperation(state, action) {
      const account = state.snapshotAccounts.find(
        (a) => a.id === action.input.accountId,
      );
      if (!account) {
        throw new SetStartingBalanceAccountNotFoundError(
          `Account with ID ${action.input.accountId} not found`,
        );
      }

      const balanceIndex = account.startingBalances.findIndex(
        (b) => b.id === action.input.balanceId,
      );
      if (balanceIndex === -1) {
        throw new RemoveStartingBalanceNotFoundError(
          `Balance with ID ${action.input.balanceId} not found`,
        );
      }

      account.startingBalances.splice(balanceIndex, 1);
    },
    removeEndingBalanceOperation(state, action) {
      const account = state.snapshotAccounts.find(
        (a) => a.id === action.input.accountId,
      );
      if (!account) {
        throw new SetEndingBalanceAccountNotFoundError(
          `Account with ID ${action.input.accountId} not found`,
        );
      }

      const balanceIndex = account.endingBalances.findIndex(
        (b) => b.id === action.input.balanceId,
      );
      if (balanceIndex === -1) {
        throw new RemoveEndingBalanceNotFoundError(
          `Balance with ID ${action.input.balanceId} not found`,
        );
      }

      account.endingBalances.splice(balanceIndex, 1);
    },
  };
