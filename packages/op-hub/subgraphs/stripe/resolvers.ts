import { type ISubgraph } from "@powerhousedao/reactor-api";
import { buildStripeMutations } from "./mutations.js";

export const getResolvers = (subgraph: ISubgraph): Record<string, unknown> => {
  return {
    Mutation: buildStripeMutations(subgraph.reactorClient),
  };
};
