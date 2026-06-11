import type {
  BillingCycle,
  BillingCycleDiscount,
} from "document-models/service-offering";
import { formatPrice, BILLING_CYCLE_MONTHS } from "./pricing-utils.js";

interface BillingCycleConfigPanelProps {
  tierId: string;
  basePrice: number | null;
  currency: string;
  billingCycleDiscounts: BillingCycleDiscount[];
  isCustomPricing: boolean;
}

const CYCLE_ORDER: BillingCycle[] = [
  "MONTHLY",
  "QUARTERLY",
  "SEMI_ANNUAL",
  "ANNUAL",
];

const CYCLE_LABELS: Record<string, string> = {
  MONTHLY: "Monthly",
  QUARTERLY: "Quarterly",
  SEMI_ANNUAL: "Semi-Annual",
  ANNUAL: "Annual",
};

const CYCLE_SHORT: Record<string, string> = {
  MONTHLY: "1mo",
  QUARTERLY: "3mo",
  SEMI_ANNUAL: "6mo",
  ANNUAL: "12mo",
};

const fontSans = "'DM Sans', system-ui, sans-serif";
const fontMono = "'DM Mono', 'SF Mono', monospace";

export function BillingCycleConfigPanel({
  basePrice,
  currency,
  billingCycleDiscounts,
  isCustomPricing,
}: BillingCycleConfigPanelProps) {
  if (isCustomPricing) return null;

  const hasBasePrice = basePrice !== null && basePrice > 0;

  const isCycleEnabled = (cycle: BillingCycle): boolean => {
    if (cycle === "MONTHLY") return true;
    return billingCycleDiscounts.some((d) => d.billingCycle === cycle);
  };

  const getDiscountValue = (cycle: BillingCycle): number => {
    const entry = billingCycleDiscounts.find((d) => d.billingCycle === cycle);
    return entry?.discountRule?.discountValue ?? 0;
  };

  const getCycleTotal = (cycle: BillingCycle): number | null => {
    if (!hasBasePrice) return null;
    return basePrice * BILLING_CYCLE_MONTHS[cycle];
  };

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center gap-1.5 mb-3">
        <span
          className="text-[0.625rem] font-medium uppercase text-muted-foreground flex items-center gap-1.5"
          style={{ fontFamily: fontMono, letterSpacing: "0.08em" }}
        >
          <svg
            className="w-3.5 h-3.5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Billing Cycles & Discounts
        </span>
        <span
          className="text-[0.5625rem] font-medium text-muted-foreground bg-muted py-0.5 px-1.5 rounded-md ml-auto"
          style={{ fontFamily: fontMono }}
        >
          Computed from service groups
        </span>
      </div>

      {!hasBasePrice && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-[10px] text-muted-foreground text-xs">
          <svg
            className="w-4 h-4 shrink-0 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Discounts will appear here once service groups set pricing for this
          tier.
        </div>
      )}

      <div className="flex flex-col gap-2">
        {CYCLE_ORDER.map((cycle) => {
          const enabled = isCycleEnabled(cycle);
          const isMonthly = cycle === "MONTHLY";
          const total = getCycleTotal(cycle);
          const discount = getDiscountValue(cycle);

          return (
            <BillingCycleRow
              key={cycle}
              label={CYCLE_LABELS[cycle]}
              shortLabel={CYCLE_SHORT[cycle]}
              enabled={enabled}
              isMonthly={isMonthly}
              basePrice={basePrice}
              total={total}
              discount={discount}
              currency={currency}
              hasBasePrice={hasBasePrice}
            />
          );
        })}
      </div>
    </div>
  );
}

interface BillingCycleRowProps {
  label: string;
  shortLabel: string;
  enabled: boolean;
  isMonthly: boolean;
  basePrice: number | null;
  total: number | null;
  discount: number;
  currency: string;
  hasBasePrice: boolean;
}

