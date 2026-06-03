import { RelationalDbProcessor } from "@powerhousedao/reactor-browser";
import type { OperationWithContext } from "document-model";
import { up } from "./migrations.js";
import type { DB } from "./schema.js";

/** Shared namespace — ALL drives index into this one table (not per-drive). */
export const DRIVE_OWNERSHIP_NAMESPACE = "drive-ownership";

/**
 * Maintains a global `rs_drive` index: for every drive, its creator wallet
 * (first signed op's `context.signer.user.address`), display name, and deleted
 * flag. One processor instance is created per drive (filtered to that drive's
 * ops via `documentId`), but they all share the same namespace/table, so the
 * resolver can answer "drives created by X" with a single indexed query rather
 * than scanning every drive's operation log.
 */
export class DriveOwnershipProcessor extends RelationalDbProcessor<DB> {
  // Constant namespace — ignore the per-drive id so every instance writes to
  // the same shared table.
  static override getNamespace(_driveId: string): string {
    return DRIVE_OWNERSHIP_NAMESPACE;
  }

  override async initAndUpgrade(): Promise<void> {
    await up(this.relationalDb);
  }

  override async onOperations(
    operations: OperationWithContext[],
  ): Promise<void> {
    for (const { operation, context } of operations) {
      if (context.documentType !== "powerhouse/document-drive") continue;
      const driveId = context.documentId;

      // Ensure a row exists for this drive before any update.
      await this.relationalDb
        .insertInto("rs_drive")
        .values({
          drive_id: driveId,
          name: null,
          owner_address: null,
          builder_profile_id: null,
          deleted: false,
          updated_at: new Date(),
        })
        .onConflict((oc) => oc.column("drive_id").doNothing())
        .execute();

      // Owner = first signed op (non-empty user.address) wins. Set once: the
      // WHERE owner_address IS NULL guard means later ops don't overwrite it,
      // and ops are replayed in index order. Genesis ops carry an empty-string
      // address (session key only), so length > 0 is the real signal.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- action.context is optional at runtime (genesis ops)
      const addr = operation.action.context?.signer?.user?.address;
      if (typeof addr === "string" && addr.length > 0) {
        await this.relationalDb
          .updateTable("rs_drive")
          .set({ owner_address: addr.toLowerCase(), updated_at: new Date() })
          .where("drive_id", "=", driveId)
          .where("owner_address", "is", null)
          .execute();
      }

      // resultingState is the post-reducer state for the op's scope. The drive
      // name lives in global state; the soft-delete flag in document state.
      const raw = this.parse(context.resultingState);
      const globalState =
        this.asRecord(raw?.global) ?? (context.scope === "global" ? raw : null);
      const documentState =
        this.asRecord(raw?.document) ??
        (context.scope === "document" ? raw : null);

      // Global state carries the drive name and the node tree. The drive's
      // builder profile is the file node typed `powerhouse/builder-profile`
      // — in an owner's drive there is one, created by that same owner.
      if (globalState) {
        const update: {
          name?: string;
          builder_profile_id?: string | null;
          updated_at: Date;
        } = { updated_at: new Date() };

        if (typeof globalState.name === "string") {
          update.name = globalState.name;
        }

        const nodes = globalState.nodes;
        if (Array.isArray(nodes)) {
          update.builder_profile_id = this.findBuilderProfileNodeId(nodes);
        }

        await this.relationalDb
          .updateTable("rs_drive")
          .set(update)
          .where("drive_id", "=", driveId)
          .execute();
      }

      const deleted =
        documentState?.isDeleted === true ||
        operation.action.type === "DELETE_DOCUMENT";
      if (deleted) {
        await this.relationalDb
          .updateTable("rs_drive")
          .set({ deleted: true, updated_at: new Date() })
          .where("drive_id", "=", driveId)
          .execute();
      }
    }
  }

  override async onDisconnect(): Promise<void> {}

  /** Parse resultingState JSON; tolerate per-scope or full-document envelopes. */
  private parse(
    resultingState: string | undefined,
  ): Record<string, unknown> | null {
    if (!resultingState) return null;
    try {
      const parsed: unknown = JSON.parse(resultingState);
      return this.asRecord(parsed);
    } catch (error) {
      console.error(
        "[DriveOwnershipProcessor] failed to parse resultingState:",
        error,
      );
      return null;
    }
  }

  /** Narrow an unknown value to a plain record, or null. */
  private asRecord(value: unknown): Record<string, unknown> | null {
    return typeof value === "object" && value !== null
      ? (value as Record<string, unknown>)
      : null;
  }

  /** The id of the drive's builder-profile file node, or null. */
  private findBuilderProfileNodeId(nodes: unknown[]): string | null {
    for (const entry of nodes) {
      const node = this.asRecord(entry);
      if (
        node?.kind === "file" &&
        node.documentType === "powerhouse/builder-profile" &&
        typeof node.id === "string"
      ) {
        return node.id;
      }
    }
    return null;
  }
}
