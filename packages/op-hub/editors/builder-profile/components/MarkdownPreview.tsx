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

  const ExpandButton = () =>
    shouldTruncate ? (
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
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
    ) : null;

  // Fallback to plain text if markdown renderer not loaded
  if (!MarkdownRenderer) {
    return (
      <div className={className}>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
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
          .markdown-preview-content {
            font-size: 0.875rem;
            line-height: 1.625;
            color: #475569;
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
            color: #1e293b;
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
            color: #4f46e5;
            text-decoration: underline;
          }
          .markdown-preview-content code {
            background: #f1f5f9;
            padding: 0.125em 0.375em;
            border-radius: 0.25em;
            font-size: 0.875em;
          }
          .markdown-preview-content blockquote {
            border-left: 3px solid #e2e8f0;
            padding-left: 1em;
            color: #64748b;
            font-style: italic;
          }
          .markdown-preview-content strong {
            font-weight: 600;
            color: #334155;
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
      <div className="markdown-preview-content" data-color-mode="light">
        <MarkdownRenderer source={displayContent} disableCopy={true} />
      </div>
      <ExpandButton />
    </div>
  );
}
