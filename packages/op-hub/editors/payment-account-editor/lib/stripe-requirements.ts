/**
 * Human-friendly presentation of Stripe account requirements. Stripe reports
 * `requirements.currently_due` as raw API field paths (e.g.
 * `business_profile.mcc`, `representative.dob.day`) and
 * `requirements.disabled_reason` as machine codes (e.g.
 * `requirements.past_due`) — never show those to operators directly.
 */

const EXACT_LABELS: Record<string, string> = {
  "business_profile.mcc": "Business category",
  "business_profile.product_description": "Description of what you sell",
  "business_profile.support_phone": "Customer support phone number",
  "business_profile.url": "Business website",
  business_type: "Business type",
  external_account: "Bank account for payouts",
  "settings.payments.statement_descriptor": "Card statement descriptor",
  "tos_acceptance.date": "Stripe terms of service agreement",
  "tos_acceptance.ip": "Stripe terms of service agreement",
};

const OWNER_PREFIXES: Array<[RegExp, string]> = [
  [/^representative\./, "Representative"],
  [/^individual\./, "Personal"],
  [/^company\./, "Company"],
  [/^person_[^.]+\./, "Team member"],
];

const FIELD_LABELS: Array<[RegExp, string]> = [
  [/\bdob\b/, "date of birth"],
  [/verification\.additional_document/, "additional identity document"],
  [/verification\.document/, "identity document"],
  [/id_number/, "ID number"],
];

function humanizeRequirement(code: string): string {
  const exact = EXACT_LABELS[code];
  if (exact) return exact;

  let owner = "";
  let rest = code;
  for (const [pattern, label] of OWNER_PREFIXES) {
    if (pattern.test(code)) {
      owner = label;
      rest = code.replace(pattern, "");
      break;
    }
  }

  let field: string | null = null;
  for (const [pattern, label] of FIELD_LABELS) {
    if (pattern.test(rest)) {
      field = label;
      break;
    }
  }
  field ??= rest.replace(/[._]/g, " ").trim();

  const label = owner ? `${owner} ${field}` : field;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Maps raw requirement codes to deduplicated human labels (e.g. the three
 * `representative.dob.*` entries collapse into one "Representative date of
 * birth").
 */
export function humanizeRequirements(codes: string[]): string[] {
  const labels = new Set<string>();
  for (const code of codes) {
    labels.add(humanizeRequirement(code));
  }
  return [...labels];
}

export interface DisabledReasonInfo {
  title: string;
  message: string;
  variant: "info" | "warning" | "destructive";
}

/** Translates `requirements.disabled_reason` codes into operator-facing copy. */
export function describeDisabledReason(reason: string): DisabledReasonInfo {
  if (reason === "requirements.past_due") {
    return {
      title: "Action needed",
      message:
        "Stripe is missing some required information. Complete the verification form to continue.",
      variant: "warning",
    };
  }
  if (reason === "requirements.pending_verification") {
    return {
      title: "Verification in progress",
      message:
        "Stripe is reviewing the information you submitted. No action is needed right now — this usually completes shortly.",
      variant: "info",
    };
  }
  if (reason === "under_review" || reason === "other") {
    return {
      title: "Account under review",
      message:
        "Stripe is reviewing this account. No action is needed right now.",
      variant: "info",
    };
  }
  if (reason.startsWith("rejected")) {
    return {
      title: "Account rejected",
      message:
        "Stripe was unable to approve this account. Please contact support for help.",
      variant: "destructive",
    };
  }
  return {
    title: "Payouts on hold",
    message:
      "Stripe has temporarily paused payouts for this account. Complete any pending steps in the verification form, or contact support if this persists.",
    variant: "warning",
  };
}
