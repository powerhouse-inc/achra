import {
  SidebarProvider,
  Sidebar,
  Icon,
  useSidebar,
} from "@powerhousedao/document-engineering";
import type { IconName } from "@powerhousedao/document-engineering";
import { useState, useEffect, useMemo } from "react";
import type { ReactElement } from "react";
import ScopeOfWork from "./scopeOfWork.js";
import Roadmap from "./roadmap.js";
import Milestone from "./milestone.js";
import Deliverable from "./deliverable.js";
import Projects from "./projects.js";
import Project from "./project.js";
import Deliverables from "./deliverables.js";
import Roadmaps from "./roadmaps.js";
import Contributors from "./contributors.js";
import BreadCrumbs from "../components/breadCrumbs.js";
import { useSelectedScopeOfWorkDocument } from "../../../document-models/scope-of-work/v1/hooks.js";
import {
  type Milestone as MilestoneType,
  type Roadmap as RoadmapType,
  type Project as ProjectType,
  type Deliverable as DeliverableType,
} from "../../../document-models/scope-of-work/v1/gen/types.js";

type SidebarNode = {
  id: string;
  title: string;
  children: SidebarNode[];
  icon?: IconName | ReactElement;
  expandedIcon?: IconName | ReactElement;
  status?: NodeStatus;
};

type BreadcrumbItem = {
  id: string;
  title: string;
  type:
    | "root"
    | "roadmaps"
    | "roadmap"
    | "milestone"
    | "projects"
    | "project"
    | "deliverables"
    | "deliverable"
    | "contributors";
  isActive: boolean;
};

enum NodeStatus {
  CREATED = "CREATED",
  MODIFIED = "MODIFIED",
  REMOVED = "REMOVED",
  MOVED = "MOVED",
  DUPLICATED = "DUPLICATED",
  UNCHANGED = "UNCHANGED", // default status, no need to set it
}

// Custom hook to track sidebar width changes
const useSidebarWidth = () => {
  const [sidebarWidth, setSidebarWidth] = useState(300); // default width
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      const width = getComputedStyle(document.documentElement)
        .getPropertyValue("--sidebar-width")
        .trim();

      if (width) {
        const widthValue = parseInt(width);
        setSidebarWidth(widthValue);
        setIsSidebarOpen(widthValue > 8); // sidebar is collapsed when width is 8px
      }
    };

    // Initial update
    updateWidth();

    // Listen for sidebar resize events
    const handleResize = () => updateWidth();
    const handleResizeActive = () => updateWidth();
    const handleToggle = () => updateWidth();

    document.addEventListener("sidebar:resize", handleResize);
    document.addEventListener("sidebar:resize:active", handleResizeActive);
    document.addEventListener("sidebar:resize:toggle", handleToggle);

    // Also listen for CSS custom property changes
    const observer = new MutationObserver(updateWidth);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      document.removeEventListener("sidebar:resize", handleResize);
      document.removeEventListener("sidebar:resize:active", handleResizeActive);
      document.removeEventListener("sidebar:resize:toggle", handleToggle);
      observer.disconnect();
    };
  }, []);

  return { sidebarWidth, isSidebarOpen };
};

