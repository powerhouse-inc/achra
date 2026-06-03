// Simple in-memory cache for exchange rates
const exchangeRateCache: Record<string, number> = {};

/**
 * Fetches the exchange rate from `from` currency to `to` currency for a given date using Frankfurter API.
 * Returns 1 for unsupported currencies or errors.
 */
async function getExchangeRate(
  date: string,
  from: string,
  to: string,
): Promise<number> {
  if (!date || !from || !to || from === to) return 1;

  // Convert crypto currencies to USD for API compatibility
  let effectiveFrom = from;
  if (from === "DAI" || from === "USDS") {
    effectiveFrom = "USD";
  }

  let effectiveTo = to;
  if (to === "DAI" || to === "USDS") {
    effectiveTo = "USD";
  }

  const formattedDate = date.split("T")[0];
  const cacheKey = `${formattedDate}|${effectiveFrom}|${effectiveTo}`;
  if (exchangeRateCache[cacheKey] !== undefined) {
    return exchangeRateCache[cacheKey];
  }

  try {
    const url = `https://api.frankfurter.dev/v1/${formattedDate}?base=${effectiveFrom}&symbols=${effectiveTo}`;
    console.log("Fetching from Frankfurter URL:", url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch Frankfurter exchange rate: ${res.status} ${res.statusText}`,
      );
    }
    const data = await res.json();
    const rate = data?.rates?.[effectiveTo];
    if (typeof rate !== "number") {
      throw new Error(
        `Frankfurter exchange rate for ${effectiveFrom} to ${effectiveTo} on ${formattedDate} not found in response`,
      );
    }
    exchangeRateCache[cacheKey] = rate;
    return rate;
  } catch (err) {
    console.error("Frankfurter ForEx API error:", err);
    return 1; // Fallback to 1:1 on error
  }
}

/**
 * Creates an expense report CSV that categorizes line items by their tags
 */
export async function exportExpenseReportCSV(
  invoiceStates: any[],
  baseCurrency: string,
): Promise<void> {
  // Track invoices missing tags
  const missingTagInvoices: string[] = [];

  // Data structure to aggregate expenses by tag label
  const expensesByTag: Record<string, number> = {};

  // Process each selected invoice
  for (const invoiceState of invoiceStates) {
    const state = invoiceState.state.global;
    const invoiceId = invoiceState.header.id;
    const invoiceName = state.name || invoiceId;
    const items = state.lineItems || [];
    const dateIssued = state.dateIssued;
    const currency = state.currency || "USD";

    // Check if any line item is missing tags
    const hasMissingTags = items.some((item: any) => {
      return !item.lineItemTag || item.lineItemTag.length === 0;
    });

    if (hasMissingTags) {
      missingTagInvoices.push(invoiceName);
      continue; // Skip this invoice
    }

    // Get exchange rate for this invoice
    let effectiveCurrency = currency;
    if (currency === "DAI" || currency === "USDS") {
      effectiveCurrency = "USD";
    }

    const exchangeRate = await getExchangeRate(
      dateIssued,
      effectiveCurrency,
      baseCurrency,
    );

    // Aggregate line items by tag
    items.forEach((item: any) => {
      const lineItemTags = item.lineItemTag || [];
      const lineItemTotal = item.totalPriceTaxIncl || 0;
      const convertedAmount = lineItemTotal * exchangeRate;

      lineItemTags.forEach((tag: any) => {
        const dimension = tag.dimension || "";
        const label = tag.label || tag.value || "Unknown";

        // Skip accounting-period dimension
        if (dimension === "accounting-period") {
          return;
        }

        // Aggregate by tag label in base currency
        if (!expensesByTag[label]) {
          expensesByTag[label] = 0;
        }
        expensesByTag[label] += convertedAmount;
      });
    });
  }

  // If any invoices are missing tags, throw an error
  if (missingTagInvoices.length > 0) {
    const err = new Error(
      `The following invoices have line items missing tags: ${[...new Set(missingTagInvoices)].join(", ")}`,
    );
    (err as Error & { missingTagInvoices: string[] }).missingTagInvoices =
      missingTagInvoices;
    throw err;
  }

  // Create CSV headers
  const headers = ["Tag Label", "Currency", "Total Amount"];

  // Convert aggregated data to rows
  const expenseRows = Object.entries(expensesByTag)
    .sort(([labelA], [labelB]) => labelA.localeCompare(labelB))
    .map(([label, total]) => [label, baseCurrency, total.toFixed(2)]);

  // Combine headers and data rows
  const allRows = [headers, ...expenseRows];

  // Convert to CSV format
  const csvLines = allRows.map((row) =>
    row.map((value) => `"${value}"`).join(","),
  );
  const csvData = csvLines.join("\n");

  // Download CSV file (browser)
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `expense-report-by-tag-${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
