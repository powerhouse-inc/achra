import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useLocalStorage } from "usehooks-ts";

// Custom preview renderer to make links open in new tabs and ensure proper list rendering
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
  value: string | null;
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
  labelClassName = "text-sm leading-4 mb-3 font-medium text-foreground",
}: MarkdownEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [MDEditor, setMDEditor] = useState<any>(null);
  const [contentValue, setContentValue] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const [viewMarkdownMode, setViewMarkdownMode] =
    useLocalStorage<MarkdownEditorMode>("markdown-editor-view-mode", "live");

  // Ensure we have a valid mode for the editor
  const editorMode = viewMarkdownMode || "live";

  // Track Connect's `.dark` class so the editor follows the active theme
  // (data-color-mode) instead of staying locked to light.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Load the MDEditor component dynamically
  useEffect(() => {
    // Use a more robust dynamic import approach
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

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(loadEditor, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update contentValue when value prop changes
  useEffect(() => {
    if (isLoaded) {
      // Handle null/undefined but preserve empty strings, whitespace, and newlines
      const stringValue = value ?? "";
      setContentValue(stringValue);
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

      if (previewLi && previewLi.classList.contains("active")) {
        setViewMarkdownMode("preview");
      }
      if (editLi && editLi.classList.contains("active")) {
        setViewMarkdownMode("edit");
      }
      if (liveLi && liveLi.classList.contains("active")) {
        setViewMarkdownMode("live");
      }
    };

    document.addEventListener("click", handleViewButtonClick, true);
    return () => {
      document.removeEventListener("click", handleViewButtonClick, true);
    };
  }, [MDEditor, setViewMarkdownMode]);

  // Handle content changes
  const handleContentChange = (newValue: string | undefined) => {
    // Handle null/undefined but preserve all string content including empty strings
    const stringValue = newValue ?? "";
    setContentValue(stringValue);
    onChange(stringValue);
  };

  // Handle content blur
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

          /* Ensure proper table styling */
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

          /* Retint the @uiw editor chrome to achra design tokens. The canvas is
             the dark --background so the editor reads as an input field (like the
             form's other inputs) on the lifted card, instead of the widget's
             near-black GitHub-dark canvas (#0d1117); text/border/accent map to
             tokens.

             The widget sets its dark vars on .wmde-markdown-var / .wmde-markdown
             via [data-color-mode*=dark] ... (specificity 0,2,0), and the live-
             preview pane holds its OWN copy of the var, so we must (a) match that
             specificity, (b) target the editor root AND the preview pane, and
             (c) use !important to beat the widget's (non-important) values. Scoped
             to .op-md-editor so it never bleeds into other markdown widgets.
             Only chrome vars are remapped; the prettylights syntax colors still
             follow data-color-mode. */
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

      {label && <p className={labelClassName}>{label}</p>}
      {!isLoaded && (
        <div
          className="w-full border border-border rounded-md p-3 bg-background"
          style={{ height: `${height}px` }}
        >
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Loading editor...
          </div>
        </div>
      )}
      {isLoaded && loadError && (
        <div
          className="w-full border border-destructive rounded-md p-3 bg-destructive/10"
          style={{ height: `${height}px` }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-destructive">
            <p className="text-sm font-medium mb-2">
              Failed to load markdown editor
            </p>
            <p className="text-xs text-destructive">{loadError}</p>
            <textarea
              className="w-full h-full mt-2 p-2 border border-border rounded text-sm bg-background text-foreground"
              placeholder="Fallback text editor - write your content here..."
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              onBlur={(e) => onBlur?.(e.target.value)}
            />
          </div>
        </div>
      )}
      {isLoaded && MDEditor && (
        <div
          data-color-mode={isDark ? "dark" : "light"}
          className="w-full op-md-editor"
        >
          <MDEditor
            height={height}
            value={contentValue || " "}
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
      )}
    </div>
  );
}
