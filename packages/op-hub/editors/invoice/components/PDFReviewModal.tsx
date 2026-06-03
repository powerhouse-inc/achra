import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, X, Pencil, Loader2 } from "lucide-react";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface FieldConfidence {
  level: ConfidenceLevel;
  evidence?: string | null;
}

export interface PDFReviewData {
  invoiceData: Record<string, any>;
  warnings: string[];
  invalidFields: string[];
  confidence: Record<string, FieldConfidence>;
  groundingAvailable: boolean;
  retried: boolean;
  truncated: boolean;
}

interface PDFReviewModalProps {
  open: boolean;
  base64Pdf: string | null;
  fileName: string;
  reviewData: PDFReviewData | null;
  onAccept: (edited: Record<string, any>) => void;
  onReject: () => void;
  isApplying?: boolean;
}

/**
 * Side-by-side PDF preview + extracted-data review.
 *
 * The user can edit any field before accepting. Dispatches are deferred to
 * the parent's `onAccept` callback so nothing lands in document state until
 * the user confirms.
 */
export default function PDFReviewModal({
  open,
  base64Pdf,
  fileName,
  reviewData,
  onAccept,
  onReject,
  isApplying = false,
}: PDFReviewModalProps) {
  // Snapshot the extracted data into editable state when the modal opens
  // for a new result. `useMemo` gives us a stable initial value tied to the
  // identity of `reviewData` — re-runs only when the parent passes a fresh
  // payload.
  const initialEdited = useMemo(
    () => (reviewData ? deepClone(reviewData.invoiceData) : {}),
    [reviewData],
  );
  const [edited, setEdited] = useState<Record<string, any>>(initialEdited);

  // Reset when the underlying review payload changes (new upload).
  React.useEffect(() => {
    setEdited(initialEdited);
  }, [initialEdited]);

  if (!open || !reviewData) return null;

  const pdfSrc = base64Pdf
    ? `data:application/pdf;base64,${base64Pdf}#toolbar=0&navpanes=0`
    : null;

  const updateField = (path: string, value: unknown) => {
    setEdited((prev) => setPath(deepClone(prev), path, value));
  };

  const handleAccept = () => onAccept(edited);

  // Render via portal to document.body so we escape any transformed/contained
  // ancestor (Connect's editor frame creates a containing block for `fixed`
  // descendants, which otherwise traps the modal and hides the footer).
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-full max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Review extracted invoice
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Check each field against the PDF before applying. Edit anything
              that looks off.
            </p>
          </div>
          <button
            onClick={onReject}
            disabled={isApplying}
            className="text-slate-500 hover:text-slate-800 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Warnings banner */}
        {reviewData.warnings.length > 0 && (
          <WarningsBanner
            warnings={reviewData.warnings}
            truncated={reviewData.truncated}
            retried={reviewData.retried}
            groundingAvailable={reviewData.groundingAvailable}
          />
        )}

        {/* Body — split pane */}
        <div className="flex-1 flex min-h-0">
          {/* PDF preview */}
          <div className="w-1/2 bg-slate-100 border-r border-slate-200">
            {pdfSrc ? (
              <iframe src={pdfSrc} title={fileName} className="w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No preview available
              </div>
            )}
          </div>

          {/* Fields panel */}
          <div className="w-1/2 overflow-y-auto px-6 py-5 space-y-6">
            <Section title="Invoice">
              <FieldRow
                label="Invoice number"
                path="invoiceNo"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
              />
              <FieldRow
                label="Invoice date"
                path="dateIssued"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
              />
              <FieldRow
                label="Delivery date"
                path="dateDelivered"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
              />
              <FieldRow
                label="Due date"
                path="dateDue"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
              />
              <FieldRow
                label="Currency"
                path="currency"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
              />
              <FieldRow
                label="Total (excl. tax)"
                path="totalPriceTaxExcl"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
                type="number"
              />
              <FieldRow
                label="Total (incl. tax)"
                path="totalPriceTaxIncl"
                edited={edited}
                onChange={updateField}
                confidence={reviewData.confidence}
                invalidFields={reviewData.invalidFields}
                type="number"
              />
            </Section>

            <PartySection
              party="issuer"
              title="Issuer (receives payment)"
              edited={edited}
              onChange={updateField}
              confidence={reviewData.confidence}
              invalidFields={reviewData.invalidFields}
            />

            <PartySection
              party="payer"
              title="Payer (sends payment)"
              edited={edited}
              onChange={updateField}
              confidence={reviewData.confidence}
              invalidFields={reviewData.invalidFields}
              showPaymentRouting={false}
            />

            <LineItemsSection edited={edited} onChange={updateField} />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
          <div className="text-xs text-slate-500">
            {reviewData.invalidFields.length > 0 ? (
              <span className="text-amber-700 font-medium">
                {reviewData.invalidFields.length} field
                {reviewData.invalidFields.length === 1 ? "" : "s"} flagged —
                please verify highlighted values.
              </span>
            ) : (
              <span>All high-stakes fields passed validation.</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onReject}
              disabled={isApplying}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-50"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              disabled={isApplying}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2"
            >
              {isApplying && <Loader2 className="w-4 h-4 animate-spin" />}
              Accept & Apply
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

/* -------------------------------------------------------------------------- */
/*                              Subcomponents                                 */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 border-b border-slate-100 pb-1">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PartySection({
  party,
  title,
  edited,
  onChange,
  confidence,
  invalidFields,
  showPaymentRouting = true,
}: {
  party: "issuer" | "payer";
  title: string;
  edited: Record<string, any>;
  onChange: (path: string, value: unknown) => void;
  confidence: Record<string, FieldConfidence>;
  invalidFields: string[];
  showPaymentRouting?: boolean;
}) {
  const prefix = `${party}`;
  return (
    <Section title={title}>
      <FieldRow
        label="Name"
        path={`${prefix}.name`}
        edited={edited}
        onChange={onChange}
        confidence={confidence}
        invalidFields={invalidFields}
      />
      <FieldRow
        label="Street"
        path={`${prefix}.address.streetAddress`}
        edited={edited}
        onChange={onChange}
        confidence={confidence}
        invalidFields={invalidFields}
      />
      <div className="grid grid-cols-2 gap-3">
        <FieldRow
          label="City"
          path={`${prefix}.address.city`}
          edited={edited}
          onChange={onChange}
          confidence={confidence}
          invalidFields={invalidFields}
        />
        <FieldRow
          label="Postal code"
          path={`${prefix}.address.postalCode`}
          edited={edited}
          onChange={onChange}
          confidence={confidence}
          invalidFields={invalidFields}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FieldRow
          label="State / Province"
          path={`${prefix}.address.stateProvince`}
          edited={edited}
          onChange={onChange}
          confidence={confidence}
          invalidFields={invalidFields}
        />
        <FieldRow
          label="Country"
          path={`${prefix}.address.country`}
          edited={edited}
          onChange={onChange}
          confidence={confidence}
          invalidFields={invalidFields}
        />
      </div>
      <FieldRow
        label="Tax ID"
        path={`${prefix}.id.taxId`}
        edited={edited}
        onChange={onChange}
        confidence={confidence}
        invalidFields={invalidFields}
      />
      <FieldRow
        label="Email"
        path={`${prefix}.contactInfo.email`}
        edited={edited}
        onChange={onChange}
        confidence={confidence}
        invalidFields={invalidFields}
      />
      {/* Payment routing — only relevant for the issuer (recipient of funds). */}
      {showPaymentRouting && (
        <>
          {/* Wallet — high stakes, separate visual emphasis */}
          <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
              Wallet
            </p>
            <FieldRow
              label="Address"
              path={`${prefix}.paymentRouting.wallet.address`}
              edited={edited}
              onChange={onChange}
              confidence={confidence}
              invalidFields={invalidFields}
              mono
            />
            <FieldRow
              label="Chain"
              path={`${prefix}.paymentRouting.wallet.chainName`}
              edited={edited}
              onChange={onChange}
              confidence={confidence}
              invalidFields={invalidFields}
            />
          </div>
          {/* Bank — high stakes */}
          <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
              Bank
            </p>
            <FieldRow
              label="Bank name"
              path={`${prefix}.paymentRouting.bank.name`}
              edited={edited}
              onChange={onChange}
              confidence={confidence}
              invalidFields={invalidFields}
            />
            <FieldRow
              label="Account / IBAN"
              path={`${prefix}.paymentRouting.bank.accountNum`}
              edited={edited}
              onChange={onChange}
              confidence={confidence}
              invalidFields={invalidFields}
              mono
            />
            <div className="grid grid-cols-2 gap-3">
              <FieldRow
                label="BIC / SWIFT"
                path={`${prefix}.paymentRouting.bank.BIC`}
                edited={edited}
                onChange={onChange}
                confidence={confidence}
                invalidFields={invalidFields}
                mono
              />
              <FieldRow
                label="ABA"
                path={`${prefix}.paymentRouting.bank.ABA`}
                edited={edited}
                onChange={onChange}
                confidence={confidence}
                invalidFields={invalidFields}
                mono
              />
            </div>
            <FieldRow
              label="Beneficiary"
              path={`${prefix}.paymentRouting.bank.beneficiary`}
              edited={edited}
              onChange={onChange}
              confidence={confidence}
              invalidFields={invalidFields}
            />
          </div>
        </>
      )}
    </Section>
  );
}

