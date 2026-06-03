import type {
  IProcessorHostModule,
  ProcessorApp,
  ProcessorFactoryBuilder,
  ProcessorFilter,
  ProcessorRecord,
} from "@powerhousedao/reactor-browser";
import type { PHDocumentHeader } from "document-model";
import { DriveOwnershipProcessor } from "./processor.js";

/**
 * Indexes drive ownership for EVERY drive (no editor/slug gate). One processor
 * instance per drive, each filtered to that drive's own operations
 * (`documentId: [driveId]`) so instances don't double-process — but all write
 * to the same shared `drive-ownership` namespace, giving the subgraph one
 * global `rs_drive` table to query.
 */
export const driveOwnershipFactoryBuilder: ProcessorFactoryBuilder =
  (module: IProcessorHostModule) =>
  async (
    driveHeader: PHDocumentHeader,
    _processorApp?: ProcessorApp,
  ): Promise<ProcessorRecord[]> => {
    const namespace = DriveOwnershipProcessor.getNamespace(driveHeader.id);

    const store =
      await module.relationalDb.createNamespace<DriveOwnershipProcessor>(
        namespace,
      );

    const filter: ProcessorFilter = {
      branch: ["main"],
      documentId: [driveHeader.id],
      documentType: ["powerhouse/document-drive"],
    };

    const processor = new DriveOwnershipProcessor(namespace, filter, store);

    await processor.initAndUpgrade();

    return [
      {
        processor,
        filter,
        startFrom: "beginning" as const,
      },
    ];
  };
