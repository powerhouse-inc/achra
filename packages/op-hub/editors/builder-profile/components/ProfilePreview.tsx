import { Link2 } from "lucide-react";
import type {
  BuilderProfileState,
  BuilderSkill,
  BuilderScope,
} from "document-models/builder-profile";
import { MarkdownPreview } from "./MarkdownPreview.js";

const SKILL_LABELS: Record<BuilderSkill, string> = {
  FRONTEND_DEVELOPMENT: "Frontend",
  BACKEND_DEVELOPMENT: "Backend",
  FULL_STACK_DEVELOPMENT: "Full Stack",
  DEVOPS_ENGINEERING: "DevOps",
  SMART_CONTRACT_DEVELOPMENT: "Smart Contracts",
  UI_UX_DESIGN: "UI/UX",
  TECHNICAL_WRITING: "Tech Writing",
  QA_TESTING: "QA",
  DATA_ENGINEERING: "Data",
  SECURITY_ENGINEERING: "Security",
};

const SCOPE_LABELS: Record<BuilderScope, string> = {
  ACC: "ACC",
  STA: "STA",
  SUP: "SUP",
  STABILITY_SCOPE: "Stability",
  SUPPORT_SCOPE: "Support",
  PROTOCOL_SCOPE: "Protocol",
  GOVERNANCE_SCOPE: "Governance",
};

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> =
  {
    ACTIVE: {
      bg: "bg-status-success/10",
      text: "text-status-success",
      dot: "bg-status-success",
    },
    INACTIVE: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      dot: "bg-muted-foreground",
    },
    ON_HOLD: {
      bg: "bg-status-warning/10",
      text: "text-status-warning",
      dot: "bg-status-warning",
    },
    COMPLETED: {
      bg: "bg-status-progress/10",
      text: "text-status-progress",
      dot: "bg-status-progress",
    },
    ARCHIVED: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      dot: "bg-muted-foreground",
    },
  };

interface ProfilePreviewProps {
  state: BuilderProfileState;
}

export function ProfilePreview({ state }: ProfilePreviewProps) {
  if (!state.name && !state.description) {
    return null;
  }

  const statusStyle = state.status
    ? STATUS_STYLES[state.status]
    : STATUS_STYLES.INACTIVE;

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Gradient banner — driven by design tokens via an inline linear-gradient.
          Tailwind gradient-stop utilities (from / via / to) don't reliably
          generate in op-hub's build, so we reference the token CSS vars directly.
          The tokens carry the same value in light and dark, so the gradient is
          intentionally identical in both themes. */}
      <div
        className="h-24 relative"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, var(--primary), var(--purple), var(--fusion))",
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwSDI0VjBoNnYzMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div className="relative">
            {state.icon ? (
              <img
                src={state.icon}
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-card shadow-lg"
              />
            ) : (
              <div
                className="w-24 h-24 rounded-2xl border-4 border-card shadow-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--foreground)" }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: "var(--background)" }}
                >
                  {state.name?.charAt(0).toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>

          {state.status && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusStyle.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
              <span className={`text-xs font-medium ${statusStyle.text}`}>
                {state.status.replace("_", " ")}
              </span>
            </div>
          )}
        </div>

        {/* Name & Slug */}
        <div className="mb-4">
          <h4 className="text-xl font-semibold text-foreground tracking-tight">
            {state.name || "Unnamed Builder"}
          </h4>
          {state.slug && (
            <p className="text-sm text-muted-foreground font-medium">
              @{state.slug}
            </p>
          )}
        </div>

        {/* Short Description */}
        {state.description && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {state.description}
          </p>
        )}

        {/* About (Markdown) */}
        {state.about && (
          <div className="mb-5">
            <MarkdownPreview content={state.about} maxLength={300} />
          </div>
        )}

        {/* Skills */}
        {state.skills && state.skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {state.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                >
                  {SKILL_LABELS[skill] || skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scopes */}
        {state.scopes && state.scopes.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Scopes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {state.scopes.map((scope) => (
                <span
                  key={scope}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                >
                  {SCOPE_LABELS[scope] || scope}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {state.links && state.links.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex flex-wrap gap-3">
              {state.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Link2
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                  <span className="group-hover:underline underline-offset-2">
                    {link.label || new URL(link.url).hostname}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
