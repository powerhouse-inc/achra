import type { NetworkProfileNetworkProfileManagementOperations } from "document-models/network-profile/v1";

export const networkProfileNetworkProfileManagementOperations: NetworkProfileNetworkProfileManagementOperations =
  {
    setIconOperation(state, action) {
      if (action.input.icon) state.icon = action.input.icon;
      if (action.input.darkThemeIcon !== undefined)
        state.darkThemeIcon = action.input.darkThemeIcon || "";
    },
    setLogoOperation(state, action) {
      if (action.input.logo) state.logo = action.input.logo;
      if (action.input.darkThemeLogo !== undefined)
        state.darkThemeLogo = action.input.darkThemeLogo || "";
    },
    setLogoBigOperation(state, action) {
      state.logoBig = action.input.logoBig || "";
    },
    setWebsiteOperation(state, action) {
      state.website = action.input.website || "";
    },
    setDescriptionOperation(state, action) {
      state.description = action.input.description || "";
    },
    setCategoryOperation(state, action) {
      state.category = action.input.category || null;
    },
    setXOperation(state, action) {
      state.x = action.input.x || null;
    },
    setGithubOperation(state, action) {
      state.github = action.input.github || null;
    },
    setDiscordOperation(state, action) {
      state.discord = action.input.discord || null;
    },
    setYoutubeOperation(state, action) {
      state.youtube = action.input.youtube || null;
    },
    setProfileNameOperation(state, action) {
      state.name = action.input.name || "";
    },
  };
