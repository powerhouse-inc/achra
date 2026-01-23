import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import AchraRounded from '@/modules/shared/components/svgs/achra-rounded.svg'
import BookCall from '@/modules/shared/components/svgs/book-call.svg'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import ActionCard from './components/action-card/action-card'

interface ConfirmationProps {
  name: string
  email: string
}

export default function Confirmation({ name, email }: ConfirmationProps) {
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
              Thank you <span className="text-primary font-semibold">{name}</span>!<br /> We have
              emailed the summary to <span className="text-primary">{email}</span>
              <br /> We will contact you shortly to schedule an introduction meeting!
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <Link
            href="mailto:powerhousetest@gmail.com?subject=Book%20a%20call&body=I%20would%20like%20to%20book%20a%20call"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionCard
              icon={<BookCall className="size-6 min-w-6 rounded-md" />}
              title="Book a Call"
              description="Schedule a call to get started"
            />
          </Link>
          <Link href="/services">
            <ActionCard
              icon={<AchraRounded className="size-6 min-w-6 rounded-md" />}
              title="Explore ACHRA"
              description="Learn more about the ecosystem and other available"
            />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
