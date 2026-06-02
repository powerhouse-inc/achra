export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Connect your account',
    description: 'Sign in with your wallet to begin.',
  },
  {
    id: 2,
    title: 'Choose your role',
    description: 'Tell us what you’re here to do on Achra.',
  },
  {
    id: 3,
    title: 'Account completed',
    description: 'Your Connect drive is ready to use.',
  },
] as const

export const TOTAL_STEPS = ONBOARDING_STEPS.length

export const SUPPORT_DISCORD_URL = 'https://discord.gg/DZhgH2843F'
