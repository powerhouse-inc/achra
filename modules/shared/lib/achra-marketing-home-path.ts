/**
 * True on Achra marketing routes that always use light theme and hide the navbar theme toggle:
 * homepage (`/`) and cases (`/cases`).
 */
function isAchraMarketingHomePath(pathname: string | null): boolean {
  return pathname === '/' || pathname === '/cases'
}

export { isAchraMarketingHomePath }
