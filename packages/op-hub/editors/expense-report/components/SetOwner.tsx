import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDrives, useGetDocuments } from "@powerhousedao/reactor-browser";
import type { PHDocument } from "document-model";
import { setName } from "document-model";
import { setOwnerId } from "../../../document-models/expense-report/v1/gen/wallet/creators.js";
import type { ExpenseReportDocument } from "../../../document-models/expense-report/v1/gen/types.js";
import {
  useAddReportToRemoteDrive,
  useOwnerDriveActions,
} from "./AddReportToRemoteDrive.js";

type BuilderProfileOption = {
  id: string;
  name: string;
  driveId: string;
};

/**
 * Format month code from ISO date string like "2026-01-01T00:00:00.000Z" to "01-2026"
 */
function formatMonthCodeFromDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "";
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${month}-${year}`;
}

type SetOwnerProps = {
  ownerId?: string | null;
  periodStart?: string | null;
  dispatch: (
    action: ReturnType<typeof setOwnerId> | ReturnType<typeof setName>,
  ) => void;
};

export function SetOwner({ ownerId, periodStart, dispatch }: SetOwnerProps) {
  const drives = useDrives();
  const [query, setQuery] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const {
    ownerDriveId,
    ownerId: resolvedOwnerId,
    selectedDocument,
  } = useAddReportToRemoteDrive(ownerId);

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

  const selectedProfile = useMemo(
    () => builderProfiles.find((profile) => profile.id === ownerId),
    [builderProfiles, ownerId],
  );

  const showPicker = !ownerId || isPickerOpen;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProfiles = normalizedQuery
    ? builderProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(normalizedQuery),
      )
    : builderProfiles.slice(0, 5);
  const shouldShowOptions = isPickerOpen;

  const handleSelect = (profile: BuilderProfileOption) => {
    dispatch(setOwnerId({ ownerId: profile.id }));

    // Auto-update document name with team name
    if (periodStart) {
      const monthCode = formatMonthCodeFromDate(periodStart);
      if (monthCode) {
        dispatch(setName(`${monthCode} ${profile.name}`));
      }
    }

    setQuery("");
    setIsPickerOpen(false);
  };

  const handleManualSelect = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(setOwnerId({ ownerId: trimmed }));
    setQuery("");
    setIsPickerOpen(false);
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

  const ownerDriveMissing = !!resolvedOwnerId && !ownerDriveId;

  return (
    <div className="flex items-start gap-2">
      <span className="pt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        Owner:
      </span>
      <div className="w-full max-w-lg">
        {showPicker ? (
          <div className="relative" ref={pickerRef}>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsPickerOpen(true)}
              placeholder="Search builder name"
              className="w-full min-w-[320px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-400 dark:focus:ring-gray-800"
            />
            {shouldShowOptions ? (
              filteredProfiles.length > 0 ? (
                <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  {filteredProfiles.map((profile) => (
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
                  ))}
                </div>
              ) : (
                <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No matching builders
                  </div>
                  {normalizedQuery ? (
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
                  ) : null}
                </div>
              )
            ) : null}
          </div>
        ) : (
          <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {selectedProfile?.name || "Unknown builder"}
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={ownerId || ""}
                readOnly
                className="w-full min-w-[320px] rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-mono text-gray-700 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Change owner
              </button>
              {ownerDriveMissing ? (
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Owner Drive Not Found
                </span>
              ) : ownerDriveId ? (
                <OwnerDriveActions
                  ownerDriveId={ownerDriveId}
                  selectedDocument={selectedDocument}
                  ownerName={selectedProfile?.name || "owner"}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type OwnerDriveActionsProps = {
  ownerDriveId: string;
  selectedDocument: ExpenseReportDocument | undefined;
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
    expenseReportNodeIds,
  } = useOwnerDriveActions(ownerDriveId, selectedDocument);
  const [addStatus, setAddStatus] = useState<"idle" | "adding" | "added">(
    "idle",
  );

  const selectedDocumentId = selectedDocument?.header?.id || "";
  const isAlreadyAdded =
    !!selectedDocumentId &&
    driveDocumentId === ownerDriveId &&
    expenseReportNodeIds.includes(selectedDocumentId);

  useEffect(() => {
    if (isAlreadyAdded) {
      setAddStatus("added");
      return;
    }
    setAddStatus("idle");
  }, [
    isAlreadyAdded,
    selectedDocumentId,
    expenseReportNodeIds,
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
        ✓ Expense Report is added to {ownerName}
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
