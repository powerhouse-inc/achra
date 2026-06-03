import { useMemo, useEffect, useRef } from "react";
import { Icon } from "@powerhousedao/design-system";
import {
  type Project,
  type Deliverable,
  actions,
  type PmCurrencyInput,
  type ScopeOfWorkAction,
} from "document-models/scope-of-work";
import { useState } from "react";
import {
  Select,
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";

interface BudgetCalculatorProps {
  setBudgetCalculatorOpen?: (open: boolean) => void;
  project?: Project;
  deliverables?: Deliverable[];
  dispatch: DocumentDispatch<ScopeOfWorkAction>;
}

const BudgetCalculator = ({
  setBudgetCalculatorOpen,
  project,
  deliverables,
  dispatch,
}: BudgetCalculatorProps) => {
  const [budget, setBudget] = useState(0);
  const [margin, setMargin] = useState(0);
  const [marginInputValue, setMarginInputValue] = useState(margin.toString());
  const [totalBudget, setTotalBudget] = useState(0);
  const skipMarginUpdateRef = useRef(false);

  useEffect(() => {
    // Only update margin from deliverables if we're not skipping updates
    if (!skipMarginUpdateRef.current) {
      const margin = deliverables?.map(
        (deliverable) => deliverable.budgetAnchor?.margin,
      );
      if (margin && margin.every((m) => m === margin[0])) {
        setMargin(margin[0] ?? 0);
        setMarginInputValue((margin[0] ?? 0).toString());
      } else {
        setMargin(0);
        setMarginInputValue("0");
      }
    }
  }, [deliverables]);

  const richDeliverables = useMemo(
    () =>
      deliverables?.map((deliverable) => ({
        ...deliverable,
        quantity: deliverable.budgetAnchor?.quantity ?? 0,
        unitCost: deliverable.budgetAnchor?.unitCost ?? 0,
        subtotal:
          (deliverable.budgetAnchor?.quantity ?? 0) *
          (deliverable.budgetAnchor?.unitCost ?? 0),
      })),
    [deliverables],
  );

  useEffect(() => {
    const getTotalBudget = () => {
      const subtotal = richDeliverables?.reduce(
        (acc, deliverable) => acc + deliverable.subtotal,
        0,
      ) as number;
      const total = subtotal * (1 + margin / 100);
      return isNaN(total) ? "0" : total.toFixed(2);
    };
    setTotalBudget(parseFloat(getTotalBudget()));
  }, [richDeliverables, margin]);

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "title",
        title: "Deliverable Title",
        editable: true,
        onSave: (newValue: any, context: any) => {
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
      },
      {
        field: "quantity",
        title: "Quantity",
        editable: true,
        align: "center",
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.setDeliverableBudgetAnchorProject({
                deliverableId: context.row.id,
                project: project?.id ?? "",
                quantity: parseFloat(newValue),
              }),
            );
            return true;
          }
          return false;
        },
      },
      {
        field: "unitCost",
        title: "Unit Cost",
        editable: true,
        align: "center",
        onSave: (newValue: any, context: any) => {
          if (newValue !== context.row.title) {
            dispatch(
              actions.setDeliverableBudgetAnchorProject({
                deliverableId: context.row.id,
                project: project?.id ?? "",
                unitCost: parseFloat(newValue),
              }),
            );
            return true;
          }
          return false;
        },
        renderCell: (value: any) => {
          return (
            <div className="text-center">
              {project?.currency} {Intl.NumberFormat("en-US").format(value)}
            </div>
          );
        },
      },
      {
        field: "subtotal",
        title: "Subtotal",
        editable: false,
        align: "center",
        renderCell: (value: any) => {
          return (
            <div className="text-center">
              {project?.currency} {Intl.NumberFormat("en-US").format(value)}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Budget Calculator</h3>
        <div>
          Project:{" "}
          <span className="font-bold rounded-md p-2">{project?.title}</span>
        </div>
        <div className="flex items-center gap-2">
          Currency:
          <Select
            className="w-[100px]"
            options={[
              { label: "DAI", value: "DAI" },
              { label: "USDS", value: "USDS" },
              { label: "EUR", value: "EUR" },
              { label: "USD", value: "USD" },
            ]}
            defaultValue={project?.currency ?? "DAI"}
            onChange={(value) => {
              if (!project) return;
              dispatch(
                actions.updateProject({
                  id: project.id,
                  currency: value as PmCurrencyInput,
                }),
              );
            }}
          />
        </div>
        <Icon
          className="cursor-pointer bg-gray-200 rounded-full p-1 hover:bg-gray-300"
          name="BaseArrowLeft"
          onClick={() => setBudgetCalculatorOpen?.(false)}
        />
      </div>
      <div className="my-8">
        <ObjectSetTable
          columns={columns}
          data={richDeliverables ?? []}
          allowRowSelection={true}
        />
      </div>
      {/* <div className="flex justify-end items-center gap-2"> */}
      <div className="flex justify-end items-center gap-4">
        <span>Total Cost:</span>
        <div className="min-w-[100px] h-8 bg-gray-100 border border-gray-300 rounded px-2 flex items-center justify-center">
          {project?.currency}{" "}
          {Intl.NumberFormat("en-US").format(
            richDeliverables?.reduce(
              (acc, deliverable) => acc + deliverable.subtotal,
              0,
            ) || 0,
          )}
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <span>Project Margin (%):</span>
        <div className="w-[100px] flex justify-end mt-2">
          <input
            type="number"
            className="w-[100px] h-8 border border-gray-300 rounded px-2 text-center"
            value={marginInputValue}
            placeholder=""
            onFocus={() => {
              skipMarginUpdateRef.current = true;
            }}
            onChange={(e) => {
              const value = e.target.value;
              setMarginInputValue(value);
              if (value === "") {
                // Allow empty input during editing
                return;
              }
              const numValue = parseFloat(value);
              const newMargin = isNaN(numValue) ? 0 : numValue;
              setMargin(newMargin);
            }}
            onBlur={() => {
              // If input is empty, set margin to 0
              if (marginInputValue === "") {
                setMargin(0);
                setMarginInputValue("0");
              } else {
                // Ensure input value matches the actual margin
                setMarginInputValue(margin.toString());
              }

              // Set margin for all deliverables in the project
              richDeliverables?.forEach((deliverable) => {
                dispatch(
                  actions.setDeliverableBudgetAnchorProject({
                    deliverableId: deliverable.id,
                    project: project?.id ?? "",
                    margin: margin,
                  }),
                );
              });

              // Reset the skip flag after a delay to allow the action to complete
              setTimeout(() => {
                skipMarginUpdateRef.current = false;
              }, 100);
            }}
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <span>Total Budget:</span>
        <div className="min-w-[100px] h-8 border border-gray-300 rounded px-2 flex items-center justify-center">
          {project?.currency} {Intl.NumberFormat("en-US").format(totalBudget)}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default BudgetCalculator;
