import { describe, expect, it } from "vitest";
import { generateId } from "document-model";
import {
  reducer,
  utils,
  initializeSubscription,
  activateSubscription,
  reportPayment,
  applyCredit,
} from "document-models/subscription-instance/v1";
import type { SubscriptionInstanceDocument } from "document-models/subscription-instance";

// Per BA Q1 (Option B — hybrid model): the cached scalars `totalDebt`,
// `totalCredit`, and `currentCycleOverage` MUST stay in lockstep with the
// canonical `debtLineItems` array. If a reducer ever mutates one without
// the other, this test catches it.

function assertInvariants(doc: SubscriptionInstanceDocument): void {
  const state = doc.state.global;
  const sliceDebitSum = state.debtLineItems.reduce(
    (sum, s) => sum + s.debitAmount,
    0,
  );
  const sliceSettledSum = state.debtLineItems.reduce(
    (sum, s) => sum + s.settledAmount,
    0,
  );

  // Allow a 0.01 tolerance for floating-point drift (matches the
  // tolerance used in MIGRATE_LEDGER_TO_SLICES validation).
  const EPS = 0.01;

  expect(
    Math.abs((state.totalDebt ?? 0) - sliceDebitSum),
    `totalDebt (${state.totalDebt}) must equal sum(debitAmount) (${sliceDebitSum})`,
  ).toBeLessThan(EPS);

  expect(
    Math.abs((state.totalCredit ?? 0) - sliceSettledSum),
    `totalCredit (${state.totalCredit}) must equal sum(settledAmount) (${sliceSettledSum})`,
  ).toBeLessThan(EPS);

  // currentCycleOverage = sum of unfrozen DYNAMIC slices in current cycle
  const cycleStart = state.currentBillingCycleStart;
  const expectedOverage = state.debtLineItems.reduce((sum, s) => {
    if (s.origin !== "DYNAMIC") return sum;
    if (s.frozen) return sum;
    if (cycleStart && s.chargedAt < cycleStart) return sum;
    return sum + s.debitAmount;
  }, 0);
  expect(
    Math.abs((state.currentCycleOverage ?? 0) - expectedOverage),
    `currentCycleOverage (${state.currentCycleOverage}) must equal sum(active DYNAMIC debit in cycle) (${expectedOverage})`,
  ).toBeLessThan(EPS);
}

