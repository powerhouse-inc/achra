/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  accountTransactionsAccountActions,
  accountTransactionsBudgetsActions,
  accountTransactionsTransactionsActions,
} from "./gen/creators.js";

/** Actions for the AccountTransactions document model */

export const actions = {
  ...baseActions,
  ...accountTransactionsAccountActions,
  ...accountTransactionsTransactionsActions,
  ...accountTransactionsBudgetsActions,
};
