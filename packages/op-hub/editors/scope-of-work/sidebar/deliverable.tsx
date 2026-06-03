import {
  ObjectSetTable,
  type ColumnDef,
  Textarea,
  TextInput,
  Select,
  Checkbox,
  Icon,
  PHIDInput,
} from "@powerhousedao/document-engineering";
import {
  type Deliverable as DeliverableType,
  type PmDeliverableStatusInput,
  type Project,
  type Agent,
  type ScopeOfWorkAction,
  type KeyResult,
  type Progress,
} from "document-models/scope-of-work";
import { actions } from "document-models/scope-of-work";
import { useEffect, useMemo, useState } from "react";
import { generateId } from "document-model/core";
import BudgetCalculator from "./budgetCalculator.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import { useRemoteBuilderProfiles } from "../hooks/useRemoteBuilderProfiles.js";
import type { RemoteBuilderProfile } from "../utils/graphql-client.js";
interface DeliverablesProps {
  deliverables: DeliverableType[];
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  projects: Project[];
  contributors: Agent[];
}

export const statusOptions = [
  { label: "Wont Do", value: "WONT_DO" },
  { label: "Draft", value: "DRAFT" },
  { label: "To Do", value: "TODO" },
  { label: "Blocked", value: "BLOCKED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Canceled", value: "CANCELED" },
];

export const statusStyles = {
  TODO: "bg-[#fcdfbd] text-[#ffa033] rounded px-2 py-1 font-semibold",
  DRAFT: "bg-[#f0f0f0] text-[#999999] rounded px-2 py-1 font-semibold",
  IN_PROGRESS: "bg-[#bfdffd] text-[#339cff] rounded px-2 py-1 font-semibold",
  FINISHED: "bg-[#f0f0f0] text-[#999999] rounded px-2 py-1 font-semibold",
  BLOCKED: "bg-[#ffaea8] text-[#de3333] rounded px-2 py-1 font-semibold",
  WONT_DO: "bg-[#f0f0f0] text-[#999999] rounded px-2 py-1 font-semibold",
  DELIVERED: "bg-[#c8ecd1] text-[#4fc86f] rounded px-2 py-1 font-semibold",
  CANCELED: "bg-[#f0f0f0] text-[#999999] rounded px-2 py-1 font-semibold",
};

type IconName = "Person" | "Project";

type PHIDOption = {
  value: string;
  title: string;
  description?: string;
  path?: string;
  icon: IconName | React.ReactElement;
};

const convertContributorToOption = (contributor: Agent): PHIDOption => ({
  value: contributor.id,
  title: contributor.name,
  description: "Local contributor",
  icon: "Person",
});

const convertRemoteProfileToOption = (
  profile: RemoteBuilderProfile,
): PHIDOption => ({
  value: profile.id,
  title: profile.state.name || profile.id,
  path: "powerhouse/builder-profile",
  description: profile.state.description || undefined,
  icon: profile.state.icon ? (
    <img
      src={profile.state.icon}
      alt=""
      className="w-6 h-6 rounded-full object-cover"
    />
  ) : (
    "Person"
  ),
});

