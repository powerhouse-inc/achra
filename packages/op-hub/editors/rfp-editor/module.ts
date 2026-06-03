/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "powerhouse/rfp" document type */
export const RequestForProposals: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/rfp"],
  config: {
    id: "rfp-editor",
    name: "Request For Proposals",
  },
};
