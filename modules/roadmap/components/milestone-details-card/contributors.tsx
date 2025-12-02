import { UserRound } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/modules/shared/components/ui/avatar'
import type { RoadmapDetails_Contributor } from '../../types'

interface ContributorsProps {
  contributors: RoadmapDetails_Contributor[]
}

export default function Contributors({ contributors }: ContributorsProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border px-4 pt-2 pb-4">
      <div className="text-xs font-medium">Contributor(s)</div>

      <div className="flex flex-wrap gap-4">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="flex items-center gap-2 self-stretch">
            <Avatar className="size-6">
              <AvatarFallback className="bg-border">
                <UserRound className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold">{contributor.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
