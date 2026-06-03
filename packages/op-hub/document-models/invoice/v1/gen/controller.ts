/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { Invoice } from "../module.js";
import type { InvoiceAction, InvoicePHState } from "./types.js";

export const InvoiceController = PHDocumentController.forDocumentModel<
  InvoicePHState,
  InvoiceAction
>(Invoice);
