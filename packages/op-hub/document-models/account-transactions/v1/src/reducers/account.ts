import type { AccountTransactionsAccountOperations } from "document-models/account-transactions/v1";

export const accountTransactionsAccountOperations: AccountTransactionsAccountOperations =
  {
    setAccountOperation(state, action) {
      state.account.account = action.input.account;
      state.account.name = action.input.name;
      state.account.budgetPath = action.input.budgetPath || null;
      state.account.accountTransactionsId =
        action.input.accountTransactionsId || null;
      state.account.chain = action.input.chain || null;
      state.account.type = action.input.type || null;
      state.account.owners = action.input.owners || null;
      state.account.KycAmlStatus = action.input.KycAmlStatus || null;
    },
  };
