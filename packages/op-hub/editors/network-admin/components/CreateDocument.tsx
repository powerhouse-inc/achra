import { Button } from "@powerhousedao/document-engineering";
import {
  showCreateDocumentModal,
  useAllowedDocumentModelModules,
  useSelectedDriveId,
} from "@powerhousedao/reactor-browser";
import type { DocumentModelModule } from "document-model";

export function CreateDocument() {
  const selectedDriveId = useSelectedDriveId();
  const allowedDocumentModelModules = useAllowedDocumentModelModules();

  function handleAddDocument(module: DocumentModelModule) {
    if (!selectedDriveId) {
      return;
    }

    showCreateDocumentModal(module.documentModel.global.id);
  }

  return (
    <div>
      <h3 className="mb-3 mt-4 text-sm font-bold text-muted-foreground">
        Create document
      </h3>
      <div className="flex w-full flex-wrap gap-4">
        {allowedDocumentModelModules?.map((documentModelModule) => {
          return (
            <Button
              key={documentModelModule.documentModel.global.id}
              color="light"
              className="cursor-pointer border border-border bg-muted p-2 text-foreground hover:bg-accent"
              title={documentModelModule.documentModel.global.name}
              aria-description={
                documentModelModule.documentModel.global.description
              }
              onClick={() => handleAddDocument(documentModelModule)}
            >
              <span className="text-sm">
                {documentModelModule.documentModel.global.name}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
