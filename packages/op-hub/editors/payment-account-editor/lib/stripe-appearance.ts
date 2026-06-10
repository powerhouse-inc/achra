import type { IStripeConnectInitParams } from "@stripe/connect-js";

type StripeAppearance = IStripeConnectInitParams["appearance"];

// Shared 2d context for color normalization — one canvas for the lifetime of
// the module instead of one per resolved token.
let sharedCtx: CanvasRenderingContext2D | null | undefined;

/**
 * Normalizes whatever notation a token uses (oklch, hex, rgb) into a plain
 * hex/rgba string that Stripe's appearance validation accepts, via the
 * canvas fillStyle round-trip.
 */
function normalizeColor(raw: string): string | undefined {
  sharedCtx ??= window.document.createElement("canvas").getContext("2d");
  const ctx = sharedCtx;
  if (!ctx) return raw;
  ctx.fillStyle = "#000000";
  ctx.fillStyle = raw;
  const normalized = ctx.fillStyle;
  // If the browser couldn't parse the token, fillStyle keeps the previous
  // value — treat that as "couldn't resolve" rather than forcing black.
  if (normalized === "#000000" && raw !== "#000000" && raw !== "black") {
    return undefined;
  }
  return normalized;
}

/**
 * Maps the Achra design tokens onto Stripe's embedded-components appearance
 * variables, resolved for the CURRENT theme (light/dark). Stripe's form
 * renders in an iframe, so our custom properties don't exist there — values
 * are read off the live document and passed in as concrete colors.
 * Re-build and `connectInstance.update({ appearance })` whenever the theme
 * changes.
 */
export function buildStripeAppearance(): StripeAppearance {
  if (typeof window === "undefined") {
    return { variables: { borderRadius: "6px" } };
  }

  const styles = getComputedStyle(window.document.documentElement);
  const resolveToken = (varName: string): string | undefined => {
    const raw = styles.getPropertyValue(varName).trim();
    if (!raw) return undefined;
    return normalizeColor(raw);
  };

  const tokens = {
    colorPrimary: resolveToken("--primary"),
    colorBackground: resolveToken("--card"),
    colorText: resolveToken("--card-foreground"),
    colorSecondaryText: resolveToken("--muted-foreground"),
    colorDanger: resolveToken("--destructive"),
    colorBorder: resolveToken("--border"),
    buttonPrimaryColorBackground: resolveToken("--primary"),
    buttonPrimaryColorBorder: resolveToken("--primary"),
    buttonPrimaryColorText: resolveToken("--primary-foreground"),
    buttonSecondaryColorBackground: resolveToken("--accent"),
    buttonSecondaryColorBorder: resolveToken("--border"),
    buttonSecondaryColorText: resolveToken("--accent-foreground"),
    actionPrimaryColorText: resolveToken("--primary"),
    actionSecondaryColorText: resolveToken("--foreground"),
    badgeNeutralColorBackground: resolveToken("--muted"),
    badgeNeutralColorText: resolveToken("--muted-foreground"),
    badgeNeutralColorBorder: resolveToken("--border"),
    offsetBackgroundColor: resolveToken("--background"),
    formBackgroundColor: resolveToken("--background"),
  };

  const variables: Record<string, string> = {
    // House radius for controls (rounded-md).
    borderRadius: "6px",
  };
  for (const [key, value] of Object.entries(tokens)) {
    if (value) variables[key] = value;
  }

  return { variables };
}
