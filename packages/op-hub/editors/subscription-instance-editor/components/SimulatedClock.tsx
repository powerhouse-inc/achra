import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SimulatedClockContextValue {
  // null = follow real time. ISO string = override.
  simulatedNow: string | null;
  setSimulatedNow: (iso: string | null) => void;
  // Always returns the moment the editor should treat as "now" — sim time if set, else real time.
  nowISO: () => string;
}

const SimulatedClockContext = createContext<SimulatedClockContextValue | null>(
  null,
);

export function SimulatedClockProvider({ children }: { children: ReactNode }) {
  const [simulatedNow, setSimulatedNow] = useState<string | null>(null);

  const nowISO = useCallback(() => {
    if (simulatedNow) return simulatedNow;
    return new Date().toISOString();
  }, [simulatedNow]);

  const value = useMemo<SimulatedClockContextValue>(
    () => ({ simulatedNow, setSimulatedNow, nowISO }),
    [simulatedNow, nowISO],
  );

  return (
    <SimulatedClockContext.Provider value={value}>
      {children}
    </SimulatedClockContext.Provider>
  );
}

export function useSimulatedClock(): SimulatedClockContextValue {
  const ctx = useContext(SimulatedClockContext);
  if (!ctx) {
    // Fallback: outside provider, behave as real-time.
    return {
      simulatedNow: null,
      setSimulatedNow: () => undefined,
      nowISO: () => new Date().toISOString(),
    };
  }
  return ctx;
}

// Return only the `nowISO` function so call sites stay terse: `const nowISO = useNowISO();`
export function useNowISO(): () => string {
  return useSimulatedClock().nowISO;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function toLocalInputValue(iso: string): string {
  // <input type="datetime-local"> wants `YYYY-MM-DDTHH:MM` in local time, no Z.
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInputValue(local: string): string {
  // Local datetime → ISO. Browser parses as local, toISOString returns UTC.
  return new Date(local).toISOString();
}

export function SimulatedClockPanel() {
  const { simulatedNow, setSimulatedNow } = useSimulatedClock();

  const baseISO = simulatedNow ?? new Date().toISOString();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!v) {
      setSimulatedNow(null);
      return;
    }
    setSimulatedNow(fromLocalInputValue(v));
  };

  const advanceDays = (days: number) => {
    const start = simulatedNow ? new Date(simulatedNow) : new Date();
    const next = new Date(start.getTime() + days * ONE_DAY_MS);
    setSimulatedNow(next.toISOString());
  };

  // Calendar-aware month/year advance — matches the addAccrualPeriod helper
  // used by the reducer, so a click here is guaranteed to cross the next
  // monthly accrual boundary.
  const advanceMonths = (months: number) => {
    const start = simulatedNow ? new Date(simulatedNow) : new Date();
    const next = new Date(start);
    next.setMonth(next.getMonth() + months);
    setSimulatedNow(next.toISOString());
  };

  const advanceYears = (years: number) => {
    const start = simulatedNow ? new Date(simulatedNow) : new Date();
    const next = new Date(start);
    next.setFullYear(next.getFullYear() + years);
    setSimulatedNow(next.toISOString());
  };

  return (
    <div
      className={`si-clock${simulatedNow ? " si-clock--active" : ""}`}
      role="region"
      aria-label="Simulated clock"
    >
      <div className="si-clock__header">
        <span className="si-clock__label">
          {simulatedNow ? "Simulated now" : "Real time"}
        </span>
        {simulatedNow && <span className="si-clock__warn-badge">SIM</span>}
      </div>
      <div className="si-clock__row">
        <input
          type="datetime-local"
          className="si-input si-input--sm si-clock__date"
          value={toLocalInputValue(baseISO)}
          onChange={handleDateChange}
          aria-label="Simulated current time"
        />
        <div className="si-clock__quick">
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--secondary"
            onClick={() => advanceDays(1)}
            title="Advance simulated clock by 1 day"
          >
            +1d
          </button>
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--secondary"
            onClick={() => advanceDays(7)}
            title="Advance simulated clock by 7 days"
          >
            +7d
          </button>
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--secondary"
            onClick={() => advanceMonths(1)}
            title="Advance simulated clock by 1 calendar month — guaranteed to cross monthly accrual boundary"
          >
            +1mo
          </button>
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--secondary"
            onClick={() => advanceYears(1)}
            title="Advance simulated clock by 1 calendar year"
          >
            +1y
          </button>
          <button
            type="button"
            className="si-btn si-btn--xs si-btn--ghost"
            onClick={() => setSimulatedNow(null)}
            disabled={!simulatedNow}
            title="Return to real time"
          >
            Reset
          </button>
        </div>
      </div>
      <p className="si-clock__hint">
        Operator-only test tool. Overrides timestamps on actions dispatched from
        this editor (activate, settle, accrue, payments, metric usage). Does not
        affect real time anywhere else.
      </p>
    </div>
  );
}
