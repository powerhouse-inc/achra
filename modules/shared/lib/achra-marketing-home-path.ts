/**
 * True when the current route is the Achra marketing homepage (`app/(achra)/page`).
 * Used to force light theme and hide the theme toggle there.
 */
function isAchraMarketingHomePath(pathname: string | null): boolean {
  return pathname === '/'
}

export { isAchraMarketingHomePath }
