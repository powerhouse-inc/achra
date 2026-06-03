import { useIsOperator } from "../../hooks/useIsOperator.js";
import { useSubscriptionMetrics } from "../../hooks/useSubscriptionMetrics.js";
import { useCustomersAutoPlacement } from "../../hooks/useCustomersAutoPlacement.js";
import { OperatorDashboard } from "./OperatorDashboard.js";

interface SubscriptionsDashboardProps {
  onBrowseFiles: () => void;
}

/**
 * Service Offering App always renders the operator-perspective dashboard.
 * `useIsOperator` is still used to pull the operator name from the builder
 * profile in the current drive.
 */
export function SubscriptionsDashboard({
  onBrowseFiles,
}: SubscriptionsDashboardProps) {
  const { builderProfileName } = useIsOperator();
  const { resourceInstanceDocuments, subscriptionInstanceDocuments } =
    useCustomersAutoPlacement();

  const metrics = useSubscriptionMetrics(
    subscriptionInstanceDocuments as Array<{
      header: { id: string; documentType: string; name?: string };
      state: { global: unknown };
    }>,
    resourceInstanceDocuments as Array<{
      header: { id: string; documentType: string; name?: string };
      state: { global: unknown };
    }>,
  );

  return (
    <OperatorDashboard
      metrics={metrics}
      operatorName={builderProfileName}
      onBrowseFiles={onBrowseFiles}
    />
  );
}
