/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  billingStatementGeneralActions,
  billingStatementLineItemsActions,
  billingStatementTagsActions,
} from "./gen/creators.js";

/** Actions for the BillingStatement document model */

export const actions = {
  ...baseActions,
  ...billingStatementGeneralActions,
  ...billingStatementLineItemsActions,
  ...billingStatementTagsActions,
};
