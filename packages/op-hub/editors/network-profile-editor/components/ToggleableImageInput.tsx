import { useState } from "react";
import { ImageUrlInput } from "./ImageUrlInput.js";

export function ToggleableImageInput({
  label,
  lightValue,
  darkValue,
  onLightChange,
  onDarkChange,
  lightPlaceholder,
  darkPlaceholder,
}: {
  label: string;
  lightValue: string;
  darkValue: string;
  onLightChange: (value: string) => void;
  onDarkChange: (value: string) => void;
  lightPlaceholder?: string;
  darkPlaceholder?: string;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="space-y-2">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-medium ${
              !isDarkMode ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Light
          </span>
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              isDarkMode ? "bg-primary" : "bg-muted"
            }`}
            aria-label={
              isDarkMode ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-xs font-medium ${
              isDarkMode ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Dark
          </span>
        </div>
      </div>
      <ImageUrlInput
        key={isDarkMode ? "dark" : "light"}
        label=""
        value={isDarkMode ? darkValue : lightValue}
        onChange={isDarkMode ? onDarkChange : onLightChange}
        placeholder={isDarkMode ? darkPlaceholder : lightPlaceholder}
      />
    </div>
  );
}
