import { useState, useEffect, useCallback } from "react";
import {
  fetchAllRemoteBuilderProfiles,
  type RemoteBuilderProfile,
} from "../graphql-client.js";

export type { RemoteBuilderProfile };

// Module-level cache shared across all hook instances
let cachedProfiles: RemoteBuilderProfile[] | null = null;
let cachedProfileMap: Map<string, RemoteBuilderProfile> | null = null;
let fetchPromise: Promise<RemoteBuilderProfile[]> | null = null;
let lastFetchTime = 0;

const CACHE_TTL_MS = 60_000; // 1 minute

function isCacheValid(): boolean {
  return cachedProfiles !== null && Date.now() - lastFetchTime < CACHE_TTL_MS;
}

async function getProfiles(force = false): Promise<RemoteBuilderProfile[]> {
  if (!force && isCacheValid()) {
    return cachedProfiles!;
  }

  // Deduplicate concurrent requests
  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = fetchAllRemoteBuilderProfiles()
    .then((profiles) => {
      cachedProfiles = profiles;
      const map = new Map<string, RemoteBuilderProfile>();
      profiles.forEach((p) => map.set(p.id, p));
      cachedProfileMap = map;
      lastFetchTime = Date.now();
      return profiles;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

interface UseRemoteBuilderProfilesResult {
  /** Map of PHID to remote builder profile data */
  profileMap: Map<string, RemoteBuilderProfile>;
  /** All available remote profiles for selection */
  allProfiles: RemoteBuilderProfile[];
  /** Whether remote data is currently loading */
  isLoading: boolean;
  /** Manually refetch all available profiles */
  refetchAll: () => Promise<void>;
}

/**
 * Hook for fetching builder profiles from remote Switchboard drives.
 * Uses a module-level cache so multiple components share one request.
 *
 * @param localProfileMap - Map of PHIDs that are already resolved locally (to avoid using remote data for those)
 */
export function useRemoteBuilderProfiles(
  localProfileMap: Map<string, unknown>,
): UseRemoteBuilderProfilesResult {
  const [profileMap, setProfileMap] = useState<
    Map<string, RemoteBuilderProfile>
  >(() => cachedProfileMap ?? new Map());
  const [allProfiles, setAllProfiles] = useState<RemoteBuilderProfile[]>(
    () => cachedProfiles ?? [],
  );
  const [isLoading, setIsLoading] = useState(!isCacheValid());

  const applyResults = useCallback((profiles: RemoteBuilderProfile[]) => {
    setAllProfiles(profiles);
    const map = new Map<string, RemoteBuilderProfile>();
    profiles.forEach((p) => map.set(p.id, p));
    setProfileMap(map);
  }, []);

  const refetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const profiles = await getProfiles(true);
      applyResults(profiles);
    } catch (error) {
      console.warn(
        "[useRemoteBuilderProfiles] Failed to fetch profiles:",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  }, [applyResults]);

  // Auto-fetch on mount (uses cache or deduplicates)
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getProfiles()
      .then((profiles) => {
        if (!cancelled) applyResults(profiles);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [applyResults]);

  // Filter out profiles that exist locally
  const filteredAllProfiles = allProfiles.filter(
    (profile) => !localProfileMap.has(profile.id),
  );

  return {
    profileMap,
    allProfiles: filteredAllProfiles,
    isLoading,
    refetchAll,
  };
}
