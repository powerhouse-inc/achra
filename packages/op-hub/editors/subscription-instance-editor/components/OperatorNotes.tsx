import { useState, useCallback } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance";
import { setOperatorNotes } from "../../../document-models/subscription-instance/v1/gen/creators.js";

interface OperatorNotesProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
}

export function OperatorNotes({ document, dispatch }: OperatorNotesProps) {
  const currentNotes = document.state.global.operatorNotes || "";
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(currentNotes);

  const handleSave = useCallback(() => {
    dispatch(setOperatorNotes({ operatorNotes: notes || null }));
    setIsEditing(false);
  }, [dispatch, notes]);

  const handleCancel = useCallback(() => {
    setNotes(currentNotes);
    setIsEditing(false);
  }, [currentNotes]);

  return (
    <div className="si-operator-notes">
      <div className="si-operator-notes__header">
        <h4 className="si-operator-notes__title">
          <svg
            className="si-operator-notes__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Internal Notes
        </h4>
        {!isEditing && (
          <button
            type="button"
            className="si-btn si-btn--ghost si-btn--sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="si-operator-notes__edit">
          <textarea
            className="si-input si-input--textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal notes about this subscription..."
            rows={4}
          />
          <div className="si-operator-notes__actions">
            <button
              type="button"
              className="si-btn si-btn--ghost si-btn--sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="si-btn si-btn--primary si-btn--sm"
              onClick={handleSave}
            >
              Save Notes
            </button>
          </div>
        </div>
      ) : (
        <div className="si-operator-notes__content">
          {currentNotes ? (
            <p className="si-operator-notes__text">{currentNotes}</p>
          ) : (
            <p className="si-operator-notes__empty">No internal notes</p>
          )}
        </div>
      )}
    </div>
  );
}
