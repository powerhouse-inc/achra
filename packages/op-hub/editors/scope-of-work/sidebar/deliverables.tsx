import { useMemo, useState, useEffect } from "react";
import {
  type Deliverable,
  type Milestone,
  type Project,
  type PmDeliverableStatusInput,
  type ScopeOfWorkAction,
  type ScopeOfWorkDocument,
} from "../../../document-models/scope-of-work/v1/gen/types.js";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
  buildEnumCellEditor,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions } from "document-models/scope-of-work";
import { generateId } from "document-model/core";
import type { Operation } from "document-model";
import { statusOptions, statusStyles } from "./deliverable.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  type EditDeliverableAction,
  type AddDeliverableAction,
  type RemoveDeliverableAction,
  type AddProjectDeliverableAction,
  type AddMilestoneDeliverableAction,
  type AddDeliverableInSetAction,
  type RemoveDeliverableInSetAction,
} from "../../../document-models/scope-of-work/v1/gen/actions.js";

interface ProjectsProps {
  deliverables: Deliverable[] | undefined;
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  milestones: Milestone[] | undefined;
  projects: Project[] | undefined;
  setActiveNodeId: (id: string) => void;
  document: ScopeOfWorkDocument;
}

type LatestActivity = {
  type: string;
  timestamp: string;
  input: unknown;
};

type RichDeliverables = Deliverable & {
  milestoneId: string | null;
  milestoneTitle: string | null;
  projectId: string | null;
  projectTitle: string | null;
  latestActivity: LatestActivity | null;
};

