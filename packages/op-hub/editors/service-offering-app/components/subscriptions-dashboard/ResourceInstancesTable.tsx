import type { ResourceSummary } from "../../hooks/useSubscriptionMetrics.js";
import { StatusBadge } from "./StatusBadge.js";

interface ResourceInstancesTableProps {
  resources: ResourceSummary[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function actionLabel(status: string): string {
  if (status === "SUSPENDED") return "Resume";
  if (status === "PROVISIONING" || status === "DRAFT") return "Track";
  return "Configure";
}

export function ResourceInstancesTable({
  resources,
}: ResourceInstancesTableProps) {
  return (
    <table className="w-full text-left" role="table">
      <thead>
        <tr className="border-b border-stone-200">
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Resource
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Template
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Status
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Configuration
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Activated
          </th>
          <th className="pb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {resources.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-8 text-center text-sm text-stone-400">
              No resource instances yet
            </td>
          </tr>
        ) : (
          resources.map((res) => (
            <tr
              key={res.id}
              className="border-b border-stone-100 last:border-0"
            >
              <td className="py-3">
                <div className="text-sm font-medium text-stone-700">
                  {res.name}
                </div>
                {res.description ? (
                  <div className="mt-0.5 text-xs text-stone-400 line-clamp-1 max-w-[200px]">
                    {res.description}
                  </div>
                ) : null}
              </td>
              <td className="py-3 text-sm text-teal-600">{res.templateName}</td>
              <td className="py-3">
                <StatusBadge status={res.status} />
              </td>
              <td className="py-3 text-sm text-stone-500">
                {res.facetCount} facet{res.facetCount !== 1 ? "s" : ""}{" "}
                configured
              </td>
              <td className="py-3 text-sm text-stone-500">
                {formatDate(res.activatedAt)}
              </td>
              <td className="py-3">
                <span className="text-sm font-medium text-teal-600 cursor-pointer hover:underline">
                  {actionLabel(res.status)}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
