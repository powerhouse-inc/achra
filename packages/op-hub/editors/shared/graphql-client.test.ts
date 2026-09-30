import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchAllRemoteBuilderProfiles as fetchShared } from "./graphql-client.js";
import { fetchAllRemoteBuilderProfiles as fetchEditor } from "../builder-profile/utils/graphql-client.js";

type QueryBody = { query: string; variables?: { cursor?: string | null } };

function requestBody(request: RequestInit): QueryBody {
  if (typeof request.body !== "string") throw new Error("Expected JSON body");
  return JSON.parse(request.body) as QueryBody;
}

describe.each([
  ["shared", fetchShared],
  ["builder profile", fetchEditor],
] as const)("%s profile metadata", (_name, fetchProfiles) => {
  afterEach(() => vi.unstubAllGlobals());

  it("uses supported cursor pages and returns contributor names, slugs and icons", async () => {
    const fetch = vi.fn((_url: string, request: RequestInit) => {
      const { query, variables } = requestBody(request);
      expect(query).not.toContain("totalCount");
      expect(query).toContain("findDocuments");
      const first = !variables?.cursor;
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              findDocuments: {
                items: [
                  {
                    id: first ? "-profile-a" : "profile-b",
                    name: "Header",
                    state: {
                      global: {
                        name: first ? "Prometheus" : "Dracaena",
                        slug: "builder",
                        icon: "https://example.com/icon.png",
                      },
                    },
                  },
                ],
                hasNextPage: first,
                cursor: first ? 'c:{"offset":500}' : null,
              },
            },
          }),
      });
    });
    vi.stubGlobal("fetch", fetch);
    const profiles = await fetchProfiles();
    expect(profiles.map((profile) => profile.state.name)).toEqual([
      "Prometheus",
      "Dracaena",
    ]);
    expect(profiles[0].state.slug).toBe("builder");
    expect(profiles[0].state.icon).toBe("https://example.com/icon.png");
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(requestBody(fetch.mock.calls[1][1]).variables?.cursor).toBe(
      'c:{"offset":500}',
    );
  });

  it.runIf(process.env.DRIVE_SYNC_LIVE_TEST === "1")(
    "resolves imported contributor metadata on the live local reactor",
    async () => {
      const profiles = await fetchProfiles();
      for (const name of [
        "Prometheus",
        "Dracaena",
        "Layer0",
        "callMeT",
        "TheGoldenMule",
        "Acaldas",
        "Memo",
        "oz",
        "Frank",
        "teep",
        "apeiron",
        "liberuum",
      ]) {
        const profile = profiles.find((item) => item.state.name === name);
        expect(profile, name).toBeDefined();
        expect(profile?.state.slug, name).toBeTruthy();
        expect(profile?.state.icon, name).toBeTruthy();
      }
    },
  );
});
