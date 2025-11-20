import { Button } from '@/modules/shared/components/ui/button'

export function BuildersHeader() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground text-2xl leading-[120%] font-bold">Builders</span>
      <p className="text-foreground/50 text-base/6">
        Ecosystem Actors serve as external entities offering valuable services to both Maker Core
        and SubDAOs. These actors are further classified into two categories: Advisory Ecosystem
        Actors and Active Ecosystem Actors.
      </p>
      <Button className="text-foreground self-end px-4" variant="link" size="lg">
        Read more
      </Button>
    </div>
  )
}
