import { useState, useCallback } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
  CustomerType,
} from "document-models/subscription-instance";
import type { ViewMode } from "../types.js";
import { setCustomerType } from "../../../document-models/subscription-instance/v1/gen/customer/creators.js";
import { updateCustomerInfo } from "../../../document-models/subscription-instance/v1/gen/subscription/creators.js";

interface CustomerInfoProps {
  document: SubscriptionInstanceDocument;
  dispatch: DocumentDispatch<SubscriptionInstanceAction>;
  mode: ViewMode;
}

export function CustomerInfo({ document, dispatch, mode }: CustomerInfoProps) {
  const state = document.state.global;

  // Edit states for different fields
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(state.customerName || "");

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editEmail, setEditEmail] = useState(state.customerEmail || "");

  const [isEditingType, setIsEditingType] = useState(false);
  const [editType, setEditType] = useState<CustomerType>(
    state.customerType || "INDIVIDUAL",
  );
  const [editMemberCount, setEditMemberCount] = useState(
    state.teamMemberCount || 1,
  );

  // Name handlers
  const handleSaveName = useCallback(() => {
    dispatch(
      updateCustomerInfo({
        customerName: editName || undefined,
      }),
    );
    setIsEditingName(false);
  }, [dispatch, editName]);

  const handleCancelName = useCallback(() => {
    setEditName(state.customerName || "");
    setIsEditingName(false);
  }, [state.customerName]);

  // Email handlers
  const handleSaveEmail = useCallback(() => {
    dispatch(
      updateCustomerInfo({
        customerEmail: editEmail || undefined,
      }),
    );
    setIsEditingEmail(false);
  }, [dispatch, editEmail]);

  const handleCancelEmail = useCallback(() => {
    setEditEmail(state.customerEmail || "");
    setIsEditingEmail(false);
  }, [state.customerEmail]);

  // Type handlers
  const handleSaveType = useCallback(() => {
    dispatch(
      setCustomerType({
        customerType: editType,
        teamMemberCount: editType === "TEAM" ? editMemberCount : undefined,
      }),
    );
    setIsEditingType(false);
  }, [dispatch, editType, editMemberCount]);

  const handleCancelType = useCallback(() => {
    setEditType(state.customerType || "INDIVIDUAL");
    setEditMemberCount(state.teamMemberCount || 1);
    setIsEditingType(false);
  }, [state.customerType, state.teamMemberCount]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Edit button component for reuse
  const EditButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      className="si-customer-info__edit-btn"
      onClick={onClick}
      aria-label="Edit"
    >
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    </button>
  );

  return (
    <div className="si-panel si-panel--compact">
      <div className="si-panel__header">
        <h3 className="si-panel__title">
          {mode === "client" ? "Your Information" : "Customer Information"}
        </h3>
      </div>

      <div className="si-customer-info">
        {/* Customer Details */}
        <div className="si-customer-info__section">
          {/* Name - Editable */}
          <div className="si-customer-info__row">
            <span className="si-customer-info__label">Name</span>
            {isEditingName ? (
              <div className="si-customer-info__edit-field">
                <input
                  type="text"
                  className="si-input si-input--sm"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter name..."
                />
                <div className="si-customer-info__edit-actions">
                  <button
                    type="button"
                    className="si-btn si-btn--xs si-btn--ghost"
                    onClick={handleCancelName}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="si-btn si-btn--xs si-btn--primary"
                    onClick={handleSaveName}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <span className="si-customer-info__value">
                {state.customerName || (
                  <span className="si-customer-info__value--empty">
                    Not set
                  </span>
                )}
                <EditButton onClick={() => setIsEditingName(true)} />
              </span>
            )}
          </div>

          {/* Email - Editable */}
          <div className="si-customer-info__row">
            <span className="si-customer-info__label">Email</span>
            {isEditingEmail ? (
              <div className="si-customer-info__edit-field">
                <input
                  type="email"
                  className="si-input si-input--sm"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="email@example.com"
                />
                <div className="si-customer-info__edit-actions">
                  <button
                    type="button"
                    className="si-btn si-btn--xs si-btn--ghost"
                    onClick={handleCancelEmail}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="si-btn si-btn--xs si-btn--primary"
                    onClick={handleSaveEmail}
                    disabled={editEmail !== "" && !isValidEmail(editEmail)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <span className="si-customer-info__value">
                {state.customerEmail || (
                  <span className="si-customer-info__value--empty">
                    Not set
                  </span>
                )}
                <EditButton onClick={() => setIsEditingEmail(true)} />
              </span>
            )}
          </div>

          {/* Type - Editable */}
          <div className="si-customer-info__row">
            <span className="si-customer-info__label">Type</span>
            {isEditingType ? (
              <div className="si-customer-info__edit-field">
                <div className="si-customer-info__type-edit">
                  <select
                    className="si-input si-input--sm si-select"
                    value={editType}
                    onChange={(e) =>
                      setEditType(e.target.value as CustomerType)
                    }
                  >
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="TEAM">Team</option>
                  </select>
                  {editType === "TEAM" && (
                    <input
                      type="number"
                      className="si-input si-input--sm si-input--number"
                      value={editMemberCount}
                      onChange={(e) =>
                        setEditMemberCount(parseInt(e.target.value) || 1)
                      }
                      min="1"
                      placeholder="Members"
                    />
                  )}
                </div>
                <div className="si-customer-info__edit-actions">
                  <button
                    type="button"
                    className="si-btn si-btn--xs si-btn--ghost"
                    onClick={handleCancelType}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="si-btn si-btn--xs si-btn--primary"
                    onClick={handleSaveType}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <span className="si-customer-info__value">
                {state.customerType ? (
                  <>
                    {state.customerType === "TEAM" ? "Team" : "Individual"}
                    {state.customerType === "TEAM" && state.teamMemberCount && (
                      <span className="si-customer-info__detail">
                        {" "}
                        ({state.teamMemberCount} members)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="si-customer-info__value--empty">
                    Not set
                  </span>
                )}
                <EditButton onClick={() => setIsEditingType(true)} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