const Deliverable: React.FC<DeliverablesProps> = ({
  deliverables,
  dispatch,
  projects,
  contributors,
}) => {
  const currentDeliverable = deliverables[0];
  const [stateDeliverable, setStateDeliverable] = useState(currentDeliverable);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const [isSP, setIsSP] = useState(false);
  const [workProgress, setWorkProgress] = useState<Progress | null | undefined>(
    deliverables[0]?.workProgress,
  );
  const [budgetCalculatorOpen, setBudgetCalculatorOpen] = useState(false);
  const [icon, setIcon] = useState(currentDeliverable.icon || "");
  const [ownerPreview, setOwnerPreview] = useState<PHIDOption | null>(null);

  // Create a map of local contributor IDs for the remote profiles hook
  const localProfileMap = useMemo(() => {
    const map = new Map<string, Agent>();
    contributors.forEach((c) => map.set(c.id, c));
    return map;
  }, [contributors]);

  // Fetch remote builder profiles
  const {
    allProfiles: remoteProfiles,
    isLoading: isLoadingRemote,
    profileMap: remoteProfileMap,
  } = useRemoteBuilderProfiles(localProfileMap);

  // Combine local contributors and remote profiles into initial options
  const initialOptions = useMemo<PHIDOption[]>(() => {
    const localOptions = contributors.map(convertContributorToOption);
    const remoteOptions = remoteProfiles.map(convertRemoteProfileToOption);
    return [...localOptions, ...remoteOptions];
  }, [contributors, remoteProfiles]);

  // Fetch options callback for searching
  const fetchOptionsCallback = useMemo(() => {
    return async (userInput: string): Promise<PHIDOption[]> => {
      const searchTerm = userInput.toLowerCase();

      // Search local contributors
      const localMatches = contributors
        .filter((c) => c.name.toLowerCase().includes(searchTerm))
        .map(convertContributorToOption);

      // Search remote profiles
      const remoteMatches = remoteProfiles
        .filter(
          (p) =>
            p.state.name?.toLowerCase().includes(searchTerm) ||
            p.id.toLowerCase().includes(searchTerm),
        )
        .map(convertRemoteProfileToOption);

      const allMatches = [...localMatches, ...remoteMatches];

      if (allMatches.length === 0) {
        return Promise.reject(new Error("No profiles found"));
      }

      return allMatches;
    };
  }, [contributors, remoteProfiles]);

  // Fetch selected option callback for displaying selected value
  const fetchSelectedOptionCallback = useMemo(() => {
    return async (phid: string): Promise<PHIDOption> => {
      // Check local contributors first
      const localContributor = contributors.find((c) => c.id === phid);
      if (localContributor) {
        return convertContributorToOption(localContributor);
      }

      // Check remote profiles
      const remoteProfile = remoteProfileMap.get(phid);
      if (remoteProfile) {
        return convertRemoteProfileToOption(remoteProfile);
      }

      return Promise.reject(new Error("Profile not found"));
    };
  }, [contributors, remoteProfileMap]);

  // Helper to check if a PHID is known (local or remote)
  const isKnownPhid = useMemo(() => {
    return (phid: string): boolean => {
      return localProfileMap.has(phid) || remoteProfileMap.has(phid);
    };
  }, [localProfileMap, remoteProfileMap]);

  useEffect(() => {
    const fetchOwnerPreview = async () => {
      const currentDeliverable = deliverables[0];
      if (currentDeliverable?.owner) {
        try {
          const ownerDetails = await fetchSelectedOptionCallback(
            currentDeliverable.owner,
          );
          setOwnerPreview(ownerDetails);
        } catch {
          setOwnerPreview(null);
        }
      } else {
        setOwnerPreview(null);
      }
    };
    fetchOwnerPreview();
  }, [deliverables, fetchSelectedOptionCallback]);

  useEffect(() => {
    const currentDeliverable = deliverables[0];
    if (!currentDeliverable) return;

    // Reset all flags first
    setIsBoolean(false);
    setIsPercentage(false);
    setIsSP(false);

    if (currentDeliverable.workProgress) {
      if (
        "done" in currentDeliverable.workProgress &&
        !("total" in currentDeliverable.workProgress)
      ) {
        setIsBoolean(true);
      } else if ("value" in currentDeliverable.workProgress) {
        setIsPercentage(true);
      } else if (
        "total" in currentDeliverable.workProgress &&
        "completed" in currentDeliverable.workProgress
      ) {
        setIsSP(true);
      }
    }
    setStateDeliverable(currentDeliverable);
    setWorkProgress(currentDeliverable.workProgress);
    setIcon(currentDeliverable.icon || "");
  }, [deliverables]);

  const columns = useMemo<Array<ColumnDef<KeyResult>>>(() => {
    return [
      {
        field: "title",
        editable: true,
        onSave: (newValue, context) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editKeyResult({
                id: context.row.id,
                deliverableId: currentDeliverable.id,
                title: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "link",
        editable: true,
        onSave: (newValue, context) => {
          if (newValue !== context.row.link) {
            dispatch(
              actions.editKeyResult({
                id: context.row.id,
                deliverableId: currentDeliverable.id,
                link: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
      },
    ];
  }, [currentDeliverable, dispatch]);

  return (
    <div>
      {budgetCalculatorOpen ? (
        <BudgetCalculator
          setBudgetCalculatorOpen={setBudgetCalculatorOpen}
          project={projects.find(
            (p) => p.id === stateDeliverable.budgetAnchor?.project,
          )}
          deliverables={[stateDeliverable]}
          dispatch={dispatch}
        />
      ) : (
        <div className="border border-gray-300 p-4 rounded-md">
          <div className="mt-2 grid grid-cols-8 gap-2">
            <div className="col-span-2">
              <TextInput
                className="w-full"
                label="Code"
                value={stateDeliverable.code}
                onChange={(e) =>
                  setStateDeliverable((prevValue) => ({
                    ...prevValue,
                    code: e.target.value,
                  }))
                }
                onBlur={(e) => {
                  if (e.target.value === "") {
                    dispatch(
                      actions.editDeliverable({
                        id: currentDeliverable.id,
                        code: " ",
                      }),
                    );
                  }
                  if (e.target.value === currentDeliverable.code) return;
                  dispatch(
                    actions.editDeliverable({
                      id: currentDeliverable.id,
                      code: e.target.value,
                    }),
                  );
                }}
              />
            </div>
            <div className="col-span-6">
              <TextInput
                className="w-full"
                label="Title"
                value={stateDeliverable.title}
                onChange={(e) =>
                  setStateDeliverable({
                    ...stateDeliverable,
                    title: e.target.value,
                  })
                }
                onBlur={(e) => {
                  if (e.target.value === "") {
                    dispatch(
                      actions.editDeliverable({
                        id: currentDeliverable.id,
                        title: " ",
                      }),
                    );
                  }
                  if (e.target.value === currentDeliverable.title) return;
                  dispatch(
                    actions.editDeliverable({
                      id: currentDeliverable.id,
                      title: e.target.value,
                    }),
                  );
                }}
              />
            </div>
          </div>
          {/* Deliverable Owner and Icon and Icon Preview */}
          <div className="mt-8 flex items-start gap-3">
            <div className="flex-1 max-w-[350px] min-w-0">
              <PHIDInput
                className="w-full"
                name="owner"
                label="Deliverable Owner"
                placeholder={
                  isLoadingRemote
                    ? "Loading profiles..."
                    : "Search builder name or enter PHID"
                }
                variant="withValueTitleAndDescription"
                value={stateDeliverable.owner || ""}
                autoComplete={true}
                previewPlaceholder={ownerPreview || undefined}
                initialOptions={initialOptions}
                onChange={(newValue) => {
                  if (!stateDeliverable) return;
                  // Update local state
                  setStateDeliverable({
                    ...stateDeliverable,
                    owner: newValue,
                  });

                  // If user selected a known profile, save immediately
                  if (newValue && isKnownPhid(newValue)) {
                    const originalValue = currentDeliverable.owner || "";
                    if (newValue !== originalValue) {
                      dispatch(
                        actions.editDeliverable({
                          id: currentDeliverable.id,
                          owner: newValue,
                        }),
                      );
                    }
                  }
                }}
                onBlur={(e) => {
                  if (!stateDeliverable) return;

                  const originalValue = currentDeliverable.owner || "";
                  const targetValue = e.target.value;

                  // Only dispatch if the value has changed
                  if (targetValue !== originalValue) {
                    dispatch(
                      actions.editDeliverable({
                        id: currentDeliverable.id,
                        owner: targetValue || "",
                      }),
                    );
                  }
                }}
                fetchOptionsCallback={fetchOptionsCallback}
                fetchSelectedOptionCallback={fetchSelectedOptionCallback}
              />
            </div>
            <div className="w-[400px] flex-shrink-0">
              <TextInput
                className="w-full"
                label="Icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    dispatch(
                      actions.editDeliverable({
                        id: currentDeliverable.id,
                        icon: "",
                      }),
                    );
                  }
                  if (e.target.value === currentDeliverable.icon) return;
                  dispatch(
                    actions.editDeliverable({
                      id: currentDeliverable.id,
                      icon: e.target.value,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex-shrink-0 pt-6">
              {icon && (
                <div className="w-[60px] h-[60px] bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={icon}
                    alt="Icon"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden",
                      );
                    }}
                  />
                  <div className="hidden text-xs text-gray-500 truncate">
                    {icon}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mt-8">
            <Textarea
              className="w-full"
              label="Description"
              value={stateDeliverable.description}
              autoExpand={true}
              onChange={(e) =>
                setStateDeliverable({
                  ...stateDeliverable,
                  description: e.target.value,
                })
              }
              onBlur={(e) => {
                if (e.target.value === "") {
                  dispatch(
                    actions.editDeliverable({
                      id: currentDeliverable.id,
                      description: " ",
                    }),
                  );
                }
                if (e.target.value === currentDeliverable.description) return;
                dispatch(
                  actions.editDeliverable({
                    id: currentDeliverable.id,
                    description: e.target.value,
                  }),
                );
              }}
            />
          </div>
          <div className="mt-8 grid grid-cols-8 gap-2">
            <div className="mt-2 w-[150px] col-span-2">
              <Select
                label="Status"
                options={statusOptions}
                value={stateDeliverable.status}
                onChange={(value) => {
                  if (!value) return null;
                  dispatch(
                    actions.editDeliverable({
                      id: currentDeliverable.id,
                      status: value as PmDeliverableStatusInput,
                    }),
                  );
                }}
              />
            </div>
            <div className="col-span-3 flex justify-center items-end">
              <button
                className={`p-2 border border-gray-300 w-12 h-8 text-sm hover:bg-gray-100 ${isBoolean ? "bg-blue-100" : "bg-white"}`}
                onClick={() => {
                  setIsBoolean(true);
                  setIsPercentage(false);
                  setIsSP(false);
                  dispatch(
                    actions.setDeliverableProgress({
                      id: currentDeliverable.id,
                      workProgress: {
                        done: false,
                      },
                    }),
                  );
                }}
              >
                -
              </button>
              <button
                className={`p-2 border border-gray-300 w-12 h-8 text-sm hover:bg-gray-100 ${isPercentage ? "bg-blue-100" : "bg-white"}`}
                onClick={() => {
                  setIsBoolean(false);
                  setIsPercentage(true);
                  setIsSP(false);
                  dispatch(
                    actions.setDeliverableProgress({
                      id: currentDeliverable.id,
                      workProgress: {
                        percentage: 0,
                      },
                    }),
                  );
                }}
              >
                %
              </button>
              <button
                className={`p-2 border border-gray-300 w-12 h-8 text-sm hover:bg-gray-100 ${isSP ? "bg-blue-100" : "bg-white"}`}
                onClick={() => {
                  setIsBoolean(false);
                  setIsPercentage(false);
                  setIsSP(true);
                  dispatch(
                    actions.setDeliverableProgress({
                      id: currentDeliverable.id,
                      workProgress: {
                        storyPoints: {
                          total: 0,
                          completed: 0,
                        },
                      },
                    }),
                  );
                }}
              >
                SP
              </button>
            </div>
            <div className="col-span-3 flex justify-end items-end mr-4">
              {isBoolean && (
                <Checkbox
                  key={`checkbox-${currentDeliverable.id}-${workProgress && "completed" in workProgress ? Boolean(workProgress.completed) : false}`}
                  label="Delivered"
                  // defaultChecked={workProgress && "isBinary" in workProgress ? (workProgress.isBinary ?? false) : false}
                  defaultChecked={
                    workProgress && "done" in workProgress
                      ? Boolean(workProgress.done)
                      : false
                  }
                  onChange={(e: boolean | "indeterminate") => {
                    if (e === "indeterminate") {
                      return;
                    }
                    dispatch(
                      actions.setDeliverableProgress({
                        id: currentDeliverable.id,
                        workProgress: {
                          done: e,
                        },
                      }),
                    );
                  }}
                />
              )}
              {isPercentage && (
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Percentage</label>
                  <input
                    type="number"
                    className="w-16 h-8 border border-gray-300 rounded px-2 bg-white"
                    defaultValue={
                      workProgress && "value" in workProgress
                        ? (workProgress.value ?? 0)
                        : 0
                    }
                    onBlur={(e) => {
                      dispatch(
                        actions.setDeliverableProgress({
                          id: currentDeliverable.id,
                          workProgress: {
                            percentage: parseFloat(e.target.value),
                          },
                        }),
                      );
                    }}
                  />
                </div>
              )}
              {isSP && (
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <label>Completed</label>
                    <input
                      type="number"
                      min={0}
                      max={
                        workProgress && "total" in workProgress
                          ? (workProgress.total ?? 0)
                          : 0
                      }
                      className="w-16 h-8 border border-gray-300 rounded px-2 flex items-end bg-white"
                      value={
                        workProgress && "completed" in workProgress
                          ? Number(workProgress.completed) || 0
                          : 0
                      }
                      onChange={(e) => {
                        const newCompleted = parseInt(e.target.value) || 0;
                        const total =
                          workProgress && "total" in workProgress
                            ? (workProgress.total ?? 0)
                            : 0;
                        // Ensure completed doesn't exceed total
                        const clampedCompleted = Math.min(
                          Math.max(0, newCompleted),
                          total,
                        );
                        setWorkProgress((prev) => {
                          if (prev && "completed" in prev) {
                            return {
                              ...prev,
                              completed: clampedCompleted,
                            };
                          }
                          return prev;
                        });
                      }}
                      onBlur={(e) => {
                        if (workProgress && "completed" in workProgress) {
                          const total =
                            workProgress && "total" in workProgress
                              ? (workProgress.total ?? 0)
                              : 0;
                          const newCompleted = parseInt(e.target.value) || 0;
                          // Ensure completed doesn't exceed total
                          const clampedCompleted = Math.min(
                            Math.max(0, newCompleted),
                            total,
                          );
                          dispatch(
                            actions.setDeliverableProgress({
                              id: currentDeliverable.id,
                              workProgress: {
                                storyPoints: {
                                  total,
                                  completed: clampedCompleted,
                                },
                              },
                            }),
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <label>Total</label>
                    <input
                      type="number"
                      min={0}
                      className="w-16 h-8 border border-gray-300 rounded px-2 flex items-end bg-white"
                      value={
                        workProgress && "total" in workProgress
                          ? (workProgress.total ?? 0)
                          : 0
                      }
                      onChange={(e) => {
                        const newTotal = parseInt(e.target.value) || 0;
                        setWorkProgress((prev) => {
                          if (!prev) return prev;
                          if (prev.completed != null) {
                            // Story-points variant: clamp completed to new total
                            const clampedCompleted = Math.min(
                              prev.completed,
                              newTotal,
                            );
                            return {
                              ...prev,
                              total: newTotal,
                              completed: clampedCompleted,
                            };
                          }
                          return {
                            ...prev,
                            total: newTotal,
                          };
                        });
                      }}
                      onBlur={(e) => {
                        if (workProgress && "total" in workProgress) {
                          const newTotal = parseInt(e.target.value) || 0;
                          const currentCompleted =
                            workProgress && "completed" in workProgress
                              ? (workProgress.completed ?? 0)
                              : 0;
                          // Ensure completed doesn't exceed new total
                          const clampedCompleted = Math.min(
                            currentCompleted,
                            newTotal,
                          );
                          dispatch(
                            actions.setDeliverableProgress({
                              id: currentDeliverable.id,
                              workProgress: {
                                storyPoints: {
                                  total: newTotal,
                                  completed: clampedCompleted,
                                },
                              },
                            }),
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2">
            <div className="col-span-1 gap-2 w-[300px]">
              <Select
                label="Budget Anchor"
                options={projects.map((project) => ({
                  label: project.title,
                  value: project.id,
                }))}
                value={stateDeliverable.budgetAnchor?.project || ""}
                onChange={(value) => {
                  dispatch(
                    actions.setDeliverableBudgetAnchorProject({
                      deliverableId: currentDeliverable.id,
                      project: value as string,
                      unit: "Hours",
                      unitCost: 0,
                      quantity: 0,
                      margin: 0,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex items-center gap-2 col-span-1 align-center">
              <span>Budget Calculator</span>
              <Icon
                className="hover:cursor-pointer hover:bg-gray-500"
                name="Moved"
                size={18}
                onClick={() => {
                  setBudgetCalculatorOpen(true);
                }}
              />
            </div>
          </div>
          <div className="mt-8">
            <label className="text-sm font-medium">Add Key Results</label>
            {currentDeliverable && (
              <ObjectSetTable
                columns={columns}
                data={currentDeliverable.keyResults || []}
                allowRowSelection={true}
                onAdd={(data) => {
                  if (data.title) {
                    dispatch(
                      actions.addKeyResult({
                        id: generateId(),
                        deliverableId: currentDeliverable.id,
                        title: typeof data.title === "string" ? data.title : "",
                      }),
                    );
                  }
                }}
                onDelete={(data) => {
                  if (data.length > 0) {
                    data.forEach((d) => {
                      dispatch(
                        actions.removeKeyResult({
                          id: d.id,
                          deliverableId: currentDeliverable.id,
                        }),
                      );
                    });
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliverable;
