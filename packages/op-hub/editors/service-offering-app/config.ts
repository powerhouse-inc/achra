import type { PHAppConfig } from "@powerhousedao/reactor-browser";

export const editorConfig: PHAppConfig = {
  isDragAndDropEnabled: true,
  allowedDocumentTypes: [
    "powerhouse/service-offering",
    "powerhouse/resource-template",
    "powerhouse/subscription-instance",
    "powerhouse/subscription-invoice",
    "powerhouse/resource-instance",
    "powerhouse/facet",
  ],
};
