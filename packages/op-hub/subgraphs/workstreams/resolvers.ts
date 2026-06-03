import { type ISubgraph } from "@powerhousedao/reactor-api";
import { WorkstreamsProcessor } from "../../processors/workstreams/index.js";
import type { RequestForProposalsDocument } from "document-models/request-for-proposals";
import type { WorkstreamDocument } from "document-models/workstream";
import type { NetworkProfileDocument } from "document-models/network-profile";
import type { PHDocument } from "document-model";
import { sql, type ExpressionBuilder } from "kysely";
import type { DB } from "../../processors/workstreams/schema.js";

type WorkstreamFilterArgs = {
  workstreamId?: string | null;
  workstreamSlug?: string | null;
  networkId?: string | null;
  networkSlug?: string | null;
  networkName?: string | null;
  workstreamStatus?: string | null;
  workstreamStatuses?: (string | null)[] | null;
};

type WorkstreamsFilterArgs = {
  networkId?: string | null;
  networkSlug?: string | null;
  networkName?: string | null;
  networkNames?: (string | null)[] | null;
  workstreamTitle?: string | null;
  workstreamStatus?: string | null;
  workstreamStatuses?: (string | null)[] | null;
};

type ScopeOfWorkFilterArgs = {
  networkId?: string | null;
  networkSlug?: string | null;
  networkName?: string | null;
  workstreamId?: string | null;
  workstreamSlug?: string | null;
  workstreamStatus?: string | null;
  proposalRole?: string | null;
};

