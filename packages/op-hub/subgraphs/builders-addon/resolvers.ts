import { type ISubgraph } from "@powerhousedao/reactor-api";
import type { PHDocument } from "document-model";

type BuildersFilter = {
  id?: string;
  code?: string;
  name?: string;
  slug?: string;
  status?: string;
  skills?: string[];
  scopes?: string[];
  networkSlug?: string;
  isOperator?: boolean;
};

export const getResolvers = (subgraph: ISubgraph): Record<string, unknown> => {
  const reactorClient = (subgraph as any).reactorClient;

  const extractPhid = (value: unknown): string | null => {
    if (typeof value === "string") {
      return value.trim() || null;
    }
    if (
      value &&
      typeof value === "object" &&
      "id" in value &&
      typeof (value as any).id === "string"
    ) {
      const id = (value as any).id;
      return id.trim() || null;
    }
    return null;
  };

  const applyFilters = (builder: any, filter?: BuildersFilter): boolean => {
    if (!filter) return true;

    if (filter.id && builder.id !== filter.id) return false;
    if (
      filter.code &&
      String(builder.code || "").toLowerCase() !==
        String(filter.code || "").toLowerCase()
    )
      return false;
    if (
      filter.name &&
      !String(builder.name || "")
        .toLowerCase()
        .includes(String(filter.name || "").toLowerCase())
    )
      return false;
    if (
      filter.slug &&
      String(builder.slug || "").toLowerCase() !==
        String(filter.slug || "").toLowerCase()
    )
      return false;
    if (
      filter.status &&
      String(builder.status || "").toLowerCase() !==
        String(filter.status || "").toLowerCase()
    )
      return false;

    if (filter.skills && filter.skills.length > 0) {
      const builderSkills = (builder.skills || []).map((s: string) =>
        String(s).toLowerCase(),
      );
      const hasAllSkills = filter.skills.every((skill) =>
        builderSkills.includes(String(skill).toLowerCase()),
      );
      if (!hasAllSkills) return false;
    }

    if (filter.scopes && filter.scopes.length > 0) {
      const builderScopes = (builder.scopes || []).map((s: string) =>
        String(s).toLowerCase(),
      );
      const hasAllScopes = filter.scopes.every((scope) =>
        builderScopes.includes(String(scope).toLowerCase()),
      );
      if (!hasAllScopes) return false;
    }

    if (filter.isOperator !== undefined && filter.isOperator !== null) {
      if (builder.isOperator !== filter.isOperator) return false;
    }

    return true;
  };

  return {
    Query: {
      builders: async (parent: unknown, args: { filter?: BuildersFilter }) => {
        const filter = args.filter;

        let builderDocs: PHDocument[] = [];
        let sowDocs: PHDocument[] = [];
        let resourceTemplateDocs: PHDocument[] = [];

        // If networkSlug is provided, find the network and its builders list
        if (filter?.networkSlug) {
          const targetNetworkSlug = filter.networkSlug.toLowerCase().trim();

          // Find network profiles
          const networkResults = await reactorClient.find({
            type: "powerhouse/network-profile",
          });

          const networkDoc = networkResults.results.find((doc: PHDocument) => {
            const state = (doc.state as any).global;
            if (!state?.name) return false;
            const slug = state.name.toLowerCase().trim().split(/\s+/).join("-");
            return slug === targetNetworkSlug;
          });

          if (networkDoc) {
            // Find the builders list document
            const buildersResults = await reactorClient.find({
              type: "powerhouse/builders",
            });
            const buildersDoc = buildersResults.results[0];

            let builderPhids: string[] = [];
            if (buildersDoc) {
              const state = buildersDoc.state.global;
              if (Array.isArray(state?.builders)) {
                builderPhids = state.builders.filter(
                  (id: any) => typeof id === "string",
                );
              }
            }

            // Fetch specific builder profiles by PHID
            builderDocs = (
              await Promise.all(
                builderPhids.map(async (phid) => {
                  try {
                    const doc = (await reactorClient.get(phid)) as PHDocument;
                    return doc.header.documentType ===
                      "powerhouse/builder-profile"
                      ? doc
                      : null;
                  } catch {
                    return null;
                  }
                }),
              )
            ).filter((doc): doc is PHDocument => doc !== null);
          }

          // Fetch SOW and resource-template documents
          const [sowResults, rtResults] = await Promise.all([
            reactorClient.find({ type: "powerhouse/scopeofwork" }),
            reactorClient
              .find({ type: "powerhouse/resource-template" })
              .catch(() => ({ results: [] })),
          ]);
          sowDocs = sowResults.results;
          resourceTemplateDocs = rtResults.results;
        } else {
          // Default: fetch all builder profiles, SOWs, and resource templates
          const [bpResults, sowResults, rtResults] = await Promise.all([
            reactorClient.find({ type: "powerhouse/builder-profile" }),
            reactorClient.find({ type: "powerhouse/scopeofwork" }),
            reactorClient
              .find({ type: "powerhouse/resource-template" })
              .catch(() => ({ results: [] })),
          ]);
          builderDocs = bpResults.results;
          sowDocs = sowResults.results;
          resourceTemplateDocs = rtResults.results;
        }

        // Step 2: Build a map of deliverable OID -> deliverable object for each SOW
        const sowDeliverablesMap = new Map<string, Map<string, any>>();

        for (const sowDoc of sowDocs) {
          const sowState = (sowDoc.state as any).global;
          if (!sowState || typeof sowState !== "object") continue;

          const deliverablesMap = new Map<string, any>();
          const deliverables = Array.isArray(sowState.deliverables)
            ? sowState.deliverables
            : [];

          for (const deliverable of deliverables) {
            if (!deliverable || typeof deliverable !== "object") continue;
            const deliverableId = deliverable.id;
            if (deliverableId && typeof deliverableId === "string") {
              deliverablesMap.set(deliverableId, deliverable);
            }
          }

          sowDeliverablesMap.set(sowDoc.header.id, deliverablesMap);
        }

        // Step 3: Extract projects from SOW documents and group by projectOwner
        const projectsByOwner = new Map<string, any[]>();

        for (const sowDoc of sowDocs) {
          const sowState = (sowDoc.state as any).global;
          if (!sowState || typeof sowState !== "object") continue;
          if (!Array.isArray(sowState.projects)) continue;

          const deliverablesMap =
            sowDeliverablesMap.get(sowDoc.header.id) || new Map();

          for (const project of sowState.projects) {
            if (!project || typeof project !== "object") continue;

            const ownerPhid = extractPhid(project.projectOwner);
            if (!ownerPhid) continue;

            let resolvedScope = null;
            if (project.scope && typeof project.scope === "object") {
              try {
                const scopeDeliverableOids = Array.isArray(
                  project.scope.deliverables,
                )
                  ? project.scope.deliverables
                  : [];

                const resolvedDeliverables = scopeDeliverableOids
                  .map((oid: unknown) => {
                    if (!oid || typeof oid !== "string") return null;
                    const deliverable = deliverablesMap.get(oid);
                    if (!deliverable || typeof deliverable !== "object")
                      return null;
                    try {
                      return {
                        id: deliverable.id || "",
                        icon: deliverable.icon ?? null,
                        title: String(deliverable.title || ""),
                        code: String(deliverable.code || ""),
                        description: String(deliverable.description || ""),
                        status: deliverable.status || "DRAFT",
                        workProgress: deliverable.workProgress ?? null,
                        keyResults: Array.isArray(deliverable.keyResults)
                          ? deliverable.keyResults.map((kr: any) => ({
                              id: kr?.id || "",
                              title: String(kr?.title || ""),
                              link: String(kr?.link || ""),
                            }))
                          : [],
                        budgetAnchor: deliverable.budgetAnchor ?? null,
                      };
                    } catch {
                      return null;
                    }
                  })
                  .filter((d: any) => d !== null);

                resolvedScope = {
                  deliverables: resolvedDeliverables,
                  status:
                    project.scope.status ||
                    project.scope.deliverableSetStatus ||
                    "DRAFT",
                  progress: project.scope.progress ?? null,
                  deliverablesCompleted: project.scope
                    .deliverablesCompleted ?? {
                    total: 0,
                    completed: 0,
                  },
                };
              } catch {
                resolvedScope = {
                  deliverables: [],
                  status: "DRAFT",
                  progress: null,
                  deliverablesCompleted: { total: 0, completed: 0 },
                };
              }
            }

            try {
              const builderProject = {
                id: project.id || "",
                code: String(project.code || ""),
                title: String(project.title || ""),
                slug: String(project.slug || ""),
                abstract: project.abstract ?? null,
                imageUrl: project.imageUrl ?? null,
                scope: resolvedScope,
                budgetType: project.budgetType ?? null,
                currency: project.currency ?? null,
                budget: project.budget ?? null,
                expenditure: project.expenditure ?? null,
              };

              if (!projectsByOwner.has(ownerPhid)) {
                projectsByOwner.set(ownerPhid, []);
              }
              projectsByOwner.get(ownerPhid)!.push(builderProject);
            } catch {
              continue;
            }
          }
        }

        // Step 3b: Extract products from resource-template documents
        const productsByOperator = new Map<string, any[]>();

        for (const rtDoc of resourceTemplateDocs) {
          const rtState = (rtDoc.state as any).global;
          if (!rtState || typeof rtState !== "object") continue;

          const operatorId = rtState.operatorId;
          if (!operatorId || typeof operatorId !== "string") continue;

          try {
            const product = {
              id: rtState.id || rtDoc.header.id,
              operatorId,
              title: String(rtState.title || ""),
              summary: String(rtState.summary || ""),
              description: rtState.description ?? null,
              thumbnailUrl: rtState.thumbnailUrl ?? null,
              infoLink: rtState.infoLink ?? null,
              status: rtState.status || "DRAFT",
              lastModified: rtState.lastModified ?? null,
              targetAudiences: Array.isArray(rtState.targetAudiences)
                ? rtState.targetAudiences
                : [],
              setupServices: Array.isArray(rtState.setupServices)
                ? rtState.setupServices
                : [],
              recurringServices: Array.isArray(rtState.recurringServices)
                ? rtState.recurringServices
                : [],
              facetTargets: Array.isArray(rtState.facetTargets)
                ? rtState.facetTargets
                : [],
              services: Array.isArray(rtState.services) ? rtState.services : [],
              optionGroups: Array.isArray(rtState.optionGroups)
                ? rtState.optionGroups
                : [],
              faqFields: Array.isArray(rtState.faqFields)
                ? rtState.faqFields
                : [],
              contentSections: Array.isArray(rtState.contentSections)
                ? rtState.contentSections
                : [],
            };

            if (!productsByOperator.has(operatorId)) {
              productsByOperator.set(operatorId, []);
            }
            productsByOperator.get(operatorId)!.push(product);
          } catch {
            // Skip on error
          }
        }

        // Step 4: Transform builder documents to BuilderProfileState format
        const builders = builderDocs
          .map((doc) => {
            const state = (doc.state as any).global;

            const name = String(state?.name ?? doc.header?.name ?? "");
            const icon = String(state?.icon ?? "");
            const description = String(state?.description ?? state?.slug ?? "");
            const about = String(state?.about ?? "");
            const isOperator = state?.isOperator ?? false;
            const operationalHubMember = state?.operationalHubMember ?? {
              name: null,
              phid: null,
            };
            const skills = Array.isArray(state?.skils)
              ? state.skils
              : Array.isArray(state?.skills)
                ? state.skills
                : [];
            const scopes = Array.isArray(state?.scopes) ? state.scopes : [];
            const links = Array.isArray(state?.links) ? state.links : [];
            const contributors = Array.isArray(state?.contributors)
              ? state.contributors
              : [];

            return {
              id: doc.header.id,
              code: state?.code ?? null,
              slug: state?.slug ?? null,
              name,
              icon,
              description,
              about,
              lastModified: state?.lastModified ?? null,
              isOperator,
              operationalHubMember,
              contributors,
              status: state?.status ?? null,
              skills,
              scopes,
              links,
              projects: projectsByOwner.get(doc.header.id) || [],
              products: productsByOperator.get(doc.header.id) || [],
            };
          })
          .filter((builder) => applyFilters(builder, filter));

        return builders;
      },
    },
    SOW_Progress: {
      __resolveType(obj: any) {
        if (obj && typeof obj === "object") {
          if (
            Object.prototype.hasOwnProperty.call(obj, "total") &&
            Object.prototype.hasOwnProperty.call(obj, "completed")
          ) {
            return "SOW_StoryPoint";
          }
          if (Object.prototype.hasOwnProperty.call(obj, "value")) {
            return "SOW_Percentage";
          }
          if (Object.prototype.hasOwnProperty.call(obj, "done")) {
            return "SOW_Binary";
          }
        }
        return null;
      },
    },
  };
};
