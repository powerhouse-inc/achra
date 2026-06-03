import {
  DatePicker,
  ObjectSetTable,
  type ColumnDef,
  Textarea,
  TextInput,
  type ColumnAlignment,
  Select,
} from "@powerhousedao/document-engineering";
import {
  type Milestone as MilestoneType,
  type Roadmap,
  type Deliverable,
  type DeliverableSetStatusInput,
  type Agent,
  type ScopeOfWorkAction,
} from "document-models/scope-of-work";
import { actions } from "document-models/scope-of-work";
import { useEffect, useMemo, useState } from "react";
import { generateId } from "document-model/core";
import { Icon } from "@powerhousedao/design-system";
import ProgressBar from "../components/progressBar.js";
import { statusStyles } from "./deliverable.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";

interface MilestonesProps {
  roadmaps: Roadmap[];
  milestones: MilestoneType[];
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  deliverables: Deliverable[];
  setActiveNodeId: (id: string) => void;
  contributors: Agent[];
}

const Milestone: React.FC<MilestonesProps> = ({
  milestones,
  roadmaps,
  dispatch,
  deliverables,
  setActiveNodeId,
  contributors,
}) => {
  const milestone = milestones[0];
  const roadmap = roadmaps.find((r) => {
    return r.milestones.some((m) => m.id === milestone.id);
  });
  const milestoneDeliverablesIds = milestone.scope?.deliverables ?? [];
  const milestoneDeliverables = deliverables.filter((m) =>
    milestoneDeliverablesIds.includes(m.id),
  );

  const [stateMilestone, setStateMilestone] = useState(milestone);

  useEffect(() => {
    setStateMilestone(milestone);
  }, [milestone]);

  const columns = useMemo<Array<ColumnDef<Deliverable>>>(
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
          const contributor = contributors.find((c) => c.id === value);
          return (
            <div className="text-center">
              {contributor?.name ?? context.row.owner}
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
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-2 grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <TextInput
            className="w-full"
            label="Code"
            value={stateMilestone.sequenceCode}
            onChange={(e) =>
              setStateMilestone((prevValue) => ({
                ...prevValue,
                sequenceCode: e.target.value,
              }))
            }
            onBlur={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.title) return;
              dispatch(
                actions.editMilestone({
                  id: milestone.id,
                  roadmapId: roadmap.id,
                  sequenceCode: e.target.value,
                }),
              );
            }}
          />
        </div>
        <div className="col-span-4">
          <TextInput
            className="w-full"
            label="Title"
            value={stateMilestone.title}
            onChange={(e) =>
              setStateMilestone((prevValue) => ({
                ...prevValue,
                title: e.target.value,
              }))
            }
            onBlur={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.title) return;
              dispatch(
                actions.editMilestone({
                  id: milestone.id,
                  roadmapId: roadmap.id,
                  title: e.target.value,
                }),
              );
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            className="w-full"
            label="Status"
            value={stateMilestone.scope?.status}
            options={[
              { label: "Draft", value: "DRAFT" },
              { label: "To Do", value: "TODO" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Finished", value: "FINISHED" },
              { label: "Cancelled", value: "CANCELED" },
            ]}
            onChange={(value) => {
              dispatch(
                actions.editDeliverablesSet({
                  milestoneId: milestone.id,
                  status: value as DeliverableSetStatusInput,
                }),
              );
            }}
          />
        </div>
      </div>
      {/* Coordinators and Delivery Target */}
      <div className="mt-8 grid grid-cols-8 gap-2">
        <div className="col-span-4">
          <TextInput
            className="w-full"
            label="Coordinators"
            value={stateMilestone.coordinators.join(", ")}
            onChange={(e) =>
              setStateMilestone((prevValue) => ({
                ...prevValue,
                coordinators: e.target.value.split(", "),
              }))
            }
            onBlur={(e) => {
              if (!roadmap) return;
              if (e.target.value === milestone.coordinators.join(", ")) return;
              if (e.target.value === "") {
                milestone.coordinators.forEach((c) => {
                  dispatch(
                    actions.removeCoordinator({
                      id: c,
                      milestoneId: milestone.id,
                    }),
                  );
                });
                return;
              }
              dispatch(
                actions.addCoordinator({
                  id: e.target.value,
                  milestoneId: milestone.id,
                }),
              );
            }}
          />
        </div>
        <div className="col-span-3 flex justify-end">
          <DatePicker
            key={stateMilestone.id}
            className="w-full bg-white"
            name="deliveryTarget"
            label="Delivery Target"
            value={stateMilestone.deliveryTarget}
            onChange={(e) => {
              if (!roadmap) return;
              if (e.target.value === stateMilestone.deliveryTarget) return;
              dispatch(
                actions.editMilestone({
                  id: milestone.id,
                  roadmapId: roadmap.id,
                  deliveryTarget: e.target.value,
                }),
              );
            }}
          />
        </div>
      </div>
      {/* Description */}
      <div className="mt-2">
        <Textarea
          className="w-full"
          label="Description"
          value={stateMilestone.description}
          autoExpand={true}
          onChange={(e) =>
            setStateMilestone((prevValue) => ({
              ...prevValue,
              description: e.target.value,
            }))
          }
          onBlur={(e) => {
            if (!roadmap) return;
            if (e.target.value === milestone.description) return;
            dispatch(
              actions.editMilestone({
                id: milestone.id,
                roadmapId: roadmap.id,
                description: e.target.value,
              }),
            );
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="min-w-[100px]">
          <label>Budget</label>
          <p className="text-sm rounded-md border border-gray-300 p-2 bg-gray-100 w-32 text-right">
            {Intl.NumberFormat("en-US").format(milestone.budget || 0)}
          </p>
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
                    Set every deliverable to story points to get a more accurate
                    estimate
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div className="border border-gray-300 rounded-md px-2 pt-4 pb-8 ">
            <ProgressBar progress={milestone?.scope?.progress} />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Deliverables
        </label>
        <ObjectSetTable
          columns={columns}
          data={milestoneDeliverables}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!milestoneDeliverables || data.length === 0) return;
            if (data.length > 0) {
              data.forEach((d) => {
                dispatch(
                  actions.removeMilestoneDeliverable({
                    milestoneId: milestone.id,
                    deliverableId: d.id,
                  }),
                );
              });
            }
          }}
          onAdd={(data) => {
            if (data.title) {
              if (!roadmap) return;
              const deliverableId = generateId();
              dispatch(
                actions.addMilestoneDeliverable({
                  milestoneId: milestone.id,
                  deliverableId: deliverableId,
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

export default Milestone;
