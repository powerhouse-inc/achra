import { useState } from "react";
import { Button, Form, StringField } from "@powerhousedao/document-engineering";
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

  function handleSubmit(values: { name: string }) {
    if (values.name) {
      onNameChange(values.name);
      setIsEditing(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <Form
            onSubmit={handleSubmit}
            defaultValues={{ name: document.header.name }}
            className="flex items-center gap-3 flex-1"
          >
            <div className="flex-1">
              <StringField
                name="name"
                placeholder="Enter document name"
                className="text-2xl font-semibold border-0 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent p-0"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 text-sm"
              >
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              {document.header.name}
            </h1>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 text-sm border border-gray-300"
            >
              Edit Name
            </Button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">ID:</span>
          <p className="font-mono text-xs break-all">{document.header.id}</p>
        </div>
        <div>
          <span className="font-medium">Type:</span>
          <p>{document.header.documentType}</p>
        </div>
        <div>
          <span className="font-medium">Created:</span>
          <p>
            {new Date(document.header.createdAtUtcIso).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="font-medium">Modified:</span>
          <p>
            {new Date(
              document.header.lastModifiedAtUtcIso,
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
