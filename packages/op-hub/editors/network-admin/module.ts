import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "powerhouse/document-drive" document type */
export const NetworkAdmin: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/document-drive"],
  config: {
    id: "network-admin",
    name: "Network Admin App",
  },
};
