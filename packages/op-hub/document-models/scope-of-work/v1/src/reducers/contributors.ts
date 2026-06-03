import type { ScopeOfWorkContributorsOperations } from "document-models/scope-of-work/v1";
import {
  AgentDuplicateIdError,
  AgentNotFoundError,
} from "../../gen/contributors/error.js";

export const scopeOfWorkContributorsOperations: ScopeOfWorkContributorsOperations =
  {
    addAgentOperation(state, action) {
      // Check if agent with same ID already exists
      const existingAgent = state.contributors.find(
        (agent) => agent.id === action.input.id,
      );
      if (existingAgent) {
        throw new AgentDuplicateIdError(
          `Agent with ID ${action.input.id} already exists`,
        );
      }

      // Create new agent with correct structure matching GraphQL schema
      const agent = {
        id: action.input.id,
        name: action.input.name,
        icon: action.input.icon || null,
        description: action.input.description || null,
      };

      state.contributors.push(agent);
    },
    removeAgentOperation(state, action) {
      // Find agent by ID
      const agentIndex = state.contributors.findIndex(
        (agent) => agent.id === action.input.id,
      );
      if (agentIndex === -1) {
        throw new AgentNotFoundError(
          `Agent with ID ${action.input.id} not found`,
        );
      }

      // Remove agent from contributors array
      state.contributors.splice(agentIndex, 1);
    },
    editAgentOperation(state, action) {
      // Find agent by ID
      const agentIndex = state.contributors.findIndex(
        (agent) => agent.id === action.input.id,
      );
      if (agentIndex === -1) {
        throw new AgentNotFoundError(
          `Agent with ID ${action.input.id} not found`,
        );
      }

      // Update agent with provided fields, preserving existing values for optional fields
      const existingAgent = state.contributors[agentIndex];
      if (action.input.name) existingAgent.name = action.input.name;
      if (action.input.icon !== undefined)
        existingAgent.icon = action.input.icon || null;
      if (action.input.description !== undefined)
        existingAgent.description = action.input.description || null;
    },
  };
