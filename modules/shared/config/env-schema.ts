import { z } from 'zod'

export const envSchema = z.object({
  // private env variables
  HOMEPAGE_REMOTE_URL: z.url({
    error: 'Must be a valid URL (e.g., https://example.com) pointing to the hosted homepage.',
  }),

  // public env variables
  NEXT_PUBLIC_SWITCHBOARD_URL: z.url({
    error:
      'Must be a valid URL (e.g., https://switchboard.example.com/graphql) for the Switchboard API.',
  }),

  NEXT_PUBLIC_ETH_MAINNET_RPC: z.url({
    error:
      'Must be a valid URL (e.g., https://mainnet.infura.io/v3/your-project-id) for the Ethereum Mainnet RPC.',
  }),

  NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY: z
    .enum(['true', 'false'] as const)
    .optional()
    .default('false'),
})
