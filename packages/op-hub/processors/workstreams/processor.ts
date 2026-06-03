import { RelationalDbProcessor } from "@powerhousedao/reactor-browser";
import type { OperationWithContext } from "document-model";
import type { WorkstreamState } from "document-models/workstream";
import { up } from "./migrations.js";
import type { DB } from "./schema.js";

const slugify = (value: string): string =>
  value.toLowerCase().split(" ").join("-");

export class WorkstreamsProcessor extends RelationalDbProcessor<DB> {
  static override getNamespace(driveId: string): string {
    return super.getNamespace(driveId);
  }

  override async initAndUpgrade(): Promise<void> {
    await up(this.relationalDb);
  }

  override async onOperations(
    operations: OperationWithContext[],
  ): Promise<void> {
    for (const { operation, context } of operations) {
      const actionType = operation.action.type;

      if (context.documentType === "powerhouse/workstream") {
        const state = this.parseState(context.resultingState);
        if (state) {
          await this.upsertWorkstream(context.documentId, state);
        }
        continue;
      }

      if (
        context.documentType === "powerhouse/document-drive" &&
        actionType === "DELETE_NODE"
      ) {
        const input = operation.action.input as { id?: string };
        if (input.id) {
          await this.relationalDb
            .deleteFrom("workstreams")
            .where("workstream_phid", "=", input.id)
            .execute();
        }
      }
    }
  }

  async onDisconnect() {
    try {
      // Namespaced DB — this only clears rows for the current drive.
      await this.relationalDb.deleteFrom("workstreams").execute();
    } catch (error) {
      console.error(
        `[WorkstreamsProcessor] cleanup failed for namespace ${this.namespace}:`,
        error,
      );
    }
  }

  /**
   * `resultingState` is the post-reducer document state, JSON-encoded. The
   * envelope is sometimes the global state directly, sometimes wrapped in
   * `{ global: ... }`. Tolerate both, and never let one bad envelope kill
   * the whole batch.
   */
  private parseState(
    resultingState: string | undefined,
  ): WorkstreamState | null {
    if (!resultingState) return null;
    try {
      const parsed = JSON.parse(resultingState) as
        | WorkstreamState
        | { global: WorkstreamState };
      return "global" in parsed && parsed.global
        ? parsed.global
        : (parsed as WorkstreamState);
    } catch (error) {
      console.error(
        "[WorkstreamsProcessor] failed to parse resultingState:",
        error,
      );
      return null;
    }
  }

  /**
   * Single source of truth for a workstream row. Always derived from the
   * post-reducer state — never from action input — so action-specific
   * branches aren't needed.
   */
  private async upsertWorkstream(
    docId: string,
    state: WorkstreamState,
  ): Promise<void> {
    const sowFromProposal =
      state.initialProposal?.status === "ACCEPTED"
        ? state.initialProposal.sow
        : null;

    const values = {
      network_phid: state.client?.id ?? null,
      network_slug: state.client?.name ? slugify(state.client.name) : null,
      workstream_phid: docId,
      workstream_slug: state.title ? slugify(state.title) : "",
      workstream_title: state.title,
      workstream_status: state.status,
      sow_phid: state.sow || sowFromProposal || null,
      initial_proposal_status: state.initialProposal?.status ?? null,
      initial_proposal_author: state.initialProposal?.author.name ?? null,
    };

    await this.relationalDb
      .insertInto("workstreams")
      .values(values)
      .onConflict((oc) =>
        oc.column("workstream_phid").doUpdateSet({
          network_phid: values.network_phid,
          network_slug: values.network_slug,
          workstream_slug: values.workstream_slug,
          workstream_title: values.workstream_title,
          workstream_status: values.workstream_status,
          sow_phid: values.sow_phid,
          initial_proposal_status: values.initial_proposal_status,
          initial_proposal_author: values.initial_proposal_author,
        }),
      )
      .execute();
  }
}
