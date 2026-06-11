import { useMemo, useCallback, useState, useEffect } from "react";
import { Pencil, Users } from "lucide-react";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import type { PHDocument } from "document-model";
import { useDrives, useGetDocuments } from "@powerhousedao/reactor-browser";
import type { BuilderProfileDocument } from "document-models/builder-profile";
import { useRemoteBuilderProfiles } from "../../shared/hooks/useRemoteBuilderProfiles.js";
import type {
  Maybe,
  Scalars,
} from "../../../document-models/operational-hub-profile/v1/gen/schema/types.js";

type ResolvedProfile = {
  phid: string;
  name: string;
  icon: string | null;
};

type ProfileOverviewProps = {
  name: string;
  operatorTeam: Maybe<Scalars["PHID"]["output"]>;
  subteams: Array<Scalars["PHID"]["output"]>;
  onEdit: () => void;
};

const MAX_VISIBLE_SUBTEAMS = 6;

export function ProfileOverview({
  name,
  operatorTeam,
  subteams,
  onEdit,
}: ProfileOverviewProps) {
  const drives = useDrives();

  // Collect builder-profile file nodes from all drives
  const builderProfileNodes = useMemo(() => {
    if (!drives) return [];
    return drives.flatMap((drive) => {
      const nodes = drive.state.global.nodes.filter(
        (node): node is FileNode =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/builder-profile",
      );
      return nodes.map((node) => ({ node, driveId: drive.header.id }));
    });
  }, [drives]);

  const builderPhids = useMemo(
    () => builderProfileNodes.map(({ node }) => node.id),
    [builderProfileNodes],
  );

  const getDocuments = useGetDocuments();
  const [builderProfileDocuments, setBuilderProfileDocuments] = useState<
    PHDocument[]
  >([]);

  useEffect(() => {
    if (builderPhids.length === 0) {
      setBuilderProfileDocuments([]);
      return;
    }
    getDocuments(builderPhids)
      .then((docs) => setBuilderProfileDocuments(docs))
      .catch((error) => {
        console.error("Failed to fetch builder profile documents:", error);
        setBuilderProfileDocuments([]);
      });
  }, [builderPhids, getDocuments]);

  const localBuilderProfileMap = useMemo(() => {
    const map = new Map<string, BuilderProfileDocument>();
    for (const doc of builderProfileDocuments) {
      if (doc?.header?.documentType === "powerhouse/builder-profile") {
        map.set(doc.header.id, doc as unknown as BuilderProfileDocument);
      }
    }
    return map;
  }, [builderProfileDocuments]);

  const { profileMap: remoteProfileMap } = useRemoteBuilderProfiles(
    localBuilderProfileMap,
  );

  const getBuilderProfileByPhid = useCallback(
    (phid: string): ResolvedProfile | null => {
      const localDoc = localBuilderProfileMap.get(phid);
      if (localDoc) {
        return {
          phid,
          name: localDoc.state.global.name || "Unknown",
          icon: localDoc.state.global.icon || null,
        };
      }
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

  // Resolve operator team profile
  const operatorProfile = useMemo(() => {
    if (!operatorTeam) return null;
    return getBuilderProfileByPhid(operatorTeam);
  }, [operatorTeam, getBuilderProfileByPhid]);

  // Resolve subteam profiles
  const subteamProfiles = useMemo<ResolvedProfile[]>(() => {
    return subteams
      .map((phid) => getBuilderProfileByPhid(phid))
      .filter((p): p is ResolvedProfile => p !== null);
  }, [subteams, getBuilderProfileByPhid]);

  const [isExpanded, setIsExpanded] = useState(false);
  const hasOverflow = subteams.length > MAX_VISIBLE_SUBTEAMS;
  const visibleSubteams = isExpanded
    ? subteamProfiles
    : subteamProfiles.slice(0, MAX_VISIBLE_SUBTEAMS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            <p className="text-sm text-muted-foreground">
              Operational Hub Profile
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Operator Team */}
      <section className="bg-card rounded-lg shadow-sm border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">
            Operator Team
          </h2>
        </div>
        {operatorTeam ? (
          <div className="flex items-center gap-3">
            <ProfileAvatar
              name={operatorProfile?.name || "Unknown"}
              icon={operatorProfile?.icon || null}
              size="md"
            />
            <div>
              <p className="font-medium text-foreground">
                {operatorProfile?.name || "Unknown"}
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {operatorTeam}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No operator team assigned
          </p>
        )}
      </section>

      {/* Subteams */}
      <section className="bg-card rounded-lg shadow-sm border border-border p-5">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-foreground">Subteams</h2>
          <span className="inline-flex items-center justify-center rounded-full bg-primary/15 px-2.5 py-0.5 text-sm font-medium text-primary">
            {subteams.length}
          </span>
        </div>
        {subteams.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {visibleSubteams.map((profile) => (
              <SubteamCard key={profile.phid} profile={profile} />
            ))}
            {hasOverflow && !isExpanded && (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                title="Click to show all subteams"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted ring-2 ring-card shadow-sm transition-all group-hover:bg-primary/15 group-hover:ring-primary/30">
                  <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary">
                    +{subteams.length - MAX_VISIBLE_SUBTEAMS}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">
                  show all
                </span>
              </button>
            )}
            {hasOverflow && isExpanded && (
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                title="Click to show less"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted ring-2 ring-card shadow-sm transition-all group-hover:bg-accent">
                  <svg
                    className="h-5 w-5 text-muted-foreground group-hover:text-foreground"
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
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  show less
                </span>
              </button>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-muted/50 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No subteams added yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function SubteamCard({ profile }: { profile: ResolvedProfile }) {
  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group flex flex-col items-center gap-2">
      <div className="relative">
        {profile.icon ? (
          <img
            src={profile.icon}
            alt={profile.name}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-card shadow-md transition-transform group-hover:scale-105"
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
          className={`h-14 w-14 rounded-full bg-gradient-to-br from-primary to-purple ring-2 ring-card shadow-md ${
            profile.icon ? "hidden" : "flex"
          } items-center justify-center transition-transform group-hover:scale-105`}
        >
          <span className="text-sm font-semibold text-primary-foreground">
            {initials}
          </span>
        </div>
      </div>
      <span className="max-w-[80px] truncate text-xs font-medium text-foreground">
        {profile.name}
      </span>
    </div>
  );
}

function ProfileAvatar({
  name,
  icon,
  size = "md",
}: {
  name: string;
  icon: string | null;
  size?: "sm" | "md";
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="relative">
      {icon ? (
        <img
          src={icon}
          alt={name}
          className={`${sizeClass} rounded-full object-cover ring-2 ring-card shadow-md`}
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
        className={`${sizeClass} rounded-full bg-gradient-to-br from-primary to-purple ring-2 ring-card shadow-md ${
          icon ? "hidden" : "flex"
        } items-center justify-center`}
      >
        <span className={`${textSize} font-semibold text-primary-foreground`}>
          {initials}
        </span>
      </div>
    </div>
  );
}