function LineItemsSection({
  edited,
  onChange,
}: {
  edited: Record<string, any>;
  onChange: (path: string, value: unknown) => void;
}) {
  const items: any[] = Array.isArray(edited.lineItems) ? edited.lineItems : [];
  if (items.length === 0) {
    return (
      <Section title="Line items">
        <p className="text-sm text-slate-400 italic">
          No line items extracted.
        </p>
      </Section>
    );
  }
  return (
    <Section title={`Line items (${items.length})`}>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={item.id ?? idx}
            className="p-3 rounded-lg border border-slate-200 bg-white"
          >
            <input
              className="w-full text-sm font-medium border-0 focus:ring-0 px-0 py-0.5 bg-transparent"
              value={item.description ?? ""}
              onChange={(e) =>
                onChange(`lineItems.${idx}.description`, e.target.value)
              }
              placeholder="(no description)"
            />
            <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
              <NumberCell
                label="Qty"
                value={item.quantity}
                onChange={(v) => onChange(`lineItems.${idx}.quantity`, v)}
              />
              <NumberCell
                label="Unit (excl)"
                value={item.unitPriceTaxExcl}
                onChange={(v) =>
                  onChange(`lineItems.${idx}.unitPriceTaxExcl`, v)
                }
              />
              <NumberCell
                label="Tax %"
                value={item.taxPercent}
                onChange={(v) => onChange(`lineItems.${idx}.taxPercent`, v)}
              />
              <NumberCell
                label="Total (incl)"
                value={item.totalPriceTaxIncl}
                onChange={(v) =>
                  onChange(`lineItems.${idx}.totalPriceTaxIncl`, v)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function NumberCell({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="text-slate-500">{label}</span>
      <input
        type="number"
        className="border border-slate-200 rounded px-1.5 py-1 text-slate-900 focus:outline-none focus:border-slate-400"
        value={typeof value === "number" ? value : ""}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </label>
  );
}

function FieldRow({
  label,
  path,
  edited,
  onChange,
  confidence,
  invalidFields,
  type = "text",
  mono = false,
}: {
  label: string;
  path: string;
  edited: Record<string, any>;
  onChange: (path: string, value: unknown) => void;
  confidence: Record<string, FieldConfidence>;
  invalidFields: string[];
  type?: "text" | "number";
  mono?: boolean;
}) {
  const value = getPath(edited, path);
  const conf = confidence[path];
  const isInvalid = invalidFields.includes(path);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        <div className="flex items-center gap-1">
          {isInvalid && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              <AlertTriangle className="w-3 h-3" />
              Verify
            </span>
          )}
          {conf && <ConfidenceBadge level={conf.level} />}
        </div>
      </div>
      <input
        type={type}
        className={`w-full text-sm rounded-md border px-2.5 py-1.5 focus:outline-none focus:ring-1 ${
          isInvalid
            ? "border-amber-400 bg-amber-50/30 focus:border-amber-500 focus:ring-amber-200"
            : "border-slate-200 focus:border-slate-400 focus:ring-slate-200"
        } ${mono ? "font-mono" : ""}`}
        value={value == null ? "" : String(value)}
        placeholder="(not extracted)"
        onChange={(e) =>
          onChange(
            path,
            type === "number"
              ? e.target.value === ""
                ? null
                : parseFloat(e.target.value)
              : e.target.value,
          )
        }
      />
      {conf?.evidence && (
        <p className="text-[11px] text-slate-400 mt-0.5 italic line-clamp-1">
          PDF: "{conf.evidence}"
        </p>
      )}
    </div>
  );
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const styles: Record<ConfidenceLevel, string> = {
    high: "text-emerald-700 bg-emerald-50",
    medium: "text-slate-700 bg-slate-100",
    low: "text-amber-700 bg-amber-50",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${styles[level]}`}
    >
      {level === "high" ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <Pencil className="w-3 h-3" />
      )}
      {level}
    </span>
  );
}

function WarningsBanner({
  warnings,
  truncated,
  retried,
  groundingAvailable,
}: {
  warnings: string[];
  truncated: boolean;
  retried: boolean;
  groundingAvailable: boolean;
}) {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div className="text-xs text-amber-900 space-y-1">
          {truncated && (
            <p>
              <strong>Output was truncated.</strong> Some line items may be
              missing. Compare against the PDF carefully.
            </p>
          )}
          {!groundingAvailable && (
            <p>
              <strong>No text layer in this PDF.</strong> Values could not be
              cross-checked against the source text.
            </p>
          )}
          {retried && (
            <p>A second extraction pass was used to correct flagged fields.</p>
          )}
          {warnings.slice(0, 5).map((w, i) => (
            <p key={i}>• {w}</p>
          ))}
          {warnings.length > 5 && (
            <p className="text-amber-700">
              … and {warnings.length - 5} more issue
              {warnings.length - 5 === 1 ? "" : "s"}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Helpers                                    */
/* -------------------------------------------------------------------------- */

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

function getPath(obj: Record<string, any>, path: string): unknown {
  return path
    .split(".")
    .reduce<any>(
      (acc, k) => (acc != null && typeof acc === "object" ? acc[k] : undefined),
      obj,
    );
}

function setPath(
  obj: Record<string, any>,
  path: string,
  value: unknown,
): Record<string, any> {
  const keys = path.split(".");
  let cursor: any = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cursor[k] == null || typeof cursor[k] !== "object") {
      cursor[k] = {};
    }
    cursor = cursor[k];
  }
  cursor[keys[keys.length - 1]] = value;
  return obj;
}
