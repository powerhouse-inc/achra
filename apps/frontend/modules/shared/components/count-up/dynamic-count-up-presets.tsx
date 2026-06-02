'use client'

import { usePrevious } from 'react-use'
import { CountUp } from './count-up'

interface DynamicCountUpPresetsProps {
  value: number
}

function DynamicCountUpPresets({ value }: DynamicCountUpPresetsProps) {
  const previousValue = usePrevious(value)

  const from = value > (previousValue ?? 0) ? (previousValue ?? 0) : value
  const to = value < (previousValue ?? 0) ? (previousValue ?? 0) : value
  const direction = value > (previousValue ?? 0) ? 'up' : 'down'

  return <CountUp from={from} to={to} direction={direction} separator="," />
}

export { DynamicCountUpPresets }
