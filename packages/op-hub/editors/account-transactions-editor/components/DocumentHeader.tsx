import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";
import type { AccountTransactionsDocument } from "../../../document-models/account-transactions/v1/gen/types.js";

interface DocumentHeaderProps {
  document: AccountTransactionsDocument;
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
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-3 flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter document name"
              className="flex-1 px-4 py-2 text-2xl font-semibold border border-input bg-background text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 text-sm rounded-lg font-medium transition-colors"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-accent transition-colors"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-foreground">
              {document.header.name}
            </h1>
            <Button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-accent transition-colors"
            >
              Edit Name
            </Button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">ID:</span>
          <p className="font-mono text-xs break-all text-foreground">
            {document.header.id}
          </p>
        </div>
        <div>
          <span className="font-medium text-foreground">Type:</span>
          <p className="text-foreground">{document.header.documentType}</p>
        </div>
        <div>
          <span className="font-medium text-foreground">Created:</span>
          <p className="text-foreground">
            {new Date(document.header.createdAtUtcIso).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="font-medium text-foreground">Modified:</span>
          <p className="text-foreground">
            {new Date(
              document.header.lastModifiedAtUtcIso,
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
