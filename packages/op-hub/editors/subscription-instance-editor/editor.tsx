import { useEffect, useRef, useState } from "react";
import { generateId } from "document-model";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { addAccrualPeriod } from "../../document-models/subscription-instance/v1/src/utils.js";
import { useSelectedSubscriptionInstanceDocument } from "../../document-models/subscription-instance/v1/hooks.js";
import type { ViewMode } from "./types.js";
import { ModeToggle } from "./components/ModeToggle.js";
import { MockDataButton } from "./components/MockDataButton.js";
import { ImportServiceConfigButton } from "./components/ImportServiceConfigButton.js";
import { SubscriptionHeader } from "./components/SubscriptionHeader.js";
import { ServicesPanel } from "./components/ServicesPanel.js";
import { BillingPanel } from "./components/BillingPanel.js";
import { DebtLedgerPanel } from "./components/DebtLedgerPanel.js";
import { InvoicesPanel } from "./components/InvoicesPanel.js";
import { CustomerInfo } from "./components/CustomerInfo.js";
import { OperatorNotes } from "./components/OperatorNotes.js";
import {
  SimulatedClockPanel,
  SimulatedClockProvider,
  useSimulatedClock,
} from "./components/SimulatedClock.js";
import { accrueMetricUsage } from "../../document-models/subscription-instance/v1/gen/metrics/creators.js";
import { generateInvoice } from "../../document-models/subscription-instance/v1/gen/subscription/creators.js";
import { useSelectedDrive } from "@powerhousedao/reactor-browser";

export default function SubscriptionInstanceEditor() {
  return (
    <SimulatedClockProvider>
      <SubscriptionInstanceEditorInner />
    </SimulatedClockProvider>
  );
}

