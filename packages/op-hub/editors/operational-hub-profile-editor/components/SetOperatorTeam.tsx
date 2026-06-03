import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useDrives,
  useGetDocuments,
  useDocumentById,
} from "@powerhousedao/reactor-browser";
import type { PHDocument } from "document-model";
import { PHIDInput } from "@powerhousedao/document-engineering";
import { setOperatorTeam } from "../../../document-models/operational-hub-profile/v1/gen/configuration/creators.js";
import { setOpHubMember } from "document-models/builder-profile";
import { useRemoteBuilderProfiles } from "../../shared/hooks/useRemoteBuilderProfiles.js";
import { setOpHubMemberOnBuilderProfile } from "../../shared/graphql-client.js";

type ProfileOption = {
  id: string;
  label: string;
  value: string;
  title: string;
  path?: string;
  description?: string;
  icon?: React.ReactElement;
};

type BuilderProfileState = {
  name?: string | null;
  icon?: string | null;
  description?: string | null;
};

type SetOperatorTeamProps = {
  operatorTeam: string | null | undefined;
  dispatch: (action: ReturnType<typeof setOperatorTeam>) => void;
  /** The PHID of the operational hub profile document */
  opHubPhid: string;
  /** The name of the operational hub */
  opHubName: string;
};

/** Creates an icon element from an image URL */
function createIconElement(
  iconUrl: string | null | undefined,
): React.ReactElement | undefined {
  if (!iconUrl) return undefined;
  return React.createElement("img", {
    src: iconUrl,
    alt: "",
    style: {
      width: 24,
      height: 24,
      borderRadius: 4,
      objectFit: "cover" as const,
    },
  });
}

