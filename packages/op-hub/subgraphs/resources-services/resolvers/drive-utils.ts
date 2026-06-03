import type { IReactorClient } from "@powerhousedao/reactor";
import type { DocumentDriveDocument } from "@powerhousedao/shared/document-drive";

/**
 * Returns a Set of document IDs that belong to soft-deleted drives.
 * Documents inside a deleted drive should not be returned by queries.
 */
export async function getDeletedDriveDocIds(
  reactorClient: IReactorClient,
): Promise<Set<string>> {
  const { results: drives } = await reactorClient.find({
    type: "powerhouse/document-drive",
  });

  const ids = new Set<string>();
  for (const drive of drives) {
    if (!drive.state.document.isDeleted) continue;
    const driveDoc = drive as DocumentDriveDocument;
    for (const node of driveDoc.state.global.nodes) {
      if (node.kind === "file") {
        ids.add(node.id);
      }
    }
  }
  return ids;
}
