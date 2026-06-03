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
  labelClassName = "text-sm leading-4 mb-3 font-medium",
}: MarkdownEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [MDEditor, setMDEditor] = useState<any>(null);
  const [contentValue, setContentValue] = useState<string>(" ");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [viewMarkdownMode, setViewMarkdownMode] =
    useLocalStorage<MarkdownEditorMode>("markdown-editor-view-mode", "live");

  // Ensure we have a valid mode for the editor
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const editorMode = viewMarkdownMode || "live";

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
    const timer = setTimeout(() => void loadEditor(), 0);
    return () => clearTimeout(timer);
  }, []);

  // Update contentValue when value prop changes
  useEffect(() => {
    if (isLoaded) {
      const stringValue = typeof value === "string" ? value : "";
      const safeValue = stringValue.trim() || " ";
      setContentValue(safeValue);
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

  // Handle content changes
  const handleContentChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      const stringValue = typeof newValue === "string" ? newValue : "";
      // Only replace completely empty strings with a space, preserve all other content
      const safeValue = stringValue === "" ? " " : stringValue;
      setContentValue(safeValue);
      onChange(newValue); // Keep the original value for the parent component
    }
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
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .w-md-editor-preview th {
            background-color: #f5f5f5;
          }

          .w-md-editor-text,
          .w-md-editor-text-pre,
          .w-md-editor-text-pre *,

          .w-md-editor-text-input {
            font-size: 16px !important;
            line-height: 24px !important;
          }
        `}
      </style>

      {label && <p className={labelClassName}>{label}</p>}
      {!isLoaded && (
        <div
          className="w-full rounded-md border border-gray-300 bg-white p-3"
          style={{ height: `${height}px` }}
        >
          <div className="flex h-full w-full items-center justify-center text-gray-500">
            Loading editor...
          </div>
        </div>
      )}
      {isLoaded && loadError && (
        <div
          className="w-full rounded-md border border-red-300 bg-red-50 p-3"
          style={{ height: `${height}px` }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center text-red-600">
            <p className="mb-2 text-sm font-medium">
              Failed to load markdown editor
            </p>
            <p className="text-xs text-red-500">{loadError}</p>
            <textarea
              className="mt-2 h-full w-full rounded border border-gray-300 p-2 text-sm"
              placeholder="Fallback text editor - write your content here..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={(e) => onBlur?.(e.target.value)}
            />
          </div>
        </div>
      )}
      {isLoaded && MDEditor && (
        <div data-color-mode="light" className="w-full">
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
      )}
    </div>
  );
}
