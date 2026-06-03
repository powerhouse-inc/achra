import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchAllRemoteBuilderProfiles,
  type RemoteBuilderProfile,
} from "../utils/graphql-client.js";

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
 * Used as a fallback when local drives don't have the builder profile documents.
 *
 * @param localProfileMap - Map of PHIDs that are already resolved locally (to avoid using remote data for those)
 */
export function useRemoteBuilderProfiles(
  localProfileMap: Map<string, unknown>,
): UseRemoteBuilderProfilesResult {
  const [profileMap, setProfileMap] = useState<
    Map<string, RemoteBuilderProfile>
  >(new Map());
  const [allProfiles, setAllProfiles] = useState<RemoteBuilderProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Track if we've already started fetching to avoid duplicate requests
  const isFetchingRef = useRef(false);
  const hasFetchedRef = useRef(false);

  // Fetch all available profiles
  const refetchAll = useCallback(async () => {
    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const profiles = await fetchAllRemoteBuilderProfiles();

      hasFetchedRef.current = true;
      setAllProfiles(profiles);

      // Build profile map
      const newMap = new Map<string, RemoteBuilderProfile>();
      profiles.forEach((profile) => {
        newMap.set(profile.id, profile);
      });
      setProfileMap(newMap);
    } catch (error) {
      console.warn(
        "[useRemoteBuilderProfiles] Failed to fetch profiles:",
        error,
      );
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Auto-fetch all profiles on mount
  useEffect(() => {
    if (!hasFetchedRef.current && !isFetchingRef.current) {
      void refetchAll();
    }
  }, [refetchAll]);

  // Filter out profiles that exist locally from the returned allProfiles
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
