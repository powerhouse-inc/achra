import type { PHAppConfig } from "@powerhousedao/reactor-browser";

/** Editor config for the <%= pascalCaseDriveEditorName %> */
export const editorConfig: PHAppConfig = {
  isDragAndDropEnabled: true,
  allowedDocumentTypes: [
    "powerhouse/builder-profile",
    "powerhouse/expense-report",
    "powerhouse/snapshot-report",
    "powerhouse/resource-template",
    "powerhouse/service-offering",
    "powerhouse/resource-instance",
    "powerhouse/subscription-instance",
  ],
};