export function SetOperatorTeam({
  operatorTeam,
  dispatch,
  opHubPhid,
  opHubName,
}: SetOperatorTeamProps) {
  const drives = useDrives();
  const getDocuments = useGetDocuments();

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

  // Build local profile nodes from ALL drives (not just builder-team-admin drives)
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
            driveName: drive.state.global.name || drive.header.id,
          })),
      );
  }, [drives]);

  // Get the PHIDs of local profiles to fetch their documents
  const localProfilePhids = useMemo(
    () => localProfileNodes.map((node) => node.id),
    [localProfileNodes],
  );

  // State to hold fetched local builder profile documents
  const [localProfileDocuments, setLocalProfileDocuments] = useState<
    PHDocument[]
  >([]);

  // Fetch local builder profile documents
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

  // Create a map of PHID to document state for local profiles
  const localProfileStateMap = useMemo(() => {
    const map = new Map<string, BuilderProfileState>();
    for (const doc of localProfileDocuments) {
      const state = (doc.state as { global?: BuilderProfileState } | undefined)
        ?.global;
      if (state) {
        map.set(doc.header.id, state);
      }
    }
    return map;
  }, [localProfileDocuments]);

  // Build local profiles with full state info
  const localBuilderProfiles = useMemo<ProfileOption[]>(() => {
    return localProfileNodes.map((node) => {
      const state = localProfileStateMap.get(node.id);
      const name = state?.name || node.name;

      return {
        id: node.id,
        label: name,
        value: node.id,
        title: name,
        path: node.driveName,
        description: state?.description || undefined,
        icon: createIconElement(state?.icon),
      };
    });
  }, [localProfileNodes, localProfileStateMap]);

  // Create a map of local profile IDs for filtering remote duplicates
  const localProfileMap = useMemo(() => {
    const map = new Map<string, ProfileOption>();
    localBuilderProfiles.forEach((profile) => {
      map.set(profile.id, profile);
    });
    return map;
  }, [localBuilderProfiles]);

  // Fetch remote profiles as fallback
  const { allProfiles: remoteProfiles, isLoading: isLoadingRemote } =
    useRemoteBuilderProfiles(localProfileMap);

  // Combine local and remote profiles
  const builderProfileOptions = useMemo<ProfileOption[]>(() => {
    // Start with local profiles
    const options = [...localBuilderProfiles];

    // Add remote profiles that aren't already local
    for (const remoteProfile of remoteProfiles) {
      const name = remoteProfile.state.name || remoteProfile.id;
      const driveName = "Remote";

      options.push({
        id: remoteProfile.id,
        label: name,
        value: remoteProfile.id,
        title: name,
        path: driveName,
        description: remoteProfile.state.description || undefined,
        icon: createIconElement(remoteProfile.state.icon),
      });
    }

    return options;
  }, [localBuilderProfiles, remoteProfiles]);

  // Check if a value is a known PHID from options
  const isKnownPhid = useCallback(
    (phid: string) => builderProfileOptions.some((opt) => opt.value === phid),
    [builderProfileOptions],
  );

  // Check if a PHID is a local profile (in browser drives)
  const isLocalProfile = useCallback(
    (phid: string) => localProfilePhids.includes(phid),
    [localProfilePhids],
  );

  const handleSave = useCallback(
    async (phid: string) => {
      if (phid !== operatorTeam) {
        // Update the operational hub profile with the selected operator team
        dispatch(setOperatorTeam({ operatorTeam: phid || null }));

        // Also update the builder profile to link back to this operational hub
        if (phid) {
          // Trigger local dispatch if the profile is local
          if (isLocalProfile(phid)) {
            setPendingOpHubUpdate({
              phid,
              name: opHubName || null,
              opHubPhid,
            });
          }

          // Also call GraphQL for remote profiles or sync
          try {
            await setOpHubMemberOnBuilderProfile(phid, {
              name: opHubName || null,
              phid: opHubPhid,
            });
          } catch (error) {
            console.error(
              "Failed to set op hub member on builder profile (remote):",
              error,
            );
          }
        }
      }
    },
    [dispatch, operatorTeam, opHubPhid, opHubName, isLocalProfile],
  );

  // Handle clearing the operator team - also clears the link on the old builder profile
  const handleClear = useCallback(async () => {
    if (operatorTeam) {
      // Clear the operational hub profile's operator team
      dispatch(setOperatorTeam({ operatorTeam: null }));

      // Trigger local dispatch to clear op hub member if the profile is local
      if (isLocalProfile(operatorTeam)) {
        setPendingOpHubUpdate({
          phid: operatorTeam,
          name: null,
          opHubPhid: null,
        });
      }

      // Also call GraphQL for remote profiles or sync
      try {
        await setOpHubMemberOnBuilderProfile(operatorTeam, {
          name: null,
          phid: null,
        });
      } catch (error) {
        console.error(
          "Failed to clear op hub member on builder profile (remote):",
          error,
        );
      }
    }
  }, [dispatch, operatorTeam, isLocalProfile]);

  // Fetch options callback for search
  const fetchOptionsCallback = useCallback(
    (input: string): Promise<ProfileOption[]> => {
      const normalizedInput = input.toLowerCase().trim();
      if (!normalizedInput)
        return Promise.resolve(builderProfileOptions.slice(0, 10));
      return Promise.resolve(
        builderProfileOptions.filter(
          (opt) =>
            opt.label.toLowerCase().includes(normalizedInput) ||
            opt.value.toLowerCase().includes(normalizedInput) ||
            opt.path?.toLowerCase().includes(normalizedInput) ||
            opt.description?.toLowerCase().includes(normalizedInput),
        ),
      );
    },
    [builderProfileOptions],
  );

  return (
    <PHIDInput
      value={operatorTeam || ""}
      onChange={(newValue) => {
        // onChange is called when user selects from dropdown or clears
        if (!newValue || newValue === "") {
          // User cleared the input
          void handleClear();
        } else if (isKnownPhid(newValue)) {
          void handleSave(newValue);
        }
      }}
      onBlur={() => {
        // Handle manual entry on blur - not directly available, handled via onChange
      }}
      placeholder={
        isLoadingRemote
          ? "Loading profiles..."
          : "Search builder name or enter PHID"
      }
      className="w-full"
      variant="withValueTitleAndDescription"
      initialOptions={builderProfileOptions}
      fetchOptionsCallback={fetchOptionsCallback}
    />
  );
}
