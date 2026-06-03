import type { PHAppConfig } from "@powerhousedao/reactor-browser";

export const editorConfig: PHAppConfig = {
  isDragAndDropEnabled: true,
  allowedDocumentTypes: [
    // List all document types that can be dropped
    "powerhouse/network-profile",
    "powerhouse/workstream",
    "powerhouse/scopeofwork",
    "payment-terms",
    "powerhouse/rfp",
    "powerhouse/builders",
  ],
};