export default function SidebarMenu() {
  const [doc, dispatch] = useSelectedScopeOfWorkDocument();

  if (!doc) return null;

  const state = doc.state.global;

  const { roadmaps, deliverables, projects, contributors } = state;
  const milestones: MilestoneType[] = state.roadmaps.flatMap(
    (r: RoadmapType) => r.milestones,
  );
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(
    undefined,
  );

  const { sidebarWidth, isSidebarOpen } = useSidebarWidth();

  // Generate breadcrumbs based on activeNodeId
  const generateBreadcrumbs = (
    activeNodeId: string | undefined,
  ): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        id: "root",
        title: state.title || "Scope of Work",
        type: "root",
        isActive: !activeNodeId,
      },
    ];

    if (!activeNodeId) {
      return breadcrumbs;
    }

    const parts = activeNodeId.split(".");
    const type = parts[0];
    const id = parts[1];

    switch (type) {
      case "roadmaps":
        breadcrumbs.push({
          id: "roadmaps",
          title: "Roadmaps",
          type: "roadmaps",
          isActive: true,
        });
        break;

      case "roadmap":
        breadcrumbs.push(
          {
            id: "roadmaps",
            title: "Roadmaps",
            type: "roadmaps",
            isActive: false,
          },
          {
            id: `roadmap.${id}`,
            title:
              roadmaps.find((r: RoadmapType) => r.id === id)?.title ||
              "Unknown Roadmap",
            type: "roadmap",
            isActive: true,
          },
        );
        break;

      case "milestone": {
        const milestone = milestones.find((m) => m.id === id);
        const roadmap = roadmaps.find((r: RoadmapType) =>
          r.milestones.some((m) => m.id === id),
        );

        breadcrumbs.push(
          {
            id: "roadmaps",
            title: "Roadmaps",
            type: "roadmaps",
            isActive: false,
          },
          {
            id: `roadmap.${roadmap?.id}`,
            title: roadmap?.title || "Unknown Roadmap",
            type: "roadmap",
            isActive: false,
          },
          {
            id: `milestone.${id}`,
            title: milestone?.sequenceCode
              ? `${milestone.sequenceCode} - ${milestone.title}`
              : milestone?.title || "Unknown Milestone",
            type: "milestone",
            isActive: true,
          },
        );
        break;
      }
      case "projects":
        breadcrumbs.push({
          id: "projects",
          title: "Projects",
          type: "projects",
          isActive: true,
        });
        break;

      case "project": {
        const project = projects.find((p: ProjectType) => p.id === id);
        breadcrumbs.push(
          {
            id: "projects",
            title: "Projects",
            type: "projects",
            isActive: false,
          },
          {
            id: `project.${id}`,
            title: project?.code
              ? `${project.code} - ${project.title}`
              : project?.title || "Unknown Project",
            type: "project",
            isActive: true,
          },
        );
        break;
      }
      case "deliverables":
        breadcrumbs.push({
          id: "deliverables",
          title: "Deliverables",
          type: "deliverables",
          isActive: true,
        });
        break;

      case "deliverable": {
        const deliverable = deliverables.find(
          (d: DeliverableType) => d.id === id,
        );
        breadcrumbs.push(
          {
            id: "deliverables",
            title: "Deliverables",
            type: "deliverables",
            isActive: false,
          },
          {
            id: `deliverable.${id}`,
            title: deliverable?.title || "Unknown Deliverable",
            type: "deliverable",
            isActive: true,
          },
        );
        break;
      }
      case "contributors": {
        breadcrumbs.push({
          id: "contributors",
          title: "Contributors",
          type: "contributors",
          isActive: true,
        });
        break;
      }
    }

    return breadcrumbs;
  };

  // Generate breadcrumbs based on current state
  const breadcrumbs = useMemo(() => {
    return generateBreadcrumbs(activeNodeId);
  }, [activeNodeId, roadmaps, milestones, projects, deliverables]);

  // Handle breadcrumb clicks
  const handleBreadcrumbClick = (id: string) => {
    if (id === "root") {
      setActiveNodeId(undefined);
    } else {
      setActiveNodeId(id);
    }
  };

  // Use useMemo to recalculate nodes whenever the state changes
  const nodes: SidebarNode[] = useMemo(
    () => [
      {
        id: "roadmaps",
        title: "Roadmaps",
        children: roadmaps.map((roadmap: RoadmapType) => ({
          id: `roadmap.${roadmap.id}`,
          title: roadmap.title,
          children: roadmap.milestones.map((milestone) => ({
            id: `milestone.${milestone.id}`,
            title: milestone.sequenceCode
              ? `${milestone.sequenceCode} - ${milestone.title}`
              : milestone.title,
            children: [],
          })),
        })),
      },
      {
        id: "projects",
        title: "Projects",
        children: projects.map((project: ProjectType) => ({
          id: `project.${project.id}`,
          title: project.code
            ? `${project.code} - ${project.title}`
            : project.title,
          children: [],
        })),
      },
      {
        id: "deliverables",
        title: "Deliverables",
        children: deliverables.map((deliverable: DeliverableType) => ({
          id: `deliverable.${deliverable.id}`,
          title: deliverable.code
            ? `${deliverable.code} - ${deliverable.title}`
            : deliverable.title,
          children: [],
        })),
      },
      {
        id: "contributors",
        title: "Contributors",
        children: [],
      },
    ],
    [roadmaps, deliverables, state],
  ); // Dependencies that should trigger recalculation

  // Component that updates sidebar nodes when state changes
  const SidebarUpdater = ({ nodes }: { nodes: SidebarNode[] }) => {
    const { setNodes } = useSidebar();

    useEffect(() => {
      setNodes(nodes);
    }, [nodes, setNodes]);

    return null;
  };

  const displayActiveNode = (activeNodeId: string) => {
    const id = activeNodeId.split(".")[1];
    const name = activeNodeId.split(".")[0];

    switch (name) {
      case "roadmaps":
        return (
          <Roadmaps
            dispatch={dispatch}
            roadmaps={roadmaps}
            setActiveNodeId={setActiveNodeId}
          />
        );
      case "roadmap":
        return (
          <Roadmap
            dispatch={dispatch}
            roadmaps={roadmaps.filter((r: RoadmapType) => r.id === id)}
            setActiveNodeId={setActiveNodeId}
          />
        );
      case "milestone":
        return (
          <Milestone
            dispatch={dispatch}
            milestones={milestones.filter((m) => m.id === id)}
            roadmaps={roadmaps}
            deliverables={deliverables}
            setActiveNodeId={setActiveNodeId}
            contributors={contributors}
          />
        );
      case "deliverables":
        return (
          <Deliverables
            dispatch={dispatch}
            deliverables={deliverables}
            milestones={milestones}
            projects={projects}
            setActiveNodeId={setActiveNodeId}
            document={doc}
          />
        );
      case "deliverable":
        return (
          <Deliverable
            dispatch={dispatch}
            deliverables={deliverables.filter(
              (d: DeliverableType) => d.id === id,
            )}
            projects={projects}
            contributors={contributors}
          />
        );
      case "projects":
        return (
          <Projects
            dispatch={dispatch}
            projects={projects}
            setActiveNodeId={setActiveNodeId}
            contributors={contributors}
          />
        );
      case "project":
        return (
          <Project
            dispatch={dispatch}
            project={projects.find((p: ProjectType) => p.id === id)}
            deliverables={deliverables}
            setActiveNodeId={setActiveNodeId}
            contributors={contributors}
          />
        );
      case "contributors":
        return <Contributors dispatch={dispatch} contributors={contributors} />;
    }
  };

  return (
    <div className="flex" style={{ height: "calc(100vh - 80px)" }}>
      <style>
        {`
          .sidebar-container {
            height: calc(100vh - 80px) !important;
            max-height: calc(100vh - 80px) !important;
          }
        `}
      </style>
      <SidebarProvider nodes={nodes}>
        <SidebarUpdater nodes={nodes} />
        <Sidebar
          className={String.raw`
            [&_.sidebar\\_\\_item--active]:text-black
            sidebar-container
          `}
          sidebarTitle="Scope of Work"
          sidebarIcon={<Icon name="Globe" />}
          enableMacros={3}
          allowPinning={true}
          resizable={true}
          activeNodeId={activeNodeId}
          onActiveNodeChange={(node) => {
            setActiveNodeId(node.id);
          }}
          handleOnTitleClick={() => {
            setActiveNodeId(undefined);
          }}
        />
      </SidebarProvider>

      {/* Main content area that adjusts based on sidebar width */}
      <div
        className="flex-1 overflow-y-auto transition-all duration-75 ease-linear container"
        style={{
          marginLeft: isSidebarOpen ? `0` : "8px",
          width: isSidebarOpen
            ? `calc(100vw - ${sidebarWidth}px)`
            : "calc(100vw - 8px)",
        }}
      >
        {activeNodeId ? (
          <>
            <BreadCrumbs
              breadcrumbs={breadcrumbs}
              onBreadcrumbClick={handleBreadcrumbClick}
            />
            {displayActiveNode(activeNodeId)}
          </>
        ) : (
          <>
            <BreadCrumbs
              breadcrumbs={breadcrumbs}
              onBreadcrumbClick={handleBreadcrumbClick}
            />
            <ScopeOfWork
              document={doc}
              dispatch={dispatch}
              setActiveNodeId={setActiveNodeId}
            />
          </>
        )}
      </div>
    </div>
  );
}
