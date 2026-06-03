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
import { ImageUrlInput } from "./components/ImageUrlInput.js";
import { ToggleableImageInput } from "./components/ToggleableImageInput.js";

// Category options for the dropdown
const categoryOptions: Array<{ value: NetworkCategory; label: string }> = [
  { value: "DEFI", label: "DeFi" },
  { value: "OSS", label: "Open Source Software" },
  { value: "CRYPTO", label: "Crypto" },
  { value: "NGO", label: "NGO" },
  { value: "CHARITY", label: "Charity" },
];

export default function Editor() {
  const [doc, dispatch] = useSelectedNetworkProfileDocument();
  const state = doc.state.global;

  // Handle field changes
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
    <div className="min-h-screen w-full bg-gray-50">
      <DocumentToolbar />
      <div className="mx-auto max-w-4xl p-6">
        {/* Header Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Network Profile
          </h1>
        </div>

        {/* Main Form Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            {/* Network Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Network Name:
              </label>
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

            {/* Icon URL with Dark Theme Toggle */}
            <ToggleableImageInput
              label="Icon:"
              lightValue={state.icon || ""}
              darkValue={state.darkThemeIcon || ""}
              onLightChange={(value) => handleFieldChange("icon", value)}
              onDarkChange={(value) =>
                handleFieldChange("darkThemeIcon", value)
              }
              lightPlaceholder="icon.jpg"
              darkPlaceholder="icon-dark.jpg"
            />

            {/* Logo URL with Dark Theme Toggle */}
            <ToggleableImageInput
              label="Logo:"
              lightValue={state.logo || ""}
              darkValue={state.darkThemeLogo || ""}
              onLightChange={(value) => handleFieldChange("logo", value)}
              onDarkChange={(value) =>
                handleFieldChange("darkThemeLogo", value)
              }
              lightPlaceholder="logo.jpg"
              darkPlaceholder="logo-dark.jpg"
            />

            {/* Large Logo URL */}
            <ImageUrlInput
              label="Large Logo:"
              value={state.logoBig || ""}
              onChange={(value) => handleFieldChange("logoBig", value)}
              placeholder="LargeLogo.jpg"
              fileSize="10MB"
            />

            {/* Website */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website:
              </label>
              <TextInput
                className="w-full"
                defaultValue={state.website || ""}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  const value = e.target.value || null;
                  if (value !== state.website) {
                    handleFieldChange("website", value);
                  }
                }}
                placeholder="Enter website URL"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description:
              </label>
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

            {/* Category */}
            <div>
              <Select
                label="Category:"
                options={categoryOptions}
                value={state.category[0] || undefined}
                onChange={(value) =>
                  handleFieldChange("category", [value as NetworkCategory])
                }
              />
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Social Media Links
              </h3>

              {/* X Link */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  X Link:
                </label>
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

              {/* Discord Link */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discord Link:
                </label>
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

              {/* YouTube Link */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  YouTube Link:
                </label>
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
          </div>
        </div>
      </div>
    </div>
  );
}
