import { type SelectOption } from "@powerhousedao/document-engineering/ui";
import { type InvoiceTag } from "../../../document-models/invoice/v1/gen/types.js";

const billingTagMapping = [
  { fusion: "Budget", xero: "200 - Grants from Maker DAO" },
  { fusion: "Current Asset", xero: "2001 - Clearing Account" },
  { fusion: "Current Liability", xero: "2222 - Request Finance IC account" },
  { fusion: "Interest Income", xero: "270 - Interest Income" },
  { fusion: "Travel & Entertainment", xero: "3000 - Activities and Events" },
  { fusion: "Travel & Entertainment", xero: "3001 - Meals" },
  { fusion: "Travel & Entertainment", xero: "3002 - Airfare" },
  { fusion: "Travel & Entertainment", xero: "3003 - Hotels" },
  {
    fusion: "Travel & Entertainment",
    xero: "3004 - Transportation (Uber, Taxi etc)",
  },
  { fusion: "Travel & Entertainment", xero: "3005 - Other travel cost" },
  { fusion: "Cost of Goods Sold", xero: "310 - Cost of Goods Sold" },
  { fusion: "Marketing Expense", xero: "400 - Advertising" },
  { fusion: "Professional Services", xero: "4001 - Legal Fees Abroad" },
  { fusion: "Professional Services", xero: "4002 - Legal Fees Switzerland" },
  { fusion: "Professional Services", xero: "4003 - Finance Team Fees Abroad" },
  {
    fusion: "Professional Services",
    xero: "4004 - Finance and Accounting Fees Switzerland",
  },
  {
    fusion: "Software Development Expense",
    xero: "4005 - Software Development Team Fees",
  },
  { fusion: "Professional Services", xero: "4006 - Research Team Fees" },
  { fusion: "Marketing Expense", xero: "4007 - Marketing Team Fees" },
  { fusion: "Compensation & Benefits", xero: "4008 - Health Care Fees" },
  { fusion: "Compensation & Benefits", xero: "4009 - Contractor Fees" },
  { fusion: "Compensation & Benefits", xero: "4010 - Insurance Fees Team" },
  { fusion: "Compensation & Benefits", xero: "4011 - HR Fees" },
  { fusion: "Compensation & Benefits", xero: "4012 - Team Bonus" },
  { fusion: "Compensation & Benefits", xero: "4013 - Refferal Fees" },
  { fusion: "Other", xero: "416 - Depreciation" },
  { fusion: "Other", xero: "425 - Freight & Courier" },
  { fusion: "Other", xero: "437 - Interest Expense" },
  { fusion: "Admin Expense", xero: "453 - Office Expenses" },
  { fusion: "Admin Expense", xero: "469 - Rent" },
  { fusion: "Admin Expense", xero: "485 - Subscriptions" },
  {
    fusion: "Other Income Expense (Non-operating)",
    xero: "497 - Bank Revaluations",
  },
  { fusion: "Other Income", xero: "498 - Unrealised Currency Gains" },
  { fusion: "Other Income", xero: "499 - Realised Currency Gains" },
  { fusion: "Income Tax Expense", xero: "505 - Income Tax Expense" },
  { fusion: "Current Asset", xero: "610 - Accounts Receivable" },
  { fusion: "Current Asset", xero: "620 - Prepayments" },
  { fusion: "Current Asset", xero: "630 - Inventory" },
  { fusion: "Software Expense", xero: "701 - Software/IT Subscriptions" },
  { fusion: "Software Expense", xero: "702 - Telephone and Internet Charges" },
  { fusion: "Fixed Asset", xero: "710 - Office Equipment" },
  {
    fusion: "Fixed Asset",
    xero: "711 - Less Accumulated Depreciation on Office Equipment",
  },
  { fusion: "Non-Current Asset", xero: "720 - Computer Equipment" },
  {
    fusion: "Non-Current Asset",
    xero: "721 - Less Accumulated Depreciation on Computer Equipment",
  },
  { fusion: "Current Liability", xero: "800 - Accounts Payable" },
  { fusion: "Other", xero: "8000 - Bank Fees" },
  { fusion: "Gas Expense", xero: "8001 - Gas Fees" },
  { fusion: "Other", xero: "8003 - Exchange Fees" },
  { fusion: "Current Liability", xero: "801 - Unpaid Expense Claims" },
  { fusion: "Current Liability", xero: "802 - Accrued Expenses" },
  { fusion: "Current Liability", xero: "803 - Wages Payable" },
  { fusion: "Current Liability", xero: "825 - Employee Tax Payable" },
  { fusion: "Current Liability", xero: "826 - Superannuation Payable" },
  { fusion: "Current Liability", xero: "830 - Income Tax Payable" },
  { fusion: "Other", xero: "820 - Sales Tax" },
  { fusion: "Adjustment A/C", xero: "840 - Historical Adjustment" },
  { fusion: "Temporary Holding Account", xero: "850 - Suspense" },
  { fusion: "Other", xero: "860 - Rounding" },
  { fusion: "Internal Transfers", xero: "877 - Tracking Transfers" },
  { fusion: "Owner Equity", xero: "880 - Owner A Drawings" },
  { fusion: "Owner Equity", xero: "881 - Owner A Funds Introduced" },
  { fusion: "Non-current Liability", xero: "900 - Loan" },
  { fusion: "Equity", xero: "960 - Retained Earnings" },
  { fusion: "Equity", xero: "970 - Owner A Share Capital" },
];

