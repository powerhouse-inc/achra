import { useMemo, useCallback, useState, useEffect } from "react";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import type { PHDocument } from "document-model";
import { useDrives, useGetDocuments } from "@powerhousedao/reactor-browser";
import type { BuilderProfileDocument } from "document-models/builder-profile";
import { useRemoteBuilderProfiles } from "../../../shared/hooks/useRemoteBuilderProfiles.js";

type TeamMember = {
  phid: string;
  name: string;
  icon: string | null;
};

type TeamMembersOverviewProps = {
  contributors: string[] | undefined;
};

const MAX_VISIBLE_MEMBERS = 6;

/**
 * Displays team members as a horizontal row of avatar cards.
 * Fetches contributor profiles from builder-profile documents across all drives.
 */
export function TeamMembersOverview({
  contributors,
}: TeamMembersOverviewProps) {
  const drives = useDrives();

  // Map all builder profile FileNodes from all drives with their driveId
  const builderProfileNodesWithDriveId = useMemo(() => {
    if (!drives) return [];
    return drives.flatMap((drive) => {
      const builderProfileNodes = drive.state.global.nodes.filter(
        (node): node is FileNode =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/builder-profile",
      );
      return builderProfileNodes.map((node) => ({
        node,
        driveId: drive.header.id,
      }));
    });
  }, [drives]);

  // Get all unique builder PHIDs from the nodes
  const builderPhids = useMemo(() => {
    return builderProfileNodesWithDriveId.map(({ node }) => node.id);
  }, [builderProfileNodesWithDriveId]);

  // Get the document fetcher function
  const getDocuments = useGetDocuments();

  // State to hold fetched builder profile documents
  const [builderProfileDocuments, setBuilderProfileDocuments] = useState<
    PHDocument[]
  >([]);

  // Fetch all builder profile documents from all drives
  useEffect(() => {
    if (builderPhids.length === 0) {
      setBuilderProfileDocuments([]);
      return;
    }

    getDocuments(builderPhids)
      .then((docs) => {
        setBuilderProfileDocuments(docs);
      })
      .catch((error) => {
        console.error("Failed to fetch builder profile documents:", error);
        setBuilderProfileDocuments([]);
      });
  }, [builderPhids, getDocuments]);

  // Create a map of PHID to document for quick lookup (local drives)
  const localBuilderProfileMap = useMemo(() => {
    const map = new Map<string, BuilderProfileDocument>();
    for (const doc of builderProfileDocuments) {
      if (doc?.header?.documentType === "powerhouse/builder-profile") {
        map.set(doc.header.id, doc as unknown as BuilderProfileDocument);
      }
    }
    return map;
  }, [builderProfileDocuments]);

  // Fetch remote profiles as fallback for contributors not found locally
  const { profileMap: remoteProfileMap } = useRemoteBuilderProfiles(
    localBuilderProfileMap,
  );

  // Helper function to get builder profile data by PHID (local first, then remote fallback)
  const getBuilderProfileByPhid = useCallback(
    (phid: string): TeamMember | null => {
      // Try local first
      const localDoc = localBuilderProfileMap.get(phid);
      if (localDoc) {
        return {
          phid,
          name: localDoc.state.global.name || "Unknown",
          icon: localDoc.state.global.icon || null,
        };
      }

      // Fall back to remote
      const remoteProfile = remoteProfileMap.get(phid);
      if (remoteProfile) {
        return {
          phid,
          name: remoteProfile.state?.name || "Unknown",
          icon: remoteProfile.state?.icon || null,
        };
      }

      return null;
    },
    [localBuilderProfileMap, remoteProfileMap],
  );

  // Map contributors to team member data
  const teamMembers = useMemo<TeamMember[]>(() => {
    if (!contributors) return [];
    return contributors
      .map((phid) => getBuilderProfileByPhid(phid))
      .filter((member): member is TeamMember => member !== null);
  }, [contributors, getBuilderProfileByPhid]);

  const contributorCount = contributors?.length ?? 0;
  const [isExpanded, setIsExpanded] = useState(false);

  if (contributorCount === 0) {
    return <TeamMembersEmptyState />;
  }

  const hasOverflow = contributorCount > MAX_VISIBLE_MEMBERS;
  const visibleMembers = isExpanded
    ? teamMembers
    : teamMembers.slice(0, MAX_VISIBLE_MEMBERS);
  const overflowCount = contributorCount - MAX_VISIBLE_MEMBERS;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-700">
          {contributorCount}
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        {visibleMembers.map((member) => (
          <MemberCard key={member.phid} member={member} />
        ))}
        {hasOverflow && !isExpanded && (
          <OverflowIndicator
            count={overflowCount}
            onClick={() => setIsExpanded(true)}
          />
        )}
        {hasOverflow && isExpanded && (
          <CollapseIndicator onClick={() => setIsExpanded(false)} />
        )}
      </div>
    </div>
  );
}

/**
 * Individual team member card with avatar and name.
 */
function MemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group flex flex-col items-center gap-2">
      <div className="relative">
        {member.icon ? (
          <img
            src={member.icon}
            alt={member.name}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-md transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) {
                (fallback as HTMLElement).style.display = "flex";
              }
            }}
          />
        ) : null}
        <div
          className={`h-14 w-14 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 ring-2 ring-white shadow-md ${
            member.icon ? "hidden" : "flex"
          } items-center justify-center transition-transform group-hover:scale-105`}
        >
          <span className="text-sm font-semibold text-white">{initials}</span>
        </div>
      </div>
      <span className="max-w-[80px] truncate text-xs font-medium text-slate-600">
        {member.name}
      </span>
    </div>
  );
}

/**
 * Overflow indicator showing remaining member count. Clickable to expand.
 */
function OverflowIndicator({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 group cursor-pointer"
      title="Click to show all members"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white shadow-sm transition-all group-hover:bg-indigo-100 group-hover:ring-indigo-200">
        <span className="text-sm font-semibold text-slate-500 group-hover:text-indigo-600">
          +{count}
        </span>
      </div>
      <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-500">
        show all
      </span>
    </button>
  );
}

/**
 * Collapse indicator to hide extra members. Clickable to collapse.
 */
function CollapseIndicator({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 group cursor-pointer"
      title="Click to show less"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white shadow-sm transition-all group-hover:bg-slate-200">
        <svg
          className="h-5 w-5 text-slate-500 group-hover:text-slate-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600">
        show less
      </span>
    </button>
  );
}

/**
 * Empty state when no team members have been added.
 */
function TeamMembersEmptyState() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg
            className="h-6 w-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-slate-500">
          No team members added yet. Add contributors to your builder profile.
        </p>
      </div>
    </div>
  );
}
