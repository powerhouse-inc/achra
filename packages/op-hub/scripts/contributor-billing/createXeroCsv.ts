// Simple in-memory cache: { '2024-06-10|USD|CHF': 0.91 }
const exchangeRateCache: Record<string, number> = {};

/**
 * Fetches the exchange rate from `from` currency to `to` currency for a given date using Frankfurter API.
 * Returns 1 for unsupported currencies or errors.
 * See: https://frankfurter.dev/
 */
export async function getExchangeRate(
  date: string,
  from: string,
  to: string,
): Promise<number> {
  if (!date || !from || !to || from === to) return 1;

  // Use the invoice currency as base, CHF as symbol
  let effectiveTo = from;
  if (from === "DAI" || from === "USDS") {
    effectiveTo = "USD";
  }

  const formattedDate = date.split("T")[0];
  const cacheKey = `${formattedDate}|${effectiveTo}|${to}`;
  if (exchangeRateCache[cacheKey] !== undefined) {
    return exchangeRateCache[cacheKey];
  }

  try {
    // base=effectiveTo (invoice currency), symbols=CHF
    const url = `https://api.frankfurter.dev/v1/${formattedDate}?base=${effectiveTo}&symbols=${to}`;
    console.log("Fetching from Frankfurter URL:", url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch Frankfurter exchange rate: ${res.status} ${res.statusText}`,
      );
    }
    const data = await res.json();
    const rate = data?.rates?.[to];
    if (typeof rate !== "number") {
      throw new Error(
        `Frankfurter exchange rate for ${effectiveTo} to CHF on ${formattedDate} not found in response`,
      );
    }
    exchangeRateCache[cacheKey] = rate;
    return rate;
  } catch (err) {
    console.error("Frankfurter ForEx API error:", err);
    return 1; // Fallback to 1:1 on error
  }
}

export async function exportInvoicesToXeroCSV(
  invoiceStates: any[],
  baseCurrency: string,
): Promise<any> {
  const headers = [
    "Narration",
    "Date",
    "Description",
    "AccountCode",
    "TaxRate",
    "Amount",
    "TrackingName1",
    "TrackingOption1",
    "TrackingName2",
    "TrackingOption2",
    "Invoice currency",
    "FX Rate Used",
  ];

  const allRows: string[][] = [];
  const exportDataByInvoice: Record<
    string,
    { timestamp: string; exportedLineItems: string[][] }
  > = {};
  const exportTimestamp = new Date().toISOString();
  const missingExpenseTagInvoices: string[] = [];
  const missingDateIssuedInvoices: string[] = [];

  for (const invoiceState of invoiceStates) {
    const state = invoiceState.state.global;
    const invoiceId = invoiceState.header.id;
    const invoiceName = state.name || invoiceId;
    const items = state.lineItems || [];
    const dateIssued = state.dateIssued;
    let datePaid = state.paymentDate || "";
    if (datePaid.includes("T")) {
      datePaid = datePaid.split("T")[0];
    }
    const narration = `${state.issuer?.name || "Supplier"}, invoice ${state.invoiceNo || ""}`;
    const currency = state.currency || "USD";
    const invoiceAmount = Number(state.totalPriceTaxIncl || 0);

    let effectiveCurrency = currency;
    if (currency === "DAI" || currency === "USDS") {
      effectiveCurrency = "USD";
    }

    if (!dateIssued) {
      missingDateIssuedInvoices.push(invoiceName);
      continue;
    }

    // Check if any line item is missing a valid xero-expense-account tag
    const hasMissingExpenseTag = items.some((item: any) => {
      const expenseTag = (item.lineItemTag || []).find(
        (tag: any) => tag.dimension === "xero-expense-account",
      );
      return !expenseTag || !expenseTag.label;
    });

    if (hasMissingExpenseTag) {
      missingExpenseTagInvoices.push(invoiceName);
      continue; // Skip this invoice entirely
    }

    // Fetch exchange rates
    const [
      rateOnIssue,
      //rateOnPayment
    ] = await Promise.all([
      getExchangeRate(dateIssued, effectiveCurrency, baseCurrency),
      //getExchangeRate(datePaid, effectiveCurrency, 'CHF')
    ]);

    const amountAtIssue = invoiceAmount * rateOnIssue;
    //const amountAtPayment = invoiceAmount * rateOnPayment;
    //const realisedGain = amountAtPayment - amountAtIssue;

    // Collect rows for this invoice
    const invoiceRows: string[][] = [];

    // --- ISSUE DATE JOURNALS ---
    if (amountAtIssue) {
      invoiceRows.push([
        narration,
        dateIssued,
        "Accounts Payable",
        "802",
        "Tax Exempt (0%)",
        `-${amountAtIssue.toFixed(2)}`,
        "",
        "",
        "",
        "",
        currency,
        rateOnIssue.toString(),
      ]);
    }
    items.forEach((item: any) => {
      const expenseTag = (item.lineItemTag || []).find(
        (tag: any) => tag.dimension === "xero-expense-account",
      );
      const description = expenseTag.label;
      const accountCode =
        expenseTag.value?.toString() || item.accountCode?.toString() || "";
      const taxRate = "Tax Exempt (0%)";
      const itemAmount = (item.totalPriceTaxIncl || 0) * rateOnIssue;
      invoiceRows.push([
        narration,
        dateIssued,
        description,
        accountCode,
        taxRate,
        itemAmount.toFixed(2),
        "",
        "",
        "",
        "",
        currency,
        rateOnIssue.toString(),
      ]);
    });

    // --- PAYMENT DATE JOURNALS (commented out) ---
    /*
    if (datePaid && amountAtPayment) {
      // Accounts Payable (positive, at payment date)
      rows.push([
        narration,
        datePaid,
        'Accounts Payable',
        '802',
        'Tax Exempt (0%)',
        amountAtIssue.toFixed(2),
        '', '', state.txnHash || '', '',
        currency,
        rateOnPayment.toString()
      ]);
      // Wallet DAI (negative, at payment date)
      rows.push([
        narration,
        datePaid,
        'Wallet DAI',
        '',
        'Tax Exempt (0%)',
        -amountAtPayment.toFixed(2),
        '', '', state.txnHash || '', '',
        currency,
        rateOnPayment.toString()
      ]);
      // Realised Currency Gains (if any, at payment date)
      if (Math.abs(realisedGain) > 0.01) {
        rows.push([
          narration,
          datePaid,
          'Realised Currency Gains',
          '499',
          'Tax Exempt (0%)',
          realisedGain.toFixed(2),
          '', '', state.txnHash || '', '',
          currency,
          rateOnPayment.toString()
        ]);
      }
    }
    */

    // Add to allRows for CSV download
    allRows.push(...invoiceRows);

    // Store export data for this invoice
    exportDataByInvoice[invoiceId] = {
      timestamp: exportTimestamp,
      exportedLineItems: [headers, ...invoiceRows],
    };
  }

  // If any invoices are missing expense tags, throw an error
  if (missingExpenseTagInvoices.length > 0) {
    const err = new Error(
      `The following invoices have line items missing a 'xero-expense-account' tag: ${[...new Set(missingExpenseTagInvoices)].join(", ")}`,
    );
    (
      err as Error & { missingExpenseTagInvoices: string[] }
    ).missingExpenseTagInvoices = missingExpenseTagInvoices;
    throw err;
  }

  if (missingDateIssuedInvoices.length > 0) {
    throw new Error(
      `The following invoices are missing a 'dateIssued' value: ${[...new Set(missingDateIssuedInvoices)].join(", ")}`,
    );
  }

  // Download CSV for all invoices
  const csvLines = [headers.join(",")].concat(
    allRows.map((row) => row.map((value) => `"${value}"`).join(",")),
  );
  const csvData = csvLines.join("\n");

  // Download logic (browser)
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `xero-invoice-export-${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // This is the data to be added to ExportData in the state of each invoice
  // console.log(exportDataByInvoice)

  // Return or assign exportDataByInvoice as needed
  // For example, return it if you want to use it elsewhere:
  return exportDataByInvoice;
}
