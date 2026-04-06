import { Poppins } from 'next/font/google'
import { BlurText } from '@/shared/components/ui/react-bits/blur-text'
import { Button } from '@/shared/components/ui/button'

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
      className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-[rgb(250,249,247)] px-6 py-10 sm:px-12 sm:py-[30px]"
      aria-labelledby="cases-hero-heading"
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
      </div>

      <div className="relative z-1 flex w-full max-w-[1200px] flex-col items-center gap-6 overflow-hidden">
        <div className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <BlurText
            as="h1"
            id="cases-hero-heading"
            className={`${poppins.className} text-3xl leading-[1.15] tracking-[-0.02em] text-[rgb(10,10,10)] sm:text-4xl md:text-5xl lg:text-[3.25rem]`}
            text="Organizations that thrive on Achra"
            delay={45}
            animateBy="letters"
            direction="bottom"
          />
          <p className="max-w-lg text-sm leading-relaxed text-[rgb(64,64,64)] sm:text-base">
            The next generation of organizations will not be defined by borders or bureaucracy. They
            form around purpose, not hierarchy, coordinating across time zones, building open
            products, and rewarding contribution transparently.
          </p>
          <p className="max-w-lg text-sm leading-relaxed text-[rgb(64,64,64)] sm:text-base">
            At the foundation is a new model, the Scalable Network Organization (SNO), that links
            onchain coordination with offchain execution.
          </p>
          <Button asChild className="rounded-full">
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
