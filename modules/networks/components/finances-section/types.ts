export interface RevenueAndSpendingData {
  fees: number
  liquidationIncome: number
  psm: number
  daiSpent: number
  mkrVesting: number
  dsr: number
  annualProfit: number
}
export type RevenueAndSpendingRecords = Record<string, RevenueAndSpendingData>

export interface BarChartSeries {
  name: string
  seriesName: string
  color: string
  value: number
  dataIndex: number
}
