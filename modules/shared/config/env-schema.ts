import { z } from 'zod'

export const envSchema = z
  .object({
    NEXT_PUBLIC_ENVIRONMENT: z
      .enum(['development', 'staging', 'production'] as const)
      .optional()
      .default('production'),

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

    // Mailchimp env variables (required only when whitelist overlay is enabled)
    MAILCHIMP_API_KEY: z.string().optional(),
    MAILCHIMP_AUDIENCE_ID: z.string().optional(),
    MAILCHIMP_SERVER_LOCATION: z.string().optional(),
    MAILCHIMP_TAG: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If whitelist overlay is enabled, require all Mailchimp variables
    if (data.NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY === 'true') {
      if (!data.MAILCHIMP_API_KEY) {
        ctx.addIssue({
          code: 'custom',
          path: ['MAILCHIMP_API_KEY'],
          message: 'MAILCHIMP_API_KEY is required when NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY is true',
        })
      }
      if (!data.MAILCHIMP_AUDIENCE_ID) {
        ctx.addIssue({
          code: 'custom',
          path: ['MAILCHIMP_AUDIENCE_ID'],
          message:
            'MAILCHIMP_AUDIENCE_ID is required when NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY is true',
        })
      }
      if (!data.MAILCHIMP_SERVER_LOCATION) {
        ctx.addIssue({
          code: 'custom',
          path: ['MAILCHIMP_SERVER_LOCATION'],
          message:
            'MAILCHIMP_SERVER_LOCATION is required when NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY is true',
        })
      }
    }
  })
