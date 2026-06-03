/**
 * Auto-tagging system for invoice line items
 *
 * Automatically assigns Xero expense account tags to line items during PDF processing.
 * Uses a smart hybrid approach: rule-based matching (90% of cases) with Claude AI fallback.
 *
 * Integration: Called from pdfToClaudeAI.ts during PDF upload processing.
 */

export interface TaggingResult {
  tag: {
    dimension: string;
    value: string;
    label: string;
  };
  confidence: number;
  method: "keyword" | "vendor" | "amount" | "claude" | "fallback";
  reason?: string;
}

// Xero expense account options from tagMapping.tsx
const XERO_EXPENSE_ACCOUNTS: Record<string, string> = {
  "2001": "2001 - Clearing Account",
  "2222": "2222 - Request Finance IC account",
  "3000": "3000 - Activities and Events",
  "3001": "3001 - Meals",
  "3002": "3002 - Airfare",
  "3003": "3003 - Hotels",
  "3004": "3004 - Transportation (Uber, Taxi etc)",
  "3005": "3005 - Other travel cost",
  "400": "400 - Advertising",
  "4001": "4001 - Legal Fees Abroad",
  "4002": "4002 - Legal Fees Switzerland",
  "4003": "4003 - Finance Team Fees Abroad",
  "4004": "4004 - Finance and Accounting Fees Switzerland",
  "4005": "4005 - Software Development Team Fees",
  "4006": "4006 - Research Team Fees",
  "4007": "4007 - Marketing Team Fees",
  "4008": "4008 - Health Care Fees",
  "4009": "4009 - Contractor Fees",
  "4010": "4010 - Insurance Fees Team",
  "4011": "4011 - HR Fees",
  "4012": "4012 - Team Bonus",
  "4013": "4013 - Refferal Fees",
  "416": "416 - Depreciation",
  "425": "425 - Freight & Courier",
  "437": "437 - Interest Expense",
  "453": "453 - Office Expenses",
  "469": "469 - Rent",
  "485": "485 - Subscriptions",
  "505": "505 - Income Tax Expense",
  "701": "701 - Software/IT Subscriptions",
  "702": "702 - Telephone and Internet Charges",
  "8000": "8000 - Bank Fees",
  "8001": "8001 - Gas Fees",
  "8003": "8003 - Exchange Fees",
};

// Keyword-based mapping rules (highest confidence)
const KEYWORD_RULES = [
  // Software & Technology
  {
    patterns: [
      "github",
      "gitlab",
      "figma",
      "slack",
      "notion",
      "vercel",
      "netlify",
      "aws",
      "google cloud",
    ],
    account: "701",
    confidence: 0.95,
    reason: "Known software platform",
  },
  {
    patterns: ["software", "saas", "subscription", "api", "hosting", "cloud"],
    account: "701",
    confidence: 0.85,
    reason: "Software/SaaS keywords",
  },
  {
    patterns: ["subscription", "monthly", "annual"],
    account: "485",
    confidence: 0.8,
    reason: "General subscription",
  },

  // Travel & Transportation
  {
    patterns: ["airline", "flight", "airfare", "airport"],
    account: "3002",
    confidence: 0.95,
    reason: "Air travel",
  },
  {
    patterns: [
      "hotel",
      "accommodation",
      "lodging",
      "booking.com",
      "hotels.com",
    ],
    account: "3003",
    confidence: 0.95,
    reason: "Hotel accommodation",
  },
  {
    patterns: ["uber", "lyft", "taxi", "rideshare", "transport"],
    account: "3004",
    confidence: 0.9,
    reason: "Transportation services",
  },
  {
    patterns: ["restaurant", "meal", "food", "catering", "lunch", "dinner"],
    account: "3001",
    confidence: 0.85,
    reason: "Meals & entertainment",
  },
  {
    patterns: ["travel", "trip", "conference"],
    account: "3005",
    confidence: 0.7,
    reason: "General travel",
  },

  // Professional Services
  {
    patterns: ["contractor", "freelancer", "consultant", "consulting"],
    account: "4009",
    confidence: 0.9,
    reason: "Contractor services",
  },
  {
    patterns: ["legal", "attorney", "law", "lawyer"],
    account: "4001",
    confidence: 0.9,
    reason: "Legal services",
  },
  {
    patterns: ["development", "developer", "programming", "coding"],
    account: "4005",
    confidence: 0.85,
    reason: "Software development",
  },

  // Office & Operations
  {
    patterns: ["rent", "lease", "office space", "coworking"],
    account: "469",
    confidence: 0.9,
    reason: "Rent/office space",
  },
  {
    patterns: ["office", "supplies", "equipment", "stationery"],
    account: "453",
    confidence: 0.8,
    reason: "Office expenses",
  },

  // Marketing & Advertising
  {
    patterns: ["advertising", "marketing", "promotion", "campaign", "ads"],
    account: "400",
    confidence: 0.85,
    reason: "Marketing/advertising",
  },

  // Fees & Financial
  {
    patterns: ["bank fee", "transaction fee", "processing fee"],
    account: "8000",
    confidence: 0.9,
    reason: "Bank fees",
  },
  {
    patterns: ["gas fee", "ethereum", "blockchain"],
    account: "8001",
    confidence: 0.95,
    reason: "Blockchain gas fees",
  },
];

