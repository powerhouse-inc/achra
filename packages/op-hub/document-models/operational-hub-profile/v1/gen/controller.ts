/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { OperationalHubProfile } from "../module.js";
import type {
  OperationalHubProfileAction,
  OperationalHubProfilePHState,
} from "./types.js";

export const OperationalHubProfileController =
  PHDocumentController.forDocumentModel<
    OperationalHubProfilePHState,
    OperationalHubProfileAction
  >(OperationalHubProfile);
