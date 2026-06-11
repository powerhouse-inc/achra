import {
  useSelectedRequestForProposalsDocument,
  actions,
} from "document-models/request-for-proposals";
import type { RfpStatus } from "document-models/request-for-proposals";
import {
  DatePicker,
  Select,
  TextInput,
  NumberInput,
} from "@powerhousedao/document-engineering";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { usePHToast } from "@powerhousedao/reactor-browser";
import { FileText } from "lucide-react";
import { MarkdownEditor } from "./components/MarkdownEditor.js";

const statusOptions = [
  { label: "DRAFT", value: "DRAFT" },
  { label: "REQUEST_FOR_COMMMENTS", value: "REQUEST_FOR_COMMMENTS" },
  { label: "CANCELED", value: "CANCELED" },
  { label: "OPEN_FOR_PROPOSALS", value: "OPEN_FOR_PROPOSALS" },
  { label: "AWARDED", value: "AWARDED" },
  { label: "NOT_AWARDED", value: "NOT_AWARDED" },
  { label: "CLOSED", value: "CLOSED" },
];

const sectionCardClass =
  "mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm";

const fieldLabelClass = "mb-2 block text-sm font-medium text-foreground";

function getStatusColor(status: string) {
  switch (status) {
    case "DRAFT":
    case "CLOSED":
      return "bg-muted text-muted-foreground";
    case "OPEN_FOR_PROPOSALS":
      return "bg-status-progress/15 text-status-progress";
    case "AWARDED":
      return "bg-status-success/15 text-status-success";
    case "CANCELED":
    case "NOT_AWARDED":
      return "bg-destructive/15 text-destructive";
    case "REQUEST_FOR_COMMMENTS":
      return "bg-status-warning/15 text-status-warning";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={sectionCardClass}>
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function Editor() {
  const [doc, dispatch] = useSelectedRequestForProposalsDocument();
  const toast = usePHToast();
  const state = doc.state.global;

  const validateBudgetRange = (min: number | null, max: number | null) => {
    if (min !== null && max !== null && min >= max) {
      toast?.("Minimum budget must be less than maximum budget", {
        type: "error",
      });
      return false;
    }
    return true;
  };

  const statusLabel =
    statusOptions.find((o) => o.value === state.status)?.label ?? state.status;

  return (
    <div className="flex h-screen flex-col">
      <DocumentToolbar />
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">
          Request for Proposals
        </h1>
        <span
          className={`max-w-xs truncate rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(state.status)}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {state.title || "Untitled RFP"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Define the RFP details, submission window, budget, and
                  evaluation criteria.
                </p>
              </div>
            </div>
          </div>

          <Section title="Details" description="Code, title, and workflow status">
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <label className={fieldLabelClass}>Code</label>
                <TextInput
                  className="w-full"
                  defaultValue={state.code || ""}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    if (e.target.value !== state.code) {
                      dispatch(actions.editRfp({ code: e.target.value }));
                    }
                  }}
                  placeholder="Enter rfp code"
                />
              </div>

              <div className="flex-1">
                <label className={fieldLabelClass}>Title</label>
                <TextInput
                  className="w-full"
                  defaultValue={state.title || ""}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    if (e.target.value !== state.title) {
                      dispatch(actions.editRfp({ title: e.target.value }));
                    }
                  }}
                  placeholder="Enter rfp title"
                />
              </div>

              <div className="w-[150px]">
                <Select
                  label="Status"
                  options={statusOptions}
                  value={state.status}
                  onChange={(value) =>
                    dispatch(actions.editRfp({ status: value as RfpStatus }))
                  }
                />
              </div>
            </div>
          </Section>

          <Section
            title="Summary"
            description="High-level overview shown to prospective bidders"
          >
            <MarkdownEditor
              height={200}
              label=""
              value={state.summary || ""}
              onChange={() => {}}
              onBlur={(value) => dispatch(actions.editRfp({ summary: value }))}
            />
          </Section>

          <Section
            title="Submission & budget"
            description="Deadline and optional budget range"
          >
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <div>
                <label className={fieldLabelClass}>Submission Deadline</label>
                <div className="w-[250px]">
                  <DatePicker
                    value={
                      state.deadline ? new Date(state.deadline) : undefined
                    }
                    onChange={(e) => {
                      const date = e.target.value
                        ? new Date(e.target.value)
                        : null;
                      dispatch(
                        actions.editRfp({ deadline: date?.toISOString() }),
                      );
                    }}
                    name="submission-deadline"
                    placeholder="Select submission deadline"
                  />
                </div>
              </div>
              <div>
                <label className={fieldLabelClass}>Budget Range</label>
                <div className="flex flex-row flex-wrap items-center gap-2">
                  <NumberInput
                    name="minimum-budget"
                    defaultValue={state.budgetRange.min || undefined}
                    onBlur={(e) => {
                      const newMin = Number(e.target.value);
                      if (newMin !== Number(state.budgetRange.min)) {
                        if (
                          validateBudgetRange(
                            newMin,
                            state.budgetRange.max || null,
                          )
                        ) {
                          dispatch(
                            actions.editRfp({
                              budgetRange: { min: newMin },
                            }),
                          );
                        }
                      }
                    }}
                    placeholder="Minimum budget"
                    className="w-[140px]"
                  />
                  <span className="text-muted-foreground">-</span>
                  <NumberInput
                    name="maximum-budget"
                    defaultValue={state.budgetRange.max || undefined}
                    onBlur={(e) => {
                      const newMax = Number(e.target.value);
                      if (newMax !== Number(state.budgetRange.max)) {
                        if (
                          validateBudgetRange(
                            state.budgetRange.min || null,
                            newMax,
                          )
                        ) {
                          dispatch(
                            actions.editRfp({
                              budgetRange: { max: newMax },
                            }),
                          );
                        }
                      }
                    }}
                    placeholder="Maximum budget"
                    className="w-[140px]"
                  />
                  <Select
                    placeholder="Currency"
                    options={[
                      "USD",
                      "EUR",
                      "GBP",
                      "JPY",
                      "CHF",
                      "CNY",
                      "DKK",
                      "USDC",
                      "USDS",
                      "DAI",
                    ].map((currency) => ({
                      label: currency,
                      value: currency,
                    }))}
                    value={state.budgetRange.currency || ""}
                    onChange={(value) => {
                      if (value !== state.budgetRange.currency) {
                        dispatch(
                          actions.editRfp({
                            budgetRange: { currency: value as string },
                          }),
                        );
                      }
                    }}
                    className="w-[115px]"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="Eligibility criteria"
            description="Who may submit proposals"
          >
            <MarkdownEditor
              height={200}
              label=""
              value={state.eligibilityCriteria || ""}
              onChange={() => {}}
              onBlur={(value) =>
                dispatch(actions.editRfp({ eligibilityCriteria: value }))
              }
            />
          </Section>

          <Section
            title="Evaluation criteria"
            description="How proposals will be assessed"
          >
            <MarkdownEditor
              height={200}
              label=""
              value={state.evaluationCriteria || ""}
              onChange={() => {}}
              onBlur={(value) =>
                dispatch(actions.editRfp({ evaluationCriteria: value }))
              }
            />
          </Section>
        </div>
      </div>
    </div>
  );
}
