import type { IReactorClient } from "@powerhousedao/reactor";
import type { ResourceTemplateDocument } from "document-models/resource-template";

/** Same inclusion rules as `resourceTemplates` query (drive deleted, doc deleted, operatorId). */
export function resourceTemplatePassesQueryFilters(
  doc: ResourceTemplateDocument,
  deletedDriveDocIds: Set<string>,
): boolean {
  if (deletedDriveDocIds.has(doc.header.id)) return false;
  if (doc.state.document.isDeleted) return false;
  if (!doc.state.global.operatorId) return false;
  return true;
}

export async function getVisibleResourceTemplateIdSet(
  reactorClient: IReactorClient,
  deletedDriveDocIds: Set<string>,
): Promise<Set<string>> {
  const { results: docs } = await reactorClient.find({
    type: "powerhouse/resource-template",
  });
  const ids = new Set<string>();
  for (const doc of docs) {
    const rt = doc as ResourceTemplateDocument;
    if (resourceTemplatePassesQueryFilters(rt, deletedDriveDocIds)) {
      ids.add(doc.header.id);
    }
  }
  return ids;
}

export async function isResourceTemplateVisibleForQuery(
  reactorClient: IReactorClient,
  resourceTemplateId: string,
  deletedDriveDocIds: Set<string>,
): Promise<boolean> {
  try {
    const doc =
      await reactorClient.get<ResourceTemplateDocument>(resourceTemplateId);
    if (doc.header.documentType !== "powerhouse/resource-template") {
      return false;
    }
    return resourceTemplatePassesQueryFilters(doc, deletedDriveDocIds);
  } catch {
    return false;
  }
}

/**
 * Fetch a single resource template's global state by ID.
 * Returns null if the document cannot be found.
 */
export async function getResourceTemplateState(
  reactorClient: IReactorClient,
  resourceTemplateId: string | null | undefined,
): Promise<ResourceTemplateDocument["state"]["global"] | null> {
  if (!resourceTemplateId) return null;
  try {
    const doc =
      await reactorClient.get<ResourceTemplateDocument>(resourceTemplateId);
    if (doc.header.documentType !== "powerhouse/resource-template") return null;
    return doc.state.global;
  } catch {
    return null;
  }
}

/**
 * Build a map of all resource template IDs to their global state.
 * Used to enrich service offering responses with live template data.
 */
export async function getResourceTemplateStateMap(
  reactorClient: IReactorClient,
): Promise<Map<string, ResourceTemplateDocument["state"]["global"]>> {
  const { results: docs } = await reactorClient.find({
    type: "powerhouse/resource-template",
  });
  const map = new Map<string, ResourceTemplateDocument["state"]["global"]>();
  for (const doc of docs) {
    const rt = doc as ResourceTemplateDocument;
    map.set(doc.header.id, rt.state.global);
  }
  return map;
}
