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
      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
  const [isDark, setIsDark] = useState(false);

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

  // Track Connect's `.dark` class so the widget follows the active theme
  // (data-color-mode) instead of staying locked to light.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Fallback to plain text if markdown renderer not loaded
  if (!MarkdownRenderer) {
    return (
      <div className={className}>
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
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
        /* The third-party @uiw/react-markdown-preview widget is theme-aware via
           data-color-mode (set from Connect's .dark class below). We force its
           surface transparent so it blends with the surrounding card in both
           themes, and drive every color from semantic design tokens. */
        .so-markdown-preview .wmde-markdown,
        .so-markdown-preview .wmde-markdown-color {
          background-color: transparent;
          color: var(--foreground);
        }
        .so-markdown-preview p { margin-bottom: 0.75em; }
        .so-markdown-preview p:last-child { margin-bottom: 0; }
        .so-markdown-preview h1, .so-markdown-preview h2, .so-markdown-preview h3 {
          font-weight: 600; color: var(--foreground); margin-top: 1em; margin-bottom: 0.5em;
        }
        .so-markdown-preview h1 { font-size: 1.25rem; }
        .so-markdown-preview h2 { font-size: 1.125rem; }
        .so-markdown-preview h3 { font-size: 1rem; }
        .so-markdown-preview ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 0.75em; }
        .so-markdown-preview ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 0.75em; }
        .so-markdown-preview a { color: var(--primary); text-decoration: underline; }
        .so-markdown-preview code { background: var(--muted); color: var(--foreground); padding: 0.125em 0.375em; border-radius: 0.25em; font-size: 0.875em; }
        .so-markdown-preview blockquote { border-left: 3px solid var(--border); padding-left: 1em; color: var(--muted-foreground); font-style: italic; }
        .so-markdown-preview strong { font-weight: 600; color: var(--foreground); }
        .so-markdown-preview .anchor, .so-markdown-preview .octicon { display: none; }
      `}</style>
      <div
        className="so-markdown-preview text-sm leading-relaxed text-muted-foreground"
        data-color-mode={isDark ? "dark" : "light"}
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
