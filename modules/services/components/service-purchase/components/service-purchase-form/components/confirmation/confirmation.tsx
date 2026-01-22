import { CheckIcon } from 'lucide-react'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'

export default function Confirmation() {
  return (
    <Card className="bg-background border-border mt-16 w-full max-w-156 self-center rounded-lg p-6 shadow-xs">
      <CardContent className={cn('flex flex-col items-center gap-6 px-0')}>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-muted w-fit rounded-lg p-2">
            <CheckIcon className="text-foreground size-6" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-foreground text-lg/5.5 font-bold">
              Request Successfully Sent!
            </span>
            <span className="text-foreground/50 text-center text-sm/5.5">
              Thank you <span className="text-primary font-semibold">Name*</span>!<br /> We have
              emailed the summary to <span className="text-primary">email@powerhouse.inc*</span>
              <br /> We will contact you shortly to schedule an introduction meeting!
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
