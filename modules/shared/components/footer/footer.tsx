import Link from 'next/link'
import { PowerhouseLogoIsotype, PowerhouseLogotype } from '../svgs'

export function Footer() {
  return (
    <footer className="bg-background/95 supports-backdrop-filter:bg-background/60 mt-8 mb-2 w-full backdrop-blur">
      <div className="container flex min-h-21 items-center justify-center">
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-12">
          <Link
            href="https://x.com/PowerhouseDAO"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Powerhouse on X (formerly Twitter)"
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            X (Twitter)
          </Link>
          <Link
            href="https://discord.com/invite/pwQJwgaQKd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Powerhouse Discord community"
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            Discord
          </Link>

          <Link
            href="https://www.powerhouse.inc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Powerhouse website"
            className="group text-foreground/50 bg-popover hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-input/5 flex min-h-10 min-w-64.5 items-center gap-2 rounded-md border px-4 py-2 transition-colors"
          >
            <span className="text-foreground/50 group-hover:text-foreground text-sm leading-normal font-medium transition-colors">
              Powered by
            </span>
            <div className="flex items-center gap-1.5">
              <PowerhouseLogoIsotype className="text-foreground/50 group-hover:text-foreground h-4 w-4 transition-colors" />
              <PowerhouseLogotype className="text-foreground/50 group-hover:text-foreground h-2.75 w-auto transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
