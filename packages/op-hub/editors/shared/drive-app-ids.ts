/**
 * Drive-app ids as declared by each app module's `config.id`. Drives created
 * before the apps were renamed still carry the legacy id in
 * `header.meta.preferredEditor`, so lookups must accept both.
 */
export const TEAM_ADMIN_APP_ID = "team-admin";
const LEGACY_TEAM_ADMIN_APP_ID = "builder-team-admin";

/** True when a drive's preferredEditor points at the team-admin app. */
export function isTeamAdminAppId(preferredEditor: string | null | undefined) {
  return (
    preferredEditor === TEAM_ADMIN_APP_ID ||
    preferredEditor === LEGACY_TEAM_ADMIN_APP_ID
  );
}
