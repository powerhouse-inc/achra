import { useMemo } from 'react'
import type { DoughnutSeries } from '@/modules/finances/components/summary-section/doughnut-chart/types'
import LegendItemMobile from './legend-item-mobile'

interface MobileChartProps {
  seriesData: DoughnutSeries[]
}

export function MobileChart({ seriesData }: MobileChartProps) {
  const series = useMemo(() => {
    const total = seriesData.reduce((acc, item) => acc + item.value, 0)

    return seriesData.map((item) => ({
      ...item,
      percentage: (item.value / total) * 100,
    }))
  }, [seriesData])

  return (
    <div data-slot="mobile-chart" className="flex gap-4 px-4 pt-2 pb-4">
      {/* Bar Container */}
      <div
        data-slot="chart-track"
        className="bg-accent flex min-h-48 w-8 min-w-8 flex-col self-stretch overflow-hidden rounded-lg"
      >
        {series.map((item, index) => (
          <div
            // it is okay to use index as key here because the chart is static
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            data-slot="chart-bar"
            className="w-full"
            style={{
              backgroundColor: item.color,
              height: `${isNaN(item.percentage) ? 0 : item.percentage}%`,
            }}
          />
        ))}
      </div>

      {/* Legends Container */}
      <div
        data-slot="legends-wrapper"
        className="bg-accent flex min-h-48 w-full flex-col items-center justify-center rounded-xl p-4"
      >
        <div data-slot="legend-list" className="flex flex-col gap-2">
          {seriesData.map((item) => (
            <LegendItemMobile
              key={item.name}
              inline={seriesData.length > 4}
              name={item.name}
              code={item.code}
              color={item.color}
              value={item.value}
              percentage={item.percent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
