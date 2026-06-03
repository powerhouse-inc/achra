import { useMemo } from "react";
import type {
  Roadmap,
  ScopeOfWorkAction,
} from "../../../document-models/scope-of-work/v1/gen/types.js";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions } from "document-models/scope-of-work";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";

interface ProjectsProps {
  roadmaps: Roadmap[] | undefined;
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  setActiveNodeId: (id: string) => void;
}

const Roadmaps: React.FC<ProjectsProps> = ({
  roadmaps,
  dispatch,
  setActiveNodeId,
}) => {
  const columns = useMemo<Array<ColumnDef<Roadmap>>>(
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
                  setActiveNodeId(`roadmap.${context.row.id}`);
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
        align: "left",
        onSave: (newValue, context) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.editRoadmap({
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
                + Double-click to add new roadmap (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-left">{value}</div>;
        },
      },
    ],
    [],
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="mt-4">
        <h3 className="flex justify-center items-center font-bold text-gray-700 mb-2">
          Roadmaps
        </h3>
        <ObjectSetTable
          columns={columns}
          data={roadmaps || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!roadmaps || data.length === 0) return;
            dispatch(actions.removeRoadmap({ id: data[0].id }));
          }}
          onAdd={(data) => {
            if (data.title) {
              const newId = generateId();
              dispatch(
                actions.addRoadmap({
                  id: newId,
                  title: data.title as string,
                  slug: (data.title as string)
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .concat(`-${newId.substring(newId.length - 8)}`),
                }),
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default Roadmaps;
