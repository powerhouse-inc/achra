import { useMemo } from "react";
import { useDocumentsInSelectedDrive } from "@powerhousedao/reactor-browser";
import type { BuilderProfileDocument } from "document-models/builder-profile";
import { ProfileHeader } from "./overview/ProfileHeader.js";
import { TeamMembersOverview } from "./overview/TeamMembersOverview.js";
// import { ExpenseReportsStats } from "./ExpenseReportsStats.js";
// import { useExpenseReportAutoPlacement } from "../hooks/useExpenseReportAutoPlacement.js";
// import { useIsOperator } from "../hooks/useIsOperator.js";
// import { OperatorDashboardStats } from "./OperatorDashboardStats.js";

/**
 * Main overview dashboard showing aggregated data from all document types in the drive.
 * Displays: Builder profile, team members, subscriptions stats, and expense reports stats.
 */
export function DriveContents() {
  const documentsInDrive = useDocumentsInSelectedDrive();
  // const { isOperator } = useIsOperator();

  // Extract builder profile document
  const builderProfileDoc = useMemo(() => {
    if (!documentsInDrive) return null;
    return (
      (documentsInDrive.find(
        (doc) => doc.header.documentType === "powerhouse/builder-profile",
      ) as BuilderProfileDocument | undefined) ?? null
    );
  }, [documentsInDrive]);

  // Use the auto-placement hook - this handles moving expense reports
  // dropped anywhere in the drive into the proper "Expense Reports" folder
  // const { expenseReportDocuments } = useExpenseReportAutoPlacement();

  // Get contributors from builder profile
  const contributors = builderProfileDoc?.state.global.contributors;

  // const hasExpenseReports = expenseReportDocuments.length > 0;

  return (
    <div className="min-h-full bg-slate-50/50 px-6 py-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Profile Header */}
        <ProfileHeader builderProfileDoc={builderProfileDoc} />

        {/* Team Members */}
        <TeamMembersOverview contributors={contributors} />

        {/* Expense Reports Stats */}
        {/* {hasExpenseReports && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Expense Reports
            </h2>
            <ExpenseReportsStats
              expenseReportDocuments={expenseReportDocuments}
            />
          </div>
        )} */}

        {/* Operator Dashboard Stats */}
        {/* {isOperator && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Operator Dashboard
            </h2>
            <OperatorDashboardStats />
          </div>
        )} */}
      </div>
    </div>
  );
}
