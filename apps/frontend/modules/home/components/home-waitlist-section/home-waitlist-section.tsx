'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useActionState } from 'react'
import {
  type HomeWaitlistFormState,
  submitHomeWaitlistAction,
} from '@/modules/home/actions/home-waitlist-action'
import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { SpotlightGrid } from '@/shared/components/spotlight-grid'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'
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
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src="/home/waitlist/bg.png"
              alt=""
              fill
              loading="lazy"
              className="object-fill object-right-top"
            />
          </div>

          <SpotlightGrid
            spotlightRadius={120}
            gridSize={50}
            containerSelector="[data-waitlist-card]"
            highlightOpacity={0.45}
            showBaseGrid
          />

          <div className="relative z-10 px-5 py-16 sm:px-12 lg:p-16">
            <header className="mx-auto max-w-2xl text-center">
              <h2
                id="home-waitlist-heading"
                className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
              >
                Join the Waitlist
              </h2>
              <AnimatedSubtitle className="text-foreground/80 mt-4 text-base leading-relaxed text-pretty sm:text-lg">
                Connect your org, empower your network and operate as one.
              </AnimatedSubtitle>
            </header>

            <div className="mx-auto mt-10 max-w-xl sm:mt-12">
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
                      className="bg-primary hover:bg-primary/92 inline-flex size-11 shrink-0 items-center justify-center rounded-lg border-0 text-sm font-semibold text-white sm:ml-1 sm:h-11 sm:w-auto sm:px-6"
                    >
                      <span className="hidden sm:inline">
                        {isPending ? 'Sending…' : 'Get Notified'}
                      </span>
                      <ArrowRight className="size-4 sm:ml-1.5" strokeWidth={2.25} aria-hidden />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeWaitlistSection }
