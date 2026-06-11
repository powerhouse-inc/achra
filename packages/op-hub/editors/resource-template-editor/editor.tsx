import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { useSelectedResourceTemplateDocument } from "../../document-models/resource-template/v1/hooks.js";
import { TemplateInfo } from "./components/TemplateInfo.js";
import { FacetTargeting } from "./components/FacetTargeting.js";

export default function ResourceTemplateEditor() {
  const [document, dispatch] = useSelectedResourceTemplateDocument();

  return (
    <div className="rt-editor">
      <style>{editorStyles}</style>
      <DocumentToolbar />
      <div className="rt-editor__container">
        <div className="rt-editor__header">
          <div className="rt-editor__header-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Product Information
          </div>
          <p className="rt-editor__header-desc">
            Define the base configuration for resources. These templates can be
            used to create Service Offerings.
          </p>
        </div>
        <div className="rt-editor__content">
          <TemplateInfo document={document} dispatch={dispatch} />
          <FacetTargeting document={document} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}

const editorStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

  .rt-editor {
    --rt-font-sans: 'DM Sans', system-ui, sans-serif;
    --rt-font-mono: 'DM Mono', 'SF Mono', monospace;

    /* Achra design-system tokens by ROLE (see migrate skill, Recipe A3/4):
       scale names kept so usage sites stay untouched. */
    --rt-slate-50: var(--background); /* inset wells (recessed on cards) */
    --rt-slate-100: var(--muted);
    --rt-slate-200: var(--border);
    --rt-slate-300: var(--border);
    --rt-slate-400: var(--muted-foreground);
    --rt-slate-500: var(--muted-foreground);
    --rt-slate-600: var(--foreground);
    --rt-slate-700: var(--foreground);
    --rt-slate-800: var(--foreground);
    --rt-slate-900: var(--foreground);

    /* Teal was a secondary decorative accent — routed to the success family. */
    --rt-teal-50: color-mix(in oklab, var(--status-success) 10%, transparent);
    --rt-teal-100: color-mix(in oklab, var(--status-success) 20%, transparent);
    --rt-teal-200: color-mix(in oklab, var(--status-success) 32%, transparent);
    --rt-teal-500: var(--status-success);
    --rt-teal-600: var(--status-success);
    --rt-teal-700: var(--status-success);

    --rt-radius-sm: 6px;
    --rt-radius-md: 10px;
    --rt-radius-lg: 14px;
    --rt-radius-xl: 20px;

    --rt-shadow-sm: var(--shadow-sm);
    --rt-shadow-md: var(--shadow-md);
    --rt-shadow-lg: var(--shadow-lg);

    --rt-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --rt-transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --rt-transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

    font-family: var(--rt-font-sans);
    /* No background: root stays transparent to match Connect's host canvas. */
    min-height: 100%;
    overflow-y: auto;
  }

  .rt-editor__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px 32px 48px;
  }

  .rt-editor__header {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--rt-slate-200);
  }

  .rt-editor__header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--rt-teal-100);
    color: var(--rt-teal-700);
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .rt-editor__header-badge svg {
    width: 18px;
    height: 18px;
  }

  .rt-editor__header-desc {
    font-size: 0.9375rem;
    color: var(--rt-slate-600);
    margin: 0;
    max-width: 600px;
    line-height: 1.6;
  }

  .rt-editor__content {
    min-height: 500px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: rt-fade-in var(--rt-transition-slow) ease-out;
  }

  @keyframes rt-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .rt-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 48px;
  }

  .rt-empty-state__icon {
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    color: var(--rt-teal-300);
    animation: rt-float 3s ease-in-out infinite;
  }

  .rt-empty-state__icon svg {
    width: 100%;
    height: 100%;
  }

  @keyframes rt-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .rt-empty-state__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--rt-slate-700);
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }

  .rt-empty-state__subtitle {
    font-size: 1rem;
    color: var(--rt-slate-500);
    margin: 0;
  }
`;
