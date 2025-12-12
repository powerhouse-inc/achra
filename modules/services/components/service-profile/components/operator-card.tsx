import { FileText, Info } from 'lucide-react'
import Link from 'next/link'
import OperatorChip from '@/modules/operator-profile/components/operator-chip'
import type { OperatorChipEnum } from '@/modules/operator-profile/types'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/modules/shared/components/ui/card'
import type { Route } from 'next'

interface OperatorCardProps {
  id: string
  title: string
  description: string
  roles: OperatorChipEnum[]
  activeSince: string
  minEngagement: string
  teamSize: string
  setupTime: string
}

function OperatorCard({
  id,
  title,
  description,
  roles,
  activeSince,
  minEngagement,
  teamSize,
  setupTime,
}: OperatorCardProps) {
  return (
    <Card className="gap-2 border-none p-3 shadow-lg">
      <CardHeader className="flex items-center gap-2 p-0">
        <FileText className="size-4" />
        <span className="text-foreground text-base/6 font-semibold">{title}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <OperatorChip key={role} opc={role} />
          ))}
        </div>
        <p className="text-foreground text-sm/5.5">{description}</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-background border-border flex flex-col gap-2 rounded-xl border p-2">
            <span className="text-foreground text-xs/4.5 font-medium">Active Since</span>
            <span className="text-foreground text-sm/5.5 font-semibold">{activeSince}</span>
          </div>
          <div className="bg-background border-border flex flex-col gap-2 rounded-xl border p-2">
            <span className="text-foreground text-xs/4.5 font-medium">Min Engagement</span>
            <span className="text-foreground text-sm/5.5 font-semibold">{minEngagement}</span>
          </div>
          <div className="bg-background border-border flex flex-col gap-2 rounded-xl border p-2">
            <span className="text-foreground text-xs/4.5 font-medium">Team Size</span>
            <span className="text-foreground text-sm/5.5 font-semibold">{teamSize}</span>
          </div>
          <div className="bg-background border-border flex flex-col gap-2 rounded-xl border p-2">
            <span className="text-foreground text-xs/4.5 font-medium">Setup Time</span>
            <span className="text-foreground text-sm/5.5 font-semibold">{setupTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex-col gap-2 p-0">
        <InternalLink
          href={`/operators/${id}` as Route}
          size="lg"
          variant="default"
          className="w-full"
        >
          Engage
        </InternalLink>
        <Button variant="outline" asChild size="lg" className="w-full">
          <Link href={`/operators/${id}` as Route}>
            <span>More Info</span>
            <Info className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OperatorCard
