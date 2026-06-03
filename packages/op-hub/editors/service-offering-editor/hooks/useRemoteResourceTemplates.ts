import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchAllRemoteResourceTemplates,
  type RemoteResourceTemplate,
} from "../../utils/graphql-client.js";

interface UseRemoteResourceTemplatesResult {
  /** All available remote resource templates */
  templates: RemoteResourceTemplate[];
  /** Whether remote data is currently loading */
  isLoading: boolean;
  /** Manually refetch all available templates */
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching resource template documents from remote Switchboard drives.
 *
 * @param localTemplateIds - Set of template IDs already available locally (to dedupe)
 */
export function useRemoteResourceTemplates(
  localTemplateIds: Set<string>,
): UseRemoteResourceTemplatesResult {
  const [allTemplates, setAllTemplates] = useState<RemoteResourceTemplate[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const isFetchingRef = useRef(false);
  const hasFetchedRef = useRef(false);

  const refetch = useCallback(async () => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const templates = await fetchAllRemoteResourceTemplates();
      hasFetchedRef.current = true;
      // Deduplicate by ID — findDocuments can return the same document
      // multiple times when it is referenced from multiple drives
      const seen = new Set<string>();
      const unique: RemoteResourceTemplate[] = [];
      for (const t of templates) {
        if (!seen.has(t.id)) {
          seen.add(t.id);
          unique.push(t);
        }
      }
      setAllTemplates(unique);
    } catch {
      // Silently fail — remote data is a fallback
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!hasFetchedRef.current && !isFetchingRef.current) {
      void refetch();
    }
  }, [refetch]);

  // Filter out templates that already exist locally
  const templates = allTemplates.filter((t) => !localTemplateIds.has(t.id));

  return { templates, isLoading, refetch };
}
