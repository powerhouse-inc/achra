/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "powerhouse/invoice" document type */
export const Invoice: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/invoice"],
  config: {
    id: "powerhouse-invoice-editor",
    name: "invoice",
  },
};
