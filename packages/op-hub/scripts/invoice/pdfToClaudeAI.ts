import { generateId } from "document-model";
import { autoTagLineItems } from "./autoTagging.js";
import { extractPdfText } from "./extractPdfText.js";
import {
  validateExtractedInvoice,
  type ValidationReport,
} from "./invoiceValidation.js";

/**
 * Attempts to repair truncated JSON by closing unclosed brackets and braces.
 * This handles cases where Claude's response gets cut off due to max_tokens.
 */
function repairTruncatedJson(jsonString: string): string {
  let repaired = jsonString.trim();

  // Find the last complete JSON element (object or value in array)
  // We need to truncate at the last complete element before adding closing brackets
  repaired = truncateToLastCompleteElement(repaired);

  // Count unclosed brackets and braces
  let openBraces = 0;
  let openBrackets = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < repaired.length; i++) {
    const char = repaired[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === "{") openBraces++;
      else if (char === "}") openBraces--;
      else if (char === "[") openBrackets++;
      else if (char === "]") openBrackets--;
    }
  }

  // Close any unclosed arrays and objects
  // Close arrays first (they're usually inside objects)
  while (openBrackets > 0) {
    repaired += "]";
    openBrackets--;
  }

  // Then close objects
  while (openBraces > 0) {
    repaired += "}";
    openBraces--;
  }

  return repaired;
}

/**
 * Truncates JSON string to the last complete element.
 * Handles cases where truncation occurs mid-string, mid-object, or mid-array.
 */
function truncateToLastCompleteElement(json: string): string {
  // Find the last closing brace or bracket that represents a complete element
  // We scan backwards to find the last complete object "}" or complete array element

  let depth = 0;
  let inString = false;
  let lastCompleteObjectEnd = -1;

  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    const prevChar = i > 0 ? json[i - 1] : "";

    // Handle escape sequences
    if (char === '"' && prevChar !== "\\") {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === "{" || char === "[") {
      depth++;
    } else if (char === "}" || char === "]") {
      depth--;
      // Track the position after closing braces at depth 1 (inside the lineItems array)
      // or after any closing brace that's followed by a comma or end
      if (char === "}") {
        lastCompleteObjectEnd = i + 1;
      }
    }
  }

  // If we found a complete object, check if there's incomplete content after it
  if (lastCompleteObjectEnd > 0 && lastCompleteObjectEnd < json.length) {
    const remainder = json.substring(lastCompleteObjectEnd).trim();

    // If what's left starts with a comma and then has incomplete content,
    // we should truncate there
    if (remainder.startsWith(",")) {
      const afterComma = remainder.substring(1).trim();
      // Check if the content after the comma is incomplete (starts with { but doesn't close)
      if (afterComma.startsWith("{") || afterComma.startsWith('"')) {
        // Check if this new element is complete
        let testDepth = 0;
        let testInString = false;
        let isComplete = false;

        for (let i = 0; i < afterComma.length; i++) {
          const char = afterComma[i];
          const prevChar = i > 0 ? afterComma[i - 1] : "";

          if (char === '"' && prevChar !== "\\") {
            testInString = !testInString;
            continue;
          }

          if (testInString) continue;

          if (char === "{" || char === "[") testDepth++;
          else if (char === "}" || char === "]") {
            testDepth--;
            if (testDepth === 0 && char === "}") {
              isComplete = true;
              break;
            }
          }
        }

        // If the element after the comma is incomplete, truncate before the comma
        if (!isComplete) {
          return json.substring(0, lastCompleteObjectEnd);
        }
      }
    }
  }

  // Alternative approach: find the last complete line item by looking for the pattern
  // "},\n    {" and ensure the last one is complete
  const lineItemPattern = /\},\s*\{[^}]*$/;
  const match = json.match(lineItemPattern);

  if (match && match.index !== undefined) {
    // There's an incomplete line item at the end
    // Truncate just before the comma that starts the incomplete item
    const truncateAt = match.index + 1; // Keep the closing }
    return json.substring(0, truncateAt);
  }

  // Check if we're in the middle of a string value
  // Count quotes to see if we're inside a string
  let quoteCount = 0;
  for (let i = 0; i < json.length; i++) {
    if (json[i] === '"' && (i === 0 || json[i - 1] !== "\\")) {
      quoteCount++;
    }
  }

  // If odd number of quotes, we're inside a string - find and remove the incomplete part
  if (quoteCount % 2 === 1) {
    // Find the last property that started (look for last '": ' or '":')
    const lastPropStart = Math.max(
      json.lastIndexOf('": "'),
      json.lastIndexOf('":"'),
    );

    if (lastPropStart > 0) {
      // Find the comma or opening brace before this property
      let searchFrom = lastPropStart;

      while (
        searchFrom > 0 &&
        json[searchFrom] !== "," &&
        json[searchFrom] !== "{"
      ) {
        searchFrom--;
      }

      if (json[searchFrom] === ",") {
        // Remove the incomplete property by truncating at the comma
        return json.substring(0, searchFrom);
      }
    }
  }

  return json;
}

