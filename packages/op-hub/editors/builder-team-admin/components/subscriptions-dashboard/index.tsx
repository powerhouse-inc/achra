import { useIsOperator } from "../../hooks/useIsOperator.js";
import { useSubscriptionMetrics } from "../../hooks/useSubscriptionMetrics.js";
import { useServiceSubscriptionAutoPlacement } from "../../hooks/useServiceSubscriptionAutoPlacement.js";
import { OperatorDashboard } from "./OperatorDashboard.js";
import { CustomerDashboard } from "./CustomerDashboard.js";

interface SubscriptionsDashboardProps {
  onBrowseFiles: () => void;
}

export function SubscriptionsDashboard({
  onBrowseFiles,
}: SubscriptionsDashboardProps) {
  const { isOperator, builderProfileName } = useIsOperator();
  const { resourceInstanceDocuments, subscriptionInstanceDocuments } =
    useServiceSubscriptionAutoPlacement();

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

  // return isOperator ? (
  //   <OperatorDashboard
  //     metrics={metrics}
  //     operatorName={builderProfileName}
  //     onBrowseFiles={onBrowseFiles}
  //   />
  // ) : (
  //   <CustomerDashboard
  //     metrics={metrics}
  //     customerName={builderProfileName}
  //     onBrowseFiles={onBrowseFiles}
  //   />
  // );

  return (
    <CustomerDashboard
      metrics={metrics}
      customerName={builderProfileName}
      onBrowseFiles={onBrowseFiles}
    />
  );
}
