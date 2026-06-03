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
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    INACTIVE: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      dot: "bg-slate-400",
    },
    ON_HOLD: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    COMPLETED: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
    ARCHIVED: {
      bg: "bg-slate-100",
      text: "text-slate-500",
      dot: "bg-slate-300",
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
    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
      {/* Gradient banner */}
      <div className="h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
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
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
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
          <h4 className="text-xl font-semibold text-slate-900 tracking-tight">
            {state.name || "Unnamed Builder"}
          </h4>
          {state.slug && (
            <p className="text-sm text-slate-500 font-medium">@{state.slug}</p>
          )}
        </div>

        {/* Short Description */}
        {state.description && (
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
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
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {state.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
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
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Scopes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {state.scopes.map((scope) => (
                <span
                  key={scope}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"
                >
                  {SCOPE_LABELS[scope] || scope}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {state.links && state.links.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-3">
              {state.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors group"
                >
                  <Link2
                    size={14}
                    className="text-slate-400 group-hover:text-indigo-500 transition-colors"
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
