import { type BaseSubgraph } from "@powerhousedao/reactor-api";
import type { NetworkProfileDocument } from "document-models/network-profile";
import type { BuildersDocument } from "document-models/builders";
import type { PHDocument } from "document-model";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const reactorClient = subgraph.reactorClient;

  // Shared state for builder profile resolution (used by field resolvers)
  let getBuilderProfileByPhid: ((phid: string) => any) | null = null;

  return {
    Query: {
      allNetworks: async (
        _: unknown,
        args: { filter?: { networkSlug?: string } },
      ) => {
        // Step 1: Find all network-profile and builders documents
        const [networkResults, buildersResults, builderProfileResults] =
          await Promise.all([
            reactorClient.find({ type: "powerhouse/network-profile" }),
            reactorClient.find({ type: "powerhouse/builders" }),
            reactorClient.find({ type: "powerhouse/builder-profile" }),
          ]);

        const networkDocs = networkResults.results as NetworkProfileDocument[];
        const buildersDocs = buildersResults.results as BuildersDocument[];

        // Step 2: Collect all unique builder PHIDs from all BuildersDocuments
        const allBuilderPhids = new Set<string>();
        buildersDocs.forEach((buildersDoc) => {
          const builders = buildersDoc.state.global.builders;
          if (Array.isArray(builders)) {
            builders.forEach((phid) => {
              if (phid) {
                allBuilderPhids.add(phid);
              }
            });
          }
        });

        // Also collect contributor PHIDs from builder profiles
        const contributorPhids = new Set<string>();

        // Step 3: Build map of builder profile documents
        const builderProfileMap = new Map<string, PHDocument>();
        builderProfileResults.results.forEach((doc) => {
          if (doc.header.documentType === "powerhouse/builder-profile") {
            builderProfileMap.set(doc.header.id, doc);
            const state = (doc.state as any).global;
            if (state?.contributors && Array.isArray(state.contributors)) {
              state.contributors.forEach((phid: string) => {
                if (phid && !builderProfileMap.has(phid)) {
                  contributorPhids.add(phid);
                }
              });
            }
          }
        });

        // Fetch any builder profiles by PHID that weren't found via find()
        const missingPhids = Array.from(allBuilderPhids).filter(
          (phid) => !builderProfileMap.has(phid),
        );
        if (missingPhids.length > 0) {
          const missingDocs = await Promise.all(
            missingPhids.map(async (phid) => {
              try {
                return await reactorClient.get<PHDocument>(phid);
              } catch {
                return null;
              }
            }),
          );
          missingDocs.forEach((doc) => {
            if (
              doc &&
              doc.header.documentType === "powerhouse/builder-profile"
            ) {
              builderProfileMap.set(doc.header.id, doc);
              const state = (doc.state as any).global;
              if (state?.contributors && Array.isArray(state.contributors)) {
                state.contributors.forEach((phid: string) => {
                  if (phid && !builderProfileMap.has(phid)) {
                    contributorPhids.add(phid);
                  }
                });
              }
            }
          });
        }

        // Step 4: Fetch contributor builder profiles if any were found
        if (contributorPhids.size > 0) {
          const contributorDocs = await Promise.all(
            Array.from(contributorPhids).map(async (phid) => {
              try {
                return await reactorClient.get<PHDocument>(phid);
              } catch {
                return null;
              }
            }),
          );

          contributorDocs.forEach((doc) => {
            if (
              doc &&
              doc.header.documentType === "powerhouse/builder-profile"
            ) {
              builderProfileMap.set(doc.header.id, doc);
            }
          });
        }

        // Step 5: Helper function to get builder profile data by PHID
        getBuilderProfileByPhid = (phid: string) => {
          const doc = builderProfileMap.get(phid);
          if (!doc) return null;

          const state = (doc.state as any).global;
          const cpPhids = state?.contributors || [];
          return {
            id: doc.header.id,
            code: state?.code || null,
            slug: state?.slug || null,
            name: state?.name || doc.header.name,
            icon: state?.icon || "",
            description: state?.description || state?.slug || "",
            lastModified: state.lastModified || null,
            isOperator: state?.isOperator ?? false,
            operationalHubMember: state?.operationalHubMember ?? {
              name: null,
              phid: null,
            },
            _contributorPhids: cpPhids,
            status: state?.status || null,
            skills: state?.skils || state?.skills || [],
            scopes: state?.scopes || [],
            links: state?.links || [],
          };
        };

        // Step 6: Map each network to its builders
        const allNetworks = networkDocs.map((doc) => {
          const state = doc.state.global;

          // Find a builders doc (use first one found — in practice there's one per drive)
          const buildersDoc = buildersDocs[0];

          const builders =
            buildersDoc && getBuilderProfileByPhid
              ? (buildersDoc.state.global.builders || [])
                  .map((phid: string) => getBuilderProfileByPhid!(phid))
                  .filter((builder: unknown) => builder !== null)
              : [];

          return {
            id: doc.header.id,
            documentType: doc.header.documentType,
            network: {
              name: state.name,
              slug: state.name
                ? state.name.toLowerCase().trim().split(/\s+/).join("-")
                : null,
              icon: state.icon,
              darkThemeIcon: (state as any).darkThemeIcon ?? null,
              logo: state.logo,
              darkThemeLogo: (state as any).darkThemeLogo ?? null,
              logoBig: state.logoBig,
              website: state.website ?? null,
              description: state.description,
              category: state.category,
              x: state.x ?? null,
              github: state.github ?? null,
              discord: state.discord ?? null,
              youtube: state.youtube ?? null,
            },
            builders: builders,
          };
        });

        // Step 7: Apply filter if provided
        const networkSlug = args.filter?.networkSlug;
        if (networkSlug) {
          return allNetworks.filter(
            (network) => network.network.slug === networkSlug,
          );
        }

        return allNetworks;
      },
    },
    Builder: {
      contributors: (parent: { _contributorPhids?: string[] }) => {
        if (
          !parent._contributorPhids ||
          parent._contributorPhids.length === 0
        ) {
          return [];
        }
        if (!getBuilderProfileByPhid) {
          return [];
        }
        return parent._contributorPhids
          .map((phid: string) => getBuilderProfileByPhid!(phid))
          .filter((builder: unknown) => builder !== null);
      },
    },
  };
};
