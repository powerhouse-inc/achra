import { useMemo } from "react";
import type { SubscriptionInstanceState } from "document-models/subscription-instance";
import type { ResourceInstanceState } from "document-models/resource-instance";

// ---------- Public types ----------

export interface SubscriptionSummary {
  id: string;
  name: string;
  customerName: string;
  customerId: string;
  tierName: string;
  status: string;
  billingCycle: string;
  mrr: number;
  currency: string;
  renewalDate: string | null;
  createdAt: string | null;
  outstandingAmount: number;
  linkedResourceId: string | null;
  linkedTemplateName: string | null;
  resourceCount: number;
}

export interface ResourceSummary {
  id: string;
  name: string;
  templateName: string;
  status: string;
  customerName: string;
  activatedAt: string | null;
  facetCount: number;
  description: string | null;
}

export interface CustomerSummary {
  name: string;
  initials: string;
  customerId: string;
  subscriptionCount: number;
  mrr: number;
}

export interface TemplateRevenue {
  templateName: string;
  amount: number;
  color: string;
}

export interface TierDistribution {
  tierName: string;
  count: number;
}

export interface CustomerMetric {
  customerName: string;
  customerId: string;
  subscriptionId: string;
  serviceName: string;
  metricName: string;
  unitName: string;
  currentUsage: number;
  freeLimit: number;
  paidLimit: number | null;
  unitCost: number;
  overageUnits: number;
  overageCost: number;
  utilizationPct: number | null;
  severity: "ok" | "warning" | "critical";
}

export type ActionSeverity = "critical" | "warning" | "info";

export interface ActionItem {
  severity: ActionSeverity;
  title: string;
  description: string;
  customerName?: string;
}

export interface SubscriptionMetrics {
  totalMonthlyRevenue: number;
  activeSubscriptionCount: number;
  activeCustomerCount: number;
  activeResourceCount: number;
  resourceUtilization: number;
  subscriptionSummaries: SubscriptionSummary[];
  resourceSummaries: ResourceSummary[];
  revenueByTemplate: TemplateRevenue[];
  subscriptionsByTier: TierDistribution[];
  topCustomers: CustomerSummary[];
  revenueByStatus: Array<{ status: string; mrr: number; count: number }>;
  customerMetrics: CustomerMetric[];
  actionItems: ActionItem[];
  nextRenewal: { date: string; planName: string } | null;
  resourceHealth: number;
  currency: string;
}

// ---------- Chart color palette ----------

const TEMPLATE_COLORS = [
  "#5b6abf", // indigo/blue
  "#00b8a9", // teal
  "#f0b429", // amber
  "#a855f7", // purple
  "#ef4444", // red
  "#64748b", // slate
];

// ---------- Helpers ----------

interface DocLike {
  header: { id: string; documentType: string; name?: string };
  state: { global: unknown };
}

