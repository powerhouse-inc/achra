/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  paymentTermsClausesActions,
  paymentTermsMilestonesActions,
  paymentTermsTermsActions,
} from "./gen/creators.js";

/** Actions for the PaymentTerms document model */

export const actions = {
  ...baseActions,
  ...paymentTermsTermsActions,
  ...paymentTermsMilestonesActions,
  ...paymentTermsClausesActions,
};
