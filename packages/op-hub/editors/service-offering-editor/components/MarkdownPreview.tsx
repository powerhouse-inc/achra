import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandButtonProps {
  shouldTruncate: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function ExpandButton({
  shouldTruncate,
  isExpanded,
  onToggle,
}: ExpandButtonProps) {
  if (!shouldTruncate) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
    >
      {isExpanded ? (
        <>
          Show less <ChevronUp size={16} />
        </>
      ) : (
        <>
          Read more <ChevronDown size={16} />
        </>
      )}
    </button>
  );
}

interface MarkdownPreviewProps {
  content: string;
  maxLength?: number;
  className?: string;
}

export function MarkdownPreview({
  content,
  maxLength = 300,
  className = "",
}: MarkdownPreviewProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [MarkdownRenderer, setMarkdownRenderer] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = content.length > maxLength;
  const displayContent =
    shouldTruncate && !isExpanded
      ? content.slice(0, maxLength) + "..."
      : content;

  useEffect(() => {
    import("@uiw/react-markdown-preview")
      .then((module) => {
        setMarkdownRenderer(() => module.default);
      })
      .catch(() => {
        // Silently fail - will use fallback
      });
  }, []);

  // Fallback to plain text if markdown renderer not loaded
  if (!MarkdownRenderer) {
    return (
      <div className={className}>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        <ExpandButton
          shouldTruncate={shouldTruncate}
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded((prev) => !prev)}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <style>{`
        .so-markdown-preview p { margin-bottom: 0.75em; }
        .so-markdown-preview p:last-child { margin-bottom: 0; }
        .so-markdown-preview h1, .so-markdown-preview h2, .so-markdown-preview h3 {
          font-weight: 600; color: #1e293b; margin-top: 1em; margin-bottom: 0.5em;
        }
        .so-markdown-preview h1 { font-size: 1.25rem; }
        .so-markdown-preview h2 { font-size: 1.125rem; }
        .so-markdown-preview h3 { font-size: 1rem; }
        .so-markdown-preview ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 0.75em; }
        .so-markdown-preview ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 0.75em; }
        .so-markdown-preview a { color: #4f46e5; text-decoration: underline; }
        .so-markdown-preview code { background: #f1f5f9; padding: 0.125em 0.375em; border-radius: 0.25em; font-size: 0.875em; }
        .so-markdown-preview blockquote { border-left: 3px solid #e2e8f0; padding-left: 1em; color: #64748b; font-style: italic; }
        .so-markdown-preview strong { font-weight: 600; color: #334155; }
        .so-markdown-preview .anchor, .so-markdown-preview .octicon { display: none; }
      `}</style>
      <div
        className="so-markdown-preview text-sm leading-relaxed text-slate-600"
        data-color-mode="light"
      >
        <MarkdownRenderer source={displayContent} disableCopy={true} />
      </div>
      <ExpandButton
        shouldTruncate={shouldTruncate}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((prev) => !prev)}
      />
    </div>
  );
}
