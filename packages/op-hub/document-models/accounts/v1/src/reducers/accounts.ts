import type { AccountsAccountsOperations } from "document-models/accounts/v1";

export const accountsAccountsOperations: AccountsAccountsOperations = {
  addAccountOperation(state, action) {
    state.accounts.push({
      id: action.input.id,
      account: action.input.account,
      name: action.input.name,
      budgetPath: action.input.budgetPath || null,
      accountTransactionsId: action.input.accountTransactionsId || null,
      chain: action.input.chain || null,
      type: action.input.type,
      owners: action.input.owners || null,
      KycAmlStatus: action.input.KycAmlStatus || "PENDING",
    });
  },
  updateAccountOperation(state, action) {
    const account = state.accounts.find(
      (account) => account.id === action.input.id,
    );
    if (!account) {
      throw new Error(`Account with id ${action.input.id} not found`);
    }
    if (action.input.account) account.account = action.input.account;
    if (action.input.name) account.name = action.input.name;
    if (action.input.budgetPath) account.budgetPath = action.input.budgetPath;
    if (action.input.accountTransactionsId)
      account.accountTransactionsId = action.input.accountTransactionsId;
    if (action.input.chain) account.chain = action.input.chain;
    if (action.input.type) account.type = action.input.type;
    if (action.input.owners) account.owners = action.input.owners;
    if (action.input.KycAmlStatus)
      account.KycAmlStatus = action.input.KycAmlStatus;
  },
  deleteAccountOperation(state, action) {
    state.accounts = state.accounts.filter(
      (account) => account.id !== action.input.id,
    );
  },
  updateKycStatusOperation(state, action) {
    const account = state.accounts.find(
      (account) => account.id === action.input.id,
    );
    if (!account) {
      throw new Error(`Account with id ${action.input.id} not found`);
    }
    account.KycAmlStatus = action.input.KycAmlStatus || "PENDING";
  },
};
