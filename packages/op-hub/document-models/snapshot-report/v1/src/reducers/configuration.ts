import type { SnapshotReportConfigurationOperations } from "document-models/snapshot-report/v1";

export const snapshotReportConfigurationOperations: SnapshotReportConfigurationOperations =
  {
    setReportConfigOperation(state, action) {
      if (
        action.input.reportName !== undefined &&
        action.input.reportName !== null
      ) {
        state.reportName = action.input.reportName;
      }
      if (
        action.input.startDate !== undefined &&
        action.input.startDate !== null
      ) {
        state.startDate = action.input.startDate;
      }
      if (action.input.endDate !== undefined && action.input.endDate !== null) {
        state.endDate = action.input.endDate;
      }
      if (
        action.input.accountsDocumentId !== undefined &&
        action.input.accountsDocumentId !== null
      ) {
        state.accountsDocumentId = action.input.accountsDocumentId;
      }
    },
    setAccountsDocumentOperation(state, action) {
      state.accountsDocumentId = action.input.accountsDocumentId;
    },
    setPeriodOperation(state, action) {
      state.startDate = action.input.startDate;
      state.endDate = action.input.endDate;
    },
    addOwnerIdOperation(state, action) {
      if (!state.ownerIds.includes(action.input.ownerId)) {
        state.ownerIds.push(action.input.ownerId);
      }
    },
    setPeriodStartOperation(state, action) {
      state.reportPeriodStart = action.input.periodStart;
    },
    setPeriodEndOperation(state, action) {
      state.reportPeriodEnd = action.input.periodEnd;
    },
    removeOwnerIdOperation(state, action) {
      const index = state.ownerIds.indexOf(action.input.ownerId);
      if (index !== -1) {
        state.ownerIds.splice(index, 1);
      }
    },
  };
