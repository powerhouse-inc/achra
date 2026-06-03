import { useMemo } from "react";
import {
  addFolder,
  useDrives,
  useDriveById,
} from "@powerhousedao/reactor-browser";
import { addFile } from "@powerhousedao/shared/document-drive";
import { useSelectedSnapshotReportDocument } from "../../hooks/useSnapshotReportDocument.js";
import type { SnapshotReportDocument } from "../../../document-models/snapshot-report/v1/gen/types.js";

export function useAddReportToRemoteDrive(ownerIdOverride?: string | null) {
  const [selectedDocument] = useSelectedSnapshotReportDocument();
  const drives = useDrives();
  const ownerId =
    ownerIdOverride ?? selectedDocument?.state?.global?.ownerIds?.[0] ?? "";

  const ownerDrive = useMemo(() => {
    if (!drives || !ownerId) return undefined;
    return drives.find((drive) => {
      if (
        drive.header.documentType !== "powerhouse/document-drive" ||
        drive.header.meta?.preferredEditor !== "builder-team-admin"
      ) {
        return false;
      }
      return (drive.state.global.nodes ?? []).some(
        (node) =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/builder-profile" &&
          node.id === ownerId,
      );
    });
  }, [drives, ownerId]);

  const ownerDriveId = ownerDrive?.header.id;

  return {
    ownerDriveId,
    ownerId,
    selectedDocument,
  };
}

export function useOwnerDriveActions(
  ownerDriveId: string,
  selectedDocument: SnapshotReportDocument | undefined,
) {
  const [driveDocument, dispatch] = useDriveById(ownerDriveId);
  const driveDocumentId = driveDocument?.header?.id;
  const isDriveAligned = Boolean(
    ownerDriveId && driveDocumentId === ownerDriveId,
  );

  const snapshotReportFolderId = useMemo(() => {
    if (!isDriveAligned) return undefined;
    return driveDocument?.state?.global?.nodes?.find(
      (node) => node.kind === "folder" && node.name === "Snapshot Reports",
    )?.id;
  }, [driveDocument, isDriveAligned]);

  const snapshotReportNodeIds = useMemo(() => {
    if (!isDriveAligned || !driveDocument?.state?.global?.nodes) return [];
    return driveDocument.state.global.nodes
      .filter(
        (node) =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/snapshot-report",
      )
      .map((node) => node.id);
  }, [driveDocument, isDriveAligned]);

  const canAddReportToOwnerDrive = Boolean(
    isDriveAligned && selectedDocument?.header?.id,
  );

  const addReportToOwnerDrive: () => Promise<boolean> = async () => {
    if (
      !dispatch ||
      !isDriveAligned ||
      !canAddReportToOwnerDrive ||
      !selectedDocument?.header?.id
    )
      return false;
    let targetFolderId = snapshotReportFolderId;
    if (!targetFolderId) {
      const newFolder = await addFolder(ownerDriveId, "Snapshot Reports");
      targetFolderId = newFolder?.id;
    }
    if (!targetFolderId) return false;
    dispatch(
      addFile({
        name: selectedDocument.header.name,
        documentType: "powerhouse/snapshot-report",
        id: selectedDocument.header.id,
        parentFolder: targetFolderId,
      }),
    );
    return true;
  };

  return {
    addReportToOwnerDrive,
    canAddReportToOwnerDrive,
    snapshotReportNodeIds,
    driveDocumentId,
  };
}
