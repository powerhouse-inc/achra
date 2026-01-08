import type { Budget } from '@/modules/finances/types'
import { getBreakdownAnalytics } from '../utils'
import type { Analytic, AnalyticGranularityForBreakdownChart } from '../types'

interface BreakdownChartService {
  granularity: AnalyticGranularityForBreakdownChart
  year: string
  select: string
  lod: number
  budgets: Budget[]
}

// This function Will recive the granularity, year, select, lod
// For now, it returns a mock response
const fetchAnalytics = async ({
  // This is a work still in progress this values are need when API is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  granularity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  year,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lod,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  budgets,
}: BreakdownChartService): Promise<Analytic> => {
  return Promise.resolve({
    series: [
      {
        period: '2025/01',
        start: '2025-01-01T00:00:00.000Z',
        end: '2025-02-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500.00000000035,
            sum: 86307601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 312971.31,
            sum: 9072483.530000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 435139.01,
            sum: 9100441.920000006,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/02',
        start: '2025-02-01T00:00:00.001Z',
        end: '2025-03-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 126000,
            sum: 86433601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 390903.41,
            sum: 9463386.940000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 735463.5399999998,
            sum: 9835905.460000005,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/03',
        start: '2025-03-01T00:00:00.001Z',
        end: '2025-04-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500.00000000035,
            sum: 86573101.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 370913.08999999997,
            sum: 9834300.030000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 1105355.3099999998,
            sum: 10941260.770000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/04',
        start: '2025-04-01T00:00:00.001Z',
        end: '2025-05-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 134999.99999999965,
            sum: 86708101.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 74719.20999999999,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 1304260.4099999997,
            sum: 12245521.180000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/05',
        start: '2025-05-01T00:00:00.001Z',
        end: '2025-06-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500,
            sum: 86847601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 708333.3399999999,
            sum: 12953854.520000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/06',
        start: '2025-06-01T00:00:00.001Z',
        end: '2025-07-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 135000,
            sum: 86982601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 416666.67,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/07',
        start: '2025-07-01T00:00:00.001Z',
        end: '2025-08-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500,
            sum: 87122101.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/08',
        start: '2025-08-01T00:00:00.001Z',
        end: '2025-09-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500,
            sum: 87261601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/09',
        start: '2025-09-01T00:00:00.001Z',
        end: '2025-10-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 135000,
            sum: 87396601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/10',
        start: '2025-10-01T00:00:00.001Z',
        end: '2025-11-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500,
            sum: 87536101.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/11',
        start: '2025-11-01T00:00:00.001Z',
        end: '2025-12-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 135000,
            sum: 87671101.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
      {
        period: '2025/12',
        start: '2025-12-01T00:00:00.001Z',
        end: '2026-01-01T00:00:00.000Z',
        rows: [
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 0,
            sum: 87093180.6736,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 82660600.01372345,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 85600960.51061171,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 46899530.82999993,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/legacy',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 46746365.68999997,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Budget',
            unit: 'DAI',
            value: 139500,
            sum: 87810601.2,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 27159851.37962448,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 29926635.658852246,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 9909019.240000002,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/scopes',
              },
            ],
            metric: 'Forecast',
            unit: 'DAI',
            value: 0,
            sum: 13370521.190000001,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'PaymentsOnChain',
            unit: 'DAI',
            value: 0,
            sum: 417713.93356000003,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'ProtocolNetOutflow',
            unit: 'DAI',
            value: 0,
            sum: 417937.44899999996,
          },
          {
            dimensions: [
              {
                name: 'budget',
                path: 'atlas/immutable',
              },
            ],
            metric: 'Actuals',
            unit: 'DAI',
            value: 0,
            sum: 0,
          },
        ],
      },
    ],
  })
}

export const getBudgetsAnalytics = async ({
  granularity,
  year,
  select,
  lod,
  budgets,
}: BreakdownChartService) => {
  // This functions will be used to fetch analytics from the API will be recive granularity, year, select, lod
  // For now, it returns a mock response
  const analytics = await fetchAnalytics({
    granularity,
    year,
    select,
    lod,
    budgets,
  })

  const analiticsByBudget = getBreakdownAnalytics(analytics, budgets, granularity)
  return analiticsByBudget
}
