import type { AnalyticGranularity, MetricValues } from '@/modules/finances/types'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { HeaderAnnually } from './header-annually'
import { HeaderMonthly } from './header-monthly'
import { HeaderQuarterly } from './header-quarterly'
import { SemiAnnualHeader } from './header-semi-annually'

interface TableHeaderProps {
  granularity: AnalyticGranularity
  title: string
  year: string
  headerTable: MetricValues[]
  activeMetrics: string[]
}

function TableHeader({ granularity, title, year, headerTable, activeMetrics }: TableHeaderProps) {
  const isMobile = useMediaQuery({ to: 'md' })

  if (isMobile && granularity === 'semiAnnual') {
    return (
      <SemiAnnualHeader
        headerTable={headerTable}
        activeMetrics={activeMetrics}
        title={title}
        year={year}
      />
    )
  } else {
    if (granularity === 'annual') {
      return (
        <HeaderAnnually
          year={year}
          title={title}
          headerTable={headerTable}
          activeMetrics={activeMetrics}
        />
      )
    }
    if (granularity === 'monthly') {
      return <HeaderMonthly headerTable={headerTable} activeMetrics={activeMetrics} title={title} />
    }
    return (
      <HeaderQuarterly
        headerTable={headerTable}
        activeMetrics={activeMetrics}
        title={title}
        year={year}
      />
    )
  }
}

export { TableHeader }
