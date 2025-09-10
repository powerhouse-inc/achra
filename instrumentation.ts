export async function register() {
  // validate env variables before starting the server
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // the build and the development start runs on nodejs
    // we can ignore safely the edge runtime here as we will detect if we have
    // env variables missing or misconfigured in the build and development start
    const { validateEnv } = await import('./modules/shared/config/env')
    validateEnv()
  }
}
