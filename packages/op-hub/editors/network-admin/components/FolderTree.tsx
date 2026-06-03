import {
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/document-engineering";
import {
  setSelectedNode,
  useSelectedDriveSafe,
  useDocumentsInSelectedDrive,
} from "@powerhousedao/reactor-browser";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import { useMemo, useCallback } from "react";
import { PaymentIcon } from "./icons/PaymentIcon.js";
import { RfpIcon } from "./icons/RfpIcon.js";
import { SowIcon } from "./icons/SowIcon.js";
import { WorkstreamIcon } from "./icons/WorkstreamIcon.js";
import { EarthIcon } from "./icons/EarthIcon.js";
import type { WorkstreamDocument } from "document-models/workstream";
import type { NetworkProfileDocument } from "document-models/network-profile";
import type { RequestForProposalsDocument } from "document-models/request-for-proposals";
import type { PaymentTermsDocument } from "document-models/payment-terms";
import type { BuildersDocument } from "document-models/builders";
import { type PHDocument } from "document-model";

const WorkstreamStatusEnums = [
  "RFP_DRAFT",
  "PREWORK_RFC",
  "RFP_CANCELLED",
  "OPEN_FOR_PROPOSALS",
  "PROPOSAL_SUBMITTED",
  "NOT_AWARDED",
  "AWARDED",
  "IN_PROGRESS",
  "FINISHED",
];

interface FolderTreeProps {
  activeSidebarNodeId: string;
  setActiveSidebarNodeId: (id: string) => void;
  setSelectedRootNode: (node: string) => void;
  createBuildersDocument: () => Promise<FileNode | null | undefined>;
}

/**
 * Hierarchical folder tree navigation component using Sidebar from document-engineering.
 * Displays folders and files in a tree structure with expand/collapse functionality, search, and resize support.
 */
export function FolderTree({
  activeSidebarNodeId,
  setActiveSidebarNodeId,
  setSelectedRootNode,
  createBuildersDocument,
}: FolderTreeProps) {
  const [selectedDrive] = useSelectedDriveSafe();
  const allDocuments = useDocumentsInSelectedDrive();

  const networkAdminDocuments = useMemo(
    () =>
      allDocuments?.filter(
        (doc: PHDocument) =>
          doc.header.documentType === "powerhouse/network-profile" ||
          doc.header.documentType === "powerhouse/workstream" ||
          doc.header.documentType === "powerhouse/scopeofwork" ||
          doc.header.documentType === "powerhouse/rfp" ||
          doc.header.documentType === "payment-terms" ||
          doc.header.documentType === "powerhouse/builders",
      ),
    [allDocuments],
  );

  // Convert network admin documents to SidebarNode format
  const sidebarNodes = useMemo((): SidebarNode[] => {
    // Group documents by type
    const workstreamDocs = (networkAdminDocuments?.filter(
      (doc) => doc.header.documentType === "powerhouse/workstream",
    ) ?? []) as WorkstreamDocument[];
    const networkProfileDocs = (networkAdminDocuments?.filter(
      (doc) => doc.header.documentType === "powerhouse/network-profile",
    ) ?? []) as NetworkProfileDocument[];
    const [buildersDoc] = (networkAdminDocuments?.filter(
      (doc) => doc.header.documentType === "powerhouse/builders",
    ) ?? []) as BuildersDocument[];

    const workstreamsNode: SidebarNode = {
      id: "workstreams",
      title: "Workstreams",
      children: [
        ...WorkstreamStatusEnums.map((status) => {
          const statusTitle = status
            .toLowerCase()
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return {
            id: `workstream-status-${status}`,
            title:
              statusTitle +
              (workstreamDocs.filter(
                (doc) => doc.state.global.status === status,
              ).length > 0
                ? ` (${workstreamDocs.filter((doc) => doc.state.global.status === status).length})`
                : ""),
            children: workstreamDocs
              .filter((doc) => doc.state.global.status === status)
              .map((doc) => {
                let sow = null;
                let paymentTerms = null;
                let rfp = null;
                if (doc.state.global.initialProposal) {
                  sow = doc.state.global.initialProposal.sow;
                  paymentTerms = doc.state.global.initialProposal.paymentTerms;
                }

                if (doc.state.global.rfp) {
                  rfp = doc.state.global.rfp.id;
                }

                const sowDoc = allDocuments?.find((d) => d.header.id === sow);
                const rfpDoc = allDocuments?.find(
                  (d) => d.header.id === rfp,
                ) as RequestForProposalsDocument | undefined;
                const pmtDoc = allDocuments?.find(
                  (d) => d.header.id === paymentTerms,
                ) as PaymentTermsDocument | undefined;

                // get alternative proposals
                const alternativeProposals =
                  doc.state.global.alternativeProposals;

                const returnableChildren: SidebarNode = {
                  id: `editor-${doc.header.id}`,
                  title: `${doc.state.global.code ? doc.state.global.code + " - " : ""}${doc.state.global.title || doc.header.name}`,
                  icon: <WorkstreamIcon className="w-5 h-5" />,
                  children: rfpDoc
                    ? [
                        {
                          id: `editor-${rfpDoc.header.id}`,
                          title: "Request For Proposal",
                          icon: <RfpIcon className="w-5 h-5" />,
                        },
                      ]
                    : [],
                };

                // if sowDoc or pmtDoc is included, add a child with title "Initial Proposal"
                const children: SidebarNode[] = [];
                if (sowDoc) {
                  children.push({
                    id: `editor-${sowDoc.header.id}`,
                    title: "Scope of Work",
                    icon: <SowIcon className="w-5 h-5" />,
                  });
                }
                if (pmtDoc) {
                  children.push({
                    id: `editor-${pmtDoc.header.id}`,
                    title: "Payment Terms",
                    icon: <PaymentIcon className="w-5 h-5" />,
                  });
                }
                if (children.length) {
                  returnableChildren.children = [
                    ...(returnableChildren.children ?? []),
                    {
                      id: "initial-proposal",
                      title: "Initial Proposal",
                      children: children,
                    },
                  ];
                }

                if (alternativeProposals.length > 0) {
                  returnableChildren.children = [
                    ...(returnableChildren.children ?? []),
                    {
                      id: "alternative-proposals",
                      title: `Alternative Proposals (${alternativeProposals.length})`,
                      children: alternativeProposals.map((proposal) => {
                        const proposalSowDoc = allDocuments?.find(
                          (d) => d.header.id === proposal.sow,
                        );
                        const proposalPaymentTermsDoc = allDocuments?.find(
                          (d) => d.header.id === proposal.paymentTerms,
                        ) as PaymentTermsDocument | undefined;

                        const proposalChildDocs = [
                          proposalSowDoc,
                          proposalPaymentTermsDoc,
                        ].filter((d) => d !== undefined && d !== null);

                        return {
                          id: `alternative-proposal-${proposal.id}`,
                          title: `${proposal.author.name}`,
                          children: proposalChildDocs.map((childDoc) => {
                            const dynamicTitle =
                              childDoc.header.documentType ===
                              "powerhouse/scopeofwork"
                                ? "Scope of Work"
                                : childDoc.header.documentType ===
                                    "payment-terms"
                                  ? "Payment Terms"
                                  : "";
                            return {
                              id: `editor-${childDoc.header.id}`,
                              title: dynamicTitle,
                              icon:
                                childDoc.header.documentType ===
                                "powerhouse/scopeofwork" ? (
                                  <SowIcon className="w-5 h-5" />
                                ) : (
                                  <PaymentIcon className="w-5 h-5" />
                                ),
                            };
                          }),
                        };
                      }),
                    },
                  ];
                }

                return returnableChildren;
              }),
          };
        }),
      ],
    };

    const networkInfoNode: SidebarNode = {
      id: "network-information",
      title: "Network Information",
      children: [
        ...networkProfileDocs.map((doc) => ({
          id: `editor-${doc.header.id}`,
          title: "Network Profile",
          icon: <EarthIcon className="w-5 h-5" />,
        })),
      ],
    };

    const buildersNode: SidebarNode = {
      id: `editor-${buildersDoc?.header.id}`,
      title: "Builders",
      children: [],
    };

    return [workstreamsNode, networkInfoNode, buildersNode];
  }, [networkAdminDocuments, allDocuments]);

  const sidebarTitle = useMemo(() => {
    const networkProfileDoc = networkAdminDocuments?.find(
      (doc) => doc.header.documentType === "powerhouse/network-profile",
    ) as NetworkProfileDocument | undefined;
    return networkProfileDoc?.state.global.name || "Network Admin";
  }, [networkAdminDocuments]);

  // Handle sidebar node selection
  const handleActiveNodeChange = useCallback(
    (nodeId: string) => {
      const findNodeById = (
        nodes: SidebarNode[],
        id: string,
      ): SidebarNode | null => {
        for (const node of nodes) {
          if (node.id === id) {
            return node;
          }
          if (node.children) {
            const found = findNodeById(node.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const newNode = findNodeById(sidebarNodes, nodeId);
      if (!newNode) return;

      setActiveSidebarNodeId(newNode.id);

      if (newNode.id === "workstreams") {
        setSelectedNode(undefined);
        setSelectedRootNode("workstreams");
      } else if (newNode.id === "network-information") {
        setSelectedNode(undefined);
        setSelectedRootNode("network-information");
      } else if (newNode.id.startsWith("editor-")) {
        createBuildersDocument();
        const fileId = newNode.id.replace("editor-", "");
        setSelectedNode(fileId);
      }
    },
    [
      sidebarNodes,
      setActiveSidebarNodeId,
      setSelectedRootNode,
      createBuildersDocument,
    ],
  );

  return (
    <SidebarProvider nodes={sidebarNodes}>
      <Sidebar
        nodes={sidebarNodes}
        activeNodeId={activeSidebarNodeId}
        onActiveNodeChange={(node) => handleActiveNodeChange(node.id)}
        sidebarTitle={sidebarTitle}
        showSearchBar={true}
        allowPinning={true}
        resizable={true}
        initialWidth={300}
        maxWidth={500}
        enableMacros={4}
        handleOnTitleClick={() => {
          setSelectedNode(undefined);
          setActiveSidebarNodeId("workstreams");
          setSelectedRootNode("workstreams");
        }}
      />
    </SidebarProvider>
  );
}
