import { useMemo } from "react";
import {
  setSelectedNode,
  useDocumentsByIds,
  useFileNodesInSelectedDrive,
} from "@powerhousedao/reactor-browser";
import type { SubscriptionInstanceDocument } from "document-models/subscription-instance";
import {
  isSubscriptionInvoiceDocument,
  type SubscriptionInvoiceDocument,
} from "document-models/subscription-invoice";
import { formatCurrency } from "./billing-utils.js";

interface InvoicesPanelProps {
  document: SubscriptionInstanceDocument;
}

/**
 * Lists all Invoice documents on the current drive that reference this
 * subscription via `state.global.sourceSubscriptionId`. Provides a quick
 * "open in Connect" entry point. Invoices live as their own documents on
 * the drive (in a per-subscription folder) — this panel exposes them
 * inside the subscription editor so the operator doesn't have to navigate
 * away to find them.
 *
 * IMPLEMENTATION NOTE: We pre-filter to invoice-typed file nodes BEFORE
 * batch-fetching. The generic `useDocumentsInSelectedDrive` hook eagerly
 * loads every document on the drive — if any node references a deleted
 * underlying document (orphan), the whole batch throws and the editor
 * fails to render. Restricting to invoice nodes only sidesteps that.
 */
export function InvoicesPanel({ document }: InvoicesPanelProps) {
  const fileNodes = useFileNodesInSelectedDrive();
  const invoiceNodeIds = useMemo(
    () =>
      fileNodes
        ?.filter((n) => n.documentType === "powerhouse/subscription-invoice")
        .map((n) => n.id) ?? [],
    [fileNodes],
  );
  const invoiceDocs = useDocumentsByIds(invoiceNodeIds);

  const invoices = useMemo(() => {
    if (!invoiceDocs) return [];
    const subId = document.header.id;
    const matching: SubscriptionInvoiceDocument[] = [];
    for (const d of invoiceDocs) {
      if (!isSubscriptionInvoiceDocument(d)) continue;
      // The reducer stamps `sourceSubscriptionId` as a PHID, e.g.
      // `phid:document:<id>`. Match either the bare id or the prefixed
      // form so we don't miss invoices created with different PHID
      // conventions.
      const ref = d.state.global.sourceSubscriptionId;
      if (!ref) continue;
      if (
        ref === subId ||
        ref === `phid:document:${subId}` ||
        ref.endsWith(`:${subId}`)
      ) {
        matching.push(d);
      }
    }
    // Newest first by createdAt.
    matching.sort((a, b) =>
      a.header.createdAtUtcIso < b.header.createdAtUtcIso ? 1 : -1,
    );
    return matching;
  }, [invoiceDocs, document.header.id]);

  if (invoices.length === 0) {
    return (
      <div className="si-panel">
        <style>{invoicesPanelStyles}</style>
        <div className="si-panel__header">
          <h3 className="si-panel__title">Invoices</h3>
          <span className="si-panel__subtitle">
            None yet · click Generate Invoice in the header to issue one
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="si-panel">
      <style>{invoicesPanelStyles}</style>
      <div className="si-panel__header">
        <h3 className="si-panel__title">Invoices</h3>
        <span className="si-panel__subtitle">
          {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="si-invoices__list">
        {invoices.map((inv) => {
          const s = inv.state.global;
          const statusClass = `si-invoice__status si-invoice__status--${s.status.toLowerCase()}`;
          return (
            <button
              key={inv.header.id}
              type="button"
              className="si-invoice__row"
              onClick={() => setSelectedNode(inv.header.id)}
              title={`Open invoice ${s.invoiceNumber ?? inv.header.id}`}
            >
              <div className="si-invoice__row-main">
                <div className="si-invoice__row-top">
                  <span className="si-invoice__number">
                    {s.invoiceNumber ?? `Draft · ${inv.header.id.slice(0, 8)}`}
                  </span>
                  <span className={statusClass}>{s.status}</span>
                </div>
                <div className="si-invoice__row-meta">
                  {s.cycleStart && s.cycleEnd && (
                    <>
                      Period {new Date(s.cycleStart).toLocaleDateString()} →{" "}
                      {new Date(s.cycleEnd).toLocaleDateString()}
                      {" · "}
                    </>
                  )}
                  {s.lineItems.length} line item
                  {s.lineItems.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="si-invoice__row-amount">
                <div className="si-invoice__total">
                  {formatCurrency(s.totalDue, s.currency || "USD")}
                </div>
                {s.totalPaid > 0 && s.totalPaid < s.totalDue && (
                  <div className="si-invoice__paid">
                    Paid {formatCurrency(s.totalPaid, s.currency || "USD")}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const invoicesPanelStyles = `
.si-invoices__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 16px;
}
.si-invoice__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid var(--si-slate-100, #e2e8f0);
  border-radius: var(--si-radius-md, 8px);
  background: white;
  cursor: pointer;
  transition: all 150ms;
  text-align: left;
}
.si-invoice__row:hover {
  border-color: var(--si-violet-500, #6d28d9);
  background: #fafaff;
}
.si-invoice__row-main {
  flex: 1 1 auto;
  min-width: 0;
}
.si-invoice__row-top {
  display: flex;
  align-items: center;
  gap: 8px;
}
.si-invoice__number {
  font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--si-slate-800, #1e293b);
}
.si-invoice__status {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid;
}
.si-invoice__status--draft {
  background: #f1f5f9;
  color: #475569;
  border-color: #cbd5e1;
}
.si-invoice__status--issued {
  background: #ecfdf5;
  color: #047857;
  border-color: #a7f3d0;
}
.si-invoice__status--paid {
  background: #d1fae5;
  color: #065f46;
  border-color: #6ee7b7;
}
.si-invoice__status--void {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}
.si-invoice__row-meta {
  font-size: 0.78rem;
  color: var(--si-slate-500, #64748b);
  margin-top: 4px;
}
.si-invoice__row-amount {
  text-align: right;
  flex-shrink: 0;
}
.si-invoice__total {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--si-slate-800, #1e293b);
  font-variant-numeric: tabular-nums;
}
.si-invoice__paid {
  font-size: 0.75rem;
  color: var(--si-emerald-600, #059669);
}
`;
