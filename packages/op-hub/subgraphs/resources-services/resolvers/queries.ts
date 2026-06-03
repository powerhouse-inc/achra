import type { IReactorClient, IRelationalDb } from "@powerhousedao/reactor";
import type { ResourceTemplateDocument } from "document-models/resource-template";
import type { ServiceOfferingDocument } from "document-models/service-offering";
import type { DocumentDriveDocument } from "@powerhousedao/shared/document-drive";
import type {
  ResourceTemplatesFilter,
  ServiceOfferingsFilter,
  GetBuilderDrivesFilter,
} from "./types.js";
import {
  mapResourceTemplateState,
  mapServiceOfferingState,
} from "./mappers.js";
import { getDeletedDriveDocIds } from "./drive-utils.js";
import {
  DriveOwnershipProcessor,
  DRIVE_OWNERSHIP_NAMESPACE,
} from "processors/drive-ownership";
import {
  getVisibleResourceTemplateIdSet,
  isResourceTemplateVisibleForQuery,
  getResourceTemplateState,
  getResourceTemplateStateMap,
} from "./resource-template-utils.js";
import { getDriveLink } from "./drive-links.js";

export function createQueryResolvers(
  reactorClient: IReactorClient,
  relationalDb: IRelationalDb,
) {
  return {
    resourceTemplates: async (
      _: unknown,
      args: { filter?: ResourceTemplatesFilter },
    ) => {
      const { id, status, operatorId } = args.filter || {};
      const deletedDriveDocIds = await getDeletedDriveDocIds(reactorClient);

      // If filtering by specific id, try to fetch directly
      if (id) {
        try {
          const doc = await reactorClient.get<ResourceTemplateDocument>(id);
          if (
            doc &&
            doc.header.documentType === "powerhouse/resource-template" &&
            !doc.state.document.isDeleted &&
            !deletedDriveDocIds.has(doc.header.id)
          ) {
            const state = doc.state.global;
            if (status && status.length > 0 && !status.includes(state.status)) {
              return [];
            }
            if (operatorId && state.operatorId !== operatorId) {
              return [];
            }
            return [mapResourceTemplateState(state, doc)];
          }
        } catch {
          // Document not found
        }
        return [];
      }

      // Find all resource template documents
      const { results: docs } = await reactorClient.find({
        type: "powerhouse/resource-template",
      });

      const resourceTemplates: ReturnType<typeof mapResourceTemplateState>[] =
        [];

      for (const doc of docs) {
        // Skip docs from soft-deleted drives or soft-deleted documents
        if (deletedDriveDocIds.has(doc.header.id)) continue;
        if (doc.state.document.isDeleted) continue;

        const resourceDoc = doc as ResourceTemplateDocument;
        const state = resourceDoc.state.global;

        // Skip documents missing required fields
        if (!state.operatorId) continue;

        // Apply status filter if provided
        if (status && status.length > 0 && !status.includes(state.status)) {
          continue;
        }

        // Apply operatorId filter if provided
        if (operatorId && state.operatorId !== operatorId) {
          continue;
        }

        resourceTemplates.push(mapResourceTemplateState(state, doc));
      }

      return resourceTemplates;
    },

    serviceOfferings: async (
      _: unknown,
      args: { filter?: ServiceOfferingsFilter },
    ) => {
      const { id, status, operatorId, resourceTemplateId } = args.filter || {};
      const deletedDriveDocIds = await getDeletedDriveDocIds(reactorClient);

      // If filtering by specific id, try to fetch directly
      if (id) {
        try {
          const doc = await reactorClient.get<ServiceOfferingDocument>(id);
          if (
            doc &&
            doc.header.documentType === "powerhouse/service-offering" &&
            !doc.state.document.isDeleted &&
            !deletedDriveDocIds.has(doc.header.id)
          ) {
            const state = doc.state.global;
            if (state.resourceTemplateId) {
              const templateOk = await isResourceTemplateVisibleForQuery(
                reactorClient,
                state.resourceTemplateId,
                deletedDriveDocIds,
              );
              if (!templateOk) {
                return [];
              }
            }
            if (status && status.length > 0 && !status.includes(state.status)) {
              return [];
            }
            if (operatorId && state.operatorId !== operatorId) {
              return [];
            }
            if (
              resourceTemplateId &&
              state.resourceTemplateId !== resourceTemplateId
            ) {
              return [];
            }
            const tplState = await getResourceTemplateState(
              reactorClient,
              state.resourceTemplateId,
            );
            return [mapServiceOfferingState(state, doc, tplState)];
          }
        } catch {
          // Document not found
        }
        return [];
      }

      const visibleTemplateIds = await getVisibleResourceTemplateIdSet(
        reactorClient,
        deletedDriveDocIds,
      );

      // Pre-fetch all resource template states for merging
      const templateStateCache =
        await getResourceTemplateStateMap(reactorClient);

      // Find all service offering documents
      const { results: docs } = await reactorClient.find({
        type: "powerhouse/service-offering",
      });

      const serviceOfferings: ReturnType<typeof mapServiceOfferingState>[] = [];

      for (const doc of docs) {
        // Skip docs from soft-deleted drives or soft-deleted documents
        if (deletedDriveDocIds.has(doc.header.id)) continue;
        if (doc.state.document.isDeleted) continue;

        const offeringDoc = doc as ServiceOfferingDocument;
        const state = offeringDoc.state.global;

        // Skip documents missing required fields
        if (!state.operatorId) continue;

        // Match resourceTemplates: only surface offerings whose template is queryable
        if (
          state.resourceTemplateId &&
          !visibleTemplateIds.has(state.resourceTemplateId)
        ) {
          continue;
        }

        // Apply status filter if provided
        if (status && status.length > 0 && !status.includes(state.status)) {
          continue;
        }

        // Apply operatorId filter if provided
        if (operatorId && state.operatorId !== operatorId) {
          continue;
        }

        // Apply resourceTemplateId filter if provided
        if (
          resourceTemplateId &&
          state.resourceTemplateId !== resourceTemplateId
        ) {
          continue;
        }

        const tplState = state.resourceTemplateId
          ? (templateStateCache.get(state.resourceTemplateId) ?? null)
          : null;
        serviceOfferings.push(mapServiceOfferingState(state, doc, tplState));
      }

      return serviceOfferings;
    },

    getBuilderDrives: async (
      _: unknown,
      args: { filter: GetBuilderDrivesFilter },
    ) => {
      const ethereumAddress = args.filter.ethereumAddress;
      if (!ethereumAddress) return [];
      const target = ethereumAddress.toLowerCase();

      // Indexed lookup. The DriveOwnershipProcessor maintains rs_drive(owner_address,
      // deleted) across ALL drives, so "drives created by X" is one indexed query
      // instead of scanning every drive's full operation log.
      let rows: {
        drive_id: string;
        name: string | null;
        builder_profile_id: string | null;
      }[] = [];
      try {
        rows = await DriveOwnershipProcessor.query(
          DRIVE_OWNERSHIP_NAMESPACE,
          relationalDb,
        )
          .selectFrom("rs_drive")
          .select(["drive_id", "name", "builder_profile_id"])
          .where("owner_address", "=", target)
          .where("deleted", "=", false)
          .execute();
      } catch (error) {
        console.warn("[getBuilderDrives] index query failed:", error);
        return [];
      }

      // Enrich the (few) matches with the live drive for its slug, and
      // re-verify it isn't soft-deleted so the result stays truthful.
      const out: {
        driveId: string;
        driveSlug: string;
        driveName: string;
        driveLink: string;
        builderProfileId: string | null;
      }[] = [];

      for (const row of rows) {
        let driveDoc: DocumentDriveDocument;
        try {
          driveDoc = await reactorClient.get<DocumentDriveDocument>(
            row.drive_id,
          );
        } catch {
          continue; // drive no longer resolvable — skip
        }
        if (driveDoc.state.document.isDeleted) continue;

        const slug = driveDoc.header.slug || row.drive_id;
        out.push({
          driveId: row.drive_id,
          driveSlug: slug,
          driveName: driveDoc.state.global.name || row.name || slug,
          driveLink: getDriveLink(slug),
          builderProfileId: row.builder_profile_id,
        });
      }

      return out;
    },
  };
}