function SubscriptionInstanceEditorInner() {
  const [document, dispatch] = useSelectedSubscriptionInstanceDocument();
  const [mode, setMode] = useState<ViewMode>("client");
  const { simulatedNow } = useSimulatedClock();

  const [selectedDrive] = useSelectedDrive();

  useEffect(() => {
    // Operator mode when this instance is opened from the Service Offering app
    // drive. Connect resolves a drive's app by matching `meta.preferredEditor`
    // against the editor module's `config.id` — which is "service-offering"
    // (see service-offering-app/module.ts). Accept the legacy "service-offering-app"
    // string too in case a drive was tagged with the directory name.
    const preferred = selectedDrive?.header.meta?.preferredEditor;
    if (preferred === "service-offering" || preferred === "service-offering-app") {
      setMode("operator");
    }
  }, [selectedDrive]);

  // Auto-tick: when the operator advances the simulated clock, dispatch
  // ACCRUE_METRIC_USAGE for every metric on the document with the new
  // simulated time. The reducer is idempotent within a period (no-op if no
  // accrual boundary was crossed), so over-dispatching is safe.
  //
  // Only fires when sim mode is active (`simulatedNow !== null`) and the
  // subscription is ACTIVE — the reducer throws on other statuses.
  // Skips the very first run after mount when sim mode is null.
  const lastTickedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!simulatedNow) {
      lastTickedRef.current = null;
      return;
    }
    if (!document) return;
    if (document.state.global.status !== "ACTIVE") return;
    if (lastTickedRef.current === simulatedNow) return;
    lastTickedRef.current = simulatedNow;

    // Auto-invoice at boundary: if the simulated clock has reached or
    // crossed the cycle boundary, dispatch GENERATE_INVOICE with
    // advanceCycleIfDue=true so the cycle progresses (and an invoice is
    // generated for the just-closed cycle) before per-metric accrual runs
    // against the new window. sourceName is informational — operation log
    // shows readable names per slice.
    const next = document.state.global.nextBillingDate;
    if (next && simulatedNow >= next) {
      const metricFreezeSliceIds: {
        sourceId: string;
        sliceId: string;
        sourceName?: string;
      }[] = [];
      const nextCycleRecurringSliceIds: {
        sourceId: string;
        sliceId: string;
        sourceName?: string;
      }[] = [];
      for (const svc of document.state.global.services) {
        for (const m of svc.metrics) {
          metricFreezeSliceIds.push({
            sourceId: m.id,
            sliceId: generateId(),
            sourceName: m.name,
          });
        }
        if (svc.recurringCost) {
          nextCycleRecurringSliceIds.push({
            sourceId: svc.id,
            sliceId: generateId(),
            sourceName: svc.name ?? "Service",
          });
        }
      }
      for (const group of document.state.global.serviceGroups) {
        if (group.recurringCost) {
          nextCycleRecurringSliceIds.push({
            sourceId: group.id,
            sliceId: generateId(),
            sourceName: group.name,
          });
        }
        for (const svc of group.services) {
          for (const m of svc.metrics) {
            metricFreezeSliceIds.push({
              sourceId: m.id,
              sliceId: generateId(),
              sourceName: m.name,
            });
          }
        }
      }
      dispatch(
        generateInvoice({
          invoiceId: generateId(),
          generatedAt: simulatedNow,
          advanceCycleIfDue: true,
          metricFreezeSliceIds,
          nextCycleRecurringSliceIds,
        }),
      );
    }

    type MetricRef = {
      serviceId: string;
      metricId: string;
      lastAccrualDate: string | null;
      accrualCycle: string;
    };
    const metrics: MetricRef[] = [];
    for (const svc of document.state.global.services) {
      for (const m of svc.metrics) {
        metrics.push({
          serviceId: svc.id,
          metricId: m.id,
          lastAccrualDate: m.lastAccrualDate ?? null,
          accrualCycle: m.accrualCycle,
        });
      }
    }
    for (const group of document.state.global.serviceGroups) {
      for (const svc of group.services) {
        for (const m of svc.metrics) {
          metrics.push({
            serviceId: svc.id,
            metricId: m.id,
            lastAccrualDate: m.lastAccrualDate ?? null,
            accrualCycle: m.accrualCycle,
          });
        }
      }
    }
    for (const {
      serviceId,
      metricId,
      lastAccrualDate,
      accrualCycle,
    } of metrics) {
      // Pre-generate one slice ID per period boundary the accrual loop will
      // cross. Each ID is consumed only when the period closes with overage
      // but no active slice exists. Unused IDs are harmless.
      const newSliceIds: string[] = [];
      if (lastAccrualDate) {
        let boundary = addAccrualPeriod(lastAccrualDate, accrualCycle);
        let safety = 0;
        while (simulatedNow >= boundary && safety < 10000) {
          newSliceIds.push(generateId());
          boundary = addAccrualPeriod(boundary, accrualCycle);
          safety += 1;
        }
      }
      dispatch(
        accrueMetricUsage({
          serviceId,
          metricId,
          accrualDate: simulatedNow,
          newSliceIds,
        }),
      );
    }
  }, [simulatedNow, document, dispatch]);

  if (!document) {
    return (
      <div className="si-editor">
        <style>{editorStyles}</style>
        <div className="si-empty-state">
          <div className="si-empty-state__icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="si-empty-state__title">No subscription selected</h2>
          <p className="si-empty-state__subtitle">
            Select a subscription instance to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="si-editor" data-mode={mode}>
      <style>{editorStyles}</style>
      <DocumentToolbar />

      <div className="si-editor__container">
        {/* Mode Toggle & Actions */}
        <div className="si-editor__header">
          {mode === "operator" && (
            <>
              <ImportServiceConfigButton
                document={document}
                dispatch={dispatch}
              />
              <MockDataButton document={document} dispatch={dispatch} />
            </>
          )}
          {/* <ModeToggle mode={mode} onModeChange={setMode} /> */}
        </div>

        {/* Simulated clock — operator-only test tool */}
        {mode === "operator" && <SimulatedClockPanel />}

        {/* Subscription Header */}
        <SubscriptionHeader
          document={document}
          dispatch={dispatch}
          mode={mode}
        />

        {/* Financial section: This Period (projection) + Debt Ledger (canonical
            ledger). Tight inter-panel spacing groups them as one concern;
            Gestalt proximity separates them from the identity header above
            and the services grid below. */}
        <div className="si-financial-stack">
          <BillingPanel document={document} dispatch={dispatch} mode={mode} />
          {mode === "operator" && (
            <DebtLedgerPanel document={document} dispatch={dispatch} />
          )}
          {mode === "operator" && <InvoicesPanel document={document} />}
        </div>

        {/* Main Content Grid */}
        <div className="si-editor__grid">
          {/* Left Column - Services */}
          <div className="si-editor__main">
            <ServicesPanel
              document={document}
              dispatch={dispatch}
              mode={mode}
            />
          </div>

          {/* Right Column - Info & Notes */}
          <div className="si-editor__sidebar">
            <CustomerInfo document={document} dispatch={dispatch} mode={mode} />
            {mode === "operator" && (
              <OperatorNotes document={document} dispatch={dispatch} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const editorStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .si-editor {
    --si-font-sans: 'Inter', system-ui, sans-serif;
    --si-font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;

    /* Colors */
    --si-slate-50: #f8fafc;
    --si-slate-100: #f1f5f9;
    --si-slate-200: #e2e8f0;
    --si-slate-300: #cbd5e1;
    --si-slate-400: #94a3b8;
    --si-slate-500: #64748b;
    --si-slate-600: #475569;
    --si-slate-700: #334155;
    --si-slate-800: #1e293b;
    --si-slate-900: #0f172a;

    --si-emerald-50: #ecfdf5;
    --si-emerald-100: #d1fae5;
    --si-emerald-500: #10b981;
    --si-emerald-600: #059669;
    --si-emerald-700: #047857;

    --si-amber-50: #fffbeb;
    --si-amber-100: #fef3c7;
    --si-amber-500: #f59e0b;
    --si-amber-600: #d97706;
    --si-amber-700: #b45309;

    --si-orange-50: #fff7ed;
    --si-orange-100: #ffedd5;
    --si-orange-500: #f97316;
    --si-orange-600: #ea580c;

    --si-rose-50: #fff1f2;
    --si-rose-100: #ffe4e6;
    --si-rose-500: #f43f5e;
    --si-rose-600: #e11d48;
    --si-rose-700: #be123c;

    --si-violet-50: #f5f3ff;
    --si-violet-100: #ede9fe;
    --si-violet-500: #8b5cf6;
    --si-violet-600: #7c3aed;
    --si-violet-700: #6d28d9;

    --si-sky-50: #f0f9ff;
    --si-sky-100: #e0f2fe;
    --si-sky-500: #0ea5e9;
    --si-sky-600: #0284c7;

    /* Spacing */
    --si-radius-sm: 6px;
    --si-radius-md: 8px;
    --si-radius-lg: 12px;

    /* Shadows */
    --si-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --si-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    --si-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);

    /* Transitions */
    --si-transition-fast: 150ms ease;
    --si-transition-base: 200ms ease;

    font-family: var(--si-font-sans);
    background: var(--si-slate-50);
    min-height: 100%;
    overflow-y: auto;
  }

  .si-editor__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px 32px 48px;
  }

  .si-editor__header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .si-editor__grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 24px;
    margin-top: 24px;
  }

  @media (max-width: 1024px) {
    .si-editor__grid {
      grid-template-columns: 1fr;
    }
  }

  .si-editor__main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .si-editor__sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Empty State */
  .si-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 48px;
  }

  .si-empty-state__icon {
    width: 64px;
    height: 64px;
    color: var(--si-slate-300);
    margin-bottom: 16px;
  }

  .si-empty-state__icon svg {
    width: 100%;
    height: 100%;
  }

  .si-empty-state__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--si-slate-700);
    margin: 0 0 8px;
  }

  .si-empty-state__subtitle {
    font-size: 0.875rem;
    color: var(--si-slate-500);
    margin: 0;
  }

  /* Mode Toggle */
  .si-mode-toggle {
    display: inline-flex;
    background: var(--si-slate-100);
    border-radius: var(--si-radius-lg);
    padding: 4px;
    gap: 4px;
  }

  .si-mode-toggle__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    font-family: var(--si-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-600);
    background: transparent;
    border: none;
    border-radius: var(--si-radius-md);
    cursor: pointer;
    transition: all var(--si-transition-fast);
  }

  .si-mode-toggle__btn:hover {
    color: var(--si-slate-800);
  }

  .si-mode-toggle__btn--active {
    background: white;
    color: var(--si-slate-900);
    box-shadow: var(--si-shadow-sm);
  }

  .si-mode-toggle__icon {
    width: 18px;
    height: 18px;
  }

  /* Header */
  .si-header {
    background: white;
    border-radius: var(--si-radius-lg);
    padding: 24px;
    box-shadow: var(--si-shadow-sm);
    border: 1px solid var(--si-slate-200);
  }

  .si-header__main {
    margin-bottom: 20px;
  }

  .si-header__title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .si-header__info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .si-header__thumbnail {
    width: 48px;
    height: 48px;
    border-radius: var(--si-radius-md);
    object-fit: cover;
  }

  .si-header__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--si-slate-900);
    margin: 0;
  }

  .si-header__subtitle {
    font-size: 0.875rem;
    color: var(--si-slate-500);
    margin: 4px 0 0;
  }

  .si-header__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .si-header__meta-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .si-header__meta-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--si-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .si-header__meta-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-800);
  }

  .si-header__stats {
    display: flex;
    gap: 32px;
    padding-top: 20px;
    border-top: 1px solid var(--si-slate-100);
  }

  .si-header__stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .si-header__stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--si-slate-900);
  }

  .si-header__stat-label {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Badges */
  .si-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .si-badge--sm {
    padding: 2px 8px;
    font-size: 0.6875rem;
  }

  .si-badge--emerald {
    background: var(--si-emerald-100);
    color: var(--si-emerald-700);
  }

  .si-badge--amber {
    background: var(--si-amber-100);
    color: var(--si-amber-700);
  }

  .si-badge--orange {
    background: var(--si-orange-100);
    color: var(--si-orange-600);
  }

  .si-badge--rose {
    background: var(--si-rose-100);
    color: var(--si-rose-700);
  }

  .si-badge--violet {
    background: var(--si-violet-100);
    color: var(--si-violet-700);
  }

  .si-badge--sky {
    background: var(--si-sky-100);
    color: var(--si-sky-600);
  }

  .si-badge--slate {
    background: var(--si-slate-100);
    color: var(--si-slate-600);
  }

  /* Panel */
  .si-panel {
    background: white;
    border-radius: var(--si-radius-lg);
    padding: 24px;
    box-shadow: var(--si-shadow-sm);
    border: 1px solid var(--si-slate-200);
  }

  .si-panel--compact {
    padding: 20px;
  }

  .si-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .si-panel__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--si-slate-900);
    margin: 0;
  }

  .si-panel__count {
    font-size: 0.875rem;
    color: var(--si-slate-500);
  }

  /* Empty State within panel */
  .si-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    text-align: center;
  }

  .si-empty__icon {
    width: 48px;
    height: 48px;
    color: var(--si-slate-300);
    margin-bottom: 12px;
  }

  .si-empty__text {
    font-size: 0.875rem;
    color: var(--si-slate-500);
    margin: 0;
  }

  /* Services Grid */
  .si-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  .si-service-card {
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    padding: 16px;
    border: 1px solid var(--si-slate-200);
  }

  .si-service-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .si-service-card__name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--si-slate-800);
    margin: 0;
  }

  .si-service-card__custom-value {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    background: var(--si-slate-100);
    padding: 2px 8px;
    border-radius: 4px;
    white-space: nowrap;
  }

  .si-service-card__desc {
    font-size: 0.8125rem;
    color: var(--si-slate-600);
    margin: 0 0 12px;
    line-height: 1.5;
  }

  .si-service-card__setup {
    display: flex;
    justify-content: space-between;
    font-size: 0.8125rem;
    padding: 8px 0;
    border-top: 1px solid var(--si-slate-200);
    margin-top: 8px;
  }

  .si-service-card__setup-label {
    color: var(--si-slate-500);
  }

  .si-service-card__setup-value {
    color: var(--si-slate-700);
    font-weight: 500;
  }

  .si-service-card__paid {
    color: var(--si-emerald-600);
  }

  .si-service-card__pending {
    color: var(--si-amber-600);
  }

  .si-service-card__metrics {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .si-service-card__billing {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    margin: 12px 0 0;
  }

  /* Service Group */
  .si-service-group {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--si-slate-200);
  }

  .si-service-group:first-child {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .si-service-group__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .si-service-group__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-700);
    margin: 0;
  }

  /* Metrics / Usage */
  .si-metric {
    padding: 8px;
    background: white;
    border-radius: var(--si-radius-sm);
    border: 1px solid var(--si-slate-200);
  }

  .si-metric__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .si-metric__name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--si-slate-700);
  }

  .si-metric__value {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-metric__unit {
    font-weight: 400;
    color: var(--si-slate-500);
  }

  .si-metric__reset {
    font-size: 0.6875rem;
    color: var(--si-slate-500);
    margin: 6px 0 0;
  }

  /* Usage Bar */
  .si-usage-bar {
    height: 6px;
    background: var(--si-slate-200);
    border-radius: 3px;
    overflow: hidden;
  }

  .si-usage-bar__fill {
    height: 100%;
    border-radius: 3px;
    transition: width var(--si-transition-base);
  }

  .si-usage-bar__fill--normal {
    background: var(--si-emerald-500);
  }

  .si-usage-bar__fill--warning {
    background: var(--si-amber-500);
  }

  .si-usage-bar__fill--danger {
    background: var(--si-rose-500);
  }

  /* Paid: usage exceeds free limit but operator has already collected.
     Visually settled — calmer green than --normal so the eye reads
     "this is fine" not "approaching limit". */
  .si-usage-bar__fill--paid {
    background: var(--si-emerald-600);
  }

  /* Financial stack — groups This Period + Debt Ledger as one visual
     concern. Tight 12px gap between them, 24px above to separate from
     the identity header. */
  .si-financial-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }

  /* This Period — projection-only billing card.
     Three-row stack: Recurring · Usage · Projected total.
     Total row has a top border to separate from contributions. */
  .si-this-period {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    margin-bottom: 16px;
  }
  .si-this-period__row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
  }
  .si-this-period__row--total {
    padding-top: 12px;
    border-top: 1px solid var(--si-slate-200);
  }
  .si-this-period__label {
    font-size: 0.85rem;
    color: var(--si-slate-600);
  }
  .si-this-period__source {
    color: var(--si-slate-500);
    font-weight: 400;
    font-size: 0.8rem;
  }
  .si-this-period__right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .si-this-period__value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--si-slate-800);
    font-variant-numeric: tabular-nums;
  }
  .si-this-period__value--accent {
    color: var(--si-amber-600);
  }
  .si-this-period__value--estimate {
    color: var(--si-slate-600);
    font-style: italic;
    font-weight: 500;
  }
  .si-this-period__value--muted {
    color: var(--si-slate-400);
    font-weight: 500;
  }
  .si-this-period__value--credit {
    color: var(--si-emerald-600);
    font-weight: 600;
  }
  .si-this-period__value--total {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--si-emerald-600);
    letter-spacing: -0.01em;
  }
  .si-this-period__cycle {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--si-slate-500);
    margin-left: 4px;
  }
  .si-this-period__toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    padding: 6px 0;
    font-size: 0.85rem;
    color: var(--si-slate-600);
    cursor: pointer;
    margin-top: 4px;
  }
  .si-this-period__toggle:hover {
    color: var(--si-slate-800);
  }
  .si-this-period__chevron {
    width: 14px;
    height: 14px;
    transition: transform 0.15s;
  }
  .si-this-period__chevron[data-expanded="true"] {
    transform: rotate(90deg);
  }
  .si-this-period__details {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--si-slate-100);
  }
  .si-panel__subtitle {
    font-size: 0.8rem;
    color: var(--si-slate-500);
    font-weight: 400;
    margin-left: 12px;
  }

  /* Billing Summary */
  .si-billing-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    padding: 16px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    margin-bottom: 20px;
  }

  .si-billing-summary__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .si-billing-summary__item--alert {
    border-left: 3px solid var(--si-rose-500);
    padding-left: 12px;
  }

  .si-billing-summary__label {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .si-billing-summary__value {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-billing-summary__value--success {
    color: var(--si-emerald-600);
  }

  .si-billing-summary__value--warning {
    color: var(--si-amber-600);
  }

  .si-billing-summary__value--danger {
    color: var(--si-rose-600);
  }

  /* Invoice List */
  .si-invoices-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .si-invoice-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 16px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    border: 1px solid var(--si-slate-200);
    cursor: pointer;
    transition: all var(--si-transition-fast);
  }

  .si-invoice-row:hover {
    border-color: var(--si-slate-300);
    background: white;
  }

  .si-invoice-row__main {
    flex: 1;
    min-width: 0;
  }

  .si-invoice-row__id {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .si-invoice-row__number {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-invoice-row__period {
    font-size: 0.75rem;
    color: var(--si-slate-500);
  }

  .si-invoice-row__amounts {
    text-align: right;
  }

  .si-invoice-row__total {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-invoice-row__due {
    font-size: 0.75rem;
    color: var(--si-amber-600);
    font-weight: 500;
  }

  .si-invoice-row__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 100px;
  }

  .si-invoice-row__date {
    font-size: 0.75rem;
    color: var(--si-slate-500);
  }

  .si-invoice-row__items {
    font-size: 0.6875rem;
    color: var(--si-slate-400);
  }

  /* Customer Info */
  .si-customer-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .si-customer-info__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .si-customer-info__section + .si-customer-info__section {
    padding-top: 16px;
    border-top: 1px solid var(--si-slate-100);
  }

  .si-customer-info__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .si-customer-info__label {
    font-size: 0.8125rem;
    color: var(--si-slate-500);
  }

  .si-customer-info__value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-800);
    text-align: right;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .si-customer-info__value--mono {
    font-family: var(--si-font-mono);
    font-size: 0.8125rem;
  }

  .si-customer-info__detail {
    font-weight: 400;
    color: var(--si-slate-500);
  }

  .si-customer-info__verified {
    width: 16px;
    height: 16px;
    color: var(--si-emerald-500);
  }

  /* Operator Notes */
  .si-operator-notes {
    background: var(--si-amber-50);
    border-radius: var(--si-radius-lg);
    padding: 16px;
    border: 1px solid var(--si-amber-100);
  }

  .si-operator-notes__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .si-operator-notes__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-amber-700);
    margin: 0;
  }

  .si-operator-notes__icon {
    width: 16px;
    height: 16px;
  }

  .si-operator-notes__content {
    padding: 0;
  }

  .si-operator-notes__text {
    font-size: 0.875rem;
    color: var(--si-slate-700);
    line-height: 1.6;
    margin: 0;
    white-space: pre-wrap;
  }

  .si-operator-notes__empty {
    font-size: 0.875rem;
    color: var(--si-slate-500);
    font-style: italic;
    margin: 0;
  }

  .si-operator-notes__edit {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .si-operator-notes__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /* Buttons */
  .si-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 16px;
    font-family: var(--si-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--si-radius-md);
    border: none;
    cursor: pointer;
    transition: all var(--si-transition-fast);
  }

  .si-btn--sm {
    padding: 6px 12px;
    font-size: 0.8125rem;
  }

  .si-btn--primary {
    background: var(--si-violet-600);
    color: white;
  }

  .si-btn--primary:hover {
    background: var(--si-violet-700);
  }

  .si-btn--ghost {
    background: transparent;
    color: var(--si-slate-600);
  }

  .si-btn--ghost:hover {
    background: var(--si-slate-100);
    color: var(--si-slate-800);
  }

  .si-btn--secondary {
    background: var(--si-slate-100);
    color: var(--si-slate-700);
    border: 1px solid var(--si-slate-200);
  }

  .si-btn--secondary:hover {
    background: var(--si-slate-200);
    border-color: var(--si-slate-300);
  }

  .si-btn__icon {
    width: 18px;
    height: 18px;
  }

  /* Input */
  .si-input {
    width: 100%;
    padding: 10px 12px;
    font-family: var(--si-font-sans);
    font-size: 0.875rem;
    color: var(--si-slate-800);
    background: white;
    border: 1px solid var(--si-slate-300);
    border-radius: var(--si-radius-md);
    transition: all var(--si-transition-fast);
  }

  .si-input:focus {
    outline: none;
    border-color: var(--si-violet-500);
    box-shadow: 0 0 0 3px var(--si-violet-100);
  }

  .si-input--textarea {
    resize: vertical;
    min-height: 80px;
  }

  .si-input--center {
    text-align: center;
  }

  .si-input--mono {
    font-family: var(--si-font-mono);
    font-size: 0.8125rem;
  }

  .si-input--with-prefix {
    padding-left: 56px;
  }

  .si-input-group {
    position: relative;
  }

  .si-input-group__prefix {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-500);
  }

  /* Select */
  .si-select {
    width: 100%;
    padding: 10px 12px;
    font-family: var(--si-font-sans);
    font-size: 0.875rem;
    color: var(--si-slate-800);
    background: white;
    border: 1px solid var(--si-slate-300);
    border-radius: var(--si-radius-md);
    cursor: pointer;
    transition: all var(--si-transition-fast);
  }

  .si-select:focus {
    outline: none;
    border-color: var(--si-violet-500);
    box-shadow: 0 0 0 3px var(--si-violet-100);
  }

  /* Form Elements */
  .si-form-group {
    margin-bottom: 16px;
  }

  .si-form-group:last-child {
    margin-bottom: 0;
  }

  .si-form-label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--si-slate-700);
    margin-bottom: 6px;
  }

  .si-form-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: var(--si-slate-700);
  }

  .si-form-checkbox input {
    width: 16px;
    height: 16px;
    accent-color: var(--si-violet-600);
  }

  .si-form-summary {
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    padding: 16px;
    margin-bottom: 20px;
  }

  .si-form-summary__row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    padding: 4px 0;
  }

  .si-form-summary__row--highlight {
    font-weight: 600;
    padding-top: 8px;
    margin-top: 8px;
    border-top: 1px solid var(--si-slate-200);
  }

  .si-form-summary__success {
    color: var(--si-emerald-600);
  }

  /* Modal */
  .si-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 24px;
  }

  .si-modal {
    background: white;
    border-radius: var(--si-radius-lg);
    box-shadow: var(--si-shadow-lg);
    max-width: 400px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .si-modal--md {
    max-width: 560px;
  }

  /* Settlement preview block — used in the Settle Cycle modal so the
     operator sees what the reducer will do before clicking Confirm. */
  .si-settle-preview__section {
    padding: 12px 0;
    border-top: 1px solid var(--si-slate-100);
  }
  .si-settle-preview__section:first-of-type {
    border-top: none;
  }
  .si-settle-preview__step {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .si-settle-preview__step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--si-slate-100);
    color: var(--si-slate-700);
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
  }
  .si-settle-preview__step-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }
  .si-settle-preview__list {
    list-style: none;
    padding: 0;
    margin: 0 0 6px 32px;
  }
  .si-settle-preview__list-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 0.8rem;
    color: var(--si-slate-700);
  }
  .si-settle-preview__list-item--subtotal {
    border-top: 1px solid var(--si-slate-200);
    padding-top: 8px;
    margin-top: 4px;
    font-weight: 500;
  }
  .si-settle-preview__list-item--credit {
    color: var(--si-emerald-700);
  }
  .si-settle-preview__list-item--total {
    border-top: 1px solid var(--si-slate-300);
    padding-top: 8px;
    margin-top: 4px;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--si-slate-900);
  }
  .si-settle-preview__amount {
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }
  .si-settle-preview__detail {
    margin: 0 0 0 32px;
    font-size: 0.78rem;
    color: var(--si-slate-600);
    line-height: 1.5;
  }
  .si-settle-preview__detail--empty {
    color: var(--si-slate-500);
    font-style: italic;
  }
  .si-settle-preview__warning {
    color: var(--si-amber-600);
    font-weight: 500;
  }

  .si-modal--sm {
    max-width: 360px;
  }

  .si-modal__header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--si-slate-200);
  }

  .si-modal__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--si-slate-900);
    margin: 0;
  }

  .si-modal__subtitle {
    font-size: 0.875rem;
    color: var(--si-slate-500);
    margin-top: 4px;
    display: block;
  }

  .si-modal__body {
    padding: 20px 24px;
  }

  .si-modal__message {
    font-size: 0.875rem;
    color: var(--si-slate-600);
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .si-modal__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid var(--si-slate-200);
    background: var(--si-slate-50);
    border-radius: 0 0 var(--si-radius-lg) var(--si-radius-lg);
  }

  /* Actions Section */
  .si-header__actions-section {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid var(--si-slate-100);
  }

  .si-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }

  .si-actions__row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .si-actions__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-700);
  }

  .si-actions__buttons {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }

  /* Toggle Switch */
  .si-toggle {
    width: 44px;
    height: 24px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  .si-toggle__track {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--si-slate-300);
    border-radius: 12px;
    position: relative;
    transition: background var(--si-transition-fast);
  }

  .si-toggle--active .si-toggle__track {
    background: var(--si-emerald-500);
  }

  .si-toggle__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    box-shadow: var(--si-shadow-sm);
    transition: transform var(--si-transition-fast);
  }

  .si-toggle--active .si-toggle__thumb {
    transform: translateX(20px);
  }

  /* Additional Button Variants */
  .si-btn--success {
    background: var(--si-emerald-500);
    color: white;
  }

  .si-btn--success:hover {
    background: var(--si-emerald-600);
  }

  .si-btn--warning {
    background: var(--si-amber-500);
    color: white;
  }

  .si-btn--warning:hover {
    background: var(--si-amber-600);
  }

  .si-btn--danger {
    background: var(--si-rose-500);
    color: white;
  }

  .si-btn--danger:hover {
    background: var(--si-rose-600);
  }

  .si-btn--danger-ghost {
    background: transparent;
    color: var(--si-rose-600);
  }

  .si-btn--danger-ghost:hover {
    background: var(--si-rose-50);
    color: var(--si-rose-700);
  }

  /* Metric Actions */
  .si-metric__body {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .si-metric__body .si-usage-bar {
    flex: 1;
  }

  .si-metric-actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .si-metric-btn {
    width: 24px;
    height: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--si-slate-100);
    border: 1px solid var(--si-slate-200);
    border-radius: 4px;
    color: var(--si-slate-600);
    cursor: pointer;
    transition: all var(--si-transition-fast);
  }

  .si-metric-btn:hover {
    background: var(--si-slate-200);
    color: var(--si-slate-800);
  }

  .si-metric-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .si-metric-btn svg {
    width: 14px;
    height: 14px;
  }

  .si-metric-btn--plus:hover {
    background: var(--si-emerald-100);
    border-color: var(--si-emerald-200);
    color: var(--si-emerald-700);
  }

  .si-metric-btn--minus:hover {
    background: var(--si-rose-100);
    border-color: var(--si-rose-200);
    color: var(--si-rose-700);
  }

  .si-metric-btn--verify:hover {
    background: var(--si-emerald-100);
    border-color: var(--si-emerald-200);
    color: var(--si-emerald-700);
  }

  .si-metric-adjust-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8125rem;
    color: var(--si-slate-500);
    margin-bottom: 16px;
  }

  .si-metric-adjust-preview {
    font-size: 0.875rem;
    color: var(--si-slate-600);
    text-align: center;
    padding: 12px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    margin-top: 16px;
  }

  /* Communication Channels */
  .si-channels-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .si-channel {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    border: 1px solid var(--si-slate-200);
  }

  .si-channel--primary {
    background: var(--si-violet-50);
    border-color: var(--si-violet-200);
  }

  .si-channel__icon {
    width: 24px;
    height: 24px;
    color: var(--si-slate-500);
    flex-shrink: 0;
  }

  .si-channel__icon svg {
    width: 100%;
    height: 100%;
  }

  .si-channel--primary .si-channel__icon {
    color: var(--si-violet-600);
  }

  .si-channel__info {
    flex: 1;
    min-width: 0;
  }

  .si-channel__identifier {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-800);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .si-channel__type {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--si-slate-500);
  }

  .si-channel__badge {
    display: inline-flex;
    padding: 2px 6px;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    background: var(--si-violet-100);
    color: var(--si-violet-700);
    border-radius: 4px;
  }

  .si-channel__verified {
    width: 14px;
    height: 14px;
    color: var(--si-emerald-500);
  }

  .si-channel__actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .si-channel-btn {
    width: 28px;
    height: 28px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--si-slate-400);
    cursor: pointer;
    transition: all var(--si-transition-fast);
  }

  .si-channel-btn:hover {
    background: var(--si-slate-200);
    color: var(--si-slate-700);
  }

  .si-channel-btn svg {
    width: 16px;
    height: 16px;
  }

  .si-channel-btn--verify:hover {
    background: var(--si-emerald-100);
    color: var(--si-emerald-700);
  }

  .si-channel-btn--remove:hover {
    background: var(--si-rose-100);
    color: var(--si-rose-700);
  }

  /* Empty states */
  .si-empty--sm {
    padding: 16px;
  }

  .si-empty--sm .si-empty__text {
    font-size: 0.8125rem;
  }

  /* Button size variants */
  .si-btn--xs {
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  /* Panel badge */
  .si-panel__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    font-size: 0.6875rem;
    font-weight: 600;
    border-radius: 10px;
    margin-left: 8px;
  }

  .si-panel__badge--warning {
    background: var(--si-amber-100);
    color: var(--si-amber-700);
  }

  .si-panel__empty {
    font-size: 0.875rem;
    color: var(--si-slate-500);
    text-align: center;
    padding: 16px;
    margin: 0;
  }

  /* Client Requests */
  .si-requests-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .si-requests-list--compact {
    gap: 8px;
  }

  .si-request-card {
    background: var(--si-slate-50);
    border: 1px solid var(--si-slate-200);
    border-radius: var(--si-radius-md);
    padding: 12px;
  }

  .si-request-card--processed {
    opacity: 0.7;
  }

  .si-request-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .si-request-card__type {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-request-card__status {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .si-request-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--si-slate-500);
    margin-bottom: 8px;
  }

  .si-request-card__info {
    color: var(--si-slate-600);
  }

  .si-request-card__time {
    color: var(--si-slate-400);
  }

  .si-request-card__reason {
    font-size: 0.8125rem;
    color: var(--si-slate-600);
    background: white;
    padding: 8px;
    border-radius: var(--si-radius-sm);
    margin: 8px 0;
  }

  .si-request-card__response {
    font-size: 0.8125rem;
    color: var(--si-slate-600);
    font-style: italic;
    margin: 4px 0 0;
  }

  .si-request-card__actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--si-slate-200);
  }

  .si-requests-history {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--si-slate-200);
  }

  .si-requests-history__title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--si-slate-500);
    margin: 0 0 12px;
  }

  /* Request Details in Modal */
  .si-request-details {
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    padding: 12px;
    margin-bottom: 16px;
  }

  .si-request-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid var(--si-slate-200);
  }

  .si-request-detail:last-child {
    border-bottom: none;
  }

  .si-request-detail__label {
    font-size: 0.8125rem;
    color: var(--si-slate-500);
  }

  .si-request-detail__value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-slate-800);
  }

  /* Pending Actions in Client View */
  .si-actions__pending-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    font-size: 0.8125rem;
    font-weight: 500;
    background: var(--si-amber-100);
    color: var(--si-amber-700);
    border-radius: var(--si-radius-md);
  }

  .si-actions__pending-badge--danger {
    background: var(--si-rose-100);
    color: var(--si-rose-700);
  }

  .si-actions__pending-list {
    width: 100%;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--si-slate-200);
  }

  .si-actions__pending-title {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--si-slate-500);
    margin-bottom: 12px;
  }

  .si-actions__pending-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--si-amber-50);
    border: 1px solid var(--si-amber-100);
    border-radius: var(--si-radius-md);
    margin-bottom: 8px;
  }

  .si-actions__pending-item:last-child {
    margin-bottom: 0;
  }

  .si-actions__pending-type {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--si-amber-700);
  }

  /* Client Metric Request Button */
  .si-metric-actions--client {
    margin-left: auto;
  }

  .si-metric-btn--request {
    background: var(--si-violet-100);
    border-color: var(--si-violet-200);
    color: var(--si-violet-600);
  }

  .si-metric-btn--request:hover {
    background: var(--si-violet-200);
    border-color: var(--si-violet-300);
    color: var(--si-violet-700);
  }

  /* Service Card Actions (Client) */
  .si-service-card__actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--si-slate-200);
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .si-service-card__header-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  /* Customer Info Field Editing */
  .si-customer-info__edit-wallet,
  .si-customer-info__edit-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .si-customer-info__edit-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .si-customer-info__type-edit {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .si-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    padding-right: 32px;
    cursor: pointer;
  }

  .si-input--number {
    width: 80px;
  }

  .si-customer-info__edit-btn {
    width: 20px;
    height: 20px;
    padding: 0;
    background: transparent;
    border: none;
    color: var(--si-slate-400);
    cursor: pointer;
    transition: color var(--si-transition-fast);
    margin-left: 8px;
  }

  .si-customer-info__edit-btn:hover {
    color: var(--si-violet-600);
  }

  .si-customer-info__edit-btn svg {
    width: 100%;
    height: 100%;
  }

  .si-customer-info__value--empty {
    color: var(--si-slate-400);
    font-style: italic;
  }

  .si-input--sm {
    padding: 6px 10px;
    font-size: 0.8125rem;
  }

  /* Issuer Info */
  .si-issuer-info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    margin-bottom: 16px;
    align-items: center;
  }

  .si-issuer-info__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--si-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .si-issuer-info__details {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  .si-issuer-info__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-issuer-info__email {
    font-size: 0.8125rem;
    color: var(--si-slate-600);
  }

  .si-issuer-info__wallet {
    font-size: 0.8125rem;
    font-family: var(--si-font-mono);
    color: var(--si-violet-600);
    background: var(--si-violet-50);
    padding: 2px 8px;
    border-radius: 4px;
  }

  /* Invoice Row Actions */
  .si-invoice-row__actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .si-invoice-row {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .si-invoice-row__actions {
      width: 100%;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--si-slate-200);
      justify-content: flex-end;
    }
  }

  /* Import Service Config Styles */
  .si-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--si-slate-300);
    border-radius: var(--si-radius-md);
    font-family: inherit;
    font-size: 0.875rem;
    line-height: 1.5;
    resize: vertical;
    transition: border-color var(--si-transition-fast), box-shadow var(--si-transition-fast);
  }

  .si-textarea:focus {
    outline: none;
    border-color: var(--si-violet-400);
    box-shadow: 0 0 0 3px var(--si-violet-100);
  }

  .si-alert {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border-radius: var(--si-radius-md);
    margin-top: 12px;
  }

  .si-alert--error {
    background: var(--si-rose-50);
    border: 1px solid var(--si-rose-200);
    color: var(--si-rose-700);
  }

  .si-alert__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .si-import-help {
    margin-top: 16px;
    padding: 16px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
  }

  .si-import-help__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-700);
    margin: 0 0 12px 0;
  }

  .si-import-help__steps {
    margin: 0;
    padding-left: 20px;
    font-size: 0.8125rem;
    color: var(--si-slate-600);
    line-height: 1.6;
  }

  .si-import-help__steps li {
    margin-bottom: 4px;
  }

  .si-import-preview {
    background: var(--si-slate-50);
    border-radius: var(--si-radius-md);
    padding: 16px;
  }

  .si-import-preview__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--si-slate-200);
  }

  .si-import-preview__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--si-slate-800);
    margin: 0;
  }

  .si-import-preview__count {
    font-size: 0.8125rem;
    color: var(--si-slate-500);
  }

  .si-tier-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .si-tier-option {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    background: white;
    border: 2px solid var(--si-slate-200);
    border-radius: var(--si-radius-md);
    cursor: pointer;
    transition: border-color var(--si-transition-fast), background var(--si-transition-fast);
  }

  .si-tier-option:hover {
    border-color: var(--si-violet-300);
    background: var(--si-violet-50);
  }

  .si-tier-option--selected {
    border-color: var(--si-violet-500);
    background: var(--si-violet-50);
  }

  .si-tier-option__radio {
    margin-top: 2px;
    accent-color: var(--si-violet-600);
  }

  .si-tier-option__content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .si-tier-option__name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-tier-option__desc {
    font-size: 0.8125rem;
    color: var(--si-slate-600);
  }

  .si-tier-option__meta {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    margin-top: 4px;
  }

  .si-import-summary {
    margin-top: 16px;
    padding: 12px 16px;
    background: white;
    border-radius: var(--si-radius-md);
    border: 1px solid var(--si-slate-200);
  }

  .si-import-summary__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-700);
    margin: 0 0 8px 0;
  }

  .si-import-summary__list {
    margin: 0;
    padding-left: 20px;
    font-size: 0.8125rem;
    color: var(--si-slate-600);
  }

  .si-import-summary__list li {
    margin-bottom: 4px;
  }

  .si-import-summary__list strong {
    color: var(--si-slate-800);
  }

  .si-import-summary__metrics {
    color: var(--si-slate-500);
  }

  .si-import-note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 12px 0 0;
    padding: 10px 12px;
    background: var(--si-amber-50);
    border-radius: var(--si-radius-sm);
    font-size: 0.8125rem;
    color: var(--si-amber-800);
  }

  .si-import-note__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--si-amber-600);
  }

  .si-modal--lg {
    max-width: 600px;
    width: 90vw;
  }

  /* Overage Preview (in limit increase modal) */
  .si-overage-preview {
    background: var(--si-amber-50);
    border: 1px solid var(--si-amber-100);
    border-radius: var(--si-radius-md);
    padding: 12px;
    margin-bottom: 16px;
  }

  .si-overage-preview__title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--si-amber-600);
    margin-bottom: 8px;
  }

  .si-overage-preview__row {
    display: flex;
    justify-content: space-between;
    font-size: 0.8125rem;
    color: var(--si-slate-600);
    padding: 4px 0;
  }

  .si-overage-preview__row--total {
    font-weight: 600;
    color: var(--si-amber-700);
    padding-top: 8px;
    margin-top: 4px;
    border-top: 1px solid var(--si-amber-200);
  }

  .si-overage-preview__warning {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--si-rose-600);
    margin-top: 8px;
    padding: 6px 8px;
    background: var(--si-rose-50);
    border-radius: var(--si-radius-sm);
  }

  /* Metric Pending Tag */
  .si-metric-pending-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: var(--si-amber-100);
    color: var(--si-amber-700);
    border-radius: 4px;
  }

  /* Metric Limit Highlight (modal) */
  .si-metric-limit-highlight {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 10px 12px;
    background: var(--si-slate-50);
    border: 1px solid var(--si-slate-200);
    border-radius: var(--si-radius);
    text-align: center;
  }

  .si-metric-limit-highlight__label {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--si-slate-500);
  }

  .si-metric-limit-highlight__value {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--si-slate-800);
  }

  .si-metric-limit-highlight__note {
    font-size: 0.6875rem;
    color: var(--si-slate-400);
    font-style: italic;
  }

  .si-metric-adjust-info--cost {
    background: var(--si-blue-50);
    border: 1px solid var(--si-blue-100);
    border-radius: var(--si-radius-sm);
    padding: 6px 10px;
    color: var(--si-blue-700);
    font-size: 0.75rem;
  }

  /* Metric Overage Indicator */
  .si-metric__overage {
    font-size: 0.6875rem;
    color: var(--si-amber-700);
    background: var(--si-amber-50);
    border: 1px solid var(--si-amber-100);
    border-radius: var(--si-radius-sm);
    padding: 4px 8px;
    margin-top: 6px;
  }

  .si-metric__overage strong {
    color: var(--si-amber-800);
  }

  .si-metric__overage--paid {
    color: var(--si-emerald-700);
    background: var(--si-emerald-50);
    border-color: var(--si-emerald-100);
  }

  /* Metric Paid Limit */
  .si-metric__paid-limit {
    font-size: 0.6875rem;
    color: var(--si-slate-500);
    margin-top: 4px;
  }

  /* Metric Reset Period */
  .si-metric__reset-period {
    font-weight: 500;
    text-transform: capitalize;
  }

  /* Countdown in header stats */
  .si-header__stat-countdown {
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--si-slate-500);
  }

  /* Billing Section CSS (replaces inline styles) */
  .si-billing-section {
    margin-bottom: 16px;
  }

  .si-billing-section:last-child {
    margin-bottom: 0;
  }

  .si-billing-section__title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--si-slate-500);
    margin-bottom: 8px;
  }

  .si-billing-section__title--setup {
    color: var(--si-violet-600);
    display: flex;
    justify-content: space-between;
  }

  .si-billing-section__title--overage {
    color: var(--si-amber-600);
  }

  .si-billing-section__total {
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .si-billing-section__lines {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .si-billing-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-sm);
    font-size: 0.875rem;
  }

  .si-billing-line--setup {
    background: var(--si-violet-50);
    border: 1px solid var(--si-violet-100);
  }

  .si-billing-line--overage {
    background: var(--si-amber-50);
    border: 1px solid var(--si-amber-100);
  }

  .si-billing-line__name {
    color: var(--si-slate-700);
  }

  .si-billing-line__name--overage {
    color: var(--si-amber-700);
  }

  .si-billing-line__cycle {
    color: var(--si-slate-400);
    font-size: 0.75rem;
    margin-left: 6px;
  }

  .si-billing-line__calc {
    color: var(--si-amber-500);
    font-size: 0.75rem;
    margin-left: 6px;
  }

  .si-billing-line__amount {
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-billing-line__amount--setup {
    color: var(--si-violet-700);
  }

  .si-billing-line__amount--overage {
    color: var(--si-amber-700);
  }

  .si-billing-line__amount--paid {
    color: var(--si-slate-500);
    text-decoration: line-through;
  }

  .si-billing-line__right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .si-billing-line__paid-tag {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--si-emerald-600);
    text-transform: uppercase;
  }

  /* ─── Billing Projection: New Structure (SI-R3/R5/R7) ─── */

  .si-billing-disclaimer {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    font-style: italic;
    margin: 8px 0 16px;
    padding: 0;
  }

  .si-billing-section-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .si-billing-section-label__text {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--si-slate-500);
  }

  .si-billing-section-label__total {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--si-slate-700);
  }

  /* Section subtotal row (below line items) */
  .si-billing-section-subtotal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding: 8px 12px;
    border-top: 1px dashed var(--si-slate-200);
  }

  .si-billing-section-subtotal__label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--si-slate-600);
  }

  .si-billing-section-subtotal__amount {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--si-slate-800);
  }

  /* Service group row in billing */
  .si-billing-group {
    margin-bottom: 4px;
  }

  .si-billing-group__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: var(--si-slate-50);
    border-radius: var(--si-radius-sm);
    border: 1px solid var(--si-slate-200);
  }

  .si-billing-group__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-billing-group__amount-block {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .si-billing-group__original {
    font-size: 0.8125rem;
    color: var(--si-slate-400);
    text-decoration: line-through;
  }

  .si-billing-group__discount-badge {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--si-emerald-700);
    background: var(--si-emerald-100);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .si-billing-group__amount {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  /* Group metrics in dynamic section */
  .si-billing-group-metrics {
    margin-bottom: 8px;
  }

  .si-billing-group-metrics__header {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--si-slate-500);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
    padding-left: 4px;
  }

  /* Metric line item */
  .si-billing-metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px 8px 20px;
    background: var(--si-amber-50);
    border: 1px solid var(--si-amber-100);
    border-radius: var(--si-radius-sm);
    margin-bottom: 4px;
  }

  .si-billing-metric__info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .si-billing-metric__name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--si-amber-700);
  }

  .si-billing-metric__usage {
    font-size: 0.75rem;
    color: var(--si-slate-500);
  }

  .si-billing-metric__right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .si-billing-metric__calc {
    font-size: 0.75rem;
    color: var(--si-amber-500);
  }

  .si-billing-metric__projection {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-amber-700);
  }

  /* Total row */
  .si-billing-total {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 2px solid var(--si-slate-200);
  }

  .si-billing-total__breakdown {
    text-align: right;
    margin-bottom: 4px;
  }

  .si-billing-total__detail {
    font-size: 0.75rem;
    color: var(--si-slate-500);
  }

  .si-billing-total__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .si-billing-total__label {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--si-slate-800);
  }

  .si-billing-total__amount {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--si-emerald-600);
  }

  .si-billing-total__cycle {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--si-slate-500);
    margin-left: 4px;
  }

  /* ─── Setup costs collapsible (SI-R4) ─── */

  .si-billing-setup {
    margin-top: 16px;
    border-top: 1px solid var(--si-slate-200);
    padding-top: 12px;
  }

  .si-billing-setup__toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    background: var(--si-violet-50);
    border: 1px solid var(--si-violet-100);
    border-radius: var(--si-radius-md);
    cursor: pointer;
    font-family: var(--si-font-sans);
    font-size: 0.875rem;
    color: var(--si-violet-700);
    transition: background var(--si-transition-fast);
  }

  .si-billing-setup__toggle:hover {
    background: var(--si-violet-100);
  }

  .si-billing-setup__toggle-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .si-billing-setup__chevron {
    width: 16px;
    height: 16px;
    transition: transform var(--si-transition-fast);
  }

  .si-billing-setup__chevron[data-expanded="true"] {
    transform: rotate(90deg);
  }

  .si-billing-setup__count {
    font-size: 0.75rem;
    color: var(--si-slate-500);
  }

  .si-billing-setup__unpaid {
    color: var(--si-amber-600);
    font-weight: 500;
  }

  .si-billing-setup__total {
    font-weight: 600;
    color: var(--si-violet-700);
  }

  .si-billing-setup__content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  /* ─── Service group pricing in ServicesPanel ─── */

  .si-service-group__price {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--si-emerald-600);
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .si-service-group__original-price {
    font-size: 0.8125rem;
    color: var(--si-slate-400);
    text-decoration: line-through;
  }

  .si-service-group__discount-badge {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--si-emerald-700);
    background: var(--si-emerald-100);
    padding: 1px 6px;
    border-radius: 4px;
  }

  /* ─── Free limit marker in usage bar ─── */

  .si-usage-bar {
    position: relative;
  }

  .si-usage-bar__free-marker {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 2px;
    background: var(--si-emerald-500);
    border-radius: 1px;
    z-index: 1;
  }

  /* ─── SI-R8: Subtle operator edit icon ─── */

  .si-metric-btn--edit {
    width: 24px;
    height: 24px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--si-slate-400);
    cursor: pointer;
    transition: all var(--si-transition-fast);
    opacity: 0.5;
  }

  .si-metric-btn--edit:hover {
    opacity: 1;
    background: var(--si-slate-100);
    border-color: var(--si-slate-200);
    color: var(--si-violet-600);
  }

  .si-metric-btn--edit svg {
    width: 14px;
    height: 14px;
  }

  /* ─── Simulated clock (operator test tool) ─── */
  .si-clock {
    background: var(--si-slate-50);
    border: 1px solid var(--si-slate-200);
    border-radius: var(--si-radius-md);
    padding: 12px 16px;
    margin-bottom: 16px;
  }

  .si-clock--active {
    background: var(--si-amber-50);
    border-color: var(--si-amber-100);
  }

  .si-clock__header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .si-clock__label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--si-slate-600);
  }

  .si-clock--active .si-clock__label {
    color: var(--si-amber-700);
  }

  .si-clock__warn-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 6px;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    background: var(--si-amber-500);
    color: white;
    border-radius: 4px;
  }

  .si-clock__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .si-clock__date {
    flex: 0 1 220px;
    min-width: 200px;
  }

  .si-clock__quick {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .si-clock__hint {
    font-size: 0.75rem;
    color: var(--si-slate-500);
    margin: 8px 0 0;
    font-style: italic;
  }
`;
