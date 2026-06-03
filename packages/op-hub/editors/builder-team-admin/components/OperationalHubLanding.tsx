import { useMemo } from "react";
import {
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  isFolderNodeKind,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import type {
  Node,
  FolderNode,
  FileNode,
} from "@powerhousedao/shared/document-drive";
import type { SubscriptionInstanceState } from "document-models/subscription-instance";
import type { ResourceInstanceState } from "document-models/resource-instance";
import { useResourceTemplateDocumentById } from "document-models/resource-template";
import {
  Building2,
  FileText,
  Camera,
  CheckCircle2,
  CreditCard,
  Calendar,
  AlertCircle,
  Activity,
  User,
} from "lucide-react";

const SERVICE_SUBSCRIPTIONS_FOLDER_NAME = "Service Subscriptions";
const OH_PRODUCT_LABEL = "operational hub";

type Props = {
  onNavigate?: (view: "expense-reports" | "snapshot-reports") => void;
};

const SUBSCRIPTION_PILL: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-stone-100 text-stone-600",
  PAUSED: "bg-amber-100 text-amber-700",
  EXPIRING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

function formatDate(d: string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatMoney(
  amount: number | null | undefined,
  currency: string | null | undefined,
): string {
  const n = Number(amount ?? 0);
  if (!n) return "—";
  return `${currency || "USD"} ${n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatCycle(cycle: string | null | undefined): string {
  if (!cycle) return "—";
  const map: Record<string, string> = {
    MONTHLY: "Monthly",
    QUARTERLY: "Quarterly",
    SEMI_ANNUAL: "Semi-Annual",
    ANNUAL: "Annual",
    ONE_TIME: "One-time",
  };
  return map[cycle] ?? cycle;
}

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function Kpi({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "muted" | "danger";
}) {
  const valueCls =
    tone === "danger"
      ? "text-rose-600"
      : tone === "muted"
        ? "text-stone-400"
        : "text-stone-800";
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-stone-400">
        {icon}
        {label}
      </div>
      <div className={`text-xl font-semibold ${valueCls}`}>{value}</div>
    </div>
  );
}

export function OperationalHubLanding({ onNavigate }: Props) {
  const docs = useDocumentsInSelectedDrive();
  const [drive] = useSelectedDrive();

  // Resolve the Service Subscriptions folder and collect node ids inside it,
  // so we can recognise the two companion docs (subscription-instance +
  // resource-instance) by location, not by guessing names.
  const subscriptionsFolderId = useMemo(() => {
    if (!drive) return null;
    const folder = drive.state.global.nodes.find(
      (n: Node): n is FolderNode =>
        isFolderNodeKind(n) && n.name === SERVICE_SUBSCRIPTIONS_FOLDER_NAME,
    );
    return folder?.id ?? null;
  }, [drive]);

  const nodesInSubscriptions = useMemo(() => {
    const ids = new Set<string>();
    if (!subscriptionsFolderId || !drive) return ids;
    const all = drive.state.global.nodes;
    const visit = (parentId: string) => {
      ids.add(parentId);
      for (const n of all) {
        if (isFolderNodeKind(n) && n.parentFolder === parentId) visit(n.id);
        else if (isFileNodeKind(n) && n.parentFolder === parentId)
          ids.add(n.id);
      }
    };
    visit(subscriptionsFolderId);
    return ids;
  }, [drive, subscriptionsFolderId]);

  // The two docs the user actually bought, both inside Service Subscriptions:
  //   • subscription-instance — tier, billing cycle, payment status
  //   • resource-instance     — their configuration, lifecycle, RT link
  // Match each on the product label ("Operational Hub") so multiple
  // subscriptions in one drive don't collide.
  const subscription = useMemo(() => {
    if (!docs) return null;
    for (const doc of docs) {
      if (doc.header.documentType !== "powerhouse/subscription-instance") {
        continue;
      }
      if (!nodesInSubscriptions.has(doc.header.id)) continue;
      const state = (
        doc.state as unknown as { global: SubscriptionInstanceState }
      ).global;
      if (
        (state.resource?.label ?? "").trim().toLowerCase() === OH_PRODUCT_LABEL
      ) {
        return state;
      }
    }
    return null;
  }, [docs, nodesInSubscriptions]);

  const resourceInstance = useMemo(() => {
    if (!docs) return null;
    for (const doc of docs) {
      if (doc.header.documentType !== "powerhouse/resource-instance") continue;
      if (!nodesInSubscriptions.has(doc.header.id)) continue;
      const state = (doc.state as unknown as { global: ResourceInstanceState })
        .global;
      if (
        (state.templateName ?? "").trim().toLowerCase() === OH_PRODUCT_LABEL
      ) {
        return state;
      }
    }
    return null;
  }, [docs, nodesInSubscriptions]);

  // The resource-instance links directly to the resource-template (no offering
  // hop). The hook returns [null, dispatch] until the doc resolves cross-drive.
  const resourceTemplateId = resourceInstance?.resourceTemplateId ?? "";
  const [rtDoc] = useResourceTemplateDocumentById(resourceTemplateId);
  const rtState = rtDoc?.state.global;

  if (!subscription && !resourceInstance) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <p className="text-sm text-stone-500">
          No Operational Hub subscription found in this drive.
        </p>
      </div>
    );
  }

  const subStatus = subscription?.status ?? "PENDING";
  const subStatusPill =
    SUBSCRIPTION_PILL[subStatus] ?? SUBSCRIPTION_PILL.PENDING;
  const debt = Number(subscription?.totalDebt ?? 0);
  const currency =
    subscription?.tierCurrency ?? subscription?.globalCurrency ?? "USD";
  const title =
    rtState?.title ??
    resourceInstance?.templateName ??
    subscription?.resource?.label ??
    "Operational Hub";
  const summary =
    rtState?.summary ??
    resourceInstance?.description ??
    "A turnkey legal and operational setup for open-source builder teams.";

  return (
    <div className="space-y-6 p-2">
      {/* Hero */}
      <div className="rounded-2xl border border-violet-100/60 bg-gradient-to-br from-violet-50 to-indigo-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-violet-600/10 p-2.5 text-violet-700">
            <Building2 size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-stone-800">{title}</h1>
              {subscription ? (
                <Pill className={subStatusPill}>{subStatus}</Pill>
              ) : null}
            </div>
            <p className="mt-1 max-w-2xl text-sm text-stone-600">{summary}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-stone-500">
              {subscription?.tierName ? (
                <span className="inline-flex items-center rounded-full bg-white/80 px-2.5 py-1 font-medium text-violet-700 ring-1 ring-violet-200">
                  {subscription.tierName} tier
                </span>
              ) : null}
              {subscription?.selectedBillingCycle ? (
                <span>
                  · {formatCycle(subscription.selectedBillingCycle)} billing
                </span>
              ) : null}
              {resourceInstance?.activatedAt ? (
                <span>
                  · Active since {formatDate(resourceInstance.activatedAt)}
                </span>
              ) : subscription?.activatedSince ? (
                <span>
                  · Active since {formatDate(subscription.activatedSince)}
                </span>
              ) : null}
              {resourceInstance?.operatorProfile?.operatorName ? (
                <span className="inline-flex items-center gap-1">
                  · <User size={12} />{" "}
                  {resourceInstance.operatorProfile.operatorName}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        <Kpi
          icon={<CheckCircle2 size={14} />}
          label="Tier"
          value={subscription?.tierName ?? "—"}
        />
        <Kpi
          icon={<CreditCard size={14} />}
          label="Billing"
          value={formatCycle(subscription?.selectedBillingCycle)}
        />
        <Kpi
          icon={<Calendar size={14} />}
          label="Next Renewal"
          value={formatDate(subscription?.nextBillingDate)}
        />
        <Kpi
          icon={<AlertCircle size={14} />}
          label="Outstanding"
          value={debt > 0 ? formatMoney(debt, currency) : "Paid up"}
          tone={debt > 0 ? "danger" : "muted"}
        />
      </div>

      {/* Your configuration — the customer's actual selections from the
          resource-instance (single selectedOption per facet). Falls back to the
          RT's catalog facets if the instance hasn't been provisioned yet. */}
      {resourceInstance && resourceInstance.configuration.length > 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-stone-700">
            Your configuration
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            The choices you made for this product.
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {resourceInstance.configuration.map((f) => (
              <div key={f.id}>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
                  {f.categoryLabel}
                </div>
                <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                  {f.selectedOption}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : rtState && (rtState.facetTargets?.length ?? 0) > 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-stone-700">
            Configuration options
          </h2>
          <p className="mb-4 text-xs text-stone-400">
            The choices this product supports. Your selections appear here once
            the instance is provisioned.
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {(rtState.facetTargets ?? []).map((ft) => (
              <div key={ft.id}>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
                  {ft.categoryLabel}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(ft.selectedOptions ?? []).map((opt) => (
                    <span
                      key={opt}
                      className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Provisioning timeline — surfaced only when there's something to say. */}
      {resourceInstance &&
      (resourceInstance.confirmedAt ||
        resourceInstance.provisioningStartedAt ||
        resourceInstance.provisioningCompletedAt ||
        resourceInstance.activatedAt ||
        resourceInstance.suspendedAt ||
        resourceInstance.terminatedAt) ? (
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="mb-3 flex items-center gap-2">
            <Activity size={14} className="text-stone-500" />
            <h2 className="text-sm font-semibold text-stone-700">Lifecycle</h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
            {resourceInstance.confirmedAt ? (
              <Step
                label="Confirmed"
                value={formatDate(resourceInstance.confirmedAt)}
              />
            ) : null}
            {resourceInstance.provisioningStartedAt ? (
              <Step
                label="Provisioning started"
                value={formatDate(resourceInstance.provisioningStartedAt)}
              />
            ) : null}
            {resourceInstance.provisioningCompletedAt ? (
              <Step
                label="Provisioning completed"
                value={formatDate(resourceInstance.provisioningCompletedAt)}
              />
            ) : null}
            {resourceInstance.activatedAt ? (
              <Step
                label="Activated"
                value={formatDate(resourceInstance.activatedAt)}
              />
            ) : null}
            {resourceInstance.suspendedAt ? (
              <Step
                label="Suspended"
                value={`${formatDate(resourceInstance.suspendedAt)}${
                  resourceInstance.suspensionType
                    ? ` (${resourceInstance.suspensionType})`
                    : ""
                }`}
                tone="warn"
              />
            ) : null}
            {resourceInstance.terminatedAt ? (
              <Step
                label="Terminated"
                value={formatDate(resourceInstance.terminatedAt)}
                tone="danger"
              />
            ) : null}
          </dl>
          {resourceInstance.suspensionReason ? (
            <p className="mt-3 text-xs text-amber-700">
              Suspension reason: {resourceInstance.suspensionReason}
            </p>
          ) : null}
          {resourceInstance.terminationReason ? (
            <p className="mt-3 text-xs text-rose-700">
              Termination reason: {resourceInstance.terminationReason}
            </p>
          ) : null}
          {resourceInstance.provisioningFailureReason ? (
            <p className="mt-3 text-xs text-rose-700">
              Provisioning failure: {resourceInstance.provisioningFailureReason}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* What's included — setup + recurring services from the RT */}
      {rtState &&
      ((rtState.setupServices?.length ?? 0) > 0 ||
        (rtState.recurringServices?.length ?? 0) > 0) ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-stone-700">
              Setup (one-time)
            </h2>
            <ul className="space-y-2">
              {(rtState.setupServices ?? []).map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-stone-600"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-stone-700">
              Recurring (included)
            </h2>
            <ul className="space-y-2">
              {(rtState.recurringServices ?? []).map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-stone-600"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Reports & Activity shortcuts */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onNavigate?.("expense-reports")}
          className="group rounded-xl border border-stone-200 bg-white p-5 text-left transition hover:border-violet-300 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-stone-100 p-2 text-stone-600 transition group-hover:bg-violet-100 group-hover:text-violet-700">
              <FileText size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-700">
                Expense Reports
              </div>
              <div className="text-xs text-stone-500">
                Track and review expenses
              </div>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.("snapshot-reports")}
          className="group rounded-xl border border-stone-200 bg-white p-5 text-left transition hover:border-violet-300 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-stone-100 p-2 text-stone-600 transition group-hover:bg-violet-100 group-hover:text-violet-700">
              <Camera size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-700">
                Snapshot Reports
              </div>
              <div className="text-xs text-stone-500">
                Monthly operational snapshots
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* About this product — RT contentSections */}
      {rtState && (rtState.contentSections?.length ?? 0) > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-stone-700">
            About this product
          </h2>
          {(rtState.contentSections ?? []).map((cs) => (
            <details
              key={cs.id}
              className="group rounded-xl border border-stone-200 bg-white p-4 open:bg-stone-50/30"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-stone-700">
                {cs.title}
                <span className="text-stone-400 transition group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-stone-600">
                {cs.content}
              </div>
            </details>
          ))}
        </div>
      ) : null}

      {/* FAQs — RT faqFields */}
      {rtState && (rtState.faqFields?.length ?? 0) > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-stone-700">FAQs</h2>
          {(rtState.faqFields ?? []).map((q) => (
            <details
              key={q.id}
              className="group rounded-xl border border-stone-200 bg-white p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-stone-700">
                {q.question ?? "Question"}
                <span className="text-stone-400 transition group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="mt-3 whitespace-pre-wrap text-sm text-stone-600">
                {q.answer ?? ""}
              </div>
            </details>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Step({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warn" | "danger";
}) {
  const valueCls =
    tone === "danger"
      ? "text-rose-700"
      : tone === "warn"
        ? "text-amber-700"
        : "text-stone-700";
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">
        {label}
      </dt>
      <dd className={`text-sm font-medium ${valueCls}`}>{value}</dd>
    </div>
  );
}