// Vendor-specific mapping (very high confidence)
const VENDOR_RULES = [
  // Software platforms
  { vendors: ["github.com", "github"], account: "701", confidence: 0.98 },
  { vendors: ["figma.com", "figma"], account: "701", confidence: 0.98 },
  { vendors: ["slack.com", "slack"], account: "701", confidence: 0.98 },
  { vendors: ["notion.so", "notion"], account: "701", confidence: 0.98 },
  { vendors: ["vercel.com", "vercel"], account: "701", confidence: 0.98 },
  {
    vendors: ["aws.amazon.com", "amazon web services"],
    account: "701",
    confidence: 0.98,
  },

  // Travel
  {
    vendors: ["booking.com", "expedia", "hotels.com"],
    account: "3003",
    confidence: 0.98,
  },
  { vendors: ["uber", "lyft"], account: "3004", confidence: 0.98 },
  {
    vendors: ["delta", "american airlines", "united"],
    account: "3002",
    confidence: 0.98,
  },

  // Professional services
  { vendors: ["upwork", "fiverr"], account: "4009", confidence: 0.95 },
];

// Amount-based rules (lower confidence)
const AMOUNT_RULES = [
  {
    range: { min: 5, max: 50 },
    patterns: ["subscription", "monthly"],
    account: "485",
    confidence: 0.6,
    reason: "Small subscription amount",
  },
  {
    range: { min: 1000, max: 50000 },
    patterns: ["consulting", "development"],
    account: "4009",
    confidence: 0.7,
    reason: "Large professional services amount",
  },
];

/**
 * Main auto-tagging function using smart hybrid approach
 */
export function autoTagLineItem(
  description: string,
  amount: number,
  vendor?: string,
): TaggingResult | null {
  const desc = description.toLowerCase();
  const vendorLower = vendor?.toLowerCase() || "";

  // 1. Try vendor-specific rules first (highest confidence)
  for (const rule of VENDOR_RULES) {
    if (rule.vendors.some((v) => desc.includes(v) || vendorLower.includes(v))) {
      const label = XERO_EXPENSE_ACCOUNTS[rule.account];
      return {
        tag: {
          dimension: "xero-expense-account",
          value: rule.account,
          label: label,
        },
        confidence: rule.confidence,
        method: "vendor",
        reason: `Matched vendor: ${rule.vendors[0]}`,
      };
    }
  }

  // 2. Try keyword-based rules
  for (const rule of KEYWORD_RULES) {
    if (rule.patterns.some((pattern) => desc.includes(pattern))) {
      const label = XERO_EXPENSE_ACCOUNTS[rule.account];
      return {
        tag: {
          dimension: "xero-expense-account",
          value: rule.account,
          label: label,
        },
        confidence: rule.confidence,
        method: "keyword",
        reason: rule.reason,
      };
    }
  }

  // 3. Try amount-based rules
  for (const rule of AMOUNT_RULES) {
    if (amount >= rule.range.min && amount <= rule.range.max) {
      if (rule.patterns.some((pattern) => desc.includes(pattern))) {
        const label = XERO_EXPENSE_ACCOUNTS[rule.account];
        return {
          tag: {
            dimension: "xero-expense-account",
            value: rule.account,
            label: label,
          },
          confidence: rule.confidence,
          method: "amount",
          reason: rule.reason,
        };
      }
    }
  }

  return null;
}

/**
 * Enhanced Claude classification for edge cases
 * Only used when rule-based matching fails
 */
export async function claudeClassifyExpense(
  description: string,
  amount: number,
): Promise<TaggingResult | null> {
  const apiKey =
    typeof process !== "undefined" ? process.env?.CLAUDE_API_KEY : undefined;
  if (!apiKey) {
    return null;
  }

  const prompt = `Classify this business expense into ONE category:

Expense: "${description}" - $${amount}

Categories:
- SOFTWARE: subscriptions, tools, hosting, cloud services
- TRAVEL: flights, hotels, meals, transport, conferences
- CONTRACTOR: freelance, consulting, professional services
- LEGAL: attorney, law services, legal fees
- OFFICE: rent, supplies, utilities, equipment
- MARKETING: advertising, promotion, campaigns
- OTHER: anything that doesn't fit above categories

Respond with ONLY the category name: SOFTWARE|TRAVEL|CONTRACTOR|LEGAL|OFFICE|MARKETING|OTHER`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 10,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const result = await response.json();
    const category = result.content[0]?.text?.trim().toUpperCase();

    // Map category to Xero account
    const categoryMapping: Record<string, string> = {
      SOFTWARE: "701",
      TRAVEL: "3005",
      CONTRACTOR: "4009",
      LEGAL: "4001",
      OFFICE: "453",
      MARKETING: "400",
      OTHER: "453", // Default to office expenses
    };

    const account =
      categoryMapping[category as keyof typeof categoryMapping] || "453";
    const label = XERO_EXPENSE_ACCOUNTS[account];

    return {
      tag: {
        dimension: "xero-expense-account",
        value: account,
        label: label,
      },
      confidence: 0.6, // Lower confidence for Claude classifications
      method: "claude",
      reason: `Claude classified as ${category}`,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Process multiple line items with auto-tagging
 */
export async function autoTagLineItems(lineItems: any[]): Promise<any[]> {
  const results = [];

  for (const item of lineItems) {
    const result = autoTagLineItem(item.description, item.totalPriceTaxIncl);

    if (result && result.confidence >= 0.7) {
      // Use rule-based result
      item.lineItemTag = [result.tag];
      results.push({ ...item, taggingResult: result });
    } else {
      // Try Claude for unclear cases
      const claudeResult = await claudeClassifyExpense(
        item.description,
        item.totalPriceTaxIncl,
      );
      if (claudeResult) {
        item.lineItemTag = [claudeResult.tag];
        results.push({ ...item, taggingResult: claudeResult });
      } else {
        // No tagging applied
        item.lineItemTag = item.lineItemTag || [];
        results.push({ ...item, taggingResult: null });
      }
    }
  }

  return results;
}
