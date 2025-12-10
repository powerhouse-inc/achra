import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
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
export function ServiceSectionsCard({
  icon: Icon,
  title,
  items,
  className,
  showDetailsButton = false,
}: ServiceSectionsCardProps) {
  return (
    <Card
      className={cn(
        'text-foreground bg-background gap-2 rounded-lg px-4 pt-2 pb-3 text-xs/4.5 shadow-none sm:flex-1 sm:text-sm/5.5 xl:pb-4',
        className,
      )}
    >
      <CardHeader className="gap-y-0 p-0">
        <div className="flex h-10 items-center gap-2">
          <Icon className="[&_path]:stroke-foreground size-4" />
          <span className="font-medium sm:font-semibold">{title}</span>
        </div>
        {showDetailsButton && (
          <CardAction>
            <Button variant="outline" asChild size="lg">
              <Link href="/services">
                Details
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          {items.map((item) => (
            <li key={item} className="mb-0 ml-2 flex items-center gap-2">
              <div className="bg-foreground size-1 min-w-1 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
