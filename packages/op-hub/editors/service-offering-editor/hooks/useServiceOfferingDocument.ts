import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import { useSelectedDocument } from "@powerhousedao/reactor-browser";
import type {
  ServiceOfferingAction,
  ServiceOfferingDocument,
} from "document-models/service-offering";
import { assertIsServiceOfferingDocument } from "../../../document-models/service-offering/v1/gen/document-schema.js";

/**
 * Normalizes legacy documents that may have tiers without billingCycleDiscounts
 * (created before the reducer was fixed to include this required field).
 * Mutates the document in place.
 */
function normalizeLegacyTiers(doc: unknown): void {
  if (!doc || typeof doc !== "object") return;
  const d = doc as Record<string, unknown>;
  const state = d.state as Record<string, unknown> | undefined;
  const global = state?.global as Record<string, unknown> | undefined;
  const tiers = global?.tiers as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tiers)) {
    for (const tier of tiers) {
      if (tier && tier.billingCycleDiscounts === undefined) {
        tier.billingCycleDiscounts = [];
      }
    }
  }
}

/**
 * Wrapper around useSelectedServiceOfferingDocument that normalizes legacy
 * documents before validation. Use this in the editor instead of the
 * auto-generated hook when documents may have been created before
 * billingCycleDiscounts was added to tiers.
 */
export function useSelectedServiceOfferingDocument(): [
  ServiceOfferingDocument,
  DocumentDispatch<ServiceOfferingAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  if (document) {
    normalizeLegacyTiers(document);
  }
  assertIsServiceOfferingDocument(document);
  return [document, dispatch] as const;
}
