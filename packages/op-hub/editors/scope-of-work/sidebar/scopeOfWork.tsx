import { useRef, useState, useEffect, useMemo } from "react";
import {
  TextInput,
  Textarea,
  Select,
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { Icon } from "@powerhousedao/design-system";
import {
  actions,
  type Project,
  type Roadmap,
  type ScopeOfWorkAction,
  type ScopeOfWorkDocument,
  type ScopeOfWorkStatusInput,
} from "document-models/scope-of-work";
import { generateId } from "document-model/core";
import ProgressBar from "../components/progressBar.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";

interface ScopeOfWorkProps {
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
  document: ScopeOfWorkDocument;
  setActiveNodeId: (id: string) => void;
}

const ScopeOfWork = (props: ScopeOfWorkProps) => {
  const { dispatch, document, setActiveNodeId } = props;
  const state = document.state.global;

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
                  setActiveNodeId("roadmap." + context.row.id);
                }}
              />
            </div>
          );
        },
      },
      {
        field: "title",
        title: "Roadmap Title",
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

  const projectColumns = useMemo<Array<ColumnDef<Project>>>(
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
        type: "string",
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
        align: "left",
        width: 220,
        renderCell: (value, context) => {
          if (!context.row.scope) return null;
          return <ProgressBar progress={context.row.scope?.progress} />;
        },
      },
    ],
    [],
  );

  const statusOptions = [
    { label: "Draft", value: "DRAFT" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELED" },
  ];

  const [tableData, setTableData] = useState<any[]>(state.roadmaps);

  // Update tableData when state changes
  useEffect(() => {
    setTableData(state.roadmaps);
  }, [state.roadmaps]);

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editRowId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editRowId]);

  return (
    <div className="border border-gray-300 p-4 rounded-md ">
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Title"
          defaultValue={state.title}
          onBlur={(e) => {
            if (e.target.value !== state.title) {
              dispatch(actions.editScopeOfWork({ title: e.target.value }));
            }
          }}
        />
      </div>
      <div className="mt-4">
        <Textarea
          className="w-full"
          label="Description"
          defaultValue={state.description}
          autoExpand={true}
          onBlur={(e) => {
            if (e.target.value !== state.description) {
              dispatch(
                actions.editScopeOfWork({
                  description: e.target.value,
                }),
              );
            }
          }}
        />
      </div>
      <div className="mt-4 w-[130px]">
        <Select
          label="Status"
          options={statusOptions}
          value={state.status}
          onChange={(value) => {
            dispatch(
              actions.editScopeOfWork({
                status: value as ScopeOfWorkStatusInput,
              }),
            );
          }}
        />
      </div>
      <div className="mt-8">
        <label className="text-sm font-medium text-gray-700 ">Roadmaps</label>
        <ObjectSetTable
          columns={columns}
          data={state.roadmaps}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!state.roadmaps) return;
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
      <div className="mt-8">
        <label className="text-sm font-medium text-gray-700 mb-2 mt-4">
          Projects
        </label>
        <ObjectSetTable
          columns={projectColumns}
          data={state.projects || []}
          allowRowSelection={true}
          onDelete={(data) => {
            if (!state.projects) return;
            dispatch(actions.removeProject({ projectId: data[0].id }));
          }}
          onAdd={(data) => {
            if (data.title) {
              const newId = generateId();
              dispatch(
                actions.addProject({
                  id: newId,
                  code: "",
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

export default ScopeOfWork;
