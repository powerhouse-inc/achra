// Drive link base URLs. Read from env so the deployment tells the process
// where it lives (containers can't introspect their public hostname). Local
// dev leaves them unset and gets localhost.
const DEFAULT_CONNECT_URL = "http://localhost:3001";
const DEFAULT_SWITCHBOARD_URL = "http://localhost:4001";

export function getDriveLink(driveSlug: string): string {
  const connect = (process.env.PH_CONNECT_URL ?? DEFAULT_CONNECT_URL).replace(
    /\/$/,
    "",
  );
  const switchboard = (
    process.env.PH_SWITCHBOARD_URL ?? DEFAULT_SWITCHBOARD_URL
  ).replace(/\/$/, "");
  return `${connect}/?driveUrl=${switchboard}/d/${driveSlug}`;
}
