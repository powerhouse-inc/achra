import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { useSelectedPaymentTermsDocument } from "document-models/payment-terms";
import { FileText } from "lucide-react";
import { BasicTermsTab } from "./components/BasicTermsTab.js";
import { MilestonesTab } from "./components/MilestonesTab.js";
import { ClausesTab } from "./components/ClausesTab.js";
import { CostMaterialsTab } from "./components/CostMaterialsTab.js";
import { RetainerTab } from "./components/RetainerTab.js";
import { EscrowTab } from "./components/EscrowTab.js";
import { EvaluationTab } from "./components/EvaluationTab.js";

const sectionCardClass =
  "overflow-hidden rounded-lg border border-border bg-card shadow-sm";

function getStatusColor(status: string) {
  switch (status) {
    case "DRAFT":
      return "bg-muted text-muted-foreground";
    case "SUBMITTED":
      return "bg-status-progress/15 text-status-progress";
    case "ACCEPTED":
      return "bg-status-success/15 text-status-success";
    case "CANCELLED":
      return "bg-destructive/15 text-destructive";
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
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className={sectionCardClass}>
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export default function Editor() {
  const [doc, dispatch] = useSelectedPaymentTermsDocument();
  const state = doc.state.global;

  const totalMilestones = state.milestoneSchedule.length;
  const completedMilestones = state.milestoneSchedule.filter(
    (m) => m.payoutStatus === "PAID",
  ).length;

  return (
    <div className="flex h-screen flex-col">
      <DocumentToolbar />
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">Payment Terms</h1>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(state.status)}`}
        >
          {state.status}
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Payment Terms Document
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage payment terms, milestones, and contract clauses.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Payment Model
              </p>
              <p className="text-lg font-semibold text-foreground">
                {state.paymentModel.replace(/_/g, " ")}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Currency
              </p>
              <p className="text-lg font-semibold text-foreground">
                {state.currency}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Total Amount
              </p>
              <p className="text-lg font-semibold text-foreground">
                {state.totalAmount
                  ? `${state.totalAmount.value} ${state.totalAmount.unit}`
                  : "Not set"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Progress
              </p>
              <p className="text-lg font-semibold text-foreground">
                {state.paymentModel === "MILESTONE"
                  ? `${completedMilestones} / ${totalMilestones}`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Section
              title="Basic Terms"
              description="Configure the basic payment terms and details"
            >
              <BasicTermsTab state={state} dispatch={dispatch} />
            </Section>

            {state.paymentModel === "MILESTONE" ? (
              <Section
                title="Milestone Schedule"
                description="Define project milestones and payment amounts"
              >
                <MilestonesTab
                  milestones={state.milestoneSchedule}
                  dispatch={dispatch}
                  currency={state.currency}
                />
              </Section>
            ) : null}

            {state.paymentModel === "COST_AND_MATERIALS" ? (
              <Section
                title="Cost & Materials"
                description="Configure hourly rates, billing frequency, and caps"
              >
                <CostMaterialsTab state={state} dispatch={dispatch} />
              </Section>
            ) : null}

            {state.paymentModel === "RETAINER" ? (
              <Section
                title="Retainer Details"
                description="Configure retainer amount, frequency, and services"
              >
                <RetainerTab state={state} dispatch={dispatch} />
              </Section>
            ) : null}

            {state.escrowDetails && state.escrowDetails.releaseConditions ? (
              <Section
                title="Escrow Details"
                description="Configure escrow payment arrangements"
              >
                <EscrowTab state={state} dispatch={dispatch} />
              </Section>
            ) : null}

            <Section
              title="Bonus & Penalty Clauses"
              description="Add performance-based bonus and penalty conditions"
            >
              <ClausesTab
                bonusClauses={state.bonusClauses}
                penaltyClauses={state.penaltyClauses}
                dispatch={dispatch}
                currency={state.currency}
              />
            </Section>

            <Section
              title="Evaluation Terms"
              description="Define performance evaluation criteria and processes"
            >
              <EvaluationTab state={state} dispatch={dispatch} />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
