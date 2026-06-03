import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  actions,
  useSelectedSubscriptionInvoiceDocument,
} from "document-models/subscription-invoice";
import type {
  SubscriptionInvoiceLineItem,
  SubscriptionInvoiceLineItemOrigin,
  SubscriptionInvoiceStatus,
} from "document-models/subscription-invoice";

/* ───── helpers ─────────────────────────────────────────────── */

function fmtMoney(amount: number, currency: string | null | undefined) {
  const cur = currency || "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${cur} ${amount.toFixed(2)}`;
  }
}

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const ORIGIN_LABELS: Record<SubscriptionInvoiceLineItemOrigin, string> = {
  SETUP: "Setup",
  SUBSCRIPTION_FEE: "Recurring",
  DYNAMIC: "Usage",
  ESTIMATED_USAGE: "Estimated",
  RECONCILIATION: "Adjustment",
};

const STATUS_STYLES: Record<SubscriptionInvoiceStatus, string> = {
  DRAFT: "ph-status ph-status--draft",
  ISSUED: "ph-status ph-status--issued",
  PAID: "ph-status ph-status--paid",
  VOID: "ph-status ph-status--void",
};

/* ───── component ───────────────────────────────────────────── */

export default function Editor() {
  const [document, dispatch] = useSelectedSubscriptionInvoiceDocument();
  const state = document.state.global;
  const currency = state.currency || "USD";

  const handleIssue = () => {
    dispatch(
      actions.markSubscriptionInvoiceIssued({
        issuedAt: new Date().toISOString(),
      }),
    );
  };

  const handleMarkPaid = () => {
    dispatch(
      actions.markSubscriptionInvoicePaid({
        paidAt: new Date().toISOString(),
        paidAmount: state.totalDue,
      }),
    );
  };

  const handleVoid = () => {
    const reason = window.prompt("Reason for voiding this invoice?") || "";
    if (!reason.trim()) return;
    dispatch(
      actions.voidSubscriptionInvoice({
        voidedAt: new Date().toISOString(),
        reason: reason.trim(),
      }),
    );
  };

  const isDraft = state.status === "DRAFT";
  const isIssued = state.status === "ISSUED";
  const isPaid = state.status === "PAID";
  const isVoid = state.status === "VOID";

  return (
    <div className="invoice-page">
      <style>{invoiceStyles}</style>
      <DocumentToolbar />

      {/* Operator action bar — sits above the printable invoice. Hidden in
          print. Action set varies with status: DRAFT → Issue, ISSUED →
          Mark Paid + Void, PAID/VOID → no actions. */}
      <div className="invoice-actions">
        <span className={STATUS_STYLES[state.status]}>{state.status}</span>
        {isDraft && (
          <button className="ph-btn ph-btn--primary" onClick={handleIssue}>
            Issue invoice
          </button>
        )}
        {isIssued && (
          <>
            <button className="ph-btn ph-btn--success" onClick={handleMarkPaid}>
              Mark as paid
            </button>
            <button className="ph-btn ph-btn--ghost" onClick={handleVoid}>
              Void
            </button>
          </>
        )}
        {(isPaid || isVoid) && (
          <span className="invoice-actions__hint">
            {isPaid
              ? `Paid ${fmtMoney(state.totalPaid, currency)}`
              : "This invoice has been voided"}
          </span>
        )}
      </div>

      {/* The printable invoice itself. Designed to render cleanly on A4
          if the operator hits ⌘P. */}
      <article className="invoice">
        <header className="invoice__header">
          <div>
            <h1 className="invoice__title">INVOICE</h1>
            <div className="invoice__number">
              {state.invoiceNumber ??
                `Draft · ${document.header.id.slice(0, 8)}`}
            </div>
          </div>
          <div className="invoice__org">
            <div className="invoice__org-name">Powerhouse</div>
            <div className="invoice__org-line">https://www.powerhouse.inc/</div>
          </div>
        </header>

        <section className="invoice__meta">
          <div>
            <div className="invoice__label">Bill To</div>
            <div className="invoice__strong">{state.customerName ?? "—"}</div>
            {state.customerEmail && (
              <div className="invoice__faint">{state.customerEmail}</div>
            )}
            {state.customerId && (
              <div className="invoice__mono">{state.customerId}</div>
            )}
          </div>
          <div>
            <div className="invoice__label">Subscription</div>
            <div className="invoice__strong">
              {state.sourceSubscriptionName ?? "—"}
            </div>
            {state.sourceSubscriptionId && (
              <div className="invoice__mono">{state.sourceSubscriptionId}</div>
            )}
            {state.billingCycle && (
              <div className="invoice__faint">
                Billing cycle:{" "}
                {state.billingCycle.charAt(0) +
                  state.billingCycle.slice(1).toLowerCase().replace("_", " ")}
              </div>
            )}
          </div>
          <div>
            <div className="invoice__label">Period</div>
            <div className="invoice__strong">
              {fmtDate(state.cycleStart)} – {fmtDate(state.cycleEnd)}
            </div>
            <div className="invoice__faint">
              Issued: {fmtDate(state.issuedAt)}
            </div>
            <div className="invoice__faint">Due: {fmtDate(state.dueDate)}</div>
          </div>
        </section>

        <section className="invoice__items">
          <table className="invoice__table">
            <thead>
              <tr>
                <th>Origin</th>
                <th>Source / Description</th>
                <th>Charged</th>
                <th className="invoice__num">Charge</th>
                <th className="invoice__num">Settled</th>
                <th className="invoice__num">Credit</th>
                <th className="invoice__num">Due</th>
              </tr>
            </thead>
            <tbody>
              {state.lineItems.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", padding: "32px 0" }}
                  >
                    No line items on this invoice yet.
                  </td>
                </tr>
              )}
              {state.lineItems.map((li: SubscriptionInvoiceLineItem) => (
                <tr key={li.id}>
                  <td>
                    <span className={`origin origin--${li.origin}`}>
                      {ORIGIN_LABELS[li.origin]}
                    </span>
                  </td>
                  <td>
                    <div className="invoice__strong">
                      {li.sourceName ?? "—"}
                    </div>
                    <div className="invoice__faint">{li.description}</div>
                  </td>
                  <td className="invoice__faint">{fmtDate(li.chargedAt)}</td>
                  <td className="invoice__num">
                    {fmtMoney(li.debitAmount, li.currency)}
                  </td>
                  <td className="invoice__num invoice__faint">
                    {fmtMoney(li.settledAmount, li.currency)}
                  </td>
                  <td className="invoice__num invoice__credit">
                    {li.creditApplied > 0
                      ? `−${fmtMoney(li.creditApplied, li.currency)}`
                      : "—"}
                  </td>
                  <td className="invoice__num invoice__strong">
                    {fmtMoney(li.amountDue, li.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="invoice__totals">
          <div className="invoice__totals-grid">
            <div>Subtotal</div>
            <div className="invoice__num">
              {fmtMoney(state.subtotal, currency)}
            </div>
            {state.creditApplied > 0 && (
              <>
                <div>Credit applied</div>
                <div className="invoice__num invoice__credit">
                  −{fmtMoney(state.creditApplied, currency)}
                </div>
              </>
            )}
            <div className="invoice__total-line">Total due</div>
            <div className="invoice__num invoice__total-line">
              {fmtMoney(state.totalDue, currency)}
            </div>
            {state.totalPaid > 0 && (
              <>
                <div>Paid</div>
                <div className="invoice__num invoice__faint">
                  {fmtMoney(state.totalPaid, currency)}
                </div>
              </>
            )}
            {state.totalPaid > 0 && state.totalPaid < state.totalDue && (
              <>
                <div className="invoice__strong">Balance owed</div>
                <div className="invoice__num invoice__strong invoice__owed">
                  {fmtMoney(state.totalDue - state.totalPaid, currency)}
                </div>
              </>
            )}
          </div>
        </section>

        {state.notes && (
          <section className="invoice__notes">
            <div className="invoice__label">Notes</div>
            <pre>{state.notes}</pre>
          </section>
        )}

        {state.stripeInvoiceId && (
          <section className="invoice__notes">
            <div className="invoice__label">Stripe</div>
            <div className="invoice__mono">{state.stripeInvoiceId}</div>
          </section>
        )}
      </article>
    </div>
  );
}

/* ───── styles ──────────────────────────────────────────────── */

const invoiceStyles = `
.invoice-page {
  background: #f1f5f9;
  min-height: 100%;
  padding: 24px 16px 64px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
  color: #0f172a;
}
.invoice-actions {
  max-width: 880px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
}
.invoice-actions__hint {
  color: #475569;
  font-size: 0.85rem;
}
.ph-status {
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: uppercase;
}
.ph-status--draft {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
}
.ph-status--issued {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}
.ph-status--paid {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}
.ph-status--void {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
.ph-btn {
  border: 0;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 150ms;
}
.ph-btn--primary { background: #6d28d9; color: white; }
.ph-btn--primary:hover { background: #5b21b6; }
.ph-btn--success { background: #059669; color: white; }
.ph-btn--success:hover { background: #047857; }
.ph-btn--ghost { background: transparent; color: #475569; border: 1px solid #cbd5e1; }
.ph-btn--ghost:hover { background: #f8fafc; }

.invoice {
  max-width: 880px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 4px 16px rgba(15, 23, 42, 0.06);
  padding: 48px 56px;
}
.invoice__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 24px;
}
.invoice__title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  margin: 0 0 4px;
  color: #0f172a;
}
.invoice__number {
  font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
  font-size: 0.85rem;
  color: #475569;
}
.invoice__org { text-align: right; }
.invoice__org-name {
  font-weight: 600;
  font-size: 1.05rem;
}
.invoice__org-line {
  font-size: 0.8rem;
  color: #64748b;
}
.invoice__meta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  padding: 28px 0;
  border-bottom: 1px solid #e2e8f0;
}
.invoice__label {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 6px;
  font-weight: 600;
}
.invoice__strong { font-weight: 600; color: #0f172a; }
.invoice__faint { color: #64748b; font-size: 0.85rem; line-height: 1.5; }
.invoice__mono {
  font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
  font-size: 0.75rem;
  color: #64748b;
  word-break: break-all;
}
.invoice__items { padding-top: 24px; }
.invoice__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.invoice__table th {
  text-align: left;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 600;
  padding: 10px 8px;
  border-bottom: 1px solid #e2e8f0;
}
.invoice__table td {
  padding: 14px 8px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: top;
}
.invoice__num { text-align: right; font-variant-numeric: tabular-nums; }
.invoice__credit { color: #047857; font-weight: 500; }
.invoice__owed { color: #b91c1c; }
.origin {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #475569;
}
.origin--SETUP { background: #fef3c7; color: #92400e; }
.origin--SUBSCRIPTION_FEE { background: #ede9fe; color: #6d28d9; }
.origin--DYNAMIC { background: #dbeafe; color: #1d4ed8; }

.invoice__totals {
  padding: 24px 0 8px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}
.invoice__totals-grid {
  display: grid;
  grid-template-columns: auto auto;
  gap: 8px 32px;
  min-width: 280px;
  font-size: 0.9rem;
  color: #475569;
}
.invoice__total-line {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
  margin-top: 6px;
}
.invoice__notes {
  padding-top: 20px;
}
.invoice__notes pre {
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 0.88rem;
  color: #475569;
  margin: 0;
}

@media print {
  .invoice-page { background: white; padding: 0; }
  .invoice-actions { display: none; }
  .invoice {
    max-width: none;
    box-shadow: none;
    border-radius: 0;
    padding: 32px 48px;
  }
}
`;
