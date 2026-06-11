import {
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/document-engineering";
import {
  setSelectedNode,
  useSelectedDrive,
  isFolderNodeKind,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import type {
  Node,
  FolderNode,
  FileNode,
} from "@powerhousedao/shared/document-drive";
import {
  ArrowLeftRight,
  Banknote,
  CreditCard,
  FileText,
  Folder,
  Layers,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const ICON_SIZE = 16;
const CUSTOMERS_FOLDER_NAME = "Customers";
const SERVICES_AND_OFFERINGS_FOLDER_NAME = "Services And Offerings";
const RESOURCE_TEMPLATES_FOLDER_NAME = "Products";
const SERVICE_OFFERINGS_FOLDER_NAME = "Service Offerings";
const PAYMENT_ACCOUNT_DOCUMENT_TYPE = "powerhouse/payment-account";
const PAYMENT_DOCUMENTS_SECTION_ID = "payment-documents";
const PAYMENT_DOCUMENTS_SECTION_TITLE = "Payment documents";

/**
 * Synthetic sidebar ids for the Stripe embedded views under the
 * "Payment documents" section. Each opens a full custom view rendering the
 * matching Stripe Connect embedded component(s).
 */
export const STRIPE_VIEW_IDS = [
  "stripe-payments",
  "stripe-payouts",
  "stripe-documents",
  "stripe-account",
] as const;
export type StripeViewId = (typeof STRIPE_VIEW_IDS)[number];

export function isStripeViewId(id: string | null): id is StripeViewId {
  return STRIPE_VIEW_IDS.includes(id as StripeViewId);
}

/** Custom view types that don't correspond to document models */
export type CustomView =
  | "resources-services"
  | "customers"
  | StripeViewId
  | null;

/** Maps navigation section IDs to custom view identifiers. */
const SECTION_TO_CUSTOM_VIEW: Record<string, CustomView> = {
  customers: "customers",
  "resources-services": "resources-services",
};

/**
 * Base navigation sections for the Service Offering App.
 * Sections get dynamic children added from the matching drive folders.
 */
const BASE_NAVIGATION_SECTIONS: SidebarNode[] = [
  {
    id: "resources-services",
    title: "Service Offerings",
    icon: <Layers size={ICON_SIZE} />,
  },
  {
    id: "customers",
    title: "Customers",
    icon: <Users size={ICON_SIZE} />,
  },
];

/**
 * Recursively builds SidebarNode children from folder contents.
 * Folders get folder icons, files get document icons. Pass `folderIcon` to
 * override the icon used for folders in this subtree (e.g. a customer icon for
 * the Customers section).
 */
function buildSidebarNodesFromFolder(
  parentId: string,
  allNodes: Node[],
  folderIcon?: SidebarNode["icon"],
): SidebarNode[] {
  const childNodes = allNodes.filter((node) => {
    if (isFolderNodeKind(node)) {
      return node.parentFolder === parentId;
    }
    if (isFileNodeKind(node)) {
      return (node as FileNode).parentFolder === parentId;
    }
    return false;
  });

  return childNodes.map((node) => {
    const isFolder = isFolderNodeKind(node);
    const sidebarNode: SidebarNode = {
      id: node.id,
      title: node.name,
      icon: isFolder ? (
        (folderIcon ?? <Folder size={ICON_SIZE} />)
      ) : (
        <FileText size={ICON_SIZE} />
      ),
    };

    if (isFolder) {
      const children = buildSidebarNodesFromFolder(
        node.id,
        allNodes,
        folderIcon,
      );
      if (children.length > 0) {
        sidebarNode.children = children;
      }
    }

    return sidebarNode;
  });
}

type FolderTreeProps = {
  onCustomViewChange?: (view: CustomView) => void;
};

/**
 * Sidebar for the Service Offering App.
 * Two sections: Customers and Service Offerings (Products + Service
 * Offerings folders inside the "Services And Offerings" parent). Each section
 * routes to its own custom view; child folder/document clicks navigate within
 * that view.
 */
export function FolderTree({ onCustomViewChange }: FolderTreeProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(
    BASE_NAVIGATION_SECTIONS[0].id,
  );

  const [driveDocument] = useSelectedDrive();

  // Find the "Customers" folder in the drive
  const customersFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FolderNode =>
        isFolderNodeKind(node) && node.name === CUSTOMERS_FOLDER_NAME,
    );
  }, [driveDocument]);

  // Find the payment-account document (auto-created at the drive root when
  // the operator drive is provisioned; holds the Stripe onboarding).
  const paymentAccountFile = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FileNode =>
        isFileNodeKind(node) &&
        node.documentType === PAYMENT_ACCOUNT_DOCUMENT_TYPE,
    );
  }, [driveDocument]);

  // Find the "Services And Offerings" parent folder in the drive (at root level)
  const servicesAndOfferingsFolder = useMemo(() => {
    if (!driveDocument) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FolderNode =>
        isFolderNodeKind(node) &&
        node.name === SERVICES_AND_OFFERINGS_FOLDER_NAME &&
        !node.parentFolder,
    );
  }, [driveDocument]);

  // Find the "Products" folder (inside Services And Offerings folder)
  const resourceTemplatesFolder = useMemo(() => {
    if (!driveDocument || !servicesAndOfferingsFolder) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FolderNode =>
        isFolderNodeKind(node) &&
        node.name === RESOURCE_TEMPLATES_FOLDER_NAME &&
        node.parentFolder === servicesAndOfferingsFolder.id,
    );
  }, [driveDocument, servicesAndOfferingsFolder]);

  // Find the "Service Offerings" folder (inside Services And Offerings folder)
  const serviceOfferingsFolder = useMemo(() => {
    if (!driveDocument || !servicesAndOfferingsFolder) return null;
    const nodes = driveDocument.state.global.nodes;
    return nodes.find(
      (node: Node): node is FolderNode =>
        isFolderNodeKind(node) &&
        node.name === SERVICE_OFFERINGS_FOLDER_NAME &&
        node.parentFolder === servicesAndOfferingsFolder.id,
    );
  }, [driveDocument, servicesAndOfferingsFolder]);

  // Collect all node IDs descended from a given parent folder
  function collectDescendantIds(
    parentId: string,
    allNodes: Node[],
  ): Set<string> {
    const ids = new Set<string>();
    const visit = (id: string) => {
      ids.add(id);
      for (const node of allNodes) {
        if (isFolderNodeKind(node) && node.parentFolder === id) {
          visit(node.id);
        } else if (isFileNodeKind(node) && node.parentFolder === id) {
          ids.add(node.id);
        }
      }
    };
    visit(parentId);
    return ids;
  }

  const customersNodeIds = useMemo(() => {
    if (!customersFolder || !driveDocument) return new Set<string>();
    return collectDescendantIds(
      customersFolder.id,
      driveDocument.state.global.nodes,
    );
  }, [customersFolder, driveDocument]);

  const resourceTemplatesNodeIds = useMemo(() => {
    if (!resourceTemplatesFolder || !driveDocument) return new Set<string>();
    return collectDescendantIds(
      resourceTemplatesFolder.id,
      driveDocument.state.global.nodes,
    );
  }, [resourceTemplatesFolder, driveDocument]);

  const serviceOfferingsNodeIds = useMemo(() => {
    if (!serviceOfferingsFolder || !driveDocument) return new Set<string>();
    return collectDescendantIds(
      serviceOfferingsFolder.id,
      driveDocument.state.global.nodes,
    );
  }, [serviceOfferingsFolder, driveDocument]);

  // Build navigation sections with dynamic children
  const navigationSections = useMemo(() => {
    if (!driveDocument) {
      return BASE_NAVIGATION_SECTIONS;
    }

    const allNodes = driveDocument.state.global.nodes;

    // Customers children = direct contents of the folder. Each customer is a
    // folder, so use a customer icon instead of the generic folder icon.
    const customersChildren = customersFolder
      ? buildSidebarNodesFromFolder(
          customersFolder.id,
          allNodes,
          <UserRound size={ICON_SIZE} />,
        )
      : [];

    // Resources & Services children = Products + Service Offerings subfolders
    const resourcesServicesChildren: SidebarNode[] = [];
    if (resourceTemplatesFolder) {
      const resourceTemplatesChildren = buildSidebarNodesFromFolder(
        resourceTemplatesFolder.id,
        allNodes,
      );
      resourcesServicesChildren.push({
        id: resourceTemplatesFolder.id,
        title: RESOURCE_TEMPLATES_FOLDER_NAME,
        icon: <Folder size={ICON_SIZE} />,
        children:
          resourceTemplatesChildren.length > 0
            ? resourceTemplatesChildren
            : undefined,
      });
    }
    if (serviceOfferingsFolder) {
      const serviceOfferingsChildren = buildSidebarNodesFromFolder(
        serviceOfferingsFolder.id,
        allNodes,
      );
      resourcesServicesChildren.push({
        id: serviceOfferingsFolder.id,
        title: SERVICE_OFFERINGS_FOLDER_NAME,
        icon: <Folder size={ICON_SIZE} />,
        children:
          serviceOfferingsChildren.length > 0
            ? serviceOfferingsChildren
            : undefined,
      });
    }

    const sections = BASE_NAVIGATION_SECTIONS.map((section) => {
      if (section.id === "customers" && customersChildren.length > 0) {
        return { ...section, children: customersChildren };
      }
      if (
        section.id === "resources-services" &&
        resourcesServicesChildren.length > 0
      ) {
        return { ...section, children: resourcesServicesChildren };
      }
      return section;
    });

    // Payment documents section — the payment-account document (Stripe
    // onboarding/KYC editor) plus one child per Stripe embedded view. Only
    // shown when the doc exists (drives provisioned before auto-creation can
    // add it manually); the views themselves prompt for verification until
    // KYC is complete.
    if (paymentAccountFile) {
      sections.push({
        id: PAYMENT_DOCUMENTS_SECTION_ID,
        title: PAYMENT_DOCUMENTS_SECTION_TITLE,
        icon: <CreditCard size={ICON_SIZE} />,
        children: [
          {
            id: paymentAccountFile.id,
            title: "Payment account",
            icon: <FileText size={ICON_SIZE} />,
          },
          {
            id: "stripe-payments",
            title: "Payments",
            icon: <ArrowLeftRight size={ICON_SIZE} />,
          },
          {
            id: "stripe-payouts",
            title: "Payouts & balance",
            icon: <Banknote size={ICON_SIZE} />,
          },
          {
            id: "stripe-documents",
            title: "Documents",
            icon: <FileText size={ICON_SIZE} />,
          },
          {
            id: "stripe-account",
            title: "Account",
            icon: <Settings size={ICON_SIZE} />,
          },
        ],
      });
    }

    return sections;
  }, [
    driveDocument,
    customersFolder,
    resourceTemplatesFolder,
    serviceOfferingsFolder,
    paymentAccountFile,
  ]);

  const driveName = driveDocument?.state.global.name || "Service Offerings";

  const handleActiveNodeChange = (node: SidebarNode) => {
    setActiveNodeId(node.id);

    // Stripe embedded views (synthetic children of "Payment documents")
    if (isStripeViewId(node.id)) {
      onCustomViewChange?.(node.id);
      setSelectedNode("");
      return;
    }

    // Payment-account doc child, or the "Payment documents" parent itself —
    // both open the document editor (Stripe onboarding/KYC).
    if (
      paymentAccountFile &&
      (node.id === paymentAccountFile.id ||
        node.id === PAYMENT_DOCUMENTS_SECTION_ID)
    ) {
      onCustomViewChange?.(null);
      setSelectedNode(paymentAccountFile.id);
      return;
    }

    // Child node within Customers tree
    if (customersNodeIds.has(node.id)) {
      const driveNode = driveDocument?.state.global.nodes.find(
        (n: Node) => n.id === node.id,
      );
      if (driveNode && isFolderNodeKind(driveNode)) {
        onCustomViewChange?.("customers");
        setSelectedNode(node.id);
      } else if (driveNode && isFileNodeKind(driveNode)) {
        onCustomViewChange?.(null);
        setSelectedNode(node.id);
      }
      return;
    }

    // Child node within Products tree
    if (resourceTemplatesNodeIds.has(node.id)) {
      const driveNode = driveDocument?.state.global.nodes.find(
        (n: Node) => n.id === node.id,
      );
      if (driveNode && isFolderNodeKind(driveNode)) {
        onCustomViewChange?.("resources-services");
        setSelectedNode(node.id);
      } else if (driveNode && isFileNodeKind(driveNode)) {
        onCustomViewChange?.(null);
        setSelectedNode(node.id);
      }
      return;
    }

    // Child node within Service Offerings tree
    if (serviceOfferingsNodeIds.has(node.id)) {
      const driveNode = driveDocument?.state.global.nodes.find(
        (n: Node) => n.id === node.id,
      );
      if (driveNode && isFolderNodeKind(driveNode)) {
        onCustomViewChange?.("resources-services");
        setSelectedNode(node.id);
      } else if (driveNode && isFileNodeKind(driveNode)) {
        onCustomViewChange?.(null);
        setSelectedNode(node.id);
      }
      return;
    }

    // Top-level section: switch to its custom view
    const customView = SECTION_TO_CUSTOM_VIEW[node.id];
    if (customView) {
      onCustomViewChange?.(customView);
      setSelectedNode("");
      return;
    }

    onCustomViewChange?.(null);
  };

  return (
    <SidebarProvider nodes={navigationSections}>
      <Sidebar
        className="pt-1"
        nodes={navigationSections}
        activeNodeId={activeNodeId}
        onActiveNodeChange={handleActiveNodeChange}
        sidebarTitle={driveName}
        showSearchBar={false}
        resizable={true}
        allowPinning={false}
        showStatusFilter={false}
        initialWidth={256}
        defaultLevel={2}
        handleOnTitleClick={() => {
          onCustomViewChange?.(null);
          setSelectedNode("");
        }}
      />
    </SidebarProvider>
  );
}
