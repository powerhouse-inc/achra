import type { SnapshotReportAccountsOperations } from "document-models/snapshot-report/v1";
import {
  DuplicateAccountError,
  RemoveAccountNotFoundError,
  UpdateAccountTypeNotFoundError,
} from "../../gen/accounts/error.js";

export const snapshotReportAccountsOperations: SnapshotReportAccountsOperations =
  {
    addSnapshotAccountOperation(state, action) {
      const existingAccount = state.snapshotAccounts.find(
        (a) => a.id === action.input.id,
      );
      if (existingAccount) {
        throw new DuplicateAccountError(
          `Account with ID ${action.input.id} already exists`,
        );
      }

      const newAccount = {
        id: action.input.id,
        accountId: action.input.accountId,
        accountAddress: action.input.accountAddress,
        accountName: action.input.accountName,
        type: action.input.type,
        accountTransactionsId: action.input.accountTransactionsId || null,
        startingBalances: [],
        endingBalances: [],
        transactions: [],
      };

      state.snapshotAccounts.push(newAccount);
    },
    updateSnapshotAccountTypeOperation(state, action) {
      const account = state.snapshotAccounts.find(
        (a) => a.id === action.input.id,
      );
      if (!account) {
        throw new UpdateAccountTypeNotFoundError(
          `Account with ID ${action.input.id} not found`,
        );
      }

      account.type = action.input.type;
    },
    removeSnapshotAccountOperation(state, action) {
      const accountIndex = state.snapshotAccounts.findIndex(
        (a) => a.id === action.input.id,
      );
      if (accountIndex === -1) {
        throw new RemoveAccountNotFoundError(
          `Account with ID ${action.input.id} not found`,
        );
      }

      state.snapshotAccounts.splice(accountIndex, 1);
    },
  };
