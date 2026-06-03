import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { useSelectedPaymentTermsDocument } from "document-models/payment-terms";
import { BasicTermsTab } from "./components/BasicTermsTab.js";
import { MilestonesTab } from "./components/MilestonesTab.js";
import { ClausesTab } from "./components/ClausesTab.js";
import { CostMaterialsTab } from "./components/CostMaterialsTab.js";
import { RetainerTab } from "./components/RetainerTab.js";
import { EscrowTab } from "./components/EscrowTab.js";
import { EvaluationTab } from "./components/EvaluationTab.js";

export default function Editor() {
  const [doc, dispatch] = useSelectedPaymentTermsDocument();

  const state = doc.state.global;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "ACCEPTED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const totalMilestones = state.milestoneSchedule.length;
  const completedMilestones = state.milestoneSchedule.filter(
    (m) => m.payoutStatus === "PAID",
  ).length;

  return (
    <>
      <DocumentToolbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl p-6">
          {/* Header */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  Payment Terms Document
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage payment terms, milestones, and contract clauses
                </p>
              </div>
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-2 font-medium ${getStatusColor(state.status)}`}
              >
                {state.status}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Payment Model
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {state.paymentModel.replace(/_/g, " ")}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Currency
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {state.currency}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Amount
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {state.totalAmount
                    ? `${state.totalAmount.value} ${state.totalAmount.unit}`
                    : "Not set"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Progress
                </p>
                <p className="text-lg font-semibold dark:text-white">
                  {state.paymentModel === "MILESTONE"
                    ? `${completedMilestones} / ${totalMilestones}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Terms Section */}
            <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Terms
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Configure the basic payment terms and details
                </p>
              </div>
              <div className="p-6">
                <BasicTermsTab state={state} dispatch={dispatch} />
              </div>
            </div>

            {/* Payment Structure Section - Conditional based on payment model */}
            {state.paymentModel === "MILESTONE" && (
              <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Milestone Schedule
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Define project milestones and payment amounts
                  </p>
                </div>
                <div className="p-6">
                  <MilestonesTab
                    milestones={state.milestoneSchedule}
                    dispatch={dispatch}
                    currency={state.currency}
                  />
                </div>
              </div>
            )}

            {state.paymentModel === "COST_AND_MATERIALS" && (
              <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Cost & Materials
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Configure hourly rates, billing frequency, and caps
                  </p>
                </div>
                <div className="p-6">
                  <CostMaterialsTab state={state} dispatch={dispatch} />
                </div>
              </div>
            )}

            {state.paymentModel === "RETAINER" && (
              <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Retainer Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Configure retainer amount, frequency, and services
                  </p>
                </div>
                <div className="p-6">
                  <RetainerTab state={state} dispatch={dispatch} />
                </div>
              </div>
            )}

            {/* Escrow Section */}
            {state.escrowDetails && state.escrowDetails.releaseConditions && (
              <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Escrow Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Configure escrow payment arrangements
                  </p>
                </div>
                <div className="p-6">
                  <EscrowTab state={state} dispatch={dispatch} />
                </div>
              </div>
            )}

            {/* Clauses Section */}
            <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bonus & Penalty Clauses
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Add performance-based bonus and penalty conditions
                </p>
              </div>
              <div className="p-6">
                <ClausesTab
                  bonusClauses={state.bonusClauses}
                  penaltyClauses={state.penaltyClauses}
                  dispatch={dispatch}
                  currency={state.currency}
                />
              </div>
            </div>

            {/* Evaluation Section */}
            <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Evaluation Terms
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Define performance evaluation criteria and processes
                </p>
              </div>
              <div className="p-6">
                <EvaluationTab state={state} dispatch={dispatch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
