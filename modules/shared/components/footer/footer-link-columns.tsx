import Link from 'next/link'
import { FOOTER_LINK_SECTIONS } from '@/modules/shared/lib/constants'
import type { Route } from 'next'

function FooterLinkColumns() {
  return (
    <div className="flex gap-16">
      {Object.values(FOOTER_LINK_SECTIONS).map((section) => (
        <div key={section.title}>
          <h3 className="text-foreground mb-3 text-sm font-semibold">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('http') ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href as Route}
                    className="text-foreground/80 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export { FooterLinkColumns }
