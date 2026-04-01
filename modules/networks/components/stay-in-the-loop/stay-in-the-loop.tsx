import Image from 'next/image'
import { NotifyMeForm } from '../notify-me-form/notify-me-form'

function StayInTheLoop() {
  return (
    <div className="relative grid h-full min-h-64 w-full grid-cols-1 items-center gap-6 overflow-hidden rounded-xl p-6">
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
          Get updates of new networks joining Achra - be the first to know when new opportunities go
          live.
        </span>
      </div>
      <NotifyMeForm />
    </div>
  )
}

export { StayInTheLoop }
