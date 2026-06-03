import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { createQueryResolvers } from "./queries.js";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const reactorClient = subgraph.reactorClient;

  return {
    Query: createQueryResolvers(reactorClient, subgraph.relationalDb),
  };
};
