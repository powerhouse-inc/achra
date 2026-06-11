import { useState } from "react";
import type { EditorProps } from "document-model";
import {
  type BillingStatementDocument,
  type BillingStatementState,
  actions,
} from "document-models/billing-statement";
import { Textarea, Select } from "@powerhousedao/document-engineering";
import LineItemsTable from "./components/lineItemsTable.js";
import { formatNumber } from "../invoice/lineItems.js";
import { useSelectedBillingStatementDocument } from "../../document-models/billing-statement/v1/hooks.js";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
} from "@powerhousedao/reactor-browser";

export type IProps = EditorProps;

export const currencyList = [
  { ticker: "USDS", crypto: true },
  { ticker: "USDC", crypto: true },
  { ticker: "DAI", crypto: true },
  { ticker: "EURC", crypto: true },
  { ticker: "EURE", crypto: true },
  { ticker: "USD", crypto: false },
  { ticker: "EUR", crypto: false },
  { ticker: "DKK", crypto: false },
  { ticker: "GBP", crypto: false },
  { ticker: "JPY", crypto: false },
  { ticker: "CNY", crypto: false },
  { ticker: "CHF", crypto: false },
];

export default function Editor(
  props: Partial<EditorProps> & { documentId?: string },
) {
  const [doc, dispatch] = useSelectedBillingStatementDocument() as [
    BillingStatementDocument | undefined,
    React.Dispatch<any>,
  ];
  const state = doc?.state.global as BillingStatementState;

  const [notes, setNotes] = useState(state?.notes ?? "");

  const parentFolder = useParentFolderForSelectedNode();

  if (!state) {
    console.log("Document state not found from document id", props.documentId);
    return null;
  }

  function handleClose() {
    setSelectedNode(parentFolder);
  }

  return (
    <div className="w-full min-h-full flex flex-col">
      <DocumentToolbar document={doc} />

      <div className="flex-1 max-w-7xl mx-auto w-full mt-4 px-4 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Billing Statement
            </h1>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-end gap-1">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Submitter
                </div>
                <div className="text-sm font-medium text-foreground">
                  {state.contributor}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </div>
                <span className="inline-flex items-center rounded-full bg-status-progress/15 px-3 py-1 text-xs font-medium text-status-progress">
                  {String(state.status || "—")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/50 px-5 py-4">
            <div className="text-sm text-muted-foreground">
              Keep edits lightweight: double‑click a row to edit, click outside
              to auto‑save.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Currency
              </span>
              <Select
                className="w-28"
                options={currencyList.map((currency) => ({
                  value: currency.ticker,
                  label: currency.ticker,
                }))}
                value={state.currency}
                onChange={(value) => {
                  dispatch(
                    actions.editBillingStatement({
                      currency: value as string,
                    }),
                  );
                }}
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <LineItemsTable state={state} dispatch={dispatch} />

        {/* Notes + Totals */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <label className="mb-1 block text-sm font-medium text-foreground">
              Notes
            </label>
            <Textarea
              placeholder="Add notes"
              autoExpand={true}
              rows={4}
              multiline={true}
              value={notes}
              onBlur={(e) => {
                const newValue = e.target.value;
                if (newValue !== state.notes) {
                  dispatch(actions.editBillingStatement({ notes: newValue }));
                }
              }}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              className="p-2"
            />
            <div className="mt-3 text-xs text-muted-foreground">
              Tip: notes are saved by clicking outside of the textarea or
              pressing tab.
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Totals
              </div>
              <div className="text-xs text-muted-foreground">read‑only</div>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full border-collapse text-foreground">
                <thead className="bg-muted">
                  <tr>
                    <th className="border-b border-border px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground">
                      Total Fiat
                    </th>
                    <th className="border-b border-border px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-foreground">
                      Total POWT
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  <tr>
                    <td className="border-t border-border px-5 py-4 font-mono text-base tabular-nums text-foreground">
                      {formatNumber(state.totalCash)}
                    </td>
                    <td className="border-t border-border px-5 py-4 font-mono text-base tabular-nums text-foreground">
                      {formatNumber(state.totalPowt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Totals update from line items.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
