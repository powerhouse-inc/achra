/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  serviceOfferingOfferingActions,
  serviceOfferingOptionGroupsActions,
  serviceOfferingServicesActions,
  serviceOfferingTiersActions,
} from "./gen/creators.js";

/** Actions for the ServiceOffering document model */

export const actions = {
  ...baseActions,
  ...serviceOfferingOfferingActions,
  ...serviceOfferingServicesActions,
  ...serviceOfferingTiersActions,
  ...serviceOfferingOptionGroupsActions,
};
