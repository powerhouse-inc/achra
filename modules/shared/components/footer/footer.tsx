import AchraImagotipo from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import { FooterLinkColumns } from './footer-link-columns'
import { FooterLlmSection } from './footer-llm-section'
import { FooterPoweredByBadge } from './footer-powered-by-badge'

function Footer() {
  return (
    <footer className="border-border bg-card border-t">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="space-y-6">
            <a
              href="https://achra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
              aria-label="Achra"
            >
              <AchraImagotipo
                className="text-primary [&_path[data-type='text']]:fill-foreground flex h-9 w-42"
                aria-hidden
              />
            </a>
            <p className="text-card-foreground/80 mt-8 text-sm">
              Learn more about Achra with your LLM.
            </p>
            <FooterLlmSection />
          </div>

          <div className="flex flex-col gap-8">
            <FooterLinkColumns />
            <div className="flex justify-end">
              <FooterPoweredByBadge />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