describe("Aggregate invariants — totalDebt/totalCredit/currentCycleOverage = reduce(slices)", () => {
  it("holds on a freshly-created document", () => {
    const doc = utils.createDocument();
    assertInvariants(doc);
  });

  it("holds after initialize with one service group", () => {
    let doc = utils.createDocument();
    const groupId = generateId();
    doc = reducer(
      doc,
      initializeSubscription({
        createdAt: "2026-01-01T00:00:00Z",
        tierPrice: 100,
        tierCurrency: "USD",
        selectedBillingCycle: "MONTHLY",
        globalCurrency: "USD",
        autoRenew: true,
        serviceGroups: [
          {
            id: groupId,
            name: "Core",
            optional: false,
            costType: "RECURRING",
            recurringAmount: 100,
            recurringCurrency: "USD",
            recurringBillingCycle: "MONTHLY",
            setupAmount: 50,
            setupCurrency: "USD",
            services: [],
          },
        ],
      }),
    );
    assertInvariants(doc);
  });

  it("holds after activate (slices emitted, totals match)", () => {
    let doc = utils.createDocument();
    const groupId = generateId();
    doc = reducer(
      doc,
      initializeSubscription({
        createdAt: "2026-01-01T00:00:00Z",
        tierPrice: 100,
        tierCurrency: "USD",
        selectedBillingCycle: "MONTHLY",
        globalCurrency: "USD",
        autoRenew: true,
        serviceGroups: [
          {
            id: groupId,
            name: "Core",
            optional: false,
            costType: "RECURRING",
            recurringAmount: 100,
            recurringCurrency: "USD",
            recurringBillingCycle: "MONTHLY",
            setupAmount: 50,
            setupCurrency: "USD",
            services: [],
          },
        ],
      }),
    );
    doc = reducer(
      doc,
      activateSubscription({
        activatedSince: "2026-01-01T00:00:00Z",
        setupSliceIds: [{ sourceId: groupId, sliceId: generateId() }],
        recurringSliceIds: [{ sourceId: groupId, sliceId: generateId() }],
      }),
    );
    const state = doc.state.global;
    expect(state.debtLineItems.length).toBe(2);
    expect(state.totalDebt).toBe(150);
    assertInvariants(doc);
  });

  it("holds after REPORT_PAYMENT bulk allocation", () => {
    // Build a doc with two slices: $50 setup, $100 recurring → $150 total
    let doc = utils.createDocument();
    const groupId = generateId();
    doc = reducer(
      doc,
      initializeSubscription({
        createdAt: "2026-01-01T00:00:00Z",
        tierPrice: 100,
        tierCurrency: "USD",
        selectedBillingCycle: "MONTHLY",
        globalCurrency: "USD",
        autoRenew: true,
        serviceGroups: [
          {
            id: groupId,
            name: "Core",
            optional: false,
            costType: "RECURRING",
            recurringAmount: 100,
            recurringCurrency: "USD",
            recurringBillingCycle: "MONTHLY",
            setupAmount: 50,
            setupCurrency: "USD",
            services: [],
          },
        ],
      }),
    );
    doc = reducer(
      doc,
      activateSubscription({
        activatedSince: "2026-01-01T00:00:00Z",
        setupSliceIds: [{ sourceId: groupId, sliceId: generateId() }],
        recurringSliceIds: [{ sourceId: groupId, sliceId: generateId() }],
      }),
    );
    // Pay $80 — covers all $50 setup + $30 of recurring (FIFO+priority)
    doc = reducer(
      doc,
      reportPayment({
        amount: 80,
        paymentDate: "2026-01-05T00:00:00Z",
      }),
    );
    const state = doc.state.global;
    expect(state.totalCredit).toBe(80);
    const setupSlice = state.debtLineItems.find((s) => s.origin === "SETUP");
    const recurSlice = state.debtLineItems.find(
      (s) => s.origin === "SUBSCRIPTION_FEE",
    );
    expect(setupSlice?.status).toBe("FULLY_PAID");
    expect(setupSlice?.settledAmount).toBe(50);
    expect(recurSlice?.status).toBe("PARTIALLY_PAID");
    expect(recurSlice?.settledAmount).toBe(30);
    assertInvariants(doc);
  });

  it("holds after APPLY_CREDIT (virtual payment)", () => {
    let doc = utils.createDocument();
    const groupId = generateId();
    doc = reducer(
      doc,
      initializeSubscription({
        createdAt: "2026-01-01T00:00:00Z",
        tierPrice: 100,
        tierCurrency: "USD",
        selectedBillingCycle: "MONTHLY",
        globalCurrency: "USD",
        autoRenew: true,
        serviceGroups: [
          {
            id: groupId,
            name: "Core",
            optional: false,
            costType: "RECURRING",
            recurringAmount: 100,
            recurringCurrency: "USD",
            recurringBillingCycle: "MONTHLY",
            setupAmount: 50,
            setupCurrency: "USD",
            services: [],
          },
        ],
      }),
    );
    doc = reducer(
      doc,
      activateSubscription({
        activatedSince: "2026-01-01T00:00:00Z",
        setupSliceIds: [{ sourceId: groupId, sliceId: generateId() }],
        recurringSliceIds: [{ sourceId: groupId, sliceId: generateId() }],
      }),
    );
    doc = reducer(
      doc,
      applyCredit({
        amount: 25,
        creditDate: "2026-01-05T00:00:00Z",
        reason: "Goodwill — onboarding delay",
      }),
    );
    const state = doc.state.global;
    expect(state.totalCredit).toBe(25);
    const setupSlice = state.debtLineItems.find((s) => s.origin === "SETUP");
    expect(setupSlice?.settledAmount).toBe(25);
    expect(setupSlice?.status).toBe("PARTIALLY_PAID");
    assertInvariants(doc);
  });
});
