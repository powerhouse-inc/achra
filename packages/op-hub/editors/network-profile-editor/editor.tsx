import {
  TextInput,
  Textarea,
  Select,
} from "@powerhousedao/document-engineering";
import {
  useSelectedNetworkProfileDocument,
  actions,
} from "document-models/network-profile";
import type { NetworkCategory } from "document-models/network-profile";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { useCallback } from "react";
import { Globe } from "lucide-react";
import { ImageUrlInput } from "./components/ImageUrlInput.js";
import { ToggleableImageInput } from "./components/ToggleableImageInput.js";

const categoryOptions: Array<{ value: NetworkCategory; label: string }> = [
  { value: "DEFI", label: "DeFi" },
  { value: "OSS", label: "Open Source Software" },
  { value: "CRYPTO", label: "Crypto" },
  { value: "NGO", label: "NGO" },
  { value: "CHARITY", label: "Charity" },
];

const fieldLabelClass = "mb-2 block text-sm font-medium text-foreground";

export default function Editor() {
  const [doc, dispatch] = useSelectedNetworkProfileDocument();
  const state = doc.state.global;

  const handleFieldChange = useCallback(
    (field: string, value: string | string[] | null) => {
      let action;
      switch (field) {
        case "name":
          action = actions.setProfileName({ name: value as string });
          break;
        case "icon":
          action = actions.setIcon({ icon: value as string });
          break;
        case "darkThemeIcon":
          action = actions.setIcon({ darkThemeIcon: value as string });
          break;
        case "logo":
          action = actions.setLogo({ logo: value as string });
          break;
        case "darkThemeLogo":
          action = actions.setLogo({ darkThemeLogo: value as string });
          break;
        case "logoBig":
          action = actions.setLogoBig({ logoBig: value as string });
          break;
        case "website":
          action = actions.setWebsite({ website: value as string | null });
          break;
        case "description":
          action = actions.setDescription({ description: value as string });
          break;
        case "category":
          action = actions.setCategory({
            category: value as NetworkCategory[],
          });
          break;
        case "x":
          action = actions.setX({ x: value as string | null });
          break;
        case "github":
          action = actions.setGithub({ github: value as string | null });
          break;
        case "discord":
          action = actions.setDiscord({ discord: value as string | null });
          break;
        case "youtube":
          action = actions.setYoutube({ youtube: value as string | null });
          break;
        default:
          console.error(`Unknown field: ${field}`);
          return;
      }

      dispatch(action);
    },
    [dispatch],
  );

  return (
    <div className="flex h-screen flex-col">
      <DocumentToolbar />
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">
          Network Profile
        </h1>
        {state.category[0] ? (
          <span className="rounded-full bg-status-progress/15 px-3 py-1 text-xs font-medium text-status-progress">
            {categoryOptions.find((c) => c.value === state.category[0])
              ?.label ?? state.category[0]}
          </span>
        ) : null}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {state.name || "Network profile"}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Configure how this network appears across the ecosystem —
                  branding, description, and social links.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border px-5 py-4">
                <h3 className="text-sm font-medium text-foreground">
                  Basic information
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Name, category, and public description.
                </p>
              </div>
              <div className="space-y-5 p-5">
                <div>
                  <label className={fieldLabelClass}>Network Name</label>
                  <TextInput
                    className="w-full"
                    defaultValue={state.name || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      if (e.target.value !== state.name) {
                        handleFieldChange("name", e.target.value);
                      }
                    }}
                    placeholder="Enter network name"
                  />
                </div>

                <div>
                  <Select
                    label="Category"
                    options={categoryOptions}
                    value={state.category[0] || undefined}
                    onChange={(value) =>
                      handleFieldChange("category", [value as NetworkCategory])
                    }
                  />
                </div>

                <div>
                  <label className={fieldLabelClass}>Description</label>
                  <Textarea
                    className="w-full"
                    defaultValue={state.description || ""}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                      if (e.target.value !== state.description) {
                        handleFieldChange("description", e.target.value);
                      }
                    }}
                    placeholder="Enter network description"
                    rows={4}
                  />
                </div>

                <div>
                  <label className={fieldLabelClass}>Website</label>
                  <TextInput
                    className="w-full"
                    defaultValue={state.website || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      const value = e.target.value || null;
                      if (value !== state.website) {
                        handleFieldChange("website", value);
                      }
                    }}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border px-5 py-4">
                <h3 className="text-sm font-medium text-foreground">
                  Branding
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Icons and logos for light and dark themes.
                </p>
              </div>
              <div className="space-y-5 p-5">
                <ToggleableImageInput
                  label="Icon"
                  lightValue={state.icon || ""}
                  darkValue={state.darkThemeIcon || ""}
                  onLightChange={(value) => handleFieldChange("icon", value)}
                  onDarkChange={(value) =>
                    handleFieldChange("darkThemeIcon", value)
                  }
                  lightPlaceholder="icon.jpg"
                  darkPlaceholder="icon-dark.jpg"
                />

                <ToggleableImageInput
                  label="Logo"
                  lightValue={state.logo || ""}
                  darkValue={state.darkThemeLogo || ""}
                  onLightChange={(value) => handleFieldChange("logo", value)}
                  onDarkChange={(value) =>
                    handleFieldChange("darkThemeLogo", value)
                  }
                  lightPlaceholder="logo.jpg"
                  darkPlaceholder="logo-dark.jpg"
                />

                <ImageUrlInput
                  label="Large Logo"
                  value={state.logoBig || ""}
                  onChange={(value) => handleFieldChange("logoBig", value)}
                  placeholder="LargeLogo.jpg"
                  fileSize="10MB"
                />
              </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border px-5 py-4">
                <h3 className="text-sm font-medium text-foreground">
                  Social media links
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Optional links shown on the network profile.
                </p>
              </div>
              <div className="space-y-5 p-5">
                <div>
                  <label className={fieldLabelClass}>X</label>
                  <TextInput
                    className="w-full"
                    defaultValue={state.x || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      const value = e.target.value || null;
                      if (value !== state.x) {
                        handleFieldChange("x", value);
                      }
                    }}
                    placeholder="https://x.com/YourHandle"
                  />
                </div>

                <div>
                  <label className={fieldLabelClass}>Discord</label>
                  <TextInput
                    className="w-full"
                    defaultValue={state.discord || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      const value = e.target.value || null;
                      if (value !== state.discord) {
                        handleFieldChange("discord", value);
                      }
                    }}
                    placeholder="https://discord.com/invite/YourServer"
                  />
                </div>

                <div>
                  <label className={fieldLabelClass}>YouTube</label>
                  <TextInput
                    className="w-full"
                    defaultValue={state.youtube || ""}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      const value = e.target.value || null;
                      if (value !== state.youtube) {
                        handleFieldChange("youtube", value);
                      }
                    }}
                    placeholder="https://www.youtube.com/YourChannel"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
