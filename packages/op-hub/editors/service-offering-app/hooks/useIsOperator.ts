import { useMemo } from "react";
import { useDocumentsInSelectedDrive } from "@powerhousedao/reactor-browser";
import type { BuilderProfileState } from "document-models/builder-profile";

interface UseIsOperatorResult {
  isOperator: boolean;
  builderProfileName: string | null;
}

/**
 * Extracts the isOperator flag and profile name from the builder-profile
 * document in the current drive. Replicates the pattern from FolderTree.tsx.
 */
export function useIsOperator(): UseIsOperatorResult {
  const documentsInDrive = useDocumentsInSelectedDrive();

  const builderProfileDocument = useMemo(() => {
    if (!documentsInDrive) return null;
    return (
      documentsInDrive.find(
        (doc) => doc.header.documentType === "powerhouse/builder-profile",
      ) ?? null
    );
  }, [documentsInDrive]);

  const builderProfileState = useMemo(() => {
    if (!builderProfileDocument) return null;
    return (
      builderProfileDocument.state as unknown as {
        global: BuilderProfileState;
      }
    ).global;
  }, [builderProfileDocument]);

  return {
    isOperator: builderProfileState?.isOperator ?? false,
    builderProfileName: builderProfileState?.name || null,
  };
}
