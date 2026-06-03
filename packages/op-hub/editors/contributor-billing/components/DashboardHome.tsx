import {
  Wallet,
  CheckCircle2,
  ArrowRight,
  Building2,
  User,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  addDocument,
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  setSelectedNode,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import { useBillingFolderStructure } from "../hooks/useBillingFolderStructure.js";
import type { SelectedFolderInfo } from "./FolderTree.js";
import type { OperationalHubProfileDocument } from "../../../document-models/operational-hub-profile/v1/gen/types.js";
import type { AccountsDocument } from "../../../document-models/accounts/v1/gen/types.js";

interface DashboardHomeProps {
  onFolderSelect?: (folderInfo: SelectedFolderInfo | null) => void;
}

/**
 * Dashboard home page for the Operational Hub
 * Shows setup status and guides users through important actions
 */
export function DashboardHome({ onFolderSelect }: DashboardHomeProps) {
  const documentsInDrive = useDocumentsInSelectedDrive();
  const [selectedDrive] = useSelectedDrive();
  const { billingFolder, monthFolders, paymentsFolderIds } =
    useBillingFolderStructure();

  // Check if accounts document exists
  const accountsDocument = useMemo(() => {
    if (!documentsInDrive) return null;
    return documentsInDrive.find(
      (doc) => doc.header.documentType === "powerhouse/accounts",
    ) as AccountsDocument | undefined;
  }, [documentsInDrive]);

  // Find operational hub profile document for name
  const operationalHubProfileDocument = useMemo(() => {
    if (!documentsInDrive) return null;
    return documentsInDrive.find(
      (doc) => doc.header.documentType === "powerhouse/operational-hub-profile",
    ) as OperationalHubProfileDocument | undefined;
  }, [documentsInDrive]);

  const hubName =
    operationalHubProfileDocument?.state?.global?.name || "Operational Hub";

  // Computed stats for action cards
  const profileStats = useMemo(() => {
    const profile = operationalHubProfileDocument?.state?.global;
    if (!profile) return null;
    const hasTeam = !!profile.operatorTeam;
    const subteamCount = profile.subteams?.length ?? 0;
    const parts: string[] = [];
    parts.push(hasTeam ? "Operator team set" : "No operator team");
    if (subteamCount > 0) {
      parts.push(`${subteamCount} subteam${subteamCount > 1 ? "s" : ""}`);
    }
    return parts.join(" · ");
  }, [operationalHubProfileDocument]);

  const accountStats = useMemo(() => {
    const accounts = accountsDocument?.state?.global?.accounts;
    if (!accounts || accounts.length === 0) return null;
    const counts: Record<string, number> = {};
    for (const acct of accounts) {
      const t = acct.type.toLowerCase();
      counts[t] = (counts[t] ?? 0) + 1;
    }
    const entries = Object.entries(counts);
    if (entries.length <= 3) {
      return entries.map(([type, count]) => `${count} ${type}`).join(", ");
    }
    return `${accounts.length} accounts`;
  }, [accountsDocument]);

  const billingStats = useMemo(() => {
    if (!selectedDrive || !documentsInDrive) return null;
    const monthCount = monthFolders.size;
    if (monthCount === 0) return null;

    const nodes = selectedDrive.state.global.nodes;
    const invoiceIds = new Set(
      nodes
        .filter(
          (n) =>
            isFileNodeKind(n) &&
            paymentsFolderIds.has(n.parentFolder || "") &&
            n.documentType === "powerhouse/invoice",
        )
        .map((n) => n.id),
    );

    const invoices = documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/invoice" &&
        invoiceIds.has(doc.header.id),
    );

    if (invoices.length === 0) {
      return `${monthCount} month${monthCount > 1 ? "s" : ""} configured`;
    }

    let pendingCount = 0;
    let paidCount = 0;
    for (const invoice of invoices) {
      const status = (
        (invoice.state as { global?: { status?: string } }).global?.status ?? ""
      ).toUpperCase();
      if (
        status === "PAYMENTSENT" ||
        status === "PAYMENTRECEIVED" ||
        status === "PAYMENTCLOSED"
      ) {
        paidCount++;
      } else if (status !== "REJECTED" && status !== "CANCELLED") {
        pendingCount++;
      }
    }

    const parts = [
      `${monthCount} month${monthCount > 1 ? "s" : ""}`,
      `${invoices.length} invoice${invoices.length > 1 ? "s" : ""}`,
    ];
    const statusParts: string[] = [];
    if (pendingCount > 0) statusParts.push(`${pendingCount} pending`);
    if (paidCount > 0) statusParts.push(`${paidCount} paid`);
    if (statusParts.length > 0) parts.push(statusParts.join(", "));
    return parts.join(" · ");
  }, [selectedDrive, documentsInDrive, monthFolders.size, paymentsFolderIds]);

  const handleOpenAccounts = useCallback(async () => {
    if (accountsDocument) {
      setSelectedNode(accountsDocument.header.id);
    } else {
      // Auto-create accounts document with name "Accounts"
      const driveId = selectedDrive?.header.id;
      if (!driveId) return;

      const createdNode = await addDocument(
        driveId,
        "Accounts",
        "powerhouse/accounts",
      );

      if (createdNode?.id) {
        setSelectedNode(createdNode.id);
      }
    }
  }, [accountsDocument, selectedDrive?.header.id]);

  const handleOpenBilling = useCallback(() => {
    onFolderSelect?.({
      folderId: billingFolder?.id || "",
      folderType: "billing",
    });
  }, [onFolderSelect, billingFolder?.id]);

  const handleOpenProfile = useCallback(() => {
    if (operationalHubProfileDocument) {
      setSelectedNode(operationalHubProfileDocument.header.id);
    }
  }, [operationalHubProfileDocument]);

  // Calculate setup progress with clickable steps
  const setupSteps = useMemo(() => {
    return [
      {
        done: !!operationalHubProfileDocument,
        label: "Set up your profile",
        description: "Configure your operational hub identity",
        onClick: handleOpenProfile,
      },
      {
        done: !!accountsDocument,
        label: "Add your accounts",
        description: "Add accounts and fetch transactions",
        onClick: () => void handleOpenAccounts(),
      },
      {
        done: monthFolders.size > 0,
        label: "Set up your billing",
        description:
          "Add your first month, pay invoices and complete reporting",
        onClick: handleOpenBilling,
      },
    ];
  }, [
    operationalHubProfileDocument,
    accountsDocument,
    monthFolders.size,
    handleOpenProfile,
    handleOpenAccounts,
    handleOpenBilling,
  ]);

  const setupComplete = setupSteps.every((step) => step.done);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded bg-purple-800 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          {hubName}
        </h1>
        <p className="text-gray-600 mt-1">
          Manage accounts, billing, and financial reporting
        </p>
      </div>

      {/* Setup Progress - Only show if not complete */}
      {!setupComplete && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Getting Started
              </h2>
              <p className="text-sm text-gray-600">
                Complete these steps to set up your operational hub
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {setupSteps.map((step, index) => (
              <button
                key={index}
                onClick={step.onClick}
                disabled={step.done}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                  step.done
                    ? "bg-white/50 cursor-default"
                    : "bg-white hover:bg-blue-50 cursor-pointer"
                }`}
              >
                <div className="mt-0.5">
                  {step.done ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center text-xs font-semibold text-blue-600">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className={`font-medium ${
                      step.done ? "text-gray-400 line-through" : "text-gray-900"
                    }`}
                  >
                    {step.label}
                  </span>
                  <p
                    className={`text-sm mt-0.5 ${
                      step.done ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
                {!step.done && (
                  <ArrowRight className="w-4 h-4 text-blue-500 mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Card */}
        <button
          onClick={handleOpenProfile}
          className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-100">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Profile</h3>
                <p className="text-sm text-gray-500">
                  {operationalHubProfileDocument
                    ? profileStats || "View and update your hub profile"
                    : "Set up your hub profile"}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          {!operationalHubProfileDocument && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Action Required
              </span>
            </div>
          )}
        </button>

        {/* Accounts Card */}
        <button
          onClick={() => void handleOpenAccounts()}
          className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-lg ${accountsDocument ? "bg-green-100" : "bg-amber-100"}`}
              >
                <Wallet
                  className={`w-5 h-5 ${accountsDocument ? "text-green-600" : "text-amber-600"}`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Accounts</h3>
                <p className="text-sm text-gray-500">
                  {accountsDocument
                    ? accountStats || "View and manage accounts"
                    : "Set up your accounts first"}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          {!accountsDocument && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Action Required
              </span>
            </div>
          )}
        </button>

        {/* Billing Card */}
        <button
          onClick={handleOpenBilling}
          className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md hover:border-blue-200 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Billing</h3>
                <p className="text-sm text-gray-500">
                  {billingStats || "Manage monthly billing cycles"}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
}
