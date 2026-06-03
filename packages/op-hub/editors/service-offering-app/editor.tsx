import { useSetPHAppConfig } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { DriveExplorer } from "./components/DriveExplorer.js";
import { editorConfig } from "./config.js";

/** Editor component for the Service Offering App drive editor */
export default function Editor(props: EditorProps) {
  // set the config for this app — update these in `./config.ts`
  useSetPHAppConfig(editorConfig);
  return <DriveExplorer {...props} />;
}
