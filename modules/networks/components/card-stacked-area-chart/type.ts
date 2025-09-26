import type { TABS } from './constants'

export interface StackedAreaSeries {
  type: string
  name: string
  stack: string
  stackStrategy: string
  areaStyle: object
  emphasis: { focus: string }
  showSymbol: false
  data: number[]
  itemStyle: { color: string }
}

export type TabValue = (typeof TABS)[keyof typeof TABS]