function BillingCycleRow({
  label,
  shortLabel,
  enabled,
  isMonthly,
  basePrice,
  total,
  discount,
  currency,
  hasBasePrice,
}: BillingCycleRowProps) {
  const effectivePrice =
    total !== null && discount > 0 ? Math.max(0, total - discount) : null;

  const savingsPercent =
    total !== null && total > 0 && discount > 0
      ? Math.round((discount / total) * 100)
      : 0;

  const currencySymbol = currency === "USD" ? "$" : currency;

  return (
    <div
      className={`rounded-[10px] overflow-hidden transition-all duration-150 ${
        enabled ? "border border-primary/40" : "border border-border"
      } ${!hasBasePrice && !isMonthly ? "opacity-50" : ""}`}
    >
      {/* Top: dot + label + total */}
      <div
        className={`flex items-center gap-2.5 py-2.5 px-3 cursor-default ${
          enabled ? "bg-primary/10" : "bg-card"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${
            enabled ? "bg-primary" : "bg-border"
          }`}
        />
        <span
          className="text-sm font-medium text-foreground flex-1"
          style={{ fontFamily: fontSans }}
        >
          {label}
        </span>
        {enabled && total !== null ? (
          <span
            className="text-[0.9375rem] font-semibold text-foreground whitespace-nowrap"
            style={{ fontFamily: fontMono }}
          >
            {formatPrice(total, currency)}
          </span>
        ) : (
          !enabled && (
            <span
              className="text-sm text-muted-foreground/50 ml-auto"
              style={{ fontFamily: fontMono }}
            >
              --
            </span>
          )
        )}
      </div>

      {/* Detail: standard price calc + discount display (read-only) */}
      {enabled && hasBasePrice && (
        <div
          className={`flex items-end gap-4 px-3 pt-2 pb-2.5 border-t ${
            enabled
              ? "bg-primary/10 border-primary/20"
              : "bg-muted border-border"
          }`}
        >
          <div className="flex flex-col gap-1 flex-1">
            <span
              className="text-[0.5625rem] font-semibold uppercase text-muted-foreground flex items-center gap-1"
              style={{ fontFamily: fontMono, letterSpacing: "0.06em" }}
            >
              Standard Price
            </span>
            <div
              className="flex items-center gap-2 text-xs text-muted-foreground py-1"
              style={{ fontFamily: fontMono, minHeight: "1.75rem" }}
            >
              <span>
                {currencySymbol}
                {basePrice} &times; {shortLabel}
              </span>
              <span className="font-semibold text-foreground">
                {formatPrice(total ?? 0, currency)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <span
              className="text-[0.5625rem] font-semibold uppercase text-muted-foreground flex items-center gap-1"
              style={{ fontFamily: fontMono, letterSpacing: "0.06em" }}
            >
              Flat Discount
              <svg
                className="w-[0.6875rem] h-[0.6875rem]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </span>
            <div
              className={`flex items-center gap-1 text-[0.8125rem] font-medium py-1 ${
                discount === 0
                  ? "text-muted-foreground/50"
                  : "text-muted-foreground"
              }`}
              style={{ fontFamily: fontMono, minHeight: "1.75rem" }}
            >
              - {currencySymbol}
              {discount > 0 ? discount.toLocaleString() : "0"}
            </div>
          </div>
        </div>
      )}

      {/* Effective price bar (only when discount > 0) */}
      {effectivePrice !== null && discount > 0 && (
        <div className="flex items-center gap-1.5 py-1.5 px-3 bg-status-success/10 border-t border-status-success/20">
          <span className="text-[0.6875rem] text-status-success">&rarr;</span>
          <span
            className="text-xs font-semibold text-status-success"
            style={{ fontFamily: fontMono }}
          >
            {formatPrice(effectivePrice, currency)}
          </span>
          {savingsPercent > 0 && (
            <span
              className="text-[0.5625rem] font-semibold text-status-success bg-status-success/20 py-[0.0625rem] px-[0.3125rem] rounded-md ml-auto"
              style={{ fontFamily: fontMono }}
            >
              {savingsPercent}% off
            </span>
          )}
        </div>
      )}
    </div>
  );
}
