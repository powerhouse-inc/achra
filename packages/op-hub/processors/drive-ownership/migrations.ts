import type { IRelationalDb } from "@powerhousedao/reactor-browser";

export async function up(db: IRelationalDb<any>): Promise<void> {
  try {
    await db.schema
      .createTable("rs_drive")
      .addColumn("drive_id", "varchar(255)")
      .addColumn("name", "varchar(255)")
      .addColumn("owner_address", "varchar(255)")
      .addColumn("builder_profile_id", "varchar(255)")
      .addColumn("deleted", "boolean", (c) => c.notNull().defaultTo(false))
      .addColumn("updated_at", "timestamp")
      .addPrimaryKeyConstraint("rs_drive_pkey", ["drive_id"])
      .ifNotExists()
      .execute();

    await db.schema
      .createIndex("rs_drive_owner_idx")
      .on("rs_drive")
      .column("owner_address")
      .ifNotExists()
      .execute();

    console.log("[DriveOwnershipProcessor] Table 'rs_drive' ready");
  } catch (error) {
    console.error(
      "[DriveOwnershipProcessor] Failed to create 'rs_drive':",
      error,
    );
    throw error;
  }

  // Idempotently add columns introduced after the table first shipped, so an
  // existing rs_drive (created before this column) gains it without a reset.
  try {
    await db.schema
      .alterTable("rs_drive")
      .addColumn("builder_profile_id", "varchar(255)")
      .execute();
  } catch {
    // column already exists — nothing to do
  }
}

export async function down(db: IRelationalDb<any>): Promise<void> {
  await db.schema.dropTable("rs_drive").execute();
}
