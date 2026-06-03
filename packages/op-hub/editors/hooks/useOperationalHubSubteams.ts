import { useMemo, useCallback } from "react";
import {
  useDocumentsInSelectedDrive,
  useDrives,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { addSubteam } from "../../document-models/operational-hub-profile/v1/gen/configuration/creators.js";
import type { OperationalHubProfileDocument } from "../../document-models/operational-hub-profile/v1/gen/types.js";
import type { SelectOption } from "@powerhousedao/document-engineering/ui";

type BuilderProfileInfo = {
  id: string;
  name: string;
};

/**
 * Hook to access subteams from the Operational Hub Profile document in the current drive.
 * Returns the subteams as SelectOptions for budget dropdowns and a function to add new subteams.
 */
export function useOperationalHubSubteams() {
  const documentsInDrive = useDocumentsInSelectedDrive();
  const drives = useDrives();

  // Find the Operational Hub Profile document
  const operationalHubProfileDocument = useMemo(() => {
    if (!documentsInDrive) return null;
    return documentsInDrive.find(
      (doc) => doc.header.documentType === "powerhouse/operational-hub-profile",
    ) as OperationalHubProfileDocument | undefined;
  }, [documentsInDrive]);

  // Get subteams from the document
  const subteams = useMemo(() => {
    if (!operationalHubProfileDocument) return [];
    return operationalHubProfileDocument.state.global.subteams;
  }, [operationalHubProfileDocument]);

  // Build a map of builder profile IDs to their names by scanning all drives
  const builderProfilesMap = useMemo(() => {
    const map = new Map<string, BuilderProfileInfo>();
    if (!drives) return map;

    for (const drive of drives) {
      // Look for builder-profile documents in drives with team-admin editor
      if (
        drive.header.documentType === "powerhouse/document-drive" &&
        drive.header.meta?.preferredEditor === "team-admin"
      ) {
        const nodes = drive.state.global.nodes;
        for (const node of nodes) {
          if (
            node.kind === "file" &&
            "documentType" in node &&
            node.documentType === "powerhouse/builder-profile"
          ) {
            map.set(node.id, {
              id: node.id,
              name: node.name || "Untitled builder",
            });
          }
        }
      }
    }

    return map;
  }, [drives]);

  // Convert subteams to SelectOptions for the budget dropdown, using names from builder profiles
  const budgetOptions = useMemo((): SelectOption[] => {
    return subteams.map((subteamId) => {
      const builderProfile = builderProfilesMap.get(subteamId);
      return {
        label: builderProfile?.name || subteamId,
        value: subteamId,
      };
    });
  }, [subteams, builderProfilesMap]);

  // Function to add a new subteam to the Operational Hub Profile
  const addNewSubteam = useCallback(
    async (subteamId: string) => {
      if (!operationalHubProfileDocument?.header.id) {
        console.error("No Operational Hub Profile document found");
        return false;
      }

      try {
        await dispatchActions(
          addSubteam({ subteam: subteamId }),
          operationalHubProfileDocument.header.id,
        );
        return true;
      } catch (error) {
        console.error("Failed to add subteam:", error);
        return false;
      }
    },
    [operationalHubProfileDocument?.header.id],
  );

  return {
    subteams,
    budgetOptions,
    addNewSubteam,
    hasOperationalHubProfile: !!operationalHubProfileDocument,
  };
}
