import { Plus, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  useBillingFolderStructure,
  formatMonthName,
} from "../hooks/useBillingFolderStructure.js";

/**
 * Dropdown button for adding new month folders
 */
export function AddMonthButton() {
  const { monthFolders, createMonthFolder } = useBillingFolderStructure();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get list of available months (past 12 months + next 2 months)
  const availableMonths = getAvailableMonths(monthFolders);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateMonth = async (monthName: string) => {
    setIsCreating(true);
    try {
      await createMonthFolder(monthName);
      setIsOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  if (availableMonths.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isCreating}
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
        title="Add month"
      >
        <Plus className="w-3 h-3" />
        <span>Add Month</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
            Select a month to add
          </div>
          <div className="max-h-60 overflow-y-auto">
            {availableMonths.map((monthName) => (
              <button
                key={monthName}
                onClick={() => void handleCreateMonth(monthName)}
                disabled={isCreating}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {monthName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Get list of months that can be added (not already existing)
 */
function getAvailableMonths(existingMonths: Map<string, unknown>): string[] {
  const months: string[] = [];
  const today = new Date();

  // Include next 2 months and past 12 months
  for (let i = -2; i <= 12; i++) {
    const targetDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = formatMonthName(targetDate);
    if (!existingMonths.has(monthName)) {
      months.push(monthName);
    }
  }

  return months;
}
