import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * Error boundary specifically for FolderTree to handle DocumentNotFoundError.
 * This error typically occurs when the drive contains a reference to a document
 * that has been deleted from storage.
 */
export class FolderTreeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Check if this is a DocumentNotFoundError
    const isDocumentNotFound =
      error.name === "DocumentNotFoundError" ||
      error.message?.includes("Document with id") ||
      error.message?.includes("not found");

    return {
      hasError: true,
      error,
      errorInfo: isDocumentNotFound
        ? "The drive contains a reference to a document that no longer exists."
        : null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[FolderTreeErrorBoundary] Caught error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 bg-destructive/15 border-r border-destructive/30 h-full min-w-[200px]">
          <h3 className="text-destructive font-semibold mb-2">
            Navigation Error
          </h3>
          <p className="text-destructive text-sm mb-3">
            {this.state.errorInfo || "Failed to load the folder tree."}
          </p>
          {this.state.error && (
            <p className="text-destructive text-xs mb-3 font-mono break-all">
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={this.handleRetry}
            className="px-3 py-1 text-sm bg-destructive/15 hover:bg-destructive/25 text-destructive rounded"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
