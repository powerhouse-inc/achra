import { Globe, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

const descriptionClass =
  'text-[15px] font-normal leading-[150%] tracking-[-0.01em] text-[rgb(55,55,55)] sm:text-base'

function VetraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-6 shrink-0 text-[rgb(10,10,10)]', className)}
      aria-hidden
    >
      <rect x="2" y="2" width="9" height="9" rx="2.25" fill="currentColor" />
      <rect x="13" y="2" width="9" height="9" rx="2.25" fill="currentColor" />
      <rect x="2" y="13" width="9" height="9" rx="2.25" fill="currentColor" />
      <rect x="13" y="13" width="9" height="9" rx="2.25" fill="currentColor" />
    </svg>
  )
}

function PowerhouseIsotype({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-8 shrink-0 text-white', className)}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.0177 0L10.2491 16.3694C7.34937 18.7705 7.13849 23.1435 9.79369 25.8125L16.6327 32.6871C18.6393 34.7041 19.0735 37.8035 17.6983 40.2942L13.4438 48H6.4C2.86538 48 0 45.1346 0 41.6V6.4C0 2.86538 2.86538 0 6.4 0H30.0177ZM33.7309 0L30.0384 6.72664C28.677 9.20674 29.1055 12.2865 31.0923 14.3007L38.3474 21.656C40.9968 24.3421 40.7597 28.7254 37.8361 31.1099L17.1276 48H41.6C45.1346 48 48 45.1346 48 41.6V6.4C48 2.86538 45.1346 0 41.6 0H33.7309Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PowerhouseStackSection() {
  return (
    <section
      className="w-full bg-[rgb(250,249,247)] px-6 py-16 sm:px-10 sm:py-20"
      aria-labelledby="powerhouse-stack-heading"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:gap-12">
        <header className="mx-auto flex max-w-[550px] flex-col gap-6 text-center">
          <h2
            id="powerhouse-stack-heading"
            className="text-3xl font-semibold tracking-tight text-balance text-[#1a1a1a] sm:text-4xl"
          >
            The Powerhouse Stack
          </h2>
          <p className="text-base leading-relaxed text-pretty text-[#666666] sm:text-lg">
            Tools that make distributed work simple and private.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
          {/* Connect */}
          <article
            className={cn(
              'flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[rgb(230,220,250)] bg-[rgb(247,242,255)]',
              'shadow-[0_1px_0_rgba(0,0,0,0.04)] md:min-h-[520px]',
            )}
          >
            <div className="flex flex-col gap-4 px-8 pt-10 pb-2 sm:px-10 sm:pt-10">
              <div className="flex items-center gap-2.5">
                <Globe
                  className="size-5 shrink-0 text-[rgb(122,59,255)]"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-base font-semibold text-[rgb(122,59,255)] sm:text-[17px]">
                  Connect
                </span>
              </div>
              <p className={descriptionClass}>
                Run work the same way every time, clear forms, shared files, private sync, and
                ready-made templates.
              </p>
            </div>
            <div className="relative mt-auto flex min-h-0 flex-1 flex-col px-5 pt-4 pb-5 sm:px-8 sm:pb-6">
              <div
                className={cn(
                  'flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-2xl bg-white',
                  'shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]',
                  'sm:min-h-[260px]',
                )}
              >
                <div className="relative min-h-[200px] flex-1 overflow-hidden sm:min-h-[240px]">
                  <Image
                    src="/home/powerhouse-stack/connect-preview.png"
                    alt="Connect workspace preview with drives and templates"
                    width={1113}
                    height={1239}
                    className="h-full w-full object-cover object-top"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* Renown */}
          <article
            className={cn(
              'flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[rgb(200,230,245)] bg-[rgb(239,248,255)]',
              'shadow-[0_1px_0_rgba(0,0,0,0.04)] md:min-h-[520px]',
            )}
          >
            <div className="flex flex-col gap-4 px-8 pt-10 pb-2 sm:px-10 sm:pt-10">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-semibold text-[rgb(30,30,30)] sm:text-[17px]">
                  Renown
                </span>
                <Sparkles
                  className="size-5 shrink-0 text-[rgb(0,180,200)]"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <p className={descriptionClass}>
                Verifiable history for every contributor — use it to find talent, grant access, and
                collaborate with confidence.
              </p>
            </div>
            <div className="relative mt-auto flex min-h-0 flex-1 flex-col px-5 pt-4 pb-5 sm:px-8 sm:pb-6">
              <div
                className={cn(
                  'flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-2xl bg-white',
                  'shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]',
                  'sm:min-h-[260px]',
                )}
              >
                <div className="relative min-h-[200px] flex-1 overflow-hidden sm:min-h-[240px]">
                  <Image
                    src="/home/powerhouse-stack/renown-preview.png"
                    alt="Renown contributor history preview"
                    width={1228}
                    height={1456}
                    className="h-full w-full object-cover object-top"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* VETRA */}
          <article
            className={cn(
              'flex flex-col gap-5 rounded-2xl border border-[rgb(180,235,210)] bg-[rgb(222,255,238)] p-8 sm:gap-6 sm:p-10',
              'shadow-[0_1px_0_rgba(0,0,0,0.04)]',
            )}
          >
            <div className="flex items-center gap-2.5">
              <VetraMark />
              <span className="text-base font-bold tracking-wide text-[rgb(10,10,10)] sm:text-lg">
                VETRA
              </span>
            </div>
            <p className={descriptionClass}>
              Open infrastructure for open organizations, create custom workflows to automate your
              network.
            </p>
            <div>
              <Button
                asChild
                size="lg"
                className={cn(
                  'h-10 rounded-lg border-0 px-5 text-sm font-medium text-white transition-opacity hover:opacity-90',
                  'bg-[rgb(4,193,97)] hover:bg-[rgb(4,193,97)]',
                )}
              >
                <Link href="https://vetra.io" target="_blank" rel="noopener noreferrer">
                  Start Building
                </Link>
              </Button>
            </div>
          </article>

          {/* Powerhouse */}
          <article className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.06)] sm:min-h-[340px]">
            <Image
              src="/home/powerhouse-stack/powerhouse-card-bg.png"
              alt=""
              width={2726}
              height={1546}
              className="absolute inset-0 size-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
              aria-hidden
            />
            <div className="relative z-1 flex flex-col gap-5 p-8 sm:gap-6 sm:p-10">
              <div className="flex items-center gap-3">
                <PowerhouseIsotype className="size-7 sm:size-8" />
                <span className="text-sm font-bold tracking-[0.12em] text-white sm:text-base">
                  POWERHOUSE
                </span>
              </div>
              <p className="text-[15px] leading-[150%] font-normal text-white/95 sm:text-base">
                Learn More About the Powerhouse Stack
              </p>
              <div>
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    'h-10 rounded-lg border-0 bg-white px-5 text-sm font-medium text-[rgb(10,10,10)]',
                    'transition-opacity hover:bg-white/95 hover:opacity-95',
                  )}
                >
                  <Link href="https://powerhouse.io" target="_blank" rel="noopener noreferrer">
                    Visit Powerhouse
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export { PowerhouseStackSection }
