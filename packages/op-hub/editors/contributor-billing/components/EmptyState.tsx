interface EmptyStateProps {
  title?: string;
  description?: string;
}

/** Shows a contextual message when a folder or view has no content */
export function EmptyState({
  title = "This folder is empty",
  description = "Create your first document or drop one here",
}: EmptyStateProps) {
  return (
    <div className="py-12 text-center text-gray-500">
      <p className="text-lg">{title}</p>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
}
