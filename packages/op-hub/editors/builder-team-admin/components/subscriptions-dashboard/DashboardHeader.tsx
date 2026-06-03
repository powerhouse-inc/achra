import { FolderOpen, ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  onBrowseFiles?: () => void;
  onBackToDashboard?: () => void;
  showBack?: boolean;
}

export function DashboardHeader({
  title,
  subtitle,
  onBrowseFiles,
  onBackToDashboard,
  showBack = false,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
          {title}
        </h1>
        <p className="mt-1 text-sm text-stone-400">{subtitle}</p>
      </div>
      {showBack && onBackToDashboard ? (
        <button
          type="button"
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-200 border border-stone-200/60"
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </button>
      ) : onBrowseFiles ? (
        <button
          type="button"
          onClick={onBrowseFiles}
          className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-200 border border-stone-200/60"
        >
          <FolderOpen size={14} />
          Browse Files
        </button>
      ) : null}
    </div>
  );
}
