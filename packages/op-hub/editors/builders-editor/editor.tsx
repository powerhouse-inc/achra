import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  useSelectedBuildersDocument,
  type BuildersDocument,
  actions as buildersActions,
} from "document-models/builders";
import type { Action } from "document-model";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
  useDrives,
  useDocuments,
} from "@powerhousedao/reactor-browser";
import { useMemo, useCallback, useState, useEffect } from "react";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
  PHIDInput,
} from "@powerhousedao/document-engineering";
import type { BuilderProfileDocument } from "document-models/builder-profile";
import { useRemoteBuilderProfiles } from "./hooks/useRemoteBuilderProfiles.js";

type Builder = {
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
 */
function BuilderPHIDInput({
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
  const [inputText, setInputText] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    setInputText("");
    setHasSaved(false);
  }, [initialPhid]);

  const findPhidByInput = useCallback(
    (input: string): string | null => {
      const trimmed = input.trim();
      if (!trimmed) return null;

      const lowerInput = trimmed.toLowerCase();

      const exactMatchByName = options.find(
        (opt) => opt.label.toLowerCase() === lowerInput,
      );
      if (exactMatchByName) return exactMatchByName.id;

      const partialMatchByName = options.find((opt) =>
        opt.label.toLowerCase().startsWith(lowerInput),
      );
      if (partialMatchByName) return partialMatchByName.id;

      const containsMatches = options.filter((opt) =>
        opt.label.toLowerCase().includes(lowerInput),
      );
      if (containsMatches.length === 1) return containsMatches[0].id;

      const matchById = options.find(
        (opt) => opt.id.toLowerCase() === lowerInput,
      );
      if (matchById) return matchById.id;

      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(trimmed)) return trimmed;

      return null;
    },
    [options],
  );

  const isKnownPhid = useCallback(
    (value: string): boolean => {
      return options.some((opt) => opt.id === value);
    },
    [options],
  );

  const savePhid = useCallback(
    (phid: string) => {
      if (!hasSaved && phid && phid !== initialPhid) {
        setHasSaved(true);
        onSave(phid);
      }
    },
    [hasSaved, initialPhid, onSave],
  );

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
        if (isKnownPhid(newValue)) {
          savePhid(newValue);
        }
      }}
      onInput={(e) => {
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

/** Implement your editor behavior here */
export default function Editor() {
  const [doc, dispatch] = useSelectedBuildersDocument() as [
    BuildersDocument,
    (actionOrActions: Action | Action[] | undefined) => void,
  ];
  // Get the parent folder node for the currently selected node
  const parentFolder = useParentFolderForSelectedNode();
  // Set the selected node to the parent folder node (close the editor)
  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  const drives = useDrives();
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

  // Fetch all builder profile documents from all drives
  const builderProfileDocuments = useDocuments(builderPhids);

  // Create a map of PHID to document for quick lookup (local drives)
  const localBuilderProfileMap = useMemo(() => {
    const map = new Map<string, BuilderProfileDocument>();
    if (!builderProfileDocuments) return map;
    builderProfileDocuments.forEach((doc) => {
      if (doc.header.documentType === "powerhouse/builder-profile") {
        map.set(doc.header.id, doc as BuilderProfileDocument);
      }
    });
    return map;
  }, [builderProfileDocuments]);

  // Fetch remote profiles as fallback for builders not found locally
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

  const builders = useMemo<Builder[]>(() => {
    return (
      doc?.state.global.builders.map((phid) => {
        const profile = getBuilderProfileByPhid(phid);
        return {
          phid: phid,
          name: profile?.name || "",
          slug: profile?.slug || "",
          icon: profile?.icon || null,
        };
      }) || []
    );
  }, [doc, getBuilderProfileByPhid]);

  const columns = useMemo<Array<ColumnDef<Builder>>>(
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
            // First remove the old builder
            dispatch(buildersActions.removeBuilder({ builderPhid: currentId }));
            // Then add the new builder with the new PHID
            dispatch(
              buildersActions.addBuilder({
                builderPhid: newValue as string,
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
              const existingBuilder = builders.find(
                (builder) => builder.phid === phidValue,
              );

              if (!existingBuilder) {
                // If we're editing an existing row (has an ID), remove the old one first
                if (currentPhid && currentPhid !== phidValue) {
                  dispatch(
                    buildersActions.removeBuilder({
                      builderPhid: currentPhid,
                    }),
                  );
                }

                // Add the new builder
                dispatch(
                  buildersActions.addBuilder({
                    builderPhid: phidValue,
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
            <BuilderPHIDInput
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
                + Double-click to add new builder (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-center font-mono text-sm">{value}</div>;
        },
      },
      {
        field: "name",
        title: "Builder Name",
        editable: false,
        align: "center",
        width: 200,
        renderCell: (value) => {
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "slug",
        title: "Builder Slug",
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
                alt="Builder icon"
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
    [builders, getBuilderProfiles, dispatch],
  );

  return (
    <div className="w-full bg-gray-50">
      <DocumentToolbar />
      <div className="p-2 max-w-4xl mx-auto min-h-screen">
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Builders</h1>
        </div>
        <div className="mt-4 bg-white">
          <ObjectSetTable
            columns={columns}
            data={builders}
            allowRowSelection={true}
            onDelete={(data) => {
              if (data.length > 0) {
                data.forEach((d) => {
                  dispatch(
                    buildersActions.removeBuilder({ builderPhid: d.phid }),
                  );
                });
              }
            }}
            onAdd={(data) => {
              // Only add if we have a PHID
              const phid = (data as { id?: string }).id;
              if (phid) {
                dispatch(
                  buildersActions.addBuilder({
                    builderPhid: phid,
                  }),
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
