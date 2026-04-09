import MoreNetworks from '@/modules/shared/components/svgs/more-networks.svg'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

function MoreNetworksComingSoon() {
  return (
    <Card className="bg-input/40 w-full">
      <CardContent className="flex flex-col items-center gap-6">
        <MoreNetworks />
        <div className="-mt-2 flex flex-col gap-2 text-center">
          <span className="text-foreground text-lg leading-[120%] font-bold">
            More Networks Coming Soon
          </span>
          <span className="text-foreground/70 max-w-106 text-sm/5.5">
            New networks are being onboarded to Achra. Check back soon to discover new ecosystems
            and opportunities.
          </span>
        </div>
        <div className="bg-muted flex w-53.5 items-center gap-3 rounded-3xl px-6 py-3">
          <div className="bg-primary size-2 rounded-full" />
          <span className="text-foreground text-sm/5.5 font-semibold uppercase">
            Onboarding phase
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export { MoreNetworksComingSoon }
