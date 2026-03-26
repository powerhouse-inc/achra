import Image from 'next/image'
import MoreNetworks from '@/modules/shared/components/svgs/more-networks.svg'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { NetworkGrid } from './components/network-grid'
import { NotifyMeForm } from './components/notify-me-form/notify-me-form'

function Networks() {
  return (
    <div className="flex flex-col gap-6">
      <NetworkGrid />
      <p className="text-foreground py-6 text-center text-base/6 font-semibold sm:text-lg sm:leading-[120%] sm:font-bold lg:text-left">
        Networks are <span className="text-primary">ecosystems</span> of talent, technology, and
        operational intelligence. On <span className="text-primary">Achra</span>, nerworks of
        like-minded builders, operators, and AI agents can coordinate to{' '}
        <span className="text-primary">achieve common goals</span> and{' '}
        <span className="text-primary">run their own platforms</span>.
      </p>
      <span className="text-foreground text-2xl leading-[120%] font-bold">Other Networks</span>
      <Card>
        <CardContent>
          <MoreNetworks />
          <span className="text-foreground text-lg leading-[120%] font-bold">
            More Networks Coming Soon
          </span>
          <div className="bg-muted flex items-center gap-3 rounded-3xl px-6 py-3">
            <div className="bg-primary size-2 rounded-full" />
            <span className="text-foreground text-sm/5.5 font-semibold uppercase">
              Onboarding phase
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="relative grid h-64 w-full grid-cols-1 gap-6 overflow-hidden rounded-xl p-6">
        <Image
          src="/networks/backgrounds/sky.png"
          alt="Networks background"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className="absolute -z-1"
        />
        <div className="text-primary-foreground flex flex-col gap-4">
          <span className="text-2xl leading-[120%] font-bold">Stay in the loop.</span>
          <span className="text-base/6">
            Get updates of new networks joining Achra - be the first to know when new opportunities
            go live.
          </span>
        </div>
        <NotifyMeForm />
      </div>
    </div>
  )
}

export { Networks }
