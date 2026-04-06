import { Poppins } from 'next/font/google'
import { SkyIsotype, SkyLogotype } from '@/shared/components/svgs'
import { BlurText } from '@/shared/components/ui/react-bits/blur-text'
import { HeroGrid } from './hero-grid'

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

const HERO_BG = '/home/hero/hero-background.png'
const HERO_VIDEO = '/home/hero/Achrabg2.mp4'

function HomeHero() {
  return (
    <section
      className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-[rgb(250,249,247)] px-6 py-10 sm:px-12 sm:py-[30px]"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0 z-0 overflow-visible" aria-hidden>
        <div
          className="pointer-events-none absolute inset-0 -top-24 bottom-0 bg-cover bg-center bg-no-repeat sm:-top-28"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <HeroGrid />
      </div>

      <div className="relative z-1 flex w-full max-w-[1200px] flex-col items-center gap-6 overflow-hidden">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
            <BlurText
              as="h1"
              className={`${poppins.className} text-3xl leading-[1.15] tracking-[-0.02em] text-[rgb(10,10,10)] sm:text-4xl md:text-5xl lg:text-[3.25rem]`}
              text="The Marketplace For Global Coordination"
              delay={45}
              animateBy="letters"
              direction="bottom"
            />
            <p className="max-w-lg text-sm leading-relaxed text-[rgb(64,64,64)] sm:text-base">
              Achra connects organizations, builders and operators to scale networks across borders.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[11px] font-semibold tracking-[0.15em] text-[rgb(156,156,156)] uppercase">
            In Partnership With
          </span>
          <a
            href="https://sky.money"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[rgb(10,10,10)]"
          >
            <SkyIsotype className="size-6" aria-hidden />
            <SkyLogotype className="h-5 w-auto" aria-label="Sky" />
          </a>
        </div>
      </div>
    </section>
  )
}

export { HomeHero }
