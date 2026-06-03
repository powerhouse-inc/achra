/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { AccountTransactions } from "../module.js";
import type {
  AccountTransactionsAction,
  AccountTransactionsPHState,
} from "./types.js";

export const AccountTransactionsController =
  PHDocumentController.forDocumentModel<
    AccountTransactionsPHState,
    AccountTransactionsAction
  >(AccountTransactions);