/**
 * Primary extraction prompt.
 *
 * Anchors that matter most for trust:
 *   - Wallet addresses & IBANs must be copied verbatim, character by character
 *   - Issuer = party RECEIVING payment (owner of destination bank/wallet)
 *   - Payer  = party SENDING payment
 *   - Return null when unsure; never guess
 *   - Provide a `_confidence` block for high-stakes fields
 */
const EXTRACTION_PROMPT = `
You are extracting structured data from an invoice PDF. Accuracy on identity, addresses, and payment routing is critical — these values move money. Follow these rules without exception:

RULE 1 — VERBATIM TRANSCRIPTION (HIGHEST PRIORITY)
The following fields must be copied character-by-character exactly as they appear in the PDF text. Do NOT normalize case, insert spaces, remove dashes, or "correct" anything:
  • Crypto wallet addresses (must be exactly 42 characters: \`0x\` prefix + 40 hex chars, no whitespace)
  • IBAN / account numbers
  • ABA / SWIFT / BIC codes
  • Tax IDs
If you cannot transcribe one of these values with 100% confidence, return null for it. Do not guess. Do not infer.

RULE 2 — ISSUER vs PAYER (semantic anchor, not label-matching)
  • The "issuer" is the party RECEIVING payment — the owner of the bank account or wallet that money is being sent to. This is the supplier, vendor, contractor, or freelancer.
  • The "payer" is the party SENDING payment — the customer, client, or buyer.
Invoices use inconsistent labels ("From"/"To", "Bill To"/"Sold By", "Customer"/"Supplier"). Do NOT rely on labels. Use this rule: whichever party's bank/wallet appears in the payment instructions is the issuer. If only one party has payment routing visible, that party is the issuer.
If you cannot determine which is which with high confidence, set both to null.

RULE 3 — NULL OVER GUESS
For every field below, return null if the value is not clearly visible in the PDF. Empty string is not acceptable for unknown fields.

RULE 4 — NUMBERS
Preserve numbers exactly as written. Do not round, recompute, or convert currencies.

OUTPUT FORMAT
Return a single JSON object. Do not wrap in markdown. Do not include commentary.

{
  "status": "DRAFT|ISSUED|CANCELLED|ACCEPTED|REJECTED|PAYMENTSCHEDULED|PAYMENTSENT|PAYMENTISSUE|PAYMENTRECEIVED|PAYMENTCLOSED",
  "invoiceNo": "...",
  "dateIssued": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "dateDue": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "dateDelivered": "YYYY-MM-DDTHH:mm:ss.sssZ",
  "currency": "USD|EUR|DAI|USDC|...",
  "notes": "...",
  "payAfter": "ISO date",
  "invoiceTags": [{ "dimension": "...", "value": "...", "label": "..." }],

  "issuer": {
    "name": "supplier/vendor — the party receiving payment",
    "address": {
      "streetAddress": "...", "extendedAddress": "...",
      "city": "...", "postalCode": "...", "stateProvince": "...", "country": "..."
    },
    "contactInfo": { "email": "...", "tel": "..." },
    "country": "...",
    "id": { "taxId": "..." },
    "paymentRouting": {
      "bank": {
        "name": "...", "accountNum": "verbatim IBAN/account",
        "ABA": "verbatim", "BIC": "verbatim", "SWIFT": "verbatim",
        "accountType": "CHECKING|SAVINGS",
        "beneficiary": "...", "memo": "...",
        "address": { "streetAddress": "...", "city": "...", "stateProvince": "...", "postalCode": "...", "country": "...", "extendedAddress": "..." },
        "intermediaryBank": { "name": "...", "address": "...", "ABA": "...", "BIC": "...", "SWIFT": "...", "accountNum": "...", "accountType": "...", "beneficiary": "...", "memo": "..." }
      },
      "wallet": {
        "address": "VERBATIM 0x... wallet address, exactly 42 chars",
        "chainId": "...",
        "chainName": "Base|Ethereum|Polygon|...",
        "rpc": "..."
      }
    }
  },

  "payer": {
    "name": "client/customer — the party sending payment",
    "address": { "streetAddress": "...", "extendedAddress": "...", "city": "...", "postalCode": "...", "stateProvince": "...", "country": "..." },
    "contactInfo": { "email": "...", "tel": "..." },
    "country": "...",
    "id": { "taxId": "..." },
    "paymentRouting": {
      "bank": { "name": "...", "accountNum": "...", "ABA": "...", "BIC": "...", "SWIFT": "...", "accountType": "...", "beneficiary": "...", "memo": "..." },
      "wallet": { "address": "...", "chainId": "...", "chainName": "...", "rpc": "..." }
    }
  },

  "lineItems": [
    {
      "description": "...",
      "quantity": <number>, "unitPriceTaxExcl": <number>, "unitPriceTaxIncl": <number>,
      "totalPriceTaxExcl": <number>, "totalPriceTaxIncl": <number>,
      "taxPercent": <number>, "currency": "...",
      "lineItemTag": [{ "dimension": "...", "value": "...", "label": "..." }]
    }
  ],
  "totalPriceTaxExcl": <number>,
  "totalPriceTaxIncl": <number>,
  "rejections": [{ "reason": "...", "final": <boolean> }],
  "payments": [{ "processorRef": "...", "paymentDate": "...", "txnRef": "...", "confirmed": <boolean>, "issue": "...", "amount": <number> }],
  "exported": { "timestamp": "...", "exportedLineItems": [["..."]] },
  "closureReason": "UNDERPAID|OVERPAID|CANCELLED",

  "_confidence": {
    "issuer.name": { "level": "high|medium|low", "evidence": "verbatim PDF snippet showing this" },
    "payer.name": { "level": "high|medium|low", "evidence": "..." },
    "issuer.paymentRouting.wallet.address": { "level": "high|medium|low", "evidence": "..." },
    "payer.paymentRouting.wallet.address": { "level": "high|medium|low", "evidence": "..." },
    "issuer.paymentRouting.bank.accountNum": { "level": "high|medium|low", "evidence": "..." },
    "totalPriceTaxIncl": { "level": "high|medium|low", "evidence": "..." }
  }
}

For every key in _confidence, set level=low whenever the field is null OR you had to interpret a label rather than copy a value. Set evidence to the literal PDF text you copied from (or null if the field was not present).

You MUST output a single valid, complete JSON object. Do not truncate. Do not include line items beyond what fits — better to omit later items than to ship malformed JSON.
`.trim();

