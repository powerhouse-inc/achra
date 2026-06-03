import {
  type Deliverable as DeliverableType,
  type Project as ProjectType,
  type PmBudgetTypeInput,
  type PmCurrencyInput,
  type Agent,
  type ScopeOfWorkAction,
} from "../../../document-models/scope-of-work/v1/gen/types.js";
import { useMemo, useState, useEffect } from "react";
import {
  TextInput,
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
  Textarea,
  PHIDInput,
  Select,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions } from "document-models/scope-of-work";
import { generateId } from "document-model/core";
import BudgetCalculator from "./budgetCalculator.js";
import ProgressBar from "../components/progressBar.js";
import { statusStyles } from "./deliverable.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import { useRemoteBuilderProfiles } from "../hooks/useRemoteBuilderProfiles.js";
import type { RemoteBuilderProfile } from "../utils/graphql-client.js";

interface ProjectProps {
  project: ProjectType | undefined;
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  deliverables: DeliverableType[];
  setActiveNodeId: (id: string) => void;
  contributors: Agent[];
}

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

const Project: React.FC<ProjectProps> = ({
  project,
  dispatch,
  deliverables,
  setActiveNodeId,
  contributors,
}) => {
  const [code, setCode] = useState(project?.code);
  const [title, setTitle] = useState(project?.title);
  const [slug, setSlug] = useState(project?.slug || "");
  const [projectOwner, setProjectOwner] = useState(
    project?.projectOwner as string,
  );
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [projectAbstract, setProjectAbstract] = useState(
    project?.abstract ?? "",
  );
  const [budget, setBudget] = useState(project?.budget || 0);
  const [budgetCalculatorOpen, setBudgetCalculatorOpen] = useState(false);
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
      if (project?.projectOwner) {
        try {
          const ownerDetails = await fetchSelectedOptionCallback(
            project.projectOwner,
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
  }, [project, fetchSelectedOptionCallback]);

  useEffect(() => {
    if (!project) return;
    setCode(project.code || "");
    setBudget(project.budget || 0);
    setTitle(project.title || "");
    setSlug(project.slug || "");
    setProjectOwner(project.projectOwner || "");
    setImageUrl(project.imageUrl || "");
    setProjectAbstract(project.abstract || "");
  }, [project]);

  const projectDeliverablesIds = project?.scope?.deliverables ?? [];
  const projectDeliverables = deliverables.filter((d) =>
    projectDeliverablesIds.includes(d.id),
  );

  // Validate image URL by checking file extension
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    const validExtensions = [".jpg", ".jpeg", ".png", ".svg"];
    return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const columns = useMemo<Array<ColumnDef<DeliverableType>>>(
    () => [
      {
        field: "link",
        width: 20,
        align: "center",
        renderCell: (value, context) => {
          if (!context.row?.id) return <div className="w-2"></div>;
          return (
            <div className="text-center">
              <Icon
                className="hover:cursor-pointer"
                name="Moved"
                size={18}
                onClick={() => {
                  setActiveNodeId(`deliverable.${context.row.id}`);
                }}
              />
            </div>
          );
        },
      },
      {
        field: "title",
        editable: true,
        onSave: (newValue, context) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editDeliverable({
                id: context.row.id,
                title: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
        renderCell: (value) => {
          if (value === "") {
            return (
              <div className="font-light italic text-left text-gray-500">
                + Double-click to add new deliverable (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "owner",
        editable: false,
        align: "center",
        onSave: (newValue, context) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editDeliverable({
                id: context.row.id,
                owner: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
        renderCell: (value, context) => {
          if (!context.row.owner) return null;
          return (
            <div className="text-center">
              {contributors.find((c) => c.id === context.row.owner)?.name ??
                context.row.owner}
            </div>
          );
        },
      },
      {
        field: "workProgress",
        title: "Progress",
        editable: false,
        align: "center",
        width: 200,
        renderCell: (value, context) => {
          const progress = context.row?.workProgress || null;
          if (!progress) return null;
          return <ProgressBar progress={progress} />;
        },
      },
      {
        field: "status",
        title: "Status",
        editable: false,
        align: "center",
        width: 100,
        renderCell: (value) => {
          return (
            <span
              className={`flex items-center justify-center ${statusStyles[value as keyof typeof statusStyles]}`}
            >
              {value}
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      {budgetCalculatorOpen ? (
        <BudgetCalculator
          setBudgetCalculatorOpen={setBudgetCalculatorOpen}
          project={project}
          deliverables={projectDeliverables}
          dispatch={dispatch}
        />
      ) : (
        <div className="border border-gray-300 p-4 rounded-md">
          <div className="mt-2">
            <TextInput
              className="w-full"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => {
                if (!project) return;
                const newTitle = e.target.value;
                if (newTitle === project.title) return;
                const newSlug = newTitle
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .concat(`-${project.id.substring(project.id.length - 8)}`);

                dispatch(
                  actions.updateProject({
                    id: project.id,
                    title: newTitle,
                    slug: newSlug,
                  }),
                );

                // Update local state for slug
                setSlug(newSlug);
              }}
            />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="col-span-1 max-w-[200px]">
              <TextInput
                className="w-full"
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onBlur={(e) => {
                  if (!project) return;
                  if (e.target.value === project.code) return;
                  dispatch(
                    actions.updateProject({
                      id: project.id,
                      code: e.target.value,
                    }),
                  );
                }}
              />
            </div>
            <div className="col-span-1">
              <TextInput
                className="w-full"
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                onBlur={(e) => {
                  if (!project) return;
                  if (e.target.value === project.slug) return;
                  dispatch(
                    actions.updateProject({
                      id: project.id,
                      slug: e.target.value,
                    }),
                  );
                }}
              />
            </div>
          </div>
          {/* Project Owner and Image URL */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <PHIDInput
                className="w-full"
                name="projectOwner"
                label="Project Owner"
                placeholder={
                  isLoadingRemote
                    ? "Loading profiles..."
                    : "Search builder name or enter PHID"
                }
                variant="withValueTitleAndDescription"
                value={projectOwner || ""}
                autoComplete={true}
                previewPlaceholder={ownerPreview || undefined}
                initialOptions={initialOptions}
                onChange={(newValue) => {
                  // Update local state
                  setProjectOwner(newValue);

                  // If user selected a known profile, save immediately
                  if (newValue && isKnownPhid(newValue) && project) {
                    const originalValue = project.projectOwner || "";
                    if (newValue !== originalValue) {
                      dispatch(
                        actions.updateProjectOwner({
                          id: project.id,
                          projectOwner: newValue,
                        }),
                      );
                    }
                  }
                }}
                onBlur={(e) => {
                  if (!project) return;

                  const originalValue = project.projectOwner || "";
                  const targetValue = e.target.value;

                  // Only dispatch if the value has changed
                  if (targetValue !== originalValue) {
                    dispatch(
                      actions.updateProjectOwner({
                        id: project.id,
                        projectOwner: targetValue || "",
                      }),
                    );
                  }
                }}
                fetchOptionsCallback={fetchOptionsCallback}
                fetchSelectedOptionCallback={fetchSelectedOptionCallback}
              />
            </div>
            <div className="col-span-1">
              <TextInput
                label="Cover Image"
                className="w-full"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onBlur={(e) => {
                  if (project && e.target.value !== project.imageUrl) {
                    dispatch(
                      actions.updateProject({
                        id: project.id,
                        imageUrl: e.target.value,
                      }),
                    );
                  }
                }}
                errors={
                  imageUrl && !isValidImageUrl(imageUrl)
                    ? [
                        "Invalid image URL. Must end with .jpg, .jpeg, .png, or .svg",
                      ]
                    : []
                }
              />
            </div>
            <div className="col-span-1 flex justify-center items-start align-end pt-6">
              {imageUrl && (
                <div>
                  {isValidImageUrl(imageUrl) ? (
                    <img
                      src={imageUrl}
                      alt="Project cover"
                      className="w-[100px] h-[100px] object-cover rounded border"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] bg-red-100 border border-red-300 rounded flex items-center justify-center text-red-500 text-xs">
                      Invalid
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mt-2">
            <Textarea
              className="w-full"
              label="Abstract"
              value={projectAbstract}
              autoExpand={true}
              onChange={(e) => setProjectAbstract(e.target.value)}
              onBlur={(e) => {
                if (!project) return;
                if (e.target.value === project.abstract) return;
                dispatch(
                  actions.updateProject({
                    id: project.id,
                    abstract: e.target.value,
                  }),
                );
              }}
            />
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            <div>
              <Select
                label="Budget Type"
                options={[
                  { label: "Contingency", value: "CONTINGENCY" },
                  { label: "Opex", value: "OPEX" },
                  { label: "Capex", value: "CAPEX" },
                  { label: "Overhead", value: "OVERHEAD" },
                ]}
                value={project?.budgetType as string}
                onChange={(value) => {
                  dispatch(
                    actions.updateProject({
                      id: project?.id as string,
                      budgetType: value as PmBudgetTypeInput,
                    }),
                  );
                }}
              />
            </div>
            <div>
              <Select
                label="Currency"
                options={[
                  { label: "DAI", value: "DAI" },
                  { label: "USDS", value: "USDS" },
                  { label: "EUR", value: "EUR" },
                  { label: "USD", value: "USD" },
                ]}
                value={project?.currency as string}
                onChange={(value) => {
                  dispatch(
                    actions.updateProject({
                      id: project?.id as string,
                      currency: value as PmCurrencyInput,
                    }),
                  );
                }}
              />
            </div>
            <div>
              <TextInput
                name="budget"
                label="Budget"
                value={Intl.NumberFormat("en-US").format(
                  parseFloat(budget.toFixed(2)),
                )}
                disabled={true}
                onChange={(e) => setBudget(e.target.value as any)}
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
          {/* Progress Bar */}
          <div className="mt-8 mb-4 w-80">
            <div className="flex items-center gap-2 mb-2">
              <label>
                Progress
                <div className="relative inline-block ml-2">
                  <div className="group">
                    <Icon
                      name="CircleInfo"
                      size={12}
                      className="text-gray-500 hover:text-gray-700 cursor-help"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                      Set every deliverable to story points to get a more
                      accurate estimate
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="border border-gray-300 rounded-md px-2 pt-4 pb-8 ">
              <ProgressBar progress={project?.scope?.progress} />
            </div>
          </div>
          <div className="mt-8">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Deliverables
            </label>
            <ObjectSetTable
              columns={columns}
              data={projectDeliverables}
              allowRowSelection={true}
              onDelete={(data) => {
                if (!project) return;
                if (data.length > 0) {
                  data.forEach((d) => {
                    dispatch(
                      actions.removeProjectDeliverable({
                        projectId: project?.id,
                        deliverableId: d.id,
                      }),
                    );
                  });
                }
              }}
              onAdd={(data) => {
                if (data.title) {
                  if (!project) return;
                  const deliverableId = generateId();
                  dispatch(
                    actions.addProjectDeliverable({
                      projectId: project.id,
                      deliverableId: deliverableId,
                      title: data.title as string,
                    }),
                  );
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