function getGlobal<T>(doc: DocLike): T {
  return (doc.state as { global: T }).global;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/**
 * Compute MRR for a single subscription.
 * tierPrice is often null — fall back to sum of serviceGroup recurring costs.
 */
function computeSubscriptionMrr(sub: SubscriptionInstanceState): number {
  // Base MRR from tier price
  let baseMrr = sub.tierPrice ?? 0;

  // If tierPrice is null/0, compute from service group recurring costs
  if (!baseMrr) {
    for (const group of sub.serviceGroups) {
      baseMrr += group.recurringCost?.amount ?? 0;
    }
  }

  // Dynamic cost from metrics across all services in all groups
  let dynamicCost = 0;

  // Top-level services (usually empty but check anyway)
  for (const svc of sub.services) {
    dynamicCost += computeServiceMetricsCost(svc.metrics);
  }

  // Services within groups
  for (const group of sub.serviceGroups) {
    for (const svc of group.services) {
      dynamicCost += computeServiceMetricsCost(svc.metrics);
    }
  }

  return baseMrr + dynamicCost;
}

function computeServiceMetricsCost(
  metrics: Array<{
    currentUsage: number;
    freeLimit?: number | null;
    unitCost?: { amount: number } | null;
  }>,
): number {
  let cost = 0;
  for (const m of metrics) {
    if (!m.unitCost?.amount) continue;
    const free = m.freeLimit ?? 0;
    const billable = Math.max(0, m.currentUsage - free);
    cost += billable * m.unitCost.amount;
  }
  return cost;
}

// ---------- Main hook ----------

export function useSubscriptionMetrics(
  subscriptionDocs: DocLike[],
  resourceDocs: DocLike[],
): SubscriptionMetrics {
  return useMemo(() => {
    // Build resource lookup: id → ResourceInstanceState + header
    const resourceMap = new Map<
      string,
      { state: ResourceInstanceState; name: string }
    >();
    for (const doc of resourceDocs) {
      const state = getGlobal<ResourceInstanceState>(doc);
      resourceMap.set(doc.header.id, {
        state,
        name: doc.header.name || state.customerName || "Unnamed Resource",
      });
    }

    // Build subscription summaries
    const subscriptionSummaries: SubscriptionSummary[] = [];
    const customerMap = new Map<
      string,
      { name: string; mrr: number; count: number }
    >();

    for (const doc of subscriptionDocs) {
      const sub = getGlobal<SubscriptionInstanceState>(doc);
      const mrr = computeSubscriptionMrr(sub);
      const linkedResourceId = sub.resource?.id ?? null;
      const linkedResource = linkedResourceId
        ? resourceMap.get(linkedResourceId)
        : null;

      subscriptionSummaries.push({
        id: doc.header.id,
        name: doc.header.name || sub.tierName || "Unnamed Subscription",
        customerName: sub.customerName || "Unknown",
        customerId: sub.customerId || doc.header.id,
        tierName: sub.tierName || "—",
        status: sub.status,
        billingCycle: sub.selectedBillingCycle || "MONTHLY",
        mrr,
        currency: sub.tierCurrency || sub.globalCurrency || "USD",
        renewalDate: sub.nextBillingDate || null,
        createdAt: sub.createdAt || null,
        outstandingAmount: sub.totalDebt ?? 0,
        linkedResourceId,
        linkedTemplateName: linkedResource?.state.templateName ?? null,
        resourceCount: linkedResourceId ? 1 : 0,
      });

      // Aggregate by customer
      const custId = sub.customerId || doc.header.id;
      const custName = sub.customerName || "Unknown";
      const existing = customerMap.get(custId);
      if (existing) {
        existing.mrr += mrr;
        existing.count += 1;
      } else {
        customerMap.set(custId, { name: custName, mrr, count: 1 });
      }
    }

    // Build resource summaries
    const resourceSummaries: ResourceSummary[] = resourceDocs.map((doc) => {
      const res = getGlobal<ResourceInstanceState>(doc);
      return {
        id: doc.header.id,
        name: doc.header.name || res.customerName || "Unnamed Resource",
        templateName: res.templateName || "—",
        status: res.status,
        customerName: res.customerName || "Unknown",
        activatedAt: res.activatedAt || null,
        facetCount: (res.configuration ?? []).length,
        description: res.description || null,
      };
    });

    // Aggregates
    const nonCancelled = subscriptionSummaries.filter(
      (s) => s.status !== "CANCELLED",
    );
    const activeOnly = subscriptionSummaries.filter(
      (s) => s.status === "ACTIVE",
    );
    const activeSubscriptionCount = nonCancelled.length;
    const totalMonthlyRevenue = activeOnly.reduce((sum, s) => sum + s.mrr, 0);
    const activeCustomerCount = new Set(nonCancelled.map((s) => s.customerId))
      .size;

    const activeResources = resourceSummaries.filter(
      (r) => r.status === "ACTIVE",
    );
    const nonTerminatedResources = resourceSummaries.filter(
      (r) => r.status !== "TERMINATED",
    );
    const activeResourceCount = activeResources.length;
    const resourceUtilization =
      nonTerminatedResources.length > 0
        ? Math.round(
            (activeResources.length / nonTerminatedResources.length) * 100,
          )
        : 0;

    // Revenue by template
    const templateMap = new Map<string, number>();
    for (const sub of nonCancelled) {
      const tpl = sub.linkedTemplateName || "Other";
      templateMap.set(tpl, (templateMap.get(tpl) ?? 0) + sub.mrr);
    }
    const revenueByTemplate: TemplateRevenue[] = [...templateMap.entries()]
      .toSorted((a, b) => b[1] - a[1])
      .map(([templateName, amount], i) => ({
        templateName,
        amount,
        color: TEMPLATE_COLORS[i % TEMPLATE_COLORS.length],
      }));

    // Subscriptions by tier
    const tierMap = new Map<string, number>();
    for (const sub of nonCancelled) {
      tierMap.set(sub.tierName, (tierMap.get(sub.tierName) ?? 0) + 1);
    }
    const subscriptionsByTier: TierDistribution[] = [...tierMap.entries()]
      .toSorted((a, b) => b[1] - a[1])
      .map(([tierName, count]) => ({ tierName, count }));

    // Customers ranked by MRR — full list. The dashboard widget slices to
    // a top-N preview itself so it can offer a "View all customers" toggle.
    const topCustomers: CustomerSummary[] = [...customerMap.entries()]
      .toSorted((a, b) => b[1].mrr - a[1].mrr)
      .map(([customerId, { name, mrr, count }]) => ({
        name,
        initials: getInitials(name),
        customerId,
        subscriptionCount: count,
        mrr,
      }));

    // Next renewal (earliest future date)
    const now = Date.now();
    let nextRenewal: { date: string; planName: string } | null = null;
    for (const sub of nonCancelled) {
      if (!sub.renewalDate) continue;
      const rd = new Date(sub.renewalDate).getTime();
      if (
        rd > now &&
        (!nextRenewal || rd < new Date(nextRenewal.date).getTime())
      ) {
        nextRenewal = { date: sub.renewalDate, planName: sub.name };
      }
    }

    // Resource health
    const resourceHealth =
      resourceSummaries.length > 0
        ? Math.round((activeResources.length / resourceSummaries.length) * 100)
        : 0;

    // Revenue by status
    const statusMrrMap = new Map<string, { mrr: number; count: number }>();
    for (const sub of nonCancelled) {
      const existing = statusMrrMap.get(sub.status);
      if (existing) {
        existing.mrr += sub.mrr;
        existing.count += 1;
      } else {
        statusMrrMap.set(sub.status, { mrr: sub.mrr, count: 1 });
      }
    }
    const revenueByStatus = [...statusMrrMap.entries()]
      .toSorted((a, b) => b[1].mrr - a[1].mrr)
      .map(([status, { mrr, count }]) => ({ status, mrr, count }));

    // Determine dominant currency
    const currency = nonCancelled[0]?.currency ?? "USD";

    // Customer metrics — flatten all metrics across all subscriptions
    const customerMetrics: CustomerMetric[] = [];
    for (const doc of subscriptionDocs) {
      const sub = getGlobal<SubscriptionInstanceState>(doc);
      const custName = sub.customerName || "Unknown";
      const custId = sub.customerId || doc.header.id;

      for (const group of sub.serviceGroups) {
        for (const svc of group.services) {
          for (const m of svc.metrics) {
            const free = m.freeLimit ?? 0;
            const overageUnits = Math.max(0, m.currentUsage - free);
            const unitCostAmt = m.unitCost?.amount ?? 0;
            const overageCost = overageUnits * unitCostAmt;
            const limit = m.paidLimit;
            const utilizationPct =
              limit && limit > 0
                ? Math.round((m.currentUsage / limit) * 100)
                : null;

            let severity: "ok" | "warning" | "critical" = "ok";
            if (utilizationPct !== null) {
              if (utilizationPct > 100) severity = "critical";
              else if (utilizationPct >= 70) severity = "warning";
            } else if (overageUnits > 0) {
              severity = "critical";
            }

            customerMetrics.push({
              customerName: custName,
              customerId: custId,
              subscriptionId: doc.header.id,
              serviceName: svc.name || group.name,
              metricName: m.name,
              unitName: m.unitName,
              currentUsage: m.currentUsage,
              freeLimit: free,
              paidLimit: limit ?? null,
              unitCost: unitCostAmt,
              overageUnits,
              overageCost,
              utilizationPct,
              severity,
            });
          }
        }
      }
    }
    // Sort: critical first, then warning, then ok
    const severityOrder = { critical: 0, warning: 1, ok: 2 };
    customerMetrics.sort(
      (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
    );

    // Action items — consolidated operator alerts
    const actionItems: ActionItem[] = [];

    // Overage alerts
    for (const m of customerMetrics) {
      if (m.severity === "critical") {
        actionItems.push({
          severity: "critical",
          title: `${m.metricName} overage`,
          description: `${m.currentUsage} ${m.unitName} used (free: ${m.freeLimit}) — $${m.overageCost.toLocaleString()} overage charges`,
          customerName: m.customerName,
        });
      } else if (m.severity === "warning") {
        actionItems.push({
          severity: "warning",
          title: `${m.metricName} approaching limit`,
          description: `${m.currentUsage}/${m.paidLimit ?? m.freeLimit} ${m.unitName} (${m.utilizationPct}% used)`,
          customerName: m.customerName,
        });
      }
    }

    // Pending subscriptions
    for (const sub of subscriptionSummaries) {
      if (sub.status === "PENDING") {
        actionItems.push({
          severity: "warning",
          title: "Subscription pending activation",
          description: `${sub.tierName} plan — awaiting activation`,
          customerName: sub.customerName,
        });
      }
    }

    // Resources still provisioning or draft
    for (const res of resourceSummaries) {
      if (res.status === "PROVISIONING") {
        actionItems.push({
          severity: "info",
          title: "Resource provisioning",
          description: `${res.templateName} — still being provisioned`,
          customerName: res.customerName,
        });
      } else if (res.status === "DRAFT") {
        actionItems.push({
          severity: "info",
          title: "Resource in draft",
          description: `${res.templateName} — not yet confirmed`,
          customerName: res.customerName,
        });
      }
    }

    // Upsell opportunities — optional groups not opted into
    for (const doc of subscriptionDocs) {
      const sub = getGlobal<SubscriptionInstanceState>(doc);
      const optionalNotActive = sub.serviceGroups.filter(
        (g) => g.optional && g.recurringCost,
      );
      if (optionalNotActive.length > 0) {
        const totalOptional = optionalNotActive.reduce(
          (sum, g) => sum + (g.recurringCost?.amount ?? 0),
          0,
        );
        actionItems.push({
          severity: "info",
          title: "Upsell opportunity",
          description: `${optionalNotActive.length} optional service${optionalNotActive.length > 1 ? "s" : ""} available ($${totalOptional.toLocaleString()}/mo potential)`,
          customerName: sub.customerName || "Unknown",
        });
      }
    }

    return {
      totalMonthlyRevenue,
      activeSubscriptionCount,
      activeCustomerCount,
      activeResourceCount,
      resourceUtilization,
      subscriptionSummaries,
      resourceSummaries,
      revenueByTemplate,
      subscriptionsByTier,
      topCustomers,
      revenueByStatus,
      customerMetrics,
      actionItems,
      nextRenewal,
      resourceHealth,
      currency,
    };
  }, [subscriptionDocs, resourceDocs]);
}
