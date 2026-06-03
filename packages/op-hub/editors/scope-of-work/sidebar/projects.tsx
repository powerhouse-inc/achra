import { useMemo } from "react";
import {
  type Agent,
  type Project,
  type ScopeOfWorkAction,
} from "../../../document-models/scope-of-work/v1/gen/types.js";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import { actions } from "document-models/scope-of-work";
import { generateId } from "document-model/core";
import ProgressBar from "../components/progressBar.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";

interface ProjectsProps {
  projects: Project[] | undefined;
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  setActiveNodeId: (id: string) => void;
  contributors: Agent[] | undefined;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  dispatch,
  setActiveNodeId,
  contributors,
}) => {
  const columns = useMemo<Array<ColumnDef<Project>>>(
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
                  setActiveNodeId(`project.${context.row.id}`);
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
              actions.updateProject({
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
                + Double-click to add new project (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-left">{value}</div>;
        },
      },
      {
        field: "progress",
        title: "Progress",
        align: "center",
        width: 150,
        renderCell: (value, context) => {
          if (!context.row.scope) return null;
          return <ProgressBar progress={context.row.scope?.progress} />;
        },
      },
      {
        field: "projectOwner",
        title: "Owner",
        editable: false,
        align: "left",
        renderCell: (value, context) => {
          if (!context.row.projectOwner) return null;
          return (
            <div className="text-left">
              {contributors?.find((c) => c.id === context.row.projectOwner)
                ?.name ?? context.row.projectOwner}
            </div>
          );
        },
      },
      {
        field: "budget",
        title: "Budget",
        editable: false,
        align: "center",
        renderCell: (value, context) => {
          if (value == 0 || value == undefined) return null;
          return (
            <div className="text-center">
              {context.row.currency}{" "}
              {Intl.NumberFormat("en-US").format(value as number)}
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
          Projects
        </h3>
        <ObjectSetTable
          columns={columns}
          data={projects || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!projects) return;
            if (data.length > 0) {
              data.forEach((d) => {
                dispatch(actions.removeProject({ projectId: d.id }));
              });
            }
          }}
          onAdd={(data) => {
            if (data.title) {
              console.log("title", data.title);
              dispatch(
                actions.addProject({
                  id: generateId(),
                  code: "",
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

export default Projects;
