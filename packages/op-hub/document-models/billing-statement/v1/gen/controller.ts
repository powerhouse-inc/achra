/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { BillingStatement } from "../module.js";
import type {
  BillingStatementAction,
  BillingStatementPHState,
} from "./types.js";

export const BillingStatementController = PHDocumentController.forDocumentModel<
  BillingStatementPHState,
  BillingStatementAction
>(BillingStatement);
