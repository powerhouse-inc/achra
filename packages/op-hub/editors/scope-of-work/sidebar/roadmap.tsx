import {
  actions,
  type ScopeOfWorkAction,
} from "../../../document-models/scope-of-work/v1/index.js";
import type {
  Roadmap as RoadmapType,
  Milestone as MilestoneType,
} from "../../../document-models/scope-of-work/v1/gen/types.js";
import { Textarea, TextInput } from "@powerhousedao/document-engineering";
import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@powerhousedao/design-system";
import { generateId } from "document-model/core";
import {
  ObjectSetTable,
  type ColumnAlignment,
  type ColumnDef,
} from "@powerhousedao/document-engineering";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";

interface RoadmapsProps {
  roadmaps: RoadmapType[];
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  setActiveNodeId: (id: string) => void;
}

const Roadmap: React.FC<RoadmapsProps> = ({
  roadmaps,
  dispatch,
  setActiveNodeId,
}) => {
  const roadmap = roadmaps[0];

  // Controlled state for title and description
  const [title, setTitle] = useState(roadmap?.title || "");
  const [description, setDescription] = useState(roadmap?.description || "");
  const [slug, setSlug] = useState(roadmap?.slug || "");

  // Update state when roadmap changes
  useEffect(() => {
    setTitle(roadmap?.title || "");
    setDescription(roadmap?.description || "");
    setSlug(roadmap?.slug || "");
  }, [roadmap?.id]);

  const columns = useMemo<Array<ColumnDef<MilestoneType>>>(
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
                  setActiveNodeId(`milestone.${context.row.id}`);
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
        align: "center",
        onSave: (newValue, context) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editMilestone({
                id: context.row.id,
                roadmapId: roadmap.id,
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
                + Double-click to add new milestone (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "coordinators",
        title: "Coordinators",
        align: "center",
        editable: true,
        onSave: (newValue, context) => {
          if (Array.isArray(newValue)) {
            newValue.forEach((id) => {
              if (typeof id !== "string") {
                throw new Error(`Invalid id: ${id}`);
              }
              const coordinator = context.row.coordinators.find(
                (c) => c === id,
              );
              if (!coordinator) {
                dispatch(
                  actions.addCoordinator({
                    id: id,
                    milestoneId: context.row.id,
                  }),
                );
              }
            });
            return true;
          }
          if (typeof newValue === "string") {
            if (newValue === "") {
              context.row.coordinators.forEach((c) => {
                dispatch(
                  actions.removeCoordinator({
                    id: c,
                    milestoneId: context.row.id,
                  }),
                );
              });
              return true;
            }
            const multipleValues = newValue
              .split(",")
              .map((value) => value.trim());
            multipleValues.forEach((value) => {
              const coordinator = context.row.coordinators.find(
                (c) => c === value,
              );
              if (!coordinator) {
                dispatch(
                  actions.addCoordinator({
                    id: value,
                    milestoneId: context.row.id,
                  }),
                );
              }
              return true;
            });
          }
          return false;
        },
      },
      {
        field: "deliveryTarget",
        title: "Delivery Target",
        editable: true,
        align: "center",
        width: 200,
        onSave: (newValue, context) => {
          if (newValue === "") {
            dispatch(
              actions.editMilestone({
                id: context.row.id,
                roadmapId: roadmap.id,
                deliveryTarget: " ",
              }),
            );
            return true;
          }
          if (newValue !== context.row.deliveryTarget || newValue === "") {
            dispatch(
              actions.editMilestone({
                id: context.row.id,
                roadmapId: roadmap.id,
                deliveryTarget: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
        renderCell: (value) => {
          if (!value) return null;
          return (
            <div className="text-center">
              {new Date(value as string).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => {
            const newTitle = e.target.value;
            const newSlug = newTitle
              .toLowerCase()
              .replace(/ /g, "-")
              .concat(`-${roadmap.id.substring(roadmap.id.length - 8)}`);

            dispatch(
              actions.editRoadmap({
                id: roadmap.id,
                title: newTitle,
                slug: newSlug,
              }),
            );

            // Update local state for slug
            setSlug(newSlug);
          }}
        />
      </div>
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          onBlur={(e) => {
            dispatch(
              actions.editRoadmap({
                id: roadmap.id,
                slug: e.target.value,
              }),
            );
          }}
        />
      </div>
      <div className="mt-4">
        <Textarea
          className="w-full"
          label="Description"
          value={description}
          autoExpand={true}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={(e) => {
            dispatch(
              actions.editRoadmap({
                id: roadmap.id,
                description: e.target.value,
              }),
            );
          }}
        />
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Milestones
        </label>
        <ObjectSetTable
          columns={columns}
          data={roadmap.milestones || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!roadmap) return;
            dispatch(
              actions.removeMilestone({
                id: data[0].id,
                roadmapId: roadmap.id,
              }),
            );
          }}
          onAdd={(data) => {
            if (data.title) {
              console.log("title", data.title);
              dispatch(
                actions.addMilestone({
                  id: generateId(),
                  roadmapId: roadmap.id,
                  title: data.title as string,
                }),
              );
            } else if (data.deliveryTarget) {
              console.log("deliveryTarget", data.deliveryTarget);
              dispatch(
                actions.addMilestone({
                  id: generateId(),
                  roadmapId: roadmap.id,
                  deliveryTarget: data.deliveryTarget as string,
                }),
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default Roadmap;
