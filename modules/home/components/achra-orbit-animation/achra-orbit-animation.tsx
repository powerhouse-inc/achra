import { Briefcase, Network, Vote, Wallet, Workflow } from 'lucide-react'
import Image from 'next/image'
import { DecorationDots } from '@/modules/home/components/decoration-dots'
import { OrbitingCircle } from '@/modules/shared/components/orbiting-circle'
import { AchraIsotype } from './achra-isotype'
import { MagicDot } from './magic-dot'
import { PulsingDot } from './pulsing-dot'
import { SurfaceGlow } from './surface-glow'

const images = [
  { src: '/home/build-network/builders/chart.png', width: 1116, height: 1164 },
  { src: '/home/build-network/builders/profile.png', width: 986, height: 468 },
  { src: '/home/build-network/operators/card.png', width: 1024, height: 815 },
  { src: '/home/build-network/orgs/card-bottom-left.png', width: 879, height: 975 },
  { src: '/home/build-network/orgs/card-bottom-right.png', width: 692, height: 698 },
  { src: '/home/build-network/orgs/card-top-right.png', width: 872, height: 1234 },
  { src: '/home/build-network/orgs/network.png', width: 890, height: 540 },
]

function AchraOrbitAnimation() {
  return (
    <div className="relative flex h-150 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_50%,var(--color-card)_0%,var(--color-card)_10%,color-mix(in_oklab,var(--color-primary)_5%,transparent)_100%)]">
      <DecorationDots
        rows={8}
        columns={8}
        dotSize={3}
        gap={14}
        fade={{ direction: 'bottom-right', from: 0, to: 0.4 }}
        className="text-primary pointer-events-none absolute top-8 left-10 opacity-70"
      />
      <DecorationDots
        rows={9}
        columns={5}
        dotSize={3}
        gap={14}
        fade={{ direction: 'bottom-left', from: 0, to: 0.2 }}
        className="text-primary pointer-events-none absolute top-12 right-16 opacity-70"
      />
      <DecorationDots
        rows={5}
        columns={9}
        dotSize={3}
        gap={14}
        fade={{ direction: 'top-right', from: 0, to: 0.3 }}
        className="text-primary pointer-events-none absolute bottom-8 left-32 opacity-70"
      />
      <DecorationDots
        rows={5}
        columns={9}
        dotSize={3}
        gap={14}
        fade={{ direction: 'top-left', from: 0, to: 0.4 }}
        className="text-primary pointer-events-none absolute right-8 bottom-8 opacity-70"
      />

      <MagicDot
        className="top-10 left-1/4"
        dotClassName="size-1.5 bg-card"
        glowClassName="size-5 bg-primary/40"
      />
      <MagicDot
        className="top-6 left-[42%]"
        dotClassName="size-1 bg-card"
        glowClassName="size-4 bg-white/50"
      />
      <MagicDot
        className="top-14 right-1/4"
        dotClassName="size-2 bg-card"
        glowClassName="size-6 bg-primary/40"
      />
      <MagicDot
        className="top-1/3 right-10"
        dotClassName="size-1 bg-card"
        glowClassName="size-4 bg-primary/30"
      />
      <MagicDot
        className="top-1/2 left-8"
        dotClassName="size-1.5 bg-card"
        glowClassName="size-5 bg-primary/40"
      />
      <MagicDot
        className="top-[58%] right-6"
        dotClassName="size-2 bg-card"
        glowClassName="size-6 bg-[rgb(221,80,216)]/40"
      />
      <MagicDot
        className="bottom-1/3 left-12"
        dotClassName="size-1 bg-card"
        glowClassName="size-4 bg-[rgb(221,80,216)]/40"
      />
      <MagicDot
        className="bottom-16 left-1/3"
        dotClassName="size-2 bg-card"
        glowClassName="size-7 bg-[rgb(221,80,216)]/40"
      />
      <MagicDot
        className="bottom-8 left-1/2"
        dotClassName="size-1 bg-card"
        glowClassName="size-4 bg-white/50"
      />
      <MagicDot
        className="right-1/4 bottom-14"
        dotClassName="size-2.5 bg-card"
        glowClassName="size-9 bg-[rgb(221,80,216)]/45"
      />
      <MagicDot
        className="right-10 bottom-24"
        dotClassName="size-1.5 bg-card"
        glowClassName="size-5 bg-primary/40"
      />

      <div
        className="relative flex size-30 items-center justify-center overflow-hidden rounded-full md:size-36 lg:size-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 60% at 32% 26%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 60%),
            radial-gradient(ellipse 100% 100% at 70% 90%, rgba(150, 170, 210, 0.22) 0%, transparent 55%),
            linear-gradient(155deg, #ffffff 0%, #f4f6fb 60%, #e9edf5 100%)
          `,
          boxShadow: `
            0 55px 90px -25px rgba(30, 40, 70, 0.20),
            0 25px 50px -12px rgba(30, 40, 70, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.6),
            inset 0 -22px 36px rgba(40, 55, 100, 0.06),
            inset 0 14px 28px rgba(255, 255, 255, 0.95)
          `,
        }}
      >
        <SurfaceGlow angle={0} className="bg-primary/55" />
        <SurfaceGlow angle={120} className="bg-[rgb(221,80,216)]/55" />
        <SurfaceGlow angle={240} className="bg-[rgb(5,130,255)]/55" />
        <AchraIsotype className="text-primary relative size-14 md:size-18" />
      </div>

      <OrbitingCircle radius={160} iconSize={40} duration={20}>
        <PulsingDot dotClassName="bg-primary" waveClassName="bg-primary/45" />
        <PulsingDot dotClassName="bg-[rgb(221,80,216)]" waveClassName="bg-[rgb(221,80,216)]/45" />
        <PulsingDot dotClassName="bg-[rgb(5,130,255)]" waveClassName="bg-[rgb(5,130,255)]/45" />
      </OrbitingCircle>

      <OrbitingCircle
        radius={290}
        iconSize={48}
        duration={40}
        reverse
        className="border-border bg-card text-foreground border shadow-sm"
      >
        <Network className="size-5" aria-label="Networks" />
        <Workflow className="size-5" aria-label="Workstreams" />
        <Briefcase className="size-5" aria-label="Services" />
        <Vote className="size-5" aria-label="Governance" />
        <Wallet className="size-5" aria-label="Finances" />
      </OrbitingCircle>
      <OrbitingCircle
        radius={440}
        duration={60}
        className="border-border size-auto overflow-hidden rounded-xl"
      >
        {images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            className="h-32 w-auto md:h-40 lg:h-44"
          />
        ))}
      </OrbitingCircle>
    </div>
  )
}

export { AchraOrbitAnimation }
