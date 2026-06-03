import { useState, useEffect, useMemo } from "react";
import type { PHDocument } from "document-model";
import { useGetDocuments } from "@powerhousedao/reactor-browser";
import type { ServiceOfferingState } from "../../../document-models/service-offering/v1/gen/schema/types.js";

export interface AvailableAddon {
  optionGroupId: string;
  name: string;
  description: string | null;
  recurringAmount: number | null;
  recurringCurrency: string | null;
  recurringBillingCycle: string | null;
  setupAmount: number | null;
  setupCurrency: string | null;
}

/**
 * Fetches the service offering by PHID and returns available add-on groups
 * that are NOT already in the subscription's serviceGroups.
 */
export function useServiceOfferingAddons(
  serviceOfferingId: string | null | undefined,
  existingGroupNames: string[],
) {
  const getDocuments = useGetDocuments();
  const [offeringDoc, setOfferingDoc] = useState<PHDocument | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!serviceOfferingId) return;
    setLoading(true);
    getDocuments([serviceOfferingId])
      .then((docs: PHDocument[]) => setOfferingDoc(docs[0] ?? null))
      .catch(() => setOfferingDoc(null))
      .finally(() => setLoading(false));
  }, [serviceOfferingId, getDocuments]);

  const availableAddons = useMemo<AvailableAddon[]>(() => {
    if (!offeringDoc) return [];
    const state = offeringDoc.state as Record<string, unknown> | undefined;
    const globalState = state?.global as ServiceOfferingState | undefined;
    if (!globalState?.optionGroups) return [];

    const existingNames = new Set(
      existingGroupNames.map((n) => n.toLowerCase()),
    );

    return globalState.optionGroups
      .filter((og) => og.isAddOn)
      .filter((og) => !existingNames.has(og.name.toLowerCase()))
      .map((og) => {
        // Get standalone pricing if available
        const standalone = og.standalonePricing;
        const firstRecurring = standalone?.recurringPricing?.[0];

        return {
          optionGroupId: og.id,
          name: og.name,
          description: og.description ?? null,
          recurringAmount: firstRecurring?.amount ?? null,
          recurringCurrency: firstRecurring?.currency ?? null,
          recurringBillingCycle: firstRecurring?.billingCycle ?? null,
          setupAmount: standalone?.setupCost?.amount ?? null,
          setupCurrency: standalone?.setupCost?.currency ?? null,
        };
      });
  }, [offeringDoc, existingGroupNames]);

  return { availableAddons, loading, hasOffering: offeringDoc !== null };
}
