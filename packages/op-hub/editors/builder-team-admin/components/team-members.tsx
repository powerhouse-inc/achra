import { useMemo, useCallback, useState, useEffect } from "react";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import type { PHDocument } from "document-model";
import {
  useDocumentsInSelectedDrive,
  useDrives,
  useGetDocuments,
  useDocumentById,
} from "@powerhousedao/reactor-browser";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
  PHIDInput,
} from "@powerhousedao/document-engineering";
import type { BuilderProfileDocument } from "document-models/builder-profile";
import { actions as builderProfileActions } from "document-models/builder-profile";
import { useRemoteBuilderProfiles } from "../../shared/hooks/useRemoteBuilderProfiles.js";

type Contributor = {
  phid: string;
  name: string;
  slug: string;
  icon: string | null;
};

type ProfileOption = {
  id: string;
  label: string;
  value: string;
  title: string;
};

/**
 * Wrapper component for PHIDInput that properly tracks selected PHID
 * and handles saving on blur/enter with the correct PHID value.
 *
 * Key insight from the PHIDInput library:
 * - onChange is called with the PHID value when user selects from dropdown (click or Enter on highlighted item)
 * - After dropdown selection, the input is re-focused so onBlur doesn't fire
 * - Therefore we must save immediately in onChange when a valid PHID is selected
 */
function ContributorPHIDInput({
  initialPhid,
  options,
  onSave,
  fetchOptionsCallback,
}: {
  initialPhid: string;
  options: ProfileOption[];
  onSave: (phid: string) => void;
  fetchOptionsCallback: (input: string) => Promise<ProfileOption[]>;
}) {
  // Track the current input text for manual entry lookup
  const [inputText, setInputText] = useState("");
  // Track if we already saved to prevent duplicate saves
  const [hasSaved, setHasSaved] = useState(false);

  // Reset state when initialPhid changes (switching between rows)
  useEffect(() => {
    setInputText("");
    setHasSaved(false);
  }, [initialPhid]);

  // Find PHID by name or return the input if it looks like a PHID
  const findPhidByInput = useCallback(
    (input: string): string | null => {
      const trimmed = input.trim();
      if (!trimmed) return null;

      const lowerInput = trimmed.toLowerCase();

      // Check if input matches a profile name exactly (case-insensitive)
      const exactMatchByName = options.find(
        (opt) => opt.label.toLowerCase() === lowerInput,
      );
      if (exactMatchByName) return exactMatchByName.id;

      // Check if input matches a profile name partially (first match that starts with input)
      const partialMatchByName = options.find((opt) =>
        opt.label.toLowerCase().startsWith(lowerInput),
      );
      if (partialMatchByName) return partialMatchByName.id;

      // Check if only one option contains the input (unambiguous match)
      const containsMatches = options.filter((opt) =>
        opt.label.toLowerCase().includes(lowerInput),
      );
      if (containsMatches.length === 1) return containsMatches[0].id;

      // Check if input matches a profile ID
      const matchById = options.find(
        (opt) => opt.id.toLowerCase() === lowerInput,
      );
      if (matchById) return matchById.id;

      // If input looks like a UUID, return it directly
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(trimmed)) return trimmed;

      return null;
    },
    [options],
  );

  // Check if a value is a known PHID from options
  const isKnownPhid = useCallback(
    (value: string): boolean => {
      return options.some((opt) => opt.id === value);
    },
    [options],
  );

  // Save a PHID value (with duplicate prevention)
  const savePhid = useCallback(
    (phid: string) => {
      if (!hasSaved && phid && phid !== initialPhid) {
        setHasSaved(true);
        onSave(phid);
      }
    },
    [hasSaved, initialPhid, onSave],
  );

  // Handle blur - try to save based on inputText
  const handleBlur = useCallback(() => {
    if (hasSaved) return;
    if (inputText) {
      const foundPhid = findPhidByInput(inputText);
      if (foundPhid) {
        savePhid(foundPhid);
      }
    }
  }, [hasSaved, inputText, findPhidByInput, savePhid]);

  return (
    <PHIDInput
      value={initialPhid}
      onChange={(newValue) => {
        // onChange is called when user selects from dropdown (click or Enter on highlighted item)
        // The newValue is the PHID. Save immediately if it's a valid known PHID.
        if (isKnownPhid(newValue)) {
          savePhid(newValue);
        }
      }}
      onInput={(e) => {
        // Track the raw input text for manual entry lookup on blur
        const target = e.target as HTMLInputElement;
        setInputText(target.value);
      }}
      onBlur={handleBlur}
      placeholder="Enter PHID or search by name"
      className="w-full"
      variant="withValueAndTitle"
      initialOptions={options}
      fetchOptionsCallback={fetchOptionsCallback}
    />
  );
}

