import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { setName } from "document-model";
import { useSelectedOperationalHubProfileDocument } from "../../document-models/operational-hub-profile/v1/hooks.js";
import { setOperationalHubName } from "../../document-models/operational-hub-profile/v1/gen/configuration/creators.js";
import { Input } from "@powerhousedao/document-engineering";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
} from "@powerhousedao/reactor-browser";
import { SetOperatorTeam } from "./components/SetOperatorTeam.js";
import { SubteamsPicker } from "./components/SubteamsPicker.js";
import { ProfileOverview } from "./components/ProfileOverview.js";

export default function Editor() {
  const [document, dispatch] = useSelectedOperationalHubProfileDocument();
  const parentFolder = useParentFolderForSelectedNode();

  const [mode, setMode] = useState<"overview" | "edit">("overview");

  // Local state for controlled input - only dispatch on blur
  const [localName, setLocalName] = useState("");

  // Sync local state with document state when document changes
  useEffect(() => {
    if (document) {
      setLocalName(document.state.global.name || "");
    }
  }, [document?.state.global.name]);

  if (!document || !dispatch) {
    return <div>Loading...</div>;
  }

  const { name, operatorTeam, subteams } = document.state.global;
  const isConfigured = Boolean(name?.trim());
  const showOverview = isConfigured && mode === "overview";

  const handleNameBlur = () => {
    const trimmedName = localName.trim();
    if (trimmedName !== document.state.global.name) {
      dispatch(setOperationalHubName({ name: trimmedName }));
      dispatch(setName(trimmedName));
    }
  };

  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  return (
    <div className="h-screen flex flex-col">
      <DocumentToolbar document={document} />
      <div className="flex-1 overflow-auto">
        {showOverview ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProfileOverview
              name={name}
              operatorTeam={operatorTeam}
              subteams={subteams}
              onEdit={() => setMode("edit")}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {isConfigured && (
              <button
                type="button"
                onClick={() => setMode("overview")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Overview
              </button>
            )}

            {/* Header Section */}
            <section className="bg-card rounded-lg shadow-sm border border-border">
              <div className="px-4 sm:px-6 py-4 sm:py-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Operational Hub Profile
                </h1>

                {/* Name Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hub Name
                  </label>
                  <Input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    onBlur={handleNameBlur}
                    placeholder="Enter hub name..."
                    className="w-full"
                  />
                </div>

                {/* Operator Team Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Operator Team{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </label>
                  <SetOperatorTeam
                    operatorTeam={operatorTeam}
                    dispatch={dispatch}
                    opHubPhid={document.header.id}
                    opHubName={document.state.global.name || ""}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Link to the builder team that operates this hub
                  </p>
                </div>
              </div>
            </section>

            {/* Subteams Section */}
            <section className="bg-card rounded-lg shadow-sm border border-border">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Subteams{" "}
                  <span className="text-muted-foreground font-normal text-base">
                    (optional)
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Add builder teams that are managed by this operational hub
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <SubteamsPicker
                  subteams={subteams}
                  operatorTeam={operatorTeam}
                  dispatch={dispatch}
                  opHubPhid={document.header.id}
                  opHubName={document.state.global.name || ""}
                />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
