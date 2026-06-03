import type { ColumnType } from "kysely";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Workstreams {
  final_milestone_target: Timestamp | null;
  initial_proposal_author: string | null;
  initial_proposal_status: string | null;
  network_phid: string | null;
  network_slug: string | null;
  sow_phid: string | null;
  workstream_phid: string;
  workstream_slug: string | null;
  workstream_status: string | null;
  workstream_title: string | null;
}

export interface DB {
  workstreams: Workstreams;
}
