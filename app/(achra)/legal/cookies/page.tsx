import Link from 'next/link'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'
import type { Metadata, Route } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Cookie Policy for the Achra platform — how we use cookies and similar technologies.',
}

// ─── Data ────────────────────────────────────────────────────────────────────

const legalPages = [
  { title: 'Terms of Service', href: '/legal/terms', active: false },
  { title: 'Privacy Policy', href: '/legal/privacy', active: false },
  { title: 'Cookie Policy', href: '/legal/cookies', active: true },
]

const sections = [
  { id: 'what', title: '1. What Are Cookies' },
  { id: 'types', title: '2. Types of Cookies We Use' },
  { id: 'third-party', title: '3. Third-Party Cookies' },
  { id: 'manage', title: '4. Managing Cookies' },
  { id: 'updates', title: '5. Updates to This Policy' },
  { id: 'contact', title: '6. Contact Us' },
]

const cookieTable = [
  {
    name: '_achra_session',
    purpose: 'Maintains your login session across pages',
    type: 'Essential',
    duration: 'Session',
  },
  {
    name: '_achra_csrf',
    purpose: 'Protects against cross-site request forgery attacks',
    type: 'Essential',
    duration: 'Session',
  },
  {
    name: '_achra_theme',
    purpose: 'Remembers your light/dark mode preference',
    type: 'Functional',
    duration: '1 year',
  },
  {
    name: '_achra_lang',
    purpose: 'Stores your preferred language setting',
    type: 'Functional',
    duration: '1 year',
  },
  {
    name: '_achra_consent',
    purpose: 'Records your cookie consent preferences',
    type: 'Essential',
    duration: '1 year',
  },
  {
    name: '_ga / _ga_*',
    purpose: 'Google Analytics — anonymous usage statistics',
    type: 'Analytics',
    duration: '2 years',
  },
  {
    name: '_vercel_insights',
    purpose: 'Vercel Web Analytics — page performance metrics',
    type: 'Analytics',
    duration: 'Session',
  },
]

// ─── Page Component ──────────────────────────────────────────────────────────

