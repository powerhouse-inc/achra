/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "powerhouse/builders" document type */
export const Builders: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/builders"],
  config: {
    id: "builders-editor",
    name: "builders",
  },
};
