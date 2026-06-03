import { useSetPHAppConfig } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { DriveExplorer } from "./components/DriveExplorer.js";
import { editorConfig } from "./config.js";

/** Editor component for the BuilderTeamAdmin drive editor */
export default function Editor(props: EditorProps) {
  useSetPHAppConfig(editorConfig);
  return <DriveExplorer {...props} />;
}
