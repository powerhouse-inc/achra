import { BaseSubgraph, type SubgraphArgs } from "@powerhousedao/reactor-api";
import { type IAnalyticsStore } from "@powerhousedao/analytics-engine-core";
import type { DocumentNode } from "graphql";
import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class WorkstreamsSubgraph extends BaseSubgraph {
  name = "workstreams";
  typeDefs: DocumentNode = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};

  analyticsStore: IAnalyticsStore;

  constructor(args: SubgraphArgs) {
    super(args);
    this.analyticsStore = args.analyticsStore;
  }

  async onSetup() {}
  async onDisconnect() {}
}