interface ClaudeCallResult {
  rawJson: any;
  truncated: boolean;
}

async function callClaude(
  base64Pdf: string,
  apiKey: string,
  extraSystemMessage?: string,
): Promise<ClaudeCallResult> {
  const userContent: any[] = [];

  if (extraSystemMessage) {
    userContent.push({ type: "text", text: extraSystemMessage });
  }
  userContent.push({ type: "text", text: EXTRACTION_PROMPT });
  userContent.push({
    type: "document",
    source: {
      type: "base64",
      media_type: "application/pdf",
      data: base64Pdf,
    },
  });

  const requestBody = {
    model: "claude-haiku-4-5-20251001",
    max_tokens: 32000,
    messages: [{ role: "user", content: userContent }],
  };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  const stopReason = result.stop_reason;
  const truncated = stopReason === "max_tokens";

  const responseText = result.content[0]?.text;
  if (!responseText) {
    throw new Error("No response text from Claude API");
  }

  // Try to extract JSON from the response
  let invoiceData;
  try {
    const jsonMatch =
      responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
      responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      let jsonString = jsonMatch[1] || jsonMatch[0];
      jsonString = repairTruncatedJson(jsonString);
      invoiceData = JSON.parse(jsonString);
    } else {
      invoiceData = JSON.parse(responseText);
    }
  } catch (parseError) {
    console.error("Failed to parse Claude response as JSON:", parseError);
    const jsonMatch = responseText.match(/\{[\s\S]*/);
    if (jsonMatch) {
      const repairedJson = repairTruncatedJson(jsonMatch[0]);
      invoiceData = JSON.parse(repairedJson);
    } else {
      throw new Error("Failed to parse Claude response as valid JSON");
    }
  }

  return { rawJson: invoiceData, truncated };
}

