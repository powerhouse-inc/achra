import type { ColumnType } from "kysely";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

/**
 * One row per drive, maintained by the DriveOwnershipProcessor across ALL
 * drives (single shared namespace). `owner_address` is the lowercased wallet of
 * the drive's first signed operation; `deleted` reflects the drive's
 * document-scope soft delete. Indexed on `owner_address` so "drives created by
 * X" is a single indexed lookup instead of scanning every drive's op log.
 */
export interface RsDrive {
  drive_id: string;
  name: string | null;
  owner_address: string | null;
  /** id of the builder-profile file node contained in the drive, if any. */
  builder_profile_id: string | null;
  deleted: boolean;
  updated_at: Timestamp;
}

export interface DB {
  rs_drive: RsDrive;
}
