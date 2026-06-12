'use client'

import { Button } from '@achra/ui/button'
import { Input } from '@achra/ui/input'
import { cn } from '@achra/ui/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useActionState } from 'react'
import {
  type HomeWaitlistFormState,
  submitHomeWaitlistAction,
} from '@/modules/home/actions/home-waitlist-action'
import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { SectionHeading } from '@/modules/home/components/section-heading'
import { CardAurora } from '@/shared/components/card-aurora'
import { Reveal } from '@/shared/components/reveal'
import { SpotlightGrid } from '@/shared/components/spotlight-grid'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { WaitlistIsotype } from './waitlist-isotype'

const initialState: HomeWaitlistFormState = {
  success: false,
}

function HomeWaitlistSection() {
  const [state, formAction, isPending] = useActionState(submitHomeWaitlistAction, initialState)
  const isSmUp = useMediaQuery({ from: 'sm' })

  return (
    <section
      id="home-waitlist-section"
      className="w-full py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-waitlist-heading"
    >
      <div className="container">
        <div
          data-waitlist-card
          className="border-border bg-secondary relative overflow-hidden rounded-2xl border"
        >
          {/* card-scale silk aurora — same waves and cursor ripple effect as
              the hero, composed as two calm lobes with a clear center */}
          <CardAurora className="absolute inset-0" />

          <SpotlightGrid
            spotlightRadius={120}
            gridSize={50}
            containerSelector="[data-waitlist-card]"
            highlightOpacity={0.45}
            showBaseGrid
          />

          <div className="relative z-10 px-5 py-20 sm:px-12 sm:py-24 lg:p-24">
            <div className="mx-auto max-w-2xl">
              <header className="mx-auto max-w-2xl text-center">
                <SectionHeading
                  id="home-waitlist-heading"
                  title="Join the Waitlist"
                  highlight="Waitlist"
                />
                <AnimatedSubtitle className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
                  Connect your org, empower your network and operate as one.
                </AnimatedSubtitle>
              </header>

              <Reveal delay={0.15} className="mx-auto mt-10 max-w-xl sm:mt-12">
                {state.success ? (
                  <p
                    className="text-foreground text-center text-base font-medium sm:text-lg"
                    role="status"
                  >
                    {state.message}
                  </p>
                ) : (
                  <form action={formAction} className="w-full">
                    <div
                      className={cn(
                        'border-border flex flex-row items-center gap-0 rounded-xl border bg-[#EDEDED] p-1.5 pl-3 sm:pl-4',
                        state.error && 'ring-2 ring-red-500/35',
                      )}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                        <WaitlistIsotype />
                        <Input
                          id="home-waitlist-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder={isSmUp ? 'Drop your email for launch updates.' : 'Email'}
                          defaultValue={state.email ?? ''}
                          aria-invalid={!!state.error}
                          aria-describedby={state.error ? 'home-waitlist-error' : undefined}
                          disabled={isPending}
                          required
                          className={cn(
                            'text-foreground h-11 min-w-0 flex-1 border-0 bg-transparent px-0 text-[15px] shadow-none',
                            'placeholder:text-foreground/60 focus-visible:ring-0 md:text-base',
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary hover:bg-primary/92 hover:shadow-primary group inline-flex size-11 shrink-0 items-center justify-center rounded-lg border-0 text-sm font-semibold text-white transition-shadow sm:ml-1 sm:h-11 sm:w-auto sm:px-6"
                      >
                        <span className="hidden sm:inline">
                          {isPending ? 'Sending…' : 'Get Notified'}
                        </span>
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 sm:ml-1.5"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                      </Button>
                    </div>
                    {state.error ? (
                      <p
                        id="home-waitlist-error"
                        className="mt-3 text-center text-sm text-red-600"
                        role="alert"
                      >
                        {state.error}
                      </p>
                    ) : null}
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeWaitlistSection }
