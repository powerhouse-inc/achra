/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  snapshotReportAccountsActions,
  snapshotReportBalancesActions,
  snapshotReportConfigurationActions,
  snapshotReportTransactionsActions,
} from "./gen/creators.js";

/** Actions for the SnapshotReport document model */

export const actions = {
  ...baseActions,
  ...snapshotReportConfigurationActions,
  ...snapshotReportAccountsActions,
  ...snapshotReportBalancesActions,
  ...snapshotReportTransactionsActions,
};
