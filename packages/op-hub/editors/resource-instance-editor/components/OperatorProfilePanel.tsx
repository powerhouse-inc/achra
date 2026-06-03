import { useState, useCallback } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  ResourceInstanceAction,
  ResourceInstanceDocument,
} from "document-models/resource-instance";
import { setOperatorProfile } from "../../../document-models/resource-instance/v1/gen/instance-management/creators.js";
import { useBuilderProfiles } from "../hooks/useBuilderProfiles.js";
import type { ViewMode } from "../types.js";

interface OperatorProfilePanelProps {
  document: ResourceInstanceDocument;
  dispatch: DocumentDispatch<ResourceInstanceAction>;
  mode: ViewMode;
}

export function OperatorProfilePanel({
  document,
  dispatch,
  mode,
}: OperatorProfilePanelProps) {
  const operatorProfile = document.state.global.operatorProfile;
  const { profiles, getProfileByPhid, isLoading } = useBuilderProfiles();
  const [isSelecting, setIsSelecting] = useState(false);

  // Resolve operator name: state first, then fetched profiles, then null
  const resolvedName = operatorProfile
    ? operatorProfile.operatorName ||
      getProfileByPhid(operatorProfile.id)?.name ||
      null
    : null;

  const handleSelectProfile = useCallback(
    (profileId: string) => {
      const profile = profiles.find((p) => p.id === profileId);
      if (profile) {
        dispatch(
          setOperatorProfile({
            operatorId: profile.id,
            operatorName: profile.name,
          }),
        );
      }
      setIsSelecting(false);
    },
    [dispatch, profiles],
  );

  return (
    <div className="ri-panel ri-panel--compact">
      <div className="ri-panel__header">
        <h3 className="ri-panel__title">Operator</h3>
        {mode === "operator" && (
          <button
            type="button"
            className="ri-btn ri-btn--ghost ri-btn--sm"
            onClick={() => setIsSelecting(!isSelecting)}
          >
            {operatorProfile ? "Change" : "Set Operator"}
          </button>
        )}
      </div>

      {/* Profile selector (operator mode) */}
      {isSelecting && mode === "operator" && (
        <div className="ri-profile-selector">
          {isLoading ? (
            <p className="ri-profile-selector__loading">Loading profiles...</p>
          ) : profiles.length === 0 ? (
            <p className="ri-profile-selector__empty">
              No builder profiles found
            </p>
          ) : (
            <div className="ri-profile-selector__list">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  className={`ri-profile-selector__item ${
                    operatorProfile?.id === profile.id
                      ? "ri-profile-selector__item--active"
                      : ""
                  }`}
                  onClick={() => handleSelectProfile(profile.id)}
                >
                  <span className="ri-profile-selector__name">
                    {profile.name}
                  </span>
                  <span className="ri-profile-selector__phid">
                    {profile.id}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Current operator display */}
      {operatorProfile ? (
        <div className="ri-profile">
          <div className="ri-profile__item">
            <span className="ri-profile__label">Operator</span>
            <span className="ri-profile__value">
              {resolvedName || (
                <span className="ri-profile__value--mono">
                  {operatorProfile.id}
                </span>
              )}
            </span>
          </div>
          {resolvedName && (
            <div className="ri-profile__item">
              <span className="ri-profile__label">PHID</span>
              <span className="ri-profile__value ri-profile__value--mono">
                {operatorProfile.id}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="ri-empty ri-empty--sm">
          <p className="ri-empty__text">No operator linked</p>
        </div>
      )}
    </div>
  );
}
