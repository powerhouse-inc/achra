import type { TemplateStatus } from "document-models/resource-template";
import type { ServiceStatus } from "document-models/service-offering";

// Filter types
export interface ResourceTemplatesFilter {
  id?: string;
  status?: TemplateStatus[];
  operatorId?: string;
}

export interface ServiceOfferingsFilter {
  id?: string;
  status?: ServiceStatus[];
  operatorId?: string;
  resourceTemplateId?: string;
}

export interface GetBuilderDrivesFilter {
  ethereumAddress: string;
}
