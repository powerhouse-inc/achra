import { ServiceSectionsCardList } from '@/modules/services/components/services-card-list-section/service-sections-card-list'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Card, CardAction, CardContent, CardHeader } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import type { ComponentType, SVGProps } from 'react'

interface ServiceSectionsCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  items: string[]
  className?: string
  showDetailsButton?: boolean
}

function ServiceSectionsCard({
  icon: Icon,
  title,
  items,
  className,
  showDetailsButton = false,
}: ServiceSectionsCardProps) {
  return (
    <Card
      className={cn(
        'text-foreground grid grid-rows-[auto_minmax(0,1fr)] gap-2 rounded-lg pt-2 pl-4 text-xs/4.5 shadow-none sm:flex-1 sm:text-sm/5.5 lg:max-h-(--service-sections-max-height)',
        className,
      )}
    >
      <CardHeader className="gap-y-0 p-0 pr-4">
        <div className={cn('flex items-center gap-2', { 'h-10': showDetailsButton })}>
          <Icon className="[&_path]:stroke-foreground size-4" />
          <span className="font-medium sm:font-semibold">{title}</span>
        </div>
        {showDetailsButton && (
          <CardAction>
            <InternalLink href="/services" size="lg" variant="outline">
              Details
            </InternalLink>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="relative min-h-0 overflow-hidden p-0">
        <ServiceSectionsCardList items={items} />
      </CardContent>
    </Card>
  )
}

export { ServiceSectionsCard }
