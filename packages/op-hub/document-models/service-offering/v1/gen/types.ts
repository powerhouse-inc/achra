/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { ServiceOfferingAction } from "./actions.js";
import type { ServiceOfferingState as ServiceOfferingGlobalState } from "./schema/types.js";

type ServiceOfferingLocalState = Record<PropertyKey, never>;

type ServiceOfferingPHState = PHBaseState & {
  global: ServiceOfferingGlobalState;
  local: ServiceOfferingLocalState;
};
type ServiceOfferingDocument = PHDocument<ServiceOfferingPHState>;

export * from "./schema/types.js";

export type {
  ServiceOfferingAction,
  ServiceOfferingDocument,
  ServiceOfferingGlobalState,
  ServiceOfferingLocalState,
  ServiceOfferingPHState,
};
