/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "powerhouse/resource-template" document type */
export const ResourceTemplateEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/resource-template"],
  config: {
    id: "resource-template-editor",
    name: "Resource Template Editor",
  },
};
