import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  useDrives,
  useDocumentById,
  useGetDocuments,
} from "@powerhousedao/reactor-browser";
import type { PHDocument } from "document-model";
import {
  addSubteam,
  removeSubteam,
} from "../../../document-models/operational-hub-profile/v1/gen/configuration/creators.js";
import { setOpHubMember } from "document-models/builder-profile";
import { useRemoteBuilderProfiles } from "../../shared/hooks/useRemoteBuilderProfiles.js";
import { setOpHubMemberOnBuilderProfile } from "../../shared/graphql-client.js";

type BuilderProfileOption = {
  id: string;
  name: string;
  driveId: string;
  isRemote?: boolean;
};

type SubteamsPickerProps = {
  subteams: string[];
  operatorTeam: string | null | undefined;
  dispatch: (
    action: ReturnType<typeof addSubteam> | ReturnType<typeof removeSubteam>,
  ) => void;
  /** The PHID of the operational hub profile document */
  opHubPhid: string;
  /** The name of the operational hub */
  opHubName: string;
};

export function SubteamsPicker({
  subteams,
  operatorTeam,
  dispatch,
  opHubPhid,
  opHubName,
}: SubteamsPickerProps) {
  const drives = useDrives();
  const [query, setQuery] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  // Track pending op hub member updates for local dispatch
  const [pendingOpHubUpdate, setPendingOpHubUpdate] = useState<{
    phid: string;
    name: string | null;
    opHubPhid: string | null;
  } | null>(null);

  // Get dispatch function for the builder profile we want to update locally
  const [pendingDoc, pendingDispatch] = useDocumentById(
    pendingOpHubUpdate?.phid,
  );

  // Dispatch locally when the document becomes available
  useEffect(() => {
    if (pendingOpHubUpdate && pendingDoc && pendingDispatch) {
      pendingDispatch(
        setOpHubMember({
          name: pendingOpHubUpdate.name,
          phid: pendingOpHubUpdate.opHubPhid,
        }),
      );
      setPendingOpHubUpdate(null);
    }
  }, [pendingOpHubUpdate, pendingDoc, pendingDispatch]);

  const getDocuments = useGetDocuments();

  // Collect builder profile node IDs from ALL drives
  const localProfileNodes = useMemo(() => {
    if (!drives) return [];
    return drives
      .filter(
        (drive) => drive.header.documentType === "powerhouse/document-drive",
      )
      .flatMap((drive) =>
        drive.state.global.nodes
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

  // Build local profiles with actual document names
  const localBuilderProfiles = useMemo<BuilderProfileOption[]>(() => {
    return localProfileNodes.map((node) => {
      const state = localProfileStateMap.get(node.id);
      return {
        id: node.id,
        name: state?.name || node.name,
        driveId: node.driveId,
        isRemote: false,
      };
    });
  }, [localProfileNodes, localProfileStateMap]);

  // Create a map of local profile IDs for filtering remote duplicates
  const localProfileMap = useMemo(() => {
    const map = new Map<string, BuilderProfileOption>();
    localBuilderProfiles.forEach((profile) => {
      map.set(profile.id, profile);
    });
    return map;
  }, [localBuilderProfiles]);

  // Fetch remote profiles as fallback
  const { allProfiles: remoteProfiles, isLoading: isLoadingRemote } =
    useRemoteBuilderProfiles(localProfileMap);

  // Combine local and remote profiles
  const builderProfiles = useMemo<BuilderProfileOption[]>(() => {
    // Start with local profiles
    const profiles = [...localBuilderProfiles];

    // Add remote profiles that aren't already local
    for (const remoteProfile of remoteProfiles) {
      profiles.push({
        id: remoteProfile.id,
        name: remoteProfile.state.name || remoteProfile.id,
        driveId: "remote",
        isRemote: true,
      });
    }

    return profiles;
  }, [localBuilderProfiles, remoteProfiles]);

  // Filter out already selected subteams from the picker
  const subteamIdSet = new Set(subteams);
  const availableProfiles = builderProfiles.filter(
    (profile) => !subteamIdSet.has(profile.id),
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProfiles = normalizedQuery
    ? availableProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(normalizedQuery),
      )
    : availableProfiles.slice(0, 5);

  // Get local profile IDs for checking if a profile is local
  const localProfileIds = useMemo(
    () => localBuilderProfiles.map((p) => p.id),
    [localBuilderProfiles],
  );

  // Check if a PHID is a local profile (in browser drives)
  const isLocalProfile = useCallback(
    (phid: string) => localProfileIds.includes(phid),
    [localProfileIds],
  );

  // Helper to set op hub member on the builder profile (both local and remote)
  const updateBuilderProfileOpHub = useCallback(
    async (builderProfilePhid: string) => {
      // Trigger local dispatch if the profile is local
      if (isLocalProfile(builderProfilePhid)) {
        setPendingOpHubUpdate({
          phid: builderProfilePhid,
          name: opHubName || null,
          opHubPhid,
        });
      }

      // Also call GraphQL for remote profiles or sync
      try {
        await setOpHubMemberOnBuilderProfile(builderProfilePhid, {
          name: opHubName || null,
          phid: opHubPhid,
        });
      } catch (error) {
        console.error(
          "Failed to set op hub member on builder profile (remote):",
          error,
        );
      }
    },
    [opHubPhid, opHubName, isLocalProfile],
  );

  const handleSelect = useCallback(
    (profile: BuilderProfileOption) => {
      dispatch(addSubteam({ subteam: profile.id }));
      // Also update the builder profile to link back to this operational hub
      void updateBuilderProfileOpHub(profile.id);
      setQuery("");
      setIsPickerOpen(false);
    },
    [dispatch, updateBuilderProfileOpHub],
  );

  const handleManualSelect = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || subteamIdSet.has(trimmed)) return;
      dispatch(addSubteam({ subteam: trimmed }));
      // Also update the builder profile to link back to this operational hub
      void updateBuilderProfileOpHub(trimmed);
      setQuery("");
      setIsPickerOpen(false);
    },
    [dispatch, subteamIdSet, updateBuilderProfileOpHub],
  );

  const handleRemoveSubteam = (subteamId: string) => {
    dispatch(removeSubteam({ subteam: subteamId }));
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
      {/* List of current subteams */}
      {subteams.length > 0 && (
        <div className="space-y-2">
          {subteams.map((subteamId) => (
            <SubteamCard
              key={subteamId}
              subteamId={subteamId}
              builderProfiles={builderProfiles}
              onRemove={() => handleRemoveSubteam(subteamId)}
            />
          ))}
        </div>
      )}

      {/* Add subteam picker */}
      <div className="relative" ref={pickerRef}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsPickerOpen(true)}
            placeholder={
              isLoadingRemote
                ? "Loading profiles..."
                : subteams.length === 0
                  ? "Search builder name to add subteam..."
                  : "Add another subteam..."
            }
            className="flex-1 min-w-[280px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-400 dark:focus:ring-gray-800"
          />
        </div>
        {isPickerOpen && (
          <div className="absolute z-10 mt-2 w-full max-h-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => {
                const isOperatorTeam = operatorTeam === profile.id;
                return (
                  <button
                    key={`${profile.driveId}-${profile.id}`}
                    type="button"
                    onClick={() => !isOperatorTeam && handleSelect(profile)}
                    disabled={isOperatorTeam}
                    className={`flex w-full flex-col px-3 py-2 text-left text-sm ${
                      isOperatorTeam
                        ? "cursor-not-allowed bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                        : "text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="font-medium">
                      {profile.name}
                      {profile.isRemote && (
                        <span className="ml-2 text-xs text-blue-500 dark:text-blue-400">
                          (remote)
                        </span>
                      )}
                      {isOperatorTeam && (
                        <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">
                          (already set as Operator Team)
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {profile.id}
                    </span>
                  </button>
                );
              })
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {normalizedQuery
                    ? "No matching teams"
                    : "No more teams available"}
                </div>
                {normalizedQuery && !subteamIdSet.has(normalizedQuery) && (
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

type SubteamCardProps = {
  subteamId: string;
  builderProfiles: BuilderProfileOption[];
  onRemove: () => void;
};

function SubteamCard({
  subteamId,
  builderProfiles,
  onRemove,
}: SubteamCardProps) {
  const profile = builderProfiles.find((p) => p.id === subteamId);

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {profile?.name || "Unknown team"}
            {profile?.isRemote && (
              <span className="ml-2 text-xs font-normal text-blue-500 dark:text-blue-400">
                (remote)
              </span>
            )}
          </div>
          <div className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
            {subteamId}
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          title="Remove subteam"
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
    </div>
  );
}