// Mapping of labels to values
const fusionLabelToValue: Record<string, string> = {
  Budget: "budget",
  "Current Liability": "liabilities/current",
  "Interest Income": "income/interest",
  "Travel & Entertainment": "expenses/headcount/travel-and-entertainment",
  "Cost of Goods Sold": "expenses/non-headcount/direct-costs",
  "Marketing Expense": "expenses/headcount/marketing",
  "Professional Services": "expenses/headcount/professional-services",
  "Software Development Expense": "expenses/non-headcount/software-development",
  "Compensation & Benefits": "expenses/headcount/compensation-and-benefits",
  "Admin Expense": "expenses/headcount/admin",
  "Other Income Expense (Non-operating)": "income/non-operating",
  "Other Income": "income/other",
  "Income Tax Expense": "expenses/non-headcount/income-tax",
  "Current Asset": "assets/current",
  "Software Expense": "expenses/non-headcount/software",
  "Fixed Asset": "assets/fixed",
  "Non-Current Asset": "assets/non-current",
  "Gas Expense": "expenses/non-headcount/gas",
  "Adjustment A/C": "accounts/adjustment",
  "Temporary Holding Account": "accounts/temporary",
  Other: "accounts/other",
  "Internal Transfers": "accounts/internal-transfers",
  "Owner Equity": "equity/owner",
  "Non-current Liability": "liabilities/non-current",
  Equity: "equity/retained",
};

export const expenseAccountOptions: SelectOption[] = Array.from(
  new Set(billingTagMapping.map((tag) => tag.fusion)),
).map((tag) => {
  return {
    label: tag,
    value: fusionLabelToValue[tag] || tag, // Fallback to tag name if no code mapping exists
  };
});

export const budgetOptions: SelectOption[] = [
  { label: "Powerhouse", value: "PH-001" },
  { label: "Jetstream", value: "JTS-001" },
];

export const mapTags = (lineItemTags: InvoiceTag[]) => {
  if (lineItemTags.length === 0) return [];
  const tags = lineItemTags.map((tag) => {
    const mapping = billingTagMapping.find(
      (mapping) => mapping.xero === tag.label,
    );
    const fusionLabel = fusionLabelToValue[mapping?.fusion || ""];
    if (mapping && fusionLabel) {
      return {
        dimension: "expense-account",
        value: fusionLabel,
        label: mapping.fusion,
      };
    }
    if (tag.dimension === "accounting-period") {
      return tag;
    }
  });
  return tags;
};
