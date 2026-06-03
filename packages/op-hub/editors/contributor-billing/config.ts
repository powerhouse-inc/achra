import type { PHAppConfig } from "@powerhousedao/reactor-browser";

/** Editor config for the <%= pascalCaseDriveEditorName %> */
export const editorConfig: PHAppConfig = {
  isDragAndDropEnabled: false,
  allowedDocumentTypes: [
    "powerhouse/invoice",
    "powerhouse/billing-statement",
    "powerhouse/expense-report",
    "powerhouse/snapshot-report",
    "powerhouse/accounts",
    "powerhouse/resource-instance",
    "powerhouse/subscription-instance",
  ],
};
