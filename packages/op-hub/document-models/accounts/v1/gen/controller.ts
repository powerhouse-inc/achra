/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { Accounts } from "../module.js";
import type { AccountsAction, AccountsPHState } from "./types.js";

export const AccountsController = PHDocumentController.forDocumentModel<
  AccountsPHState,
  AccountsAction
>(Accounts);
