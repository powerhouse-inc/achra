import { CreditCard, BarChart3, ArrowRight } from "lucide-react";
import {
  useBillingFolderStructure,
  type MonthFolderInfo,
} from "../hooks/useBillingFolderStructure.js";
import { setSelectedNode } from "@powerhousedao/reactor-browser";
import type { SelectedFolderInfo } from "./FolderTree.js";

interface MonthOverviewProps {
  folderId: string;
  monthName?: string;
  onFolderSelect?: (folderInfo: SelectedFolderInfo | null) => void;
}

/**
 * Overview for a month folder showing links to Payments and Reporting
 */
export function MonthOverview({
  folderId: _folderId,
  monthName,
  onFolderSelect,
}: MonthOverviewProps) {
  const { monthFolders } = useBillingFolderStructure();

  // Find the month info for this folder
  const monthInfo: MonthFolderInfo | undefined = monthName
    ? monthFolders.get(monthName)
    : undefined;

  const handlePaymentsClick = () => {
    if (monthInfo?.paymentsFolder) {
      setSelectedNode(monthInfo.paymentsFolder.id);
      onFolderSelect?.({
        folderId: monthInfo.paymentsFolder.id,
        folderType: "payments",
        monthName,
      });
    }
  };

  const handleReportingClick = () => {
    if (monthInfo?.reportingFolder) {
      setSelectedNode(monthInfo.reportingFolder.id);
      onFolderSelect?.({
        folderId: monthInfo.reportingFolder.id,
        folderType: "reporting",
        monthName,
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {monthName || "Month Overview"}
        </h1>
        <p className="text-gray-600">
          Select a category to manage your billing for this month
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payments Card */}
        <button
          onClick={handlePaymentsClick}
          disabled={!monthInfo?.paymentsFolder}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Payments
                </h2>
                <p className="text-sm text-gray-600">
                  Invoices and billing statements
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Manage contributor invoices, generate billing statements, and
              track payment status.
            </p>
          </div>
        </button>

        {/* Reporting Card */}
        <button
          onClick={handleReportingClick}
          disabled={!monthInfo?.reportingFolder}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-purple-300 transition-all text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Reporting
                </h2>
                <p className="text-sm text-gray-600">
                  Expense and snapshot reports
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Create expense reports and snapshot reports for financial tracking
              and auditing.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