/**
 * Builds the corrective prompt used on the re-extraction pass when
 * format validation or PDF grounding fails for high-stakes fields.
 */
function buildCorrectivePrompt(
  invalidFields: string[],
  rawText: string,
): string {
  const truncatedText =
    rawText.length > 8000 ? rawText.slice(0, 8000) + "\n…[truncated]" : rawText;
  return `
Your previous extraction had problems on these fields: ${invalidFields.join(", ")}.

Common causes:
  • You returned a wallet address that doesn't appear verbatim in the PDF (transposed/inserted character or whitespace)
  • You returned an IBAN that fails format checks
  • You confused issuer and payer (remember: issuer = party RECEIVING payment / owner of destination payment routing)

Re-extract the entire invoice. For the listed problem fields, copy values character-by-character from the PDF text below — do NOT re-render or normalize them. If a value cannot be found verbatim in the text, return null.

PDF TEXT (authoritative source — match values from here when possible):
---
${truncatedText}
---
  `.trim();
}

export interface ExtractInvoiceResult {
  invoiceData: any;
  warnings: string[];
  invalidFields: string[];
  confidence: Record<string, { level: string; evidence?: string | null }>;
  groundingAvailable: boolean;
  retried: boolean;
  truncated: boolean;
}

export async function uploadPdfAndGetJsonClaude(
  inputDoc: string,
): Promise<{ invoiceData: any } & Omit<ExtractInvoiceResult, "invoiceData">> {
  console.log("Starting PDF upload and processing with Claude AI");

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY environment variable is not set");
  }

  // Pull the raw text layer in parallel with the Claude call — used for
  // grounding and (if needed) the corrective re-prompt. Empty string on
  // failure / scanned PDFs; validation degrades gracefully.
  const rawTextPromise = extractPdfText(inputDoc);

  console.log("Sending request to Claude API...");
  const [{ rawJson, truncated }, rawText] = await Promise.all([
    callClaude(inputDoc, apiKey),
    rawTextPromise,
  ]);

  const groundingAvailable = rawText.trim() !== "";
  if (truncated) {
    console.warn(
      "Warning: Claude response was truncated due to max_tokens limit",
    );
  }

  // First validation pass against the raw text
  let validation: ValidationReport = validateExtractedInvoice(rawJson, rawText);
  let finalRaw = rawJson;
  let retried = false;

  // Re-prompt once if any high-stakes field failed AND we have text to ground against.
  // Without grounding the re-prompt has nothing to anchor on, so we skip it.
  if (validation.invalidFields.length > 0 && groundingAvailable) {
    console.log(
      `Validation failed on ${validation.invalidFields.length} field(s); doing corrective re-extraction…`,
    );
    try {
      const corrective = buildCorrectivePrompt(
        validation.invalidFields,
        rawText,
      );
      const second = await callClaude(inputDoc, apiKey, corrective);
      const secondValidation = validateExtractedInvoice(
        second.rawJson,
        rawText,
      );
      // Only accept the retry if it improved things — otherwise we'd risk
      // overwriting a mostly-good first extraction with a worse one.
      if (
        secondValidation.invalidFields.length < validation.invalidFields.length
      ) {
        finalRaw = second.rawJson;
        validation = secondValidation;
        retried = true;
        console.log(
          "Corrective re-extraction improved validation; using retry result.",
        );
      } else {
        console.log(
          "Corrective re-extraction did not improve results; keeping original.",
        );
      }
    } catch (err) {
      console.warn("Corrective re-extraction failed:", err);
    }
  }

  // Merge truncation warning if applicable
  const warnings = [...validation.warnings];
  if (truncated) {
    warnings.unshift(
      "Extraction was truncated by the model's output limit. Some line items may be missing — please review carefully.",
    );
  }
  if (!groundingAvailable) {
    warnings.push(
      "PDF text layer could not be extracted (likely a scanned image). Values could not be cross-checked against the source text — please verify high-value fields by eye.",
    );
  }

  const processedInvoiceData = await processClaudeInvoiceData(finalRaw);
  const confidence = (finalRaw && finalRaw._confidence) || {};

  return {
    invoiceData: processedInvoiceData,
    warnings,
    invalidFields: validation.invalidFields,
    confidence,
    groundingAvailable,
    retried,
    truncated,
  };
}

