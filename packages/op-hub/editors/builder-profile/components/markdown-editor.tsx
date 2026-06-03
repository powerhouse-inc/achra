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
  labelClassName = "text-sm leading-4 mb-3 font-medium",
}: MarkdownEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [MDEditor, setMDEditor] = useState<any>(null);
  const [contentValue, setContentValue] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [viewMarkdownMode, setViewMarkdownMode] =
    useLocalStorage<MarkdownEditorMode>("markdown-editor-view-mode", "live");

  // Ensure we have a valid mode for the editor
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
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .w-md-editor-preview th {
            background-color: #f5f5f5;
          }
         
        .w-md-editor-text-pre code, .w-md-editor-text-pre div {
            font-size: 16px !important;
            line-height: 24px !important;
          }
          .w-md-editor-text-input {
            font-size: 16px !important;
            line-height: 24px !important;
          }
            
        `}
      </style>

      {label && <p className={labelClassName}>{label}</p>}
      {!isLoaded && (
        <div
          className="w-full border border-gray-300 rounded-md p-3 bg-white"
          style={{ height: `${height}px` }}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Loading editor...
          </div>
        </div>
      )}
      {isLoaded && loadError && (
        <div
          className="w-full border border-red-300 rounded-md p-3 bg-red-50"
          style={{ height: `${height}px` }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-red-600">
            <p className="text-sm font-medium mb-2">
              Failed to load markdown editor
            </p>
            <p className="text-xs text-red-500">{loadError}</p>
            <textarea
              className="w-full h-full mt-2 p-2 border border-gray-300 rounded text-sm"
              placeholder="Fallback text editor - write your content here..."
              value={value ?? ""}
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
