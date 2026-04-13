'use client'

import { useContext } from 'react'
import { FinancesYearContext } from '../providers/finances-year-provider'

export function useFinancesYear() {
  const context = useContext(FinancesYearContext)
  if (!context) throw new Error('useFinancesYear must be used within a FinancesYearProvider')
  return context
}
