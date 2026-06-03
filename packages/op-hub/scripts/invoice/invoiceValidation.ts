/**
 * Validation utilities for LLM-extracted invoice data.
 *
 * Two layers:
 *   1. Format validation (regex / checksum) — catches malformed values
 *   2. Verbatim grounding — checks the value appears in the raw PDF text,
 *      catching cases where the LLM hallucinated or transposed characters
 */
import { getAddress, isAddress } from "ethers";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface FieldValidation {
  valid: boolean;
  reason?: string;
  normalized?: string;
  groundedInPdf?: boolean;
}

/**
 * Validate an EVM wallet address.
 * - Whitespace is stripped before checking (LLM occasionally inserts spaces).
 * - EIP-55 mixed-case checksum is enforced via ethers `getAddress`.
 * - Returns the canonical (checksummed) form when valid.
 */
export function validateEthAddress(value: unknown): FieldValidation {
  if (typeof value !== "string" || value.trim() === "") {
    return { valid: false, reason: "empty" };
  }
  const stripped = value.replace(/\s+/g, "");
  if (!/^0x[a-fA-F0-9]{40}$/.test(stripped)) {
    return { valid: false, reason: "format", normalized: stripped };
  }
  try {
    const checksummed = getAddress(stripped);
    return { valid: true, normalized: checksummed };
  } catch {
    if (isAddress(stripped.toLowerCase())) {
      return { valid: true, normalized: stripped.toLowerCase() };
    }
    return { valid: false, reason: "checksum", normalized: stripped };
  }
}

/**
 * Validate an IBAN. Accepts spaced or contiguous forms.
 */
export function validateIban(value: unknown): FieldValidation {
  if (typeof value !== "string" || value.trim() === "") {
    return { valid: false, reason: "empty" };
  }
  const normalized = value.replace(/\s+/g, "").toUpperCase();
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;
  if (!ibanRegex.test(normalized)) {
    return { valid: false, reason: "format", normalized };
  }
  return { valid: true, normalized };
}

/**
 * Check whether `value` appears verbatim in `rawText` after collapsing
 * whitespace and lowercasing both sides. Lets us catch silent transcription
 * drift: if the model returned an address that doesn't appear in the source
 * text at all, something is wrong.
 *
 * Returns `null` when rawText is empty (no grounding available — undetermined).
 */
export function verifyVerbatim(
  value: string | null | undefined,
  rawText: string,
): boolean | null {
  if (!rawText || rawText.trim() === "") return null;
  if (typeof value !== "string" || value.trim() === "") return null;
  const normalize = (s: string) => s.replace(/\s+/g, "").toLowerCase();
  return normalize(rawText).includes(normalize(value));
}

export interface ValidationReport {
  warnings: string[];
  invalidFields: string[];
  fields: Record<string, FieldValidation>;
}

/**
 * Validates the high-stakes fields of an extracted invoice and grounds them
 * against the raw PDF text when available. The keys in `fields` are
 * dot-paths into the invoice object so they can be surfaced to the UI.
 */
/**
 * Minimal structural type for the Claude-extracted invoice. We only declare
 * the high-stakes paths this validator inspects — everything else is opaque
 * and stays in `Record<string, unknown>`. Avoids `any` while not duplicating
 * the full invoice schema.
 */
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

interface PartyForValidation {
  name?: Json;
  paymentRouting?: {
    bank?: {
      accountNum?: Json;
      beneficiary?: Json;
    } & Record<string, Json>;
    wallet?: {
      address?: Json;
    } & Record<string, Json>;
  } & Record<string, Json>;
}

interface ExtractedInvoiceForValidation {
  issuer?: PartyForValidation & Record<string, Json>;
  payer?: PartyForValidation & Record<string, Json>;
  [k: string]: Json | PartyForValidation | undefined;
}

function getPath(data: ExtractedInvoiceForValidation, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, k) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[k]
          : undefined,
      data,
    );
}

export function validateExtractedInvoice(
  invoiceData: ExtractedInvoiceForValidation,
  rawText: string,
): ValidationReport {
  const fields: Record<string, FieldValidation> = {};
  const warnings: string[] = [];
  const invalidFields: string[] = [];

  const check = (
    path: string,
    validation: FieldValidation,
    originalValue: unknown,
  ) => {
    if (typeof originalValue === "string" && originalValue.trim() !== "") {
      const grounded = verifyVerbatim(originalValue, rawText);
      if (grounded !== null) validation.groundedInPdf = grounded;
      if (grounded === false) {
        validation.valid = false;
        validation.reason = validation.reason
          ? `${validation.reason}; not_in_pdf`
          : "not_in_pdf";
      }
    }
    fields[path] = validation;
    if (!validation.valid) {
      invalidFields.push(path);
      warnings.push(
        `Field "${path}" failed validation (${validation.reason ?? "unknown"})`,
      );
    }
  };

  const issuerWallet = invoiceData.issuer?.paymentRouting?.wallet?.address;
  if (typeof issuerWallet === "string" && issuerWallet) {
    check(
      "issuer.paymentRouting.wallet.address",
      validateEthAddress(issuerWallet),
      issuerWallet,
    );
  }
  const payerWallet = invoiceData.payer?.paymentRouting?.wallet?.address;
  if (typeof payerWallet === "string" && payerWallet) {
    check(
      "payer.paymentRouting.wallet.address",
      validateEthAddress(payerWallet),
      payerWallet,
    );
  }

  const issuerIban = invoiceData.issuer?.paymentRouting?.bank?.accountNum;
  if (
    typeof issuerIban === "string" &&
    /^[A-Z]{2}/i.test(issuerIban.replace(/\s+/g, ""))
  ) {
    check(
      "issuer.paymentRouting.bank.accountNum",
      validateIban(issuerIban),
      issuerIban,
    );
  }

  // Ground (but don't format-validate) name fields — used to surface
  // potentially swapped issuer/payer to the user.
  for (const path of [
    "issuer.name",
    "payer.name",
    "issuer.paymentRouting.bank.beneficiary",
  ]) {
    const value = getPath(invoiceData, path);
    if (typeof value === "string" && value.trim() !== "") {
      const grounded = verifyVerbatim(value, rawText);
      if (grounded !== null) {
        fields[path] = { valid: grounded, groundedInPdf: grounded };
        if (!grounded) {
          warnings.push(`Field "${path}" not found verbatim in PDF text`);
        }
      }
    }
  }

  return { warnings, invalidFields, fields };
}
