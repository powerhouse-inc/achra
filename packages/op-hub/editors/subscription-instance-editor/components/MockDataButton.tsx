import { useCallback } from "react";
import { generateId } from "document-model/core";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import {
  initializeSubscription,
  activateSubscription,
} from "../../../document-models/subscription-instance/v1/gen/subscription/creators.js";
import { setCustomerType } from "../../../document-models/subscription-instance/v1/gen/customer/creators.js";

interface MockDataButtonProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
}

// Mock data models the Operational Hub "Standard" tier from
// https://www.operationalhub.io/pricing — Swiss-association-as-a-service
// for DAOs and crypto-native foundations. Two metered metrics drive the
// usage demos: Invoices (CUMULATIVE counter) and Active Contributors
// (NON_CUMULATIVE headcount).

export function MockDataButton({ document, dispatch }: MockDataButtonProps) {
  const hasData =
    document.state.global.services.length > 0 ||
    document.state.global.serviceGroups.length > 0;

  const populateMockData = useCallback(() => {
    const oneMonthAgo = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).toISOString();

    // 1. Initialize subscription with full service group structure.
    //    Pricing lives at the SERVICE GROUP level, not per-service.
    //    Extract groups into a local so step 2 (activation) walks the same
    //    source-of-truth without depending on React state propagation
    //    between dispatches.
    const mockServiceGroups: NonNullable<
      Parameters<typeof initializeSubscription>[0]["serviceGroups"]
    > = [
      // === Core Operations (mandatory base — $1,250/mo + $2,500 setup) ===
      {
        id: generateId(),
        name: "Core Operations",
        optional: false,
        costType: "RECURRING",
        recurringAmount: 1250,
        recurringCurrency: "USD",
        recurringBillingCycle: "MONTHLY",
        setupAmount: 2500,
        setupCurrency: "USD",
        services: [
          {
            id: generateId(),
            name: "Monthly Accounting & Close",
            description:
              "Bookkeeping, monthly closes, multi-entity consolidation, regulatory filings.",
            metrics: [
              {
                id: generateId(),
                name: "Invoices",
                unitName: "invoices",
                // At activation, nothing has accrued yet. CUMULATIVE counter
                // starts at zero — operator dispatches INCREMENT_METRIC_USAGE
                // as invoices flow in during the first accrual cycle.
                currentUsage: 0,
                metricType: "CUMULATIVE",
                accrualCycle: "MONTHLY",
                freeLimit: 50,
                paidLimit: 1000,
                unitCostAmount: 5,
                unitCostCurrency: "USD",
                unitCostBillingCycle: "MONTHLY",
              },
            ],
          },
          {
            id: generateId(),
            name: "Contributor Operations",
            description:
              "Onboarding, payouts, KYC, multi-currency disbursement, contributor support.",
            metrics: [
              {
                id: generateId(),
                name: "Active Contributors",
                unitName: "contributors",
                // At activation, no contributors have been onboarded yet.
                // NON_CUMULATIVE state (headcount) starts at zero — operator
                // dispatches UPDATE_METRIC_USAGE as people join.
                currentUsage: 0,
                metricType: "NON_CUMULATIVE",
                accrualCycle: "MONTHLY",
                // freeLimit deliberately 1 (not 0) so the editor renders
                // "1 free / 100 max" rather than "100 paid" only — the
                // reducer treats `0 || null` as null which suppresses the
                // free-limit display.
                freeLimit: 1,
                paidLimit: 100,
                unitCostAmount: 250,
                unitCostCurrency: "USD",
                unitCostBillingCycle: "MONTHLY",
              },
            ],
          },
          {
            id: generateId(),
            name: "Multi-Currency Payouts",
            description:
              "USD, EUR, CHF, GBP, USDC, DAI — automated FX handling and routing.",
          },
          {
            id: generateId(),
            name: "Dedicated Ops Support",
            description:
              "Named ops contact during business hours. Slack + email.",
          },
        ],
      },
      // === AML Monitoring & Compliance (optional add-on — $500/mo) ===
      {
        id: generateId(),
        name: "AML Monitoring & Compliance",
        optional: true,
        costType: "RECURRING",
        recurringAmount: 500,
        recurringCurrency: "USD",
        recurringBillingCycle: "MONTHLY",
        services: [],
      },
      // === Card & Spend Operations (optional add-on — $350/mo) ===
      {
        id: generateId(),
        name: "Card & Spend Operations",
        optional: true,
        costType: "RECURRING",
        recurringAmount: 350,
        recurringCurrency: "USD",
        recurringBillingCycle: "MONTHLY",
        services: [],
      },
      // === Audit Support (optional add-on — $800/mo) ===
      {
        id: generateId(),
        name: "Audit Support",
        optional: true,
        costType: "RECURRING",
        recurringAmount: 800,
        recurringCurrency: "USD",
        recurringBillingCycle: "MONTHLY",
        services: [],
      },
    ];

    if (!document.state.global.customerId) {
      dispatch(
        initializeSubscription({
          createdAt: oneMonthAgo,
          customerId: `phid:customer:${generateId()}`,
          customerName: "Genesis DAO",
          customerEmail: "ops@genesis-dao.example.org",
          resourceId: `phid:resource:${generateId()}`,
          resourceLabel: "Operational Hub — Standard",
          tierName: "Standard",
          tierPricingOptionId: generateId(),
          tierPrice: 1250,
          tierCurrency: "USD",
          tierPricingMode: "CALCULATED",
          selectedBillingCycle: "MONTHLY",
          globalCurrency: "USD",
          autoRenew: true,
          serviceGroups: mockServiceGroups,
        }),
      );
    }

    // 2. Activate subscription. Walk the same mockServiceGroups source we
    // just dispatched so the slice IDs match what the reducer will see —
    // independent of React state propagation between dispatches.
    // sourceName is informational — purely for the operation log so the
    // operator can read "{sliceId} → Core Operations" instead of opaque
    // OIDs. Reducer ignores the field.
    const setupSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    const recurringSliceIds: {
      sourceId: string;
      sliceId: string;
      sourceName?: string;
    }[] = [];
    for (const group of mockServiceGroups) {
      if (group.setupAmount) {
        setupSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
      if (group.recurringAmount) {
        recurringSliceIds.push({
          sourceId: group.id,
          sliceId: generateId(),
          sourceName: group.name,
        });
      }
      for (const svc of group.services ?? []) {
        if (svc.setupAmount) {
          setupSliceIds.push({
            sourceId: svc.id,
            sliceId: generateId(),
            sourceName: svc.name ?? undefined,
          });
        }
        if (svc.recurringAmount) {
          recurringSliceIds.push({
            sourceId: svc.id,
            sliceId: generateId(),
            sourceName: svc.name ?? undefined,
          });
        }
      }
    }
    dispatch(
      activateSubscription({
        activatedSince: oneMonthAgo,
        setupSliceIds,
        recurringSliceIds,
      }),
    );

    // 3. Customer type — DAOs are TEAM by default in the model.
    dispatch(
      setCustomerType({
        customerType: "TEAM",
        teamMemberCount: 12,
      }),
    );
  }, [document.state.global.customerId, dispatch]);

  return (
    <button
      type="button"
      className="si-btn si-btn--secondary"
      onClick={populateMockData}
      title={hasData ? "Add more mock data" : "Populate with example data"}
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
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
      {hasData ? "Add More Data" : "Populate Mock Data"}
    </button>
  );
}