export const getResolvers = (subgraph: ISubgraph): Record<string, unknown> => {
  const reactorClient = (subgraph as any).reactorClient;
  const db = subgraph.relationalDb;

  // Shared state for builder profile resolution (used by field resolvers)
  let getBuilderProfileByPhid: ((phid: string) => any) | null = null;

  const deriveSlug = (name: string) =>
    name.toLowerCase().trim().split(/\s+/).join("-");

  const extractPhid = (value: unknown): string | null => {
    if (typeof value === "string") {
      // Return null for empty strings, otherwise return the string
      return value.trim() || null;
    }
    if (
      value &&
      typeof value === "object" &&
      "id" in value &&
      typeof (value as any).id === "string"
    ) {
      const id = (value as any).id;
      // Return null for empty strings
      return id.trim() || null;
    }
    return null;
  };

  // Normalize drive IDs to match the format used by the processor factory
  const normalizeDriveId = (driveId: string): string => {
    return driveId.replace(/\+/g, "-").replace(/=+$/, "");
  };

  const getCandidateDrives = async (): Promise<string[]> => {
    try {
      const result = await reactorClient.find({
        type: "powerhouse/document-drive",
      });
      if (result?.results?.length > 0) {
        return result.results
          .filter(
            (doc: any) => doc.header?.meta?.preferredEditor === "network-admin",
          )
          .map((doc: any) => normalizeDriveId(doc.header.id as string));
      }
    } catch {
      return [] as string[];
    }
    return [] as string[];
  };

  const loadLinkedDocument = async (id?: string | null) => {
    if (!id) return null;
    try {
      const linked = await reactorClient.get(id);
      return { id, stateJSON: linked.state.global };
    } catch {
      return { id, stateJSON: null };
    }
  };

  const loadRfpDetails = async (
    rfpRef?: { id?: string | null; title?: string | null } | null,
  ) => {
    if (!rfpRef?.id) {
      return null;
    }

    try {
      const rfpDoc = (await reactorClient.get(
        rfpRef.id,
      )) as RequestForProposalsDocument;
      const rfpState = rfpDoc.state.global as any;

      return {
        id: rfpRef.id,
        code: rfpState?.code ?? null,
        title: rfpRef.title ?? rfpState?.title ?? null,
        status: rfpState?.status ?? null,
        summary: rfpState?.summary ?? null,
        submissionDeadline: rfpState?.deadline ?? null,
        budgetMin: rfpState?.budgetRange?.min ?? null,
        budgetMax: rfpState?.budgetRange?.max ?? null,
        budgetCurrency: rfpState?.budgetRange?.currency ?? null,
        eligibilityCriteria: rfpState?.eligibilityCriteria ?? null,
        evaluationCriteria: rfpState?.evaluationCriteria ?? null,
        briefing: rfpState?.briefing ?? null,
      };
    } catch {
      return {
        id: rfpRef.id,
        code: null,
        title: rfpRef.title ?? null,
        status: null,
        summary: null,
        submissionDeadline: null,
        budgetMin: null,
        budgetMax: null,
        budgetCurrency: null,
        eligibilityCriteria: null,
        evaluationCriteria: null,
        briefing: null,
      };
    }
  };

  const loadNetworkProfile = async (networkId?: string | null) => {
    if (!networkId) {
      return null;
    }

    try {
      const networkDoc = (await reactorClient.get(
        networkId,
      )) as NetworkProfileDocument;
      const state = networkDoc.state.global as any;

      return {
        name: state.name ?? null,
        slug: state.name
          ? state.name.toLowerCase().trim().split(/\s+/).join("-")
          : null,
        icon: state.icon ?? null,
        darkThemeIcon: state.darkThemeIcon ?? null,
        logo: state.logo ?? null,
        darkThemeLogo: state.darkThemeLogo ?? null,
        logoBig: state.logoBig ?? null,
        website: state.website ?? null,
        description: state.description ?? null,
        category: Array.isArray(state.category) ? state.category : null,
        x: state.x ?? null,
        github: state.github ?? null,
        discord: state.discord ?? null,
        youtube: state.youtube ?? null,
      };
    } catch {
      return null;
    }
  };

  // Helper function to collect SOWs from hydrated workstreams
  const collectSowsFromWorkstreams = (workstreams: any[]): any[] => {
    const sowDocs: any[] = [];
    for (const workstream of workstreams) {
      if (workstream.sow) {
        sowDocs.push(workstream.sow);
      }
      if (workstream.initialProposal?.sow) {
        sowDocs.push(workstream.initialProposal.sow);
      }
      for (const altProposal of workstream.alternativeProposals || []) {
        if (altProposal.sow) {
          sowDocs.push(altProposal.sow);
        }
      }
    }
    return sowDocs;
  };

  // Helper function to fetch builder profiles for contributors
  const fetchBuilderProfilesForContributors = async (
    contributorPhids: Set<string>,
  ) => {
    const builderProfileMap = new Map<string, PHDocument>();
    if (contributorPhids.size > 0) {
      const builderProfileDocs = await Promise.all(
        Array.from(contributorPhids).map(async (phid) => {
          try {
            return (await reactorClient.get(phid)) as PHDocument;
          } catch (error) {
            console.warn(`Failed to fetch builder profile ${phid}:`, error);
            return null;
          }
        }),
      );

      builderProfileDocs.forEach((doc) => {
        if (doc && doc.header.documentType === "powerhouse/builder-profile") {
          builderProfileMap.set(doc.header.id, doc);
          // Also collect contributor PHIDs from these builder profiles
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

      // Fetch nested contributors if any were found
      const nestedContributorPhids = Array.from(contributorPhids).filter(
        (phid) => !builderProfileMap.has(phid),
      );
      if (nestedContributorPhids.length > 0) {
        const nestedContributorDocs = await Promise.all(
          nestedContributorPhids.map(async (phid) => {
            try {
              return (await reactorClient.get(phid)) as PHDocument;
            } catch (error) {
              console.warn(
                `Failed to fetch contributor builder profile ${phid}:`,
                error,
              );
              return null;
            }
          }),
        );

        nestedContributorDocs.forEach((doc) => {
          if (doc && doc.header.documentType === "powerhouse/builder-profile") {
            builderProfileMap.set(doc.header.id, doc);
          }
        });
      }
    }

    return builderProfileMap;
  };

  const hydrateWorkstreamRow = async (row: any) => {
    try {
      const doc = (await reactorClient.get(
        row.workstream_phid,
      )) as WorkstreamDocument;
      const state = doc.state.global as any;

      const initialProposalBase = state.initialProposal
        ? {
            id: state.initialProposal.id,
            status: state.initialProposal.status,
            author: state.initialProposal.author,
          }
        : null;

      const alternativeProposalsBase = (state.alternativeProposals || []).map(
        (p: any) => ({
          id: p.id,
          status: p.status,
          author: p.author,
        }),
      );

      const [
        topSowDoc,
        topPaymentTermsDoc,
        initialSowDoc,
        initialPaymentTermsDoc,
        altSowDocs,
        altPaymentDocs,
        rfpDetails,
        networkInfo,
      ] = await Promise.all([
        // Use document state as source of truth - don't fallback to DB
        loadLinkedDocument(state.sow || null),
        loadLinkedDocument(state.paymentTerms || null),
        loadLinkedDocument(state.initialProposal?.sow || null),
        loadLinkedDocument(state.initialProposal?.paymentTerms || null),
        Promise.all(
          (state.alternativeProposals || []).map((p: any) =>
            loadLinkedDocument(p.sow || null),
          ),
        ),
        Promise.all(
          (state.alternativeProposals || []).map((p: any) =>
            loadLinkedDocument(p.paymentTerms || null),
          ),
        ),
        loadRfpDetails(state.rfp || null),
        loadNetworkProfile(state.client?.id || row.network_phid || null),
      ]);

      const client =
        state.client ??
        (row.network_phid
          ? { id: row.network_phid, name: row.network_slug, icon: null }
          : null);

      return {
        code: state.code || null,
        title: state.title || row.workstream_title || null,
        slug: state.title
          ? state.title.toLowerCase().trim().split(/\s+/).join("-")
          : null,
        status: state.status || row.workstream_status || null,
        client,
        network: networkInfo,
        rfp: rfpDetails,
        initialProposal: initialProposalBase
          ? {
              ...initialProposalBase,
              sow: initialSowDoc?.stateJSON || null,
              paymentTerms: initialPaymentTermsDoc?.stateJSON || null,
            }
          : null,
        alternativeProposals: alternativeProposalsBase.map(
          (proposal: any, index: number) => ({
            ...proposal,
            sow: altSowDocs[index]?.stateJSON || null,
            paymentTerms: altPaymentDocs[index]?.stateJSON || null,
          }),
        ),
        sow: topSowDoc?.stateJSON || null,
        paymentTerms: topPaymentTermsDoc?.stateJSON || null,
        paymentRequests: state.paymentRequests || [],
      };
    } catch {
      const networkInfo = await loadNetworkProfile(row.network_phid || null);

      return {
        code: row.workstream_title || null,
        title: row.workstream_title || null,
        slug: row.workstream_slug || null,
        status: row.workstream_status || null,
        client: row.network_phid
          ? { id: row.network_phid, name: row.network_slug, icon: null }
          : null,
        network: networkInfo,
        rfp: null,
        initialProposal: null,
        alternativeProposals: [],
        sow: null,
        paymentTerms: null,
        paymentRequests: [],
      };
    }
  };

  const applyWorkstreamFilters = (
    qb: any,
    filters: WorkstreamFilterArgs | WorkstreamsFilterArgs,
    wantedSlug?: string,
  ) => {
    // Handle workstreamId and workstreamSlug (from WorkstreamFilter)
    if ("workstreamId" in filters && filters.workstreamId) {
      qb = qb.where("workstream_phid", "=", filters.workstreamId);
    } else if ("workstreamSlug" in filters && filters.workstreamSlug) {
      qb = qb.where("workstream_slug", "=", filters.workstreamSlug);
    }

    // Handle workstreamTitle filter (from WorkstreamsFilter)
    if ("workstreamTitle" in filters && filters.workstreamTitle) {
      // Use case-insensitive partial match for workstream title
      // Filter out NULL values and do case-insensitive search
      const searchPattern = `%${filters.workstreamTitle.toLowerCase()}%`;
      qb = qb
        .where("workstream_title", "is not", null)
        .where((eb: ExpressionBuilder<DB, "workstreams">) =>
          eb(sql`LOWER(workstream_title)`, "like", searchPattern),
        );
    }

    if (filters.networkId) {
      qb = qb.where("network_phid", "=", filters.networkId);
    } else if (filters.networkSlug) {
      qb = qb.where("network_slug", "=", filters.networkSlug);
    } else if (filters.networkName && wantedSlug) {
      qb = qb.where("network_slug", "=", wantedSlug);
    } else if ("networkNames" in filters && filters.networkNames) {
      // Handle networkNames filter (from WorkstreamsFilter)
      const networkSlugs = filters.networkNames
        .filter((name): name is string => Boolean(name))
        .map((name) => deriveSlug(name));

      if (networkSlugs.length > 0) {
        qb = qb.where("network_slug", "in", networkSlugs as any);
      }
    }

    const statuses = (filters.workstreamStatuses || []).filter(
      (status): status is string => Boolean(status),
    );

    if (statuses.length > 0) {
      qb = qb.where("workstream_status", "in", statuses as any);
    } else if (filters.workstreamStatus) {
      qb = qb.where("workstream_status", "=", filters.workstreamStatus);
    }

    return qb;
  };

  const applyScopeOfWorkFilters = (
    qb: any,
    filters: ScopeOfWorkFilterArgs,
    wantedSlug?: string,
  ) => {
    if (filters.workstreamId) {
      qb = qb.where("workstream_phid", "=", filters.workstreamId);
    } else if (filters.workstreamSlug) {
      qb = qb.where("workstream_slug", "=", filters.workstreamSlug);
    }

    if (filters.networkId) {
      qb = qb.where("network_phid", "=", filters.networkId);
    } else if (filters.networkSlug) {
      qb = qb.where("network_slug", "=", filters.networkSlug);
    } else if (filters.networkName && wantedSlug) {
      qb = qb.where("network_slug", "=", wantedSlug);
    }

    if (filters.workstreamStatus) {
      qb = qb.where("workstream_status", "=", filters.workstreamStatus);
    }

    return qb;
  };

  return {
    Query: {
      processorWorkstreams: async () => {
        const drives = await getCandidateDrives();
        const allProcessorWorkstreams = await Promise.all(
          drives.map(async (driveId) => {
            const namespace = WorkstreamsProcessor.getNamespace(driveId);
            console.log(
              `[WorkstreamsProcessor] Resolver querying drive: ${driveId}, namespace: ${namespace}`,
            );
            try {
              return await WorkstreamsProcessor.query(driveId, db as any)
                .selectFrom("workstreams")
                .selectAll()
                .execute();
            } catch (error) {
              console.warn(
                `[WorkstreamsProcessor] Failed to query namespace ${namespace}:`,
                error,
              );
              return []; // Return empty array if table doesn't exist for this drive
            }
          }),
        );

        // Flatten the array of arrays into a single array
        const flattenedWorkstreams = allProcessorWorkstreams.flat();

        return flattenedWorkstreams.map((workstream: any) => ({
          network_phid: workstream.network_phid,
          network_slug: workstream.network_slug,
          workstream_phid: workstream.workstream_phid,
          workstream_slug: workstream.workstream_slug,
          workstream_title: workstream.workstream_title,
          workstream_status: workstream.workstream_status,
          sow_phid: workstream.sow_phid,
          roadmap_oid: workstream.roadmap_oid,
          final_milestone_target: workstream.final_milestone_target,
          initial_proposal_status: workstream.initial_proposal_status,
          initial_proposal_author: workstream.initial_proposal_author,
        }));
      },
      workstream: async (
        parent: unknown,
        args: { filter: WorkstreamFilterArgs },
      ) => {
        const filters = args.filter || {};
        const candidateDrives = await getCandidateDrives();
        const wantedSlug =
          filters.networkSlug ||
          (filters.networkName ? deriveSlug(filters.networkName) : undefined);

        const resolved: any[] = [];
        const contributorPhids = new Set<string>();

        for (const driveId of candidateDrives) {
          let qb = WorkstreamsProcessor.query(driveId, db as any)
            .selectFrom("workstreams")
            .selectAll();

          qb = applyWorkstreamFilters(qb, filters, wantedSlug);

          const rows = await qb.execute();
          if (rows.length === 0) {
            continue;
          }

          for (const row of rows) {
            const hydrated = await hydrateWorkstreamRow(row);
            resolved.push(hydrated);
          }
          break;
        }

        // Collect SOWs and their contributors
        const sowDocs = collectSowsFromWorkstreams(resolved);
        for (const sow of sowDocs) {
          if (!sow || typeof sow !== "object") continue;

          if (Array.isArray(sow.contributors)) {
            sow.contributors.forEach((contributor: unknown) => {
              const phid = extractPhid(contributor);
              if (phid) contributorPhids.add(phid);
            });
          }

          // Collect deliverable owners too so `SOW_Deliverable.owner` can resolve
          if (Array.isArray(sow.deliverables)) {
            sow.deliverables.forEach((deliverable: unknown) => {
              if (!deliverable || typeof deliverable !== "object") return;
              const phid = extractPhid((deliverable as any).owner);
              if (phid) contributorPhids.add(phid);
            });
          }

          // Collect project owners too so `SOW_Project.projectOwner` can resolve
          if (Array.isArray(sow.projects)) {
            sow.projects.forEach((project: unknown) => {
              if (!project || typeof project !== "object") return;
              const phid = extractPhid((project as any).projectOwner);
              if (phid) contributorPhids.add(phid);
            });
          }
        }

        // Fetch all builder profile documents for contributors
        const builderProfileMap =
          await fetchBuilderProfilesForContributors(contributorPhids);

        // Create helper function to get builder profile data by PHID
        getBuilderProfileByPhid = (phid: string) => {
          const doc = builderProfileMap.get(phid);
          if (!doc) return null;

          const state = (doc.state as any).global;
          // Store contributor PHIDs separately - they'll be resolved by the field resolver
          const contributorPhids = state?.contributors ?? [];

          // Ensure all non-nullable Builder fields are properly handled
          // name: String! - non-nullable
          const name = String(state?.name ?? doc.header?.name ?? "");
          // icon: String! - non-nullable
          const icon = String(state?.icon ?? "");
          // description: String! - non-nullable
          const description = String(state?.description ?? state?.slug ?? "");
          // isOperator: Boolean! - non-nullable, default to false
          const isOperator = state?.isOperator ?? false;
          // operationalHubMember: OpHubMember! - non-nullable
          const operationalHubMember = state?.operationalHubMember ?? {
            name: null,
            phid: null,
          };
          // skills: [BuilderSkill!]! - non-nullable array (document model uses 'skils' typo)
          const skills = Array.isArray(state?.skils)
            ? state.skils
            : Array.isArray(state?.skills)
              ? state.skills
              : [];
          // scopes: [BuilderScope!]! - non-nullable array
          const scopes = Array.isArray(state?.scopes) ? state.scopes : [];
          // links: [BuilderLink!]! - non-nullable array
          const links = Array.isArray(state?.links) ? state.links : [];

          return {
            id: doc.header.id,
            code: state?.code ?? null,
            slug: state?.slug ?? null,
            name,
            icon,
            description,
            lastModified: state?.lastModified ?? null,
            isOperator,
            operationalHubMember,
            _contributorPhids: contributorPhids, // Internal field for resolver
            status: state?.status ?? null,
            skills,
            scopes,
            links,
          };
        };

        return resolved;
      },
      workstreams: async (
        parent: unknown,
        args: { filter?: WorkstreamsFilterArgs },
      ) => {
        const filters = args.filter || {};
        const candidateDrives = await getCandidateDrives();

        // Check if any filters are provided
        const hasFilters =
          filters.networkId ||
          filters.networkSlug ||
          filters.networkName ||
          (filters.networkNames && filters.networkNames.length > 0) ||
          filters.workstreamTitle ||
          filters.workstreamStatus ||
          (filters.workstreamStatuses && filters.workstreamStatuses.length > 0);

        const wantedSlug =
          filters.networkSlug ||
          (filters.networkName ? deriveSlug(filters.networkName) : undefined);

        const results: any[] = [];
        const contributorPhids = new Set<string>();

        for (const driveId of candidateDrives) {
          let qb = WorkstreamsProcessor.query(driveId, db as any)
            .selectFrom("workstreams")
            .selectAll();

          // Only apply filters if any are provided
          if (hasFilters) {
            qb = applyWorkstreamFilters(qb, filters, wantedSlug);
          }

          const rows = await qb.execute();
          if (rows.length === 0) {
            continue;
          }

          for (const row of rows) {
            const hydrated = await hydrateWorkstreamRow(row);
            results.push(hydrated);
          }
        }

        // Collect SOWs and their contributors
        const sowDocs = collectSowsFromWorkstreams(results);
        for (const sow of sowDocs) {
          if (!sow || typeof sow !== "object") continue;

          if (Array.isArray(sow.contributors)) {
            sow.contributors.forEach((contributor: unknown) => {
              const phid = extractPhid(contributor);
              if (phid) contributorPhids.add(phid);
            });
          }

          // Collect deliverable owners too so `SOW_Deliverable.owner` can resolve
          if (Array.isArray(sow.deliverables)) {
            sow.deliverables.forEach((deliverable: unknown) => {
              if (!deliverable || typeof deliverable !== "object") return;
              const phid = extractPhid((deliverable as any).owner);
              if (phid) contributorPhids.add(phid);
            });
          }

          // Collect project owners too so `SOW_Project.projectOwner` can resolve
          if (Array.isArray(sow.projects)) {
            sow.projects.forEach((project: unknown) => {
              if (!project || typeof project !== "object") return;
              const phid = extractPhid((project as any).projectOwner);
              if (phid) contributorPhids.add(phid);
            });
          }
        }

        // Fetch all builder profile documents for contributors
        const builderProfileMap =
          await fetchBuilderProfilesForContributors(contributorPhids);

        // Create helper function to get builder profile data by PHID
        getBuilderProfileByPhid = (phid: string) => {
          const doc = builderProfileMap.get(phid);
          if (!doc) return null;

          const state = (doc.state as any).global;
          // Store contributor PHIDs separately - they'll be resolved by the field resolver
          const contributorPhids = state?.contributors ?? [];

          // Ensure all non-nullable Builder fields are properly handled
          // name: String! - non-nullable
          const name = String(state?.name ?? doc.header?.name ?? "");
          // icon: String! - non-nullable
          const icon = String(state?.icon ?? "");
          // description: String! - non-nullable
          const description = String(state?.description ?? state?.slug ?? "");
          // isOperator: Boolean! - non-nullable, default to false
          const isOperator = state?.isOperator ?? false;
          // operationalHubMember: OpHubMember! - non-nullable
          const operationalHubMember = state?.operationalHubMember ?? {
            name: null,
            phid: null,
          };
          // skills: [BuilderSkill!]! - non-nullable array (document model uses 'skils' typo)
          const skills = Array.isArray(state?.skils)
            ? state.skils
            : Array.isArray(state?.skills)
              ? state.skills
              : [];
          // scopes: [BuilderScope!]! - non-nullable array
          const scopes = Array.isArray(state?.scopes) ? state.scopes : [];
          // links: [BuilderLink!]! - non-nullable array
          const links = Array.isArray(state?.links) ? state.links : [];

          return {
            id: doc.header.id,
            code: state?.code ?? null,
            slug: state?.slug ?? null,
            name,
            icon,
            description,
            lastModified: state?.lastModified ?? null,
            isOperator,
            operationalHubMember,
            _contributorPhids: contributorPhids, // Internal field for resolver
            status: state?.status ?? null,
            skills,
            scopes,
            links,
          };
        };

        return results;
      },
      rfpByWorkstream: async (
        parent: unknown,
        args: { filter: WorkstreamFilterArgs },
      ) => {
        const filters = args.filter || {};
        const candidateDrives = await getCandidateDrives();
        const wantedSlug =
          filters.networkSlug ||
          (filters.networkName ? deriveSlug(filters.networkName) : undefined);

        const results: any[] = [];

        for (const driveId of candidateDrives) {
          let qb = WorkstreamsProcessor.query(driveId, db as any)
            .selectFrom("workstreams")
            .selectAll();

          qb = applyWorkstreamFilters(qb, filters, wantedSlug);

          const rows = await qb.execute();
          if (rows.length === 0) {
            continue;
          }

          for (const row of rows) {
            const hydrated = await hydrateWorkstreamRow(row);
            results.push({
              code: hydrated.code,
              title: hydrated.title,
              status: hydrated.status,
              rfp: hydrated.rfp,
            });
          }

          if (filters.workstreamId || filters.workstreamSlug) {
            break;
          }
        }

        return results;
      },
      scopeOfWorkByNetworkOrStatus: async (
        parent: unknown,
        args: { filter: ScopeOfWorkFilterArgs },
      ) => {
        const filters = args.filter || {};
        const candidateDrives = await getCandidateDrives();
        const wantedSlug =
          filters.networkSlug ||
          (filters.networkName ? deriveSlug(filters.networkName) : undefined);

        const results: any[] = [];
        const contributorPhids = new Set<string>();

        for (const driveId of candidateDrives) {
          let qb = WorkstreamsProcessor.query(driveId, db as any)
            .selectFrom("workstreams")
            .selectAll();

          qb = applyScopeOfWorkFilters(qb, filters, wantedSlug);

          const rows = await qb.execute();
          if (rows.length === 0) {
            continue;
          }

          for (const row of rows) {
            const hydrated = await hydrateWorkstreamRow(row);

            // Collect SOWs based on proposalRole filter
            const sowDocs: any[] = [];

            if (!filters.proposalRole) {
              // If no proposalRole specified, include all SOWs
              if (hydrated.sow) {
                sowDocs.push(hydrated.sow);
              }
              if (hydrated.initialProposal?.sow) {
                sowDocs.push(hydrated.initialProposal.sow);
              }
              for (const altProposal of hydrated.alternativeProposals || []) {
                if (altProposal.sow) {
                  sowDocs.push(altProposal.sow);
                }
              }
            } else if (filters.proposalRole === "INITIAL") {
              if (hydrated.initialProposal?.sow) {
                sowDocs.push(hydrated.initialProposal.sow);
              }
            } else if (filters.proposalRole === "ALTERNATIVE") {
              for (const altProposal of hydrated.alternativeProposals || []) {
                if (altProposal.sow) {
                  sowDocs.push(altProposal.sow);
                }
              }
            } else if (filters.proposalRole === "AWARDED") {
              // For AWARDED, we check if the workstream status is AWARDED
              // and return the initial proposal's SOW (as it's typically the awarded one)
              if (
                hydrated.status === "AWARDED" &&
                hydrated.initialProposal?.sow
              ) {
                sowDocs.push(hydrated.initialProposal.sow);
              }
            }

            // Collect contributor PHIDs from all SOWs
            for (const sow of sowDocs) {
              if (!sow || typeof sow !== "object") continue;

              if (Array.isArray(sow.contributors)) {
                sow.contributors.forEach((contributor: unknown) => {
                  const phid = extractPhid(contributor);
                  if (phid) contributorPhids.add(phid);
                });
              }

              // Collect deliverable owners too so `SOW_Deliverable.owner` can resolve
              if (Array.isArray(sow.deliverables)) {
                sow.deliverables.forEach((deliverable: unknown) => {
                  if (!deliverable || typeof deliverable !== "object") return;
                  const phid = extractPhid((deliverable as any).owner);
                  if (phid) contributorPhids.add(phid);
                });
              }

              // Collect project owners too so `SOW_Project.projectOwner` can resolve
              if (Array.isArray(sow.projects)) {
                sow.projects.forEach((project: unknown) => {
                  if (!project || typeof project !== "object") return;
                  const phid = extractPhid((project as any).projectOwner);
                  if (phid) contributorPhids.add(phid);
                });
              }
            }

            // Filter out null/undefined SOWs and add to results
            for (const sow of sowDocs) {
              if (sow) {
                results.push(sow);
              }
            }
          }

          if (filters.workstreamId || filters.workstreamSlug) {
            break;
          }
        }

        // Fetch all builder profile documents for contributors
        const builderProfileMap =
          await fetchBuilderProfilesForContributors(contributorPhids);

        // Create helper function to get builder profile data by PHID
        getBuilderProfileByPhid = (phid: string) => {
          const doc = builderProfileMap.get(phid);
          if (!doc) return null;

          const state = (doc.state as any).global;
          // Store contributor PHIDs separately - they'll be resolved by the field resolver
          const contributorPhids = state?.contributors ?? [];

          // Ensure all non-nullable Builder fields are properly handled
          // name: String! - non-nullable
          const name = String(state?.name ?? doc.header?.name ?? "");
          // icon: String! - non-nullable
          const icon = String(state?.icon ?? "");
          // description: String! - non-nullable
          const description = String(state?.description ?? state?.slug ?? "");
          // isOperator: Boolean! - non-nullable, default to false
          const isOperator = state?.isOperator ?? false;
          // operationalHubMember: OpHubMember! - non-nullable
          const operationalHubMember = state?.operationalHubMember ?? {
            name: null,
            phid: null,
          };
          // skills: [BuilderSkill!]! - non-nullable array (document model uses 'skils' typo)
          const skills = Array.isArray(state?.skils)
            ? state.skils
            : Array.isArray(state?.skills)
              ? state.skills
              : [];
          // scopes: [BuilderScope!]! - non-nullable array
          const scopes = Array.isArray(state?.scopes) ? state.scopes : [];
          // links: [BuilderLink!]! - non-nullable array
          const links = Array.isArray(state?.links) ? state.links : [];

          return {
            id: doc.header.id,
            code: state?.code ?? null,
            slug: state?.slug ?? null,
            name,
            icon,
            description,
            lastModified: state?.lastModified ?? null,
            isOperator,
            operationalHubMember,
            _contributorPhids: contributorPhids, // Internal field for resolver
            status: state?.status ?? null,
            skills,
            scopes,
            links,
          };
        };

        return results;
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
    SOW_ScopeOfWorkState: {
      contributors: (parent: {
        contributors?: (string | { id?: string })[];
      }) => {
        // Resolve contributor PHIDs to Builder objects
        if (!parent.contributors || parent.contributors.length === 0) {
          return [];
        }
        if (!getBuilderProfileByPhid) {
          return [];
        }
        return parent.contributors
          .map((contributor: string | { id?: string }) => {
            // Handle both string PHIDs and objects with id property
            const phid =
              typeof contributor === "string" ? contributor : contributor?.id;
            if (!phid || typeof phid !== "string") {
              return null;
            }
            return getBuilderProfileByPhid!(phid);
          })
          .filter((builder) => builder !== null);
      },
    },
    SOW_Deliverable: {
      owner: (parent: { owner?: unknown }) => {
        // Handle null, undefined, or empty string cases
        if (parent?.owner === null || parent?.owner === undefined) {
          return null;
        }
        // Check if it's an empty string
        if (typeof parent.owner === "string" && parent.owner.trim() === "") {
          return null;
        }
        if (!getBuilderProfileByPhid) return null;
        const phid = extractPhid(parent.owner);
        if (!phid) return null;
        return getBuilderProfileByPhid(phid);
      },
    },
    SOW_Project: {
      projectOwner: (parent: { projectOwner?: unknown }) => {
        // Handle null, undefined, or empty string cases
        if (
          parent?.projectOwner === null ||
          parent?.projectOwner === undefined
        ) {
          return null;
        }
        // Check if it's an empty string
        if (
          typeof parent.projectOwner === "string" &&
          parent.projectOwner.trim() === ""
        ) {
          return null;
        }
        if (!getBuilderProfileByPhid) return null;
        const phid = extractPhid(parent.projectOwner);
        if (!phid) return null;
        return getBuilderProfileByPhid(phid);
      },
    },
    Builder: {
      contributors: (parent: { _contributorPhids?: string[] }) => {
        // Resolve contributor PHIDs to Builder objects
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
          .filter((builder) => builder !== null);
      },
    },
  };
};
