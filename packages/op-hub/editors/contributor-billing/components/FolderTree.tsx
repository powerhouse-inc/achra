import {
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/document-engineering";
import {
  addDocument,
  setSelectedNode,
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import {
  Wallet,
  FileText,
  Building2,
  Calendar,
  CreditCard,
  BarChart3,
  Camera,
  User,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useBillingFolderStructure } from "../hooks/useBillingFolderStructure.js";
// TODO: Uncomment when Subscriptions feature is ready
// import { useSubscriptionsFolder } from "../hooks/useSubscriptionsFolder.js";
import type { OperationalHubProfileDocument } from "../../../document-models/operational-hub-profile/v1/gen/types.js";

const ICON_SIZE = 16;
const SUBSCRIPTIONS_FOLDER_NAME = "Subscriptions";

/**
 * Format month name like "January 2026" to "01-2026"
 */
function formatMonthCode(monthName: string): string {
  const date = new Date(monthName + " 1");
  if (isNaN(date.getTime())) return monthName;
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${year}`;
}

/** Folder types for content routing */
export type FolderType =
  | "payments"
  | "reporting"
  | "billing"
  | "subscriptions"
  | null;

/** Selected folder info for content routing */
export interface SelectedFolderInfo {
  folderId: string;
  folderType: FolderType;
  monthName?: string;
  /** The sibling Reporting folder ID (when in Payments folder context) */
  reportingFolderId?: string;
  /** The sibling Payments folder ID (when in Reporting folder context) */
  paymentsFolderId?: string;
}

type FolderTreeProps = {
  onFolderSelect?: (folderInfo: SelectedFolderInfo | null) => void;
  activeNodeId?: string;
  onActiveNodeIdChange?: (nodeId: string) => void;
};

/**
 * Sidebar navigation component with:
 * - Accounts section (with account-transactions children)
 * - Billing folder structure (Month > Payments/Reporting)
 */
export function FolderTree({
  onFolderSelect,
  activeNodeId: controlledActiveNodeId,
  onActiveNodeIdChange,
}: FolderTreeProps) {
  // Use controlled state if provided, otherwise use local state
  // Empty string means no selection (home page)
  const [localActiveNodeId, setLocalActiveNodeId] = useState<string>("");
  const activeNodeId = controlledActiveNodeId ?? localActiveNodeId;
  const setActiveNodeId = onActiveNodeIdChange ?? setLocalActiveNodeId;

  const documentsInDrive = useDocumentsInSelectedDrive();
  const [driveDocument] = useSelectedDrive();
  const { billingFolder, monthFolders, paymentsFolderIds, reportingFolderIds } =
    useBillingFolderStructure();
  // TODO: Uncomment when Subscriptions feature is ready
  // const { subscriptionsFolder } = useSubscriptionsFolder();

  // Build a map of document ID to parent folder ID
  const documentParentMap = useMemo(() => {
    const map = new Map<string, string | null>();
    if (!driveDocument) return map;
    const nodes = driveDocument.state.global.nodes;
    for (const node of nodes) {
      if (isFileNodeKind(node)) {
        map.set(node.id, node.parentFolder);
      }
    }
    return map;
  }, [driveDocument]);

  // Find all account-transactions documents in the drive
  const accountTransactionsDocuments = useMemo(() => {
    if (!documentsInDrive) return [];
    return documentsInDrive.filter(
      (doc) => doc.header.documentType === "powerhouse/account-transactions",
    );
  }, [documentsInDrive]);

  // Build a set of account-transactions node IDs for quick lookup
  const accountTransactionsNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    for (const doc of accountTransactionsDocuments) {
      nodeIds.add(doc.header.id);
    }
    return nodeIds;
  }, [accountTransactionsDocuments]);

  // Build a set of month folder IDs for quick lookup
  const monthFolderIds = useMemo(() => {
    const ids = new Set<string>();
    for (const [, info] of monthFolders.entries()) {
      ids.add(info.folder.id);
    }
    return ids;
  }, [monthFolders]);

  // Find accounts document
  const accountsDocument = useMemo(() => {
    if (!documentsInDrive) return null;
    return documentsInDrive.find(
      (doc) => doc.header.documentType === "powerhouse/accounts",
    );
  }, [documentsInDrive]);

  // Find operational hub profile document
  const operationalHubProfileDocument = useMemo(() => {
    if (!documentsInDrive) return null;
    return documentsInDrive.find(
      (doc) => doc.header.documentType === "powerhouse/operational-hub-profile",
    ) as OperationalHubProfileDocument | undefined;
  }, [documentsInDrive]);

  // Find report documents (expense + snapshot) and build ID set for lookup
  const { reportDocuments, reportDocumentIds } = useMemo(() => {
    if (!documentsInDrive)
      return { reportDocuments: [], reportDocumentIds: new Set<string>() };
    const docs = documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/expense-report" ||
        doc.header.documentType === "powerhouse/snapshot-report",
    );
    return {
      reportDocuments: docs,
      reportDocumentIds: new Set(docs.map((d) => d.header.id)),
    };
  }, [documentsInDrive]);

  // Build a set of all valid document IDs for safe selection
  const validDocumentIds = useMemo(() => {
    if (!documentsInDrive) return new Set<string>();
    return new Set(documentsInDrive.map((doc) => doc.header.id));
  }, [documentsInDrive]);

  // Build a set of all valid node IDs (documents + folders + special IDs)
  const validNodeIds = useMemo(() => {
    const ids = new Set<string>();

    // Add special IDs
    ids.add("operational-hub-profile");
    ids.add("accounts");
    ids.add("billing-placeholder");

    // Add billing folder ID
    if (billingFolder?.id) {
      ids.add(billingFolder.id);
    }

    // Add all document IDs
    for (const docId of validDocumentIds) {
      ids.add(docId);
    }

    // Add all folder IDs (month folders, payments folders, reporting folders)
    for (const info of monthFolders.values()) {
      ids.add(info.folder.id);
      if (info.paymentsFolder) {
        ids.add(info.paymentsFolder.id);
      }
      if (info.reportingFolder) {
        ids.add(info.reportingFolder.id);
      }
    }

    return ids;
  }, [validDocumentIds, billingFolder, monthFolders]);

  // Sanitize activeNodeId - if it's not a valid node, use empty string
  const sanitizedActiveNodeId = useMemo(() => {
    // Empty string is always valid
    if (activeNodeId === "") return "";
    // Check if the ID is valid
    if (validNodeIds.has(activeNodeId)) return activeNodeId;
    // Invalid ID, clear it
    console.warn(
      `[FolderTree] activeNodeId ${activeNodeId} is not a valid node, clearing selection`,
    );
    return "";
  }, [activeNodeId, validNodeIds]);

  // Safe wrapper for setSelectedNode that verifies document exists
  const safeSetSelectedNode = useCallback(
    (nodeId: string) => {
      // Empty string is valid (clears selection)
      if (nodeId === "") {
        setSelectedNode("");
        return;
      }
      // Only select if the document exists
      if (validDocumentIds.has(nodeId)) {
        setSelectedNode(nodeId);
      } else {
        // Document doesn't exist, clear selection instead of throwing
        console.warn(
          `[FolderTree] Document with id ${nodeId} not found, clearing selection`,
        );
        setSelectedNode("");
      }
    },
    [validDocumentIds],
  );

  // Auto-create accounts document with name "Accounts"
  const createAccountsDocument = useCallback(async () => {
    const driveId = driveDocument?.header.id;
    if (!driveId) return;

    const createdNode = await addDocument(
      driveId,
      "Accounts",
      "powerhouse/accounts",
    );

    if (createdNode?.id) {
      setSelectedNode(createdNode.id);
    }
  }, [driveDocument?.header.id]);

  // Build navigation sections
  const navigationSections = useMemo(() => {
    // Build account-transactions children nodes
    const accountTransactionsChildren: SidebarNode[] =
      accountTransactionsDocuments.map((doc) => ({
        id: doc.header.id,
        title: doc.header.name || "Untitled",
        icon: <FileText size={ICON_SIZE} />,
      }));

    // Build Billing folder children (month folders)
    const billingChildren: SidebarNode[] = [];

    // Sort months by date (most recent first)
    const sortedMonths = Array.from(monthFolders.entries()).sort(
      ([nameA], [nameB]) => {
        // Parse "January 2025" format
        const dateA = new Date(nameA);
        const dateB = new Date(nameB);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      },
    );

    for (const [monthName, info] of sortedMonths) {
      const monthChildren: SidebarNode[] = [];

      if (info.paymentsFolder) {
        monthChildren.push({
          id: info.paymentsFolder.id,
          title: "Payments",
          icon: <CreditCard size={ICON_SIZE} />,
        });
      }

      if (info.reportingFolder) {
        // Filter reports that are in this Reporting folder OR match this specific month by name
        // This allows uploaded documents to show up even if their name doesn't match the month
        const monthLower = monthName.toLowerCase();
        const monthCode = formatMonthCode(monthName);

        const folderReports = reportDocuments.filter((doc) => {
          // First check if document is actually in this Reporting folder
          if (info.reportingFolder) {
            const docParentFolder = documentParentMap.get(doc.header.id);
            if (docParentFolder === info.reportingFolder.id) {
              return true; // Document is in the folder, show it regardless of name
            }
          }

          // Otherwise, check if name matches the month (for backwards compatibility)
          const docName = doc.header.name || "";
          return (
            docName.toLowerCase().includes(monthLower) ||
            docName.includes(monthCode)
          );
        });
        const reportingChildren: SidebarNode[] = folderReports.map((doc) => ({
          id: doc.header.id,
          title: doc.header.name || "Untitled Report",
          icon:
            doc.header.documentType === "powerhouse/snapshot-report" ? (
              <Camera size={ICON_SIZE} />
            ) : (
              <FileText size={ICON_SIZE} />
            ),
        }));

        monthChildren.push({
          id: info.reportingFolder.id,
          title: "Reporting",
          icon: <BarChart3 size={ICON_SIZE} />,
          children:
            reportingChildren.length > 0 ? reportingChildren : undefined,
        });
      }

      billingChildren.push({
        id: info.folder.id,
        title: monthName,
        icon: <Calendar size={ICON_SIZE} />,
        children: monthChildren.length > 0 ? monthChildren : undefined,
      });
    }

    const sections: SidebarNode[] = [
      // Operational Hub Profile section (at the top, like Builder Profile in builder-team-admin)
      {
        id: "operational-hub-profile",
        title: "Operational Hub Profile",
        icon: <User size={ICON_SIZE} />,
      },
      // Accounts section
      {
        id: "accounts",
        title: "Accounts",
        icon: <Wallet size={ICON_SIZE} />,
        children:
          accountTransactionsChildren.length > 0
            ? accountTransactionsChildren
            : undefined,
      },
      // TODO: Uncomment when Subscriptions feature is ready
      // {
      //   id: subscriptionsFolder?.id || "subscriptions-placeholder",
      //   title: "Subscriptions",
      //   icon: <Package size={ICON_SIZE} />,
      // },
      // Billing folder structure
      {
        id: billingFolder?.id || "billing-placeholder",
        title: "Billing",
        icon: <Building2 size={ICON_SIZE} />,
        children: billingChildren.length > 0 ? billingChildren : undefined,
      },
    ];

    return sections;
  }, [
    accountTransactionsDocuments,
    billingFolder,
    monthFolders,
    reportDocuments,
    documentParentMap,
  ]);

  const handleActiveNodeChange = (node: SidebarNode) => {
    setActiveNodeId(node.id);

    // Check if clicking Operational Hub Profile section
    if (node.id === "operational-hub-profile") {
      if (operationalHubProfileDocument) {
        onFolderSelect?.(null);
        safeSetSelectedNode(operationalHubProfileDocument.header.id);
      }
      return;
    }

    // Check if this is an account-transactions child node
    if (accountTransactionsNodeIds.has(node.id)) {
      onFolderSelect?.(null);
      safeSetSelectedNode(node.id);
      return;
    }

    // Check if this is an expense or snapshot report document
    if (reportDocumentIds.has(node.id)) {
      onFolderSelect?.(null);
      safeSetSelectedNode(node.id);
      return;
    }

    // Check if clicking Accounts section
    if (node.id === "accounts") {
      if (accountsDocument) {
        onFolderSelect?.(null);
        safeSetSelectedNode(accountsDocument.header.id);
      } else {
        // Auto-create accounts document with name "Accounts"
        void createAccountsDocument();
      }
      return;
    }

    // TODO: Uncomment when Subscriptions feature is ready
    // if (
    //   node.id === subscriptionsFolder?.id ||
    //   node.id === "subscriptions-placeholder"
    // ) {
    //   onFolderSelect?.({
    //     folderId: subscriptionsFolder?.id || "",
    //     folderType: "subscriptions",
    //   });
    //   safeSetSelectedNode("");
    //   return;
    // }

    // Check if clicking Billing folder
    if (node.id === billingFolder?.id || node.id === "billing-placeholder") {
      onFolderSelect?.({
        folderId: billingFolder?.id || "",
        folderType: "billing",
      });
      safeSetSelectedNode("");
      return;
    }

    // Check if clicking a month folder - just let it expand, don't navigate or select
    if (monthFolderIds.has(node.id)) {
      return;
    }

    // Check if clicking a Payments folder
    if (paymentsFolderIds.has(node.id)) {
      // Find the month name for this payments folder
      for (const [monthName, info] of monthFolders.entries()) {
        if (info.paymentsFolder?.id === node.id) {
          onFolderSelect?.({
            folderId: node.id,
            folderType: "payments",
            monthName,
            reportingFolderId: info.reportingFolder?.id,
          });
          safeSetSelectedNode("");
          return;
        }
      }
    }

    // Check if clicking a Reporting folder
    if (reportingFolderIds.has(node.id)) {
      // Find the month name for this reporting folder
      for (const [monthName, info] of monthFolders.entries()) {
        if (info.reportingFolder?.id === node.id) {
          onFolderSelect?.({
            folderId: node.id,
            folderType: "reporting",
            monthName,
            paymentsFolderId: info.paymentsFolder?.id,
          });
          safeSetSelectedNode("");
          return;
        }
      }
    }

    // Default: clear selection
    onFolderSelect?.(null);
    safeSetSelectedNode("");
  };

  // Use a stable key based on the drive ID only
  // Previously this changed on every folder/document add, causing sidebar to remount and lose collapsed state
  const sidebarKey = driveDocument?.header.id || "empty";

  return (
    <>
      <SidebarProvider nodes={navigationSections}>
        <style>
          {`
            .folder-tree-sidebar .sidebar__item-caret--no-children {
              visibility: hidden;
            }
            .folder-tree-sidebar .sidebar__header-icon {
              display: none;
            }
          `}
        </style>
        <Sidebar
          key={sidebarKey}
          className="pt-1 folder-tree-sidebar"
          nodes={navigationSections}
          activeNodeId={sanitizedActiveNodeId}
          onActiveNodeChange={handleActiveNodeChange}
          sidebarTitle={
            operationalHubProfileDocument?.state?.global?.name ||
            "Operational Hub"
          }
          showSearchBar={false}
          resizable={true}
          allowPinning={false}
          showStatusFilter={false}
          initialWidth={256}
          defaultLevel={2}
          handleOnTitleClick={() => {
            onFolderSelect?.(null);
            safeSetSelectedNode("");
            setActiveNodeId("");
          }}
        />
      </SidebarProvider>
    </>
  );
}
