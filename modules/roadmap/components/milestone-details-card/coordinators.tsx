import { UserRound } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/modules/shared/components/ui/avatar'

interface CoordinatorsProps {
  coordinators: string[]
}

export default function Coordinators({ coordinators }: CoordinatorsProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border px-4 pt-2 pb-4">
      <div className="text-xs font-medium">Coordinator(s)</div>

      <div className="flex flex-wrap gap-4">
        {coordinators?.map((coordinator) => (
          <div key={coordinator} className="flex items-center gap-2 self-stretch">
            <Avatar className="size-6">
              <AvatarFallback className="bg-border">
                <UserRound className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold">{coordinator}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
