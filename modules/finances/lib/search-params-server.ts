import { createSearchParamsCache, parseAsInteger } from 'nuqs/server'

export const yearParser = parseAsInteger

export const financesSearchParamsCache = createSearchParamsCache({
  year: yearParser,
})
