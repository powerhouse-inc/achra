/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { PaymentAccount } from "../module.js";
import type { PaymentAccountAction, PaymentAccountPHState } from "./types.js";

export const PaymentAccountController = PHDocumentController.forDocumentModel<
  PaymentAccountPHState,
  PaymentAccountAction
>(PaymentAccount);
