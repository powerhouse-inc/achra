import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'

interface ActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  bgImage: React.ReactNode
}

export default function ActionCard({ icon, title, description, bgImage }: ActionCardProps) {
  return (
    <Card className="bg-background border-border relative min-h-23 w-full rounded-lg p-3 shadow-none">
      <CardContent className={cn('flex flex-col items-center gap-2 px-0')}>
        <div className="flex w-fit items-center gap-2">
          {icon}
          <span className="text-foreground text-sm/5.5 font-semibold">{title}</span>
        </div>
        <span className="text-foreground/50 w-full text-center text-xs/4.5 font-medium">
          {description}
        </span>
        {bgImage}
      </CardContent>
    </Card>
  )
}
