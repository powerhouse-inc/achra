'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useActionState } from 'react'
import {
  type HomeWaitlistFormState,
  submitHomeWaitlistAction,
} from '@/modules/home/actions/home-waitlist-action'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'
import { WaitlistIsotype } from './waitlist-isotype'

const initialState: HomeWaitlistFormState = {
  success: false,
}

function HomeWaitlistSection() {
  const [state, formAction, isPending] = useActionState(submitHomeWaitlistAction, initialState)

  return (
    <section
      id="home-waitlist-section"
      className="w-full py-14 sm:py-16 lg:py-20"
      aria-labelledby="home-waitlist-heading"
    >
      <div className="container">
        <div
          className={cn(
            'border-border bg-secondary relative overflow-hidden rounded-[28px] border',
            'shadow-[0_1px_2px_rgba(15,15,15,0.04),0_12px_32px_rgba(15,15,15,0.07)]',
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0px, transparent 71px, var(--border) 71px, var(--border) 72px)',
            }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute bottom-[-18%] -left-[min(18vw,140px)] w-[min(92vw,520px)] blur-[48px] select-none sm:blur-[56px]"
            aria-hidden
          >
            <Image
              src="/home/waitlist/blob-left.svg"
              alt=""
              width={520}
              height={440}
              className="w-full opacity-[0.95]"
            />
          </div>
          <div
            className="pointer-events-none absolute -right-[min(12vw,80px)] bottom-[-8%] w-[min(48vw,280px)] blur-[40px] select-none sm:blur-[48px]"
            aria-hidden
          >
            <Image
              src="/home/waitlist/blob-right.svg"
              alt=""
              width={360}
              height={320}
              className="w-full opacity-90"
            />
          </div>

          <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-16 lg:py-[4.5rem]">
            <header className="mx-auto max-w-2xl text-center">
              <h2
                id="home-waitlist-heading"
                className="text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl"
              >
                Join the Waitlist
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty sm:text-lg">
                Connect your org, empower your network and operate as one.
              </p>
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
                      'border-border sm:bg-secondary/85 flex flex-col gap-2 rounded-2xl border bg-white/45 p-1.5 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:pl-4',
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
                        placeholder="Drop your email for launch updates."
                        defaultValue={state.email ?? ''}
                        aria-invalid={!!state.error}
                        aria-describedby={state.error ? 'home-waitlist-error' : undefined}
                        disabled={isPending}
                        required
                        className={cn(
                          'text-foreground h-11 min-w-0 flex-1 border-0 bg-transparent px-0 text-[15px] shadow-none',
                          'placeholder:text-muted-foreground focus-visible:ring-0 md:text-base',
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-primary hover:bg-primary/92 inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl border-0 px-6 text-sm font-semibold text-white sm:ml-1 sm:w-auto sm:rounded-full"
                    >
                      {isPending ? 'Sending…' : 'Get Notified'}
                      {!isPending && (
                        <ArrowRight className="ml-1.5 size-4" strokeWidth={2.25} aria-hidden />
                      )}
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