export function ContributorsSection() {
  const drives = useDrives();
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();

  // find builder-profile document in the selected drive
  const builderProfileDocument = useMemo(() => {
    if (!documentsInSelectedDrive) return null;
    return documentsInSelectedDrive.find(
      (doc) => doc.header.documentType === "powerhouse/builder-profile",
    );
  }, [documentsInSelectedDrive]);
  const [buildDoc, dispatch] = useDocumentById(
    builderProfileDocument?.header.id,
  );

  const contributors = useMemo<string[]>(() => {
    const state = buildDoc?.state as
      | { global?: { contributors?: string[] } }
      | undefined;
    return state?.global?.contributors || [];
  }, [buildDoc]);

  // Map all builder profile FileNodes from all drives with their driveId
  const builderProfileNodesWithDriveId = useMemo(() => {
    if (!drives) return [];
    return drives.flatMap((drive) => {
      const builderProfileNodes = drive.state.global.nodes.filter(
        (node): node is FileNode =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/builder-profile",
      );
      return builderProfileNodes.map((node) => ({
        node,
        driveId: drive.header.id,
      }));
    });
  }, [drives]);

  // Get all unique builder PHIDs from the nodes
  const builderPhids = useMemo(() => {
    return builderProfileNodesWithDriveId.map(({ node }) => node.id);
  }, [builderProfileNodesWithDriveId]);

  // Get the document fetcher function
  const getDocuments = useGetDocuments();

  // State to hold fetched builder profile documents
  const [builderProfileDocuments, setBuilderProfileDocuments] = useState<
    PHDocument[]
  >([]);

  // Fetch all builder profile documents from all drives
  useEffect(() => {
    if (builderPhids.length === 0) {
      setBuilderProfileDocuments([]);
      return;
    }

    getDocuments(builderPhids)
      .then((docs) => {
        setBuilderProfileDocuments(docs);
      })
      .catch((error) => {
        console.error("Failed to fetch builder profile documents:", error);
        setBuilderProfileDocuments([]);
      });
  }, [builderPhids, getDocuments]);

  // Create a map of PHID to document for quick lookup (local drives)
  const localBuilderProfileMap = useMemo(() => {
    const map = new Map<string, BuilderProfileDocument>();
    for (const doc of builderProfileDocuments) {
      if (doc.header.documentType === "powerhouse/builder-profile") {
        map.set(doc.header.id, doc as unknown as BuilderProfileDocument);
      }
    }
    return map;
  }, [builderProfileDocuments]);

  // Fetch remote profiles as fallback for contributors not found locally
  const { profileMap: remoteProfileMap, allProfiles: remoteProfiles } =
    useRemoteBuilderProfiles(localBuilderProfileMap);

  // Helper function to get builder profile documents from all drives (local + remote)
  const getBuilderProfiles = useCallback((): ProfileOption[] => {
    // Start with local profiles
    const profileOptions: ProfileOption[] = builderProfileNodesWithDriveId.map(
      ({ node }) => {
        const doc = localBuilderProfileMap.get(node.id);
        const name = doc?.state?.global?.name || node.name || node.id;
        return {
          id: node.id,
          label: name,
          value: node.id,
          title: name,
        };
      },
    );

    // Add remote profiles that aren't already in local
    const localIds = new Set(profileOptions.map((p) => p.id));
    for (const remoteProfile of remoteProfiles) {
      if (!localIds.has(remoteProfile.id)) {
        const name = remoteProfile.state?.name || remoteProfile.id;
        profileOptions.push({
          id: remoteProfile.id,
          label: name,
          value: remoteProfile.id,
          title: name,
        });
      }
    }

    return profileOptions;
  }, [builderProfileNodesWithDriveId, localBuilderProfileMap, remoteProfiles]);

  // Helper function to get builder profile data by PHID (local first, then remote fallback)
  const getBuilderProfileByPhid = useCallback(
    (phid: string) => {
      // Try local first
      const localDoc = localBuilderProfileMap.get(phid);
      if (localDoc) {
        return {
          name: localDoc.state.global?.name || localDoc.header.id,
          slug: localDoc.state.global?.slug || localDoc.header.id,
          icon: localDoc.state.global?.icon || null,
        };
      }

      // Fall back to remote
      const remoteProfile = remoteProfileMap.get(phid);
      if (remoteProfile) {
        return {
          name: remoteProfile.state?.name || remoteProfile.id,
          slug: remoteProfile.state?.slug || remoteProfile.id,
          icon: remoteProfile.state?.icon || null,
        };
      }

      return null;
    },
    [localBuilderProfileMap, remoteProfileMap],
  );

  const contributorData = useMemo<Contributor[]>(() => {
    return contributors.map((phid) => {
      const profile = getBuilderProfileByPhid(phid);
      return {
        phid: phid,
        name: profile?.name || "",
        slug: profile?.slug || "",
        icon: profile?.icon || null,
      };
    });
  }, [contributors, getBuilderProfileByPhid]);

  const columns = useMemo<Array<ColumnDef<Contributor>>>(
    () => [
      {
        field: "phid",
        title: "PHID",
        editable: true,
        align: "center",
        width: 200,
        onSave: (newValue, context) => {
          const currentId = context.row.phid || "";
          if (newValue !== currentId && newValue && currentId) {
            // First remove the old contributor
            dispatch(
              builderProfileActions.removeContributor({
                contributorPHID: currentId,
              }),
            );
            // Then add the new contributor with the new PHID
            dispatch(
              builderProfileActions.addContributor({
                contributorPHID: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
        renderCellEditor: (_value, _onChange, context) => {
          const currentPhid = context.row.phid || "";

          const handleSave = (phidValue: string) => {
            // If a PHID is entered and it's different from current value
            if (phidValue && phidValue !== currentPhid) {
              const existingContributor = contributors.find(
                (contributor) => contributor === phidValue,
              );

              if (!existingContributor) {
                // If we're editing an existing row (has an ID), remove the old one first
                if (currentPhid && currentPhid !== phidValue) {
                  dispatch(
                    builderProfileActions.removeContributor({
                      contributorPHID: currentPhid,
                    }),
                  );
                }

                // Add the new contributor
                dispatch(
                  builderProfileActions.addContributor({
                    contributorPHID: phidValue,
                  }),
                );
              }
            }
          };

          const fetchOptions = (userInput: string) => {
            const builderProfiles = getBuilderProfiles();

            // Filter profiles based on user input
            if (!userInput.trim()) {
              return Promise.resolve(builderProfiles);
            }

            const filteredProfiles = builderProfiles.filter(
              (profile) =>
                profile.label.toLowerCase().includes(userInput.toLowerCase()) ||
                profile.id.toLowerCase().includes(userInput.toLowerCase()),
            );

            return Promise.resolve(filteredProfiles);
          };

          return (
            <ContributorPHIDInput
              key={`phid-input-${currentPhid || Date.now()}`}
              initialPhid={currentPhid}
              options={getBuilderProfiles()}
              onSave={handleSave}
              fetchOptionsCallback={fetchOptions}
            />
          );
        },
        renderCell: (value) => {
          if (value === "" || !value) {
            return (
              <div className="font-light italic text-gray-500 text-center">
                + Double-click to add new contributor (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-center font-mono text-sm">{value}</div>;
        },
      },
      {
        field: "name",
        title: "Name",
        editable: false,
        align: "center",
        width: 200,
        renderCell: (value) => {
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "slug",
        title: "Slug",
        editable: false,
        align: "center",
        width: 200,
        renderCell: (value) => {
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "icon",
        title: "Icon",
        editable: false,
        align: "center",
        width: 150,
        renderCell: (_value, context) => {
          if (!context.row.icon) {
            return null;
          }
          return (
            <div className="text-center">
              <img
                src={context.row.icon}
                alt="Contributor icon"
                className="w-10 h-10 rounded-sm mx-auto object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          );
        },
      },
    ],
    [contributors, getBuilderProfiles, dispatch],
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Contributors</h3>
      <p className="text-sm text-gray-600 mb-4">
        Add team members to your builder profile. Search for existing builder
        profiles by name or PHID.
      </p>
      <ObjectSetTable
        columns={columns}
        data={contributorData}
        allowRowSelection={true}
        onDelete={(data) => {
          if (data.length > 0) {
            data.forEach((d) => {
              dispatch(
                builderProfileActions.removeContributor({
                  contributorPHID: d.phid,
                }),
              );
            });
          }
        }}
        onAdd={(data) => {
          // Only add if we have a PHID
          const phid = (data as { id?: string }).id;
          if (phid) {
            dispatch(
              builderProfileActions.addContributor({ contributorPHID: phid }),
            );
          }
        }}
      />
    </div>
  );
}
