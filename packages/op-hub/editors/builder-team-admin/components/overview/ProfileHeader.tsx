import type { BuilderProfileDocument } from "document-models/builder-profile";

type ProfileHeaderProps = {
  builderProfileDoc: BuilderProfileDocument | null;
};

/**
 * Hero section displaying the builder team profile with avatar and name.
 */
export function ProfileHeader({ builderProfileDoc }: ProfileHeaderProps) {
  if (!builderProfileDoc) {
    return null;
  }

  const { name, icon, slug } = builderProfileDoc.state.global;
  const displayName = name || "Unnamed Team";
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/30 p-8 border border-slate-200/60">
      {/* Content */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {icon ? (
            <img
              src={icon}
              alt={displayName}
              className="h-20 w-20 rounded-2xl object-cover shadow-lg shadow-slate-300/50 ring-4 ring-white/80"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) {
                  (fallback as HTMLElement).style.display = "flex";
                }
              }}
            />
          ) : null}
          <div
            className={`h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-400/30 ring-4 ring-white/80 ${
              icon ? "hidden" : "flex"
            } items-center justify-center`}
          >
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
        </div>

        {/* Text content */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {displayName}
          </h1>
          {slug && (
            <p className="mt-1 text-base font-medium text-slate-500">@{slug}</p>
          )}
        </div>
      </div>
    </div>
  );
}
