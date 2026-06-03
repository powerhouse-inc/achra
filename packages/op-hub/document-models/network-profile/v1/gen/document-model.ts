import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/network-profile",
  name: "Network Profile",
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  extension: "",
  description:
    "Document model for managing network profile information including social media links and branding.",
  specifications: [
    {
      state: {
        local: {
          schema: "",
          examples: [],
          initialValue: "",
        },
        global: {
          schema:
            "type NetworkProfileState {\n  name: String!\n  icon: String!\n  darkThemeIcon: String!\n  logo: String!\n  darkThemeLogo: String!\n  logoBig: String!\n  website: String\n  description: String!\n  category: [NetworkCategory!]!\n  x: String\n  github: String\n  discord: String\n  youtube: String\n}\n\nenum NetworkCategory {\n  DEFI\n  OSS\n  CRYPTO\n  NGO\n  CHARITY\n}",
          examples: [],
          initialValue:
            '{\n  "name": "",\n  "icon": "",\n  "darkThemeIcon": "",\n  "logo": "",\n  "darkThemeLogo": "",\n  "logoBig": "",\n  "website": null,\n  "description": "",\n  "category": [],\n  "x": null,\n  "github": null,\n  "discord": null,\n  "youtube": null\n}',
        },
      },
      modules: [
        {
          id: "network-profile-management",
          name: "network-profile-management",
          description:
            "Operations for managing network profile information including basic details and social media links",
          operations: [
            {
              id: "set-icon-op",
              name: "SET_ICON",
              description: "Sets the icon for the network profile",
              schema:
                "input SetIconInput {\n  icon: String\n  darkThemeIcon: String\n}",
              template: "Sets the icon for the network profile",
              reducer:
                'if (action.input.icon) state.icon = action.input.icon;\nif (action.input.darkThemeIcon !== undefined) state.darkThemeIcon = action.input.darkThemeIcon || "";',
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-logo-op",
              name: "SET_LOGO",
              description: "Sets the logo for the network profile",
              schema:
                "input SetLogoInput {\n  logo: String\n  darkThemeLogo: String\n}",
              template: "Sets the logo for the network profile",
              reducer:
                'if (action.input.logo) state.logo = action.input.logo;\nif (action.input.darkThemeLogo !== undefined) state.darkThemeLogo = action.input.darkThemeLogo || "";',
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-logo-big-op",
              name: "SET_LOGO_BIG",
              description: "Sets the big logo for the network profile",
              schema: "input SetLogoBigInput {\n  logoBig: String!\n}",
              template: "Sets the big logo for the network profile",
              reducer: "state.logoBig = action.input.logoBig || '';",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-website-op",
              name: "SET_WEBSITE",
              description: "Sets the website URL for the network profile",
              schema: "input SetWebsiteInput {\n  website: String\n}",
              template: "Sets the website URL for the network profile",
              reducer: "state.website = action.input.website || '';",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-description-op",
              name: "SET_DESCRIPTION",
              description: "Sets the description for the network profile",
              schema: "input SetDescriptionInput {\n  description: String!\n}",
              template: "Sets the description for the network profile",
              reducer: "state.description = action.input.description || '';",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-category-op",
              name: "SET_CATEGORY",
              description: "Sets the category for the network profile",
              schema:
                "input SetCategoryInput {\n  category: [NetworkCategory!]!\n}",
              template: "Sets the category for the network profile",
              reducer: "state.category = action.input.category || null;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-x-op",
              name: "SET_X",
              description:
                "Sets the X (Twitter) handle for the network profile",
              schema: "input SetXInput {\n  x: String\n}",
              template: "Sets the X (Twitter) handle for the network profile",
              reducer: "state.x = action.input.x || null;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-github-op",
              name: "SET_GITHUB",
              description: "Sets the GitHub username for the network profile",
              schema: "input SetGithubInput {\n  github: String\n}",
              template: "Sets the GitHub username for the network profile",
              reducer: "state.github = action.input.github || null;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-discord-op",
              name: "SET_DISCORD",
              description:
                "Sets the Discord invite or username for the network profile",
              schema: "input SetDiscordInput {\n  discord: String\n}",
              template:
                "Sets the Discord invite or username for the network profile",
              reducer: "state.discord = action.input.discord || null;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-youtube-op",
              name: "SET_YOUTUBE",
              description: "Sets the YouTube channel for the network profile",
              schema: "input SetYoutubeInput {\n  youtube: String\n}",
              template: "Sets the YouTube channel for the network profile",
              reducer: "state.youtube = action.input.youtube || null;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-profile-name-op",
              name: "SET_PROFILE_NAME",
              description: "Sets the name of the network profile",
              schema: "input SetProfileNameInput {\n  name: String!\n}",
              template: "Sets the name of the network profile",
              reducer: "state.name = action.input.name || '';",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
      version: 1,
      changeLog: [],
    },
  ],
};
