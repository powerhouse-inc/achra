import { useState, useCallback } from "react";
import { generateId } from "document-model";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type { SubscriptionInstanceAction } from "document-models/subscription-instance";
import type {
  ServiceMetric,
  MetricType,
  AccrualCycle,
} from "../../../document-models/subscription-instance/v1/gen/schema/types.js";
import {
  updateMetric,
  updateMetricUsage,
} from "../../../document-models/subscription-instance/v1/gen/metrics/creators.js";
import { useNowISO } from "./SimulatedClock.js";

interface MetricActionsProps {
  serviceId: string;
  metric: ServiceMetric;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  isOperator: boolean;
  customerName?: string | null;
}

export function MetricActions({
  serviceId,
  metric,
  dispatch,
  isOperator,
}: MetricActionsProps) {
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustAmount, setAdjustAmount] = useState("1");
  const nowISO = useNowISO();

  const isAdjustment = metric.metricType === "NON_CUMULATIVE";

  const dispatchAbsoluteUsage = useCallback(
    (newUsage: number) => {
      dispatch(
        updateMetricUsage({
          serviceId,
          metricId: metric.id,
          currentTime: nowISO(),
          currentUsage: Math.max(0, newUsage),
          isAdjustment,
          newSliceId: generateId(),
        }),
      );
    },
    [dispatch, serviceId, metric.id, isAdjustment, nowISO],
  );

  const handleIncrement = useCallback(
    (amount: number = 1) => {
      dispatchAbsoluteUsage(metric.currentUsage + amount);
    },
    [dispatchAbsoluteUsage, metric.currentUsage],
  );

  const handleDecrement = useCallback(
    (amount: number = 1) => {
      dispatchAbsoluteUsage(metric.currentUsage - amount);
    },
    [dispatchAbsoluteUsage, metric.currentUsage],
  );

  const handleAdjust = useCallback(() => {
    const amount = parseInt(adjustAmount, 10);
    if (isNaN(amount) || amount === 0) return;
    dispatchAbsoluteUsage(metric.currentUsage + amount);
    setShowAdjustModal(false);
    setAdjustAmount("1");
  }, [adjustAmount, dispatchAbsoluteUsage, metric.currentUsage]);

  // Client request functionality removed - no longer supported
  // const handleRequestLimitIncrease = useCallback(() => { ... }, [...]);

  // SI-R8: Operator view mirrors client with subtle edit affordance
  if (isOperator) {
    return (
      <>
        <div className="si-metric-actions">
          <button
            type="button"
            className="si-metric-btn si-metric-btn--edit"
            onClick={() => setShowAdjustModal(true)}
            aria-label={`Edit ${metric.name} usage`}
            title="Adjust usage"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>

        {/* Operator Adjust Modal */}
        {showAdjustModal && (
          <div
            className="si-modal-overlay"
            onClick={() => setShowAdjustModal(false)}
          >
            <div
              className="si-modal si-modal--sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="si-modal__header">
                <h3 className="si-modal__title">Adjust Usage</h3>
                <span className="si-modal__subtitle">{metric.name}</span>
              </div>
              <div className="si-modal__body">
                <div className="si-metric-adjust-info">
                  <span>Current: {metric.currentUsage.toLocaleString()}</span>
                  {metric.paidLimit != null && (
                    <span>Limit: {metric.paidLimit.toLocaleString()}</span>
                  )}
                </div>
                {/* Quick +/- buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <button
                    type="button"
                    className="si-btn si-btn--sm si-btn--ghost"
                    onClick={() => {
                      handleDecrement(1);
                      setShowAdjustModal(false);
                    }}
                    disabled={metric.currentUsage <= 0}
                  >
                    -1
                  </button>
                  <button
                    type="button"
                    className="si-btn si-btn--sm si-btn--ghost"
                    onClick={() => {
                      handleIncrement(1);
                      setShowAdjustModal(false);
                    }}
                  >
                    +1
                  </button>
                </div>
                <div className="si-form-group">
                  <label className="si-form-label" htmlFor="adjust-amount">
                    Custom Adjustment (+ or -)
                  </label>
                  <input
                    id="adjust-amount"
                    type="number"
                    className="si-input si-input--center"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="si-metric-adjust-preview">
                  New value:{" "}
                  <strong>
                    {Math.max(
                      0,
                      metric.currentUsage + (parseInt(adjustAmount, 10) || 0),
                    ).toLocaleString()}
                  </strong>{" "}
                  {metric.unitName}
                </div>
              </div>
              <div className="si-modal__footer">
                <button
                  type="button"
                  className="si-btn si-btn--ghost"
                  onClick={() => setShowAdjustModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="si-btn si-btn--primary"
                  onClick={handleAdjust}
                  disabled={!adjustAmount || parseInt(adjustAmount, 10) === 0}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Client view - no direct actions
  return null;
}

interface UpdateMetricLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  metric: ServiceMetric;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
}

export function UpdateMetricLimitModal({
  isOpen,
  onClose,
  serviceId,
  metric,
  dispatch,
}: UpdateMetricLimitModalProps) {
  const [limit, setLimit] = useState(metric.paidLimit?.toString() || "");
  const [metricType, setMetricTypeValue] = useState<MetricType>(
    metric.metricType || "NON_CUMULATIVE",
  );
  const [accrualCycle, setAccrualCycleValue] = useState<AccrualCycle>(
    metric.accrualCycle || "MONTHLY",
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const parsedLimit = limit ? parseInt(limit, 10) : null;

      dispatch(
        updateMetric({
          serviceId,
          metricId: metric.id,
          paidLimit: parsedLimit,
          metricType,
          accrualCycle,
        }),
      );

      onClose();
    },
    [limit, serviceId, metric.id, metricType, accrualCycle, dispatch, onClose],
  );

  if (!isOpen) return null;

  return (
    <div className="si-modal-overlay" onClick={onClose}>
      <div
        className="si-modal si-modal--sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="si-modal__header">
          <h3 className="si-modal__title">Update Metric</h3>
          <span className="si-modal__subtitle">{metric.name}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="si-modal__body">
            <div className="si-form-group">
              <label className="si-form-label" htmlFor="metric-limit">
                Paid Limit ({metric.unitName})
              </label>
              <input
                id="metric-limit"
                type="number"
                className="si-input"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="Leave empty for unlimited"
                min="0"
              />
            </div>
            <div className="si-form-group">
              <label className="si-form-label" htmlFor="metric-type">
                Metric Type
              </label>
              <select
                id="metric-type"
                className="si-input"
                value={metricType}
                onChange={(e) =>
                  setMetricTypeValue(e.target.value as MetricType)
                }
              >
                <option value="NON_CUMULATIVE">
                  Non-cumulative (persists across cycles)
                </option>
                <option value="CUMULATIVE">
                  Cumulative (resets to 0 on settle)
                </option>
              </select>
            </div>
            <div className="si-form-group">
              <label className="si-form-label" htmlFor="metric-accrual-cycle">
                Accrual Cycle
              </label>
              <select
                id="metric-accrual-cycle"
                className="si-input"
                value={accrualCycle}
                onChange={(e) =>
                  setAccrualCycleValue(e.target.value as AccrualCycle)
                }
              >
                <option value="HOURLY">Hourly</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
                <option value="SEMI_ANNUAL">Semi-annual</option>
                <option value="ANNUAL">Annual</option>
              </select>
            </div>
          </div>
          <div className="si-modal__footer">
            <button
              type="button"
              className="si-btn si-btn--ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="si-btn si-btn--primary">
              Update Metric
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
