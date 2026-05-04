import { config as dotenvConfig } from 'dotenv'
import type { CodegenConfig } from '@graphql-codegen/cli'

// Load environment variables from .env file
dotenvConfig()

// see: https://plainenglish.io/blog/next-js-app-router-graphql-codegen-and-tanstack-query

const config: CodegenConfig = {
  // Where your GQL schema is located (could also be externally hosted)
  schema: process.env.NEXT_PUBLIC_SWITCHBOARD_URL,
  overwrite: true,
  documents: [
    './modules/**/*.graphql',
    './modules/**/*.{tsx,ts}',
    './app/**/*.{tsx,ts}',
    // TODO: re-enable once the budgetStatements API is restored on Switchboard
    '!./modules/expense-reports/graphql/account-snapshots.graphql',
    '!./modules/expense-reports/graphql/expense-reports-actuals.graphql',
    '!./modules/expense-reports/graphql/expense-reports-available-months.graphql',
    '!./modules/finances/graphql/budget-statements.graphql',
  ],
  generates: {
    // Where the generated types and hooks file will be placed
    './modules/__generated__/graphql/switchboard-generated.ts': {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */\n// @ts-nocheck',
            placement: 'prepend',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query',
        // Important! The "add" plugin will inject this into our generated file.
        // This extends RequestInit['Headers'] to include the Next.js extended "fetch"
        // options for caching. This will allow for fine grained cache control
        // with our generated hooks.
        {
          add: {
            content: `
type FetchOptions = {
cache?: RequestCache;
next?: NextFetchRequestConfig;
};

            type RequestInit = {
              headers: (HeadersInit & FetchOptions) | FetchOptions;
            };`,
          },
        },
      ],
      config: {
        // Needed to support the updated React Query 5 API
        reactQueryVersion: 5,
        legacyMode: false,
        exposeFetcher: true,
        exposeQueryKeys: true,
        addSuspenseQuery: true,
        // Allows us to specify a custom fetcher function that will leverage
        // Next.js caching fetaures within our generated query hooks.
        fetcher: '@/shared/lib/fetcher#switchboardFetcher',
        // When fragments are referenced from multiple places inside an
        // operation's fragment graph, codegen concatenates each definition per
        // edge by default — which makes the runtime document include the same
        // fragment multiple times and the server rejects it. dedupeFragments
        // emits each fragment exactly once per operation document.
        dedupeFragments: true,
        // TODO: enable once all consumers reference operation-result / fragment
        // types instead of schema-wide Rs* object types. Flipping this strips
        // unreferenced schema types from switchboard-generated.ts (keeps enums
        // and input types). Audit non-services scopes (expense-reports,
        // finances, shared) before turning on — otherwise their imports of
        // RsServiceOffering, RsResourceTemplate, BuilderProfileState, etc.
        // will break.
        // onlyOperationTypes: true,
      },
    },
  },
}
export default config
