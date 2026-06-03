import type { IRelationalDb } from "@powerhousedao/reactor-browser";

export async function up(db: IRelationalDb<any>): Promise<void> {
  try {
    await db.schema
      .createTable("workstreams")
      .addColumn("network_phid", "varchar(255)")
      .addColumn("network_slug", "varchar(255)")
      .addColumn("workstream_phid", "varchar(255)")
      .addColumn("workstream_slug", "varchar(255)")
      .addColumn("workstream_title", "varchar(255)")
      .addColumn("workstream_status", "varchar(255)")
      .addColumn("sow_phid", "varchar(255)")
      .addColumn("final_milestone_target", "timestamp")
      .addColumn("initial_proposal_status", "varchar(255)")
      .addColumn("initial_proposal_author", "varchar(255)")
      .addPrimaryKeyConstraint("workstreams_pkey", ["workstream_phid"])
      .ifNotExists()
      .execute();
    console.log(
      "[WorkstreamsProcessor] Table 'workstreams' created or already exists",
    );
  } catch (error) {
    console.error(
      "[WorkstreamsProcessor] Failed to create 'workstreams' table:",
      error,
    );
    throw error;
  }
}

export async function down(db: IRelationalDb<any>): Promise<void> {
  await db.schema.dropTable("workstreams").execute();
}
