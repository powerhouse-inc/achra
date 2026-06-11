import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useLocalStorage } from "usehooks-ts";

const previewOptions = {
  components: {
    a: ({ ...props }: { node: unknown; [key: string]: unknown }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
  },
  rehypePlugins: [rehypeSlug],
  remarkPlugins: [remarkGfm],
};

export type MarkdownEditorMode = "preview" | "edit" | "live";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  height?: number;
  label?: string;
  labelClassName?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  onBlur,
  height = 350,
  label = "Content",
  labelClassName = "mb-2 block text-sm font-medium text-foreground",
}: MarkdownEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [MDEditor, setMDEditor] = useState<any>(null);
  const [contentValue, setContentValue] = useState<string>(" ");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const [viewMarkdownMode, setViewMarkdownMode] =
    useLocalStorage<MarkdownEditorMode>("markdown-editor-view-mode", "live");

  const editorMode = viewMarkdownMode || "live";

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const module = await import("@uiw/react-md-editor");
        setMDEditor(() => module.default);
        setIsLoaded(true);
        setLoadError(null);
      } catch (error) {
        console.error("Failed to load MDEditor:", error);
        setLoadError(
          error instanceof Error ? error.message : "Failed to load editor",
        );
        setIsLoaded(true);
      }
    };

    const timer = setTimeout(() => void loadEditor(), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const stringValue = typeof value === "string" ? value : "";
      setContentValue(stringValue.trim() || " ");
    }
  }, [value, isLoaded]);

  useEffect(() => {
    if (!MDEditor) return;

    const handleViewButtonClick = () => {
      const buttonLive = document.querySelector("button[data-name='live']");
      const buttonEdit = document.querySelector("button[data-name='edit']");
      const buttonPreview = document.querySelector(
        "button[data-name='preview']",
      );

      const liveLi = buttonLive?.closest("li");
      const editLi = buttonEdit?.closest("li");
      const previewLi = buttonPreview?.closest("li");

      if (previewLi?.classList.contains("active")) {
        setViewMarkdownMode("preview");
      }
      if (editLi?.classList.contains("active")) {
        setViewMarkdownMode("edit");
      }
      if (liveLi?.classList.contains("active")) {
        setViewMarkdownMode("live");
      }
    };

    document.addEventListener("click", handleViewButtonClick, true);
    return () => {
      document.removeEventListener("click", handleViewButtonClick, true);
    };
  }, [MDEditor, setViewMarkdownMode]);

  const handleContentChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      const stringValue = typeof newValue === "string" ? newValue : "";
      const safeValue = stringValue === "" ? " " : stringValue;
      setContentValue(safeValue);
      onChange(newValue);
    }
  };

  const handleContentBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <style>
        {`
          .w-md-editor-preview ul {
            list-style-type: disc !important;
            padding-left: 2em !important;
          }

          .w-md-editor-preview ol {
            list-style-type: decimal !important;
            padding-left: 2em !important;
          }

          .w-md-editor-preview table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }

          .w-md-editor-preview th,
          .w-md-editor-preview td {
            border: 1px solid var(--border);
            padding: 8px;
            text-align: left;
          }

          .w-md-editor-preview th {
            background-color: var(--muted);
          }

          .w-md-editor-text,
          .w-md-editor-text-pre,
          .w-md-editor-text-pre *,
          .w-md-editor-text-input {
            font-size: 16px !important;
            line-height: 24px !important;
          }

          .op-md-editor .w-md-editor,
          .op-md-editor .wmde-markdown {
            --color-canvas-default: var(--background) !important;
            --color-canvas-subtle: var(--muted) !important;
            --color-fg-default: var(--foreground) !important;
            --color-fg-muted: var(--muted-foreground) !important;
            --color-fg-subtle: var(--muted-foreground) !important;
            --color-border-default: var(--border) !important;
            --color-border-muted: var(--border) !important;
            --color-neutral-muted: var(--muted) !important;
            --color-accent-fg: var(--primary) !important;
            --color-accent-emphasis: var(--primary) !important;
          }
        `}
      </style>

      {label ? <p className={labelClassName}>{label}</p> : null}
      {!isLoaded ? (
        <div
          className="w-full rounded-md border border-border bg-background p-3"
          style={{ height: `${height}px` }}
        >
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            Loading editor...
          </div>
        </div>
      ) : null}
      {isLoaded && loadError ? (
        <div
          className="w-full rounded-md border border-destructive bg-destructive/10 p-3"
          style={{ height: `${height}px` }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center text-destructive">
            <p className="mb-2 text-sm font-medium">
              Failed to load markdown editor
            </p>
            <p className="text-xs text-destructive">{loadError}</p>
            <textarea
              className="mt-2 h-full w-full rounded border border-border bg-background p-2 text-sm text-foreground"
              placeholder="Fallback text editor - write your content here..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={(e) => onBlur?.(e.target.value)}
            />
          </div>
        </div>
      ) : null}
      {isLoaded && MDEditor ? (
        <div
          data-color-mode={isDark ? "dark" : "light"}
          className="w-full op-md-editor"
        >
          <MDEditor
            height={height}
            value={contentValue}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            previewOptions={previewOptions}
            enableScroll={true}
            preview={editorMode}
            textareaProps={{
              placeholder: "Write your content here...",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
