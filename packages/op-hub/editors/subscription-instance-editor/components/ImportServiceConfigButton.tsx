import { useCallback } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import { initializeSubscription } from "../../../document-models/subscription-instance/v1/gen/subscription/creators.js";
import type { ServiceOfferingState } from "../../../document-models/service-offering/v1/gen/schema/types.js";
import type { ServiceOfferingPHState } from "../../../document-models/service-offering/v1/gen/types.js";
import { getUserSelectionPriceBreakdown } from "../../../document-models/service-offering/v1/src/utils.js";
import type { BillingCycle } from "../../../document-models/subscription-instance/v1/gen/schema/types.js";
import { mapOfferingToSubscription } from "./mapOfferingToSubscription.js";

interface ImportServiceConfigButtonProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  /** The Service Offering state to import from (from browser store) */
  offeringState?: ServiceOfferingState;
  /** The selected tier ID */
  selectedTierId?: string;
  /** The selected billing cycle */
  selectedBillingCycle?: BillingCycle;
}

export function ImportServiceConfigButton({
  document,
  dispatch,
  offeringState,
  selectedTierId,
  selectedBillingCycle,
}: ImportServiceConfigButtonProps) {
  const hasServices =
    document.state.global.services.length > 0 ||
    document.state.global.serviceGroups.length > 0;

  const canImport = offeringState && selectedTierId && selectedBillingCycle;

  const importServiceConfig = useCallback(() => {
    if (!offeringState || !selectedTierId || !selectedBillingCycle) return;

    // Wrap global state to match ServiceOfferingPHState shape for price breakdown
    const phState = {
      global: offeringState,
      local: {},
    } as ServiceOfferingPHState;
    const priceBreakdown = getUserSelectionPriceBreakdown(phState, {
      tierId: selectedTierId,
      billingCycle: selectedBillingCycle,
      optionGroupIds: [],
    });

    const input = mapOfferingToSubscription({
      offering: offeringState,
      tierId: selectedTierId,
      selectedBillingCycle,
      createdAt: new Date().toISOString(),
      priceBreakdown,
    });

    dispatch(initializeSubscription(input));
  }, [dispatch, offeringState, selectedTierId, selectedBillingCycle]);

  return (
    <button
      type="button"
      className="si-btn si-btn--secondary"
      onClick={importServiceConfig}
      disabled={!canImport}
      title={
        !canImport
          ? "Select a Service Offering, tier, and billing cycle to import"
          : hasServices
            ? "Re-import service configuration from offering"
            : "Import service configuration from offering"
      }
    >
      <svg
        className="si-btn__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
      {hasServices ? "Re-Import Config" : "Import Service Config"}
    </button>
  );
}
