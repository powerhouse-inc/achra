import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";

interface DocumentHeaderProps {
  document: {
    header: {
      id: string;
      name: string;
      documentType: string;
      createdAtUtcIso: string;
      lastModifiedAtUtcIso: string;
    };
  };
  onNameChange: (name: string) => void;
}

export function DocumentHeader({
  document,
  onNameChange,
}: DocumentHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(document.header.name);

  function handleSave() {
    if (name.trim()) {
      onNameChange(name.trim());
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setName(document.header.name);
    setIsEditing(false);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-2 text-2xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
              />
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                {document.header.name}
              </h1>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Edit document name"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">Document ID:</span>
              <span className="text-gray-900 font-mono text-xs">
                {document.header.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">Type:</span>
              <span className="text-gray-900">
                {document.header.documentType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">Created:</span>
              <span className="text-gray-900">
                {new Date(document.header.createdAtUtcIso).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-500">Last Modified:</span>
              <span className="text-gray-900">
                {new Date(
                  document.header.lastModifiedAtUtcIso,
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
