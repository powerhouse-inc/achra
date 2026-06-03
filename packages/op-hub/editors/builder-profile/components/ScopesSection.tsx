import { Target, X, Check } from "lucide-react";
import type { BuilderScope } from "document-models/builder-profile";

const SCOPE_OPTIONS: {
  value: BuilderScope;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    value: "ACC",
    label: "ACC",
    description: "Accessibility",
    color: "bg-cyan-500",
  },
  {
    value: "STA",
    label: "STA",
    description: "Stability",
    color: "bg-blue-500",
  },
  {
    value: "SUP",
    label: "SUP",
    description: "Support",
    color: "bg-violet-500",
  },
  {
    value: "STABILITY_SCOPE",
    label: "Stability Scope",
    description: "Protocol stability initiatives",
    color: "bg-emerald-500",
  },
  {
    value: "SUPPORT_SCOPE",
    label: "Support Scope",
    description: "Ecosystem support work",
    color: "bg-amber-500",
  },
  {
    value: "PROTOCOL_SCOPE",
    label: "Protocol Scope",
    description: "Core protocol development",
    color: "bg-indigo-500",
  },
  {
    value: "GOVERNANCE_SCOPE",
    label: "Governance Scope",
    description: "Governance processes",
    color: "bg-rose-500",
  },
];

interface ScopesSectionProps {
  scopes: BuilderScope[];
  onAddScope: (scope: BuilderScope) => void;
  onRemoveScope: (scope: BuilderScope) => void;
}

export function ScopesSection({
  scopes,
  onAddScope,
  onRemoveScope,
}: ScopesSectionProps) {
  const availableScopes = SCOPE_OPTIONS.filter(
    (option) => !scopes.includes(option.value),
  );
  const selectedScopes = scopes
    .map((scope) => SCOPE_OPTIONS.find((s) => s.value === scope))
    .filter(Boolean);

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Target size={18} className="text-emerald-600" />
        </span>
        Scopes
      </h3>
      <p className="text-sm text-slate-500 mb-5">
        Define the areas where you contribute to the ecosystem
      </p>

      {/* Selected Scopes */}
      {selectedScopes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {selectedScopes.map(
            (scope) =>
              scope && (
                <div
                  key={scope.value}
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 transition-all"
                >
                  <span className={`w-2 h-2 rounded-full ${scope.color}`} />
                  <span className="text-sm font-medium text-slate-700">
                    {scope.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveScope(scope.value)}
                    className="ml-1 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 text-slate-400 hover:text-red-600 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ),
          )}
        </div>
      )}

      {/* Empty state */}
      {scopes.length === 0 && (
        <div className="text-center py-8 mb-5 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200">
          <Target size={32} className="text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">No scopes selected yet</p>
          <p className="text-slate-400 text-xs mt-1">
            Add scopes from the dropdown below
          </p>
        </div>
      )}

      {/* Add Scope Dropdown */}
      {availableScopes.length > 0 && (
        <div className="relative">
          <select
            className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-xl text-sm bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
            onChange={(e) => {
              if (e.target.value) {
                onAddScope(e.target.value as BuilderScope);
                e.target.value = "";
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>
              + Add a scope...
            </option>
            {availableScopes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* All scopes added message */}
      {availableScopes.length === 0 && scopes.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 rounded-xl px-4 py-3">
          <Check size={16} />
          <span>All available scopes have been added</span>
        </div>
      )}
    </div>
  );
}
