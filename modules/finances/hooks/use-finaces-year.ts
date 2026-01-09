import { parseAsString, useQueryState } from 'nuqs'

export const useFinancesYear = () => {
  const [year, setSelectedYear] = useQueryState('year', parseAsString.withDefault('2025'))
  return {
    year,
    setSelectedYear,
  }
}
