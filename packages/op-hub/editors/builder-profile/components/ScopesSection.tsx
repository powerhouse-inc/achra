import { Target, X, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@achra/ui/select";
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
    color: "bg-chart-1",
  },
  {
    value: "STA",
    label: "STA",
    description: "Stability",
    color: "bg-chart-2",
  },
  {
    value: "SUP",
    label: "SUP",
    description: "Support",
    color: "bg-chart-3",
  },
  {
    value: "STABILITY_SCOPE",
    label: "Stability Scope",
    description: "Protocol stability initiatives",
    color: "bg-chart-4",
  },
  {
    value: "SUPPORT_SCOPE",
    label: "Support Scope",
    description: "Ecosystem support work",
    color: "bg-chart-5",
  },
  {
    value: "PROTOCOL_SCOPE",
    label: "Protocol Scope",
    description: "Core protocol development",
    color: "bg-chart-6",
  },
  {
    value: "GOVERNANCE_SCOPE",
    label: "Governance Scope",
    description: "Governance processes",
    color: "bg-chart-7",
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
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
          <Target size={18} className="text-muted-foreground" />
        </span>
        Scopes
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
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
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-muted border border-border hover:border-input transition-all"
                >
                  <span className={`w-2 h-2 rounded-full ${scope.color}`} />
                  <span className="text-sm font-medium text-foreground">
                    {scope.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveScope(scope.value)}
                    className="ml-1 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
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
        <div className="text-center py-8 mb-5 rounded-xl bg-muted border-2 border-dashed border-border">
          <Target size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            No scopes selected yet
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Add scopes from the dropdown below
          </p>
        </div>
      )}

      {/* Add Scope Dropdown */}
      {availableScopes.length > 0 && (
        <Select
          value=""
          onValueChange={(value) => onAddScope(value as BuilderScope)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="+ Add a scope..." />
          </SelectTrigger>
          <SelectContent>
            {availableScopes.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* All scopes added message */}
      {availableScopes.length === 0 && scopes.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-status-success bg-status-success/10 rounded-xl px-4 py-3">
          <Check size={16} />
          <span>All available scopes have been added</span>
        </div>
      )}
    </div>
  );
}
