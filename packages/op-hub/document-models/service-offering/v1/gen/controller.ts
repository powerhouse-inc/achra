/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { ServiceOffering } from "../module.js";
import type { ServiceOfferingAction, ServiceOfferingPHState } from "./types.js";

export const ServiceOfferingController = PHDocumentController.forDocumentModel<
  ServiceOfferingPHState,
  ServiceOfferingAction
>(ServiceOffering);
