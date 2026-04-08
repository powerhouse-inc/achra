import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

const descriptionClass =
  'text-foreground/80 text-[15px] font-normal leading-[150%] tracking-[-0.01em] sm:text-base'

function PowerhouseStackSection() {
  return (
    <section className="w-full py-16 sm:py-20" aria-labelledby="powerhouse-stack-heading">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <header className="mx-auto flex max-w-[550px] flex-col gap-6 text-center">
          <h2
            id="powerhouse-stack-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            The Powerhouse Stack
          </h2>
          <p className="text-foreground/80 text-base leading-relaxed text-pretty sm:text-lg">
            Tools that make distributed work simple and private.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
          {/* Connect */}
          <article
            className={cn(
              'border-primary/20 bg-primary/5 flex flex-col overflow-hidden rounded-2xl border',
              'px-8 pt-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-10 sm:pt-10',
            )}
          >
            <div className="flex flex-col items-start gap-4">
              <Image
                src="/home/powerhouse-stack/connect-logo.svg"
                alt="Connect"
                width={136}
                height={25}
                className="text-primary h-5 w-auto sm:h-6"
              />
              <p className={cn(descriptionClass, 'w-full')}>
                Run work the same way every time, clear forms, shared files, private sync, and
                ready-made templates.
              </p>
            </div>
            <div className="relative mt-auto h-[160px] pt-6 sm:h-[180px]">
              <div className="relative h-full overflow-hidden rounded-t-3xl">
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
          </article>

          {/* Renown */}
          <article
            className={cn(
              'flex flex-col overflow-hidden rounded-2xl border border-[rgb(200,230,245)] bg-[rgb(239,248,255)]',
              'px-8 pt-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-10 sm:pt-10',
            )}
          >
            <div className="flex flex-col items-start gap-4">
              <Image
                src="/home/powerhouse-stack/renown-logo.svg"
                alt="Renown"
                width={121}
                height={32}
                className="h-5 w-auto sm:h-6"
              />
              <p className={cn(descriptionClass, 'w-full')}>
                Verifiable history for every contributor — use it to find talent, grant access, and
                collaborate with confidence.
              </p>
            </div>
            <div className="relative mt-auto h-[160px] pt-6 sm:h-[180px]">
              <div className="relative h-full overflow-hidden rounded-t-3xl">
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
          </article>

          {/* VETRA */}
          <article
            className={cn(
              'flex flex-col items-start gap-6 rounded-2xl border border-[rgb(180,235,210)] bg-[rgb(222,255,238)] p-8 sm:p-10',
              'shadow-[0_1px_0_rgba(0,0,0,0.04)]',
            )}
          >
            <Image
              src="/home/powerhouse-stack/vetra-logo.svg"
              alt="Vetra"
              width={155}
              height={32}
              className="h-5 w-auto sm:h-6"
            />
            <p className={cn(descriptionClass, 'w-full')}>
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
          <article className="relative flex flex-col justify-end overflow-hidden rounded-2xl border border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
            <Image
              src="/home/powerhouse-stack/powerhouse-card-bg.png"
              alt=""
              width={2726}
              height={1546}
              className="absolute inset-0 size-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="relative z-1 flex flex-col items-start gap-6 p-8 sm:p-10">
              <Image
                src="/home/powerhouse-stack/powerhouse-logo.svg"
                alt="Powerhouse"
                width={173}
                height={20}
                className="h-5 w-auto brightness-0 invert sm:h-6"
              />
              <p className="w-full text-[15px] leading-[150%] font-normal text-white/95 sm:text-base">
                Learn More About the Powerhouse Stack
              </p>
              <div>
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    'text-foreground h-10 rounded-lg border-0 bg-white px-5 text-sm font-medium',
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
