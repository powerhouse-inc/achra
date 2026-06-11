import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  const ExpandButton = () =>
    shouldTruncate ? (
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
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
    ) : null;

  // Fallback to plain text if markdown renderer not loaded
  if (!MarkdownRenderer) {
    return (
      <div className={className}>
        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        <ExpandButton />
      </div>
    );
  }

  return (
    <div className={className}>
      <style>
        {`
          /* The third-party @uiw/react-markdown-preview widget is theme-aware via
             data-color-mode (set from Connect's .dark class below). We force its
             surface transparent so it blends with the surrounding card in both
             themes, and drive every color from semantic design tokens so the
             content stays readable in light AND dark mode. */
          .markdown-preview-content .wmde-markdown,
          .markdown-preview-content .wmde-markdown-color {
            background-color: transparent;
            color: var(--foreground);
          }
          .markdown-preview-content {
            font-size: 0.875rem;
            line-height: 1.625;
            color: var(--foreground);
          }
          .markdown-preview-content p {
            margin-bottom: 0.75em;
          }
          .markdown-preview-content p:last-child {
            margin-bottom: 0;
          }
          .markdown-preview-content h1,
          .markdown-preview-content h2,
          .markdown-preview-content h3 {
            font-weight: 600;
            color: var(--foreground);
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          .markdown-preview-content h1 { font-size: 1.25rem; }
          .markdown-preview-content h2 { font-size: 1.125rem; }
          .markdown-preview-content h3 { font-size: 1rem; }
          .markdown-preview-content ul {
            list-style-type: disc;
            padding-left: 1.5em;
            margin-bottom: 0.75em;
          }
          .markdown-preview-content ol {
            list-style-type: decimal;
            padding-left: 1.5em;
            margin-bottom: 0.75em;
          }
          .markdown-preview-content a {
            color: var(--primary);
            text-decoration: underline;
          }
          .markdown-preview-content code {
            background: var(--muted);
            color: var(--foreground);
            padding: 0.125em 0.375em;
            border-radius: 0.25em;
            font-size: 0.875em;
          }
          .markdown-preview-content blockquote {
            border-left: 3px solid var(--border);
            padding-left: 1em;
            color: var(--muted-foreground);
            font-style: italic;
          }
          .markdown-preview-content strong {
            font-weight: 600;
            color: var(--foreground);
          }
          /* Hide anchor links on headers */
          .markdown-preview-content .anchor {
            display: none;
          }
          .markdown-preview-content .octicon {
            display: none;
          }
        `}
      </style>
      <div
        className="markdown-preview-content"
        data-color-mode={isDark ? "dark" : "light"}
      >
        <MarkdownRenderer source={displayContent} disableCopy={true} />
      </div>
      <ExpandButton />
    </div>
  );
}
