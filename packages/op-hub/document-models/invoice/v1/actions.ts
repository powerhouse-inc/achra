/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  invoiceGeneralActions,
  invoiceItemsActions,
  invoicePartiesActions,
  invoiceTransitionsActions,
} from "./gen/creators.js";

/** Actions for the Invoice document model */

export const actions = {
  ...baseActions,
  ...invoiceGeneralActions,
  ...invoicePartiesActions,
  ...invoiceItemsActions,
  ...invoiceTransitionsActions,
};
