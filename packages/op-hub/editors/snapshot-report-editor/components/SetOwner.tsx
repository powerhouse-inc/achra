import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDrives, useGetDocuments } from "@powerhousedao/reactor-browser";
import type { PHDocument } from "document-model";
import {
  addOwnerId,
  removeOwnerId,
} from "../../../document-models/snapshot-report/v1/gen/configuration/creators.js";
import type { SnapshotReportDocument } from "../../../document-models/snapshot-report/v1/gen/types.js";
import {
  useAddReportToRemoteDrive,
  useOwnerDriveActions,
} from "./AddReportToRemoteDrive.js";

type BuilderProfileOption = {
  id: string;
  name: string;
  driveId: string;
};

type SetOwnerProps = {
  ownerIds: string[];
  dispatch: (
    action: ReturnType<typeof addOwnerId> | ReturnType<typeof removeOwnerId>,
  ) => void;
};

export function SetOwner({ ownerIds, dispatch }: SetOwnerProps) {
  const drives = useDrives();
  const [query, setQuery] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const getDocuments = useGetDocuments();

  // Collect builder profile node IDs from drives
  const localProfileNodes = useMemo(() => {
    if (!drives) return [];
    return drives
      .filter(
        (drive) =>
          drive.header.documentType === "powerhouse/document-drive" &&
          drive.header.meta?.preferredEditor === "builder-team-admin",
      )
      .flatMap((drive) =>
        (drive.state.global.nodes ?? [])
          .filter(
            (node) =>
              node.kind === "file" &&
              "documentType" in node &&
              node.documentType === "powerhouse/builder-profile",
          )
          .map((node) => ({
            id: node.id,
            name: node.name || "Untitled builder",
            driveId: drive.header.id,
          })),
      );
  }, [drives]);

  const localProfilePhids = useMemo(
    () => localProfileNodes.map((node) => node.id),
    [localProfileNodes],
  );

  // Fetch actual builder profile documents to get state (name, etc.)
  const [localProfileDocuments, setLocalProfileDocuments] = useState<
    PHDocument[]
  >([]);

  useEffect(() => {
    if (localProfilePhids.length === 0) {
      setLocalProfileDocuments([]);
      return;
    }

    getDocuments(localProfilePhids)
      .then((docs) => {
        setLocalProfileDocuments(docs);
      })
      .catch((error) => {
        console.error("Failed to fetch builder profile documents:", error);
        setLocalProfileDocuments([]);
      });
  }, [localProfilePhids, getDocuments]);

  // Create a map of PHID to document state for name lookup
  const localProfileStateMap = useMemo(() => {
    const map = new Map<string, { name?: string | null }>();
    for (const doc of localProfileDocuments) {
      const state = (
        doc.state as { global?: { name?: string | null } } | undefined
      )?.global;
      if (state) {
        map.set(doc.header.id, state);
      }
    }
    return map;
  }, [localProfileDocuments]);

  // Build profiles with actual document names
  const builderProfiles = useMemo<BuilderProfileOption[]>(() => {
    return localProfileNodes.map((node) => {
      const state = localProfileStateMap.get(node.id);
      return {
        id: node.id,
        name: state?.name || node.name,
        driveId: node.driveId,
      };
    });
  }, [localProfileNodes, localProfileStateMap]);

  // Filter out already selected owners from the picker
  const ownerIdSet = new Set(ownerIds);
  const availableProfiles = builderProfiles.filter(
    (profile) => !ownerIdSet.has(profile.id),
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProfiles = normalizedQuery
    ? availableProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(normalizedQuery),
      )
    : availableProfiles.slice(0, 5);

  const handleSelect = (profile: BuilderProfileOption) => {
    dispatch(addOwnerId({ ownerId: profile.id }));
    setQuery("");
    setIsPickerOpen(false);
  };

  const handleManualSelect = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || ownerIdSet.has(trimmed)) return;
    dispatch(addOwnerId({ ownerId: trimmed }));
    setQuery("");
    setIsPickerOpen(false);
  };

  const handleRemoveOwner = (ownerId: string) => {
    dispatch(removeOwnerId({ ownerId }));
  };

  useEffect(() => {
    if (!isPickerOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        event.target instanceof Node &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPickerOpen]);

  return (
    <div className="space-y-3">
      {/* List of current teams */}
      {ownerIds.length > 0 && (
        <div className="space-y-2">
          {ownerIds.map((ownerId) => (
            <OwnerCard
              key={ownerId}
              ownerId={ownerId}
              builderProfiles={builderProfiles}
              onRemove={() => handleRemoveOwner(ownerId)}
            />
          ))}
        </div>
      )}

      {/* Add team picker */}
      <div className="relative" ref={pickerRef}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsPickerOpen(true)}
            placeholder={
              ownerIds.length === 0
                ? "Search builder name to add team"
                : "Add another team..."
            }
            className="flex-1 min-w-[280px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-400 dark:focus:ring-gray-800"
          />
        </div>
        {isPickerOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <button
                  key={`${profile.driveId}-${profile.id}`}
                  type="button"
                  onClick={() => handleSelect(profile)}
                  className="flex w-full flex-col px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="font-medium">{profile.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {profile.id}
                  </span>
                </button>
              ))
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {normalizedQuery
                    ? "No matching teams"
                    : "No more teams available"}
                </div>
                {normalizedQuery && !ownerIdSet.has(normalizedQuery) && (
                  <button
                    type="button"
                    onClick={() => handleManualSelect(query)}
                    className="flex w-full flex-col px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="font-medium">Use this ID</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {query}
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type OwnerCardProps = {
  ownerId: string;
  builderProfiles: BuilderProfileOption[];
  onRemove: () => void;
};

function OwnerCard({ ownerId, builderProfiles, onRemove }: OwnerCardProps) {
  const profile = builderProfiles.find((p) => p.id === ownerId);
  const { ownerDriveId, selectedDocument } = useAddReportToRemoteDrive(ownerId);
  const ownerDriveMissing = !!ownerId && !ownerDriveId;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {profile?.name || "Unknown team"}
          </div>
          <div className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
            {ownerId}
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          title="Remove team"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {ownerDriveMissing ? (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            Team Drive Not Found
          </span>
        ) : ownerDriveId ? (
          <OwnerDriveActions
            ownerDriveId={ownerDriveId}
            selectedDocument={selectedDocument}
            ownerName={profile?.name || "team"}
          />
        ) : null}
      </div>
    </div>
  );
}

type OwnerDriveActionsProps = {
  ownerDriveId: string;
  selectedDocument: SnapshotReportDocument | undefined;
  ownerName: string;
};

function OwnerDriveActions({
  ownerDriveId,
  selectedDocument,
  ownerName,
}: OwnerDriveActionsProps) {
  const {
    addReportToOwnerDrive,
    canAddReportToOwnerDrive,
    driveDocumentId,
    snapshotReportNodeIds,
  } = useOwnerDriveActions(ownerDriveId, selectedDocument);
  const [addStatus, setAddStatus] = useState<"idle" | "adding" | "added">(
    "idle",
  );

  const selectedDocumentId = selectedDocument?.header?.id || "";
  const isAlreadyAdded =
    !!selectedDocumentId &&
    driveDocumentId === ownerDriveId &&
    snapshotReportNodeIds.includes(selectedDocumentId);

  useEffect(() => {
    if (isAlreadyAdded) {
      setAddStatus("added");
      return;
    }
    setAddStatus("idle");
  }, [
    isAlreadyAdded,
    selectedDocumentId,
    snapshotReportNodeIds,
    ownerDriveId,
    driveDocumentId,
  ]);

  const handleAddReport = useCallback(() => {
    setAddStatus("adding");
    addReportToOwnerDrive().then((didAdd) => {
      if (!didAdd) {
        setAddStatus("idle");
      }
    });
  }, [addReportToOwnerDrive]);

  if (addStatus === "added") {
    return (
      <span className="text-xs font-medium text-green-600 dark:text-green-400">
        Snapshot Report is added to {ownerName}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAddReport}
      disabled={!canAddReportToOwnerDrive || addStatus !== "idle"}
      className="text-xs font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {addStatus === "adding"
        ? "Adding report..."
        : `Add Report to ${ownerName}`}
    </button>
  );
}
