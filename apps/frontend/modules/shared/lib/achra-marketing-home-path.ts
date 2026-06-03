/**
 * Achra marketing routes that always use light theme and hide the navbar theme toggle.
 * Shared with the pre-paint theme script in root-theme-provider, so any change here is
 * reflected there too. Plain paths only — no basePath/locale prefix is accounted for.
 */
const ACHRA_MARKETING_HOME_PATHS = ['/', '/cases'] as const

function isAchraMarketingHomePath(pathname: string | null): boolean {
  return pathname !== null && (ACHRA_MARKETING_HOME_PATHS as readonly string[]).includes(pathname)
}

export { ACHRA_MARKETING_HOME_PATHS, isAchraMarketingHomePath }