async function processClaudeInvoiceData(rawData: any) {
  const invoiceData: any = {
    lineItems: [],
    rejections: [],
    payments: [],
    invoiceTags: [],
  };

  // Basic invoice fields
  if (rawData.status) invoiceData.status = rawData.status;
  if (rawData.invoiceNo) invoiceData.invoiceNo = rawData.invoiceNo;
  if (rawData.dateIssued) invoiceData.dateIssued = rawData.dateIssued;
  if (rawData.dateDue) invoiceData.dateDue = rawData.dateDue;
  if (rawData.dateDelivered) invoiceData.dateDelivered = rawData.dateDelivered;
  if (rawData.currency) invoiceData.currency = rawData.currency;
  if (rawData.notes) invoiceData.notes = rawData.notes;
  if (rawData.payAfter) invoiceData.payAfter = rawData.payAfter;
  if (rawData.closureReason) invoiceData.closureReason = rawData.closureReason;
  if (rawData.totalPriceTaxExcl)
    invoiceData.totalPriceTaxExcl = parseFloat(rawData.totalPriceTaxExcl);
  if (rawData.totalPriceTaxIncl)
    invoiceData.totalPriceTaxIncl = parseFloat(rawData.totalPriceTaxIncl);

  // Tags
  if (rawData.invoiceTags && Array.isArray(rawData.invoiceTags)) {
    invoiceData.invoiceTags = rawData.invoiceTags;
  }

  // Exported data
  if (rawData.exported) {
    invoiceData.exported = rawData.exported;
  }

  // Process issuer data
  if (rawData.issuer) {
    invoiceData.issuer = {
      name: rawData.issuer.name || null,
      address: rawData.issuer.address || null,
      contactInfo: rawData.issuer.contactInfo || { email: null, tel: null },
      country: rawData.issuer.address?.country || null,
      id: rawData.issuer.id || null,
      paymentRouting: rawData.issuer.paymentRouting || null,
    };
  }

  // Process payer data
  if (rawData.payer) {
    invoiceData.payer = {
      name: rawData.payer.name || null,
      address: rawData.payer.address || null,
      contactInfo: rawData.payer.contactInfo || { email: null, tel: null },
      country: rawData.payer.address?.country || null,
      id: rawData.payer.id || null,
      paymentRouting: rawData.payer.paymentRouting || null,
    };
  }

  // Process rejections
  if (rawData.rejections && Array.isArray(rawData.rejections)) {
    invoiceData.rejections = rawData.rejections.map((rejection: any) => ({
      id: generateId(),
      reason: rejection.reason || "",
      final: Boolean(rejection.final),
    }));
  }

  // Process payments
  if (rawData.payments && Array.isArray(rawData.payments)) {
    invoiceData.payments = rawData.payments.map((payment: any) => ({
      id: generateId(),
      processorRef: payment.processorRef || null,
      paymentDate: payment.paymentDate || null,
      txnRef: payment.txnRef || null,
      confirmed: Boolean(payment.confirmed),
      issue: payment.issue || null,
      amount: payment.amount ? parseFloat(payment.amount) : null,
    }));
  }

  // Process line items with auto-tagging
  if (rawData.lineItems && Array.isArray(rawData.lineItems)) {
    const processedItems = rawData.lineItems.map((item: any) => ({
      lineItemTag:
        item.lineItemTag && Array.isArray(item.lineItemTag)
          ? item.lineItemTag
          : [],
      description: item.description || "",
      quantity: parseFloat(item.quantity) || 0,
      unitPriceTaxExcl: parseFloat(item.unitPriceTaxExcl) || 0,
      unitPriceTaxIncl:
        parseFloat(item.unitPriceTaxIncl) ||
        parseFloat(item.unitPriceTaxExcl) ||
        0,
      totalPriceTaxExcl: parseFloat(item.totalPriceTaxExcl) || 0,
      totalPriceTaxIncl:
        parseFloat(item.totalPriceTaxIncl) ||
        parseFloat(item.totalPriceTaxExcl) ||
        0,
      currency: item.currency || rawData.currency || "USD",
      id: generateId(),
      taxPercent: parseFloat(item.taxPercent) || 0,
    }));

    // Apply auto-tagging to processed items
    const taggedItems = await autoTagLineItems(processedItems);
    invoiceData.lineItems = taggedItems;
  }

  return invoiceData;
}
