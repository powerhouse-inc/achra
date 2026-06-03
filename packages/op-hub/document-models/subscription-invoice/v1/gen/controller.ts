/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { SubscriptionInvoice } from "../module.js";
import type {
  SubscriptionInvoiceAction,
  SubscriptionInvoicePHState,
} from "./types.js";

export const SubscriptionInvoiceController =
  PHDocumentController.forDocumentModel<
    SubscriptionInvoicePHState,
    SubscriptionInvoiceAction
  >(SubscriptionInvoice);