const Deliverables: React.FC<ProjectsProps> = ({
  deliverables,
  dispatch,
  milestones,
  projects,
  setActiveNodeId,
  document,
}) => {
  const [stateMilestones, setStateMilestones] = useState(milestones);
  const [stateProjects, setStateProjects] = useState(projects);

  useEffect(() => {
    setStateMilestones(milestones);
    setStateProjects(projects);
  }, [milestones, projects, deliverables]);

  const latestActivity = (document.operations.global ?? []).filter(
    (operation) => {
      const typedOperation = operation as Operation & {
        timestampUtcMs: string;
        action:
          | EditDeliverableAction
          | AddDeliverableAction
          | RemoveDeliverableAction
          | AddProjectDeliverableAction
          | AddMilestoneDeliverableAction
          | AddDeliverableInSetAction
          | RemoveDeliverableInSetAction;
      };
      return (
        typedOperation.action.type === "EDIT_DELIVERABLE" ||
        typedOperation.action.type === "ADD_DELIVERABLE" ||
        typedOperation.action.type === "REMOVE_DELIVERABLE" ||
        typedOperation.action.type === "ADD_PROJECT_DELIVERABLE" ||
        typedOperation.action.type === "ADD_MILESTONE_DELIVERABLE" ||
        typedOperation.action.type === "ADD_DELIVERABLE_IN_SET" ||
        typedOperation.action.type === "REMOVE_DELIVERABLE_IN_SET"
      );
    },
  ) as (Operation & {
    timestampUtcMs: string;
    action:
      | EditDeliverableAction
      | AddDeliverableAction
      | RemoveDeliverableAction
      | AddProjectDeliverableAction
      | AddMilestoneDeliverableAction
      | AddDeliverableInSetAction
      | RemoveDeliverableInSetAction;
  })[];

  // Create a map of deliverable IDs to their latest activity
  const latestActivityMap = new Map<string, LatestActivity>();
  latestActivity?.forEach((activity) => {
    if ("id" in activity.action.input && activity.action.input.id) {
      latestActivityMap.set(activity.action.input.id, {
        type: activity.action.type,
        timestamp: activity.timestampUtcMs,
        input: activity.action.input,
      });
    } else if (
      "deliverableId" in activity.action.input &&
      activity.action.input.deliverableId
    ) {
      latestActivityMap.set(activity.action.input.deliverableId, {
        type: activity.action.type,
        timestamp: activity.timestampUtcMs,
        input: activity.action.input,
      });
    }
  });

  const richDeliverables = useMemo(() => {
    // Create a map to track processed deliverable IDs to avoid duplicates
    const processedIds = new Set();
    const result: RichDeliverables[] = [];

    // Helper function to add deliverable if not already processed
    const addDeliverableIfNotProcessed = (
      deliverable: Deliverable,
      milestoneId: string | null,
      milestoneTitle: string | null,
      projectId: string | null,
      projectTitle: string | null,
    ) => {
      if (!deliverable || processedIds.has(deliverable.id)) return;

      processedIds.add(deliverable.id);
      result.push({
        ...deliverable,
        milestoneId,
        milestoneTitle,
        projectId,
        projectTitle,
        latestActivity: latestActivityMap.get(deliverable.id) || null,
      });
    };

    // Process deliverables from milestones
    milestones?.forEach((milestone) => {
      milestone.scope?.deliverables?.forEach((deliverableId) => {
        const deliverable = deliverables?.find((d) => d.id === deliverableId);
        if (!deliverable) return;

        // Check if this deliverable is also in a project
        const project = projects?.find((p) =>
          p.scope?.deliverables?.includes(deliverableId),
        );

        addDeliverableIfNotProcessed(
          deliverable,
          milestone.id,
          milestone.title,
          project?.id || null,
          project?.title || null,
        );
      });
    });

    // Process deliverables from projects (only if not already processed)
    projects?.forEach((project) => {
      project.scope?.deliverables?.forEach((deliverableId) => {
        const deliverable = deliverables?.find((d) => d.id === deliverableId);
        if (!deliverable) return;

        // Check if this deliverable is also in a milestone
        const milestone = milestones?.find((m) =>
          m.scope?.deliverables?.includes(deliverableId),
        );

        addDeliverableIfNotProcessed(
          deliverable,
          milestone?.id || null,
          milestone?.title || null,
          project.id,
          project.title,
        );
      });
    });

    // Process standalone deliverables (only if not already processed)
    deliverables?.forEach((deliverable) => {
      addDeliverableIfNotProcessed(deliverable, null, null, null, null);
    });

    return result.sort((a, b) => {
      if (a?.title && b?.title) {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [milestones, projects, deliverables, latestActivityMap]);

  const columns = useMemo<Array<ColumnDef<RichDeliverables>>>(
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
        title: "Title",
        editable: true,
        sortable: true,
        align: "center",
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
        field: "status",
        title: "Status",
        type: "enum",
        editable: true,
        sortable: true,
        valueGetter: (row) => row.status,
        align: "center",
        renderCell: (value, context) => {
          if (!value) return "";
          return (
            <div
              className={`text-center ${statusStyles[context.row.status as keyof typeof statusStyles]}`}
            >
              {statusOptions.find((option) => option.value === value)?.label}
            </div>
          );
        },
        renderCellEditor: buildEnumCellEditor({
          className: "w-[130px]",
          options: statusOptions,
        }),
        onSave: (newValue, context) => {
          if (newValue !== context.row.status) {
            dispatch(
              actions.editDeliverable({
                id: context.row.id,
                status: newValue as PmDeliverableStatusInput,
              }),
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "milestoneTitle",
        title: "Milestone",
        editable: true,
        sortable: true,
        align: "center",
        valueGetter: (row) => row.milestoneId,
        onSave: (newValue, context) => {
          if (newValue !== context.row.milestoneId) {
            const actionsToDispatch: ScopeOfWorkAction[] = [];
            if (context.row.milestoneId) {
              actionsToDispatch.push(
                actions.removeDeliverableInSet({
                  deliverableId: context.row.id,
                  milestoneId: context.row.milestoneId,
                }),
              );
            }
            actionsToDispatch.push(
              actions.addDeliverableInSet({
                deliverableId: context.row.id,
                milestoneId: newValue as string,
              }),
            );
            dispatch(actionsToDispatch);
            return true;
          }
          return false;
        },
        renderCellEditor: buildEnumCellEditor({
          className: "w-[300px]",
          options:
            stateMilestones?.map((milestone) => ({
              label: milestone.title,
              value: milestone.id,
            })) || [],
        }),
        renderCell: (value, context) => {
          if (!context.row.title) return "";
          return (
            <div className="flex items-center justify-center">
              {context.row.milestoneId && (
                <span>
                  <Icon
                    className="hover:cursor-pointer"
                    name="Moved"
                    size={12}
                    onClick={() => {
                      setActiveNodeId(`milestone.${context.row.milestoneId}`);
                    }}
                  />
                </span>
              )}
              <div className="text-center mx-1">
                {context.row.milestoneTitle}
              </div>
            </div>
          );
        },
      },
      {
        field: "projectTitle",
        title: "Project",
        editable: true,
        sortable: true,
        align: "center",
        valueGetter: (row) => row.projectId,
        onSave: (newValue, context) => {
          if (newValue !== context.row.projectId) {
            if (context.row.projectId) {
              dispatch(
                actions.removeDeliverableInSet({
                  deliverableId: context.row.id,
                  projectId: context.row.projectId,
                }),
              );
            }
            dispatch(
              actions.addDeliverableInSet({
                deliverableId: context.row.id,
                projectId: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
        renderCellEditor: buildEnumCellEditor({
          className: "w-[300px]",
          options:
            stateProjects?.map((project) => ({
              label: project.title,
              value: project.id,
            })) || [],
        }),
        renderCell: (value, context) => {
          if (!context.row.title) return "";
          return (
            <div className="flex items-center justify-center">
              {context.row.projectId && (
                <span>
                  <Icon
                    className="hover:cursor-pointer"
                    name="Moved"
                    size={12}
                    onClick={() => {
                      setActiveNodeId(`project.${context.row.projectId}`);
                    }}
                  />
                </span>
              )}
              <div className="text-center mx-1">{context.row.projectTitle}</div>
            </div>
          );
        },
      },
      {
        field: "latestActivity",
        title: "Latest Activity",
        editable: false,
        align: "center",
        renderCell: (value, context) => {
          if (!context.row.latestActivity) return "";
          const activityText = parseLatestActivity(context.row.latestActivity);
          const [activity, time] = activityText.split("\n");
          return (
            <div className="text-xs text-center">
              <div>{activity}</div>
              <div className="text-gray-500">{time}</div>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-4">
        <h3 className="flex justify-center items-center font-bold text-gray-700 mb-2">
          Deliverables
        </h3>
        <ObjectSetTable
          columns={columns}
          data={richDeliverables || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (data.length > 0) {
              data.forEach((d) => {
                dispatch(actions.removeDeliverable({ id: d.id }));
              });
            }
          }}
          onAdd={(data) => {
            if (data.title) {
              const deliverableId = generateId();
              dispatch(
                actions.addDeliverable({
                  id: deliverableId,
                  title: data.title as string,
                }),
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default Deliverables;

const parseLatestActivity = (latestActivity: LatestActivity) => {
  if (!latestActivity) {
    return "";
  }

  let activity;

  if (
    latestActivity.type === "ADD_DELIVERABLE" ||
    latestActivity.type === "ADD_PROJECT_DELIVERABLE" ||
    latestActivity.type === "ADD_MILESTONE_DELIVERABLE"
  ) {
    activity = "Added Deliverable";
  } else if (
    latestActivity.type === "EDIT_DELIVERABLE" ||
    latestActivity.type === "ADD_DELIVERABLE_IN_SET" ||
    latestActivity.type === "REMOVE_DELIVERABLE_IN_SET"
  ) {
    activity = `Edited ${Object.keys(latestActivity.input as object).at(1)}`;
  }

  // Always show the activity, even if timestamp fails
  let timeDisplay = "";

  if (latestActivity.timestamp) {
    const currentTime = new Date();
    let activityTime;

    // Try different timestamp parsing approaches
    if (typeof latestActivity.timestamp === "string") {
      // Handle string timestamps
      activityTime = new Date(latestActivity.timestamp);
    } else if (typeof latestActivity.timestamp === "number") {
      // Handle numeric timestamps (could be milliseconds or seconds)
      if (latestActivity.timestamp > 1e10) {
        // Looks like milliseconds
        activityTime = new Date(latestActivity.timestamp);
      } else {
        // Looks like seconds, convert to milliseconds
        activityTime = new Date(latestActivity.timestamp * 1000);
      }
    } else if ((latestActivity.timestamp as any) instanceof Date) {
      // Already a Date object
      activityTime = latestActivity.timestamp;
    } else {
      // Try to convert anyway
      activityTime = new Date(latestActivity.timestamp);
    }

    // Check if the date is valid
    if (!isNaN(activityTime.getTime())) {
      const timeSince = currentTime.getTime() - activityTime.getTime();
      const timeSinceInMinutes = Math.abs(timeSince / (1000 * 60));
      const timeSinceInHours = timeSinceInMinutes / 60;
      const timeSinceInDays = timeSinceInHours / 24;

      if (timeSinceInDays >= 1) {
        timeDisplay = `${Math.round(timeSinceInDays)} days ago`;
      } else if (timeSinceInHours >= 1) {
        timeDisplay = `${Math.round(timeSinceInHours)} hours ago`;
      } else if (timeSinceInMinutes >= 1) {
        timeDisplay = `${Math.round(timeSinceInMinutes)} minutes ago`;
      } else {
        timeDisplay = "Just now";
      }
    } else {
      // Debug: log the problematic timestamp with more details
      console.log("Invalid timestamp format:", {
        timestamp: latestActivity.timestamp,
        type: typeof latestActivity.timestamp,
        parsed: activityTime,
        isValid: !isNaN(activityTime.getTime()),
      });
      timeDisplay = "Recently";
    }
  }

  return `${activity}\n${timeDisplay}`;
};
