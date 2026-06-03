import type { BuilderProfileBuildersOperations } from "document-models/builder-profile/v1";

export const builderProfileBuildersOperations: BuilderProfileBuildersOperations =
  {
    updateProfileOperation(state, action) {
      if (action.input.id) state.id = action.input.id;
      if (action.input.code) state.code = action.input.code;
      if (action.input.slug) state.slug = action.input.slug;
      if (action.input.name) state.name = action.input.name;
      if (action.input.icon) state.icon = action.input.icon;
      if (action.input.description) {
        if (action.input.description.length > 350) {
          throw new Error(
            `Description exceeds maximum length of 350 characters (${action.input.description.length} provided)`,
          );
        }
        state.description = action.input.description;
      }
      if (action.input.about) state.about = action.input.about;
      if (action.input.status) state.status = action.input.status;

      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    addSkillOperation(state, action) {
      if (action.input.skill) {
        if (!state.skills.includes(action.input.skill)) {
          state.skills.push(action.input.skill);
        }
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    removeSkillOperation(state, action) {
      if (action.input.skill) {
        const index = state.skills.indexOf(action.input.skill);
        if (index !== -1) {
          state.skills.splice(index, 1);
        }
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    addScopeOperation(state, action) {
      if (action.input.scope) {
        if (!state.scopes.includes(action.input.scope)) {
          state.scopes.push(action.input.scope);
        }
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    removeScopeOperation(state, action) {
      if (action.input.scope) {
        const index = state.scopes.indexOf(action.input.scope);
        if (index !== -1) {
          state.scopes.splice(index, 1);
        }
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    addLinkOperation(state, action) {
      const newLink = {
        id: action.input.id,
        url: action.input.url,
        label: action.input.label || null,
      };
      state.links.push(newLink);
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    editLinkOperation(state, action) {
      const linkIndex = state.links.findIndex(
        (link) => link.id === action.input.id,
      );
      if (linkIndex !== -1) {
        if (action.input.url) state.links[linkIndex].url = action.input.url;
        if (action.input.label)
          state.links[linkIndex].label = action.input.label;
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    removeLinkOperation(state, action) {
      const linkIndex = state.links.findIndex(
        (link) => link.id === action.input.id,
      );
      if (linkIndex !== -1) {
        state.links.splice(linkIndex, 1);
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    addContributorOperation(state, action) {
      if (action.input.contributorPHID) {
        if (!state.contributors.includes(action.input.contributorPHID)) {
          state.contributors.push(action.input.contributorPHID);
        }
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    removeContributorOperation(state, action) {
      if (action.input.contributorPHID) {
        const index = state.contributors.indexOf(action.input.contributorPHID);
        if (index !== -1) {
          state.contributors.splice(index, 1);
        }
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    setOperatorOperation(state, action) {
      state.isOperator = action.input.isOperator;
    },
    setOpHubMemberOperation(state, action) {
      if (action.input.name)
        state.operationalHubMember.name = action.input.name;
      if (action.input.phid)
        state.operationalHubMember.phid = action.input.phid;
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
    setWalletAddressOperation(state, action) {
      if (action.input.walletAddress) {
        state.walletAddress = action.input.walletAddress;
      }
      // Convert UTC timestamp (ms) to ISO string for storage
      state.lastModified = new Date(action.timestampUtcMs).toISOString();
    },
  };
