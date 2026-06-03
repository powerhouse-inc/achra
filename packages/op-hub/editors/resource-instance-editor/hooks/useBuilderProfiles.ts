import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { PHDocument } from "document-model";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import { useDrives, useGetDocuments } from "@powerhousedao/reactor-browser";
import {
  fetchAllRemoteBuilderProfiles,
  type RemoteBuilderProfile,
} from "../../utils/graphql-client.js";

export interface BuilderProfile {
  id: string;
  name: string;
  source: "local" | "remote";
}

/**
 * Fetches builder profiles from local drives and remote Switchboard.
 * Returns a combined, deduplicated list with lookup by PHID.
 */
export function useBuilderProfiles() {
  const drives = useDrives();
  const getDocuments = useGetDocuments();

  // Collect builder profile file nodes from all drives
  const builderProfileNodes = useMemo(() => {
    if (!drives) return [];
    return drives.flatMap((drive) =>
      drive.state.global.nodes
        .filter(
          (node): node is FileNode =>
            "documentType" in node &&
            node.documentType === "powerhouse/builder-profile",
        )
        .map((node) => ({ id: node.id, name: node.name })),
    );
  }, [drives]);

  const builderPhids = useMemo(
    () => builderProfileNodes.map((n) => n.id),
    [builderProfileNodes],
  );

  // Fetch local builder profile documents to get accurate display names
  const [localDocs, setLocalDocs] = useState<PHDocument[]>([]);

  useEffect(() => {
    if (builderPhids.length === 0) {
      setLocalDocs([]);
      return;
    }
    getDocuments(builderPhids)
      .then(setLocalDocs)
      .catch(() => setLocalDocs([]));
  }, [builderPhids, getDocuments]);

  // Build local profiles (prefer document state name, fall back to node name)
  const localProfiles = useMemo<BuilderProfile[]>(() => {
    const docMap = new Map(localDocs.map((doc) => [doc.header.id, doc]));
    return builderProfileNodes.map(({ id, name: nodeName }) => {
      const doc = docMap.get(id);
      // PHDocument.state is PHBaseState (no .global), but builder profile
      // documents extend it with { global: { name, slug, icon } }.
      // Access via Record since we don't have the typed builder profile module.
      const state = doc?.state as Record<string, unknown> | undefined;
      const globalState = state?.global as Record<string, unknown> | undefined;
      const docName =
        typeof globalState?.name === "string" ? globalState.name : null;
      return {
        id,
        name: docName || nodeName || id,
        source: "local" as const,
      };
    });
  }, [builderProfileNodes, localDocs]);

  // Fetch remote profiles as fallback
  const [remoteProfiles, setRemoteProfiles] = useState<RemoteBuilderProfile[]>(
    [],
  );
  const [isLoadingRemote, setIsLoadingRemote] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    setIsLoadingRemote(true);
    fetchAllRemoteBuilderProfiles()
      .then(setRemoteProfiles)
      .catch(() => {})
      .finally(() => setIsLoadingRemote(false));
  }, []);

  // Combine local + remote (local takes priority)
  const allProfiles = useMemo<BuilderProfile[]>(() => {
    const localIds = new Set(localProfiles.map((p) => p.id));
    const remote: BuilderProfile[] = remoteProfiles
      .filter((p) => !localIds.has(p.id))
      .map((p) => ({
        id: p.id,
        name: p.state?.name || p.id,
        source: "remote" as const,
      }));
    return [...localProfiles, ...remote];
  }, [localProfiles, remoteProfiles]);

  // Lookup by PHID
  const getProfileByPhid = useCallback(
    (phid: string): BuilderProfile | null => {
      return allProfiles.find((p) => p.id === phid) ?? null;
    },
    [allProfiles],
  );

  return {
    profiles: allProfiles,
    getProfileByPhid,
    isLoading: isLoadingRemote,
  };
}
