import { useState, useEffect, useCallback } from "react";

interface DateRangePickerProps {
  /** ISO date string or YYYY-MM-DD for the start of the range */
  fromDate: string;
  /** ISO date string or YYYY-MM-DD for the end of the range */
  toDate: string;
  /** Called when either date changes. Both values are ISO date strings. */
  onChange: (fromDate: string, toDate: string) => void;
  /** Optional label for the whole range picker */
  label?: string;
  /** Optional className for the container */
  className?: string;
}

function toDateOnly(value: string): string {
  return value.split("T")[0] || "";
}

function toStartOfDayISO(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00.000Z");
  return isNaN(d.getTime()) ? "" : d.toISOString();
}

function toEndOfDayISO(dateStr: string): string {
  const d = new Date(dateStr + "T23:59:59.999Z");
  return isNaN(d.getTime()) ? "" : d.toISOString();
}

/**
 * Unified date range picker rendered as a single row with two date inputs
 * joined visually. Enforces from <= to.
 */
export function DateRangePicker({
  fromDate,
  toDate,
  onChange,
  label,
  className,
}: DateRangePickerProps) {
  const [localFrom, setLocalFrom] = useState(() => toDateOnly(fromDate));
  const [localTo, setLocalTo] = useState(() => toDateOnly(toDate));

  useEffect(() => {
    const extFrom = toDateOnly(fromDate);
    if (extFrom && extFrom !== localFrom) {
      setLocalFrom(extFrom);
    }
  }, [fromDate]);

  useEffect(() => {
    const extTo = toDateOnly(toDate);
    if (extTo && extTo !== localTo) {
      setLocalTo(extTo);
    }
  }, [toDate]);

  const handleFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateStr = e.target.value;
      if (!dateStr) return;

      let effectiveTo = localTo;
      if (effectiveTo && dateStr > effectiveTo) {
        effectiveTo = dateStr;
        setLocalTo(effectiveTo);
      }
      setLocalFrom(dateStr);

      const fromISO = toStartOfDayISO(dateStr);
      const toISO = toEndOfDayISO(effectiveTo || dateStr);
      if (fromISO && toISO) {
        onChange(fromISO, toISO);
      }
    },
    [localTo, onChange],
  );

  const handleToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateStr = e.target.value;
      if (!dateStr) return;

      let effectiveFrom = localFrom;
      if (effectiveFrom && dateStr < effectiveFrom) {
        effectiveFrom = dateStr;
        setLocalFrom(effectiveFrom);
      }
      setLocalTo(dateStr);

      const fromISO = toStartOfDayISO(effectiveFrom || dateStr);
      const toISO = toEndOfDayISO(dateStr);
      if (fromISO && toISO) {
        onChange(fromISO, toISO);
      }
    },
    [localFrom, onChange],
  );

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <input
          type="date"
          value={localFrom}
          onChange={handleFromChange}
          className="px-3 py-2 text-sm border-none outline-none bg-white"
        />
        <span className="px-2 text-sm text-gray-400 bg-gray-50 self-stretch flex items-center border-x border-gray-300">
          →
        </span>
        <input
          type="date"
          value={localTo}
          onChange={handleToChange}
          className="px-3 py-2 text-sm border-none outline-none bg-white"
        />
      </div>
    </div>
  );
}
