import { Poppins } from 'next/font/google'
import { Button } from '@/shared/components/ui/button'
import { BlurText } from '@/shared/components/ui/react-bits/blur-text'

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

const HERO_BG = '/home/hero/hero-background.png'
const HERO_VIDEO = '/home/hero/Achrabg2.mp4'

function CasesHero() {
  return (
    <section
      className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-x-clip px-6 py-10 sm:px-12 sm:py-[30px]"
      aria-labelledby="cases-hero-heading"
    >
      <div className="absolute inset-0 -bottom-20 z-0 -mt-24 overflow-visible" aria-hidden>
        <div
          className="pointer-events-none absolute bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})`, inset: '-117px 0 -26px' }}
        />
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-1 flex w-full max-w-[1200px] flex-col items-center gap-6 overflow-hidden">
        <div className="flex max-w-4xl flex-col items-center gap-5 text-center">
          <BlurText
            as="h1"
            id="cases-hero-heading"
            className={`${poppins.className} text-foreground text-3xl leading-[1.15] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-4xl`}
            text="Organizations that thrive on Achra"
            delay={45}
            animateBy="letters"
            direction="bottom"
          />
          <p className="text-foreground/80 max-w-4xl text-sm leading-relaxed sm:text-base">
            The next generation of organizations will not be defined by borders or bureaucracy. They
            form around purpose, not hierarchy, coordinating across time zones, building open
            products, and rewarding contribution transparently.
          </p>
          <p className="text-foreground/80 max-w-4xl text-sm leading-relaxed sm:text-base">
            At the foundation is a new model, the Scalable Network Organization (SNO), that links
            onchain coordination with offchain execution.
          </p>
          <Button asChild>
            <a href="https://www.scalablenetwork.org/" target="_blank" rel="noopener noreferrer">
              Learn more about SNOs
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export { CasesHero }
