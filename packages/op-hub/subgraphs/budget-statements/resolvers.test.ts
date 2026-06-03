import { describe, it, expect } from "vitest";
import {
  computeReportedActuals,
  computeNetExpenseTxns,
  extractIsoDate,
  getPeriodKey,
  getMonthKey,
} from "./resolvers.js";

const amt = (value: string | number) => ({
  unit: "USDS",
  value: String(value),
});

describe("computeReportedActuals", () => {
  it("returns zero when there are no wallets", () => {
    expect(computeReportedActuals({ wallets: [] })).toEqual(amt(0));
  });

  it("returns zero when wallets have no line items", () => {
    expect(
      computeReportedActuals({
        wallets: [{ lineItems: [] }, { lineItems: [] }],
      }),
    ).toEqual(amt(0));
  });

  it("sums actuals from a single wallet", () => {
    const result = computeReportedActuals({
      wallets: [
        {
          lineItems: [
            { actuals: amt(100) },
            { actuals: amt(250.5) },
            { actuals: amt(49.5) },
          ],
        },
      ],
    });
    expect(result).toEqual(amt(400));
  });

  it("sums actuals across multiple wallets", () => {
    const result = computeReportedActuals({
      wallets: [
        {
          lineItems: [{ actuals: amt(100) }, { actuals: amt(200) }],
        },
        {
          lineItems: [{ actuals: amt(300) }],
        },
      ],
    });
    expect(result).toEqual(amt(600));
  });

  it("treats non-numeric values as zero", () => {
    const result = computeReportedActuals({
      wallets: [
        {
          lineItems: [
            { actuals: amt("abc") },
            { actuals: amt(100) },
            { actuals: amt("") },
          ],
        },
      ],
    });
    expect(result).toEqual(amt(100));
  });

  it("handles negative actuals", () => {
    const result = computeReportedActuals({
      wallets: [
        {
          lineItems: [{ actuals: amt(-50) }, { actuals: amt(200) }],
        },
      ],
    });
    expect(result).toEqual(amt(150));
  });

  it("sums actuals regardless of unit on line items (all currently USDS)", () => {
    // In practice the expense report builder hardcodes unit="USDS",
    // but if line items had different units, values are still summed as-is.
    const result = computeReportedActuals({
      wallets: [
        {
          lineItems: [
            { actuals: { unit: "USDS", value: "100" } },
            { actuals: { unit: "DAI", value: "200" } },
            { actuals: { unit: "ETH", value: "1.5" } },
          ],
        },
      ],
    });
    // 100 + 200 + 1.5 = 301.5 (no conversion, sums raw values)
    expect(result).toEqual(amt(301.5));
  });
});

describe("extractIsoDate", () => {
  it("extracts YYYY-MM-DD from full ISO string", () => {
    expect(extractIsoDate("2025-09-01T00:00:00.000Z")).toBe("2025-09-01");
  });

  it("extracts YYYY-MM-DD from date-only string", () => {
    expect(extractIsoDate("2025-09-01")).toBe("2025-09-01");
  });

  it("returns null for invalid input", () => {
    expect(extractIsoDate("not-a-date")).toBeNull();
    expect(extractIsoDate("")).toBeNull();
  });
});

describe("getPeriodKey", () => {
  it("creates key from ISO date strings", () => {
    expect(
      getPeriodKey("2025-09-01T00:00:00.000Z", "2025-09-30T23:59:59.999Z"),
    ).toBe("2025-09-01_2025-09-30");
  });

  it("returns null when either date is missing", () => {
    expect(getPeriodKey(null, "2025-09-30T00:00:00.000Z")).toBeNull();
    expect(getPeriodKey("2025-09-01T00:00:00.000Z", null)).toBeNull();
    expect(getPeriodKey(null, null)).toBeNull();
  });
});

describe("getMonthKey", () => {
  it("extracts month key from UTC midnight ISO string", () => {
    expect(getMonthKey("2025-09-01T00:00:00.000Z")).toBe("SEP2025");
  });

  it("is not affected by timezone — UTC midnight stays in correct month", () => {
    // This was the original bug: new Date("2025-09-01T00:00:00.000Z").getMonth()
    // returns 7 (August) in UTC-3 because it becomes Aug 31 21:00 local time
    expect(getMonthKey("2025-09-01T00:00:00.000Z")).toBe("SEP2025");
    expect(getMonthKey("2025-01-01T00:00:00.000Z")).toBe("JAN2025");
    expect(getMonthKey("2025-12-01T00:00:00.000Z")).toBe("DEC2025");
  });

  it("handles all months", () => {
    const expected = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    for (let i = 0; i < 12; i++) {
      const month = String(i + 1).padStart(2, "0");
      expect(getMonthKey(`2026-${month}-15T12:00:00.000Z`)).toBe(
        `${expected[i]}2026`,
      );
    }
  });

  it("returns null for null or invalid input", () => {
    expect(getMonthKey(null)).toBeNull();
    expect(getMonthKey("not-a-date")).toBeNull();
    expect(getMonthKey("")).toBeNull();
  });
});

