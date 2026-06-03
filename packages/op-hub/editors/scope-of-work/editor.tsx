import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
} from "@powerhousedao/reactor-browser";
import { useSelectedScopeOfWorkDocument } from "../../document-models/scope-of-work/v1/hooks.js";
import SidebarMenu from "./sidebar/sidebar.js";

/** Implement your editor behavior here */
export default function Editor() {
  const [document] = useSelectedScopeOfWorkDocument();

  // Get the parent folder node for the currently selected node
  const parentFolder = useParentFolderForSelectedNode();

  // Set the selected node to the parent folder node (close the editor)
  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  if (!document) return null;

  return (
    <div>
      <DocumentToolbar document={document} />
      <SidebarMenu />
    </div>
  );
}