export default function CookiesPage() {
  return (
    <main>
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className="shrink-0 lg:sticky lg:top-28 lg:w-56 lg:self-start">
              <nav className="flex flex-col gap-6">
                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                    Legal
                  </p>
                  <ul className="flex flex-col gap-1">
                    {legalPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href as Route}
                          className={cn(
                            'block rounded-md px-3 py-1.5 text-sm transition-colors',
                            page.active
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                          )}
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="hidden lg:block">
                  <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                    On This Page
                  </p>
                  <ul className="flex flex-col gap-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-muted-foreground hover:text-foreground block rounded-md px-3 py-1 text-xs transition-colors"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>

            {/* ── Content ──────────────────────────────────────────────── */}
            <article className="min-w-0 flex-1">
              <header className="mb-10">
                <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  Cookie Policy
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">Last updated: March 1, 2026</p>
                <p className="text-foreground/80 mt-4 text-base leading-relaxed">
                  This Cookie Policy explains how Achra (operated by Powerhouse B.V.) uses cookies
                  and similar tracking technologies when you visit our platform. It describes what
                  these technologies are, why we use them, and your rights to control them.
                </p>
              </header>

              <div className="text-foreground/80 [&_h2]:text-foreground space-y-10 text-sm leading-relaxed [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:sm:text-2xl">
                <section id="what">
                  <h2>1. What Are Cookies</h2>
                  <p className="mt-3">
                    Cookies are small text files placed on your device by websites you visit. They
                    are widely used to make websites work efficiently, provide a better user
                    experience, and supply information to site owners.
                  </p>
                  <p className="mt-3">
                    We also use similar technologies such as local storage and session storage,
                    which serve comparable purposes. References to &quot;cookies&quot; in this
                    policy include these technologies as well.
                  </p>
                </section>

                <section id="types">
                  <h2>2. Types of Cookies We Use</h2>
                  <p className="mt-3">We categorize our cookies into three groups:</p>

                  <h3 className="text-foreground mt-4 text-base font-semibold">
                    Essential Cookies
                  </h3>
                  <p className="mt-2">
                    Required for the platform to function. They enable core features like
                    authentication, security, and session management. These cannot be disabled.
                  </p>

                  <h3 className="text-foreground mt-4 text-base font-semibold">
                    Functional Cookies
                  </h3>
                  <p className="mt-2">
                    Remember your preferences (e.g., theme, language) to provide a personalized
                    experience. Disabling these may affect the platform&apos;s functionality.
                  </p>

                  <h3 className="text-foreground mt-4 text-base font-semibold">
                    Analytics Cookies
                  </h3>
                  <p className="mt-2">
                    Help us understand how visitors interact with the platform by collecting
                    anonymous usage data. This information is used to improve performance and user
                    experience.
                  </p>

                  {/* Cookie Table */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-xs font-semibold tracking-wider uppercase">
                          <th className="py-3 pr-4">Cookie</th>
                          <th className="py-3 pr-4">Purpose</th>
                          <th className="py-3 pr-4">Type</th>
                          <th className="py-3">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {cookieTable.map((cookie) => (
                          <tr key={cookie.name}>
                            <td className="py-3 pr-4">
                              <code className="bg-secondary rounded px-1.5 py-0.5 text-xs font-medium">
                                {cookie.name}
                              </code>
                            </td>
                            <td className="text-foreground/80 py-3 pr-4">{cookie.purpose}</td>
                            <td className="py-3 pr-4">
                              <span
                                className={cn(
                                  'inline-block rounded-md px-2 py-0.5 text-xs font-medium',
                                  cookie.type === 'Essential' && 'bg-primary/10 text-primary',
                                  cookie.type === 'Functional' &&
                                    'bg-status-progress/10 text-status-progress',
                                  cookie.type === 'Analytics' &&
                                    'bg-status-warning/10 text-status-warning',
                                )}
                              >
                                {cookie.type}
                              </span>
                            </td>
                            <td className="text-muted-foreground py-3">{cookie.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section id="third-party">
                  <h2>3. Third-Party Cookies</h2>
                  <p className="mt-3">
                    Some cookies are placed by third-party services that appear on our pages. We use
                    the following third-party services:
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                      <strong>Google Analytics:</strong> provides anonymous website usage
                      statistics. See{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google&apos;s Privacy Policy
                      </a>
                      .
                    </li>
                    <li>
                      <strong>Vercel Analytics:</strong> collects anonymized performance data (page
                      load times, Web Vitals). No personally identifiable information is collected.
                    </li>
                  </ul>
                  <p className="mt-3">We do not use any advertising or marketing cookies.</p>
                </section>

                <section id="manage">
                  <h2>4. Managing Cookies</h2>
                  <p className="mt-3">You can control and manage cookies in several ways:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6">
                    <li>
                      <strong>Browser settings:</strong> most browsers allow you to block or delete
                      cookies through their settings. Note that blocking essential cookies may
                      prevent the platform from working properly.
                    </li>
                    <li>
                      <strong>Cookie banner:</strong> when you first visit Achra, you can choose
                      which cookie categories to accept via our consent banner. You can update your
                      preferences at any time from the footer link.
                    </li>
                    <li>
                      <strong>Google Analytics opt-out:</strong> install the{' '}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Analytics Opt-out Browser Add-on
                      </a>
                      .
                    </li>
                  </ul>
                </section>

                <section id="updates">
                  <h2>5. Updates to This Policy</h2>
                  <p className="mt-3">
                    We may update this Cookie Policy from time to time to reflect changes in the
                    cookies we use or for operational, legal, or regulatory reasons. Please revisit
                    this page periodically to stay informed. The &quot;Last updated&quot; date at
                    the top indicates when the latest changes were made.
                  </p>
                </section>

                <section id="contact">
                  <h2>6. Contact Us</h2>
                  <p className="mt-3">
                    If you have questions about our use of cookies, please contact us:
                  </p>
                  <div className="bg-secondary/50 mt-4 rounded-lg border p-4 text-sm">
                    <p className="text-foreground font-medium">Powerhouse B.V. — Privacy Team</p>
                    <p className="mt-1">Herengracht 182, 1016 BR Amsterdam</p>
                    <p className="mt-1">
                      Email:{' '}
                      <a href="mailto:privacy@achra.xyz" className="text-primary hover:underline">
                        privacy@achra.xyz
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