const makeTx = (
  direction: string,
  flowType: string,
  value: string | number,
  token = "USDS",
) => ({
  direction,
  flowType,
  amount: { value: { unit: token, value: String(value) }, unit: token },
});

describe("computeNetExpenseTxns", () => {
  it("returns zero when there are no accounts", () => {
    expect(computeNetExpenseTxns({ accounts: [] })).toEqual(amt(0));
  });

  it("returns zero when there are no Internal accounts", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Source",
          transactions: [makeTx("OUTFLOW", "External", 500)],
        },
        {
          type: "Destination",
          transactions: [makeTx("OUTFLOW", "External", 300)],
        },
        {
          type: "External",
          transactions: [makeTx("OUTFLOW", "External", 200)],
        },
      ],
    });
    expect(result).toEqual(amt(0));
  });

  it("sums only OUTFLOW transactions from Internal accounts that leave the group", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", 100), // counted: leaves group
            makeTx("INFLOW", "TopUp", 500), // ignored: inflow
            makeTx("OUTFLOW", "Internal", 200), // ignored: stays within group
          ],
        },
      ],
    });
    expect(result).toEqual(amt(100));
  });

  it("excludes Swap transactions", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", 100),
            makeTx("OUTFLOW", "Swap", 999), // excluded
            makeTx("OUTFLOW", "TopUp", 50),
          ],
        },
      ],
    });
    expect(result).toEqual(amt(150));
  });

  it("sums across multiple Internal accounts", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [makeTx("OUTFLOW", "External", 100)],
        },
        {
          type: "Internal",
          transactions: [makeTx("OUTFLOW", "Return", 200)],
        },
        {
          type: "Source",
          transactions: [makeTx("OUTFLOW", "External", 9999)], // ignored: not Internal
        },
      ],
    });
    expect(result).toEqual(amt(300));
  });

  it("excludes Internal flowType (inter-wallet transfers stay in group)", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "Internal", 500), // excluded: stays in group
            makeTx("OUTFLOW", "Internal", 300), // excluded: stays in group
            makeTx("OUTFLOW", "External", 100), // counted: leaves group
          ],
        },
      ],
    });
    expect(result).toEqual(amt(100));
  });

  it("returns zero when all Internal txns are swaps, internal transfers, or inflows", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "Swap", 100), // excluded: swap
            makeTx("OUTFLOW", "Internal", 400), // excluded: stays in group
            makeTx("INFLOW", "External", 200), // excluded: inflow
            makeTx("INFLOW", "Swap", 300), // excluded: inflow
          ],
        },
      ],
    });
    expect(result).toEqual(amt(0));
  });

  it("counts External, Return, and TopUp outflows as expenses leaving the group", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", 100), // counted: to external party
            makeTx("OUTFLOW", "Return", 200), // counted: returning to source
            makeTx("OUTFLOW", "TopUp", 50), // counted: funding destination
            makeTx("OUTFLOW", "Swap", 999), // excluded: token conversion
            makeTx("OUTFLOW", "Internal", 888), // excluded: inter-wallet
            makeTx("INFLOW", "TopUp", 5000), // excluded: inflow
          ],
        },
      ],
    });
    expect(result).toEqual(amt(350));
  });

  it("handles Internal accounts with no transactions", () => {
    const result = computeNetExpenseTxns({
      accounts: [{ type: "Internal", transactions: [] }],
    });
    expect(result).toEqual(amt(0));
  });

  it("treats non-numeric amounts as zero", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", "bad"),
            makeTx("OUTFLOW", "External", 100),
          ],
        },
      ],
    });
    expect(result).toEqual(amt(100));
  });

  it("only counts USD stablecoins (USDS, USDC, DAI)", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", 500, "USDS"), // counted
            makeTx("OUTFLOW", "External", 200, "USDC"), // counted
            makeTx("OUTFLOW", "External", 100, "DAI"), // counted
            makeTx("OUTFLOW", "External", 1.5, "ETH"), // excluded: not stablecoin
            makeTx("OUTFLOW", "External", 9999, "sUSDS"), // excluded: not stablecoin
            makeTx("OUTFLOW", "External", 5000, "SKY"), // excluded: not stablecoin
            makeTx("OUTFLOW", "External", 134, "MKR"), // excluded: not stablecoin
            makeTx("OUTFLOW", "External", 46, "EURe"), // excluded: not stablecoin
          ],
        },
      ],
    });
    expect(result).toEqual(amt(800));
  });

  it("excludes Swap even for stablecoin tokens", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", 100, "USDS"),
            makeTx("OUTFLOW", "Swap", 2000, "USDC"), // excluded: swap
            makeTx("OUTFLOW", "External", 50, "DAI"),
          ],
        },
      ],
    });
    expect(result).toEqual(amt(150));
  });

  it("ignores INFLOW of any token on Internal accounts", () => {
    const result = computeNetExpenseTxns({
      accounts: [
        {
          type: "Internal",
          transactions: [
            makeTx("OUTFLOW", "External", 100, "USDS"),
            makeTx("INFLOW", "TopUp", 5000, "ETH"), // ignored: inflow
          ],
        },
      ],
    });
    expect(result).toEqual(amt(100));
  });
});
