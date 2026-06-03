/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { InvoiceGeneralAction } from "./general/actions.js";
import type { InvoiceItemsAction } from "./items/actions.js";
import type { InvoicePartiesAction } from "./parties/actions.js";
import type { InvoiceTransitionsAction } from "./transitions/actions.js";

export * from "./general/actions.js";
export * from "./items/actions.js";
export * from "./parties/actions.js";
export * from "./transitions/actions.js";

export type InvoiceAction =
  | InvoiceGeneralAction
  | InvoicePartiesAction
  | InvoiceItemsAction
  | InvoiceTransitionsAction;
